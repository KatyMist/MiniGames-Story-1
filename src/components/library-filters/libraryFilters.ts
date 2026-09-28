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

const SORT_CHOICES: readonly { value: SortOption; label: string }[] = [
  { value: 'rating-desc', label: 'Rating (High to Low)' },
  { value: 'rating-asc', label: 'Rating (Low to High)' },
  { value: 'name-asc', label: 'Name (A to Z)' },
  { value: 'name-desc', label: 'Name (Z to A)' },
];

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

  // Сортировка -- выпадающий список из 4 вариантов, которые поддерживает
  // API (sort=rating-desc|rating-asc|name-asc|name-desc). Кнопка всегда
  // показывает активный вариант.
  const sortWrapper = document.createElement('div');
  sortWrapper.className = 'library-filters__sort-wrap';

  const sortButton = document.createElement('button');
  sortButton.type = 'button';
  sortButton.className = 'library-filters__sort';
  sortButton.id = 'library-sort-button';
  sortButton.setAttribute('aria-haspopup', 'listbox');
  sortButton.setAttribute('aria-expanded', 'false');
  sortButton.setAttribute('aria-controls', 'library-sort-menu');

  const sortLabel = document.createElement('span');

  const sortIcon = document.createElement('span');
  sortIcon.className = 'material-symbols-outlined library-filters__sort-icon';
  sortIcon.translate = false;
  sortIcon.setAttribute('aria-hidden', 'true');

  const sortMenu = document.createElement('ul');
  sortMenu.className = 'library-filters__sort-menu';
  sortMenu.id = 'library-sort-menu';
  sortMenu.setAttribute('role', 'listbox');
  sortMenu.setAttribute('aria-labelledby', sortButton.id);
  sortMenu.hidden = true;

  const sortItems = SORT_CHOICES.map((choice) => {
    const item = document.createElement('li');
    item.className = 'library-filters__sort-option';
    item.setAttribute('role', 'option');
    item.tabIndex = -1;
    item.dataset.sort = choice.value;
    item.textContent = choice.label;
    item.addEventListener('click', () => selectSort(choice.value));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectSort(choice.value);
      }
    });
    sortMenu.append(item);
    return item;
  });

  function renderSort(): void {
    const choice = SORT_CHOICES.find((option) => option.value === sort) ?? SORT_CHOICES[0];
    sortLabel.textContent = `Sort by: ${choice?.label ?? ''}`;
    sortIcon.textContent = sort.endsWith('asc') ? 'arrow_upward' : 'arrow_downward';

    for (const item of sortItems) {
      const isSelected = item.dataset.sort === sort;
      item.setAttribute('aria-selected', String(isSelected));
      item.classList.toggle('library-filters__sort-option--active', isSelected);
    }
  }

  function setMenuOpen(isOpen: boolean): void {
    sortMenu.hidden = !isOpen;
    sortButton.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      const selected = sortItems.find((item) => item.dataset.sort === sort) ?? sortItems[0];
      selected?.focus();
    }
  }

  function selectSort(nextSort: SortOption): void {
    setMenuOpen(false);
    sortButton.focus();

    if (nextSort !== sort) {
      options.onSortChange(nextSort);
    }
  }

  function setSort(nextSort: SortOption): void {
    sort = nextSort;
    renderSort();
  }

  renderSort();
  sortButton.append(sortLabel, sortIcon);
  sortButton.addEventListener('click', () => setMenuOpen(sortMenu.hidden));

  // Стрелки двигают фокус по вариантам, Escape и клик мимо закрывают список.
  sortMenu.addEventListener('keydown', (event) => {
    const index = sortItems.indexOf(document.activeElement as HTMLLIElement);

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      sortItems[(index + step + sortItems.length) % sortItems.length]?.focus();
    } else if (event.key === 'Escape') {
      event.stopPropagation();
      setMenuOpen(false);
      sortButton.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!sortMenu.hidden && event.target instanceof Node && !sortWrapper.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  sortWrapper.append(sortButton, sortMenu);

  section.append(categoriesWrapper, sortWrapper);

  return {
    element: section,
    showCategoriesLoading,
    showCategoriesError,
    setCategories,
    setActiveCategory,
    setSort,
  };
}
