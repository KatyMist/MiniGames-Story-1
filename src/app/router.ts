// Собственный SPA-роутер на History API (без сторонних библиотек).
//
// URL -- единственный источник правды (Single Source of Truth): любое
// действие пользователя, меняющее "навигируемое" состояние (страница,
// фильтры библиотеки, открытый диалог), не меняет UI напрямую, а пишет
// новый URL через navigate()/updateQuery(). Роутер разбирает URL и
// оповещает подписчиков, а уже они приводят UI в соответствие с URL.
// Тот же путь срабатывает и при deep link (открытие ссылки в новой
// вкладке), и при Back/Forward (popstate).

export type PageName = 'home' | 'library' | 'not-found';

export interface RouteState {
  page: PageName;
  path: string;
  query: URLSearchParams;
}

export type RouteListener = (next: RouteState, previous: RouteState | undefined) => void;

export type QueryPatch = Readonly<Record<string, string | number | undefined>>;

interface NavigateOptions {
  replace?: boolean;
  // Помечает запись истории как "открытие диалога": при закрытии такого
  // диалога достаточно history.back(), и пользователь вернётся ровно на
  // URL страницы под диалогом.
  dialog?: boolean;
}

interface HistoryMarker {
  dialog?: boolean;
}

// Базовый путь приложения: на GitHub Pages сайт живёт в подпапке
// (/MiniGames-Story-1/), локально -- в корне. Vite подставляет BASE_URL
// из vite.config.ts, поэтому роутер одинаково работает в обоих случаях.
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/+$/, '');

const PAGE_BY_PATH: Readonly<Record<string, PageName>> = {
  '/': 'home',
  '/home': 'home',
  '/library': 'library',
};

function stripBase(pathname: string): string {
  let path = pathname;

  if (BASE_PATH && path.startsWith(BASE_PATH)) {
    path = path.slice(BASE_PATH.length);
  }

  path = path.replace(/\/index\.html$/, '/').replace(/\/+$/, '');

  return path === '' ? '/' : path;
}

function readLocation(): RouteState {
  const path = stripBase(window.location.pathname);

  return {
    page: PAGE_BY_PATH[path] ?? 'not-found',
    path,
    query: new URLSearchParams(window.location.search),
  };
}

export function toHref(path: string, query?: URLSearchParams): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const search = query && query.toString() ? `?${query.toString()}` : '';

  return `${BASE_PATH}${normalizedPath}${search}`;
}

const listeners = new Set<RouteListener>();
let current: RouteState | undefined;

function notify(): void {
  const previous = current;
  const next = readLocation();

  if (
    previous &&
    previous.path === next.path &&
    previous.query.toString() === next.query.toString()
  ) {
    return;
  }

  current = next;

  for (const listener of listeners) {
    listener(next, previous);
  }
}

export function getRoute(): RouteState {
  current ??= readLocation();

  return current;
}

export function subscribe(listener: RouteListener): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function navigate(
  path: string,
  query?: URLSearchParams,
  options: NavigateOptions = {},
): void {
  const url = toHref(path, query);
  const currentMarker = (window.history.state ?? {}) as HistoryMarker;
  // replace без явного dialog сохраняет метку текущей записи: смена вкладки
  // Login/Register внутри открытого диалога не должна "терять" то, что
  // диалог был открыт отдельной записью истории.
  const isDialog = options.dialog ?? (options.replace ? Boolean(currentMarker.dialog) : false);
  const marker: HistoryMarker = isDialog ? { dialog: true } : {};

  if (!options.replace && url === `${window.location.pathname}${window.location.search}`) {
    return;
  }

  if (options.replace) {
    window.history.replaceState(marker, '', url);
  } else {
    window.history.pushState(marker, '', url);
  }

  notify();
}

// Меняет только query-параметры текущей страницы. undefined/'' удаляют
// параметр -- так закрытие диалога или сброс фильтра не оставляют в URL
// пустых "?game=".
export function updateQuery(patch: QueryPatch, options: NavigateOptions = {}): void {
  const route = getRoute();
  const query = new URLSearchParams(route.query);

  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined || value === '') {
      query.delete(key);
    } else {
      query.set(key, String(value));
    }
  }

  navigate(route.path, query, options);
}

// Закрытие диалога: если диалог открывали мы сами (pushState с меткой
// dialog), возвращаемся назад по истории -- это ровно "URL страницы под
// диалогом", и Forward снова откроет диалог. Если же диалог пришёл из
// deep link (истории "до" нет), просто убираем его параметр из URL.
export function closeDialog(param: string): void {
  const state = (window.history.state ?? {}) as HistoryMarker;

  if (state.dialog) {
    window.history.back();
    return;
  }

  updateQuery({ [param]: undefined }, { replace: true });
}

function handleLinkClick(event: MouseEvent): void {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  if (!(event.target instanceof Element)) return;

  const link = event.target.closest<HTMLAnchorElement>('a[data-route]');

  if (!link) return;

  event.preventDefault();

  const route = link.dataset.route ?? '/';
  const [path = '/', search = ''] = route.split('?');

  navigate(path, new URLSearchParams(search));
  window.scrollTo({ top: 0 });
}

// Старые ссылки вида #/library (Story 1-2 использовали hash-роутинг)
// переводим в обычные пути, чтобы сохранённые закладки не ломались.
function migrateHashRoute(): void {
  const { hash } = window.location;

  if (!hash.startsWith('#/')) return;

  const url = new URL(hash.slice(1), window.location.origin);
  window.history.replaceState({}, '', toHref(url.pathname, url.searchParams));
}

// GitHub Pages отдаёт 404.html на любой неизвестный путь. Наш 404.html --
// копия index.html, поэтому приложение просто загружается и само решает,
// что показать. Отдельный редирект не нужен.
export function startRouter(): void {
  migrateHashRoute();
  current = readLocation();

  window.addEventListener('popstate', notify);
  document.addEventListener('click', handleLinkClick);
}
