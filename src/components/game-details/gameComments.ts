import {
  createEmptyState,
  createErrorBanner,
  createLoadingRegion,
  createSkeleton,
} from '../feedback/feedback';
import { showSnackbar } from '../snackbar/snackbar';
import { fetchGameComments, isAbortError, type GameComment } from '../../shared/api';
import { formatRelativeTime } from '../../shared/format';

// Последние комментарии игры: GET /api/games/{slug}/comments?limit=3&sort=newest.
// Story 3 -- только чтение: публикация и лайки комментариев требуют
// авторизации и появятся в Story 4.

export interface CommentsSectionHandle {
  element: HTMLElement;
  abort: () => void;
}

const SKELETON_COMMENT_COUNT = 3;

function createCommentForm(): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'game-details__comment-form';
  form.noValidate = true;

  const textarea = document.createElement('textarea');
  textarea.className = 'game-details__comment-input';
  textarea.placeholder = 'Share your thoughts about this game...';
  textarea.rows = 1;
  textarea.setAttribute('aria-label', 'Write a comment');

  // Автоувеличение по контенту до 88px, дальше -- прокрутка внутри поля
  // (по заданию). scrollHeight после height:auto даёт "естественную"
  // высоту под текущий текст.
  const MAX_TEXTAREA_HEIGHT = 88;
  const autoGrow = (): void => {
    textarea.style.height = 'auto';
    const nextHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';
  };
  textarea.addEventListener('input', autoGrow);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'btn btn--primary game-details__comment-submit';
  submitButton.textContent = 'Post';

  // Отправка комментариев -- авторизованная операция (Story 4). Сейчас
  // только сообщаем об этом через Snackbar, без перезагрузки страницы.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showSnackbar('Posting comments will be available after you log in.', { variant: 'info' });
  });

  form.append(textarea, submitButton);
  return form;
}

// Счётчик лайков -- только отображение (лайк -- авторизованная операция).
function createCommentLikes(likes: number): HTMLSpanElement {
  const wrapper = document.createElement('span');
  wrapper.className = 'game-details__comment-like';
  wrapper.setAttribute('aria-label', `${likes} likes`);

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = 'favorite';

  const count = document.createElement('span');
  count.setAttribute('aria-hidden', 'true');
  count.textContent = String(likes);

  wrapper.append(icon, count);
  return wrapper;
}

function createCommentItem(comment: GameComment): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'game-details__comment';

  const avatar = document.createElement('div');
  avatar.className = 'game-details__comment-avatar';
  avatar.textContent = comment.authorName.slice(0, 1).toUpperCase();
  avatar.setAttribute('aria-hidden', 'true');

  const body = document.createElement('div');
  body.className = 'game-details__comment-body';

  const meta = document.createElement('div');
  meta.className = 'game-details__comment-meta';

  const author = document.createElement('p');
  author.className = 'game-details__comment-author';
  author.textContent = comment.authorName;

  // Время -- в человекочитаемом виде ("2 hours ago"), точная дата -- в
  // атрибуте datetime и во всплывающей подсказке.
  const time = document.createElement('time');
  time.className = 'game-details__comment-time';
  time.dateTime = comment.createdAt;
  time.textContent = formatRelativeTime(comment.createdAt);
  time.title = new Date(comment.createdAt).toLocaleString('en-US');

  meta.append(author, time);

  const text = document.createElement('p');
  text.className = 'game-details__comment-text';
  text.textContent = comment.text;

  body.append(meta, text);
  item.append(avatar, body, createCommentLikes(comment.likesCount));

  return item;
}

function createSkeletonComment(): HTMLElement {
  const item = document.createElement('div');
  item.className = 'game-details__comment';
  item.append(
    createSkeleton('game-details__comment-avatar game-details__skeleton-avatar'),
    createSkeleton('game-details__skeleton-comment'),
  );

  return item;
}

export function createCommentsSection(slug: string): CommentsSectionHandle {
  const section = document.createElement('section');
  section.className = 'game-details__comments';
  section.setAttribute('aria-labelledby', 'game-details-comments-heading');

  const heading = document.createElement('h3');
  heading.className = 'game-details__section-heading';
  heading.id = 'game-details-comments-heading';
  heading.textContent = 'Comments';

  const content = document.createElement('div');
  content.className = 'game-details__comments-content';

  section.append(heading, createCommentForm(), content);

  let controller: AbortController | undefined;
  let hasFailed = false;

  async function load(): Promise<void> {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    heading.textContent = 'Comments';
    content.replaceChildren(
      createLoadingRegion(
        'Loading comments',
        ...Array.from({ length: SKELETON_COMMENT_COUNT }, () => createSkeletonComment()),
      ),
    );

    try {
      const response = await fetchGameComments(slug, signal);

      // Заголовок -- с общим числом комментариев: "Comments (12)".
      heading.textContent = `Comments (${response.meta.totalComments})`;

      if (response.data.length === 0) {
        content.replaceChildren(
          createEmptyState(
            'No comments yet',
            'Be the first to share your thoughts about this game.',
          ),
        );
      } else {
        const list = document.createElement('ul');
        list.className = 'game-details__comments-list';
        list.append(...response.data.map((comment) => createCommentItem(comment)));
        content.replaceChildren(list);
      }

      if (hasFailed) {
        showSnackbar('Comments loaded successfully.', { variant: 'success' });
      }
      hasFailed = false;
    } catch (error) {
      if (isAbortError(error)) return;

      hasFailed = true;
      content.replaceChildren(
        createErrorBanner("We couldn't load comments. Please try again.", () => {
          void load();
        }),
      );
      showSnackbar('Failed to load comments.', { variant: 'error' });
    }
  }

  void load();

  return {
    element: section,
    abort: () => controller?.abort(),
  };
}
