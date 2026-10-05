// Конфигурация веб-приложения Firebase (Project settings -> Your apps).
// Эти значения не секретны: они идентифицируют проект и в любом случае
// попадают в собранный бандл. Доступ ограничивается настройками самого
// Firebase (включённые провайдеры, Authorized domains).
import type { FirebaseOptions } from 'firebase/app';

export const firebaseConfig: FirebaseOptions = {
  apiKey: 'PLACEHOLDER_API_KEY',
  authDomain: 'minigames-katymist.firebaseapp.com',
  projectId: 'minigames-katymist',
  storageBucket: 'minigames-katymist.firebasestorage.app',
  messagingSenderId: 'PLACEHOLDER_SENDER_ID',
  appId: 'PLACEHOLDER_APP_ID',
};
