import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { COMMENT_GUEST_MESSAGE, createCommentForm } from './commentForm';
import { checkSession, endSession } from '../../app/authStore';
import { API_BASE_URL } from '../../shared/api';
import {
  createDeferred,
  flushPromises,
  getSnackbarMessages,
  jsonResponse,
  makeComment,
  makeSession,
  mockFetch,
  query,
  storeSession,
  typeInto,
} from '../../test/helpers';

function setup() {
  const onPosted = vi.fn();
  const form = createCommentForm({ slug: 'palia', onPosted });
  document.body.append(form.element);
  const textarea = query<HTMLTextAreaElement>('textarea', form.element);
  const button = query<HTMLButtonElement>('button', form.element);
  const status = query('.game-details__comment-status', form.element);

  return { form, onPosted, textarea, button, status };
}

function signIn(displayName = 'forest Dweller'): void {
  storeSession(makeSession({ displayName, email: 'student@rs.school' }));
  checkSession();
}

function pressEnter(textarea: HTMLTextAreaElement, shiftKey = false): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { key: 'Enter', shiftKey, cancelable: true });
  textarea.dispatchEvent(event);
  return event;
}

beforeEach(() => {
  window.history.replaceState({}, '', '/?game=palia');
  checkSession();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('guest mode', () => {
  it('locks the comment input and offers to log in', () => {
    const ui = setup();

    expect(ui.textarea.disabled).toBe(true);
    expect(ui.textarea.placeholder).toMatch(/Log in/);
    expect(ui.button.textContent).toBe('Log In');
    expect(query('.game-details__comment-form-avatar').hidden).toBe(true);

    ui.button.click();
    expect(window.location.search).toBe('?game=palia&auth=login');
  });
});

describe('authenticated user', () => {
  it('starts empty and shows the uppercase initial of the username', () => {
    signIn();
    const ui = setup();

    expect(ui.textarea.value).toBe('');
    expect(ui.textarea.disabled).toBe(false);
    expect(ui.button.textContent).toBe('Send');
    expect(query('.game-details__comment-form-avatar').textContent).toBe('F');
  });

  it('auto-expands the textarea up to the maximum height', () => {
    signIn();
    const ui = setup();
    Object.defineProperty(ui.textarea, 'scrollHeight', { configurable: true, value: 60 });

    typeInto(ui.textarea, 'line\nline');
    expect(ui.textarea.style.height).toBe('60px');
    expect(ui.textarea.style.overflowY).toBe('hidden');

    Object.defineProperty(ui.textarea, 'scrollHeight', { configurable: true, value: 200 });
    typeInto(ui.textarea, 'line\n'.repeat(10));
    expect(ui.textarea.style.height).toBe('88px');
    expect(ui.textarea.style.overflowY).toBe('auto');
  });

  it('submits trimmed text with Enter, locks the form and resets after 201', async () => {
    signIn();
    const response = createDeferred<Response>();
    const fetchMock = mockFetch(() => response.promise);
    const ui = setup();
    typeInto(ui.textarea, '  Such a calming little game!  ');

    const event = pressEnter(ui.textarea);

    expect(event.defaultPrevented).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/games/palia/comments`,
      expect.objectContaining({ method: 'POST' }),
    );
    expect(JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body))).toEqual({
      userEmail: 'student@rs.school',
      authorName: 'forest Dweller',
      text: 'Such a calming little game!',
    });
    expect(ui.textarea.disabled).toBe(true);
    expect(ui.button.disabled).toBe(true);
    expect(ui.button.textContent).toMatch(/Sending/);

    // Повторная отправка во время запроса игнорируется.
    pressEnter(ui.textarea);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    response.resolve(jsonResponse({ data: makeComment() }, 201));
    await flushPromises();

    expect(ui.textarea.value).toBe('');
    expect(ui.textarea.disabled).toBe(false);
    expect(ui.onPosted).toHaveBeenCalledTimes(1);
    expect(getSnackbarMessages()).toContain('Your comment has been posted.');
  });

  it('keeps Shift+Enter for new lines and submits with the button', async () => {
    signIn();
    const fetchMock = mockFetch(() => jsonResponse({ data: makeComment() }, 201));
    const ui = setup();
    typeInto(ui.textarea, 'Hello');

    expect(pressEnter(ui.textarea, true).defaultPrevented).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();

    ui.button.click();
    await flushPromises();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('rejects empty and too long comments without a request', () => {
    signIn();
    const fetchMock = mockFetch(() => jsonResponse({}));
    const ui = setup();

    typeInto(ui.textarea, '    ');
    ui.button.click();
    expect(ui.status.textContent).toBe('Comment cannot be empty.');

    typeInto(ui.textarea, 'a'.repeat(501));
    expect(ui.status.textContent).toBe('501/500 characters');
    ui.button.click();
    expect(ui.status.textContent).toMatch(/500 characters or fewer/);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('keeps the text and unlocks after a definitive rejection', async () => {
    signIn();
    mockFetch(() => jsonResponse({ error: { message: 'authorName is invalid' } }, 400));
    const ui = setup();
    typeInto(ui.textarea, 'My comment');

    ui.button.click();
    await flushPromises();

    expect(ui.textarea.value).toBe('My comment');
    expect(ui.textarea.disabled).toBe(false);
    expect(ui.status.textContent).toBe('Your comment was not posted: authorName is invalid');
    expect(ui.onPosted).not.toHaveBeenCalled();
  });

  it('reports an unknown outcome without resubmitting', async () => {
    signIn();
    const fetchMock = mockFetch(() => {
      throw new TypeError('Failed to fetch');
    });
    const ui = setup();
    typeInto(ui.textarea, 'My comment');

    ui.button.click();
    await flushPromises();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(ui.textarea.value).toBe('My comment');
    expect(ui.status.textContent).toMatch(/couldn't confirm whether your comment was posted/);
  });

  it('opens auth instead of sending when the session has ended', async () => {
    signIn();
    const fetchMock = mockFetch(() => jsonResponse({}));
    const ui = setup();
    typeInto(ui.textarea, 'Draft');
    window.localStorage.clear();

    pressEnter(ui.textarea);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(window.location.search).toBe('?game=palia&auth=login');
    expect(getSnackbarMessages()).not.toContain(COMMENT_GUEST_MESSAGE);
    await endSession('removed');
    ui.form.refresh();
    expect(ui.textarea.value).toBe('Draft');
    expect(ui.textarea.disabled).toBe(true);
  });
});
