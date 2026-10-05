import { beforeEach, describe, expect, it, vi } from 'vitest';
import { makeSession, storeSession } from '../test/helpers';
import { SESSION_LIFETIME_MS } from './session';

vi.mock('../components/snackbar/snackbar', () => ({ showSnackbar: vi.fn() }));

async function load() {
  vi.resetModules();
  const navigation = await import('./navigation');
  const store = await import('./authStore');
  const router = await import('./router');
  const { showSnackbar } = await import('../components/snackbar/snackbar');
  store.initSession({ signOut: () => Promise.resolve() });
  router.startRouter();

  return { navigation, showSnackbar: vi.mocked(showSnackbar) };
}

beforeEach(() => {
  window.history.replaceState({}, '', '/library?category=puzzle');
});

describe('openAuth', () => {
  it('opens the auth dialog for guests as a new history entry', async () => {
    const { navigation } = await load();

    navigation.openAuth('register');

    expect(window.location.search).toBe('?category=puzzle&auth=register');
    expect(window.history.state).toEqual({ dialog: true });
  });

  it('blocks the dialog for an authenticated user with one snackbar', async () => {
    storeSession(makeSession());
    const { navigation, showSnackbar } = await load();

    navigation.openAuth('login');

    expect(window.location.search).toBe('?category=puzzle');
    expect(showSnackbar).toHaveBeenCalledTimes(1);
    expect(showSnackbar).toHaveBeenCalledWith(navigation.ALREADY_AUTHENTICATED_MESSAGE, {
      variant: 'info',
    });
  });

  it('treats a user with an expired session as a guest', async () => {
    storeSession(makeSession({ authenticatedAt: Date.now() - SESSION_LIFETIME_MS - 1 }));
    const { navigation } = await load();

    expect(navigation.isAuthDialogBlocked()).toBe(false);
    navigation.openAuth('login');

    expect(window.location.search).toBe('?category=puzzle&auth=login');
  });
});

describe('openGameDetails', () => {
  it('adds the game slug to the current url', async () => {
    const { navigation } = await load();

    navigation.openGameDetails('palia');

    expect(window.location.search).toBe('?category=puzzle&game=palia');
  });
});
