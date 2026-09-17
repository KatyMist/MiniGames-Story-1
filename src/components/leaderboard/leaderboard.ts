import './leaderboard.scss';

type AvatarColor = 'primary' | 'mint' | 'sky' | 'pink' | 'lavender';

interface Player {
  rank: number;
  initials: string;
  avatarColor: AvatarColor;
  name: string;
  gamesPlayed: number;
  totalScore: string;
  streakDays: number;
  favoriteGame: string;
}

// Игроки и их порядок — как в макете Figma (Top Players This Week -> Table).
const PLAYERS: readonly Player[] = [
  {
    rank: 1,
    initials: 'AP',
    avatarColor: 'primary',
    name: 'Alex_Pro99',
    gamesPlayed: 142,
    totalScore: '94,250',
    streakDays: 12,
    favoriteGame: 'Heartopia',
  },
  {
    rank: 2,
    initials: 'CG',
    avatarColor: 'mint',
    name: 'CozyGamer_x',
    gamesPlayed: 118,
    totalScore: '81,400',
    streakDays: 8,
    favoriteGame: 'Cat Mail Co.',
  },
  {
    rank: 3,
    initials: 'MM',
    avatarColor: 'sky',
    name: 'MatchMaster',
    gamesPlayed: 98,
    totalScore: '72,110',
    streakDays: 5,
    favoriteGame: 'Tiny Glade',
  },
  {
    rank: 4,
    initials: 'BP',
    avatarColor: 'pink',
    name: 'BubblePop',
    gamesPlayed: 87,
    totalScore: '65,900',
    streakDays: 3,
    favoriteGame: 'Whisper of the House',
  },
  {
    rank: 5,
    initials: 'SG',
    avatarColor: 'lavender',
    name: 'SudokuGod',
    gamesPlayed: 74,
    totalScore: '59,320',
    streakDays: 2,
    favoriteGame: 'Cat Chess',
  },
];

// Заголовки колонок таблицы — RANK/PLAYER выровнены по левому краю,
// остальные — по центру (см. Figma: Table Header).
const COLUMNS: readonly { label: string; align: 'left' | 'center' }[] = [
  { label: 'Rank', align: 'left' },
  { label: 'Player', align: 'left' },
  { label: 'Games Played', align: 'center' },
  { label: 'Total Score', align: 'center' },
  { label: 'Streak', align: 'center' },
  { label: 'Favorite Game', align: 'center' },
];

function createHeadRow(): HTMLTableRowElement {
  const row = document.createElement('tr');

  for (const column of COLUMNS) {
    const th = document.createElement('th');
    th.scope = 'col';
    th.className = `leaderboard__heading leaderboard__heading--${column.align}`;
    th.textContent = column.label;
    row.append(th);
  }

  return row;
}

function createRow(player: Player): HTMLTableRowElement {
  const row = document.createElement('tr');
  row.className = 'leaderboard__row';

  const rankCell = document.createElement('td');
  rankCell.className = 'leaderboard__cell leaderboard__cell--left';
  const rankValue = document.createElement('span');
  rankValue.className = 'leaderboard__rank';
  rankValue.classList.toggle('leaderboard__rank--top', player.rank === 1);
  rankValue.textContent = `#${player.rank}`;
  rankCell.append(rankValue);

  const playerCell = document.createElement('td');
  playerCell.className = 'leaderboard__cell leaderboard__cell--left';
  const avatar = document.createElement('span');
  avatar.className = `leaderboard__avatar leaderboard__avatar--${player.avatarColor}`;
  avatar.textContent = player.initials;
  avatar.setAttribute('aria-hidden', 'true');
  const name = document.createElement('span');
  name.className = 'leaderboard__name';
  name.textContent = player.name;
  playerCell.append(avatar, name);

  const gamesCell = document.createElement('td');
  gamesCell.className = 'leaderboard__cell leaderboard__cell--center';
  gamesCell.textContent = String(player.gamesPlayed);

  const scoreCell = document.createElement('td');
  scoreCell.className = 'leaderboard__cell leaderboard__cell--center';
  scoreCell.textContent = player.totalScore;

  const streakCell = document.createElement('td');
  streakCell.className = 'leaderboard__cell leaderboard__cell--center';
  const streakWrap = document.createElement('span');
  streakWrap.className = 'leaderboard__streak';
  const fire = document.createElement('span');
  fire.className = 'leaderboard__streak-icon';
  fire.setAttribute('aria-hidden', 'true');
  fire.textContent = '\u{1F525}';
  const streakText = document.createElement('span');
  streakText.textContent = `${player.streakDays} days`;
  streakWrap.append(fire, streakText);
  streakCell.append(streakWrap);

  const favoriteCell = document.createElement('td');
  favoriteCell.className = 'leaderboard__cell leaderboard__cell--center';
  const badge = document.createElement('span');
  badge.className = 'leaderboard__badge';
  badge.textContent = player.favoriteGame;
  favoriteCell.append(badge);

  row.append(rankCell, playerCell, gamesCell, scoreCell, streakCell, favoriteCell);

  return row;
}

export function createLeaderboard(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'leaderboard';
  section.setAttribute('aria-label', 'Таблица лидеров');

  const header = document.createElement('div');
  header.className = 'leaderboard__header';

  const accent = document.createElement('span');
  accent.className = 'leaderboard__accent';
  accent.setAttribute('aria-hidden', 'true');

  const title = document.createElement('h2');
  title.className = 'leaderboard__title';
  title.textContent = 'Top Players This Week';

  header.append(accent, title);

  const wrapper = document.createElement('div');
  wrapper.className = 'leaderboard__table-wrapper';

  const table = document.createElement('table');
  table.className = 'leaderboard__table';

  const thead = document.createElement('thead');
  thead.append(createHeadRow());

  const tbody = document.createElement('tbody');
  tbody.append(...PLAYERS.map((player) => createRow(player)));

  table.append(thead, tbody);
  wrapper.append(table);
  section.append(header, wrapper);

  return section;
}
