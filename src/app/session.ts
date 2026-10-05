// Клиентская сессия приложения MiniGames (Story 4, RSS-QS-4-3-2).
//
// Firebase Authentication только подтверждает личность пользователя, а
// "залогинен ли пользователь" для UI решает эта сессия. Она живёт ровно
// 5 минут с момента успешной авторизации: перезагрузка страницы и работа
// с приложением срок не продлевают (authenticatedAt не меняется).
//
// В localStorage лежит только то, что нужно интерфейсу и API: имя, email,
// время входа и (если есть) аватар. Пароли и токены Firebase сюда не
// попадают -- запись доступна пользователю и не является защитой.

// Ключ задокументирован в README: по нему ревьюер находит сессию в
// DevTools -> Application -> Local Storage.
export const SESSION_STORAGE_KEY = 'minigames:katymist-minigames:app-session';

export const SESSION_LIFETIME_MS = 5 * 60 * 1000;

export interface AppSession {
  displayName: string;
  email: string;
  // Date.now() в момент успешной авторизации.
  authenticatedAt: number;
  avatarUrl?: string;
}

// Минимальный профиль пользователя Firebase, из которого строится сессия.
export interface SessionProfile {
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
}

export type StoredSessionState =
  | { status: 'none' }
  | { status: 'invalid' }
  | { status: 'expired'; session: AppSession }
  | { status: 'active'; session: AppSession };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Проверка формы сохранённого объекта: обязательные поля нужного типа,
// avatarUrl -- необязательная строка. Всё остальное -- невалидная запись.
export function parseSession(value: unknown): AppSession | undefined {
  if (!isRecord(value)) return undefined;

  const { displayName, email, authenticatedAt, avatarUrl } = value;

  if (typeof displayName !== 'string') return undefined;
  if (typeof email !== 'string' || email.trim() === '') return undefined;
  if (typeof authenticatedAt !== 'number' || !Number.isFinite(authenticatedAt)) return undefined;
  if (authenticatedAt <= 0) return undefined;
  if (avatarUrl !== undefined && typeof avatarUrl !== 'string') return undefined;

  const session: AppSession = { displayName, email, authenticatedAt };
  if (avatarUrl) session.avatarUrl = avatarUrl;

  return session;
}

export function createSession(profile: SessionProfile, now: number = Date.now()): AppSession {
  const email = profile.email?.trim() ?? '';

  // Email -- идентификатор пользователя во всех запросах API, без него
  // сессия бесполезна.
  if (!email) {
    throw new Error('The account has no email address.');
  }

  const session: AppSession = {
    displayName: profile.displayName?.trim() ?? '',
    email,
    authenticatedAt: now,
  };

  if (profile.photoURL) session.avatarUrl = profile.photoURL;

  return session;
}

export function getSessionExpiresAt(session: AppSession): number {
  return session.authenticatedAt + SESSION_LIFETIME_MS;
}

// Время входа "из будущего" (например, подправленное вручную) тоже
// считаем недействительным: иначе так можно было бы продлить сессию.
export function isSessionExpired(session: AppSession, now: number = Date.now()): boolean {
  return now >= getSessionExpiresAt(session) || session.authenticatedAt > now;
}

export function saveSession(session: AppSession, storage: Storage = window.localStorage): void {
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

// Удаляется только ключ сессии приложения -- остальные данные
// localStorage не трогаем.
export function clearStoredSession(storage: Storage = window.localStorage): void {
  try {
    storage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // Хранилище недоступно (приватный режим/запрет браузера) -- удалять нечего.
  }
}

export function readStoredSession(
  now: number = Date.now(),
  storage: Storage = window.localStorage,
): StoredSessionState {
  let raw: string | null;

  try {
    raw = storage.getItem(SESSION_STORAGE_KEY);
  } catch {
    return { status: 'none' };
  }

  if (raw === null) return { status: 'none' };

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return { status: 'invalid' };
  }

  const session = parseSession(parsed);

  if (!session) return { status: 'invalid' };
  if (isSessionExpired(session, now)) return { status: 'expired', session };

  return { status: 'active', session };
}
