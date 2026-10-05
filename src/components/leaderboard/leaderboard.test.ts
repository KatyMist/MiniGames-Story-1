import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLeaderboard } from './leaderboard';
import {
  flushPromises,
  getSnackbarMessages,
  jsonResponse,
  mockFetch,
  query,
} from '../../test/helpers';
import type { LeaderboardEntry } from '../../shared/api';

function entry(overrides: Partial<LeaderboardEntry>): LeaderboardEntry {
  return {
    rank: 1,
    playerName: 'CozyGamer',
    gamesPlayed: 42,
    totalScore: 94_250,
    streakDays: 7,
    favoriteGameSlug: 'palia',
    favoriteGameName: 'Palia',
    ...overrides,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('leaderboard', () => {
  it('renders skeleton rows, then players from the api', async () => {
    mockFetch(() =>
      jsonResponse({
        data: [entry({}), entry({ rank: 2, playerName: 'mira', totalScore: 1200 })],
      }),
    );
    const section = createLeaderboard();
    document.body.append(section);

    expect(section.querySelectorAll('.leaderboard__row--skeleton')).toHaveLength(5);
    await flushPromises();

    const rows = section.querySelectorAll('tbody .leaderboard__row');
    expect(rows).toHaveLength(2);
    expect(rows[0]?.textContent).toContain('#1');
    expect(rows[0]?.textContent).toContain('94,250');
    expect(rows[0]?.textContent).toContain('7 days');
    expect(query('.leaderboard__rank', rows[0]).classList).toContain('leaderboard__rank--top');
    // Инициалы: две заглавные буквы, иначе первые две буквы имени.
    expect(query('.leaderboard__avatar', rows[0]).textContent).toBe('CG');
    expect(query('.leaderboard__avatar', rows[1]).textContent).toBe('MI');
  });

  it('shows an empty state', async () => {
    mockFetch(() => jsonResponse({ data: [] }));
    document.body.append(createLeaderboard());
    await flushPromises();

    expect(query('.state-banner--empty').textContent).toMatch(/No players yet/);
  });

  it('shows an error banner with retry', async () => {
    let fail = true;
    mockFetch(() => (fail ? jsonResponse({}, 500) : jsonResponse({ data: [entry({})] })));
    document.body.append(createLeaderboard());
    await flushPromises();

    expect(getSnackbarMessages()).toContain('Failed to load the leaderboard.');

    fail = false;
    query<HTMLButtonElement>('.state-banner__action').click();
    await flushPromises();

    expect(document.querySelectorAll('tbody .leaderboard__row')).toHaveLength(1);
    expect(getSnackbarMessages()).toContain('Leaderboard loaded successfully.');
  });
});
