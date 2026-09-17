import './footer.scss';
import logoFooterUrl from '../../assets/icons/logo-footer.png';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const EXPLORE_LINKS: FooterLink[] = [
  { label: 'Home', href: '#' },
  { label: 'Library', href: '#' },
  { label: 'Categories', href: '#' },
  { label: 'Tournaments', href: '#' },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: 'About Us', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

const COLUMNS: FooterColumn[] = [
  { title: 'Explore', links: EXPLORE_LINKS },
  { title: 'Company', links: COMPANY_LINKS },
];

const SOCIAL_ICONS = ['share', 'chat', 'rss_feed'];

function createColumn(column: FooterColumn): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'footer__column';

  const title = document.createElement('h3');
  title.className = 'footer__column-title';
  title.textContent = column.title;

  wrapper.append(title);

  for (const link of column.links) {
    const anchor = document.createElement('a');
    anchor.className = 'footer__link';
    anchor.href = link.href;
    anchor.textContent = link.label;
    wrapper.append(anchor);
  }

  return wrapper;
}

function createSocialLink(iconName: string): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = 'footer__social-link';
  link.href = '#';
  link.setAttribute('aria-label', iconName);

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = iconName;

  link.append(icon);
  return link;
}

function createCommunityColumn(): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'footer__community';

  const title = document.createElement('h3');
  title.className = 'footer__column-title';
  title.textContent = 'Community';

  const social = document.createElement('div');
  social.className = 'footer__social';
  social.append(...SOCIAL_ICONS.map((iconName) => createSocialLink(iconName)));

  wrapper.append(title, social);
  return wrapper;
}

function createBrand(): HTMLDivElement {
  const brand = document.createElement('div');
  brand.className = 'footer__brand';

  const logo = document.createElement('div');
  logo.className = 'footer__logo';

  const logoIcon = document.createElement('img');
  logoIcon.className = 'footer__logo-icon';
  logoIcon.src = logoFooterUrl;
  logoIcon.alt = '';
  logoIcon.setAttribute('aria-hidden', 'true');

  logo.append(logoIcon, document.createTextNode('MiniGames'));

  const text = document.createElement('p');
  text.className = 'footer__text';
  text.textContent =
    'Take a short break and have fun. Hundreds of curated casual mini-games right in your web browser. No download required.';

  brand.append(logo, text);
  return brand;
}

function createBottom(): HTMLDivElement {
  const bottom = document.createElement('div');
  bottom.className = 'footer__bottom';

  const copyright = document.createElement('span');
  copyright.className = 'footer__bottom-item';
  copyright.textContent = `© ${new Date().getFullYear()} MiniGames. All rights reserved.`;

  const rsSchool = document.createElement('a');
  rsSchool.className = 'footer__bottom-item footer__link';
  rsSchool.href = 'https://rs.school/';

  const rsIcon = document.createElement('span');
  rsIcon.className = 'footer__bottom-icon';
  rsIcon.setAttribute('aria-hidden', 'true');
  rsIcon.textContent = 'RS';

  rsSchool.append(rsIcon, document.createTextNode('RS School'));

  const nickname = document.createElement('a');
  nickname.className = 'footer__bottom-item footer__link';
  nickname.href = 'https://github.com/KatyMist';

  const nicknameIcon = document.createElement('span');
  nicknameIcon.className = 'material-symbols-outlined footer__nickname-icon';
  nicknameIcon.setAttribute('aria-hidden', 'true');
  nicknameIcon.textContent = 'code';

  nickname.append(nicknameIcon, document.createTextNode('@KatyMist'));

  const designed = document.createElement('span');
  designed.className = 'footer__bottom-item';
  designed.textContent = 'Designed with love';

  bottom.append(copyright, rsSchool, nickname, designed);
  return bottom;
}

export function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const top = document.createElement('div');
  top.className = 'footer__top';

  const columns = document.createElement('div');
  columns.className = 'footer__columns';
  columns.append(...COLUMNS.map((column) => createColumn(column)), createCommunityColumn());

  top.append(createBrand(), columns);

  footer.append(top, createBottom());

  return footer;
}
