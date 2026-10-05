import { describe, expect, it } from 'vitest';
import { createUserAvatar, createUserBadge } from './userAvatar';
import { makeSession, query } from '../../test/helpers';

describe('user avatar', () => {
  it('shows the profile photo when available', () => {
    const avatar = createUserAvatar(makeSession({ avatarUrl: 'https://photo/me.png' }));

    expect(query<HTMLImageElement>('img', avatar).src).toBe('https://photo/me.png');
    expect(avatar.classList.contains('user-avatar--photo')).toBe(true);
  });

  it('falls back to initials when the photo fails to load', () => {
    const avatar = createUserAvatar(
      makeSession({ displayName: 'Forest Dweller', avatarUrl: 'https://broken' }),
    );

    query('img', avatar).dispatchEvent(new Event('error'));

    expect(avatar.querySelector('img')).toBeNull();
    expect(query('.user-avatar__initials', avatar).textContent).toBe('FD');
  });

  it('uses initials of the email local part when there is no name', () => {
    const avatar = createUserAvatar(makeSession({ displayName: '', email: 'mira@rs.school' }));

    expect(avatar.textContent).toBe('M');
  });

  it('shows a generic avatar when the name has no letters or digits', () => {
    const avatar = createUserAvatar(makeSession({ displayName: '★ ☆' }));

    expect(query('.user-avatar__fallback', avatar).textContent).toBe('person');
  });

  it('renders the profile name as text, never as html', () => {
    const badge = createUserBadge(
      makeSession({ displayName: '<img src=x onerror=alert(1)>' }),
      'header__user',
    );

    expect(query('.header__user-name', badge).textContent).toBe('<img src=x onerror=alert(1)>');
    expect(badge.querySelector('.header__user-name img')).toBeNull();
  });
});
