import { describe, expect, it, vi } from 'vitest';
import { createMobileMenu } from './mobileMenu';
import { NAV_LINKS } from '../../shared/navLinks';
import { makeSession, query } from '../../test/helpers';

function mount(session = makeSession()) {
  const auth = { session, onAuthRequest: vi.fn(), onLogout: vi.fn() };
  const onStateChange = vi.fn();
  const menu = createMobileMenu(NAV_LINKS, onStateChange, auth);
  document.body.append(menu.element);
  menu.toggle();

  return { menu, auth, onStateChange };
}

describe('mobile menu', () => {
  it('shows the profile and closes before logging out', () => {
    const { menu, auth, onStateChange } = mount(makeSession({ displayName: 'Mira Stone' }));

    expect(query('.mobile-menu__user-name').textContent).toBe('Mira Stone');
    expect(query('.mobile-menu__user-avatar').textContent).toBe('MS');

    query<HTMLButtonElement>('.mobile-menu__actions .btn').click();

    expect(auth.onLogout).toHaveBeenCalledTimes(1);
    expect(menu.element.classList).not.toContain('mobile-menu--open');
    expect(onStateChange).toHaveBeenLastCalledWith(false);
  });

  it('offers log in and sign up to guests', () => {
    const auth = { session: undefined, onAuthRequest: vi.fn(), onLogout: vi.fn() };
    const menu = createMobileMenu(NAV_LINKS, undefined, auth);
    document.body.append(menu.element);
    const [logIn, signUp] = menu.element.querySelectorAll<HTMLButtonElement>(
      '.mobile-menu__actions .btn',
    );

    logIn?.click();
    signUp?.click();

    expect(auth.onAuthRequest.mock.calls).toEqual([['login'], ['register']]);
  });

  it('closes on escape, backdrop and close button', () => {
    const { menu } = mount();
    const isOpen = () => menu.element.classList.contains('mobile-menu--open');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(isOpen()).toBe(false);

    menu.toggle();
    query('.mobile-menu__backdrop').click();
    expect(isOpen()).toBe(false);

    menu.toggle();
    query<HTMLButtonElement>('.mobile-menu__close').click();
    expect(isOpen()).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('renders nav links with spa routes and placeholders', () => {
    mount();
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.mobile-menu__link')];

    expect(links.map((link) => link.dataset.route)).toEqual([
      '/',
      '/library',
      undefined,
      undefined,
    ]);
    expect(links[2]?.getAttribute('href')).toBe('#');
  });
});
