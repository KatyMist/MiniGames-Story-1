import './new-games.scss';
import { createGameDetails } from '../game-details/gameDetails';
import { createEmptyState, createErrorBanner, createSkeleton } from '../feedback/feedback';
import { showSnackbar } from '../snackbar/snackbar';
import { fetchFeaturedGames, isAbortError, type GameSummary } from '../../shared/api';
import { formatCompactNumber } from '../../shared/format';
import { getGameImages } from '../../shared/gameImages';

interface GameCard {
  slug: string;
  title: string;
  // Обложки нет в проекте -> undefined, карточка рисует CSS-заглушку.
  imageUrl?: string;
  // Отдельная, заранее обрезанная по центру версия фото для самой узкой
  // ("peek") карточки. Причина не чисто эстетическая: у object-fit: cover
  // при таком соотношении сторон контейнера (узкая и высокая карточка)
  // и почти квадратного/широкого исходника браузер должен растянуть
  // картинку в ~7 раз по ширине, чтобы покрыть высоту — на таком
  // экстремальном масштабе Chromium иногда не дорезает скруглённый угол
  // до конца, и виден квадратный "хвостик" фото поверх рамки. Отдельная
  // картинка с тем же центральным кадром, но заранее обрезанная почти
  // до нужных пропорций, не требует такого масштабирования "на лету" —
  // тот же самый кроп, но без экстремального scale и без бага рендера.
  peekImageUrl?: string;
  rating: string;
  likes: string;
}

// Игры карусели приходят с бэкенда: GET /api/games?featured=true
// (порядок -- как в ответе API).
function toGameCard(game: GameSummary): GameCard {
  const images = getGameImages(game.slug);

  return {
    slug: game.slug,
    title: game.name,
    imageUrl: images?.card,
    peekImageUrl: images?.peek ?? images?.card,
    rating: game.rating.toFixed(1),
    likes: formatCompactNumber(game.likesCount),
  };
}

// Сколько карточек-скелетонов показывать, пока идёт запрос: с запасом на
// самую широкую (десктопную) раскладку из 5 видимых карточек.
const SKELETON_CARD_COUNT = 5;

// Ширины карточек по "расстоянию" от активной (0 — активная), сверены в
// Figma для каждого брейкпоинта (Carousel Track на home-mobile/-tablet/-desktop).
// Сами пиксельные значения — точные цифры из макета Figma (кадры 1920/768/375).
// Порог для 3-уровневой "десктопной" раскладки (816/288/120) намеренно ниже,
// чем буквально 1920px: обычный развёрнутый на весь экран браузер (в т.ч. на
// MacBook с масштабированием Retina) почти никогда не даёт window.innerWidth
// ровно 1920 — при точном совпадении с 1920 карусель откатывалась на
// планшетную раскладку (448/105) даже в полноэкранном десктопном окне.
// 1440px — это уже безусловно "десктопная" ширина экрана, поэтому раскладку
// включаем от неё, не трогая сами измеренные в Figma значения.
const MOBILE_WIDTH_SCALE: readonly number[] = [218, 56];

// Отступ между карточками — совпадает с gap: utils.space('1') на
// .new-games__rail (src/styles/tokens/_spacing.scss: '1' = 8px). Нужен в JS
// отдельно, чтобы считать сдвиг ленты (см. render()) по целевым ширинам, а
// не через чтение layout из DOM.
const RAIL_GAP_PX = 8;

// Порог свайпа в пикселях -- перетаскивание короче него считается кликом
// (см. handleCardOpen), длиннее -- сменой слайда.
const SWIPE_THRESHOLD_PX = 40;

// Автопрокрутка -- по заданию каждые 4 секунды.
const AUTOPLAY_INTERVAL_MS = 4000;

const WIDTH_SCALE_BY_BREAKPOINT: readonly { query: string; widths: readonly number[] }[] = [
  { query: '(min-width: 1440px)', widths: [816, 288, 120] },
  { query: '(min-width: 768px)', widths: [448, 105] },
];

function getActiveWidthScale(): readonly number[] {
  for (const { query, widths } of WIDTH_SCALE_BY_BREAKPOINT) {
    if (window.matchMedia(query).matches) {
      return widths;
    }
  }

  return MOBILE_WIDTH_SCALE;
}

