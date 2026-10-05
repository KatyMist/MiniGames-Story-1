// Правила валидации форм авторизации (Story 4, RSS-QS-4-1-1).
// Чистые функции без DOM: диалог авторизации вызывает их на input/blur,
// а тесты проверяют каждое правило отдельно.

export type AuthMode = 'login' | 'register';

export type AuthFieldName = 'username' | 'email' | 'password' | 'confirmPassword';

export type AuthFormValues = Partial<Record<AuthFieldName, string>>;

export type AuthFormErrors = Partial<Record<AuthFieldName, string>>;

export const AUTH_FORM_FIELDS: Readonly<Record<AuthMode, readonly AuthFieldName[]>> = {
  login: ['email', 'password'],
  register: ['username', 'email', 'password', 'confirmPassword'],
};

export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 6;

// Стандартный формат адреса: локальная часть, @, домен с точкой и зоной
// минимум из двух букв (alex@minigames.com, a.b+tag@mail.co.uk).
const EMAIL_PATTERN = /^[\w%+.-]+@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*\.[A-Za-z]{2,}$/;
const USERNAME_FIRST_CHAR_PATTERN = /^[A-Z]/;
const USERNAME_CHARS_PATTERN = /^[\dA-Za-z]+$/;
// Пароль: только английские буквы, цифры и спецсимволы -- то есть любые
// видимые ASCII-символы без пробела (коды 0x21-0x7E).
const PASSWORD_CHARS_PATTERN = /^[!-~]+$/;
const UPPERCASE_PATTERN = /[A-Z]/;
const DIGIT_PATTERN = /\d/;
const SPECIAL_CHAR_PATTERN = /[^\dA-Za-z]/;

export function validateEmail(value: string): string {
  const email = value.trim();

  if (email === '') return 'Email is required.';
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address, e.g. alex@minigames.com.';

  return '';
}

export function validateUsername(value: string): string {
  if (value === '') return 'Username is required.';

  if (value.length < USERNAME_MIN_LENGTH || value.length > USERNAME_MAX_LENGTH) {
    return `Username must be ${USERNAME_MIN_LENGTH}–${USERNAME_MAX_LENGTH} characters long.`;
  }

  if (!USERNAME_FIRST_CHAR_PATTERN.test(value)) {
    return 'Username must start with an uppercase English letter.';
  }

  if (!USERNAME_CHARS_PATTERN.test(value)) {
    return 'Username may contain only English letters and digits.';
  }

  return '';
}

// Пароль на форме регистрации: длина + "сложность".
export function validateNewPassword(value: string): string {
  if (value === '') return 'Password is required.';

  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`;
  }

  if (!PASSWORD_CHARS_PATTERN.test(value)) {
    return 'Password may contain only English letters, digits and special characters.';
  }

  if (!UPPERCASE_PATTERN.test(value)) return 'Password must contain an uppercase letter.';
  if (!DIGIT_PATTERN.test(value)) return 'Password must contain a digit.';
  if (!SPECIAL_CHAR_PATTERN.test(value)) return 'Password must contain a special character.';

  return '';
}

// Пароль на форме логина: только обязательность и длина -- правила
// сложности регистрации здесь не применяются.
export function validateLoginPassword(value: string): string {
  if (value === '') return 'Password is required.';

  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`;
  }

  return '';
}

// Подтверждение проверяется только на совпадение с паролем.
export function validateConfirmPassword(value: string, password: string): string {
  if (value === '') return 'Please confirm your password.';
  if (value !== password) return 'Passwords do not match.';

  return '';
}

export function validateAuthField(
  mode: AuthMode,
  field: AuthFieldName,
  values: AuthFormValues,
): string {
  const value = values[field] ?? '';

  switch (field) {
    case 'email': {
      return validateEmail(value);
    }
    case 'username': {
      return validateUsername(value);
    }
    case 'password': {
      return mode === 'register' ? validateNewPassword(value) : validateLoginPassword(value);
    }
    default: {
      return validateConfirmPassword(value, values.password ?? '');
    }
  }
}

// Ошибки всех полей текущего режима; валидные поля в результат не попадают.
export function validateAuthForm(mode: AuthMode, values: AuthFormValues): AuthFormErrors {
  const errors: AuthFormErrors = {};

  for (const field of AUTH_FORM_FIELDS[mode]) {
    const error = validateAuthField(mode, field, values);
    if (error) errors[field] = error;
  }

  return errors;
}

export function isAuthFormValid(mode: AuthMode, values: AuthFormValues): boolean {
  return Object.keys(validateAuthForm(mode, values)).length === 0;
}

export const COMMENT_TEXT_MAX_LENGTH = 500;

// Текст комментария: после trim -- от 1 до 500 символов.
export function validateCommentText(value: string): string {
  const text = value.trim();

  if (text === '') return 'Comment cannot be empty.';

  if (text.length > COMMENT_TEXT_MAX_LENGTH) {
    return `Comment must be ${COMMENT_TEXT_MAX_LENGTH} characters or fewer.`;
  }

  return '';
}
