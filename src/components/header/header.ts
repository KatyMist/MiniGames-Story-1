import './header.scss';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', href: '#' },
  { label: 'Library', href: '#' },
  { label: 'Tournaments', href: '#' },
  { label: 'Community', href: '#' },
];

function createLogo(): HTMLAnchorElement {
  const logo = document.createElement('a');
  logo.className = 'header__logo';
  logo.href = '/';
  logo.setAttribute('aria-label', 'MiniGames — на главную');

  const icon = document.createElement('span');
  icon.className = 'header__logo-icon';
  icon.setAttribute('aria-hidden', 'true');

  const text = document.createElement('span');
  text.className = 'header__logo-text';
  text.textContent = 'MiniGames';

  logo.append(icon, text);

  return logo;
}

function createNavLinks(): HTMLUListElement {
  const list = document.createElement('ul');
  list.className = 'header__links';

  for (const { label, href } of NAV_LINKS) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'header__link';
    link.href = href;
    link.textContent = label;
    item.append(link);
    list.append(item);
  }

  return list;
}

function createActions(): HTMLDivElement {
  const actions = document.createElement('div');
  actions.className = 'header__actions';

  const logIn = document.createElement('button');
  logIn.type = 'button';
  logIn.className = 'btn btn--outline';
  logIn.textContent = 'Log In';

  const signUp = document.createElement('button');
  signUp.type = 'button';
  signUp.className = 'btn btn--primary';
  signUp.textContent = 'Sign Up';

  actions.append(logIn, signUp);

  return actions;
}

function createNav(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'header__nav';
  nav.setAttribute('aria-label', 'Основная навигация');
  nav.append(createNavLinks(), createActions());

  return nav;
}

function createBurgerButton(): HTMLButtonElement {
  const burger = document.createElement('button');
  burger.type = 'button';
  burger.className = 'header__burger';
  burger.setAttribute('aria-label', 'Открыть меню');
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
  inner.append(createLogo(), createNav(), createBurgerButton());

  header.append(inner);

  return header;
}
