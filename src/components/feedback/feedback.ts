import './feedback.scss';

// Общие состояния для всех секций, которые грузят данные из API:
// скелетон (запрос в процессе), баннер ошибки с повтором запроса и
// заглушка "данных нет". Используются одинаково на главной, в библиотеке
// и в диалоге Game Details.

interface BannerAction {
  label: string;
  onClick: () => void;
}

interface BannerOptions {
  title: string;
  message: string;
  icon: string;
  modifier: 'error' | 'empty' | 'not-found';
  action?: BannerAction;
}

function createBanner(options: BannerOptions): HTMLDivElement {
  const banner = document.createElement('div');
  banner.className = `state-banner state-banner--${options.modifier}`;
  banner.setAttribute('role', options.modifier === 'error' ? 'alert' : 'status');

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined state-banner__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = options.icon;

  const title = document.createElement('p');
  title.className = 'state-banner__title';
  title.textContent = options.title;

  const message = document.createElement('p');
  message.className = 'state-banner__message';
  message.textContent = options.message;

  banner.append(icon, title, message);

  if (options.action) {
    const { label, onClick } = options.action;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn--primary state-banner__action';
    button.textContent = label;
    button.addEventListener('click', onClick);
    banner.append(button);
  }

  return banner;
}

// Баннер ошибки: заменяет содержимое секции, кнопка повторяет упавший запрос.
export function createErrorBanner(message: string, onRetry: () => void): HTMLDivElement {
  return createBanner({
    title: 'Something went wrong',
    message,
    icon: 'cloud_off',
    modifier: 'error',
    action: { label: 'Try again', onClick: onRetry },
  });
}

// Запрос успешен, но данных нет.
export function createEmptyState(
  title: string,
  message: string,
  action?: BannerAction,
): HTMLDivElement {
  return createBanner({ title, message, icon: 'inbox', modifier: 'empty', action });
}

// Запрошенных данных не существует (неверные параметры в URL, несуществующая
// страница библиотеки или игра).
export function createNotFoundState(
  title: string,
  message: string,
  action?: BannerAction,
): HTMLDivElement {
  return createBanner({ title, message, icon: 'search_off', modifier: 'not-found', action });
}

// Анимированный блок-заглушка. Размеры задаёт класс конкретной секции,
// общий класс даёт только фон и "переливание".
export function createSkeleton(className: string, tagName = 'div'): HTMLElement {
  const element = document.createElement(tagName);
  element.className = `skeleton ${className}`;
  element.setAttribute('aria-hidden', 'true');

  return element;
}

// Обёртка для группы скелетонов: скринридер слышит одно "Loading...",
// а не набор пустых блоков.
export function createLoadingRegion(label: string, ...children: HTMLElement[]): HTMLDivElement {
  const region = document.createElement('div');
  region.className = 'loading-region';
  region.setAttribute('role', 'status');
  region.setAttribute('aria-busy', 'true');
  region.setAttribute('aria-label', label);
  region.append(...children);

  return region;
}
