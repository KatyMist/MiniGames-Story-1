// Общая подготовка окружения для unit-тестов (jsdom).
import { afterEach, vi } from 'vitest';

function noop(): void {
  // Заглушка для API, которых нет в jsdom.
}

// jsdom не реализует matchMedia и scrollTo -- компоненты (мобильное меню,
// карусель, роутер) их вызывают, поэтому даём минимальные заглушки.
if (typeof window.matchMedia !== 'function') {
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
Element.prototype.scrollIntoView = noop;

// ResizeObserver (карусель New Games) в jsdom тоже отсутствует.
if (typeof window.ResizeObserver !== 'function') {
  class ResizeObserverStub {
    observe = noop;
    unobserve = noop;
    disconnect = noop;
  }
  Object.defineProperty(window, 'ResizeObserver', { writable: true, value: ResizeObserverStub });
}

afterEach(() => {
  document.body.replaceChildren();
  document.body.removeAttribute('style');
  window.localStorage.clear();
  vi.useRealTimers();
});
