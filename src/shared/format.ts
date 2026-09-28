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

const UNITS: readonly { seconds: number; label: string }[] = [
  { seconds: YEAR, label: 'year' },
  { seconds: MONTH, label: 'month' },
  { seconds: WEEK, label: 'week' },
  { seconds: DAY, label: 'day' },
  { seconds: HOUR, label: 'hour' },
  { seconds: MINUTE, label: 'min' },
];

// ISO-время -> "just now" / "5 min ago" / "2 hours ago" / "3 days ago" /
// "1 week ago" / "2 months ago" / "1 year ago".
export function formatRelativeTime(isoDate: string, now: number = Date.now()): string {
  const timestamp = Date.parse(isoDate);

  if (Number.isNaN(timestamp)) return '';

  const elapsed = Math.max(0, Math.floor((now - timestamp) / 1000));

  for (const unit of UNITS) {
    if (elapsed >= unit.seconds) {
      const amount = Math.floor(elapsed / unit.seconds);
      const label = unit.label === 'min' || amount === 1 ? unit.label : `${unit.label}s`;

      return `${amount} ${label} ago`;
    }
  }

  return 'just now';
}

// "puzzle" -> "Puzzle" (подпись бейджа категории на карточке).
export function formatCategoryLabel(slug: string): string {
  return slug ? `${slug.charAt(0).toUpperCase()}${slug.slice(1)}` : slug;
}
