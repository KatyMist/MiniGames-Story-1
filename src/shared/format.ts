// Форматирование чисел и дат из API для отображения в UI.

// 38200 -> "38.2K", 1250000 -> "1.3M", 950 -> "950" (как в макете: "28.7K").
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${trimZero((value / 1_000_000).toFixed(1))}M`;
  }

  if (value >= 1000) {
    return `${trimZero((value / 1000).toFixed(1))}K`;
  }

  return String(value);
}

function trimZero(value: string): string {
  return value.endsWith('.0') ? value.slice(0, -2) : value;
}

// 94250 -> "94,250"
export function formatScore(value: number): string {
  return value.toLocaleString('en-US');
}

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

function plural(amount: number, unit: string): string {
  return `${amount} ${unit}${amount === 1 ? '' : 's'} ago`;
}

// ISO-время -> относительное время по диапазонам из задания:
// < 1 мин -- "just now"; 1-59 мин -- "X min ago"; 1-23 ч -- "X hour(s) ago";
// 1-6 дн -- "X day(s) ago"; 1-3 нед -- "X week(s) ago";
// 1-11 мес -- "X month(s) ago"; от 1 года -- "X year(s) ago".
export function formatRelativeTime(isoDate: string, now: number = Date.now()): string {
  const timestamp = Date.parse(isoDate);

  if (Number.isNaN(timestamp)) return '';

  const elapsed = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (elapsed < MINUTE) return 'just now';
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)} min ago`;
  if (elapsed < DAY) return plural(Math.floor(elapsed / HOUR), 'hour');
  if (elapsed < WEEK) return plural(Math.floor(elapsed / DAY), 'day');
  // Недели -- только 1-3; с 28-го дня уже "1 month ago".
  if (elapsed < 4 * WEEK) return plural(Math.floor(elapsed / WEEK), 'week');
  if (elapsed < YEAR)
    return plural(Math.min(Math.max(Math.floor(elapsed / MONTH), 1), 11), 'month');

  return plural(Math.floor(elapsed / YEAR), 'year');
}

// "puzzle" -> "Puzzle" (подпись бейджа категории на карточке).
export function formatCategoryLabel(slug: string): string {
  return slug ? `${slug.charAt(0).toUpperCase()}${slug.slice(1)}` : slug;
}
