// Отображение профиля пользователя: имя в шапке, инициалы для аватара и
// имя автора комментария (Story 4, RSS-QS-4-3-1 и RSS-QS-4-2-2).

import type { AppSession } from '../app/session';

export const FALLBACK_PROFILE_NAME = 'Player';

// API комментариев принимает authorName длиной 2-30 символов.
export const AUTHOR_NAME_MIN_LENGTH = 2;
export const AUTHOR_NAME_MAX_LENGTH = 30;

type ProfileSource = Pick<AppSession, 'displayName' | 'email'>;

function getEmailLocalPart(email: string): string {
  const atIndex = email.indexOf('@');

  return (atIndex === -1 ? email : email.slice(0, atIndex)).trim();
}

// displayName -> часть email до "@" -> общее имя.
export function getProfileName(profile: ProfileSource): string {
  const displayName = profile.displayName.trim();
  if (displayName) return displayName;

  const localPart = getEmailLocalPart(profile.email);
  if (localPart) return localPart;

  return FALLBACK_PROFILE_NAME;
}

// Первый буквенно-цифровой символ слова (Unicode: буквы любых алфавитов и
// цифры), в верхнем регистре.
function getFirstAlphanumeric(word: string): string {
  const match = /[\p{L}\p{N}]/u.exec(word);

  return match ? match[0].toUpperCase() : '';
}

// Инициалы: одно слово -> одна буква, два и больше -> первые буквы двух
// первых слов. Пустая строка -- показываем общий аватар-заглушку.
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 1) return getFirstAlphanumeric(words[0] ?? '');

  return words
    .slice(0, 2)
    .map((word) => getFirstAlphanumeric(word))
    .join('');
}

function isValidAuthorName(name: string): boolean {
  return name.length >= AUTHOR_NAME_MIN_LENGTH && name.length <= AUTHOR_NAME_MAX_LENGTH;
}

// Имя автора для POST комментария. displayName у Google-аккаунта может
// отсутствовать или не влезать в 2-30 символов -- тогда берём часть email
// до "@" (обрезанную до 30), а если не подходит и она -- общее имя.
export function getCommentAuthorName(profile: ProfileSource): string {
  const displayName = profile.displayName.trim();
  if (isValidAuthorName(displayName)) return displayName;

  const localPart = getEmailLocalPart(profile.email).slice(0, AUTHOR_NAME_MAX_LENGTH);
  if (isValidAuthorName(localPart)) return localPart;

  return FALLBACK_PROFILE_NAME;
}

// Буква в аватаре комментария: первый непробельный символ имени в
// верхнем регистре (Array.from -- чтобы не разрезать эмодзи/суррогаты).
export function getAvatarLetter(name: string): string {
  const [first = ''] = Array.from(name.trim());

  return first.toUpperCase();
}
