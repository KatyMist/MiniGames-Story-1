// Картинки игр приходят из API путями относительно фронтенда:
//   cardImage: "/assets/images/games/<slug>-card.jpg"
//   heroImage: "/assets/images/games/<slug>-hero.jpg"
// Файлы лежат в public/assets/images/games (Vite копирует public как есть),
// поэтому путь из ответа API используется напрямую -- с учётом base
// (на GitHub Pages сайт живёт в подпапке /MiniGames-Story-1/).
// Если файла нет, UI показывает CSS-заглушку с названием игры.

export function resolveAssetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

// Путь к обложке карточки по slug -- тем же шаблоном, что и cardImage в API
// (нужен в Game Details: там API отдаёт только heroImage).
export function getCardImagePath(slug: string): string {
  return `/assets/images/games/${slug}-card.jpg`;
}

// Заранее обрезанная версия обложки для узкой "peek"-карточки карусели:
// "<slug>-card.jpg" -> "<slug>-card-peek.jpg".
export function getPeekImageUrl(cardUrl: string): string {
  return cardUrl.replace(/-card(\.\w+)$/, '-card-peek$1');
}

// Пробует url по очереди; если не загрузился ни один -- onFail.
export function setImageSources(
  image: HTMLImageElement,
  urls: readonly string[],
  onFail: () => void,
): void {
  let index = 0;

  const tryNext = (): void => {
    const url = urls[index];
    index += 1;

    if (url === undefined) {
      image.removeEventListener('error', tryNext);
      onFail();
      return;
    }

    image.src = url;
  };

  image.addEventListener('error', tryNext);
  tryNext();
}
