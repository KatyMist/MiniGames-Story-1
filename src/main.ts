import './styles/main.scss';
import { createHeader } from './components/header/header';
import { createHero } from './components/hero/hero';
import { createGameDeveloper } from './components/game-developer/gameDeveloper';

function renderApp(root: HTMLElement): void {
  root.append(createHeader(), createHero(), createGameDeveloper());
}

function mountApp(): void {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.append(root);
  renderApp(root);
}

document.addEventListener('DOMContentLoaded', mountApp);
