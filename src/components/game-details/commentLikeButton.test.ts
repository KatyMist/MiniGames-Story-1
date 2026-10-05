import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createCommentLikeButton, LIKE_GUEST_MESSAGE } from './commentLikeButton';
import { checkSession } from '../../app/authStore';
import { API_BASE_URL } from '../../shared/api';
import {
  createDeferred,
  flushPromises,
  getSnackbarMessages,
  jsonResponse,
  makeComment,
  makeSession,
  mockFetch,
  storeSession,
} from '../../test/helpers';

beforeEach(() => {
  window.history.replaceState({}, '', '/?game=palia');
  checkSession();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('comment like button', () => {
  it('renders the personalized initial state', () => {
    const button = createCommentLikeButton(
      makeComment({ likesCount: 7, isLikedByCurrentUser: true }),
    );

    expect(button.textContent).toContain('7');
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.classList.contains('game-details__comment-like--active')).toBe(true);
  });

  it('asks guests to log in instead of sending a request', () => {
    const fetchMock = mockFetch(() => jsonResponse({}));
    const button = createCommentLikeButton(makeComment());

    button.click();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(window.location.search).toBe('?game=palia&auth=login');
    expect(getSnackbarMessages()).toContain(LIKE_GUEST_MESSAGE);
  });

  it('locks while pending and updates strictly from the response', async () => {
    storeSession(makeSession({ email: 'student@rs.school' }));
    checkSession();
    const response = createDeferred<Response>();
    const fetchMock = mockFetch(() => response.promise);
    const button = createCommentLikeButton(makeComment({ commentId: 'c-9', likesCount: 3 }));

    button.click();
    button.click();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[0]).toBe(`${API_BASE_URL}/comments/c-9/like`);
    expect(button.disabled).toBe(true);
    expect(button.querySelector('.spinner')).not.toBeNull();

    response.resolve(jsonResponse({ data: { isLikedByCurrentUser: true, likesCount: 10 } }));
    await flushPromises();

    expect(button.disabled).toBe(false);
    expect(button.textContent).toContain('10');
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('keeps the old state on failure without retrying', async () => {
    storeSession(makeSession());
    checkSession();
    const fetchMock = mockFetch(() => jsonResponse({}, 503));
    const button = createCommentLikeButton(makeComment({ likesCount: 3 }));

    button.click();
    await flushPromises();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(button.textContent).toContain('3');
    expect(getSnackbarMessages()[0]).toMatch(/couldn't confirm/);
  });

  it('reports a rejected like', async () => {
    storeSession(makeSession());
    checkSession();
    mockFetch(() => jsonResponse({}, 404));
    const button = createCommentLikeButton(makeComment());

    button.click();
    await flushPromises();

    expect(getSnackbarMessages()).toContain('Failed to update the like. Please try again.');
  });
});
