// Firebase Authentication -- поставщик личности пользователя (Story 4).
// Здесь только вызовы SDK; решение "авторизован ли пользователь в UI"
// принимает сессия приложения (session.ts / authStore.ts).

import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type Auth,
  type User,
} from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

let auth: Auth | undefined;

// SDK инициализируется лениво -- при первом обращении к авторизации.
export function getFirebaseAuth(): Auth {
  auth ??= getAuth(initializeApp(firebaseConfig));

  return auth;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);

  return credential.user;
}

// Регистрация: создаём аккаунт и сохраняем username как displayName.
export async function registerWithEmail(
  username: string,
  email: string,
  password: string,
): Promise<User> {
  const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
  await updateProfile(credential.user, { displayName: username });

  return credential.user;
}

export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  const credential = await signInWithPopup(getFirebaseAuth(), provider);

  return credential.user;
}

export function signOutFromFirebase(): Promise<void> {
  return signOut(getFirebaseAuth());
}
