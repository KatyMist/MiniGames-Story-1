import { describe, expect, it } from 'vitest';
import {
  FALLBACK_PROFILE_NAME,
  getAvatarLetter,
  getCommentAuthorName,
  getInitials,
  getProfileName,
} from './profile';

describe('getProfileName', () => {
  it('prefers the display name', () => {
    expect(getProfileName({ displayName: '  Forest Dweller ', email: 'x@y.z' })).toBe(
      'Forest Dweller',
    );
  });

  it('falls back to the email local part, then to a generic name', () => {
    expect(getProfileName({ displayName: ' ', email: 'student@rs.school' })).toBe('student');
    expect(getProfileName({ displayName: '', email: '@rs.school' })).toBe(FALLBACK_PROFILE_NAME);
  });
});

describe('getInitials', () => {
  it.each([
    ['Forest', 'F'],
    ['forest dweller', 'FD'],
    ['  John   Ronald Tolkien ', 'JR'],
    ['_alex 99lives', 'A9'],
    ['ёжик в тумане', 'ЁВ'],
    ['🙂', ''],
    ['', ''],
  ])('%s -> %s', (name, initials) => {
    expect(getInitials(name)).toBe(initials);
  });
});

describe('getCommentAuthorName', () => {
  it('uses a display name of 2-30 characters', () => {
    expect(getCommentAuthorName({ displayName: 'Forest', email: 'a@b.co' })).toBe('Forest');
  });

  it('falls back to a valid email local part when the name does not fit', () => {
    expect(getCommentAuthorName({ displayName: 'X', email: 'student@rs.school' })).toBe('student');
    expect(
      getCommentAuthorName({ displayName: 'N'.repeat(31), email: `${'s'.repeat(40)}@rs.school` }),
    ).toBe('s'.repeat(30));
  });

  it('uses a generic name when nothing fits', () => {
    expect(getCommentAuthorName({ displayName: '', email: 'a@b.co' })).toBe(FALLBACK_PROFILE_NAME);
  });
});

describe('getAvatarLetter', () => {
  it('returns the first non-whitespace character in uppercase', () => {
    expect(getAvatarLetter('  forest')).toBe('F');
    expect(getAvatarLetter('ёлка')).toBe('Ё');
    expect(getAvatarLetter('   ')).toBe('');
  });
});
