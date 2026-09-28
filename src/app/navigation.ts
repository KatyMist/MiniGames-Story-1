import { updateQuery } from './router';
import type { AuthMode } from '../components/auth-dialog/authDialog';

// Открытие диалогов -- это смена URL, а сами диалоги открывает подписчик
// роутера в main.ts. Отдельная запись истории (dialog: true) -- чтобы Back
// закрывал диалог и возвращал на URL страницы под ним.

export function openAuth(mode: AuthMode): void {
  updateQuery({ auth: mode }, { dialog: true });
}

export function openGameDetails(slug: string): void {
  updateQuery({ game: slug }, { dialog: true });
}
