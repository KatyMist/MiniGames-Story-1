// Статичный контент диалога Game Details. По заданию (Common Game Details
// Content Requirements) содержимое диалога ВСЕГДА одно и то же -- карточка
// игры "Tukoni: Forest Keepers" -- независимо от того, с какой карточки
// библиотеки или слайда на главной был открыт диалог. Заголовок/рейтинг/
// лайки/жанр/игроки/длительность/цена/описание, записи Top Records и
// комментарии -- реконструированы из присланного текстового описания
// макета (без Dev Mode/точных чисел), поэтому это лучшее приближение, а
// не подтверждённые значения. Пришли точные данные/hex из Figma -- поправлю.
export interface TopRecord {
  rank: number;
  playerName: string;
  score: string;
}

export interface GameComment {
  id: string;
  author: string;
  text: string;
  likes: number;
}

export const GAME_DETAILS_CONTENT = {
  title: 'Tukoni: Forest Keepers',
  rating: 4.8,
  likes: '15.2K',
  genre: 'Puzzle',
  players: '1 Player',
  duration: '~3h',
  price: 'Free',
  description:
    'Guide a family of tiny forest spirits as they restore a wounded woodland, solve nature-powered puzzles, and befriend the creatures who live there. Cozy, slow-paced and beautifully hand-drawn.',
  topRecords: [
    { rank: 1, playerName: 'Mossy_Wanderer', score: '128,400' },
    { rank: 2, playerName: 'FernGully_Kay', score: '119,850' },
    { rank: 3, playerName: 'Acorn.exe', score: '104,220' },
  ] satisfies TopRecord[],
  comments: [
    {
      id: 'comment-1',
      author: 'Willow',
      text: 'The art style is so calming, I play this before bed every night.',
      likes: 24,
    },
    {
      id: 'comment-2',
      author: 'PineconeCollector',
      text: 'Took me a while to figure out the moss puzzle in chapter 2, but so worth it.',
      likes: 11,
    },
    {
      id: 'comment-3',
      author: 'RainyDayGamer',
      text: 'Would love a Switch version of this one day!',
      likes: 7,
    },
  ] satisfies GameComment[],
};
