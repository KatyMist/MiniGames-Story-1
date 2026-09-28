import './library-results.scss';
import {
  createEmptyState,
  createErrorBanner,
  createNotFoundState,
  createSkeleton,
} from '../feedback/feedback';
import type { GameSummary } from '../../shared/api';
import { formatCompactNumber } from '../../shared/format';
import { getGameImages } from '../../shared/gameImages';

// Карточка библиотеки в том виде, в каком её рисует UI (данные -- из
// ответа GET /api/games).
export interface LibraryCard {
  slug: string;
  title: string;
  imageUrl?: string;
  categoryLabel: string;
  price: string;
  rating: number;
  likes: string;
  description: string;
}

export function toLibraryCard(game: GameSummary, categoryLabel: string): LibraryCard {
  return {
    slug: game.slug,
    title: game.name,
    imageUrl: getGameImages(game.slug)?.card,
    categoryLabel,
    price: game.price,
    rating: game.rating,
    likes: formatCompactNumber(game.likesCount),
    description: game.shortDescription,
  };
}

// Раньше лайки сюда не добавляла (см. историю) -- по 68 Hug × 24 Hug из
// Dev Mode-скрина для десктопной сетки казалось, что влезает только
// рейтинг. По присланным мокапам tablet/mobile лайки на карточке ЕСТЬ
// (звезда+рейтинг и сердце+лайки рядом) -- то узкое измерение, видимо,
// было по другому элементу. Возвращаю лайки, как на скринах.
function createStat(
  iconName: 'star' | 'favorite',
  modifier: string,
  value: string,
): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = `library-results__stat ${modifier}`;

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined library-results__stat-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = iconName;

  const text = document.createElement('span');
  text.className = 'library-results__stat-value';
  text.textContent = value;

  wrapper.append(icon, text);
  return wrapper;
}

function createDetailsButton(title: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'library-results__details';
  button.textContent = 'Details';
  button.setAttribute('aria-label', `Details for ${title}`);
  button.addEventListener('click', onClick);
  return button;
}

// Обложка игры. Если картинки этой игры в проекте нет -- блок того же
// размера с градиентом и названием (CSS-заглушка вместо битого <img>).
function createCardImage(game: LibraryCard): HTMLElement {
  if (game.imageUrl) {
    const image = document.createElement('img');
    image.className = 'library-results__image';
    image.src = game.imageUrl;
    image.alt = game.title;
    image.loading = 'lazy';
    return image;
  }

  const placeholder = document.createElement('div');
  placeholder.className = 'library-results__image library-results__image--placeholder';
  placeholder.setAttribute('role', 'img');
  placeholder.setAttribute('aria-label', game.title);

  const text = document.createElement('span');
  text.className = 'library-results__image-title';
  text.textContent = game.title;
  placeholder.append(text);

  return placeholder;
}

function createCard(game: LibraryCard, onDetailsClick: (slug: string) => void): HTMLLIElement {
  const card = document.createElement('li');
  card.className = 'library-results__card';

  const content = document.createElement('div');
  content.className = 'library-results__content';

  const topRow = document.createElement('div');
  topRow.className = 'library-results__top';

  const titleGroup = document.createElement('div');
  titleGroup.className = 'library-results__title-group';

  // h2, не h3 -- на странице библиотеки нет промежуточного h2 (в отличие от
  // "New Games" на главной), так что после h1 "Game Library" следующий
  // уровень -- сразу заголовки карточек (без пропуска уровня h1 -> h3).
  const title = document.createElement('h2');
  title.className = 'library-results__title';
  title.textContent = game.title;

  const badge = document.createElement('span');
  badge.className = 'library-results__badge';
  badge.textContent = game.categoryLabel;

  titleGroup.append(title, badge);

  const price = document.createElement('span');
  price.className = 'library-results__price';
  if (game.price === 'Free') {
    price.classList.add('library-results__price--free');
  }
  price.textContent = game.price;

  topRow.append(titleGroup, price);

  const description = document.createElement('p');
  description.className = 'library-results__description';
  description.textContent = game.description;

  const stats = document.createElement('div');
  stats.className = 'library-results__stats';
  stats.append(
    createStat('star', 'library-results__stat--rating', game.rating.toFixed(1)),
    createStat('favorite', 'library-results__stat--likes', game.likes),
  );

  const bottomRow = document.createElement('div');
  bottomRow.className = 'library-results__bottom';
  bottomRow.append(
    stats,
    createDetailsButton(game.title, () => onDetailsClick(game.slug)),
  );

  content.append(topRow, description, bottomRow);
  card.append(createCardImage(game), content);

  return card;
}

// Карточка-скелетон повторяет форму настоящей: картинка + строки текста.
function createSkeletonCard(): HTMLLIElement {
  const card = document.createElement('li');
  card.className = 'library-results__card library-results__card--skeleton';
  card.setAttribute('aria-hidden', 'true');

  const content = document.createElement('div');
  content.className = 'library-results__skeleton-content';
  content.append(
    createSkeleton('library-results__skeleton-line library-results__skeleton-line--title'),
    createSkeleton('library-results__skeleton-line'),
    createSkeleton('library-results__skeleton-line library-results__skeleton-line--short'),
    createSkeleton('library-results__skeleton-line library-results__skeleton-line--button'),
  );

  card.append(createSkeleton('library-results__image library-results__skeleton-image'), content);

  return card;
}

function createPageButton(label: string, iconName?: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'library-results__page';

  if (iconName) {
    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined library-results__page-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = iconName;
    button.append(icon);
    button.setAttribute('aria-label', label);
  } else {
    button.textContent = label;
    button.setAttribute('aria-label', `Page ${label}`);
  }

  return button;
}

