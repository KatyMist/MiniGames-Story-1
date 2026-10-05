import { describe, expect, it } from 'vitest';
import {
  isAuthFormValid,
  validateAuthField,
  validateAuthForm,
  validateCommentText,
  validateConfirmPassword,
  validateEmail,
  validateLoginPassword,
  validateNewPassword,
  validateUsername,
} from './validation';

describe('validateEmail', () => {
  it('requires a value', () => {
    expect(validateEmail('')).toBe('Email is required.');
    expect(validateEmail('   ')).toBe('Email is required.');
  });

  it.each(['alex@minigames.com', 'a.b+tag@mail.co.uk', ' student@rs.school '])(
    'accepts %s',
    (email) => {
      expect(validateEmail(email)).toBe('');
    },
  );

  it.each(['alex', 'alex@', '@mail.com', 'alex@mail', 'alex@mail.c', 'al ex@mail.com'])(
    'rejects %s',
    (email) => {
      expect(validateEmail(email)).toMatch(/valid email/);
    },
  );
});

describe('validateUsername', () => {
  it('requires a value', () => {
    expect(validateUsername('')).toBe('Username is required.');
  });

  it('checks length of 2-30 characters', () => {
    expect(validateUsername('A')).toMatch(/2–30/);
    expect(validateUsername(`A${'b'.repeat(30)}`)).toMatch(/2–30/);
    expect(validateUsername(`A${'b'.repeat(29)}`)).toBe('');
  });

  it('must start with an uppercase English letter', () => {
    expect(validateUsername('forest')).toMatch(/start with an uppercase/);
    expect(validateUsername('1Forest')).toMatch(/start with an uppercase/);
    expect(validateUsername('Ёжик')).toMatch(/start with an uppercase/);
  });

  it('allows only English letters and digits', () => {
    expect(validateUsername('Forest_99')).toMatch(/only English letters and digits/);
    expect(validateUsername('Forest Dweller')).toMatch(/only English letters and digits/);
    expect(validateUsername('ForestDweller99')).toBe('');
  });
});

describe('validateNewPassword (registration)', () => {
  it('requires a value of at least 6 characters', () => {
    expect(validateNewPassword('')).toBe('Password is required.');
    expect(validateNewPassword('A1!a')).toMatch(/at least 6/);
  });

  it('requires uppercase letter, digit and special character', () => {
    expect(validateNewPassword('abc123!')).toMatch(/uppercase/);
    expect(validateNewPassword('Abcdef!')).toMatch(/digit/);
    expect(validateNewPassword('Abcdef1')).toMatch(/special character/);
    expect(validateNewPassword('Abcde1!')).toBe('');
  });

  it('rejects spaces and non-English letters', () => {
    expect(validateNewPassword('Abc de1!')).toMatch(/only English letters/);
    expect(validateNewPassword('Пароль1!A')).toMatch(/only English letters/);
  });
});

describe('validateLoginPassword', () => {
  it('only checks presence and minimum length', () => {
    expect(validateLoginPassword('')).toBe('Password is required.');
    expect(validateLoginPassword('12345')).toMatch(/at least 6/);
    // Правила сложности регистрации на логин не распространяются.
    expect(validateLoginPassword('simple')).toBe('');
  });
});

describe('validateConfirmPassword', () => {
  it('requires a value that exactly matches the password', () => {
    expect(validateConfirmPassword('', 'Abcde1!')).toBe('Please confirm your password.');
    expect(validateConfirmPassword('abcde1!', 'Abcde1!')).toBe('Passwords do not match.');
    expect(validateConfirmPassword('weak', 'weak')).toBe('');
  });
});

describe('validateAuthField / validateAuthForm', () => {
  const validRegistration = {
    username: 'Forest',
    email: 'student@rs.school',
    password: 'Abcde1!',
    confirmPassword: 'Abcde1!',
  };

  it('applies registration password rules only in register mode', () => {
    expect(validateAuthField('register', 'password', { password: 'simple' })).toMatch(/uppercase/);
    expect(validateAuthField('login', 'password', { password: 'simple' })).toBe('');
  });

  it('compares confirmation with the current password', () => {
    expect(
      validateAuthField('register', 'confirmPassword', {
        password: 'Abcde1!',
        confirmPassword: 'Abcde1?',
      }),
    ).toBe('Passwords do not match.');
  });

  it('returns errors only for invalid fields of the active mode', () => {
    expect(validateAuthForm('login', { email: 'bad', password: '123456' })).toEqual({
      email: expect.stringMatching(/valid email/) as string,
    });
    expect(validateAuthForm('register', { ...validRegistration, username: 'x' })).toHaveProperty(
      'username',
    );
  });

  it('treats a form as valid only when every field of the mode is valid', () => {
    expect(isAuthFormValid('register', validRegistration)).toBe(true);
    expect(isAuthFormValid('register', { ...validRegistration, confirmPassword: '' })).toBe(false);
    // Логину не нужны username и подтверждение.
    expect(isAuthFormValid('login', { email: 'student@rs.school', password: '123456' })).toBe(true);
    expect(isAuthFormValid('login', {})).toBe(false);
  });
});

describe('validateCommentText', () => {
  it('rejects empty text after trimming', () => {
    expect(validateCommentText('   ')).toBe('Comment cannot be empty.');
  });

  it('limits trimmed text to 500 characters', () => {
    expect(validateCommentText(`  ${'a'.repeat(500)}  `)).toBe('');
    expect(validateCommentText('a'.repeat(501))).toMatch(/500 characters or fewer/);
  });
});
