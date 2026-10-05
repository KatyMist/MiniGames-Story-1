import { getSession } from '../../app/authStore';
import { requireSession } from '../../app/guards';
import { openAuth } from '../../app/navigation';
import { ApiError, postComment } from '../../shared/api';
import { getAvatarLetter, getCommentAuthorName, getProfileName } from '../../shared/profile';
import { COMMENT_TEXT_MAX_LENGTH, validateCommentText } from '../../shared/validation';
import { showSnackbar } from '../snackbar/snackbar';

// Форма отправки комментария в Game Details (Story 4, RSS-QS-4-2-2).
// Доступна только при активной сессии: у гостя поле заблокировано, а
// кнопка предлагает войти. Отправка -- кнопкой или Enter (Shift+Enter --
// перенос строки).

export const COMMENT_GUEST_MESSAGE = 'Log in to post comments.';

// Высота поля растёт вместе с текстом до этого предела, дальше внутри
// появляется вертикальная прокрутка (значение совпадает с max-height в
// game-details.scss).
const MAX_TEXTAREA_HEIGHT = 88;

export interface CommentFormOptions {
  slug: string;
  // Комментарий создан (201) -- владелец перезапрашивает список.
  onPosted: () => void;
}

export interface CommentFormHandle {
  element: HTMLFormElement;
  // Перерисовать под текущую сессию (вход/выход/истечение).
  refresh: () => void;
}

function getFailureMessage(error: unknown): string {
  if (error instanceof ApiError && error.isUnknownOutcome) {
    return "We couldn't confirm whether your comment was posted. Check the comments before sending it again.";
  }

  if (error instanceof ApiError && error.isClientError) {
    return `Your comment was not posted: ${error.message}`;
  }

  return 'Failed to post your comment. Please try again.';
}

export function createCommentForm(options: CommentFormOptions): CommentFormHandle {
  const form = document.createElement('form');
  form.className = 'game-details__comment-form';
  form.noValidate = true;

  const avatar = document.createElement('span');
  avatar.className = 'game-details__comment-avatar game-details__comment-form-avatar';
  avatar.setAttribute('aria-hidden', 'true');

  const field = document.createElement('div');
  field.className = 'game-details__comment-field';

  // Новое поле при каждом открытии Game Details -- текст всегда пустой.
  const textarea = document.createElement('textarea');
  textarea.className = 'game-details__comment-input';
  textarea.name = 'comment';
  textarea.rows = 1;
  textarea.setAttribute('aria-label', 'Write a comment');

  const status = document.createElement('p');
  status.className = 'game-details__comment-status';
  status.setAttribute('role', 'status');
  status.id = 'game-details-comment-status';
  textarea.setAttribute('aria-describedby', status.id);

  field.append(textarea, status);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'btn btn--primary game-details__comment-submit';

  form.append(avatar, field, submitButton);

  let pending = false;

  const autoGrow = (): void => {
    textarea.style.height = 'auto';
    const nextHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';
  };

  const setStatus = (message: string, isError = false): void => {
    status.textContent = message;
    status.classList.toggle('game-details__comment-status--error', isError);
  };

  function setSubmitContent(): void {
    if (pending) {
      const spinner = document.createElement('span');
      spinner.className = 'material-symbols-outlined spinner';
      spinner.translate = false;
      spinner.setAttribute('aria-hidden', 'true');
      spinner.textContent = 'progress_activity';
      submitButton.replaceChildren(spinner, document.createTextNode('Sending…'));
      return;
    }

    submitButton.textContent = getSession() ? 'Send' : 'Log In';
  }

  function render(): void {
    const session = getSession();
    const isGuest = !session;

    form.classList.toggle('game-details__comment-form--guest', isGuest);
    textarea.disabled = isGuest || pending;
    textarea.placeholder = isGuest
      ? 'Log in to share your thoughts about this game...'
      : 'Share your thoughts about this game...';
    submitButton.disabled = pending;
    form.setAttribute('aria-busy', String(pending));

    // Аватар формы -- первая буква имени пользователя в верхнем регистре.
    avatar.hidden = isGuest;
    avatar.textContent = session ? getAvatarLetter(getProfileName(session)) : '';

    setSubmitContent();
  }

  async function submit(): Promise<void> {
    if (pending) return;

    // Гость (или пользователь с истёкшей сессией) запрос не отправляет:
    // вместо него открывается Auth, текст в поле сохраняется.
    const session = requireSession(COMMENT_GUEST_MESSAGE);
    if (!session) return;

    const error = validateCommentText(textarea.value);
    if (error) {
      setStatus(error, true);
      return;
    }

    pending = true;
    setStatus('');
    render();

    try {
      await postComment(options.slug, {
        userEmail: session.email,
        authorName: getCommentAuthorName(session),
        text: textarea.value.trim(),
      });

      pending = false;
      textarea.value = '';
      render();
      autoGrow();
      showSnackbar('Your comment has been posted.', { variant: 'success' });
      options.onPosted();
    } catch (requestError) {
      // Текст остаётся в поле; автоматически ничего не переотправляем --
      // пользователь сам решит, отправлять ли ещё раз.
      pending = false;
      render();
      const message = getFailureMessage(requestError);
      setStatus(message, true);
      showSnackbar(message, { variant: 'error' });
    }
  }

  textarea.addEventListener('input', () => {
    autoGrow();
    const { length } = textarea.value.trim();
    setStatus(
      length > COMMENT_TEXT_MAX_LENGTH ? `${length}/${COMMENT_TEXT_MAX_LENGTH} characters` : '',
      length > COMMENT_TEXT_MAX_LENGTH,
    );
  });

  textarea.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    void submit();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!getSession()) {
      openAuth('login');
      return;
    }

    void submit();
  });

  render();

  return { element: form, refresh: render };
}
