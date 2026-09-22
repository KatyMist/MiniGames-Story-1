import './styles/main.scss';
import { createHeader } from './components/header/header';
import { createHero } from './components/hero/hero';
import { createNewGames } from './components/new-games/newGames';
import { createLeaderboard } from './components/leaderboard/leaderboard';
import { createGameDeveloper } from './components/game-developer/gameDeveloper';
import { createFooter } from './components/footer/footer';
import { createLibraryPage } from './components/library-page/libraryPage';

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

const PAGE_TITLES: Readonly<Record<string, string>> = {
  '/': DEFAULT_PAGE_TITLE,
  '/library': 'Game Library — MiniGames',
};

function renderApp(root: HTMLElement): void {
  root.replaceChildren();

  const main = document.createElement('main');
  const route = window.location.hash.slice(1) || '/';

  document.title = PAGE_TITLES[route] ?? DEFAULT_PAGE_TITLE;

  switch (route) {
    case '/library': {
      renderLibraryPage(main);
      break;
    }
    default: {
      renderHomePage(main);
      break;
    }
  }

  root.append(createHeader(), main, createFooter());
}

function mountApp(): void {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.append(root);
  renderApp(root);

  window.addEventListener('hashchange', () => {
    renderApp(root);
  });
}

document.addEventListener('DOMContentLoaded', mountApp);
