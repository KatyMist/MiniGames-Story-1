import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createFavoriteButton, FAVORITE_GUEST_MESSAGE } from './favoriteButton';
import { checkSession } from '../../app/authStore';
import { API_BASE_URL } from '../../shared/api';
import {
  createDeferred,
  flushPromises,
  getSnackbarMessages,
  jsonResponse,
  makeSession,
  mockFetch,
  storeSession,
} from '../../test/helpers';

function signIn(): void {
  storeSession(makeSession({ email: 'student@rs.school' }));
  checkSession();
}

beforeEach(() => {
  window.history.replaceState({}, '', '/?game=palia');
  checkSession();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('favorite button', () => {
  it('renders the initial server state', () => {
    const favorite = createFavoriteButton({ slug: 'palia', isFavorited: true });

    expect(favorite.element.getAttribute('aria-pressed')).toBe('true');
    expect(favorite.element.textContent).toMatch(/Added to Favorites/);

    favorite.setFavorited(false);
    expect(favorite.element.textContent).toMatch(/Add to Favorites/);
  });

  it('opens auth with a warning for guests and sends no request', () => {
    const fetchMock = mockFetch(() => jsonResponse({}));
    const favorite = createFavoriteButton({ slug: 'palia', isFavorited: false });

    favorite.element.click();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(window.location.search).toBe('?game=palia&auth=login');
    expect(getSnackbarMessages()).toContain(FAVORITE_GUEST_MESSAGE);
  });

  it('locks the button while pending and applies the server response', async () => {
    signIn();
    const response = createDeferred<Response>();
    const fetchMock = mockFetch(() => response.promise);
    const onLikesChange = vi.fn();
    const favorite = createFavoriteButton({ slug: 'palia', isFavorited: false, onLikesChange });

    favorite.element.click();
    favorite.element.click();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/games/palia/favorite`,
      expect.objectContaining({ method: 'POST', body: '{"userEmail":"student@rs.school"}' }),
    );
    expect(favorite.element.disabled).toBe(true);
    expect(favorite.isPending()).toBe(true);
    expect(favorite.element.querySelector('.spinner')).not.toBeNull();

    response.resolve(jsonResponse({ data: { isFavorited: true, likesCount: 12 } }));
    await flushPromises();

    expect(favorite.element.disabled).toBe(false);
    expect(favorite.element.getAttribute('aria-pressed')).toBe('true');
    expect(onLikesChange).toHaveBeenCalledWith(12);
    expect(getSnackbarMessages()).toContain('Added to favorites.');
  });

  it('follows the server when it removes the favorite', async () => {
    signIn();
    mockFetch(() => jsonResponse({ data: { isFavorited: false, likesCount: 3 } }));
    const favorite = createFavoriteButton({ slug: 'palia', isFavorited: true });

    favorite.element.click();
    await flushPromises();

    expect(favorite.element.getAttribute('aria-pressed')).toBe('false');
    expect(getSnackbarMessages()).toContain('Removed from favorites.');
  });

  it('keeps the previous state and does not retry after an ambiguous failure', async () => {
    signIn();
    const fetchMock = mockFetch(() => {
      throw new TypeError('Failed to fetch');
    });
    const favorite = createFavoriteButton({ slug: 'palia', isFavorited: false });

    favorite.element.click();
    await flushPromises();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(favorite.element.getAttribute('aria-pressed')).toBe('false');
    expect(favorite.element.disabled).toBe(false);
    expect(getSnackbarMessages()[0]).toMatch(/couldn't confirm/);
  });

  it('reports a rejected request', async () => {
    signIn();
    mockFetch(() => jsonResponse({ message: 'Bad request' }, 400));
    const favorite = createFavoriteButton({ slug: 'palia', isFavorited: false });

    favorite.element.click();
    await flushPromises();

    expect(getSnackbarMessages()).toContain('Failed to update favorites. Please try again.');
  });
});
