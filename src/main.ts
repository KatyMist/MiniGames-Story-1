import './styles/main.scss';

function renderApp(root: HTMLElement): void {
  const heading = document.createElement('h1');
  heading.textContent = 'MiniGames';
  root.append(heading);
}

function mountApp(): void {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.append(root);
  renderApp(root);
}

document.addEventListener('DOMContentLoaded', mountApp);
