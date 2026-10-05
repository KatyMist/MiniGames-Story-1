import { beforeEach, describe, expect, it, vi } from 'vitest';
import { makeSession, storeSession } from '../test/helpers';
import { SESSION_LIFETIME_MS } from './session';

vi.mock('../components/snackbar/snackbar', () => ({ showSnackbar: vi.fn() }));

async function load() {
  vi.resetModules();
  const guards = await import('./guards');
  const store = await import('./authStore');
  const router = await import('./router');
  const { showSnackbar } = await import('../components/snackbar/snackbar');
  store.initSession({ signOut: () => Promise.resolve() });
  router.startRouter();

  return { guards, showSnackbar: vi.mocked(showSnackbar) };
}

beforeEach(() => {
  window.history.replaceState({}, '', '/?game=palia');
});

describe('requireSession', () => {
  it('returns the active session and keeps the url', async () => {
    const session = makeSession();
    storeSession(session);
    const { guards, showSnackbar } = await load();

    expect(guards.requireSession('Log in first.')).toEqual(session);
    expect(window.location.search).toBe('?game=palia');
    expect(showSnackbar).not.toHaveBeenCalled();
  });

  it('opens auth over game details and warns a guest', async () => {
    const { guards, showSnackbar } = await load();

    expect(guards.requireSession('Log in first.')).toBeUndefined();
    expect(window.location.search).toBe('?game=palia&auth=login');
    expect(showSnackbar).toHaveBeenCalledWith('Log in first.', { variant: 'warning' });
  });

  it('shows only the expiration snackbar when the session just expired', async () => {
    const authenticatedAt = Date.now();
    storeSession(makeSession({ authenticatedAt }));
    const { guards, showSnackbar } = await load();
    vi.spyOn(Date, 'now').mockReturnValue(authenticatedAt + SESSION_LIFETIME_MS);

    expect(guards.requireSession('Log in first.')).toBeUndefined();

    expect(window.location.search).toBe('?game=palia&auth=login');
    expect(showSnackbar).toHaveBeenCalledTimes(1);
    expect(showSnackbar).toHaveBeenCalledWith(expect.stringMatching(/expired/), {
      variant: 'warning',
    });
  });
});
