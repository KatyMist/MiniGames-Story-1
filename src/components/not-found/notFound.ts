import './not-found.scss';
import { navigate } from '../../app/router';

// Страница 404 для любого неизвестного адреса (/unknown, /page/abc...).
// Шапка и подвал остаются стандартными -- их добавляет main.ts, как и для
// остальных страниц; здесь только основное содержимое.
export function createNotFoundPage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'not-found';
  section.setAttribute('aria-labelledby', 'not-found-title');

  const code = document.createElement('p');
  code.className = 'not-found__code';
  code.setAttribute('aria-hidden', 'true');
  code.textContent = '404';

  const title = document.createElement('h1');
  title.className = 'not-found__title';
  title.id = 'not-found-title';
  title.textContent = 'Page Not Found';

  const message = document.createElement('p');
  message.className = 'not-found__message';
  message.textContent =
    "Sorry, the page you requested doesn't exist. Check the URL or go back to the home page.";

  const path = document.createElement('p');
  path.className = 'not-found__path';
  path.textContent = window.location.pathname;

  // Возврат на главную -- SPA-переход без перезагрузки страницы.
  const homeButton = document.createElement('button');
  homeButton.type = 'button';
  homeButton.className = 'btn btn--primary btn--lg not-found__action';
  homeButton.textContent = 'Return to Home Page';
  homeButton.addEventListener('click', () => {
    navigate('/');
    window.scrollTo({ top: 0 });
  });

  section.append(code, title, message, path, homeButton);

  return section;
}
