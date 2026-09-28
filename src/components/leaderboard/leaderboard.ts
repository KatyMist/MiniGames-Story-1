import './leaderboard.scss';

import { createEmptyState, createErrorBanner, createSkeleton } from '../feedback/feedback';
import { showSnackbar } from '../snackbar/snackbar';
import { fetchLeaderboard, isAbortError, type LeaderboardEntry } from '../../shared/api';
import { formatScore } from '../../shared/format';

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

// Цвета аватаров по порядку строк -- как в макете Figma (Top Players This
// Week -> Table): primary, mint, sky, pink, lavender.
const AVATAR_COLORS: readonly AvatarColor[] = ['primary', 'mint', 'sky', 'pink', 'lavender'];

const SKELETON_ROW_COUNT = 5;

// Инициалы из ника: заглавные буквы ("Alex_Pro99" -> "AP", "MatchMaster"
// -> "MM"), а если их меньше двух -- первые буквы ника.
function getInitials(name: string): string {
  const capitals = name.match(/[A-Z]/g) ?? [];

  if (capitals.length >= 2) {
    return capitals.slice(0, 2).join('');
  }

  const letters = name.replaceAll(/[^a-z]/gi, '');

  return (letters.slice(0, 2) || name.slice(0, 2)).toUpperCase();
}

// Данные таблицы приходят с бэкенда: GET /api/leaderboard.
function toPlayer(entry: LeaderboardEntry, index: number): Player {
  return {
    rank: entry.rank,
    initials: getInitials(entry.playerName),
    avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length] ?? 'primary',
    name: entry.playerName,
    gamesPlayed: entry.gamesPlayed,
    totalScore: formatScore(entry.totalScore),
    streakDays: entry.streakDays,
    favoriteGame: entry.favoriteGameName,
  };
}

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

// Строка-скелетон с теми же ячейками, что и у настоящей строки -- таблица
// во время загрузки сохраняет свою ширину и высоту.
function createSkeletonRow(): HTMLTableRowElement {
  const row = document.createElement('tr');
  row.className = 'leaderboard__row leaderboard__row--skeleton';
  row.setAttribute('aria-hidden', 'true');

  for (const column of COLUMNS) {
    const cell = document.createElement('td');
    cell.className = `leaderboard__cell leaderboard__cell--${column.align}`;
    cell.append(createSkeleton('leaderboard__skeleton'));
    row.append(cell);
  }

  return row;
}

export function createLeaderboard(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'leaderboard';
  section.setAttribute('aria-label', 'Leaderboard');

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

  table.append(thead, tbody);
  wrapper.append(table);

  // Баннер ошибки / заглушка "нет данных" -- вместо таблицы.
  const status = document.createElement('div');
  status.className = 'leaderboard__status';
  status.hidden = true;

  section.append(header, status, wrapper);

  function showStatus(content: HTMLElement): void {
    wrapper.hidden = true;
    table.removeAttribute('aria-busy');
    status.replaceChildren(content);
    status.hidden = false;
  }

  let controller: AbortController | undefined;
  let hasFailed = false;

  async function load(): Promise<void> {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    status.hidden = true;
    status.replaceChildren();
    wrapper.hidden = false;
    table.setAttribute('aria-busy', 'true');
    tbody.replaceChildren(...Array.from({ length: SKELETON_ROW_COUNT }, () => createSkeletonRow()));

    try {
      const entries = await fetchLeaderboard(signal);

      if (entries.length === 0) {
        showStatus(
          createEmptyState('No players yet', 'Play a few games to appear on the leaderboard.'),
        );
        return;
      }

      table.removeAttribute('aria-busy');
      tbody.replaceChildren(...entries.map((entry, index) => createRow(toPlayer(entry, index))));

      if (hasFailed) {
        showSnackbar('Leaderboard loaded successfully.', { variant: 'success' });
      }
      hasFailed = false;
    } catch (error) {
      if (isAbortError(error)) return;

      hasFailed = true;
      showStatus(
        createErrorBanner("We couldn't load the leaderboard. Please try again.", () => {
          void load();
        }),
      );
      showSnackbar('Failed to load the leaderboard.', { variant: 'error' });
    }
  }

  void load();

  return section;
}
