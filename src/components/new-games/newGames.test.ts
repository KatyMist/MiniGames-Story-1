import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createNewGames } from './newGames';
import {
  getSnackbarMessages,
  jsonResponse,
  makeGameSummary,
  mockFetch,
  query,
} from '../../test/helpers';

const GAMES = ['palia', 'cat-chess', 'tiny-glade'].map((slug, index) =>
  makeGameSummary({ slug, name: `Game ${index + 1}` }),
);

function pointer(target: Element, type: string, clientX: number): void {
  target.dispatchEvent(new MouseEvent(type, { clientX, bubbles: true }));
}

function activeTitle(): string | null | undefined {
  return document.querySelector('.new-games__card--active .new-games__card-title')?.textContent;
}

async function mount(games = GAMES) {
  const fetchMock = mockFetch(() => jsonResponse({ data: games, meta: {} }));
  const section = createNewGames();
  document.body.append(section);
  await vi.advanceTimersByTimeAsync(0);

  return { section, fetchMock };
}

beforeEach(() => {
  vi.useFakeTimers();
  window.history.replaceState({}, '', '/');
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('new games carousel', () => {
  it('loads featured games and activates the first card', async () => {
    const { fetchMock } = await mount();

    expect(String(fetchMock.mock.calls[0]?.[0])).toMatch(/\/games\?featured=true$/);
    expect(document.querySelectorAll('.new-games__card')).toHaveLength(3);
    expect(activeTitle()).toBe('Game 1');
  });

  it('moves with arrows in both directions and wraps around', async () => {
    await mount();
    const [prev, next] = document.querySelectorAll<HTMLButtonElement>('.new-games__arrows button');

    next?.click();
    expect(activeTitle()).toBe('Game 2');
    prev?.click();
    prev?.click();
    expect(activeTitle()).toBe('Game 3');
  });

  it('autoplays every few seconds and pauses while pressed', async () => {
    const { section } = await mount();
    const track = query('.new-games__track', section);

    await vi.advanceTimersByTimeAsync(4000);
    expect(activeTitle()).toBe('Game 2');

    pointer(track, 'pointerdown', 100);
    await vi.advanceTimersByTimeAsync(10_000);
    expect(activeTitle()).toBe('Game 2');

    pointer(track, 'pointerup', 100);
    await vi.advanceTimersByTimeAsync(4000);
    expect(activeTitle()).toBe('Game 3');
  });

  it('changes the active card with swipes', async () => {
    const { section } = await mount();
    const track = query('.new-games__track', section);

    pointer(track, 'pointerdown', 300);
    pointer(track, 'pointermove', 100);
    pointer(track, 'pointerup', 100);
    expect(activeTitle()).toBe('Game 2');

    pointer(track, 'pointerdown', 100);
    pointer(track, 'pointermove', 300);
    pointer(track, 'pointerleave', 300);
    expect(activeTitle()).toBe('Game 1');
  });

  it('opens game details on click and keyboard, but not after a swipe', async () => {
    const { section } = await mount();
    const card = query('.new-games__card', section);

    card.click();
    expect(window.location.search).toBe('?game=palia');

    window.history.replaceState({}, '', '/');
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(new URLSearchParams(window.location.search).get('game')).toBe('palia');

    // Клик, завершающий свайп, диалог не открывает.
    window.history.replaceState({}, '', '/');
    const track = query('.new-games__track', section);
    pointer(track, 'pointerdown', 300);
    pointer(track, 'pointermove', 100);
    pointer(track, 'pointerup', 100);
    card.click();
    expect(window.location.search).toBe('');
  });

  it('shows an empty state when there are no featured games', async () => {
    await mount([]);

    expect(query('.state-banner--empty').textContent).toMatch(/No new games yet/);
  });

  it('shows an error banner and recovers on retry', async () => {
    let fail = true;
    mockFetch(() => (fail ? jsonResponse({}, 500) : jsonResponse({ data: GAMES, meta: {} })));
    document.body.append(createNewGames());
    await vi.advanceTimersByTimeAsync(0);

    expect(query('.state-banner--error')).not.toBeNull();
    expect(getSnackbarMessages()).toContain('Failed to load new games.');

    fail = false;
    query<HTMLButtonElement>('.state-banner__action').click();
    await vi.advanceTimersByTimeAsync(0);

    expect(document.querySelectorAll('.new-games__card')).toHaveLength(3);
    expect(getSnackbarMessages()).toContain('New games loaded successfully.');
  });
});
