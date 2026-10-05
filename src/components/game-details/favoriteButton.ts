import { requireSession } from '../../app/guards';
import { ApiError, toggleFavorite, type FavoriteState } from '../../shared/api';
import { showSnackbar } from '../snackbar/snackbar';

// Кнопка "Add to Favorites" в Game Details (Story 4, RSS-QS-4-2-1).
// Состояние всегда приходит с сервера: начальное -- из персонального
// GET /api/games/{slug}?userEmail=..., новое -- из ответа POST .../favorite.
// Пока запрос в процессе, кнопка заблокирована и повторный toggle
// невозможен; запрос с неизвестным исходом автоматически не повторяется.

export const FAVORITE_GUEST_MESSAGE = 'Log in to add games to your favorites.';

export interface FavoriteButtonOptions {
  slug: string;
  isFavorited: boolean;
  // Новое число лайков игры из ответа сервера.
  onLikesChange?: (likesCount: number) => void;
}

export interface FavoriteButtonHandle {
  element: HTMLButtonElement;
  // Состояние из свежего ответа API (смена пользователя/выход).
  setFavorited: (isFavorited: boolean) => void;
  isPending: () => boolean;
}

function getFailureMessage(error: unknown): string {
  if (error instanceof ApiError && error.isUnknownOutcome) {
    return "We couldn't confirm whether your favorites were updated. Reopen the game to check.";
  }

  return 'Failed to update favorites. Please try again.';
}

export function createFavoriteButton(options: FavoriteButtonOptions): FavoriteButtonHandle {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn--outline btn--lg game-details__favorite';

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined';
  icon.translate = false;
  icon.setAttribute('aria-hidden', 'true');

  const label = document.createElement('span');

  button.append(icon, label);

  let isFavorited = options.isFavorited;
  let pending = false;

  function render(): void {
    button.disabled = pending;
    button.setAttribute('aria-pressed', String(isFavorited));
    button.setAttribute('aria-busy', String(pending));
    button.classList.toggle('game-details__favorite--active', isFavorited);
    icon.classList.toggle('spinner', pending);
    icon.textContent = pending ? 'progress_activity' : 'favorite';
    label.textContent = isFavorited ? 'Added to Favorites' : 'Add to Favorites';
  }

  function applyServerState(state: FavoriteState): void {
    isFavorited = state.isFavorited;
    options.onLikesChange?.(state.likesCount);
  }

  async function toggle(): Promise<void> {
    if (pending) return;

    const session = requireSession(FAVORITE_GUEST_MESSAGE);
    if (!session) return;

    pending = true;
    render();

    try {
      const state = await toggleFavorite(options.slug, session.email);
      applyServerState(state);
      showSnackbar(state.isFavorited ? 'Added to favorites.' : 'Removed from favorites.', {
        variant: 'success',
      });
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

  return {
    element: button,
    setFavorited: (value) => {
      isFavorited = value;
      render();
    },
    isPending: () => pending,
  };
}
