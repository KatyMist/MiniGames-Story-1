import './game-details.scss';
import { createCommentsSection, type CommentsSectionHandle } from './gameComments';
import {
  createErrorBanner,
  createLoadingRegion,
  createNotFoundState,
  createSkeleton,
} from '../feedback/feedback';
import { showSnackbar } from '../snackbar/snackbar';
import {
  ApiError,
  fetchGameDetails,
  isAbortError,
  type GameDetails,
  type GameRecord,
} from '../../shared/api';
import { formatCompactNumber, formatScore } from '../../shared/format';
import { getCardImagePath, resolveAssetUrl, setImageSources } from '../../shared/gameImages';

export interface GameDetailsOptions {
  // Закрытие действием пользователя (крестик/бэкдроп/Escape). Владелец
  // меняет URL (убирает ?game=), а роутер уже вызывает close().
  onDismiss?: () => void;
}

export interface GameDetailsHandle {
  element: HTMLElement;
  open: (slug: string) => void;
  close: () => void;
}

const TITLE_ID = 'game-details-title';

function createStat(
  iconName: 'star' | 'favorite',
  modifier: string,
  value: string,
): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = `game-details__stat ${modifier}`;

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined game-details__stat-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = iconName;

  const text = document.createElement('span');
  text.className = 'game-details__stat-value';
  text.textContent = value;

  wrapper.append(icon, text);
  return wrapper;
}

function createInfoChip(label: string): HTMLSpanElement {
  const chip = document.createElement('span');
  chip.className = 'game-details__chip';
  chip.textContent = label;
  return chip;
}

// Play Now -- по заданию no-op (нет реального геймплея). Add to Favorites
// переключает состояние (aria-pressed + смена подписи/иконки), но никуда
// не сохраняется -- сбрасывается при следующем открытии диалога
// (избранное через API -- Story 4).
function createActions(): HTMLDivElement {
  const actions = document.createElement('div');
  actions.className = 'game-details__actions';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'btn btn--primary btn--lg game-details__play';
  playButton.textContent = 'Play Now';

  const favoriteButton = document.createElement('button');
  favoriteButton.type = 'button';
  favoriteButton.className = 'btn btn--outline btn--lg game-details__favorite';
  favoriteButton.setAttribute('aria-pressed', 'false');

  const favoriteIcon = document.createElement('span');
  favoriteIcon.className = 'material-symbols-outlined';
  favoriteIcon.setAttribute('aria-hidden', 'true');
  favoriteIcon.textContent = 'favorite';

  const favoriteLabel = document.createElement('span');
  favoriteLabel.textContent = 'Add to Favorites';

  favoriteButton.append(favoriteIcon, favoriteLabel);

  let isFavorite = false;
  favoriteButton.addEventListener('click', () => {
    isFavorite = !isFavorite;
    favoriteButton.setAttribute('aria-pressed', String(isFavorite));
    favoriteButton.classList.toggle('game-details__favorite--active', isFavorite);
    favoriteLabel.textContent = isFavorite ? 'Added to Favorites' : 'Add to Favorites';
  });

  actions.append(playButton, favoriteButton);
  return actions;
}

function createInfoSection(game: GameDetails): HTMLElement {
  const section = document.createElement('div');
  section.className = 'game-details__info';

  const titleRow = document.createElement('div');
  titleRow.className = 'game-details__title-row';

  const title = document.createElement('h2');
  title.className = 'game-details__title';
  title.id = TITLE_ID;
  title.textContent = game.name;

  const stats = document.createElement('div');
  stats.className = 'game-details__stats';
  stats.append(
    createStat('star', 'game-details__stat--rating', game.rating.toFixed(1)),
    createStat('favorite', 'game-details__stat--likes', formatCompactNumber(game.likesCount)),
  );

  titleRow.append(title, stats);

  // Бейджи -- характеристики игры из specs (жанр, игроки, длительность, цена).
  const chips = document.createElement('div');
  chips.className = 'game-details__chips';
  chips.append(
    ...[game.specs.genre, game.specs.players, game.specs.duration, game.specs.price]
      .filter(Boolean)
      .map((label) => createInfoChip(label)),
  );

  const description = document.createElement('p');
  description.className = 'game-details__description';
  description.textContent = game.fullDescription;

  section.append(titleRow, chips, description, createActions());
  return section;
}

// Top Records -- чисто информационный блок (по заданию без интерактива).
function createRecordsSection(records: readonly GameRecord[]): HTMLElement {
  const section = document.createElement('section');
  section.className = 'game-details__records';
  section.setAttribute('aria-label', 'Top records');

  const heading = document.createElement('h3');
  heading.className = 'game-details__section-heading';
  heading.textContent = 'Top Records';

  section.append(heading);

  if (records.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'game-details__empty';
    empty.textContent = 'No records yet. Be the first to set one!';
    section.append(empty);
    return section;
  }

  const list = document.createElement('ol');
  list.className = 'game-details__records-list';

  for (const record of records) {
    const item = document.createElement('li');
    item.className = 'game-details__record';

    const rank = document.createElement('span');
    rank.className = 'game-details__record-rank';
    rank.textContent = `#${record.position}`;

    const name = document.createElement('span');
    name.className = 'game-details__record-name';
    name.textContent = record.playerName;

    const score = document.createElement('span');
    score.className = 'game-details__record-score';
    score.textContent = formatScore(record.score);

    item.append(rank, name, score);
    list.append(item);
  }

  section.append(list);
  return section;
}

