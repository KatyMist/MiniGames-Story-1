import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SESSION_STORAGE_KEY } from './session';

const firebase = vi.hoisted(() => ({
  signInWithEmail: vi.fn(),
  registerWithEmail: vi.fn(),
  signInWithGoogle: vi.fn(),
  signOutFromFirebase: vi.fn(() => Promise.resolve()),
}));

vi.mock('./firebase', () => firebase);

async function load() {
  vi.resetModules();
  return import('./authActions');
}

const NOW = 1_700_000_000_000;

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(Date, 'now').mockReturnValue(NOW);
});

describe('auth actions', () => {
  it('logs in with trimmed email and creates the app session', async () => {
    firebase.signInWithEmail.mockResolvedValue({
      displayName: 'Forest',
      email: 'student@rs.school',
      photoURL: null,
    });
    const actions = await load();

    const session = await actions.loginWithEmail(' student@rs.school ', 'secret1');

    expect(firebase.signInWithEmail).toHaveBeenCalledWith('student@rs.school', 'secret1');
    expect(session).toEqual({
      displayName: 'Forest',
      email: 'student@rs.school',
      authenticatedAt: NOW,
    });
    expect(JSON.parse(window.localStorage.getItem(SESSION_STORAGE_KEY) ?? '')).toEqual(session);
  });

  it('registers an account with the username', async () => {
    firebase.registerWithEmail.mockResolvedValue({
      displayName: 'Forest',
      email: 'student@rs.school',
      photoURL: null,
    });
    const actions = await load();

    await expect(
      actions.registerAccount('Forest', 'student@rs.school', 'Abcde1!'),
    ).resolves.toMatchObject({ displayName: 'Forest' });
    expect(firebase.registerWithEmail).toHaveBeenCalledWith(
      'Forest',
      'student@rs.school',
      'Abcde1!',
    );
  });

  it('creates the same session after google sign-in, with the photo', async () => {
    firebase.signInWithGoogle.mockResolvedValue({
      displayName: 'Mira Stone',
      email: 'mira@gmail.com',
      photoURL: 'https://photo',
    });
    const actions = await load();

    await expect(actions.loginWithGoogle()).resolves.toEqual({
      displayName: 'Mira Stone',
      email: 'mira@gmail.com',
      authenticatedAt: NOW,
      avatarUrl: 'https://photo',
    });
  });

  it('does not create a session when firebase rejects', async () => {
    firebase.signInWithEmail.mockRejectedValue({ code: 'auth/invalid-credential' });
    const actions = await load();

    await expect(actions.loginWithEmail('a@b.co', 'secret1')).rejects.toEqual({
      code: 'auth/invalid-credential',
    });
    expect(window.localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
  });

  it('signs out of firebase when the account cannot form a session', async () => {
    firebase.signInWithGoogle.mockResolvedValue({ displayName: 'X', email: null, photoURL: null });
    const actions = await load();

    await expect(actions.loginWithGoogle()).rejects.toThrow(/no email/);
    expect(firebase.signOutFromFirebase).toHaveBeenCalledTimes(1);
  });
});
