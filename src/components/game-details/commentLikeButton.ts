import { requireSession } from '../../app/guards';
import { ApiError, toggleCommentLike, type GameComment } from '../../shared/api';
import { showSnackbar } from '../snackbar/snackbar';

// Лайк комментария (Story 4, RSS-QS-4-2-4). Начальное состояние -- из
// списка комментариев, запрошенного с userEmail; после клика -- строго из
// ответа POST /api/comments/{id}/like. Пока запрос идёт, кнопка
// заблокирована и показывает индикатор загрузки.

export const LIKE_GUEST_MESSAGE = 'Log in to like comments.';

function getFailureMessage(error: unknown): string {
  if (error instanceof ApiError && error.isUnknownOutcome) {
    return "We couldn't confirm whether your like was saved. Reopen the game to check.";
  }

  return 'Failed to update the like. Please try again.';
}

export function createCommentLikeButton(comment: GameComment): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'game-details__comment-like';

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined';
  icon.translate = false;
  icon.setAttribute('aria-hidden', 'true');

  const count = document.createElement('span');
  count.setAttribute('aria-hidden', 'true');

  button.append(icon, count);

  let isLiked = comment.isLikedByCurrentUser;
  let likesCount = comment.likesCount;
  let pending = false;

  function render(): void {
    button.disabled = pending;
    button.setAttribute('aria-pressed', String(isLiked));
    button.setAttribute('aria-busy', String(pending));
    button.setAttribute(
      'aria-label',
      `${isLiked ? 'Unlike' : 'Like'} comment (${likesCount} likes)`,
    );
    button.classList.toggle('game-details__comment-like--active', isLiked);
    icon.classList.toggle('spinner', pending);
    icon.textContent = pending ? 'progress_activity' : 'favorite';
    count.textContent = String(likesCount);
  }

  async function toggle(): Promise<void> {
    if (pending) return;

    const session = requireSession(LIKE_GUEST_MESSAGE);
    if (!session) return;

    pending = true;
    render();

    try {
      const state = await toggleCommentLike(comment.commentId, session.email);
      isLiked = state.isLikedByCurrentUser;
      likesCount = state.likesCount;
    } catch (error) {
      showSnackbar(getFailureMessage(error), { variant: 'error' });
    } finally {
      pending = false;
      render();
    }
  }

  button.addEventListener('click', () => {
    void toggle();
  });

  render();

  return button;
}
