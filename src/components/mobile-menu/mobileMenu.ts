import './mobile-menu.scss';
import logoIconUrl from '../../assets/icons/logo.png';
import { CURRENT_USER } from '../../shared/authState';

interface MobileMenuLink {
  label: string;
  href: string;
}

interface MobileMenuHandle {
  element: HTMLElement;
  toggle: () => boolean;
  close: () => void;
}

function createLogo(): HTMLDivElement {
  const logo = document.createElement('div');
  logo.className = 'mobile-menu__logo';

  const icon = document.createElement('img');
  icon.className = 'mobile-menu__logo-icon';
  icon.src = logoIconUrl;
  icon.alt = '';
  icon.width = 32;
  icon.height = 32;

  const text = document.createElement('span');
  text.className = 'mobile-menu__logo-text';
  text.textContent = 'MiniGames';

  logo.append(icon, text);
  return logo;
}

function createCloseButton(onClose: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mobile-menu__close';
  button.setAttribute('aria-label', 'Закрыть меню');

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = 'close';

  button.append(icon);
  button.addEventListener('click', onClose);
  return button;
}

// Активной подсвечивается только реально существующий сейчас маршрут
// (Home '#' -> '/', Library '#/library'). Tournaments и Community пока
// тоже указывают на '#' (страниц ещё нет — см. header.ts), поэтому их
// специально не подсвечиваем, чтобы не заявлять их "текущими" наравне с
// Home.
function createNavLinks(
  links: readonly MobileMenuLink[],
  onNavigate: () => void,
): HTMLUListElement {
  const list = document.createElement('ul');
  list.className = 'mobile-menu__links';

  const currentRoute = window.location.hash.slice(1) || '/';

  for (const { label, href } of links) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'mobile-menu__link';
    link.href = href;
    link.textContent = label;

    const isPlaceholder = href === '#' && label !== 'Home';
    const linkRoute = href.startsWith('#') ? href.slice(1) || '/' : href;

    if (!isPlaceholder && linkRoute === currentRoute) {
      link.classList.add('mobile-menu__link--active');
    }

    link.addEventListener('click', onNavigate);
    item.append(link);
    list.append(item);
  }

  return list;
}

function createActions(): HTMLDivElement {
  const actions = document.createElement('div');
  actions.className = 'mobile-menu__actions';

  if (CURRENT_USER.isLoggedIn) {
    const logOut = document.createElement('button');
    logOut.type = 'button';
    logOut.className = 'btn btn--outline-light';
    logOut.textContent = 'Log Out';
    actions.append(logOut);
  } else {
    const logIn = document.createElement('button');
    logIn.type = 'button';
    logIn.className = 'btn btn--outline-light';
    logIn.textContent = 'Log In';

    const signUp = document.createElement('button');
    signUp.type = 'button';
    signUp.className = 'btn btn--primary';
    signUp.textContent = 'Sign Up';

    actions.append(logIn, signUp);
  }

  return actions;
}

export function createMobileMenu(
  links: readonly MobileMenuLink[],
  onStateChange?: (isOpen: boolean) => void,
): MobileMenuHandle {
  const root = document.createElement('div');
  root.className = 'mobile-menu';

  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-menu__backdrop';

  const panel = document.createElement('div');
  panel.className = 'mobile-menu__panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Мобильное меню');

  let isOpen = false;

  // Меню закрывается не только по клику на бургер (бэкдроп/Escape/клик по
  // ссылке/ресайз до планшета) -- onStateChange нужен, чтобы бургер в
  // header.ts мог держать aria-expanded/aria-label в актуальном состоянии
  // при любом способе закрытия, а не только при клике по самому бургеру.
  const close = (): void => {
    if (!isOpen) return;
    isOpen = false;
    root.classList.remove('mobile-menu--open');
    document.body.style.removeProperty('overflow');
    onStateChange?.(false);
  };

  const open = (): void => {
    if (isOpen) return;
    isOpen = true;
    root.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';
    onStateChange?.(true);
  };

  const toggle = (): boolean => {
    if (isOpen) {
      close();
    } else {
      open();
    }
    return isOpen;
  };

  const top = document.createElement('div');
  top.className = 'mobile-menu__top';
  top.append(createLogo(), createCloseButton(close));

  panel.append(top, createNavLinks(links, close), createActions());
  root.append(backdrop, panel);

  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  // Бургер (и само меню) работают на mobile и на tablet, скрываются только
  // от laptop (1440px) -- см. header.scss/mobile-menu.scss. Если меню
  // открыли и расширили окно до laptop, закрываем его, иначе оно останется
  // открытым без доступной кнопки-триггера.
  const laptopQuery = window.matchMedia('(min-width: 1440px)');
  laptopQuery.addEventListener('change', (event) => {
    if (event.matches) close();
  });

  return { element: root, toggle, close };
}
