import { toHref, type PageName } from '../app/router';

export interface NavLink {
  label: string;
  // Путь SPA-маршрута ('/', '/library'). Без route -- ссылка-заглушка на
  // ещё не существующую страницу (Tournaments/Community).
  route?: string;
  page?: PageName;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', route: '/', page: 'home' },
  { label: 'Library', route: '/library', page: 'library' },
  { label: 'Tournaments' },
  { label: 'Community' },
];

// Ссылки SPA -- обычные <a> с настоящим href (работают "открыть в новой
// вкладке" и копирование ссылки), а data-route перехватывает роутер и
// переходит без перезагрузки страницы.
export function applyNavLinkTarget(link: HTMLAnchorElement, navLink: NavLink): void {
  if (navLink.route) {
    link.href = toHref(navLink.route);
    link.dataset.route = navLink.route;
  } else {
    link.href = '#';
  }
}
