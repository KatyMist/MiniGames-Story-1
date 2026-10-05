import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SESSION_LIFETIME_MS, SESSION_STORAGE_KEY } from './session';
import { makeSession, storeSession } from '../test/helpers';

vi.mock('../components/snackbar/snackbar', () => ({ showSnackbar: vi.fn() }));

// У хранилища модульное состояние -- для каждого теста загружаем его заново.
async function loadStore() {
  vi.resetModules();
  const store = await import('./authStore');
  const { showSnackbar } = await import('../components/snackbar/snackbar');
  const signOut = vi.fn(() => Promise.resolve());

  return { store, showSnackbar: vi.mocked(showSnackbar), signOut };
}

const NOW = 1_700_000_000_000;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
});

describe('initSession', () => {
  it('restores a valid session without changing authenticatedAt', async () => {
    const session = makeSession({ authenticatedAt: NOW - 60_000 });
    storeSession(session);
    const { store, signOut } = await loadStore();

    expect(store.initSession({ signOut })).toEqual(session);
    expect(store.getSession()).toEqual(session);
    expect(store.isAuthenticated()).toBe(true);
    expect(JSON.parse(window.localStorage.getItem(SESSION_STORAGE_KEY) ?? '')).toEqual(session);
    expect(signOut).not.toHaveBeenCalled();
  });

  it('starts as guest without a stored session', async () => {
    const { store, signOut } = await loadStore();

    expect(store.initSession({ signOut })).toBeUndefined();
    expect(store.isAuthenticated()).toBe(false);
    expect(signOut).not.toHaveBeenCalled();
  });

  it('removes invalid stored data, signs out of firebase and stays guest', async () => {
    window.localStorage.setItem(SESSION_STORAGE_KEY, '{broken');
    window.localStorage.setItem('unrelated', '1');
    const { store, signOut, showSnackbar } = await loadStore();

    expect(store.initSession({ signOut })).toBeUndefined();
    await vi.runOnlyPendingTimersAsync();

    expect(window.localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem('unrelated')).toBe('1');
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(showSnackbar).not.toHaveBeenCalled();
  });

  it('ends an expired session with one expiration snackbar', async () => {
    storeSession(makeSession({ authenticatedAt: NOW - SESSION_LIFETIME_MS - 1 }));
    const { store, signOut, showSnackbar } = await loadStore();

    expect(store.initSession({ signOut })).toBeUndefined();
    await vi.runOnlyPendingTimersAsync();

    expect(window.localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(showSnackbar).toHaveBeenCalledTimes(1);
    expect(showSnackbar).toHaveBeenCalledWith(expect.stringMatching(/expired/), {
      variant: 'warning',
    });
  });
});

describe('startSession', () => {
  it('saves the session and notifies subscribers', async () => {
    const { store, signOut } = await loadStore();
    store.initSession({ signOut });
    const listener = vi.fn();
    const unsubscribe = store.subscribeSession(listener);

    const session = store.startSession({
      displayName: 'Forest',
      email: 'student@rs.school',
      photoURL: null,
    });

    expect(session).toEqual({
      displayName: 'Forest',
      email: 'student@rs.school',
      authenticatedAt: NOW,
    });
    expect(JSON.parse(window.localStorage.getItem(SESSION_STORAGE_KEY) ?? '')).toEqual(session);
    expect(listener).toHaveBeenCalledWith(session);

    unsubscribe();
    store.startSession({ displayName: 'Other', email: 'other@rs.school' });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('switches to guest automatically when the 5 minute lifetime ends', async () => {
    const { store, signOut, showSnackbar } = await loadStore();
    store.initSession({ signOut });
    store.startSession({ displayName: 'Forest', email: 'student@rs.school' });
    const listener = vi.fn();
    store.subscribeSession(listener);

    await vi.advanceTimersByTimeAsync(SESSION_LIFETIME_MS - 1);
    expect(store.isAuthenticated()).toBe(true);

    await vi.advanceTimersByTimeAsync(1);
    expect(store.isAuthenticated()).toBe(false);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.lastCall?.[0]).toBeUndefined();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(showSnackbar).toHaveBeenCalledTimes(1);
  });
});

describe('checkSession', () => {
  it('detects a session expired by editing authenticatedAt in storage', async () => {
    storeSession(makeSession({ authenticatedAt: NOW }));
    const { store, signOut } = await loadStore();
    store.initSession({ signOut });

    storeSession(makeSession({ authenticatedAt: NOW - SESSION_LIFETIME_MS }));

    expect(store.checkSession()).toBeUndefined();
    expect(store.isAuthenticated()).toBe(false);
  });

  it('ends the session when the key was removed elsewhere', async () => {
    storeSession(makeSession());
    const { store, signOut } = await loadStore();
    store.initSession({ signOut });

    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    window.dispatchEvent(new StorageEvent('storage', { key: SESSION_STORAGE_KEY }));
    await vi.runOnlyPendingTimersAsync();

    expect(store.isAuthenticated()).toBe(false);
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it('re-checks the session when the page becomes visible again', async () => {
    storeSession(makeSession({ authenticatedAt: NOW }));
    const { store, signOut } = await loadStore();
    store.initSession({ signOut });

    vi.setSystemTime(NOW + SESSION_LIFETIME_MS + 10);
    document.dispatchEvent(new Event('visibilitychange'));

    expect(store.isAuthenticated()).toBe(false);
  });

  it('does not notify subscribers when nothing changed', async () => {
    storeSession(makeSession({ authenticatedAt: NOW }));
    const { store, signOut } = await loadStore();
    store.initSession({ signOut });
    const listener = vi.fn();
    store.subscribeSession(listener);

    store.checkSession();

    expect(listener).not.toHaveBeenCalled();
  });
});

describe('endSession', () => {
  it('logs out: clears only the session key, signs out and confirms', async () => {
    storeSession(makeSession());
    window.localStorage.setItem('unrelated', 'keep');
    const { store, signOut, showSnackbar } = await loadStore();
    store.initSession({ signOut });

    await store.endSession('logout');

    expect(store.getSession()).toBeUndefined();
    expect(window.localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem('unrelated')).toBe('keep');
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(showSnackbar).toHaveBeenCalledWith('You have been logged out.', { variant: 'success' });
  });

  it('stays in guest mode and reports an error when firebase sign out fails', async () => {
    storeSession(makeSession());
    const { store, showSnackbar } = await loadStore();
    const signOut = vi.fn(() => Promise.reject(new Error('offline')));
    store.initSession({ signOut });

    await store.endSession('logout');

    expect(store.isAuthenticated()).toBe(false);
    expect(store.checkSession()).toBeUndefined();
    expect(showSnackbar).toHaveBeenCalledWith(expect.stringMatching(/Could not sign out/), {
      variant: 'error',
    });
  });
});
