import './styles/main.scss';

import { createHeader } from './components/header/header';
import { createHero } from './components/hero/hero';
import { createFooter } from './components/footer/footer';
import { createLibraryHeader } from './components/library-header/libraryHeader';
import { createLibraryFilters } from './components/library-filters/libraryFilters';

function renderHomePage(): HTMLElement[] {
  return [createHero()];
}

function renderLibraryPage(): HTMLElement[] {
  return [createLibraryHeader(), createLibraryFilters()];
}

function renderApp(root: HTMLElement): void {
  root.replaceChildren();

  const main = document.createElement('main');
  const route = window.location.hash.slice(1) || '/';

  switch (route) {
    case '/library': {
      main.append(...renderLibraryPage());
      break;
    }

    default: {
      main.append(...renderHomePage());
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
