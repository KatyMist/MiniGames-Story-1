import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// Unit-тесты (Vitest). Окружение -- jsdom: компоненты строят DOM и
// реагируют на события, а сеть (fetch) и Firebase в тестах подменяются
// моками -- реальные API и учётные данные не нужны.
export default mergeConfig(
  viteConfig({ mode: 'test', command: 'serve' }),
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.ts'],
      setupFiles: ['src/test/setup.ts'],
      restoreMocks: true,
      // Стили компонентов в тестах не нужны (проверяется поведение, а не
      // вид) -- Vite подставляет вместо них пустые модули.
      css: false,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        // Цель задания -- не меньше 80% покрытия операторов по всем
        // включённым файлам; ниже порога test:coverage завершится ошибкой.
        thresholds: {
          statements: 80,
        },
        // В отчёт попадают все исходники приложения, даже не импортированные
        // ни одним тестом.
        all: true,
        include: ['src/**/*.ts'],
        exclude: [
          // Сами тесты и вспомогательные файлы для них -- не код приложения.
          'src/**/*.test.ts',
          'src/test/**',
          // Только декларации типов Vite (/// <reference>), кода нет.
          'src/vite-env.d.ts',
          // Точка входа: импорт стилей и вызов mountApp() по DOMContentLoaded,
          // логики нет (вся сборка приложения -- в src/app/app.ts, покрыта).
          'src/main.ts',
          // Объект-константа с публичной конфигурацией Firebase, логики нет.
          'src/app/firebaseConfig.ts',
        ],
      },
    },
  }),
);
