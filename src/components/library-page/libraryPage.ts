import { createLibraryHeader } from '../library-header/libraryHeader';
import { createLibraryFilters, type LibraryFilterState } from '../library-filters/libraryFilters';
import { createLibraryResults } from '../library-results/libraryResults';
import { createGameDetails } from '../game-details/gameDetails';
import { LIBRARY_GAMES, type LibraryGame } from '../../shared/libraryGames';

function getVisibleGames(state: Readonly<LibraryFilterState>): LibraryGame[] {
  const filtered =
    state.category === 'All Games'
      ? [...LIBRARY_GAMES]
      : LIBRARY_GAMES.filter((game) => game.category === state.category);

  return filtered.sort((a, b) =>
    state.sortDescending ? b.rating - a.rating : a.rating - b.rating,
  );
}

// Собирает страницу библиотеки: заголовок + фильтры + результаты + диалог
// Game Details. Фильтры сами по себе ничего не рендерят -- library-filters
// только сообщает о смене категории/сортировки через onChange, а здесь эти
// изменения применяются к общему списку игр (shared/libraryGames) и
// передаются в уже смонтированный library-results через results.update(),
// без пересоздания всей секции результатов. Диалог один на страницу:
// содержимое всегда статичное ("Tukoni: Forest Keepers" -- см. Common Game
// Details Content Requirements в задании), поэтому кнопке Details на любой
// карточке достаточно вызвать один и тот же gameDetails.open().
export function createLibraryPage(): HTMLElement[] {
  const gameDetails = createGameDetails();

  const results = createLibraryResults(
    getVisibleGames({ category: 'All Games', sortDescending: true }),
    gameDetails.open,
  );

  const filters = createLibraryFilters((state) => {
    results.update(getVisibleGames(state));
  });

  return [createLibraryHeader(), filters, results.element, gameDetails.element];
}
