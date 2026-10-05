import { updateQuery } from './router';
import { checkSession } from './authStore';
import { showSnackbar } from '../components/snackbar/snackbar';
import type { AuthMode } from '../shared/validation';

// Открытие диалогов -- это смена URL, а сами диалоги открывает подписчик
// роутера в main.ts. Отдельная запись истории (dialog: true) -- чтобы Back
// закрывал диалог и возвращал на URL страницы под ним.

export const ALREADY_AUTHENTICATED_MESSAGE = 'You are already logged in.';

// Пользователь с действующей сессией не должен попадать в диалог
// авторизации ни из UI, ни по ссылке, ни через историю. Сессия
// проверяется заново: просроченная превращает пользователя в гостя, и
// тогда диалог открывается как обычно.
export function isAuthDialogBlocked(): boolean {
  if (!checkSession()) return false;

  showSnackbar(ALREADY_AUTHENTICATED_MESSAGE, { variant: 'info' });
  return true;
}

export function openAuth(mode: AuthMode): void {
  if (isAuthDialogBlocked()) return;

  updateQuery({ auth: mode }, { dialog: true });
}

export function openGameDetails(slug: string): void {
  updateQuery({ game: slug }, { dialog: true });
}
