import './game-details.scss';
import { GAME_DETAILS_CONTENT, type GameComment } from './gameDetailsContent';

export interface GameDetailsHandle {
  element: HTMLElement;
  open: () => void;
  close: () => void;
}

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
// не сохраняется -- сбрасывается при следующем открытии диалога.
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
    favoriteIcon.textContent = isFavorite ? 'favorite' : 'favorite';
  });

  actions.append(playButton, favoriteButton);
  return actions;
}

function createInfoSection(): HTMLElement {
  const section = document.createElement('div');
  section.className = 'game-details__info';

  const titleRow = document.createElement('div');
  titleRow.className = 'game-details__title-row';

  const title = document.createElement('h2');
  title.className = 'game-details__title';
  title.id = 'game-details-title';
  title.textContent = GAME_DETAILS_CONTENT.title;

  const stats = document.createElement('div');
  stats.className = 'game-details__stats';
  stats.append(
    createStat('star', 'game-details__stat--rating', GAME_DETAILS_CONTENT.rating.toFixed(1)),
    createStat('favorite', 'game-details__stat--likes', GAME_DETAILS_CONTENT.likes),
  );

  titleRow.append(title, stats);

  const chips = document.createElement('div');
  chips.className = 'game-details__chips';
  chips.append(
    createInfoChip(GAME_DETAILS_CONTENT.genre),
    createInfoChip(GAME_DETAILS_CONTENT.players),
    createInfoChip(GAME_DETAILS_CONTENT.duration),
    createInfoChip(GAME_DETAILS_CONTENT.price),
  );

  const description = document.createElement('p');
  description.className = 'game-details__description';
  description.textContent = GAME_DETAILS_CONTENT.description;

  section.append(titleRow, chips, description, createActions());
  return section;
}

// Top Records -- чисто информационный блок (по заданию без интерактива).
function createRecordsSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'game-details__records';
  section.setAttribute('aria-label', 'Top records');

  const heading = document.createElement('h3');
  heading.className = 'game-details__section-heading';
  heading.textContent = 'Top Records';

  const list = document.createElement('ol');
  list.className = 'game-details__records-list';

  for (const record of GAME_DETAILS_CONTENT.topRecords) {
    const item = document.createElement('li');
    item.className = 'game-details__record';

    const rank = document.createElement('span');
    rank.className = 'game-details__record-rank';
    rank.textContent = `#${record.rank}`;

    const name = document.createElement('span');
    name.className = 'game-details__record-name';
    name.textContent = record.playerName;

    const score = document.createElement('span');
    score.className = 'game-details__record-score';
    score.textContent = record.score;

    item.append(rank, name, score);
    list.append(item);
  }

  section.append(heading, list);
  return section;
}

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

  // Бэкенда для комментариев нет -- сабмит только гасит перезагрузку
  // страницы и очищает поле, реальной отправки/сохранения не происходит.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    textarea.value = '';
    autoGrow();
  });

  form.append(textarea, submitButton);
  return form;
}

function createCommentLikeButton(initialLikes: number): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'game-details__comment-like';
  button.setAttribute('aria-pressed', 'false');

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = 'favorite';

  const count = document.createElement('span');
  count.textContent = String(initialLikes);

  button.append(icon, count);

  // Каждая кнопка лайка переключается независимо от остальных -- состояние
  // (liked + счётчик) живёт только в замыкании этой конкретной кнопки.
  let isLiked = false;
  button.addEventListener('click', () => {
    isLiked = !isLiked;
    button.setAttribute('aria-pressed', String(isLiked));
    button.classList.toggle('game-details__comment-like--active', isLiked);
    count.textContent = String(isLiked ? initialLikes + 1 : initialLikes);
  });

  return button;
}

function createCommentItem(comment: GameComment): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'game-details__comment';

  const avatar = document.createElement('div');
  avatar.className = 'game-details__comment-avatar';
  avatar.textContent = comment.author.slice(0, 1).toUpperCase();
  avatar.setAttribute('aria-hidden', 'true');

  const body = document.createElement('div');
  body.className = 'game-details__comment-body';

  const author = document.createElement('p');
  author.className = 'game-details__comment-author';
  author.textContent = comment.author;

  const text = document.createElement('p');
  text.className = 'game-details__comment-text';
  text.textContent = comment.text;

  body.append(author, text);
  item.append(avatar, body, createCommentLikeButton(comment.likes));

  return item;
}

function createCommentsSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'game-details__comments';
  section.setAttribute('aria-label', 'Comments');

  const heading = document.createElement('h3');
  heading.className = 'game-details__section-heading';
  heading.textContent = 'Comments';

  const list = document.createElement('ul');
  list.className = 'game-details__comments-list';
  list.append(...GAME_DETAILS_CONTENT.comments.map((comment) => createCommentItem(comment)));

  section.append(heading, createCommentForm(), list);
  return section;
}

// ВНИМАНИЕ: реальной обложки "Tukoni: Forest Keepers" в проекте нет (в
// прошлый раз подстановка чужой картинки под неверным названием уже
// приводила к путанице -- см. историю с heartopia.png/palia.png), поэтому
// здесь намеренно декоративная заглушка (градиент + название), а не
// позаимствованная чужая обложка. Пришли реальную обложку из Figma
// (Export -> PNG/JPG) -- заменю на src/assets/images/tukoni-forest-keepers.*
function createHero(onClose: () => void): HTMLElement {
  const hero = document.createElement('div');
  hero.className = 'game-details__hero';

  const heroTitle = document.createElement('span');
  heroTitle.className = 'game-details__hero-placeholder-title';
  heroTitle.textContent = GAME_DETAILS_CONTENT.title;
  hero.append(heroTitle);

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'game-details__close';
  closeButton.setAttribute('aria-label', 'Close game details');

  const closeIcon = document.createElement('span');
  closeIcon.className = 'material-symbols-outlined';
  closeIcon.setAttribute('aria-hidden', 'true');
  closeIcon.textContent = 'close';
  closeButton.append(closeIcon);
  closeButton.addEventListener('click', onClose);

  hero.append(closeButton);
  return hero;
}

export function createGameDetails(): GameDetailsHandle {
  const root = document.createElement('div');
  root.className = 'game-details';

  const backdrop = document.createElement('div');
  backdrop.className = 'game-details__backdrop';

  const panel = document.createElement('div');
  panel.className = 'game-details__panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'game-details-title');

  let isOpen = false;

  const close = (): void => {
    if (!isOpen) return;
    isOpen = false;
    root.classList.remove('game-details--open');
    document.body.style.removeProperty('overflow');
  };

  const open = (): void => {
    isOpen = true;
    root.classList.add('game-details--open');
    document.body.style.overflow = 'hidden';
  };

  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  const body = document.createElement('div');
  body.className = 'game-details__body';
  body.append(createInfoSection(), createRecordsSection(), createCommentsSection());

  panel.append(createHero(close), body);
  root.append(backdrop, panel);

  return { element: root, open, close };
}
