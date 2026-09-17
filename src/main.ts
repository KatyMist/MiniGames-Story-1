import './styles/main.scss';
import { createHeader } from './components/header/header';
import { createHero } from './components/hero/hero';
import { createNewGames } from './components/new-games/newGames';
import { createLeaderboard } from './components/leaderboard/leaderboard';
import { createGameDeveloper } from './components/game-developer/gameDeveloper';
import { createFooter } from './components/footer/footer';

function renderApp(root: HTMLElement): void {
  root.append(
    createHeader(),
    createHero(),
    createNewGames(),
    createLeaderboard(),
    createGameDeveloper(),
    createFooter(),
  );
}

function mountApp(): void {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.append(root);
  renderApp(root);
}

document.addEventListener('DOMContentLoaded', mountApp);
