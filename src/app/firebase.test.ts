import { beforeEach, describe, expect, it, vi } from 'vitest';

const sdk = vi.hoisted(() => ({
  initializeApp: vi.fn(() => ({ name: 'app' })),
  getAuth: vi.fn(() => ({ name: 'auth' })),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  updateProfile: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(() => Promise.resolve()),
  setCustomParameters: vi.fn(),
}));

vi.mock('firebase/app', () => ({ initializeApp: sdk.initializeApp }));
vi.mock('firebase/auth', () => ({
  getAuth: sdk.getAuth,
  signInWithEmailAndPassword: sdk.signInWithEmailAndPassword,
  createUserWithEmailAndPassword: sdk.createUserWithEmailAndPassword,
  updateProfile: sdk.updateProfile,
  signInWithPopup: sdk.signInWithPopup,
  signOut: sdk.signOut,
  GoogleAuthProvider: class {
    setCustomParameters = sdk.setCustomParameters;
  },
}));

async function load() {
  vi.resetModules();
  return import('./firebase');
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('firebase auth wrapper', () => {
  it('initializes the sdk lazily and only once', async () => {
    const firebase = await load();
    expect(sdk.initializeApp).not.toHaveBeenCalled();

    const auth = firebase.getFirebaseAuth();
    firebase.getFirebaseAuth();

    expect(auth).toEqual({ name: 'auth' });
    expect(sdk.initializeApp).toHaveBeenCalledTimes(1);
    expect(sdk.getAuth).toHaveBeenCalledWith({ name: 'app' });
  });

  it('signs in with email and password', async () => {
    const user = { email: 'student@rs.school' };
    sdk.signInWithEmailAndPassword.mockResolvedValue({ user });
    const firebase = await load();

    await expect(firebase.signInWithEmail('student@rs.school', 'secret1')).resolves.toBe(user);
    expect(sdk.signInWithEmailAndPassword).toHaveBeenCalledWith(
      { name: 'auth' },
      'student@rs.school',
      'secret1',
    );
  });

  it('registers and saves the username as displayName', async () => {
    const user = { email: 'student@rs.school' };
    sdk.createUserWithEmailAndPassword.mockResolvedValue({ user });
    const firebase = await load();

    await expect(
      firebase.registerWithEmail('Forest', 'student@rs.school', 'Abcde1!'),
    ).resolves.toBe(user);
    expect(sdk.updateProfile).toHaveBeenCalledWith(user, { displayName: 'Forest' });
  });

  it('signs in with a google popup asking to select an account', async () => {
    const user = { email: 'g@gmail.com' };
    sdk.signInWithPopup.mockResolvedValue({ user });
    const firebase = await load();

    await expect(firebase.signInWithGoogle()).resolves.toBe(user);
    expect(sdk.setCustomParameters).toHaveBeenCalledWith({ prompt: 'select_account' });
  });

  it('signs out', async () => {
    const firebase = await load();

    await firebase.signOutFromFirebase();

    expect(sdk.signOut).toHaveBeenCalledWith({ name: 'auth' });
  });
});
