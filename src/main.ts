import './styles/main.scss';
import { createHeader } from './components/header/header';
import { createHero } from './components/hero/hero';
import { createNewGames } from './components/new-games/newGames';
import { createLeaderboard } from './components/leaderboard/leaderboard';

function renderApp(root: HTMLElement): void {
  root.append(createHeader(), createHero(), createNewGames(), createLeaderboard());
}

function mountApp(): void {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.append(root);
  renderApp(root);
}

document.addEventListener('DOMContentLoaded', mountApp);
