import './library-results.scss';
import vacationCardUrl from '../../assets/images/vacation-cafe-simulator-card.jpg';
import winterBurrowCardUrl from '../../assets/images/winter-burrow-card.jpg';
import shelvePotionsCardUrl from '../../assets/images/shelve-the-potions-card.jpg';
import heartopiaCardUrl from '../../assets/images/heartopia.png';
import paliaCardUrl from '../../assets/images/palia.png';
import catMailCardUrl from '../../assets/images/cat.jpg';

interface LibraryGame {
  title: string;
  imageUrl: string;
  category: string;
  price: string;
  rating: string;
  likes: string;
  description: string;
}

// Данные ниже — с присланных мокапов страницы Library (tablet/mobile
// скрины с полным списком карточек): category/price/rating/likes читаются
// прямо с карточек, description — из отдельного текстового списка. Рейтинг
// и лайки для "Vacation Cafe Simulator" и "Winter Burrow" совпали с ранее
// подтверждённым в src/components/new-games/newGames.ts; "Shelve the
// Potions!" там был помечен как неподтверждённый (4.4/7.1K) — по новому
// скрину заменила на настоящие 4.7/21.3K.
const GAMES: readonly LibraryGame[] = [
  {
    title: 'Vacation Cafe Simulator',
    imageUrl: vacationCardUrl,
    category: 'Strategy',
    price: 'Free',
    rating: '4.8',
    likes: '28.7K',
    description:
      'Cozy Italian Vacation Cafe \u{1F3D6}\u{FE0F} No timers, No stress \u{1F60C} cook traditional dishes \u{1F35D} upgrade and customize \u{1F3E0} just drink Prosecco \u{1F942} relax and grow your dream cafe \u{2728}',
  },
  {
    title: 'Winter Burrow',
    imageUrl: winterBurrowCardUrl,
    category: 'Farm',
    price: 'Free',
    rating: '4.9',
    likes: '32.4K',
    description:
      'A cozy woodland survival game about a mouse restoring their childhood burrow. Explore, gather resources, craft, knit warm sweaters, bake pies and meet the locals.',
  },
  {
    title: 'Shelve the Potions!',
    imageUrl: shelvePotionsCardUrl,
    category: 'Puzzle',
    price: 'Free',
    rating: '4.7',
    likes: '21.3K',
    description:
      "Organize 2000+ potions on shelves after the witch's cats have knocked them over, using clues around an enchanted cellar. Learn strange symbols and decipher cryptic notes.",
  },
  {
    title: 'Heartopia',
    imageUrl: heartopiaCardUrl,
    category: 'Strategy',
    price: '$1.99',
    rating: '4.6',
    likes: '46.8K',
    description:
      'A multiplayer life simulation game crafted for creativity, freedom, and peace. Build your dream home, explore hobbies, and forge warm connections with friends in a cozy town.',
  },
  {
    title: 'Palia',
    imageUrl: paliaCardUrl,
    category: 'Strategy',
    price: 'Free',
    rating: '4.8',
    likes: '89.5K',
    description:
      'A free-to-play fantasy life sim adventure where you can craft, explore, and create the life and home of your dreams in a vibrant, heartwarming world.',
  },
  {
    title: 'Cat Mail Co.',
    imageUrl: catMailCardUrl,
    category: 'Puzzle',
    price: 'Free',
    rating: '4.9',
    likes: '38.2K',
    description:
      'Run a cozy cat post office. Sort and deliver parcels from the daily boat. At night, the moon reveals hidden truths about packages. Clear a strange backlog and unlock new destinations.',
  },
];

// Раньше лайки сюда не добавляла (см. историю) -- по 68 Hug × 24 Hug из
// Dev Mode-скрина для десктопной сетки казалось, что влезает только
// рейтинг. По присланным мокапам tablet/mobile лайки на карточке ЕСТЬ
// (звезда+рейтинг и сердце+лайки рядом) -- то узкое измерение, видимо,
// было по другому элементу. Возвращаю лайки, как на скринах.
function createStat(
  iconName: 'star' | 'favorite',
  modifier: string,
  value: string,
): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = `library-results__stat ${modifier}`;

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined library-results__stat-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = iconName;

  const text = document.createElement('span');
  text.className = 'library-results__stat-value';
  text.textContent = value;

  wrapper.append(icon, text);
  return wrapper;
}

function createDetailsButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'library-results__details';
  button.textContent = 'Details';
  return button;
}

function createCard(game: LibraryGame): HTMLLIElement {
  const card = document.createElement('li');
  card.className = 'library-results__card';

  const image = document.createElement('img');
  image.className = 'library-results__image';
  image.src = game.imageUrl;
  image.alt = game.title;
  image.loading = 'lazy';

  const content = document.createElement('div');
  content.className = 'library-results__content';

  const topRow = document.createElement('div');
  topRow.className = 'library-results__top';

  const titleGroup = document.createElement('div');
  titleGroup.className = 'library-results__title-group';

  const title = document.createElement('h3');
  title.className = 'library-results__title';
  title.textContent = game.title;

  const badge = document.createElement('span');
  badge.className = 'library-results__badge';
  badge.textContent = game.category;

  titleGroup.append(title, badge);

  const price = document.createElement('span');
  price.className = 'library-results__price';
  price.textContent = game.price;

  topRow.append(titleGroup, price);

  const description = document.createElement('p');
  description.className = 'library-results__description';
  description.textContent = game.description;

  const stats = document.createElement('div');
  stats.className = 'library-results__stats';
  stats.append(
    createStat('star', 'library-results__stat--rating', game.rating),
    createStat('favorite', 'library-results__stat--likes', game.likes),
  );

  const bottomRow = document.createElement('div');
  bottomRow.className = 'library-results__bottom';
  bottomRow.append(stats, createDetailsButton());

  content.append(topRow, description, bottomRow);
  card.append(image, content);

  return card;
}

function createPageButton(label: string, iconName?: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'library-results__page';

  if (iconName) {
    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined library-results__page-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = iconName;
    button.append(icon);
    button.setAttribute('aria-label', label);
  } else {
    button.textContent = label;
  }

  return button;
}

function createPagination(): HTMLDivElement {
  const pagination = document.createElement('div');
  pagination.className = 'library-results__pagination';

  const prev = createPageButton('Previous page', 'arrow_back');
  prev.classList.add('library-results__page--nav');
  prev.disabled = true;

  const page1 = createPageButton('1');
  page1.classList.add('library-results__page--active');

  const page2 = createPageButton('2');
  const page3 = createPageButton('3');
  const page4 = createPageButton('4');

  const next = createPageButton('Next page', 'arrow_forward');
  next.classList.add('library-results__page--nav');

  pagination.append(prev, page1, page2, page3, page4, next);
  return pagination;
}

export function createLibraryResults(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'library-results';
  section.setAttribute('aria-label', 'Game search results');

  const grid = document.createElement('ul');
  grid.className = 'library-results__grid';
  grid.append(...GAMES.map((game) => createCard(game)));

  section.append(grid, createPagination());

  return section;
}
