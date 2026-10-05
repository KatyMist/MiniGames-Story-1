import { describe, expect, it } from 'vitest';
import {
  SESSION_LIFETIME_MS,
  SESSION_STORAGE_KEY,
  clearStoredSession,
  createSession,
  getSessionExpiresAt,
  isSessionExpired,
  parseSession,
  readStoredSession,
  saveSession,
} from './session';
import { makeSession } from '../test/helpers';

const NOW = 1_700_000_000_000;

describe('createSession', () => {
  it('stores only display name, email, authentication time and avatar', () => {
    const session = createSession(
      { displayName: ' Forest ', email: 'student@rs.school', photoURL: 'https://img/a.png' },
      NOW,
    );

    expect(session).toEqual({
      displayName: 'Forest',
      email: 'student@rs.school',
      authenticatedAt: NOW,
      avatarUrl: 'https://img/a.png',
    });
  });

  it('omits avatarUrl when the profile has no photo and allows empty name', () => {
    const session = createSession({ displayName: null, email: 'a@b.co', photoURL: null }, NOW);

    expect(session).toEqual({ displayName: '', email: 'a@b.co', authenticatedAt: NOW });
    expect('avatarUrl' in session).toBe(false);
  });

  it('throws when the account has no email', () => {
    expect(() => createSession({ displayName: 'X', email: null })).toThrow(/no email/);
  });
});

describe('parseSession', () => {
  it('accepts a well-formed session object', () => {
    const value = { displayName: 'A', email: 'a@b.co', authenticatedAt: NOW, avatarUrl: 'u' };
    expect(parseSession(value)).toEqual(value);
  });

  it.each([
    ['null', null],
    ['an array', []],
    ['a string', 'session'],
    ['missing email', { displayName: 'A', authenticatedAt: NOW }],
    ['empty email', { displayName: 'A', email: ' ', authenticatedAt: NOW }],
    ['numeric name', { displayName: 1, email: 'a@b.co', authenticatedAt: NOW }],
    ['string timestamp', { displayName: 'A', email: 'a@b.co', authenticatedAt: String(NOW) }],
    ['NaN timestamp', { displayName: 'A', email: 'a@b.co', authenticatedAt: Number.NaN }],
    ['negative timestamp', { displayName: 'A', email: 'a@b.co', authenticatedAt: -1 }],
    [
      'non-string avatar',
      { displayName: 'A', email: 'a@b.co', authenticatedAt: NOW, avatarUrl: 5 },
    ],
  ])('rejects %s', (_label, value) => {
    expect(parseSession(value)).toBeUndefined();
  });
});

describe('expiration', () => {
  it('expires exactly 5 minutes after authentication', () => {
    const session = makeSession({ authenticatedAt: NOW });

    expect(SESSION_LIFETIME_MS).toBe(300_000);
    expect(getSessionExpiresAt(session)).toBe(NOW + 300_000);
    expect(isSessionExpired(session, NOW + 299_999)).toBe(false);
    expect(isSessionExpired(session, NOW + 300_000)).toBe(true);
  });

  it('treats a timestamp from the future as expired', () => {
    expect(isSessionExpired(makeSession({ authenticatedAt: NOW + 1000 }), NOW)).toBe(true);
  });
});

describe('storage', () => {
  it('saves the session as JSON under the namespaced key', () => {
    const session = makeSession({ authenticatedAt: NOW });
    saveSession(session);

    expect(SESSION_STORAGE_KEY).toMatch(/^minigames:.+:app-session$/);
    expect(JSON.parse(window.localStorage.getItem(SESSION_STORAGE_KEY) ?? '')).toEqual(session);
  });

  it('reads none / active / expired / invalid states', () => {
    expect(readStoredSession(NOW)).toEqual({ status: 'none' });

    const session = makeSession({ authenticatedAt: NOW });
    saveSession(session);
    expect(readStoredSession(NOW + 1000)).toEqual({ status: 'active', session });
    expect(readStoredSession(NOW + SESSION_LIFETIME_MS)).toEqual({ status: 'expired', session });

    window.localStorage.setItem(SESSION_STORAGE_KEY, '{not json');
    expect(readStoredSession(NOW)).toEqual({ status: 'invalid' });

    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ email: 'a@b.co' }));
    expect(readStoredSession(NOW)).toEqual({ status: 'invalid' });
  });

  it('removes only its own key', () => {
    window.localStorage.setItem('other-app', 'keep me');
    saveSession(makeSession());

    clearStoredSession();

    expect(window.localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem('other-app')).toBe('keep me');
  });

  it('survives an unavailable storage', () => {
    const brokenStorage = {
      getItem: () => {
        throw new Error('denied');
      },
      removeItem: () => {
        throw new Error('denied');
      },
    } as unknown as Storage;

    expect(readStoredSession(NOW, brokenStorage)).toEqual({ status: 'none' });
    expect(() => clearStoredSession(brokenStorage)).not.toThrow();
  });
});
