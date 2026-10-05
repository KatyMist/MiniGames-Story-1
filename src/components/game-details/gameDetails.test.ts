import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createGameDetails } from './gameDetails';
import { checkSession, endSession, startSession } from '../../app/authStore';
import { API_BASE_URL } from '../../shared/api';
import {
  flushPromises,
  getSnackbarMessages,
  jsonResponse,
  makeComment,
  makeCommentsResponse,
  makeGameDetails,
  makeSession,
  mockFetch,
  query,
  storeSession,
  typeInto,
} from '../../test/helpers';

interface ApiState {
  isLiked: boolean;
  comments: ReturnType<typeof makeCommentsResponse>;
  detailsStatus: number;
  commentsStatus: number;
}

function setupApi(state: Partial<ApiState> = {}) {
  const api: ApiState = {
    isLiked: false,
    comments: makeCommentsResponse([
      makeComment({ authorName: ' mira', isLikedByCurrentUser: false }),
    ]),
    detailsStatus: 200,
    commentsStatus: 200,
    ...state,
  };

  const fetchMock = mockFetch((url, init) => {
    if (init?.method === 'POST' && url.endsWith('/comments')) {
      return jsonResponse({ data: makeComment({ commentId: 'new' }) }, 201);
    }
    if (url.includes('/comments')) {
      return api.commentsStatus === 200
        ? jsonResponse(api.comments)
        : jsonResponse({}, api.commentsStatus);
    }
    if (url.includes('/favorite')) {
      return jsonResponse({ data: { isFavorited: true, likesCount: 2001 } });
    }
    if (api.detailsStatus !== 200) return jsonResponse({}, api.detailsStatus);
    return jsonResponse({
      data: makeGameDetails({ isLikedByCurrentUser: url.includes('userEmail') && api.isLiked }),
    });
  });

  return { api, fetchMock };
}

function mount() {
  const onDismiss = vi.fn();
  const details = createGameDetails({ onDismiss });
  document.body.append(details.element);

  return { details, onDismiss };
}

const urls = (fetchMock: ReturnType<typeof mockFetch>) =>
  fetchMock.mock.calls.map(([url]) => String(url));

