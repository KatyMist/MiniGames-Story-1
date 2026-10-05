import { describe, expect, it } from 'vitest';
import { getAuthErrorCode, getAuthErrorMessage, isAuthCancelled } from './authErrors';

describe('auth errors', () => {
  it('reads the firebase error code', () => {
    expect(getAuthErrorCode({ code: 'auth/invalid-credential' })).toBe('auth/invalid-credential');
    expect(getAuthErrorCode({ code: 42 })).toBe('');
    expect(getAuthErrorCode(new Error('boom'))).toBe('');
    expect(getAuthErrorCode(null)).toBe('');
  });

  it('maps known codes to user friendly messages', () => {
    expect(getAuthErrorMessage({ code: 'auth/invalid-credential' })).toBe(
      'Incorrect email or password.',
    );
    expect(getAuthErrorMessage({ code: 'auth/email-already-in-use' })).toMatch(/already exists/);
    expect(getAuthErrorMessage({ code: 'auth/network-request-failed' })).toMatch(/Network/);
  });

  it('uses a generic message for unknown errors and shows an unknown firebase code', () => {
    expect(getAuthErrorMessage(new Error('x'))).toBe('Authentication failed. Please try again.');
    expect(getAuthErrorMessage({ code: 'auth/internal-error' })).toBe(
      'Authentication failed. Please try again. (auth/internal-error)',
    );
    expect(getAuthErrorMessage({ code: 'auth/configuration-not-found' })).toMatch(/not configured/);
  });

  it('recognizes a closed or canceled google popup', () => {
    expect(isAuthCancelled({ code: 'auth/popup-closed-by-user' })).toBe(true);
    expect(isAuthCancelled({ code: 'auth/cancelled-popup-request' })).toBe(true);
    expect(isAuthCancelled({ code: 'auth/popup-blocked' })).toBe(false);
  });
});
