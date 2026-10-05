import { afterEach, describe, expect, it, vi } from 'vitest';
import { SESSION_LIFETIME_MS } from './session';
import {
  flushPromises,
  getSnackbarMessages,
  jsonResponse,
  makeCommentsResponse,
  makeGameDetails,
  makeSession,
  mockFetch,
  query,
  storeSession,
} from '../test/helpers';

const firebase = vi.hoisted(() => ({
  signOutFromFirebase: vi.fn(() => Promise.resolve()),
  signInWithEmail: vi.fn(),
  registerWithEmail: vi.fn(),
  signInWithGoogle: vi.fn(),
}));

vi.mock('./firebase', () => firebase);

function mockApi() {
  return mockFetch((url) => {
    if (url.includes('/comments')) return jsonResponse(makeCommentsResponse([]));
    if (/\/games\/[\w-]+/.test(url)) return jsonResponse({ data: makeGameDetails() });
    if (url.endsWith('/categories')) return jsonResponse({ data: [] });
    return jsonResponse({ data: [], meta: { page: 1, totalPages: 0 } });
  });
}

async function start(url: string) {
  window.history.replaceState({}, '', url);
  mockApi();
  vi.resetModules();
  const { mountApp } = await import('./app');
  mountApp();
  await flushPromises();
}

const isOpen = (selector: string, modifier: string) => query(selector).classList.contains(modifier);
const authOpen = () => isOpen('.auth-dialog', 'auth-dialog--open');

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('pages and titles', () => {
  it.each([
    ['/', 'MiniGames', '.hero'],
    ['/library', 'Game Library — MiniGames', '.library-header'],
    ['/nope', 'Page Not Found — MiniGames', '.not-found'],
  ])('renders %s', async (url, title, selector) => {
    await start(url);

    expect(document.title).toBe(title);
    expect(document.querySelector(selector)).not.toBeNull();
    expect(document.querySelector('header.header')).not.toBeNull();
  });

  it('rebuilds the page on navigation', async () => {
    await start('/');

    query<HTMLButtonElement>('.hero__cta').click();
    await flushPromises();

    expect(document.querySelector('.library-header')).not.toBeNull();
    expect(document.querySelector('.hero')).toBeNull();
  });
});

describe('auth dialog url guard', () => {
  it('opens auth from the url for guests', async () => {
    await start('/?auth=register');

    expect(authOpen()).toBe(true);
    expect(query('.auth-dialog__tab--active').textContent).toBe('Register');
  });

  it('removes only the auth parameter for an authenticated user', async () => {
    storeSession(makeSession());
    await start('/library?category=puzzle&auth=login#reviews');

    expect(authOpen()).toBe(false);
    expect(window.location.pathname).toBe('/library');
    expect(window.location.search).toBe('?category=puzzle');
    expect(window.location.hash).toBe('#reviews');
    expect(
      getSnackbarMessages().filter((message) => message === 'You are already logged in.'),
    ).toHaveLength(1);
  });

  it('allows auth after recovering an expired session', async () => {
    storeSession(makeSession({ authenticatedAt: Date.now() - SESSION_LIFETIME_MS - 1 }));
    await start('/?auth=login');

    expect(authOpen()).toBe(true);
    expect(firebase.signOutFromFirebase).toHaveBeenCalled();
    expect(getSnackbarMessages()).toContain('Your session has expired. Please log in again.');
  });

  it('blocks auth on back/forward navigation for an authenticated user', async () => {
    storeSession(makeSession());
    await start('/');

    window.history.pushState({}, '', '/?auth=login');
    window.dispatchEvent(new PopStateEvent('popstate'));
    await flushPromises();

    expect(authOpen()).toBe(false);
    expect(window.location.search).toBe('');
  });
});

describe('auth over game details', () => {
  it('hides game details while auth is open and restores it after auth closes', async () => {
    await start('/?game=palia');
    expect(isOpen('.game-details', 'game-details--open')).toBe(true);

    query<HTMLButtonElement>('.game-details__favorite').click();
    await flushPromises();

    expect(window.location.search).toBe('?game=palia&auth=login');
    expect(authOpen()).toBe(true);
    expect(isOpen('.game-details', 'game-details--suspended')).toBe(true);

    // Закрытие Auth -- шаг назад по истории к ?game=palia.
    window.history.back();
    await new Promise((resolve) => {
      window.addEventListener('popstate', resolve, { once: true });
    });
    await flushPromises();

    expect(authOpen()).toBe(false);
    expect(isOpen('.game-details', 'game-details--open')).toBe(true);
    expect(isOpen('.game-details', 'game-details--suspended')).toBe(false);
  });

  it('closes auth and returns to game details in authenticated mode after login', async () => {
    firebase.signInWithEmail.mockResolvedValue({
      displayName: 'Forest',
      email: 'student@rs.school',
      photoURL: null,
    });
    await start('/?game=palia&auth=login');

    const email = query<HTMLInputElement>('#login-email');
    const password = query<HTMLInputElement>('#login-password');
    email.value = 'student@rs.school';
    email.dispatchEvent(new Event('input'));
    password.value = 'secret1';
    password.dispatchEvent(new Event('input'));
    query<HTMLButtonElement>('.auth-dialog__submit').click();
    await flushPromises();

    expect(window.location.search).toBe('?game=palia');
    expect(authOpen()).toBe(false);
    expect(query('.header__user-name').textContent).toBe('Forest');
    expect(query<HTMLTextAreaElement>('.game-details__comment-input').disabled).toBe(false);
  });
});

describe('logout', () => {
  it('returns the header to guest mode and signs out of firebase', async () => {
    storeSession(makeSession({ displayName: 'Forest' }));
    await start('/');
    expect(query('.header__user-name').textContent).toBe('Forest');

    query<HTMLButtonElement>('.header__actions .btn').click();
    await flushPromises();

    expect(document.querySelector('.header__user')).toBeNull();
    expect(query('.header__actions').textContent).toContain('Log In');
    expect(firebase.signOutFromFirebase).toHaveBeenCalledTimes(1);
    expect(getSnackbarMessages()).toContain('You have been logged out.');
  });
});
