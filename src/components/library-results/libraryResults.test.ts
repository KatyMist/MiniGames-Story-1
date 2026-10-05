import { describe, expect, it, vi } from 'vitest';
import { createLibraryResults, getPageWindow, toLibraryCard } from './libraryResults';
import { makeGameSummary, query } from '../../test/helpers';

describe('getPageWindow', () => {
  it('keeps the current page inside a window of visible page numbers', () => {
    expect(getPageWindow(1, 10, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageWindow(6, 10, 5)).toEqual([4, 5, 6, 7, 8]);
    expect(getPageWindow(10, 10, 5)).toEqual([6, 7, 8, 9, 10]);
    expect(getPageWindow(2, 3, 5)).toEqual([1, 2, 3]);
  });
});

describe('library results', () => {
  it('replaces a broken cover with a titled placeholder', () => {
    const results = createLibraryResults({ onDetailsClick: vi.fn(), onPageChange: vi.fn() });
    document.body.append(results.element);
    results.showGames([toLibraryCard(makeGameSummary({ name: 'Palia' }), 'Simulation')], {
      page: 1,
      totalPages: 1,
    });

    query('img.library-results__image').dispatchEvent(new Event('error'));

    expect(query('.library-results__image--placeholder').getAttribute('aria-label')).toBe('Palia');
  });

  it('disables pagination while loading', () => {
    const results = createLibraryResults({ onDetailsClick: vi.fn(), onPageChange: vi.fn() });
    document.body.append(results.element);

    results.showLoading({ page: 2, totalPages: 1 });

    const buttons = [...document.querySelectorAll<HTMLButtonElement>('.library-results__page')];
    expect(buttons.every((button) => button.disabled)).toBe(true);
    expect(document.querySelectorAll('.library-results__card--skeleton')).toHaveLength(6);
  });
});