// Скелетон тела диалога: заголовок, бейджи, описание и строки рекордов.
function createBodySkeleton(): HTMLElement {
  const info = document.createElement('div');
  info.className = 'game-details__info';
  info.append(
    createSkeleton('game-details__skeleton-line game-details__skeleton-line--title'),
    createSkeleton('game-details__skeleton-line game-details__skeleton-line--chips'),
    createSkeleton('game-details__skeleton-line'),
    createSkeleton('game-details__skeleton-line game-details__skeleton-line--short'),
  );

  const records = document.createElement('div');
  records.className = 'game-details__records';
  records.append(
    ...Array.from({ length: 3 }, () => createSkeleton('game-details__skeleton-record')),
  );

  return createLoadingRegion('Loading game details', info, records);
}

export function createGameDetails(options: GameDetailsOptions = {}): GameDetailsHandle {
  const root = document.createElement('div');
  root.className = 'game-details';

  const backdrop = document.createElement('div');
  backdrop.className = 'game-details__backdrop';

  const panel = document.createElement('div');
  panel.className = 'game-details__panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Game details');

  const hero = document.createElement('div');
  hero.className = 'game-details__hero';

  const heroMedia = document.createElement('div');
  heroMedia.className = 'game-details__hero-media';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'game-details__close';
  closeButton.setAttribute('aria-label', 'Close game details');

  const closeIcon = document.createElement('span');
  closeIcon.className = 'material-symbols-outlined';
  closeIcon.setAttribute('aria-hidden', 'true');
  closeIcon.textContent = 'close';
  closeButton.append(closeIcon);

  hero.append(heroMedia, closeButton);

  const body = document.createElement('div');
  body.className = 'game-details__body';

  panel.append(hero, body);
  root.append(backdrop, panel);

  let isOpen = false;
  let currentSlug = '';
  let controller: AbortController | undefined;
  let comments: CommentsSectionHandle | undefined;
  let hasFailed = false;

  // Обложка игры (media): heroImage из API; если такого файла нет --
  // обложка карточки этой игры; нет и её -- декоративная заглушка
  // (градиент + название).
  function renderHero(game: GameDetails): void {
    const showPlaceholder = (): void => {
      const heroTitle = document.createElement('span');
      heroTitle.className = 'game-details__hero-placeholder-title';
      heroTitle.textContent = game.name;
      heroMedia.replaceChildren(heroTitle);
    };

    const image = document.createElement('img');
    image.className = 'game-details__hero-image';
    image.alt = game.name;
    heroMedia.replaceChildren(image);

    setImageSources(
      image,
      [resolveAssetUrl(game.heroImage), resolveAssetUrl(getCardImagePath(game.slug))],
      showPlaceholder,
    );
  }

  function setLabel(labelledByTitle: boolean): void {
    if (labelledByTitle) {
      panel.setAttribute('aria-labelledby', TITLE_ID);
      panel.removeAttribute('aria-label');
    } else {
      panel.removeAttribute('aria-labelledby');
      panel.setAttribute('aria-label', 'Game details');
    }
  }

  function showLoading(): void {
    setLabel(false);
    hero.classList.add('game-details__hero--loading');
    heroMedia.replaceChildren(createSkeleton('game-details__hero-skeleton'));
    body.replaceChildren(createBodySkeleton());
  }

  function showGame(game: GameDetails): void {
    hero.classList.remove('game-details__hero--loading');
    renderHero(game);
    // Комментарии -- отдельный запрос со своими состояниями загрузки/ошибки.
    comments = createCommentsSection(game.slug);
    body.replaceChildren(
      createInfoSection(game),
      createRecordsSection(game.topRecords),
      comments.element,
    );
    setLabel(true);
  }

  function showStatus(content: HTMLElement): void {
    setLabel(false);
    hero.classList.remove('game-details__hero--loading');
    heroMedia.replaceChildren();
    body.replaceChildren(content);
  }

  function abortRequests(): void {
    controller?.abort();
    comments?.abort();
    comments = undefined;
  }

  async function load(slug: string): Promise<void> {
    abortRequests();
    controller = new AbortController();
    const { signal } = controller;

    showLoading();

    try {
      const game = await fetchGameDetails(slug, signal);
      showGame(game);

      if (hasFailed) {
        showSnackbar('Game details loaded successfully.', { variant: 'success' });
      }
      hasFailed = false;
    } catch (error) {
      if (isAbortError(error)) return;

      if (error instanceof ApiError && error.isNotFound) {
        showStatus(
          createNotFoundState(
            'Game Not Found',
            "The game you're looking for doesn't exist or has been removed.",
            { label: 'Close', onClick: dismiss },
          ),
        );
        showSnackbar('Game not found.', { variant: 'error' });
        return;
      }

      hasFailed = true;
      showStatus(
        createErrorBanner("We couldn't load this game. Please try again.", () => {
          void load(slug);
        }),
      );
      showSnackbar('Failed to load game details.', { variant: 'error' });
    }
  }

  const close = (): void => {
    if (!isOpen) return;
    isOpen = false;
    currentSlug = '';
    abortRequests();
    root.classList.remove('game-details--open');
    document.body.style.removeProperty('overflow');
  };

  // Открытие по slug игры: каждый раз -- свежий запрос GET /api/games/{slug}.
  const open = (slug: string): void => {
    if (isOpen && slug === currentSlug) return;
    isOpen = true;
    currentSlug = slug;
    root.classList.add('game-details--open');
    document.body.style.overflow = 'hidden';
    void load(slug);
  };

  function dismiss(): void {
    if (!isOpen) return;

    if (options.onDismiss) {
      options.onDismiss();
    } else {
      close();
    }
  }

  closeButton.addEventListener('click', dismiss);
  backdrop.addEventListener('click', dismiss);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dismiss();
  });

  return { element: root, open, close };
}
