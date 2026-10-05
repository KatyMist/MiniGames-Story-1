import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  flushPromises,
  getSnackbarMessages,
  jsonResponse,
  makeGameSummary,
  mockFetch,
  query,
} from '../../test/helpers';

const CATEGORIES = [
  { slug: 'all', label: 'All Games', isDefault: true },
  { slug: 'puzzle', label: 'Puzzle', isDefault: false },
];

interface LibraryApi {
  categoriesStatus: number;
  gamesStatus: number;
  games: ReturnType<typeof makeGameSummary>[];
  totalPages: number;
}

function setupApi(overrides: Partial<LibraryApi> = {}) {
  const api: LibraryApi = {
    categoriesStatus: 200,
    gamesStatus: 200,
    games: [
      makeGameSummary(),
      makeGameSummary({ slug: 'cat-chess', name: 'Cat Chess', price: '$4.99' }),
    ],
    totalPages: 3,
    ...overrides,
  };

  const fetchMock = mockFetch((url) => {
    if (url.endsWith('/categories')) {
      return api.categoriesStatus === 200
        ? jsonResponse({ data: CATEGORIES })
        : jsonResponse({}, api.categoriesStatus);
    }
    if (api.gamesStatus !== 200) return jsonResponse({}, api.gamesStatus);
    const page = Number(new URL(url).searchParams.get('page'));
    return jsonResponse({
      data: page > api.totalPages ? [] : api.games,
      meta: { page, limit: 6, totalItems: 14, totalPages: api.totalPages },
    });
  });

  const gameRequests = () =>
    fetchMock.mock.calls
      .map(([url]) => new URL(String(url)))
      .filter((url) => url.pathname.endsWith('/games'));

  return { api, fetchMock, gameRequests };
}

async function mount(url: string) {
  window.history.replaceState({}, '', url);
  vi.resetModules();
  const router = await import('../../app/router');
  const { createLibraryPage } = await import('./libraryPage');
  router.startRouter();
  document.body.append(...createLibraryPage());
  await flushPromises();

  return router;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('library page', () => {
  it('loads categories and the default category games from the server', async () => {
    const { gameRequests } = setupApi();
    await mount('/library');

    expect(gameRequests()[0]?.search).toBe('?category=all&sort=rating-desc&page=1&limit=6');
    expect(document.querySelectorAll('.library-results__card')).toHaveLength(2);
    expect(query('.library-results__card').textContent).toContain('Palia');
    expect(query('.library-filters__chip[aria-pressed="true"]').textContent).toBe('All Games');
    expect(query('.library-results__page--active').textContent).toBe('1');
  });

  it('sends filter, sort and page changes to the api via the url', async () => {
    const { gameRequests } = setupApi();
    await mount('/library');

    const puzzle = [...document.querySelectorAll<HTMLButtonElement>('.library-filters__chip')].find(
      (chip) => chip.textContent === 'Puzzle',
    );
    puzzle?.click();
    await flushPromises();
    expect(window.location.search).toBe('?category=puzzle&page=1');
    expect(gameRequests().at(-1)?.search).toBe('?category=puzzle&sort=rating-desc&page=1&limit=6');

    query<HTMLButtonElement>('.library-filters__sort').click();
    query<HTMLLIElement>('[data-sort="name-asc"]').click();
    await flushPromises();
    expect(gameRequests().at(-1)?.search).toBe('?category=puzzle&sort=name-asc&page=1&limit=6');

    query<HTMLButtonElement>('[aria-label="Page 2"]').click();
    await flushPromises();
    expect(gameRequests().at(-1)?.searchParams.get('page')).toBe('2');

    query<HTMLButtonElement>('[aria-label="Previous page"]').click();
    await flushPromises();
    expect(gameRequests().at(-1)?.searchParams.get('page')).toBe('1');
  });

  it('opens game details from a card', async () => {
    setupApi();
    await mount('/library?category=puzzle');

    query<HTMLButtonElement>('[aria-label="Details for Cat Chess"]').click();

    expect(new URLSearchParams(window.location.search).get('game')).toBe('cat-chess');
  });

  it.each([
    ['/library?sort=popular', /Sort option "popular"/],
    ['/library?page=abc', /Page "abc"/],
  ])('shows data not found for invalid url %s without requesting games', async (url, message) => {
    const { gameRequests } = setupApi();
    await mount(url);

    expect(query('.state-banner--not-found').textContent).toMatch(message);
    expect(gameRequests()).toHaveLength(0);
  });

  it('shows data not found for a page beyond the last one and resets filters', async () => {
    setupApi();
    await mount('/library?category=puzzle&page=9');

    expect(query('.state-banner--not-found').textContent).toMatch(/Page 9 doesn't exist/);

    query<HTMLButtonElement>('.state-banner__action').click();
    expect(window.location.search).toBe('');
  });

  it('shows an empty state when the category has no games', async () => {
    setupApi({ games: [], totalPages: 0 });
    await mount('/library?category=puzzle');

    expect(query('.state-banner--empty')).not.toBeNull();
  });

  it('treats a 4xx response as data not found', async () => {
    setupApi({ gamesStatus: 400 });
    await mount('/library?category=unknown');

    expect(query('.state-banner--not-found')).not.toBeNull();
    expect(getSnackbarMessages()).toContain('No data found for the requested filters.');
  });

  it('shows an error banner for server errors and retries', async () => {
    const { api } = setupApi({ gamesStatus: 500 });
    await mount('/library?category=puzzle');
    expect(query('.state-banner--error')).not.toBeNull();

    api.gamesStatus = 200;
    query<HTMLButtonElement>('.state-banner__action').click();
    await flushPromises();

    expect(document.querySelectorAll('.library-results__card')).toHaveLength(2);
    expect(getSnackbarMessages()).toContain('Games loaded successfully.');
  });

  it('retries loading categories after a failure', async () => {
    const { api } = setupApi({ categoriesStatus: 500 });
    await mount('/library?category=puzzle');
    expect(getSnackbarMessages()).toContain('Failed to load categories.');

    api.categoriesStatus = 200;
    query<HTMLButtonElement>('.library-filters__categories .library-filters__chip').click();
    await flushPromises();

    expect(document.querySelectorAll('.library-filters__chip')).toHaveLength(2);
    expect(getSnackbarMessages()).toContain('Categories loaded successfully.');
  });
});
