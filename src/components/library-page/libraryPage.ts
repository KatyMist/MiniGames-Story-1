import { createLibraryHeader } from '../library-header/libraryHeader';
import { createLibraryFilters } from '../library-filters/libraryFilters';
import { createLibraryResults, toLibraryCard } from '../library-results/libraryResults';
import { createGameDetails } from '../game-details/gameDetails';
import { showSnackbar } from '../snackbar/snackbar';
import { fetchGames, isAbortError, type GamesQuery } from '../../shared/api';
import { formatCategoryLabel } from '../../shared/format';

// Карточек на странице библиотеки -- по заданию (limit=6).
const PAGE_LIMIT = 6;

// Собирает страницу библиотеки: заголовок + фильтры + результаты + диалог
// Game Details. Карточки приходят с бэкенда (GET /api/games): страница
// только передаёт параметры запроса и отдаёт ответ в library-results.
export function createLibraryPage(): HTMLElement[] {
  const gameDetails = createGameDetails();

  const results = createLibraryResults({
    onDetailsClick: () => gameDetails.open(),
    onPageChange: () => {},
  });

  const filters = createLibraryFilters(() => {});

  let controller: AbortController | undefined;
  let hasFailed = false;

  async function loadGames(): Promise<void> {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    const query: GamesQuery = { category: 'all', sort: 'rating-desc', page: 1, limit: PAGE_LIMIT };

    results.showLoading({ page: query.page, totalPages: 1 });

    try {
      const response = await fetchGames(query, signal);

      if (response.data.length === 0) {
        results.showEmpty();
      } else {
        results.showGames(
          response.data.map((game) => toLibraryCard(game, formatCategoryLabel(game.category))),
          { page: response.meta.page, totalPages: response.meta.totalPages },
        );
      }

      if (hasFailed) {
        showSnackbar('Games loaded successfully.', { variant: 'success' });
      }
      hasFailed = false;
    } catch (error) {
      if (isAbortError(error)) return;

      hasFailed = true;
      results.showError("We couldn't load games. Please try again.", () => {
        void loadGames();
      });
      showSnackbar('Failed to load games.', { variant: 'error' });
    }
  }

  void loadGames();

  return [createLibraryHeader(), filters, results.element, gameDetails.element];
}