export interface PaginationState {
  page: number;
  totalPages: number;
}

export interface LibraryResultsOptions {
  onDetailsClick: (slug: string) => void;
  onPageChange: (page: number) => void;
}

export interface LibraryResultsController {
  element: HTMLElement;
  showLoading: (pagination: PaginationState) => void;
  showGames: (games: readonly LibraryCard[], pagination: PaginationState) => void;
  showEmpty: () => void;
  showError: (message: string, onRetry: () => void) => void;
  showNotFound: (title: string, message: string, onReset: () => void) => void;
}

const SKELETON_CARD_COUNT = 6;

// Видимых кнопок-страниц: 4 на desktop/tablet, 3 на mobile (< 768px).
const MOBILE_QUERY = '(max-width: 767px)';
const VISIBLE_PAGES_DESKTOP = 4;
const VISIBLE_PAGES_MOBILE = 3;

// "Окно" номеров страниц вокруг текущей: если страниц больше, чем
// помещается кнопок, показываем соседние с текущей, не выходя за 1..total.
export function getPageWindow(page: number, totalPages: number, visibleCount: number): number[] {
  const size = Math.min(visibleCount, totalPages);
  const idealStart = page - Math.floor((size - 1) / 2);
  const start = Math.min(Math.max(idealStart, 1), totalPages - size + 1);

  return Array.from({ length: size }, (_, index) => start + index);
}

export function createLibraryResults(options: LibraryResultsOptions): LibraryResultsController {
  const section = document.createElement('section');
  section.className = 'library-results';
  section.setAttribute('aria-label', 'Game search results');

  const grid = document.createElement('ul');
  grid.className = 'library-results__grid';

  // Баннер ошибки / "нет данных" / "не найдено" -- вместо сетки карточек.
  const status = document.createElement('div');
  status.className = 'library-results__status';
  status.hidden = true;

  const pagination = document.createElement('nav');
  pagination.className = 'library-results__pagination';
  pagination.setAttribute('aria-label', 'Pagination');

  let pageState: PaginationState = { page: 1, totalPages: 1 };
  let isPaginationDisabled = false;
  const mobileQuery = window.matchMedia(MOBILE_QUERY);

  // Кнопки пагинации строятся только из метаданных ответа сервера
  // (meta.page и meta.totalPages).
  function renderPagination(disabled = false): void {
    isPaginationDisabled = disabled;
    const { page, totalPages } = pageState;
    const lastPage = Math.max(totalPages, 1);
    const visibleCount = mobileQuery.matches ? VISIBLE_PAGES_MOBILE : VISIBLE_PAGES_DESKTOP;

    const prev = createPageButton('Previous page', 'arrow_back');
    prev.classList.add('library-results__page--nav');
    prev.disabled = disabled || page <= 1;
    prev.addEventListener('click', () => options.onPageChange(page - 1));

    const pageButtons: HTMLButtonElement[] = [];
    for (const pageNumber of getPageWindow(page, lastPage, visibleCount)) {
      const pageButton = createPageButton(String(pageNumber));
      if (pageNumber === page) {
        pageButton.classList.add('library-results__page--active');
        pageButton.setAttribute('aria-current', 'page');
      }
      pageButton.disabled = disabled;
      pageButton.addEventListener('click', () => {
        if (pageNumber !== page) options.onPageChange(pageNumber);
      });
      pageButtons.push(pageButton);
    }

    const next = createPageButton('Next page', 'arrow_forward');
    next.classList.add('library-results__page--nav');
    next.disabled = disabled || page >= lastPage;
    next.addEventListener('click', () => options.onPageChange(page + 1));

    pagination.replaceChildren(prev, ...pageButtons, next);
  }

  function showStatus(content: HTMLElement): void {
    section.removeAttribute('aria-busy');
    grid.hidden = true;
    grid.replaceChildren();
    status.replaceChildren(content);
    status.hidden = false;
  }

  function showLoading(nextPagination: PaginationState): void {
    pageState = nextPagination;
    section.setAttribute('aria-busy', 'true');
    status.hidden = true;
    status.replaceChildren();
    grid.hidden = false;
    grid.replaceChildren(
      ...Array.from({ length: SKELETON_CARD_COUNT }, () => createSkeletonCard()),
    );
    pagination.hidden = false;
    renderPagination(true);
  }

  function showGames(games: readonly LibraryCard[], nextPagination: PaginationState): void {
    pageState = nextPagination;
    section.removeAttribute('aria-busy');
    status.hidden = true;
    status.replaceChildren();
    grid.hidden = false;
    grid.replaceChildren(...games.map((game) => createCard(game, options.onDetailsClick)));
    pagination.hidden = false;
    renderPagination();
  }

  function showEmpty(): void {
    showStatus(createEmptyState('No games found', 'There are no games in this category yet.'));
    pageState = { page: 1, totalPages: 1 };
    pagination.hidden = false;
    renderPagination(true);
  }

  function showError(message: string, onRetry: () => void): void {
    showStatus(createErrorBanner(message, onRetry));
    pagination.hidden = true;
  }

  function showNotFound(title: string, message: string, onReset: () => void): void {
    showStatus(createNotFoundState(title, message, { label: 'Reset filters', onClick: onReset }));
    pageState = { page: 1, totalPages: 1 };
    pagination.hidden = false;
    renderPagination(true);
  }

  // Переход через 768px меняет число видимых кнопок -- перерисовываем.
  mobileQuery.addEventListener('change', () => {
    if (section.isConnected) renderPagination(isPaginationDisabled);
  });

  section.append(grid, status, pagination);

  return { element: section, showLoading, showGames, showEmpty, showError, showNotFound };
}
