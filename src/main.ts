// Точка входа: глобальные стили и запуск приложения после загрузки DOM.
// Вся логика -- в src/app/app.ts.
import './styles/main.scss';
import { mountApp } from './app/app';

document.addEventListener('DOMContentLoaded', mountApp);
