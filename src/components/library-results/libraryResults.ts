import './library-results.scss';
import type { LibraryGame } from '../../shared/libraryGames';

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

function createDetailsButton(title: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'library-results__details';
  button.textContent = 'Details';
  button.setAttribute('aria-label', `Details for ${title}`);
  return button;
}

function createCard(game: LibraryGame): HTMLLIElement {
  const card = document.createElement('li');
  card.className = 'library-results__card';

  const image = document.createElement('img');
  image.className = 'library-results__image';
  image.src = game.imageUrl;
  image.alt = game.title;
  image.loading = 'lazy';

  const content = document.createElement('div');
  content.className = 'library-results__content';

  const topRow = document.createElement('div');
  topRow.className = 'library-results__top';

  const titleGroup = document.createElement('div');
  titleGroup.className = 'library-results__title-group';

  const title = document.createElement('h3');
  title.className = 'library-results__title';
  title.textContent = game.title;

  const badge = document.createElement('span');
  badge.className = 'library-results__badge';
  badge.textContent = game.category;

  titleGroup.append(title, badge);

  const price = document.createElement('span');
  price.className = 'library-results__price';
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
  bottomRow.append(stats, createDetailsButton(game.title));

  content.append(topRow, description, bottomRow);
  card.append(image, content);

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
  }

  return button;
}

const PAGE_SIZE = 4;

// Пагинация -- полноценная: количество кнопок-страниц считается от
// текущего (уже отфильтрованного) списка игр, а не зашито статично.
// setPage меняет currentPage и просит вызывающий код перерисовать и грид,
// и саму пагинацию (активная кнопка/disabled-состояние Prev/Next).
interface PaginationController extends HTMLDivElement {
  render: () => void;
}

function createPagination(
  getTotalPages: () => number,
  getCurrentPage: () => number,
  setPage: (page: number) => void,
): PaginationController {
  const pagination = document.createElement('div');
  pagination.className = 'library-results__pagination';

  function render(): void {
    pagination.replaceChildren();

    const totalPages = getTotalPages();
    const currentPage = getCurrentPage();

    const prev = createPageButton('Previous page', 'arrow_back');
    prev.classList.add('library-results__page--nav');
    prev.disabled = currentPage <= 1;
    prev.addEventListener('click', () => setPage(currentPage - 1));
    pagination.append(prev);

    for (let page = 1; page <= totalPages; page += 1) {
      const pageButton = createPageButton(String(page));
      if (page === currentPage) {
        pageButton.classList.add('library-results__page--active');
        pageButton.setAttribute('aria-current', 'page');
      }
      pageButton.addEventListener('click', () => setPage(page));
      pagination.append(pageButton);
    }

    const next = createPageButton('Next page', 'arrow_forward');
    next.classList.add('library-results__page--nav');
    next.disabled = currentPage >= totalPages;
    next.addEventListener('click', () => setPage(currentPage + 1));
    pagination.append(next);
  }

  render();

  return Object.assign(pagination, { render });
}

function createEmptyState(): HTMLParagraphElement {
  const message = document.createElement('p');
  message.className = 'library-results__empty';
  message.textContent = 'No games match this category yet.';
  message.hidden = true;
  return message;
}

export interface LibraryResultsController {
  element: HTMLElement;
  update: (games: readonly LibraryGame[]) => void;
}

export function createLibraryResults(games: readonly LibraryGame[]): LibraryResultsController {
  const section = document.createElement('section');
  section.className = 'library-results';
  section.setAttribute('aria-label', 'Game search results');

  const grid = document.createElement('ul');
  grid.className = 'library-results__grid';

  const emptyState = createEmptyState();

  let currentGames: readonly LibraryGame[] = games;
  let currentPage = 1;

  const getTotalPages = (): number => Math.max(1, Math.ceil(currentGames.length / PAGE_SIZE));

  function renderGrid(): void {
    grid.replaceChildren();

    const isEmpty = currentGames.length === 0;
    grid.hidden = isEmpty;
    emptyState.hidden = !isEmpty;

    if (isEmpty) {
      return;
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageGames = currentGames.slice(start, start + PAGE_SIZE);
    grid.append(...pageGames.map((game) => createCard(game)));
  }

  const pagination = createPagination(
    getTotalPages,
    () => currentPage,
    (page) => {
      currentPage = page;
      renderGrid();
      pagination.render();
    },
  );

  function update(nextGames: readonly LibraryGame[]): void {
    currentGames = nextGames;
    currentPage = 1;
    renderGrid();
    pagination.render();
    pagination.hidden = currentGames.length === 0;
  }

  section.append(grid, emptyState, pagination);
  update(games);

  return { element: section, update };
}
