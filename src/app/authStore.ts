// Текущее состояние авторизации приложения: активная сессия или гость.
//
// Источник правды -- сессия приложения из localStorage (см. session.ts),
// а не currentUser Firebase. Хранилище перечитывается при каждой проверке:
// если ревьюер вручную поменяет authenticatedAt в DevTools, приложение
// увидит это при следующей проверке (перезагрузка, возврат на вкладку,
// навигация, защищённое действие).

import { showSnackbar } from '../components/snackbar/snackbar';
import {
  clearStoredSession,
  createSession,
  getSessionExpiresAt,
  readStoredSession,
  saveSession,
  type AppSession,
  type SessionProfile,
} from './session';

export type SessionListener = (session: AppSession | undefined) => void;

export type SessionEndReason = 'logout' | 'expired' | 'invalid' | 'removed';

interface SessionStoreOptions {
  // Выход из Firebase. Передаётся снаружи (main -> firebase.ts), чтобы
  // хранилище не зависело от SDK и легко тестировалось.
  signOut: () => Promise<void>;
}

const EXPIRED_MESSAGE = 'Your session has expired. Please log in again.';

const listeners = new Set<SessionListener>();
let current: AppSession | undefined;
let expiryTimer: number | undefined;
let signOutProvider: () => Promise<void> = () => Promise.resolve();

function notify(): void {
  for (const listener of listeners) {
    listener(current);
  }
}

function clearExpiryTimer(): void {
  if (expiryTimer !== undefined) {
    window.clearTimeout(expiryTimer);
    expiryTimer = undefined;
  }
}

// Сессия заканчивается ровно через 5 минут после входа, даже если
// пользователь в это время ничего не делает: по таймеру UI сразу
// переключается в гостевой режим.
function scheduleExpiry(session: AppSession): void {
  clearExpiryTimer();
  const delay = Math.max(0, getSessionExpiresAt(session) - Date.now());
  expiryTimer = window.setTimeout(() => {
    expiryTimer = undefined;
    checkSession();
  }, delay);
}

function setSession(session: AppSession | undefined): void {
  const changed =
    current?.email !== session?.email ||
    current?.authenticatedAt !== session?.authenticatedAt ||
    current?.displayName !== session?.displayName ||
    current?.avatarUrl !== session?.avatarUrl;

  current = session;

  if (session) {
    scheduleExpiry(session);
  } else {
    clearExpiryTimer();
  }

  if (changed) notify();
}

export function getSession(): AppSession | undefined {
  return current;
}

export function isAuthenticated(): boolean {
  return current !== undefined;
}

export function subscribeSession(listener: SessionListener): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

// Успешная авторизация (email/пароль или Google): сохраняем новую сессию
// и переключаем UI в авторизованный режим.
export function startSession(profile: SessionProfile): AppSession {
  const session = createSession(profile);

  saveSession(session);
  setSession(session);

  return session;
}

// Завершение сессии по любой причине: удаляем только свой ключ,
// мгновенно переходим в гостевой режим и выходим из Firebase, чтобы его
// собственная сохранённая авторизация не "воскресила" пользователя.
export async function endSession(reason: SessionEndReason): Promise<void> {
  clearStoredSession();
  setSession(undefined);

  if (reason === 'expired') {
    showSnackbar(EXPIRED_MESSAGE, { variant: 'warning' });
  }

  try {
    await signOutProvider();

    if (reason === 'logout') {
      showSnackbar('You have been logged out.', { variant: 'success' });
    }
  } catch {
    // UI уже в гостевом режиме и останется в нём: currentUser Firebase
    // сам по себе авторизацию не восстанавливает.
    showSnackbar('Could not sign out from Firebase. You are now in guest mode.', {
      variant: 'error',
    });
  }
}

// Проверка сессии перед навигацией, защищёнными действиями, при старте и
// при возврате на вкладку. Возвращает активную сессию или undefined.
export function checkSession(): AppSession | undefined {
  const stored = readStoredSession();

  switch (stored.status) {
    case 'active': {
      setSession(stored.session);
      return stored.session;
    }
    case 'expired': {
      void endSession('expired');
      return undefined;
    }
    case 'invalid': {
      void endSession('invalid');
      return undefined;
    }
    default: {
      // Ключа нет (например, удалён в другой вкладке) -- если сессия была,
      // тоже выходим из Firebase.
      if (current) void endSession('removed');
      return undefined;
    }
  }
}

function handleVisibilityChange(): void {
  if (document.visibilityState === 'visible') checkSession();
}

// Старт приложения: восстанавливаем ещё действующую сессию (не меняя
// authenticatedAt), просроченную/битую -- удаляем и начинаем гостем.
export function initSession(options: SessionStoreOptions): AppSession | undefined {
  signOutProvider = options.signOut;

  document.removeEventListener('visibilitychange', handleVisibilityChange);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  return checkSession();
}
