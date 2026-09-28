import './library-filters.scss';
import { createSkeleton } from '../feedback/feedback';
import type { Category, SortOption } from '../../shared/api';

export interface LibraryFiltersOptions {
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: SortOption) => void;
  onRetryCategories: () => void;
}

export interface LibraryFiltersHandle {
  element: HTMLElement;
  showCategoriesLoading: () => void;
  showCategoriesError: () => void;
  setCategories: (categories: readonly Category[]) => void;
  setActiveCategory: (category: string) => void;
  setSort: (sort: SortOption) => void;
}

const SKELETON_CHIP_COUNT = 7;

function createCategoryChip(category: Category, onSelect: () => void): HTMLButtonElement {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'library-filters__chip';
  chip.dataset.category = category.slug;
  chip.setAttribute('aria-pressed', 'false');
  chip.textContent = category.label;
  chip.addEventListener('click', onSelect);

  return chip;
}

// Фильтры сами ничего не фильтруют: они только показывают текущее
// состояние (его задаёт страница из URL) и сообщают о выборе пользователя.
// Сам запрос с category/sort уходит на бэкенд из library-page.
export function createLibraryFilters(options: LibraryFiltersOptions): LibraryFiltersHandle {
  let activeCategory = '';
  let sort: SortOption = 'rating-desc';

  const section = document.createElement('div');
  section.className = 'library-filters';

  const categoriesWrapper = document.createElement('div');
  categoriesWrapper.className = 'library-filters__categories';
  categoriesWrapper.setAttribute('role', 'group');
  categoriesWrapper.setAttribute('aria-label', 'Game categories');

  function renderActiveCategory(): void {
    for (const chip of categoriesWrapper.querySelectorAll<HTMLButtonElement>(
      '.library-filters__chip',
    )) {
      const isActive = chip.dataset.category === activeCategory;
      chip.classList.toggle('library-filters__chip--active', isActive);
      chip.setAttribute('aria-pressed', String(isActive));
    }
  }

  function showCategoriesLoading(): void {
    categoriesWrapper.setAttribute('aria-busy', 'true');
    categoriesWrapper.replaceChildren(
      ...Array.from({ length: SKELETON_CHIP_COUNT }, () =>
        createSkeleton('library-filters__chip-skeleton'),
      ),
    );
  }

  function showCategoriesError(): void {
    categoriesWrapper.removeAttribute('aria-busy');

    const message = document.createElement('p');
    message.className = 'library-filters__error';
    message.textContent = "Couldn't load categories.";

    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'library-filters__chip';
    retry.textContent = 'Try again';
    retry.addEventListener('click', options.onRetryCategories);

    categoriesWrapper.replaceChildren(message, retry);
  }

  function setCategories(categories: readonly Category[]): void {
    categoriesWrapper.removeAttribute('aria-busy');
    categoriesWrapper.replaceChildren(
      ...categories.map((category) =>
        createCategoryChip(category, () => {
          if (category.slug !== activeCategory) {
            options.onCategoryChange(category.slug);
          }
        }),
      ),
    );
    renderActiveCategory();
  }

  function setActiveCategory(category: string): void {
    activeCategory = category;
    renderActiveCategory();
  }

  const sortButton = document.createElement('button');
  sortButton.type = 'button';
  sortButton.className = 'library-filters__sort';

  const sortLabel = document.createElement('span');

  const sortIcon = document.createElement('span');
  sortIcon.className = 'material-symbols-outlined library-filters__sort-icon';
  sortIcon.setAttribute('aria-hidden', 'true');

  function renderSort(): void {
    const isDescending = sort !== 'rating-asc';
    sortLabel.textContent = isDescending
      ? 'Sort by: Rating (High to Low)'
      : 'Sort by: Rating (Low to High)';
    sortIcon.textContent = isDescending ? 'arrow_downward' : 'arrow_upward';
  }

  function setSort(nextSort: SortOption): void {
    sort = nextSort;
    renderSort();
  }

  renderSort();
  sortButton.append(sortLabel, sortIcon);
  sortButton.addEventListener('click', () => {
    options.onSortChange(sort === 'rating-asc' ? 'rating-desc' : 'rating-asc');
  });

  section.append(categoriesWrapper, sortButton);

  return {
    element: section,
    showCategoriesLoading,
    showCategoriesError,
    setCategories,
    setActiveCategory,
    setSort,
  };
}
