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

// ВНИМАНИЕ (не удалять до подтверждения): category/price/description ниже —
// ЗАГЛУШКИ. В присланных скринах Dev Mode были только размеры и текстовые
// стили этих полей (Title and Badge Row 476×29, price "Free" 52×29
// headline-medium/price-free, description 476×67 body-medium/on-bg), но не
// сам контент по каждой из 6 карточек. Рейтинг для "Vacation Cafe Simulator"
// и "Winter Burrow" — уже подтверждённые значения из
// src/components/new-games/newGames.ts. "Shelve the Potions!" там же
// помечен как неподтверждённый — перенесла как есть. Для "Heartopia",
// "Palia" и "Cat Mail Co." рейтинга/лайков в макете вообще не видела —
// заглушки. Лайки в эту карточку НЕ добавляю: блок рейтинга в Dev Mode
// (68 Hug × 24 Hug) слишком узкий, чтобы вместить ещё и лайки — похоже,
// сюда идёт только рейтинг.
const GAMES: readonly LibraryGame[] = [
  {
    title: 'Vacation Cafe Simulator',
    imageUrl: vacationCardUrl,
    category: 'Category',
    price: 'Free',
    rating: '4.8',
    likes: '28.7K',
    description: 'Описание ожидает точного текста из макета.',
  },
  {
    title: 'Winter Burrow',
    imageUrl: winterBurrowCardUrl,
    category: 'Category',
    price: 'Free',
    rating: '4.9',
    likes: '32.4K',
    description: 'Описание ожидает точного текста из макета.',
  },
  {
    title: 'Shelve the Potions!',
    imageUrl: shelvePotionsCardUrl,
    category: 'Category',
    price: 'Free',
    rating: '4.4',
    likes: '7.1K',
    description: 'Описание ожидает точного текста из макета.',
  },
  {
    title: 'Heartopia',
    imageUrl: heartopiaCardUrl,
    category: 'Category',
    price: 'Free',
    rating: '—',
    likes: '—',
    description: 'Описание ожидает точного текста из макета.',
  },
  {
    title: 'Palia',
    imageUrl: paliaCardUrl,
    category: 'Category',
    price: 'Free',
    rating: '—',
    likes: '—',
    description: 'Описание ожидает точного текста из макета.',
  },
  {
    title: 'Cat Mail Co.',
    imageUrl: catMailCardUrl,
    category: 'Category',
    price: 'Free',
    rating: '—',
    likes: '—',
    description: 'Описание ожидает точного текста из макета.',
  },
];

function createRating(rating: string): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'library-results__rating';

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined library-results__rating-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = 'star';

  const value = document.createElement('span');
  value.className = 'library-results__rating-value';
  value.textContent = rating;

  wrapper.append(icon, value);
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

  const bottomRow = document.createElement('div');
  bottomRow.className = 'library-results__bottom';
  bottomRow.append(createRating(game.rating), createDetailsButton());

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

  const prev = createPageButton('Предыдущая страница', 'arrow_back');
  prev.classList.add('library-results__page--nav');
  prev.disabled = true;

  const page1 = createPageButton('1');
  page1.classList.add('library-results__page--active');

  const page2 = createPageButton('2');
  const page3 = createPageButton('3');
  const page4 = createPageButton('4');

  const next = createPageButton('Следующая страница', 'arrow_forward');
  next.classList.add('library-results__page--nav');

  pagination.append(prev, page1, page2, page3, page4, next);
  return pagination;
}

export function createLibraryResults(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'library-results';
  section.setAttribute('aria-label', 'Результаты поиска игр');

  const grid = document.createElement('ul');
  grid.className = 'library-results__grid';
  grid.append(...GAMES.map((game) => createCard(game)));

  section.append(grid, createPagination());

  return section;
}
