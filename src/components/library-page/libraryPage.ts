import { createLibraryHeader } from '../library-header/libraryHeader';
import { createLibraryFilters } from '../library-filters/libraryFilters';
import { createLibraryResults, toLibraryCard } from '../library-results/libraryResults';
import { createGameDetails } from '../game-details/gameDetails';
import { showSnackbar } from '../snackbar/snackbar';
import { getRoute, navigate, subscribe, updateQuery, type RouteState } from '../../app/router';
import {
  ApiError,
  fetchCategories,
  fetchGames,
  isAbortError,
  type Category,
  type GamesQuery,
  type SortOption,
} from '../../shared/api';
import { formatCategoryLabel } from '../../shared/format';

// Карточек на странице библиотеки -- по заданию (limit=6).
const PAGE_LIMIT = 6;
const FALLBACK_CATEGORY = 'all';
const DEFAULT_SORT: SortOption = 'rating-desc';
const SORT_OPTIONS: readonly SortOption[] = ['rating-desc', 'rating-asc', 'name-asc', 'name-desc'];

function isSortOption(value: string): value is SortOption {
  return (SORT_OPTIONS as readonly string[]).includes(value);
}

// Параметры библиотеки, которые влияют на запрос к API. Смена остальных
// параметров URL (открытый диалог и т.п.) не должна перезапрашивать список.
function getListKey(query: URLSearchParams): string {
  return ['category', 'sort', 'page'].map((key) => query.get(key) ?? '').join('|');
}

// page -- целое число от 1. Всё остальное ("0", "-1", "abc") -- неверная
// ссылка, запрос к API не отправляем.
function parsePage(value: string | null): number | undefined {
  if (value === null) return 1;

  return /^[1-9]\d*$/.test(value) ? Number(value) : undefined;
}

// "Reset filters" на баннере Data Not Found -- библиотека без параметров.
function resetFilters(): void {
  navigate('/library');
}

// Собирает страницу библиотеки: заголовок + фильтры + результаты + диалог
// Game Details. Состояние фильтров и пагинации хранится только в URL
// (/library?category=puzzle&sort=rating-desc&page=2): клик меняет URL,
// а уже изменение URL запускает запрос GET /api/games с этими параметрами --
// фильтрация, сортировка и пагинация всегда выполняются на сервере.
export function createLibraryPage(): HTMLElement[] {
  const gameDetails = createGameDetails();

  const results = createLibraryResults({
    onDetailsClick: () => gameDetails.open(),
    onPageChange: (page) => {
      updateQuery({ page });
      filters.element.scrollIntoView({ block: 'start', behavior: 'smooth' });
    },
  });

  // Смена фильтра или сортировки всегда возвращает на первую страницу.
  const filters = createLibraryFilters({
    onCategoryChange: (category) => updateQuery({ category, page: 1 }),
    onSortChange: (sort) => updateQuery({ sort, page: 1 }),
    onRetryCategories: () => {
      void loadCategories();
    },
  });

  let categories: Category[] = [];
  let defaultCategory = FALLBACK_CATEGORY;
  let hasCategoriesFailed = false;

  // Категории (чипы фильтра) тоже приходят с бэкенда. Активным по
  // умолчанию становится чип с isDefault: true.
  async function loadCategories(): Promise<void> {
    filters.showCategoriesLoading();

    try {
      categories = await fetchCategories();
      defaultCategory =
        categories.find((category) => category.isDefault)?.slug ?? FALLBACK_CATEGORY;
      filters.setCategories(categories);

      if (hasCategoriesFailed) {
        showSnackbar('Categories loaded successfully.', { variant: 'success' });
      }
      hasCategoriesFailed = false;
    } catch {
      hasCategoriesFailed = true;
      filters.showCategoriesError();
      showSnackbar('Failed to load categories.', { variant: 'error' });
    }
  }

  function getCategoryLabel(slug: string): string {
    return (
      categories.find((category) => category.slug === slug)?.label ?? formatCategoryLabel(slug)
    );
  }

  const categoriesRequest = loadCategories();

  let controller: AbortController | undefined;
  let hasGamesFailed = false;

  async function loadGames(query: GamesQuery): Promise<void> {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    results.showLoading({ page: query.page, totalPages: 1 });

    try {
      const response = await fetchGames(query, signal);
      const { meta } = response;

      if (response.data.length === 0 && meta.totalPages > 0 && query.page > meta.totalPages) {
        // Страница из ссылки больше, чем есть на сервере.
        results.showNotFound(
          'Data Not Found',
          `Page ${query.page} doesn't exist. There are only ${meta.totalPages} pages for these filters.`,
          resetFilters,
        );
      } else if (response.data.length === 0) {
        results.showEmpty();
      } else {
        results.showGames(
          response.data.map((game) => toLibraryCard(game, getCategoryLabel(game.category))),
          { page: meta.page, totalPages: meta.totalPages },
        );
      }

      if (hasGamesFailed) {
        showSnackbar('Games loaded successfully.', { variant: 'success' });
      }
      hasGamesFailed = false;
    } catch (error) {
      if (isAbortError(error)) return;

      // 4xx -- сервер не знает таких параметров (например, несуществующая
      // категория в ссылке): это не сбой сети, повтор не поможет.
      if (error instanceof ApiError && error.isClientError) {
        results.showNotFound(
          'Data Not Found',
          'There are no games for these filters. Check the link or reset the filters.',
          resetFilters,
        );
        showSnackbar('No data found for the requested filters.', { variant: 'error' });
        return;
      }

      hasGamesFailed = true;
      results.showError("We couldn't load games. Please try again.", () => {
        void loadGames(query);
      });
      showSnackbar('Failed to load games.', { variant: 'error' });
    }
  }

  // Приводит страницу в соответствие с URL: подсвечивает фильтры и
  // запрашивает нужный список игр.
  async function syncWithUrl(route: RouteState): Promise<void> {
    const categoryParam = route.query.get('category');
    const sortParam = route.query.get('sort') ?? DEFAULT_SORT;

    // Без category в URL нужна категория по умолчанию (isDefault) --
    // дожидаемся списка категорий, чтобы запросить именно её.
    if (!categoryParam) {
      await categoriesRequest;
    }

    const category = categoryParam ?? defaultCategory;
    filters.setActiveCategory(category);

    if (!isSortOption(sortParam)) {
      filters.setSort(DEFAULT_SORT);
      results.showNotFound(
        'Data Not Found',
        `Sort option "${sortParam}" doesn't exist. Reset the filters to see all games.`,
        resetFilters,
      );
      return;
    }

    filters.setSort(sortParam);

    const page = parsePage(route.query.get('page'));

    if (page === undefined) {
      results.showNotFound(
        'Data Not Found',
        `Page "${route.query.get('page') ?? ''}" doesn't exist. Reset the filters to see all games.`,
        resetFilters,
      );
      return;
    }

    await loadGames({ category, sort: sortParam, page, limit: PAGE_LIMIT });
  }

  const header = createLibraryHeader();
  let lastListKey = getListKey(getRoute().query);

  const unsubscribe = subscribe((route) => {
    // Страница библиотеки уже убрана (переход на другой маршрут).
    if (route.page !== 'library' || !results.element.isConnected) {
      unsubscribe();
      return;
    }

    const listKey = getListKey(route.query);
    if (listKey === lastListKey) return;

    lastListKey = listKey;
    void syncWithUrl(route);
  });

  void syncWithUrl(getRoute());

  return [header, filters.element, results.element, gameDetails.element];
}
