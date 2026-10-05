import { describe, expect, it } from 'vitest';
import {
  formatCategoryLabel,
  formatCompactNumber,
  formatRelativeTime,
  formatScore,
} from './format';

describe('formatCompactNumber', () => {
  it.each([
    [950, '950'],
    [1000, '1K'],
    [28_700, '28.7K'],
    [38_200, '38.2K'],
    [1_000_000, '1M'],
    [1_250_000, '1.3M'],
  ])('%d -> %s', (value, expected) => {
    expect(formatCompactNumber(value)).toBe(expected);
  });
});

describe('formatScore', () => {
  it('adds thousands separators', () => {
    expect(formatScore(94_250)).toBe('94,250');
  });
});

describe('formatRelativeTime', () => {
  const now = Date.parse('2026-10-05T12:00:00Z');
  const ago = (seconds: number): string => new Date(now - seconds * 1000).toISOString();

  it.each([
    [10, 'just now'],
    [60, '1 min ago'],
    [59 * 60, '59 min ago'],
    [3600, '1 hour ago'],
    [5 * 3600, '5 hours ago'],
    [86_400, '1 day ago'],
    [6 * 86_400, '6 days ago'],
    [7 * 86_400, '1 week ago'],
    [27 * 86_400, '3 weeks ago'],
    [28 * 86_400, '1 month ago'],
    [200 * 86_400, '6 months ago'],
    [364 * 86_400, '11 months ago'],
    [365 * 86_400, '1 year ago'],
    [800 * 86_400, '2 years ago'],
  ])('%d seconds ago -> %s', (seconds, expected) => {
    expect(formatRelativeTime(ago(seconds), now)).toBe(expected);
  });

  it('treats future dates as just now and invalid dates as empty', () => {
    expect(formatRelativeTime(ago(-100), now)).toBe('just now');
    expect(formatRelativeTime('not a date', now)).toBe('');
  });
});

describe('formatCategoryLabel', () => {
  it('capitalizes the category slug', () => {
    expect(formatCategoryLabel('puzzle')).toBe('Puzzle');
    expect(formatCategoryLabel('')).toBe('');
  });
});
