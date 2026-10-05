import { beforeEach, describe, expect, it, vi } from 'vitest';
import { showSnackbar } from './snackbar';
import { getSnackbarMessages, query } from '../../test/helpers';

beforeEach(() => {
  vi.useFakeTimers();
});

describe('snackbar', () => {
  it('shows a message with the variant style and an alert role for problems', () => {
    showSnackbar('Saved', { variant: 'success' });
    showSnackbar('Session expired', { variant: 'warning' });

    expect(getSnackbarMessages()).toEqual(['Saved', 'Session expired']);
    expect(query('.snackbar--success').getAttribute('role')).toBe('status');
    expect(query('.snackbar--warning').getAttribute('role')).toBe('alert');
  });

  it('does not duplicate a message that is already visible', () => {
    showSnackbar('Network error');
    showSnackbar('Network error');

    expect(getSnackbarMessages()).toEqual(['Network error']);
  });

  it('keeps at most three notifications on screen', () => {
    for (const message of ['1', '2', '3', '4']) showSnackbar(message);

    expect(getSnackbarMessages()).toEqual(['2', '3', '4']);
  });

  it('disappears automatically and can be dismissed manually', () => {
    showSnackbar('Auto', { duration: 1000 });
    showSnackbar('Manual');

    query<HTMLButtonElement>('.snackbar:last-child .snackbar__close').click();
    expect(getSnackbarMessages()).toEqual(['Auto']);

    vi.advanceTimersByTime(1000);
    expect(getSnackbarMessages()).toEqual([]);

    vi.advanceTimersByTime(500);
    expect(document.querySelectorAll('.snackbar')).toHaveLength(0);
  });
});
