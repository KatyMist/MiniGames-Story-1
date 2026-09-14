import './new-games.scss';
import tailsideCardUrl from '../../assets/images/tailside-cozy-cafe-sim-card.jpg';
import islandersCardUrl from '../../assets/images/islanders-new-shores-card.jpg';
import vacationCardUrl from '../../assets/images/vacation-cafe-simulator-card.jpg';
import winterBurrowCardUrl from '../../assets/images/winter-burrow-card.jpg';
import shelvePotionsCardUrl from '../../assets/images/shelve-the-potions-card.jpg';

interface GameCard {
  title: string;
  imageUrl: string;
  rating: string;
  likes: string;
}

// Игры и их порядок — как в макете Figma (Carousel Track, слева направо).
// Рейтинг/лайки для "Vacation Cafe Simulator", "Islanders: New Shores" и
// "Winter Burrow" подтверждены (сверены напрямую). Для "Tailside: Cozy Cafe
// Sim" и "Shelve the Potions!" реальные цифры пока не подтверждены —
// значения ниже временные, ждут подтверждения.
const GAMES: readonly GameCard[] = [
  { title: 'Tailside: Cozy Cafe Sim', imageUrl: tailsideCardUrl, rating: '4.6', likes: '12.4K' },
  { title: 'Islanders: New Shores', imageUrl: islandersCardUrl, rating: '4.9', likes: '54.2K' },
  { title: 'Vacation Cafe Simulator', imageUrl: vacationCardUrl, rating: '4.8', likes: '28.7K' },
  { title: 'Winter Burrow', imageUrl: winterBurrowCardUrl, rating: '4.9', likes: '32.4K' },
  { title: 'Shelve the Potions!', imageUrl: shelvePotionsCardUrl, rating: '4.4', likes: '7.1K' },
];

// Ширины карточек по "расстоянию" от активной (0 — активная), сверены в
// Figma для каждого брейкпоинта (Carousel Track на home-mobile/-tablet/-desktop).
// Сами пиксельные значения — точные цифры из макета Figma (кадры 1920/768/375).
// Порог для 3-уровневой "десктопной" раскладки (816/288/120) намеренно ниже,
// чем буквально 1920px: обычный развёрнутый на весь экран браузер (в т.ч. на
// MacBook с масштабированием Retina) почти никогда не даёт window.innerWidth
// ровно 1920 — при точном совпадении с 1920 карусель откатывалась на
// планшетную раскладку (448/105) даже в полноэкранном десктопном окне.
// 1440px — это уже безусловно "десктопная" ширина экрана, поэтому раскладку
// включаем от неё, не трогая сами измеренные в Figma значения.
const MOBILE_WIDTH_SCALE: readonly number[] = [218, 56];

// Отступ между карточками — совпадает с gap: utils.space('1') на
// .new-games__rail (src/styles/tokens/_spacing.scss: '1' = 8px). Нужен в JS
// отдельно, чтобы считать сдвиг ленты (см. render()) по целевым ширинам, а
// не через чтение layout из DOM.
const RAIL_GAP_PX = 8;

const WIDTH_SCALE_BY_BREAKPOINT: readonly { query: string; widths: readonly number[] }[] = [
  { query: '(min-width: 1440px)', widths: [816, 288, 120] },
  { query: '(min-width: 768px)', widths: [448, 105] },
];

function getActiveWidthScale(): readonly number[] {
  for (const { query, widths } of WIDTH_SCALE_BY_BREAKPOINT) {
    if (window.matchMedia(query).matches) {
      return widths;
    }
  }

  return MOBILE_WIDTH_SCALE;
}

function createIcon(name: 'star' | 'favorite', modifier: string): HTMLSpanElement {
  const icon = document.createElement('span');
  icon.className = `material-symbols-outlined new-games__icon ${modifier}`;
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = name;
  return icon;
}

function createCard(game: GameCard): HTMLLIElement {
  const card = document.createElement('li');
  card.className = 'new-games__card';

  // Отдельная обёртка с overflow: hidden — картинка обрезается по своим
  // границам гарантированно, а не полагается на border-radius у самого
  // <img> (тот способ зависит от рендерера и не даёт железной гарантии,
  // что фото не вылезет за скруглённый угол рамки при анимации ширины).
  const imageClip = document.createElement('div');
  imageClip.className = 'new-games__image-clip';

  const image = document.createElement('img');
  image.className = 'new-games__card-image';
  image.src = game.imageUrl;
  image.alt = game.title;
  image.loading = 'lazy';
  imageClip.append(image);

  const overlay = document.createElement('div');
  overlay.className = 'new-games__overlay';

  const title = document.createElement('h3');
  title.className = 'new-games__card-title';
  title.textContent = game.title;

  const meta = document.createElement('div');
  meta.className = 'new-games__card-meta';

  const rating = document.createElement('div');
  rating.className = 'new-games__card-rating';
  const ratingValue = document.createElement('span');
  ratingValue.className = 'new-games__card-value';
  ratingValue.textContent = game.rating;
  rating.append(createIcon('star', 'new-games__icon--star'), ratingValue);

  const likes = document.createElement('div');
  likes.className = 'new-games__card-likes';
  const likesValue = document.createElement('span');
  likesValue.className = 'new-games__card-value';
  likesValue.textContent = game.likes;
  likes.append(createIcon('favorite', 'new-games__icon--like'), likesValue);

  meta.append(rating, likes);
  overlay.append(title, meta);
  card.append(imageClip, overlay);

  return card;
}

