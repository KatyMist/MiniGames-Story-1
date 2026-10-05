// Конфигурация веб-приложения Firebase (Project settings -> Your apps).
// Эти значения не секретны: они идентифицируют проект и в любом случае
// попадают в собранный бандл. Доступ ограничивается настройками самого
// Firebase (включённые провайдеры, Authorized domains).
import type { FirebaseOptions } from 'firebase/app';

export const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCR4spMsTHghB145CVccsAbJqcybImuQ9Q',
  authDomain: 'minigames-katymist.firebaseapp.com',
  projectId: 'minigames-katymist',
  storageBucket: 'minigames-katymist.firebasestorage.app',
  messagingSenderId: '691708875841',
  appId: '1:691708875841:web:1e66ca085bb8409d2122c0',
};
