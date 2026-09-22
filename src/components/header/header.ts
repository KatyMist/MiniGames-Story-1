import './header.scss';
import logoIconUrl from '../../assets/icons/logo.png';
import { createMobileMenu } from '../mobile-menu/mobileMenu';
import { createAuthDialog, type AuthMode } from '../auth-dialog/authDialog';
import { CURRENT_USER } from '../../shared/authState';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', href: '#/' },
  { label: 'Library', href: '#/library' },
  { label: 'Tournaments', href: '#' },
  { label: 'Community', href: '#' },
];

function createLogo(): HTMLAnchorElement {
  const logo = document.createElement('a');
  logo.className = 'header__logo';
  logo.href = '/';
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

  const currentRoute = window.location.hash.slice(1) || '/';

  for (const { label, href } of NAV_LINKS) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'header__link';
    link.href = href;
    link.textContent = label;

    const isPlaceholder = href === '#';
    const linkRoute = href.startsWith('#') ? href.slice(1) || '/' : href;

    if (!isPlaceholder && linkRoute === currentRoute) {
      link.classList.add('header__link--active');
      link.setAttribute('aria-current', 'page');
    }

    item.append(link);
    list.append(item);
  }

  return list;
}

function createLogOutButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn--outline';
  button.textContent = 'Log Out';
  return button;
}

function createUserBadge(): HTMLDivElement {
  const user = document.createElement('div');
  user.className = 'header__user';

  const name = document.createElement('span');
  name.className = 'header__user-name';
  name.textContent = CURRENT_USER.name;

  const avatar = document.createElement('span');
  avatar.className = 'header__user-avatar';
  avatar.textContent = CURRENT_USER.initials;
  avatar.setAttribute('aria-hidden', 'true');

  user.append(name, avatar);

  return user;
}

// Полный блок действий -- только для laptop+ (см. header.scss), где виден
// весь инлайн-навбар. Гость видит Log In + Sign Up, авторизованный -- имя
// с аватаром и Log Out (по присланному референсу навбара). Log In/Sign Up
// открывают диалог авторизации (openAuth), Log Out пока никак не обработан
// -- при CURRENT_USER.isLoggedIn=false он и не рендерится (см. authState.ts).
function createDesktopActions(openAuth: (mode: AuthMode) => void): HTMLDivElement {
  const actions = document.createElement('div');
  actions.className = 'header__actions';

  if (CURRENT_USER.isLoggedIn) {
    actions.append(createUserBadge(), createLogOutButton());
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
function createTabletCta(openAuth: (mode: AuthMode) => void): HTMLDivElement {
  const cta = document.createElement('div');
  cta.className = 'header__cta';

  if (CURRENT_USER.isLoggedIn) {
    cta.append(createLogOutButton());
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

function createNav(openAuth: (mode: AuthMode) => void): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'header__nav';
  nav.setAttribute('aria-label', 'Main navigation');
  nav.append(createNavLinks(), createDesktopActions(openAuth));

  return nav;
}

function createMobileControls(
  burger: HTMLButtonElement,
  openAuth: (mode: AuthMode) => void,
): HTMLDivElement {
  const controls = document.createElement('div');
  controls.className = 'header__mobile-controls';
  controls.append(createTabletCta(openAuth), burger);

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

export function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'header';

  const inner = document.createElement('div');
  inner.className = 'header__inner';

  const burger = createBurgerButton();

  const authDialog = createAuthDialog();

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
    (mode) => authDialog.open(mode),
  );

  burger.addEventListener('click', () => {
    menu.toggle();
  });

  inner.append(
    createLogo(),
    createNav(authDialog.open),
    createMobileControls(burger, authDialog.open),
  );
  header.append(inner, menu.element, authDialog.element);

  return header;
}
