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

  const label = document.createElement('span');
  label.textContent = 'Sort by: Rating';

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined library-filters__sort-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = 'arrow_downward';

  sort.append(label, icon);

  return sort;
}

export function createLibraryFilters(): HTMLElement {
  const section = document.createElement('div');
  section.className = 'library-filters';
  section.append(createCategories(), createSort());

  return section;
}
