import './user-avatar.scss';
import type { AppSession } from '../../app/session';
import { getInitials, getProfileName } from '../../shared/profile';

// Аватар авторизованного пользователя (шапка и мобильное меню): фото
// профиля, если оно есть и загрузилось; иначе инициалы; если и инициалов
// нет (имя без букв/цифр) -- общая иконка пользователя.

function createInitialsContent(name: string): HTMLSpanElement {
  const initials = getInitials(name);
  const content = document.createElement('span');

  if (initials) {
    content.className = 'user-avatar__initials';
    content.textContent = initials;
  } else {
    content.className = 'material-symbols-outlined user-avatar__fallback';
    content.translate = false;
    content.textContent = 'person';
  }

  return content;
}

export function createUserAvatar(session: AppSession, className = ''): HTMLSpanElement {
  const avatar = document.createElement('span');
  avatar.className = `user-avatar ${className}`.trim();
  avatar.setAttribute('aria-hidden', 'true');

  const name = getProfileName(session);
  const showInitials = (): void => {
    avatar.classList.remove('user-avatar--photo');
    avatar.replaceChildren(createInitialsContent(name));
  };

  if (!session.avatarUrl) {
    showInitials();
    return avatar;
  }

  const image = document.createElement('img');
  image.className = 'user-avatar__image';
  image.alt = '';
  image.referrerPolicy = 'no-referrer';
  image.addEventListener('error', showInitials, { once: true });
  image.src = session.avatarUrl;

  avatar.classList.add('user-avatar--photo');
  avatar.append(image);

  return avatar;
}

// Имя + аватар. Имя выводится только как текст (textContent), никогда
// как HTML.
export function createUserBadge(session: AppSession, className: string): HTMLDivElement {
  const badge = document.createElement('div');
  badge.className = className;

  const name = document.createElement('span');
  name.className = `${className}-name`;
  name.textContent = getProfileName(session);

  badge.append(name, createUserAvatar(session, `${className}-avatar`));

  return badge;
}