function createIcon(name: 'star' | 'favorite', modifier: string): HTMLSpanElement {
  const icon = document.createElement('span');
  icon.className = `material-symbols-outlined new-games__icon ${modifier}`;
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = name;
  return icon;
}

function createCard(game: GameCard, onOpen: () => void): HTMLLIElement {
  const card = document.createElement('li');
  card.className = 'new-games__card';
  // Клик по карточке открывает диалог Game Details (контент там всегда
  // статичный -- см. Common Game Details Content Requirements в задании,
  // поэтому конкретная игра карточки на onOpen не влияет). role=button +
  // tabIndex/keydown -- та же карточка доступна и с клавиатуры (Enter/
  // Space), не только мышью/тачем.
  card.setAttribute('role', 'button');
  card.tabIndex = 0;
  card.setAttribute('aria-label', `View details for ${game.title}`);
  card.addEventListener('click', onOpen);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  });

  // Отдельная обёртка с overflow: hidden — картинка обрезается по своим
  // границам гарантированно, а не полагается на border-radius у самого
  // <img> (тот способ зависит от рендерера и не даёт железной гарантии,
  // что фото не вылезет за скруглённый угол рамки при анимации ширины).
  const imageClip = document.createElement('div');
  imageClip.className = 'new-games__image-clip';

  if (game.imageUrl) {
    const image = document.createElement('img');
    image.className = 'new-games__card-image';
    image.src = game.imageUrl;
    image.alt = game.title;
    image.loading = 'lazy';
    // Полный и peek-варианты URL держим на самом элементе — render() ниже
    // переключает src при входе/выходе карточки из состояния "peek".
    image.dataset.fullSrc = game.imageUrl;
    image.dataset.peekSrc = game.peekImageUrl ?? game.imageUrl;
    imageClip.append(image);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'new-games__card-image new-games__card-image--placeholder';
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', game.title);
    imageClip.append(placeholder);
  }

  const overlay = document.createElement('div');
  overlay.className = 'new-games__overlay';

  const title = document.createElement('h3');
  title.className = 'new-games__card-title';
  title.textContent = game.title;

  const meta = document.createElement('div');
  meta.className = 'new-games__card-meta';

  const rating = document.createElement('div');
  rating.className = 'new-games__card-rating';
  const ratingValue = document.createElement('span');
  ratingValue.className = 'new-games__card-value';
  ratingValue.textContent = game.rating;
  rating.append(createIcon('star', 'new-games__icon--star'), ratingValue);

  const likes = document.createElement('div');
  likes.className = 'new-games__card-likes';
  const likesValue = document.createElement('span');
  likesValue.className = 'new-games__card-value';
  likesValue.textContent = game.likes;
  likes.append(createIcon('favorite', 'new-games__icon--like'), likesValue);

  meta.append(rating, likes);
  overlay.append(title, meta);
  card.append(imageClip, overlay);

  return card;
}

// Карточка-скелетон той же формы, что и настоящая: пока идёт запрос,
// render() раскладывает их по тем же ширинам, и вёрстка секции не прыгает.
function createSkeletonCard(): HTMLLIElement {
  const card = document.createElement('li');
  card.className = 'new-games__card new-games__card--skeleton';
  card.setAttribute('aria-hidden', 'true');
  card.append(createSkeleton('new-games__skeleton'));

  return card;
}

function createArrowButton(direction: 'prev' | 'next'): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `new-games__arrow new-games__arrow--${direction}`;
  button.setAttribute('aria-label', direction === 'prev' ? 'Previous game' : 'Next game');

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined new-games__arrow-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = direction === 'prev' ? 'arrow_back' : 'arrow_forward';

  button.append(icon);
  return button;
}

