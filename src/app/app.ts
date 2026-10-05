// Сборка приложения: страницы, шапка, диалоги и их синхронизация с URL
// и сессией. main.ts только подключает стили и вызывает mountApp().
import { createHeader } from '../components/header/header';
import { createHero } from '../components/hero/hero';
import { createNewGames } from '../components/new-games/newGames';
import { createLeaderboard } from '../components/leaderboard/leaderboard';
import { createGameDeveloper } from '../components/game-developer/gameDeveloper';
import { createFooter } from '../components/footer/footer';
import { createLibraryPage } from '../components/library-page/libraryPage';
import { createNotFoundPage } from '../components/not-found/notFound';
import { createAuthDialog, type AuthMode } from '../components/auth-dialog/authDialog';
import { createGameDetails } from '../components/game-details/gameDetails';
import {
  closeDialog,
  getRoute,
  startRouter,
  subscribe,
  updateQuery,
  type PageName,
  type RouteState,
} from './router';
import { isAuthDialogBlocked, openAuth } from './navigation';
import { signOutFromFirebase } from './firebase';
import { checkSession, endSession, initSession, subscribeSession } from './authStore';

function renderHomePage(main: HTMLElement): void {
  main.append(createHero(), createNewGames(), createLeaderboard(), createGameDeveloper());
}

function renderLibraryPage(main: HTMLElement): void {
  main.append(...createLibraryPage());
}

// Заголовок вкладки меняется вместе с маршрутом -- без этого document.title
// оставался бы статичным "MiniGames" и на /library, и на главной, что
// плохо и для вкладок браузера, и для скринридеров (заголовок документа --
// первое, что они озвучивают при переходе).
const DEFAULT_PAGE_TITLE = 'MiniGames';

const PAGE_TITLES: Readonly<Record<PageName, string>> = {
  home: DEFAULT_PAGE_TITLE,
  library: 'Game Library — MiniGames',
  'not-found': 'Page Not Found — MiniGames',
};

function isAuthMode(value: string | null): value is AuthMode {
  return value === 'login' || value === 'register';
}

export function mountApp(): void {
  // Сессия приложения проверяется до первого рендера: действующая
  // восстанавливается, просроченная или повреждённая сбрасывается в гостя
  // (с выходом из Firebase, чтобы его сохранённый вход не вернул юзера).
  initSession({ signOut: signOutFromFirebase });
  startRouter();

  const root = document.createElement('div');
  root.id = 'app';
  document.body.append(root);

  // Диалоги -- на уровне приложения: их состояние хранится в URL и должно
  // переживать пересоздание страницы/шапки при переходах.
  const authDialog = createAuthDialog({
    onDismiss: () => closeDialog('auth'),
    onModeChange: (mode) => updateQuery({ auth: mode }, { replace: true }),
    // После входа диалог закрывается тем же путём, что и крестиком: если
    // он перекрывал Game Details, тот вернётся уже в авторизованном режиме.
    onAuthenticated: () => closeDialog('auth'),
  });

  // Game Details: ?game=<slug> (например /library?category=arcade&page=2&game=palia).
  const gameDetails = createGameDetails({
    onDismiss: () => closeDialog('game'),
  });

  const headerOptions = {
    onAuthRequest: openAuth,
    onLogout: () => {
      void endSession('logout');
    },
  };
  let header = createHeader(headerOptions);

  function renderPage(route: RouteState): void {
    const main = document.createElement('main');

    document.title = PAGE_TITLES[route.page];

    switch (route.page) {
      case 'library': {
        renderLibraryPage(main);
        break;
      }
      case 'not-found': {
        main.append(createNotFoundPage());
        break;
      }
      default: {
        renderHomePage(main);
        break;
      }
    }

    header = createHeader(headerOptions);

    root.replaceChildren(header, main, createFooter(), gameDetails.element, authDialog.element);
  }

  function syncDialogs(route: RouteState): void {
    const game = route.query.get('game');
    const auth = route.query.get('auth');
    const authMode = isAuthMode(auth) ? auth : undefined;

    // Guard диалога авторизации для любого входа (кнопка, прямая ссылка,
    // Back/Forward): при активной сессии убираем из URL только параметр
    // auth (путь, остальные параметры и hash остаются) заменой текущей
    // записи истории -- без перезагрузки и лишнего шага "Назад".
    // updateQuery снова вызовет syncDialogs уже без auth.
    if (authMode && isAuthDialogBlocked()) {
      updateQuery({ auth: undefined }, { replace: true });
      return;
    }

    if (authMode) {
      authDialog.open(authMode);
    } else {
      authDialog.close();
    }

    // Если Auth открыт поверх Game Details (защищённое действие гостя или
    // после истечения сессии), Game Details не закрывается, а только
    // скрывается: его состояние и URL сохраняются, и после закрытия Auth
    // он появляется снова. Одновременно виден только один диалог.
    if (game) {
      gameDetails.open(game);
      gameDetails.setSuspended(Boolean(authMode));
    } else {
      gameDetails.close();
    }
  }

  // Страницу пересобираем только при смене пути; смена одних лишь
  // query-параметров (фильтры, диалоги) обрабатывается подписчиками самих
  // страниц/диалогов без перерисовки всего приложения.
  subscribe((route, previous) => {
    // Перед любой навигацией (страница или диалог) проверяем срок сессии:
    // если она истекла, переход продолжается уже в гостевом режиме.
    checkSession();

    if (!previous || previous.path !== route.path) {
      renderPage(route);
    }
    syncDialogs(route);
  });

  // Вход, выход и истечение сессии сразу меняют шапку и мобильное меню:
  // гостевые кнопки <-> профиль пользователя с Log Out.
  subscribeSession(() => {
    const nextHeader = createHeader(headerOptions);
    header.replaceWith(nextHeader);
    header = nextHeader;
  });

  const initialRoute = getRoute();
  renderPage(initialRoute);
  syncDialogs(initialRoute);
}
