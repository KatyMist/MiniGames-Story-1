import {
  createEmptyState,
  createErrorBanner,
  createLoadingRegion,
  createSkeleton,
} from '../feedback/feedback';
import { showSnackbar } from '../snackbar/snackbar';
import { createCommentForm } from './commentForm';
import { getSession } from '../../app/authStore';
import { fetchGameComments, isAbortError, type GameComment } from '../../shared/api';
import { formatRelativeTime } from '../../shared/format';
import { createAvatarToneRegistry, type AvatarToneRegistry } from '../../shared/avatarColors';
import { getAvatarLetter } from '../../shared/profile';

// Последние комментарии игры: GET /api/games/{slug}/comments?limit=3&sort=newest
// (+ &userEmail=... при активной сессии -- для персональных лайков).
// Над списком -- форма нового комментария (только для авторизованных).

export interface CommentsSectionHandle {
  element: HTMLElement;
  abort: () => void;
  // Смена сессии: перерисовать форму и перезапросить список.
  refresh: () => void;
}

const SKELETON_COMMENT_COUNT = 3;

// Счётчик лайков -- только отображение (лайк -- авторизованная операция).
function createCommentLikes(likes: number): HTMLSpanElement {
  const wrapper = document.createElement('span');
  wrapper.className = 'game-details__comment-like';
  wrapper.setAttribute('aria-label', `${likes} likes`);

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined';
  icon.translate = false;
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = 'favorite';

  const count = document.createElement('span');
  count.setAttribute('aria-hidden', 'true');
  count.textContent = String(likes);

  wrapper.append(icon, count);
  return wrapper;
}

function createCommentItem(comment: GameComment, tones: AvatarToneRegistry): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'game-details__comment';

  const avatar = document.createElement('div');
  // Фон -- случайный токен avatar-random-N, закреплённый за автором;
  // буква -- первый непробельный символ имени в верхнем регистре.
  avatar.className = `game-details__comment-avatar game-details__comment-avatar--tone-${tones.getTone(comment.authorName)}`;
  avatar.textContent = getAvatarLetter(comment.authorName);
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

  const form = createCommentForm({
    slug,
    // После успешной отправки -- свежие 3 последних комментария и общее
    // число из meta.totalComments.
    onPosted: () => {
      void load();
    },
  });

  section.append(heading, form.element, content);

  let controller: AbortController | undefined;
  let hasFailed = false;
  // Цвета аватаров живут столько же, сколько список комментариев: при
  // перезагрузке списка (новый комментарий, вход/выход) они не меняются.
  const avatarTones = createAvatarToneRegistry();

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
      const response = await fetchGameComments(slug, signal, getSession()?.email);

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
        list.append(...response.data.map((comment) => createCommentItem(comment, avatarTones)));
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
    refresh: () => {
      form.refresh();
      void load();
    },
  };
}
