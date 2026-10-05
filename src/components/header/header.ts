import './header.scss';
import logoIconUrl from '../../assets/icons/logo.png';
import { createMobileMenu } from '../mobile-menu/mobileMenu';
import type { AuthMode } from '../auth-dialog/authDialog';
import { getSession } from '../../app/authStore';
import type { AppSession } from '../../app/session';
import { createUserBadge } from '../user-avatar/userAvatar';
import { getRoute, toHref } from '../../app/router';
import { NAV_LINKS, applyNavLinkTarget } from '../../shared/navLinks';

function createLogo(): HTMLAnchorElement {
  const logo = document.createElement('a');
  logo.className = 'header__logo';
  logo.href = toHref('/');
  logo.dataset.route = '/';
  logo.setAttribute('aria-label', 'MiniGames — home');

  const icon = document.createElement('img');
  icon.className = 'header__logo-icon';
  icon.src = logoIconUrl;
  icon.alt = '';
  icon.width = 32;
  icon.height = 32;

  const text = document.createElement('span');
  text.className = 'header__logo-text';
  text.textContent = 'MiniGames';

  logo.append(icon, text);

  return logo;
}

function createNavLinks(): HTMLUListElement {
  const list = document.createElement('ul');
  list.className = 'header__links';

  const currentPage = getRoute().page;

  for (const navLink of NAV_LINKS) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'header__link';
    applyNavLinkTarget(link, navLink);
    link.textContent = navLink.label;

    if (navLink.page && navLink.page === currentPage) {
      link.classList.add('header__link--active');
      link.setAttribute('aria-current', 'page');
    }

    item.append(link);
    list.append(item);
  }

  return list;
}

export interface HeaderOptions {
  onAuthRequest: (mode: AuthMode) => void;
  onLogout: () => void;
}

function createLogOutButton(onLogout: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn--outline';
  button.textContent = 'Log Out';
  button.addEventListener('click', onLogout);
  return button;
}

// Полный блок действий -- только для laptop+ (см. header.scss), где виден
// весь инлайн-навбар. Гость видит Log In + Sign Up, авторизованный -- имя
// с аватаром и Log Out (по референсу навбара). Состояние берётся из
// активной сессии приложения; при её смене шапка пересоздаётся (main.ts).
function createDesktopActions(
  session: AppSession | undefined,
  { onAuthRequest: openAuth, onLogout }: HeaderOptions,
): HTMLDivElement {
  const actions = document.createElement('div');
  actions.className = 'header__actions';

  if (session) {
    actions.append(createUserBadge(session, 'header__user'), createLogOutButton(onLogout));
    return actions;
  }

  const logIn = document.createElement('button');
  logIn.type = 'button';
  logIn.className = 'btn btn--outline';
  logIn.textContent = 'Log In';
  logIn.addEventListener('click', () => openAuth('login'));

  const signUp = document.createElement('button');
  signUp.type = 'button';
  signUp.className = 'btn btn--primary';
  signUp.textContent = 'Sign Up';
  signUp.addEventListener('click', () => openAuth('register'));

  actions.append(logIn, signUp);

  return actions;
}

// На планшете (768–1439) от полного набора действий остаётся только одна
// кнопка -- по референсу навбара, Log In там вообще не показывается
// (только Sign Up у гостя / Log Out у авторизованного), полный список
// доступен через бургер-меню.
function createTabletCta(
  session: AppSession | undefined,
  { onAuthRequest: openAuth, onLogout }: HeaderOptions,
): HTMLDivElement {
  const cta = document.createElement('div');
  cta.className = 'header__cta';

  if (session) {
    cta.append(createLogOutButton(onLogout));
    return cta;
  }

  const signUp = document.createElement('button');
  signUp.type = 'button';
  signUp.className = 'btn btn--primary';
  signUp.textContent = 'Sign Up';
  signUp.addEventListener('click', () => openAuth('register'));

  cta.append(signUp);

  return cta;
}

function createNav(session: AppSession | undefined, options: HeaderOptions): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'header__nav';
  nav.setAttribute('aria-label', 'Main navigation');
  nav.append(createNavLinks(), createDesktopActions(session, options));

  return nav;
}

function createMobileControls(
  burger: HTMLButtonElement,
  session: AppSession | undefined,
  options: HeaderOptions,
): HTMLDivElement {
  const controls = document.createElement('div');
  controls.className = 'header__mobile-controls';
  controls.append(createTabletCta(session, options), burger);

  return controls;
}

function createBurgerButton(): HTMLButtonElement {
  const burger = document.createElement('button');
  burger.type = 'button';
  burger.className = 'header__burger';
  burger.setAttribute('aria-label', 'Open menu');
  burger.setAttribute('aria-expanded', 'false');

  for (let i = 0; i < 3; i += 1) {
    const line = document.createElement('span');
    line.className = 'header__burger-line';
    burger.append(line);
  }

  return burger;
}

// Диалог авторизации живёт на уровне приложения (main.ts), а не внутри
// шапки: его открытое состояние хранится в URL (?auth=login|register), и
// шапка пересоздаётся при смене страницы -- диалог при этом не должен
// пропадать. Шапка лишь просит открыть его через onAuthRequest.
export function createHeader(options: HeaderOptions): HTMLElement {
  const session = getSession();
  const header = document.createElement('header');
  header.className = 'header';

  const inner = document.createElement('div');
  inner.className = 'header__inner';

  const burger = createBurgerButton();

  // Меню может закрыться не только кликом по бургеру (бэкдроп/Escape/клик
  // по ссылке/ресайз до laptop) -- onStateChange держит aria-состояние
  // бургера в актуальном виде при любом способе закрытия. Log In/Sign Up
  // внутри самого меню закрывают его и открывают диалог авторизации.
  const menu = createMobileMenu(
    NAV_LINKS,
    (isOpen) => {
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    },
    { session, ...options },
  );

  burger.addEventListener('click', () => {
    menu.toggle();
  });

  inner.append(
    createLogo(),
    createNav(session, options),
    createMobileControls(burger, session, options),
  );
  header.append(inner, menu.element);

  return header;
}