export function createNewGames(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'new-games';
  section.setAttribute('aria-label', 'New games');

  const headerRow = document.createElement('div');
  headerRow.className = 'new-games__header';

  const titleGroup = document.createElement('div');
  titleGroup.className = 'new-games__title-group';

  const accent = document.createElement('span');
  accent.className = 'new-games__accent';
  accent.setAttribute('aria-hidden', 'true');

  const title = document.createElement('h2');
  title.className = 'new-games__title';
  title.textContent = 'New Games';

  titleGroup.append(accent, title);

  const arrows = document.createElement('div');
  arrows.className = 'new-games__arrows';
  const prevButton = createArrowButton('prev');
  const nextButton = createArrowButton('next');
  arrows.append(prevButton, nextButton);

  headerRow.append(titleGroup, arrows);

  const track = document.createElement('div');
  track.className = 'new-games__track';

  const rail = document.createElement('ul');
  rail.className = 'new-games__rail';

  // Диалог Game Details -- контент там всегда статичный ("Tukoni: Forest
  // Keepers", см. Common Game Details Content Requirements в задании),
  // поэтому один диалог на весь слайдер, а не по одному на карточку.
  const gameDetails = createGameDetails();

  // dragDistance живёт здесь (а не внутри обработчиков pointer-событий
  // ниже), чтобы handleCardOpen мог проверить её и НЕ открывать диалог
  // сразу после свайпа (иначе любой свайп по активной карточке ещё и
  // открывал бы диалог как "клик").
  let dragDistance = 0;

  function handleCardOpen(): void {
    if (Math.abs(dragDistance) > SWIPE_THRESHOLD_PX) {
      return;
    }
    gameDetails.open();
  }

  let cards: HTMLLIElement[] = [];
  track.append(rail);

  // Сюда выводится баннер ошибки или заглушка "нет данных" вместо ленты.
  const status = document.createElement('div');
  status.className = 'new-games__status';
  status.hidden = true;

  section.append(headerRow, status, track, gameDetails.element);

  // По умолчанию активна первая игра — так показано в макете (карточка
  // стоит вплотную к левому отступу секции, без "призрачного" пикового
  // соседа слева, которого физически не существует).
  let activeIndex = 0;

  function render(): void {
    const widthScale = getActiveWidthScale();

    // Значения в widthScale точны только при буквальной ширине эталонного кадра
    // Figma (1920 / 768 / 375 — см. комментарий у WIDTH_SCALE_BY_BREAKPOINT выше).
    // Внутри одного брейкпоинта реальное окно почти никогда не совпадает с этой
    // шириной точь-в-точь (например, 1338px — уже "планшетный" брейкпоинт, но
    // заметно шире буквальных 768px), и без масштабирования карточки оставались
    // фиксированного эталонного размера — вокруг ленты появлялись огромные
    // пустые поля по краям. Считаем, сколько карточек видно и какой суммарной
    // ширине по Figma они соответствуют, и растягиваем/сжимаем все видимые
    // карточки на один и тот же коэффициент, чтобы лента (карточки + фиксированные
    // отступы между ними) всегда точно заполняла ширину трека — сохраняя те же
    // самые пропорции, что и в макете.
    let visibleCount = 0;
    let referenceCardWidth = 0;

    for (const [index] of cards.entries()) {
      const distance = Math.abs(index - activeIndex);
      if (distance < widthScale.length) {
        visibleCount += 1;
        referenceCardWidth += widthScale[distance] ?? 0;
      }
    }

    const referenceGapWidth = Math.max(visibleCount - 1, 0) * RAIL_GAP_PX;
    // track.clientWidth ещё 0 при самом первом синхронном render() ниже —
    // секция в этот момент существует только в памяти и не вставлена в DOM
    // (main.ts вставляет её уже после того, как createNewGames() вернёт
    // значение). Без этой проверки availableCardWidth уходил в минус, а
    // scale — в отрицательное число, из-за чего браузер отклонял такое
    // значение width как невалидное CSS и карточки на миг оставались без
    // ширины вовсе. Настоящий размер придёт следующим же вызовом render()
    // из ResizeObserver сразу после монтирования.
    const availableCardWidth = Math.max(track.clientWidth - referenceGapWidth, 0);
    const scale =
      referenceCardWidth > 0 && track.clientWidth > 0 ? availableCardWidth / referenceCardWidth : 1;

    let cursor = 0;
    let activeCenter = 0;

    for (const [index, card] of cards.entries()) {
      const distance = Math.abs(index - activeIndex);
      const width = distance < widthScale.length ? (widthScale[distance] ?? 0) * scale : 0;

      card.style.width = `${width}px`;
      card.classList.toggle('new-games__card--collapsed', distance >= widthScale.length);
      card.classList.toggle('new-games__card--active', distance === 0);
      // Самая дальняя ("peek") карточка в Figma не показывает подпись —
      // её Overlay в Hug-режиме шире самой карточки, поэтому текст на
      // такой узкой карточке прячем совсем, а не обрезаем/переносим.
      const isPeek = distance >= widthScale.length - 1;
      card.classList.toggle('new-games__card--peek', isPeek);

      // На "peek"-ширине показываем заранее обрезанную картинку (см.
      // комментарий у peekImageUrl в GameCard) — избегаем экстремального
      // object-fit: cover масштабирования, из-за которого угол фото не
      // дорезался по скруглению рамки.
      const image = card.querySelector<HTMLImageElement>('img.new-games__card-image');
      if (image) {
        const nextSrc = isPeek ? image.dataset.peekSrc : image.dataset.fullSrc;
        if (nextSrc && image.getAttribute('src') !== nextSrc) {
          image.src = nextSrc;
        }
      }

      if (index > 0) {
        cursor += RAIL_GAP_PX;
      }

      if (index === activeIndex) {
        activeCenter = cursor + width / 2;
      }

      cursor += width;
    }

    // Активная карточка центрируется сдвигом всей ленты (rail), а не через
    // justify-content на треке. Считаем по целевым ширинам (widthScale), а
    // не через offsetLeft/offsetWidth: у карточек CSS-transition по width, и
    // синхронное чтение layout сразу после его смены отдаёт ещё не
    // анимированное (старое) значение — из-за этого центрирование сбивалось.
    const railTotalWidth = cursor;
    const centeredTranslateX = track.clientWidth / 2 - activeCenter;
    // У первой и последней игры нет соседа с одной из сторон, и "честное"
    // центрирование тянуло бы ленту так, что перед первой (или после
    // последней) карточкой появлялось пустое поле — которого нет ни у одного
    // реального пикового соседа. В макете первая/последняя карточка стоит
    // вплотную к отступу секции (как таблица Top Players ниже), поэтому
    // ограничиваем сдвиг: лента не может обнажить пустоту ни слева от первой
    // карточки, ни справа от последней.
    const minTranslateX = Math.min(track.clientWidth - railTotalWidth, 0);
    const translateX = Math.max(minTranslateX, Math.min(0, centeredTranslateX));
    rail.style.transform = `translateX(${translateX}px)`;
  }

  // Бесконечная прокрутка в обе стороны: с последней игры "Next" уходит на
  // первую и наоборот (по модулю длины списка) -- кнопки поэтому больше не
  // блокируются на краях (см. старую prevButton.disabled/nextButton.disabled
  // -- убраны). Визуально на самой первой/последней игре пикового соседа с
  // одной из сторон по-прежнему нет (см. комментарий про minTranslateX выше,
  // подтверждено Figma) -- бесконечность здесь именно в навигации, а не в
  // непрерывной ленте без начала/конца.
  function goToNext(): void {
    if (cards.length === 0) return;
    activeIndex = (activeIndex + 1) % cards.length;
    render();
  }

  function goToPrev(): void {
    if (cards.length === 0) return;
    activeIndex = (activeIndex - 1 + cards.length) % cards.length;
    render();
  }

  let autoplayTimer: ReturnType<typeof setInterval> | undefined;
  let isReady = false;

  function stopAutoplay(): void {
    if (autoplayTimer !== undefined) {
      clearInterval(autoplayTimer);
      autoplayTimer = undefined;
    }
  }

  function startAutoplay(): void {
    stopAutoplay();
    // Пока данные не загружены (скелетон/ошибка), лента не крутится.
    if (!isReady || cards.length < 2) return;
    autoplayTimer = setInterval(() => {
      // Секцию убрали со страницы (переход на другой маршрут) -- таймер
      // больше не нужен.
      if (!section.isConnected) {
        stopAutoplay();
        return;
      }
      goToNext();
    }, AUTOPLAY_INTERVAL_MS);
  }

  prevButton.addEventListener('click', () => {
    goToPrev();
    startAutoplay();
  });

  nextButton.addEventListener('click', () => {
    goToNext();
    startAutoplay();
  });

  // Свайп/перетаскивание -- на track (не на отдельных карточках), чтобы
  // драг стабильно ловился независимо от того, с какой видимой карточки
  // (активной или "peek") он начался. Pointer Events покрывают и тач, и
  // мышь одним и тем же кодом. dragDistance (объявлена выше, до карточек)
  // используется и здесь для определения свайпа, и в handleCardOpen -- чтобы
  // отличить "просто клик" от "клик как побочный эффект окончания свайпа".
  let isPointerDown = false;
  let pointerStartX = 0;

  track.addEventListener('pointerdown', (event) => {
    isPointerDown = true;
    pointerStartX = event.clientX;
    dragDistance = 0;
    // Пауза на нажатии -- по заданию.
    stopAutoplay();
  });

  track.addEventListener('pointermove', (event) => {
    if (!isPointerDown) {
      return;
    }
    dragDistance = event.clientX - pointerStartX;
  });

  function finishPointerInteraction(): void {
    if (!isPointerDown) {
      return;
    }
    isPointerDown = false;

    if (Math.abs(dragDistance) > SWIPE_THRESHOLD_PX) {
      if (dragDistance < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    // Возобновление на отпускании, с чистым (сброшенным) таймером -- по
    // заданию ("reset-on-swipe-after-press"): startAutoplay() ниже сама
    // сначала останавливает предыдущий интервал (см. stopAutoplay внутри),
    // так что таймер в любом случае стартует заново с нуля, а не
    // продолжает недосчитанный интервал.
    startAutoplay();
  }

  track.addEventListener('pointerup', finishPointerInteraction);
  track.addEventListener('pointercancel', finishPointerInteraction);
  track.addEventListener('pointerleave', finishPointerInteraction);

  // ResizeObserver реагирует и на изменение размера окна (ширина трека
  // меняется вместе с ним), и на сам факт появления трека в layout'е:
  // первый вызов колбэка приходит сразу после observe(), даже если размер
  // "не менялся" — это как раз тот момент, когда track ещё нет в DOM во
  // время самого первого render() ниже (main.ts вставляет секцию в DOM уже
  // после того, как createNewGames() вернёт значение), из-за чего
  // track.clientWidth на тот момент равен 0 и центрирование ленты по нему
  // посчиталось бы неверно.
  const resizeObserver = new ResizeObserver(() => {
    render();
  });
  resizeObserver.observe(track);

  function setCards(nextCards: HTMLLIElement[]): void {
    cards = nextCards;
    activeIndex = 0;
    rail.replaceChildren(...cards);
    render();
  }

  function setArrowsEnabled(enabled: boolean): void {
    prevButton.disabled = !enabled;
    nextButton.disabled = !enabled;
  }

  function showSkeleton(): void {
    isReady = false;
    stopAutoplay();
    setArrowsEnabled(false);
    status.hidden = true;
    status.replaceChildren();
    track.hidden = false;
    track.setAttribute('aria-busy', 'true');
    setCards(Array.from({ length: SKELETON_CARD_COUNT }, () => createSkeletonCard()));
  }

  function showStatus(content: HTMLElement): void {
    isReady = false;
    stopAutoplay();
    setArrowsEnabled(false);
    track.removeAttribute('aria-busy');
    track.hidden = true;
    setCards([]);
    status.replaceChildren(content);
    status.hidden = false;
  }

  let controller: AbortController | undefined;
  let hasFailed = false;

  async function load(): Promise<void> {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    showSkeleton();

    try {
      const response = await fetchFeaturedGames(signal);
      const games = response.data.map((game) => toGameCard(game));

      if (games.length === 0) {
        showStatus(createEmptyState('No new games yet', 'Featured games will appear here soon.'));
        return;
      }

      track.removeAttribute('aria-busy');
      isReady = true;
      setCards(games.map((game) => createCard(game, handleCardOpen)));
      setArrowsEnabled(games.length > 1);
      startAutoplay();

      if (hasFailed) {
        showSnackbar('New games loaded successfully.', { variant: 'success' });
      }
      hasFailed = false;
    } catch (error) {
      if (isAbortError(error)) return;

      hasFailed = true;
      showStatus(
        createErrorBanner("We couldn't load new games. Please try again.", () => {
          void load();
        }),
      );
      showSnackbar('Failed to load new games.', { variant: 'error' });
    }
  }

  void load();

  return section;
}
