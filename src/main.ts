import './styles/main.scss';
import { createHeader } from './components/header/header';

function renderApp(root: HTMLElement): void {
  root.append(createHeader());
}

function mountApp(): void {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.append(root);
  renderApp(root);
}

document.addEventListener('DOMContentLoaded', mountApp);
