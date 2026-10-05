// Общая подготовка окружения для unit-тестов (jsdom).
import { afterEach, vi } from 'vitest';

function noop(): void {
  // Заглушка для API, которых нет в jsdom.
}

// jsdom не реализует matchMedia и scrollTo -- компоненты (мобильное меню,
// карусель, роутер) их вызывают, поэтому даём минимальные заглушки.
if (!('matchMedia' in window)) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string): Partial<MediaQueryList> => ({
      matches: false,
      media: query,
      addEventListener: noop,
      removeEventListener: noop,
    }),
  });
}

window.scrollTo = noop;

afterEach(() => {
  document.body.replaceChildren();
  document.body.removeAttribute('style');
  window.localStorage.clear();
  vi.useRealTimers();
});
