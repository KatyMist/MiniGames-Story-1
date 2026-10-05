// Защита действий, доступных только авторизованным пользователям
// (избранное, комментарии, лайки). Backend эти запросы не проверяет --
// решение принимает клиентская сессия приложения.

import { checkSession, isAuthenticated } from './authStore';
import { openAuth } from './navigation';
import type { AppSession } from './session';
import { showSnackbar } from '../components/snackbar/snackbar';

// Возвращает активную сессию или undefined. Во втором случае запрос не
// отправляется, а вместо этого открывается диалог авторизации (поверх
// Game Details -- его состояние и URL сохраняются). Повторять заблокированное
// действие после входа приложение не будет: пользователь сделает это сам.
export function requireSession(guestMessage: string): AppSession | undefined {
  const hadSession = isAuthenticated();
  const session = checkSession();

  if (session) return session;

  // Гостю объясняем, зачем открылся диалог. Если же сессия только что
  // истекла, checkSession уже показал своё уведомление об истечении.
  if (!hadSession) showSnackbar(guestMessage, { variant: 'warning' });

  openAuth('login');
  return undefined;
}
