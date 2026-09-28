import './styles/main.scss';
import { createHeader } from './components/header/header';
import { createHero } from './components/hero/hero';
import { createNewGames } from './components/new-games/newGames';
import { createLeaderboard } from './components/leaderboard/leaderboard';
import { createGameDeveloper } from './components/game-developer/gameDeveloper';
import { createFooter } from './components/footer/footer';
import { createLibraryPage } from './components/library-page/libraryPage';
import { createAuthDialog, type AuthMode } from './components/auth-dialog/authDialog';
import {
  closeDialog,
  getRoute,
  startRouter,
  subscribe,
  updateQuery,
  type PageName,
  type RouteState,
} from './app/router';

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
  'not-found': DEFAULT_PAGE_TITLE,
};

function isAuthMode(value: string | null): value is AuthMode {
  return value === 'login' || value === 'register';
}

// Открытие диалога авторизации -- это смена URL (?auth=...), а сам диалог
// откроет подписчик роутера. Отдельная запись истории (dialog: true) --
// чтобы Back закрывал диалог, а не уводил со страницы.
function openAuth(mode: AuthMode): void {
  updateQuery({ auth: mode }, { dialog: true });
}

function mountApp(): void {
  startRouter();

  const root = document.createElement('div');
  root.id = 'app';
  document.body.append(root);

  // Диалоги -- на уровне приложения: их состояние хранится в URL и должно
  // переживать пересоздание страницы/шапки при переходах.
  const authDialog = createAuthDialog({
    onDismiss: () => closeDialog('auth'),
    onModeChange: (mode) => updateQuery({ auth: mode }, { replace: true }),
  });

  function renderPage(route: RouteState): void {
    const main = document.createElement('main');

    document.title = PAGE_TITLES[route.page];

    switch (route.page) {
      case 'library': {
        renderLibraryPage(main);
        break;
      }
      default: {
        renderHomePage(main);
        break;
      }
    }

    root.replaceChildren(createHeader(openAuth), main, createFooter(), authDialog.element);
  }

  function syncDialogs(route: RouteState): void {
    const auth = route.query.get('auth');

    if (isAuthMode(auth)) {
      authDialog.open(auth);
    } else {
      authDialog.close();
    }
  }

  // Страницу пересобираем только при смене пути; смена одних лишь
  // query-параметров (фильтры, диалоги) обрабатывается подписчиками самих
  // страниц/диалогов без перерисовки всего приложения.
  subscribe((route, previous) => {
    if (!previous || previous.path !== route.path) {
      renderPage(route);
    }
    syncDialogs(route);
  });

  const initialRoute = getRoute();
  renderPage(initialRoute);
  syncDialogs(initialRoute);
}

document.addEventListener('DOMContentLoaded', mountApp);
