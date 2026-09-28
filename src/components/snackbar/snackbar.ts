import './snackbar.scss';

export type SnackbarVariant = 'success' | 'error' | 'info';

interface SnackbarOptions {
  variant?: SnackbarVariant;
  // Время показа до автоматического скрытия, мс.
  duration?: number;
}

const DEFAULT_DURATION_MS = 4000;
const LEAVE_ANIMATION_MS = 200;
const MAX_VISIBLE = 3;

const ICONS: Readonly<Record<SnackbarVariant, string>> = {
  success: 'check_circle',
  error: 'error',
  info: 'info',
};

let container: HTMLDivElement | undefined;

// Один общий контейнер на всё приложение. Он не перекрывает страницу
// (pointer-events: none, кликабельны только сами уведомления), поэтому
// Snackbar никогда не блокирует навигацию, прокрутку и другие элементы --
// в отличие от стандартных модальных окон браузера (в проекте их нет).
function getContainer(): HTMLDivElement {
  if (container?.isConnected) return container;

  container = document.createElement('div');
  container.className = 'snackbar-stack';
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-atomic', 'false');
  document.body.append(container);

  return container;
}

function removeSnackbar(element: HTMLElement): void {
  if (!element.isConnected || element.classList.contains('snackbar--leaving')) return;

  element.classList.add('snackbar--leaving');
  window.setTimeout(() => element.remove(), LEAVE_ANIMATION_MS);
}

export function showSnackbar(message: string, options: SnackbarOptions = {}): void {
  const variant = options.variant ?? 'info';
  const stack = getContainer();

  // Одинаковое сообщение, которое уже висит на экране, не дублируем
  // (например, несколько секций главной упали из-за одной и той же сети).
  for (const existing of stack.querySelectorAll<HTMLElement>('.snackbar')) {
    if (existing.dataset.message === message && !existing.classList.contains('snackbar--leaving')) {
      return;
    }
  }

  const snackbar = document.createElement('div');
  snackbar.className = `snackbar snackbar--${variant}`;
  snackbar.dataset.message = message;
  snackbar.setAttribute('role', variant === 'error' ? 'alert' : 'status');

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined snackbar__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = ICONS[variant];

  const text = document.createElement('p');
  text.className = 'snackbar__message';
  text.textContent = message;

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'snackbar__close';
  close.setAttribute('aria-label', 'Dismiss notification');

  const closeIcon = document.createElement('span');
  closeIcon.className = 'material-symbols-outlined';
  closeIcon.setAttribute('aria-hidden', 'true');
  closeIcon.textContent = 'close';
  close.append(closeIcon);

  snackbar.append(icon, text, close);
  stack.append(snackbar);

  const visible = stack.querySelectorAll<HTMLElement>('.snackbar:not(.snackbar--leaving)');
  if (visible.length > MAX_VISIBLE && visible[0]) {
    removeSnackbar(visible[0]);
  }

  const timer = window.setTimeout(
    () => removeSnackbar(snackbar),
    options.duration ?? DEFAULT_DURATION_MS,
  );

  close.addEventListener('click', () => {
    window.clearTimeout(timer);
    removeSnackbar(snackbar);
  });
}
