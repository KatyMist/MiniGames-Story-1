import { describe, expect, it, vi } from 'vitest';
import { createLibraryFilters } from './libraryFilters';
import { query } from '../../test/helpers';

function key(target: Element, name: string): void {
  target.dispatchEvent(
    new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }),
  );
}

function mount() {
  const options = { onCategoryChange: vi.fn(), onSortChange: vi.fn(), onRetryCategories: vi.fn() };
  const filters = createLibraryFilters(options);
  document.body.append(filters.element);
  filters.setCategories([
    { slug: 'all', label: 'All Games', isDefault: true },
    { slug: 'puzzle', label: 'Puzzle', isDefault: false },
  ]);
  filters.setActiveCategory('all');

  const sortButton = query<HTMLButtonElement>('.library-filters__sort');
  const menu = query<HTMLUListElement>('.library-filters__sort-menu');
  const option = (sort: string) => query<HTMLLIElement>(`[data-sort="${sort}"]`);

  return { filters, options, sortButton, menu, option };
}

describe('library filters', () => {
  it('reports category changes and marks the active chip', () => {
    const { filters, options } = mount();
    const puzzle = query<HTMLButtonElement>('.library-filters__chip:last-child');

    puzzle.click();
    expect(options.onCategoryChange).toHaveBeenCalledWith('puzzle');

    filters.setActiveCategory('puzzle');
    expect(puzzle.getAttribute('aria-pressed')).toBe('true');
  });

  it('opens the sort list on the selected option and navigates it with arrows', () => {
    const { sortButton, menu, option, options } = mount();

    sortButton.click();
    expect(menu.hidden).toBe(false);
    expect(sortButton.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(option('rating-desc'));

    key(menu, 'ArrowDown');
    expect(document.activeElement).toBe(option('rating-asc'));
    key(menu, 'ArrowUp');
    key(menu, 'ArrowUp');
    expect(document.activeElement).toBe(option('name-desc'));

    key(option('name-desc'), 'Enter');
    expect(options.onSortChange).toHaveBeenCalledWith('name-desc');
    expect(menu.hidden).toBe(true);
    expect(sortButton.textContent).toContain('Sort by:');
  });

  it('closes the sort list with escape or an outside click without changing sort', () => {
    const { sortButton, menu, options } = mount();

    sortButton.click();
    key(menu, 'Escape');
    expect(menu.hidden).toBe(true);

    sortButton.click();
    document.body.click();
    expect(menu.hidden).toBe(true);
    expect(options.onSortChange).not.toHaveBeenCalled();
  });

  it('shows a categories error with retry', () => {
    const { filters, options } = mount();

    filters.showCategoriesError();
    query<HTMLButtonElement>('.library-filters__chip').click();

    expect(options.onRetryCategories).toHaveBeenCalled();
  });
});
