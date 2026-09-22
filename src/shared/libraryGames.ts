import vacationCardUrl from '../assets/images/vacation-cafe-simulator-card.jpg';
import winterBurrowCardUrl from '../assets/images/winter-burrow-card.jpg';
import shelvePotionsCardUrl from '../assets/images/shelve-the-potions-card.jpg';
import heartopiaCardUrl from '../assets/images/heartopia.png';
import paliaCardUrl from '../assets/images/palia.png';
import catMailCardUrl from '../assets/images/cat.jpg';

export interface LibraryGame {
  title: string;
  imageUrl: string;
  category: string;
  price: string;
  rating: number;
  likes: string;
  description: string;
}

// Единая точка правды для карточек библиотеки: раньше данные лежали прямо
// внутри libraryResults.ts, из-за чего library-filters не мог по ним
// фильтровать/сортировать. rating теперь число (а не строка), чтобы
// сортировка "Sort by: Rating" работала как настоящая сортировка, а не по
// алфавиту строки. Текст на карточке (createStat) сам форматирует число
// обратно в "4.8".
export const LIBRARY_GAMES: readonly LibraryGame[] = [
  {
    title: 'Vacation Cafe Simulator',
    imageUrl: vacationCardUrl,
    category: 'Strategy',
    price: 'Free',
    rating: 4.8,
    likes: '28.7K',
    description:
      'Cozy Italian Vacation Cafe \u{1F3D6}\u{FE0F} No timers, No stress \u{1F60C} cook traditional dishes \u{1F35D} upgrade and customize \u{1F3E0} just drink Prosecco \u{1F942} relax and grow your dream cafe \u{2728}',
  },
  {
    title: 'Winter Burrow',
    imageUrl: winterBurrowCardUrl,
    category: 'Farm',
    price: 'Free',
    rating: 4.9,
    likes: '32.4K',
    description:
      'A cozy woodland survival game about a mouse restoring their childhood burrow. Explore, gather resources, craft, knit warm sweaters, bake pies and meet the locals.',
  },
  {
    title: 'Shelve the Potions!',
    imageUrl: shelvePotionsCardUrl,
    category: 'Puzzle',
    price: 'Free',
    rating: 4.7,
    likes: '21.3K',
    description:
      "Organize 2000+ potions on shelves after the witch's cats have knocked them over, using clues around an enchanted cellar. Learn strange symbols and decipher cryptic notes.",
  },
  {
    title: 'Heartopia',
    imageUrl: heartopiaCardUrl,
    category: 'Strategy',
    price: '$1.99',
    rating: 4.6,
    likes: '46.8K',
    description:
      'A multiplayer life simulation game crafted for creativity, freedom, and peace. Build your dream home, explore hobbies, and forge warm connections with friends in a cozy town.',
  },
  {
    title: 'Palia',
    imageUrl: paliaCardUrl,
    category: 'Strategy',
    price: 'Free',
    rating: 4.8,
    likes: '89.5K',
    description:
      'A free-to-play fantasy life sim adventure where you can craft, explore, and create the life and home of your dreams in a vibrant, heartwarming world.',
  },
  {
    title: 'Cat Mail Co.',
    imageUrl: catMailCardUrl,
    category: 'Puzzle',
    price: 'Free',
    rating: 4.9,
    likes: '38.2K',
    description:
      'Run a cozy cat post office. Sort and deliver parcels from the daily boat. At night, the moon reveals hidden truths about packages. Clear a strange backlog and unlock new destinations.',
  },
];

export const LIBRARY_CATEGORIES: readonly string[] = [
  'All Games',
  'Puzzle',
  'Card',
  'Match',
  'Farm',
  'Strategy',
  'Arcade',
];
