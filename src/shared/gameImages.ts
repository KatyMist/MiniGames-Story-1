import catMailCardUrl from '../assets/images/cat.jpg';
import heartopiaCardUrl from '../assets/images/heartopia.png';
import paliaCardUrl from '../assets/images/palia.png';
import islandersCardUrl from '../assets/images/islanders-new-shores-card.jpg';
import islandersCardPeekUrl from '../assets/images/islanders-new-shores-card-peek.jpg';
import shelvePotionsCardUrl from '../assets/images/shelve-the-potions-card.jpg';
import shelvePotionsCardPeekUrl from '../assets/images/shelve-the-potions-card-peek.jpg';
import tailsideCardUrl from '../assets/images/tailside-cozy-cafe-sim-card.jpg';
import tailsideCardPeekUrl from '../assets/images/tailside-cozy-cafe-sim-card-peek.jpg';
import vacationCardUrl from '../assets/images/vacation-cafe-simulator-card.jpg';
import vacationCardPeekUrl from '../assets/images/vacation-cafe-simulator-card-peek.jpg';
import winterBurrowCardUrl from '../assets/images/winter-burrow-card.jpg';
import winterBurrowCardPeekUrl from '../assets/images/winter-burrow-card-peek.jpg';

// API отдаёт пути вида "/assets/images/games/<slug>-card.jpg" относительно
// фронтенда, а сами файлы лежат в проекте (src/assets/images). Сопоставляем
// их по slug игры. Для игр без обложки в проекте UI рисует CSS-заглушку с
// названием игры (картинка -- контент, а не часть вёрстки).
export interface GameImageSet {
  card: string;
  // Заранее обрезанная версия для узкой "peek"-карточки карусели.
  peek?: string;
}

const GAME_IMAGES: Readonly<Record<string, GameImageSet>> = {
  'cat-mail-co': { card: catMailCardUrl },
  heartopia: { card: heartopiaCardUrl },
  palia: { card: paliaCardUrl },
  'islanders-new-shores': { card: islandersCardUrl, peek: islandersCardPeekUrl },
  'shelve-the-potions': { card: shelvePotionsCardUrl, peek: shelvePotionsCardPeekUrl },
  'tailside-cozy-cafe-sim': { card: tailsideCardUrl, peek: tailsideCardPeekUrl },
  'vacation-cafe-simulator': { card: vacationCardUrl, peek: vacationCardPeekUrl },
  'winter-burrow': { card: winterBurrowCardUrl, peek: winterBurrowCardPeekUrl },
};

export function getGameImages(slug: string): GameImageSet | undefined {
  return GAME_IMAGES[slug];
}
