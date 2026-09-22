import './library-header.scss';

export function createLibraryHeader(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'library-header';

  const title = document.createElement('h1');
  title.className = 'library-header__title';
  title.textContent = 'Game Library';

  const subtitle = document.createElement('p');
  subtitle.className = 'library-header__subtitle';
  subtitle.textContent = 'Browse our collection of casual mini-games';

  section.append(title, subtitle);

  return section;
}
