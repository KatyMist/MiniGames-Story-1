import './game-developer.scss';
import deskUrl from '../../assets/images/game-developer-desk.png';

function createUploadIcon(): HTMLSpanElement {
  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined game-developer__cta-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = 'upload';

  return icon;
}

export function createGameDeveloper(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'game-developer';
  section.setAttribute('aria-label', 'Приглашение для разработчиков игр');

  const image = document.createElement('img');
  image.className = 'game-developer__image';
  image.src = deskUrl;
  image.alt = '';
  image.setAttribute('aria-hidden', 'true');
  image.loading = 'lazy';

  const card = document.createElement('div');
  card.className = 'game-developer__card';

  const title = document.createElement('h2');
  title.className = 'game-developer__title';
  title.textContent = 'Are You a Game Developer?';

  const text = document.createElement('p');
  text.className = 'game-developer__text';
  text.textContent =
    "Want to see your game on MiniGames? We're always looking for fun, engaging mini games to add to our platform. Submit your game and reach thousands of players!";

  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'btn btn--primary btn--lg game-developer__cta';
  cta.append(createUploadIcon(), document.createTextNode('Submit Form'));

  const contact = document.createElement('p');
  contact.className = 'game-developer__contact';
  contact.textContent = 'or contact us at developers@minigames.com';

  card.append(title, text, cta, contact);
  section.append(image, card);

  return section;
}
