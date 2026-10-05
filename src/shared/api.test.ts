import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  API_BASE_URL,
  ApiError,
  MUTATION_TIMEOUT_MS,
  fetchCategories,
  fetchFeaturedGames,
  fetchGameComments,
  fetchGameDetails,
  fetchGames,
  fetchLeaderboard,
  isAbortError,
  postComment,
  toggleCommentLike,
  toggleFavorite,
} from './api';
import { jsonResponse, makeComment, makeGameDetails, mockFetch } from '../test/helpers';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('read requests', () => {
  it('builds library query parameters for server side filtering, sorting and paging', async () => {
    const fetchMock = mockFetch(() => jsonResponse({ data: [], meta: {} }));

    await fetchGames({ category: 'puzzle', sort: 'name-asc', page: 2, limit: 6 });

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/games?category=puzzle&sort=name-asc&page=2&limit=6`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('unwraps data of list endpoints', async () => {
    mockFetch((url) => {
      if (url.endsWith('/categories')) return jsonResponse({ data: [{ slug: 'all' }] });
      if (url.endsWith('/leaderboard')) return jsonResponse({ data: [{ rank: 1 }] });
      return jsonResponse({ data: [{ slug: 'palia' }], meta: { page: 1 } });
    });

    await expect(fetchCategories()).resolves.toEqual([{ slug: 'all' }]);
    await expect(fetchLeaderboard()).resolves.toEqual([{ rank: 1 }]);
    await expect(fetchFeaturedGames()).resolves.toMatchObject({ data: [{ slug: 'palia' }] });
  });

  it('requests personalized game details with an url-encoded email', async () => {
    const game = makeGameDetails({ isLikedByCurrentUser: true });
    const fetchMock = mockFetch(() => jsonResponse({ data: game }));

    await expect(fetchGameDetails('palia', undefined, 'a+b@rs.school')).resolves.toEqual(game);
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      `${API_BASE_URL}/games/palia?userEmail=a%2Bb%40rs.school`,
    );

    await fetchGameDetails('palia');
    expect(fetchMock.mock.calls[1]?.[0]).toBe(`${API_BASE_URL}/games/palia`);
  });

  it('requests the three newest comments, with userEmail only for users', async () => {
    const fetchMock = mockFetch(() => jsonResponse({ data: [], meta: { totalComments: 0 } }));

    await fetchGameComments('palia');
    await fetchGameComments('palia', undefined, 'student@rs.school');

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      `${API_BASE_URL}/games/palia/comments?limit=3&sort=newest`,
    );
    expect(fetchMock.mock.calls[1]?.[0]).toBe(
      `${API_BASE_URL}/games/palia/comments?limit=3&sort=newest&userEmail=student%40rs.school`,
    );
  });
});

describe('errors', () => {
  it('reports server errors with status and message from the body', async () => {
    mockFetch(() => jsonResponse({ error: { message: 'Game not found' } }, 404));

    const error = await fetchGameDetails('nope').catch((error_: unknown) => error_);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 404, message: 'Game not found', isNotFound: true });
    expect((error as ApiError).isClientError).toBe(true);
    expect((error as ApiError).isUnknownOutcome).toBe(false);
  });

  it('uses a default message when the error body is not json', async () => {
    mockFetch(() => new Response('oops', { status: 500 }));

    await expect(fetchLeaderboard()).rejects.toMatchObject({
      status: 500,
      message: 'Request failed with status 500',
      isUnknownOutcome: true,
    });
  });

  it('turns network failures into an unknown outcome error', async () => {
    mockFetch(() => {
      throw new TypeError('Failed to fetch');
    });

    await expect(fetchCategories()).rejects.toMatchObject({ status: 0, isUnknownOutcome: true });
  });

  it('rethrows aborts so callers can ignore them', async () => {
    const controller = new AbortController();
    controller.abort();
    mockFetch((_url, init) => {
      if (init?.signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      return jsonResponse({});
    });

    const error = await fetchCategories(controller.signal).catch((error_: unknown) => error_);

    expect(isAbortError(error)).toBe(true);
    expect(isAbortError(new Error('x'))).toBe(false);
  });

  it('times out a mutation that gets no response', async () => {
    vi.useFakeTimers();
    mockFetch(
      (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError')),
          );
        }),
    );

    const pending = toggleFavorite('palia', 'student@rs.school').catch((error: unknown) => error);
    await vi.advanceTimersByTimeAsync(MUTATION_TIMEOUT_MS);

    await expect(pending).resolves.toMatchObject({
      status: 0,
      message: 'The server did not respond in time.',
    });
  });
});

describe('mutations', () => {
  it('toggles a favorite with the session email in a json body', async () => {
    const fetchMock = mockFetch(() =>
      jsonResponse({ data: { isFavorited: true, likesCount: 11 } }),
    );

    await expect(toggleFavorite('tukoni-forest-keepers', 'student@rs.school')).resolves.toEqual({
      isFavorited: true,
      likesCount: 11,
    });

    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe(`${API_BASE_URL}/games/tukoni-forest-keepers/favorite`);
    expect(init).toMatchObject({ method: 'POST', body: '{"userEmail":"student@rs.school"}' });
    expect(init?.headers).toMatchObject({ 'Content-Type': 'application/json' });
  });

  it('posts a comment and returns the created comment', async () => {
    const created = makeComment({ text: 'Nice' });
    const fetchMock = mockFetch(() => jsonResponse({ data: created }, 201));
    const body = { userEmail: 'student@rs.school', authorName: 'Forest', text: 'Nice' };

    await expect(postComment('palia', body)).resolves.toEqual(created);
    expect(fetchMock.mock.calls[0]?.[0]).toBe(`${API_BASE_URL}/games/palia/comments`);
    expect(JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body))).toEqual(body);
  });

  it('toggles a comment like', async () => {
    const fetchMock = mockFetch(() =>
      jsonResponse({ data: { isLikedByCurrentUser: true, likesCount: 4 } }),
    );

    await expect(toggleCommentLike('c-1', 'student@rs.school')).resolves.toEqual({
      isLikedByCurrentUser: true,
      likesCount: 4,
    });
    expect(fetchMock.mock.calls[0]?.[0]).toBe(`${API_BASE_URL}/comments/c-1/like`);
  });
});
