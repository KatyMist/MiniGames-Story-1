// Понятные пользователю сообщения для ошибок Firebase Authentication.

const MESSAGES: Readonly<Record<string, string>> = {
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/invalid-login-credentials': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'The password is too weak.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/popup-blocked': 'The sign-in popup was blocked by the browser. Allow popups and try again.',
  'auth/popup-closed-by-user': 'Google sign-in was canceled.',
  'auth/cancelled-popup-request': 'Google sign-in was canceled.',
  'auth/user-cancelled': 'Google sign-in was canceled.',
  'auth/account-exists-with-different-credential':
    'An account with this email already exists. Sign in with email and password.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled.',
  'auth/unauthorized-domain': 'Sign-in is not allowed from this domain.',
};

const CANCEL_CODES = new Set([
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
  'auth/user-cancelled',
]);

const DEFAULT_MESSAGE = 'Authentication failed. Please try again.';

export function getAuthErrorCode(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const { code } = error;
    if (typeof code === 'string') return code;
  }

  return '';
}

export function getAuthErrorMessage(error: unknown): string {
  return MESSAGES[getAuthErrorCode(error)] ?? DEFAULT_MESSAGE;
}

// Пользователь сам закрыл окно Google -- это не ошибка, а отмена.
export function isAuthCancelled(error: unknown): boolean {
  return CANCEL_CODES.has(getAuthErrorCode(error));
}
