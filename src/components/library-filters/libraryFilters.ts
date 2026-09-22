import './library-filters.scss';
import { LIBRARY_CATEGORIES } from '../../shared/libraryGames';

export interface LibraryFilterState {
  category: string;
  sortDescending: boolean;
}

export type LibraryFilterChangeHandler = (state: Readonly<LibraryFilterState>) => void;

function createCategoryChip(
  label: string,
  isActive: boolean,
  onSelect: (label: string) => void,
): HTMLButtonElement {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'library-filters__chip';
  if (isActive) {
    chip.classList.add('library-filters__chip--active');
  }
  chip.setAttribute('aria-pressed', String(isActive));
  chip.textContent = label;
  chip.addEventListener('click', () => onSelect(label));

  return chip;
}

export function createLibraryFilters(onChange: LibraryFilterChangeHandler): HTMLElement {
  const state: LibraryFilterState = {
    category: LIBRARY_CATEGORIES[0] ?? 'All Games',
    sortDescending: true,
  };

  const section = document.createElement('div');
  section.className = 'library-filters';

  const categoriesWrapper = document.createElement('div');
  categoriesWrapper.className = 'library-filters__categories';

  function renderCategories(): void {
    categoriesWrapper.replaceChildren(
      ...LIBRARY_CATEGORIES.map((label) =>
        createCategoryChip(label, label === state.category, (selected) => {
          if (selected === state.category) {
            return;
          }
          state.category = selected;
          renderCategories();
          onChange({ ...state });
        }),
      ),
    );
  }

  renderCategories();

  const sortButton = document.createElement('button');
  sortButton.type = 'button';
  sortButton.className = 'library-filters__sort';

  const sortLabel = document.createElement('span');

  const sortIcon = document.createElement('span');
  sortIcon.className = 'material-symbols-outlined library-filters__sort-icon';
  sortIcon.setAttribute('aria-hidden', 'true');

  function renderSort(): void {
    sortLabel.textContent = state.sortDescending
      ? 'Sort by: Rating (High to Low)'
      : 'Sort by: Rating (Low to High)';
    sortIcon.textContent = state.sortDescending ? 'arrow_downward' : 'arrow_upward';
  }

  renderSort();
  sortButton.append(sortLabel, sortIcon);
  sortButton.addEventListener('click', () => {
    state.sortDescending = !state.sortDescending;
    renderSort();
    onChange({ ...state });
  });

  section.append(categoriesWrapper, sortButton);

  return section;
}
