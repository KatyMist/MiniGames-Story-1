// Сценарии авторизации: Firebase подтверждает личность, после чего
// создаётся сессия приложения (одна и та же для email/пароля и Google).

import type { User } from 'firebase/auth';
import { startSession } from './authStore';
import {
  registerWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOutFromFirebase,
} from './firebase';
import type { AppSession } from './session';

async function completeAuthentication(user: User): Promise<AppSession> {
  try {
    return startSession({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  } catch (error) {
    // Сессию создать не удалось (например, у аккаунта нет email) --
    // не оставляем пользователя "наполовину" вошедшим в Firebase.
    await signOutFromFirebase().catch(() => {});
    throw error;
  }
}

export async function loginWithEmail(email: string, password: string): Promise<AppSession> {
  const user = await signInWithEmail(email.trim(), password);

  return completeAuthentication(user);
}

export async function registerAccount(
  username: string,
  email: string,
  password: string,
): Promise<AppSession> {
  const user = await registerWithEmail(username, email.trim(), password);

  return completeAuthentication(user);
}

export async function loginWithGoogle(): Promise<AppSession> {
  const user = await signInWithGoogle();

  return completeAuthentication(user);
}
