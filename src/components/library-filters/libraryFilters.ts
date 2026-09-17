import './library-filters.scss';

const CATEGORIES: readonly string[] = [
  'All Games',
  'Puzzle',
  'Card',
  'Match',
  'Farm',
  'Strategy',
  'Arcade',
];

function createCategoryChip(label: string, isActive: boolean): HTMLButtonElement {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'library-filters__chip';
  if (isActive) {
    chip.classList.add('library-filters__chip--active');
  }
  chip.textContent = label;

  return chip;
}

function createCategories(): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'library-filters__categories';

  for (const [index, label] of CATEGORIES.entries()) {
    wrapper.append(createCategoryChip(label, index === 0));
  }

  return wrapper;
}

function createSort(): HTMLButtonElement {
  const sort = document.createElement('button');
  sort.type = 'button';
  sort.className = 'library-filters__sort';
  sort.textContent = 'Sort by: Rating ↓';

  return sort;
}

export function createLibraryFilters(): HTMLElement {
  const section = document.createElement('div');
  section.className = 'library-filters';
  section.append(createCategories(), createSort());

  return section;
}
