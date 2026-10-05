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

// В Node.js 25+ есть собственный глобальный localStorage (Web Storage),
// который без флага --localstorage-file не работает и перекрывает
// localStorage из jsdom. Тестам нужно обычное хранилище в памяти, поэтому
// в таком окружении подставляем простую реализацию интерфейса Storage.
class MemoryStorage implements Storage {
  private items = new Map<string, string>();

  get length(): number {
    return this.items.size;
  }

  clear(): void {
    this.items.clear();
  }

  getItem(key: string): string | null {
    return this.items.get(key) ?? null;
  }

  key(index: number): string | null {
    return [...this.items.keys()][index] ?? null;
  }

  removeItem(key: string): void {
    this.items.delete(key);
  }

  setItem(key: string, value: string): void {
    this.items.set(key, String(value));
  }
}

function hasWorkingLocalStorage(): boolean {
  try {
    return typeof window.localStorage.clear === 'function';
  } catch {
    return false;
  }
}

if (!hasWorkingLocalStorage()) {
  const storage = new MemoryStorage();
  Object.defineProperty(window, 'localStorage', { configurable: true, value: storage });
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storage });
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
