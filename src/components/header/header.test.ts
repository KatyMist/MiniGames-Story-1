import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createHeader } from './header';
import { checkSession } from '../../app/authStore';
import { makeSession, query, storeSession } from '../../test/helpers';

function mount() {
  const options = { onAuthRequest: vi.fn(), onLogout: vi.fn() };
  const header = createHeader(options);
  document.body.append(header);

  return { header, options };
}

beforeEach(() => {
  window.history.replaceState({}, '', '/library');
  checkSession();
});

describe('header in guest mode', () => {
  it('shows log in and sign up controls that open the auth dialog', () => {
    const { header, options } = mount();
    const buttons = [...header.querySelectorAll<HTMLButtonElement>('.header__actions button')];

    expect(buttons.map((button) => button.textContent)).toEqual(['Log In', 'Sign Up']);
    buttons[0]?.click();
    buttons[1]?.click();
    query<HTMLButtonElement>('.header__cta button', header).click();

    expect(options.onAuthRequest.mock.calls).toEqual([['login'], ['register'], ['register']]);
    expect(header.querySelector('.header__user')).toBeNull();
  });

  it('highlights the current page link', () => {
    const { header } = mount();

    expect(query('.header__link--active', header).textContent).toBe('Library');
  });
});

describe('header in authenticated mode', () => {
  it('replaces guest controls with the profile and log out', () => {
    storeSession(makeSession({ displayName: 'Forest Dweller' }));
    checkSession();
    const { header, options } = mount();

    expect(query('.header__user-name', header).textContent).toBe('Forest Dweller');
    expect(query('.header__user-avatar', header).textContent).toBe('FD');
    expect(header.textContent).not.toContain('Sign Up');

    query<HTMLButtonElement>('.header__actions .btn', header).click();
    query<HTMLButtonElement>('.header__cta .btn', header).click();
    expect(options.onLogout).toHaveBeenCalledTimes(2);
  });

  it('toggles the mobile menu with the burger and keeps aria state in sync', () => {
    const { header } = mount();
    const burger = query<HTMLButtonElement>('.header__burger', header);

    burger.click();
    expect(burger.getAttribute('aria-expanded')).toBe('true');
    expect(query('.mobile-menu', header).classList).toContain('mobile-menu--open');

    burger.click();
    expect(burger.getAttribute('aria-expanded')).toBe('false');
  });
});