beforeEach(() => {
  window.history.replaceState({}, '', '/?game=palia');
  checkSession();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('loading', () => {
  it('shows skeletons, then game info, records and comments', async () => {
    const { fetchMock } = setupApi();
    const { details } = mount();

    details.open('palia');
    expect(details.element.querySelector('.loading-region')).not.toBeNull();

    await flushPromises();

    expect(query('.game-details__title').textContent).toBe('Palia');
    expect(query('.game-details__stat--likes').textContent).toContain('1.2K');
    expect(query('.game-details__record-name').textContent).toBe('Mira');
    expect(query('#game-details-comments-heading').textContent).toBe('Comments (1)');
    // Гостевые запросы -- без userEmail.
    expect(urls(fetchMock).every((url) => !url.includes('userEmail'))).toBe(true);
  });

  it('renders commenter avatars with a token color and the trimmed initial', async () => {
    setupApi();
    const { details } = mount();

    details.open('palia');
    await flushPromises();

    const avatar = query('.game-details__comment .game-details__comment-avatar');
    expect(avatar.textContent).toBe('M');
    expect(avatar.className).toMatch(/game-details__comment-avatar--tone-[1-5]/);
  });

  it('shows the empty comments state', async () => {
    setupApi({ comments: makeCommentsResponse([], 0) });
    const { details } = mount();

    details.open('palia');
    await flushPromises();

    expect(query('.state-banner--empty').textContent).toMatch(/No comments yet/);
  });

  it('shows a not found state for an unknown game', async () => {
    setupApi({ detailsStatus: 404 });
    const { details, onDismiss } = mount();

    details.open('nope');
    await flushPromises();

    expect(query('.state-banner--not-found').textContent).toMatch(/Game Not Found/);
    query<HTMLButtonElement>('.state-banner__action').click();
    expect(onDismiss).toHaveBeenCalled();
  });

  it('shows an error banner and retries the request', async () => {
    const { api } = setupApi({ detailsStatus: 500 });
    const { details } = mount();

    details.open('palia');
    await flushPromises();
    expect(query('.state-banner--error')).not.toBeNull();

    api.detailsStatus = 200;
    query<HTMLButtonElement>('.state-banner__action').click();
    await flushPromises();

    expect(query('.game-details__title').textContent).toBe('Palia');
    expect(getSnackbarMessages()).toContain('Game details loaded successfully.');
  });

  it('shows a comments error banner with retry', async () => {
    const { api } = setupApi({ commentsStatus: 500 });
    const { details } = mount();

    details.open('palia');
    await flushPromises();
    expect(query('.game-details__comments .state-banner--error')).not.toBeNull();

    api.commentsStatus = 200;
    query<HTMLButtonElement>('.game-details__comments .state-banner__action').click();
    await flushPromises();
    expect(query('.game-details__comments-list')).not.toBeNull();
  });
});

describe('authenticated mode', () => {
  it('initializes favorite and likes from personalized requests', async () => {
    storeSession(makeSession({ email: 'student@rs.school' }));
    checkSession();
    const { fetchMock } = setupApi({ isLiked: true });
    const { details } = mount();

    details.open('palia');
    await flushPromises();

    expect(urls(fetchMock)).toContain(`${API_BASE_URL}/games/palia?userEmail=student%40rs.school`);
    expect(urls(fetchMock)).toContain(
      `${API_BASE_URL}/games/palia/comments?limit=3&sort=newest&userEmail=student%40rs.school`,
    );
    expect(query('.game-details__favorite').getAttribute('aria-pressed')).toBe('true');
  });

  it('updates the likes stat from the favorite response', async () => {
    storeSession(makeSession());
    checkSession();
    setupApi();
    const { details } = mount();
    details.open('palia');
    await flushPromises();

    query<HTMLButtonElement>('.game-details__favorite').click();
    await flushPromises();

    expect(query('.game-details__stat--likes').textContent).toContain('2K');
  });

  it('reloads the three newest comments after posting', async () => {
    storeSession(makeSession());
    checkSession();
    const { fetchMock, api } = setupApi();
    const { details } = mount();
    details.open('palia');
    await flushPromises();

    api.comments = makeCommentsResponse([makeComment({ commentId: 'new' })], 13);
    typeInto(query<HTMLTextAreaElement>('.game-details__comment-input'), 'Lovely');
    query<HTMLButtonElement>('.game-details__comment-submit').click();
    await flushPromises();

    const commentGets = urls(fetchMock).filter((url) => url.includes('/comments?'));
    expect(commentGets).toHaveLength(2);
    expect(query('#game-details-comments-heading').textContent).toBe('Comments (13)');
  });

  it('switches to guest state on logout and back to user state on login', async () => {
    storeSession(makeSession());
    checkSession();
    const { fetchMock } = setupApi({ isLiked: true });
    const { details } = mount();
    details.open('palia');
    await flushPromises();
    expect(query('.game-details__favorite').getAttribute('aria-pressed')).toBe('true');

    await endSession('logout');
    expect(query('.game-details__favorite').getAttribute('aria-pressed')).toBe('false');
    await flushPromises();
    expect(query<HTMLTextAreaElement>('.game-details__comment-input').disabled).toBe(true);

    fetchMock.mockClear();
    startSession({ displayName: 'Forest', email: 'student@rs.school' });
    await flushPromises();

    expect(query('.game-details__favorite').getAttribute('aria-pressed')).toBe('true');
    expect(urls(fetchMock).every((url) => url.includes('userEmail'))).toBe(true);
    expect(query<HTMLTextAreaElement>('.game-details__comment-input').disabled).toBe(false);
  });
});

describe('dialog behavior', () => {
  it('asks the owner to close on close button, backdrop and escape', async () => {
    setupApi();
    const { details, onDismiss } = mount();
    details.open('palia');
    await flushPromises();

    query<HTMLButtonElement>('.game-details__close').click();
    query('.game-details__backdrop').click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(onDismiss).toHaveBeenCalledTimes(3);
  });

  it('is hidden but keeps its state while auth is shown on top', async () => {
    setupApi();
    const { details, onDismiss } = mount();
    details.open('palia');
    await flushPromises();
    typeInto(query<HTMLTextAreaElement>('.game-details__comment-input'), 'kept');

    details.setSuspended(true);
    expect(details.element.classList.contains('game-details--suspended')).toBe(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onDismiss).not.toHaveBeenCalled();

    details.setSuspended(false);
    expect(details.element.classList.contains('game-details--suspended')).toBe(false);
    expect(document.body.style.overflow).toBe('hidden');
    expect(query<HTMLTextAreaElement>('.game-details__comment-input').value).toBe('kept');
  });

  it('does not reload the same game and closes itself without an owner', async () => {
    const { fetchMock } = setupApi();
    const details = createGameDetails();
    document.body.append(details.element);

    details.open('palia');
    details.open('palia');
    await flushPromises();
    expect(urls(fetchMock).filter((url) => url.endsWith('/games/palia'))).toHaveLength(1);

    query<HTMLButtonElement>('.game-details__close').click();
    expect(details.element.classList.contains('game-details--open')).toBe(false);
  });

  it('falls back to a placeholder when the hero image fails', async () => {
    setupApi();
    const { details } = mount();
    details.open('palia');
    await flushPromises();

    const image = query<HTMLImageElement>('.game-details__hero-image');
    image.dispatchEvent(new Event('error'));
    image.dispatchEvent(new Event('error'));

    expect(query('.game-details__hero-placeholder-title').textContent).toBe('Palia');
  });
});
