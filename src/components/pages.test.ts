import { beforeEach, describe, expect, it } from 'vitest';
import { createHero } from './hero/hero';
import { createNotFoundPage } from './not-found/notFound';
import { createFooter } from './footer/footer';
import { query } from '../test/helpers';

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('static page sections', () => {
  it('hero navigates to the library', () => {
    document.body.append(createHero());

    query<HTMLButtonElement>('.hero__cta').click();

    expect(window.location.pathname).toBe('/library');
  });

  it('404 page shows the requested path and returns home', () => {
    window.history.replaceState({}, '', '/missing-page');
    document.body.append(createNotFoundPage());

    expect(query('.not-found__path').textContent).toBe('/missing-page');
    query<HTMLButtonElement>('.not-found__action').click();

    expect(window.location.pathname).toBe('/');
  });

  it('footer links to spa routes and shows the current year', () => {
    document.body.append(createFooter());

    const library = query<HTMLAnchorElement>('.footer__link[data-route="/library"]');
    expect(library.getAttribute('href')).toBe('/library');
    expect(query<HTMLAnchorElement>('a[href="https://github.com/KatyMist"]').textContent).toContain(
      '@KatyMist',
    );
    expect(query('.footer__bottom').textContent).toContain(`© ${new Date().getFullYear()}`);
  });
});