function createArrowButton(direction: 'prev' | 'next'): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `new-games__arrow new-games__arrow--${direction}`;
  button.setAttribute('aria-label', direction === 'prev' ? 'Предыдущая игра' : 'Следующая игра');

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined new-games__arrow-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = direction === 'prev' ? 'arrow_back' : 'arrow_forward';

  button.append(icon);
  return button;
}

export function createNewGames(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'new-games';
  section.setAttribute('aria-label', 'Новые игры');

  const headerRow = document.createElement('div');
  headerRow.className = 'new-games__header';

  const titleGroup = document.createElement('div');
  titleGroup.className = 'new-games__title-group';

  const accent = document.createElement('span');
  accent.className = 'new-games__accent';
  accent.setAttribute('aria-hidden', 'true');

  const title = document.createElement('h2');
  title.className = 'new-games__title';
  title.textContent = 'New Games';

  titleGroup.append(accent, title);

  const arrows = document.createElement('div');
  arrows.className = 'new-games__arrows';
  const prevButton = createArrowButton('prev');
  const nextButton = createArrowButton('next');
  arrows.append(prevButton, nextButton);

  headerRow.append(titleGroup, arrows);

  const track = document.createElement('div');
  track.className = 'new-games__track';

  const rail = document.createElement('ul');
  rail.className = 'new-games__rail';

  const cards = GAMES.map((game) => createCard(game));
  rail.append(...cards);
  track.append(rail);

  section.append(headerRow, track);

  let activeIndex = Math.floor(GAMES.length / 2);

  function render(): void {
    const widthScale = getActiveWidthScale();
    let cursor = 0;
    let activeCenter = 0;

    for (const [index, card] of cards.entries()) {
      const distance = Math.abs(index - activeIndex);
      const width = distance < widthScale.length ? (widthScale[distance] ?? 0) : 0;

      card.style.width = `${width}px`;
      card.classList.toggle('new-games__card--collapsed', distance >= widthScale.length);
      card.classList.toggle('new-games__card--active', distance === 0);
      // Самая дальняя ("peek") карточка в Figma не показывает подпись —
      // её Overlay в Hug-режиме шире самой карточки, поэтому текст на
      // такой узкой карточке прячем совсем, а не обрезаем/переносим.
      card.classList.toggle('new-games__card--peek', distance >= widthScale.length - 1);

      if (index > 0) {
        cursor += RAIL_GAP_PX;
      }

      if (index === activeIndex) {
        activeCenter = cursor + width / 2;
      }

      cursor += width;
    }

    // Активная карточка всегда центрируется сдвигом всей ленты (rail), а не
    // через justify-content на треке: у первой/последней игры нет соседа с
    // одной из сторон, и без явного расчёта раскладка "уплывала" в сторону
    // вместо плавного центрирования. Считаем по целевым ширинам (widthScale),
    // а не через offsetLeft/offsetWidth: у карточек CSS-transition по width,
    // и синхронное чтение layout сразу после его смены отдаёт ещё не
    // анимированное (старое) значение — из-за этого центрирование сбивалось.
    rail.style.transform = `translateX(${track.clientWidth / 2 - activeCenter}px)`;

    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === GAMES.length - 1;
  }

  prevButton.addEventListener('click', () => {
    activeIndex = Math.max(0, activeIndex - 1);
    render();
  });

  nextButton.addEventListener('click', () => {
    activeIndex = Math.min(GAMES.length - 1, activeIndex + 1);
    render();
  });

  // ResizeObserver реагирует и на изменение размера окна (ширина трека
  // меняется вместе с ним), и на сам факт появления трека в layout'е:
  // первый вызов колбэка приходит сразу после observe(), даже если размер
  // "не менялся" — это как раз тот момент, когда track ещё нет в DOM во
  // время самого первого render() ниже (main.ts вставляет секцию в DOM уже
  // после того, как createNewGames() вернёт значение), из-за чего
  // track.clientWidth на тот момент равен 0 и центрирование ленты по нему
  // посчиталось бы неверно.
  const resizeObserver = new ResizeObserver(() => {
    render();
  });
  resizeObserver.observe(track);

  render();

  return section;
}
