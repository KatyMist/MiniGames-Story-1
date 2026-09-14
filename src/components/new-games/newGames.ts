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
// Рейтинг/лайки сверены в Figma только для "Vacation Cafe Simulator"
// (Properties -> Text); для остальных карточек панель не позволила
// раскрыть вложенные текстовые слои (см. PR) — значения ниже временные
// и требуют подтверждения реальными цифрами.
const GAMES: readonly GameCard[] = [
  { title: 'Tailside: Cozy Cafe Sim', imageUrl: tailsideCardUrl, rating: '4.6', likes: '12.4K' },
  { title: 'Islanders: New Shores', imageUrl: islandersCardUrl, rating: '4.7', likes: '19.2K' },
  { title: 'Vacation Cafe Simulator', imageUrl: vacationCardUrl, rating: '4.8', likes: '28.7K' },
  { title: 'Winter Burrow', imageUrl: winterBurrowCardUrl, rating: '4.5', likes: '9.8K' },
  { title: 'Shelve the Potions!', imageUrl: shelvePotionsCardUrl, rating: '4.4', likes: '7.1K' },
];

// Ширины карточек по "расстоянию" от активной (0 — активная), сверены в
// Figma для каждого брейкпоинта (Carousel Track на home-mobile/-tablet/-desktop).
const MOBILE_WIDTH_SCALE: readonly number[] = [218, 56];

const WIDTH_SCALE_BY_BREAKPOINT: readonly { query: string; widths: readonly number[] }[] = [
  { query: '(min-width: 1920px)', widths: [816, 288, 120] },
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

  const image = document.createElement('img');
  image.className = 'new-games__card-image';
  image.src = game.imageUrl;
  image.alt = game.title;
  image.loading = 'lazy';

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
  card.append(image, overlay);

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

  const track = document.createElement('ul');
  track.className = 'new-games__track';

  const cards = GAMES.map((game) => createCard(game));
  track.append(...cards);

  section.append(headerRow, track);

  let activeIndex = Math.floor(GAMES.length / 2);

  function render(): void {
    const widthScale = getActiveWidthScale();

    for (const [index, card] of cards.entries()) {
      const distance = Math.abs(index - activeIndex);

      if (distance < widthScale.length) {
        card.style.width = `${widthScale[distance]}px`;
        card.classList.remove('new-games__card--collapsed');
      } else {
        card.style.width = '0px';
        card.classList.add('new-games__card--collapsed');
      }

      card.classList.toggle('new-games__card--active', distance === 0);
    }

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

  window.addEventListener('resize', render);

  render();

  return section;
}
