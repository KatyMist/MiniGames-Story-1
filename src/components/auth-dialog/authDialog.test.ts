import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createAuthDialog, type AuthDialogOptions } from './authDialog';
import {
  createDeferred,
  flushPromises,
  getSnackbarMessages,
  makeSession,
  query,
  typeInto,
} from '../../test/helpers';
import type { AppSession } from '../../app/session';

const actions = vi.hoisted(() => ({
  loginWithEmail: vi.fn(),
  registerAccount: vi.fn(),
  loginWithGoogle: vi.fn(),
}));

vi.mock('../../app/authActions', () => actions);

function setup(mode: 'login' | 'register' = 'login', options: AuthDialogOptions = {}) {
  const handlers = {
    onDismiss: vi.fn(),
    onModeChange: vi.fn(),
    onAuthenticated: vi.fn(),
    ...options,
  };
  const dialog = createAuthDialog(handlers);
  document.body.append(dialog.element);
  dialog.open(mode);

  const input = (name: string) => query<HTMLInputElement>(`input[name="${name}"]`, dialog.element);
  const submit = () => query<HTMLButtonElement>('.auth-dialog__submit', dialog.element);
  const errorOf = (name: string) => query(`#${input(name).id}-error`, dialog.element).textContent;

  return { dialog, handlers, input, submit, errorOf };
}

function fillLogin(ui: ReturnType<typeof setup>) {
  typeInto(ui.input('email'), 'student@rs.school');
  typeInto(ui.input('password'), 'secret1');
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('real-time validation', () => {
  it('starts without errors and with a disabled submit button', () => {
    const ui = setup();

    expect(ui.errorOf('email')).toBe('');
    expect(ui.submit().disabled).toBe(true);
  });

  it('shows and clears inline errors while typing', () => {
    const ui = setup();

    typeInto(ui.input('email'), 'student@');
    expect(ui.errorOf('email')).toMatch(/valid email/);
    expect(ui.input('email').getAttribute('aria-invalid')).toBe('true');

    typeInto(ui.input('email'), 'student@rs.school');
    expect(ui.errorOf('email')).toBe('');
    expect(ui.input('email').getAttribute('aria-invalid')).toBe('false');
  });

  it('validates a field when the user leaves it', () => {
    const ui = setup();

    ui.input('password').dispatchEvent(new Event('blur'));

    expect(ui.errorOf('password')).toBe('Password is required.');
  });

  it('enables submit only when all login fields are valid', () => {
    const ui = setup();

    typeInto(ui.input('email'), 'student@rs.school');
    expect(ui.submit().disabled).toBe(true);

    typeInto(ui.input('password'), 'secret1');
    expect(ui.submit().disabled).toBe(false);
  });

  it('revalidates the confirmation when the password changes', () => {
    const ui = setup('register');

    typeInto(ui.input('username'), 'Forest');
    typeInto(ui.input('email'), 'student@rs.school');
    typeInto(ui.input('password'), 'Abcde1!');
    typeInto(ui.input('confirmPassword'), 'Abcde1!');
    expect(ui.submit().disabled).toBe(false);

    typeInto(ui.input('password'), 'Abcde2!');
    expect(ui.errorOf('confirmPassword')).toBe('Passwords do not match.');
    expect(ui.submit().disabled).toBe(true);
  });

  it('clears fields and errors when switching between login and register', () => {
    const ui = setup();
    typeInto(ui.input('email'), 'bad');

    query<HTMLButtonElement>('#auth-dialog-tab-register').click();
    expect(ui.handlers.onModeChange).toHaveBeenCalledWith('register');
    expect(ui.input('username').value).toBe('');

    query<HTMLButtonElement>('.auth-dialog__switch-link').click();
    expect(ui.handlers.onModeChange).toHaveBeenLastCalledWith('login');
    expect(ui.input('email').value).toBe('');
    expect(ui.errorOf('email')).toBe('');
  });

  it('highlights every error on submit attempt and sends nothing', () => {
    const ui = setup('register');

    query<HTMLFormElement>('form').dispatchEvent(new Event('submit', { cancelable: true }));

    expect(ui.errorOf('username')).toBe('Username is required.');
    expect(ui.errorOf('confirmPassword')).toBe('Please confirm your password.');
    expect(actions.registerAccount).not.toHaveBeenCalled();
  });

  it('toggles password visibility on the login form', () => {
    const ui = setup();
    const toggle = query<HTMLButtonElement>('.auth-dialog__input-toggle');

    toggle.click();
    expect(ui.input('password').type).toBe('text');
    toggle.click();
    expect(ui.input('password').type).toBe('password');
  });
});

describe('email/password authentication', () => {
  it('locks every control while pending and keeps the dialog open', async () => {
    const request = createDeferred<AppSession>();
    actions.loginWithEmail.mockReturnValue(request.promise);
    const ui = setup();
    fillLogin(ui);

    ui.submit().click();

    expect(actions.loginWithEmail).toHaveBeenCalledWith('student@rs.school', 'secret1');
    const controls = ui.dialog.element.querySelectorAll<HTMLInputElement | HTMLButtonElement>(
      'input, button',
    );
    expect([...controls].every((control) => control.disabled)).toBe(true);
    expect(ui.submit().textContent).toMatch(/Logging in/);

    // Ни Escape, ни бэкдроп, ни крестик не закрывают диалог.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    query('.auth-dialog__backdrop').click();
    query<HTMLButtonElement>('.auth-dialog__close').click();
    expect(ui.handlers.onDismiss).not.toHaveBeenCalled();

    // Повторная отправка во время запроса невозможна.
    query<HTMLFormElement>('form').dispatchEvent(new Event('submit', { cancelable: true }));
    expect(actions.loginWithEmail).toHaveBeenCalledTimes(1);

    request.resolve(makeSession({ displayName: 'Forest' }));
    await flushPromises();

    expect(ui.handlers.onAuthenticated).toHaveBeenCalledTimes(1);
    expect(getSnackbarMessages()).toContain('Welcome, Forest!');
    expect(ui.submit().textContent).toBe('Login');
  });

  it('unlocks the form and shows the error on failure', async () => {
    actions.loginWithEmail.mockRejectedValue({ code: 'auth/invalid-credential' });
    const ui = setup();
    fillLogin(ui);

    ui.submit().click();
    await flushPromises();

    expect(ui.handlers.onAuthenticated).not.toHaveBeenCalled();
    expect(query('.auth-dialog__form-error').textContent).toBe('Incorrect email or password.');
    expect(getSnackbarMessages()).toContain('Incorrect email or password.');
    expect(ui.input('email').disabled).toBe(false);
    expect(ui.submit().disabled).toBe(false);

    // Можно повторить попытку.
    actions.loginWithEmail.mockResolvedValue(makeSession());
    ui.submit().click();
    await flushPromises();
    expect(ui.handlers.onAuthenticated).toHaveBeenCalledTimes(1);
  });

  it('registers with username, email and password', async () => {
    actions.registerAccount.mockResolvedValue(makeSession({ displayName: 'Forest' }));
    const ui = setup('register');
    typeInto(ui.input('username'), 'Forest');
    typeInto(ui.input('email'), 'student@rs.school');
    typeInto(ui.input('password'), 'Abcde1!');
    typeInto(ui.input('confirmPassword'), 'Abcde1!');

    ui.submit().click();
    await flushPromises();

    expect(actions.registerAccount).toHaveBeenCalledWith('Forest', 'student@rs.school', 'Abcde1!');
    expect(ui.handlers.onAuthenticated).toHaveBeenCalled();
  });

  it('does not report success to the owner if the dialog was closed meanwhile', async () => {
    const request = createDeferred<AppSession>();
    actions.loginWithEmail.mockReturnValue(request.promise);
    const ui = setup();
    fillLogin(ui);

    ui.submit().click();
    ui.dialog.close();
    request.resolve(makeSession());
    await flushPromises();

    expect(ui.handlers.onAuthenticated).not.toHaveBeenCalled();
  });
});

describe('google authentication', () => {
  it('locks the dialog while the popup is open and completes the session', async () => {
    const request = createDeferred<AppSession>();
    actions.loginWithGoogle.mockReturnValue(request.promise);
    const ui = setup();
    const google = query<HTMLButtonElement>('.auth-dialog__google');

    google.click();

    expect(google.disabled).toBe(true);
    expect(google.textContent).toMatch(/Connecting to Google/);
    expect(ui.input('email').disabled).toBe(true);
    query('.auth-dialog__backdrop').click();
    expect(ui.handlers.onDismiss).not.toHaveBeenCalled();

    request.resolve(makeSession());
    await flushPromises();

    expect(ui.handlers.onAuthenticated).toHaveBeenCalled();
    expect(google.textContent?.trim()).toBe('Continue with Google');
  });

  it('keeps the dialog open and re-enables controls when the popup is closed', async () => {
    actions.loginWithGoogle.mockRejectedValue({ code: 'auth/popup-closed-by-user' });
    const ui = setup();
    const google = query<HTMLButtonElement>('.auth-dialog__google');

    google.click();
    await flushPromises();

    expect(ui.handlers.onAuthenticated).not.toHaveBeenCalled();
    expect(google.disabled).toBe(false);
    expect(ui.input('email').disabled).toBe(false);
    expect(query('.auth-dialog__form-error').textContent).toBe('');
    expect(getSnackbarMessages()).toContain('Google sign-in was canceled.');
  });

  it('shows an error when google sign-in fails', async () => {
    actions.loginWithGoogle.mockRejectedValue({ code: 'auth/popup-blocked' });
    setup();

    query<HTMLButtonElement>('.auth-dialog__google').click();
    await flushPromises();

    expect(query('.auth-dialog__form-error').textContent).toMatch(/popup was blocked/);
  });
});

describe('dialog lifecycle', () => {
  it('asks the owner to close on escape, backdrop and close button', () => {
    const ui = setup();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    query('.auth-dialog__backdrop').click();
    query<HTMLButtonElement>('.auth-dialog__close').click();

    expect(ui.handlers.onDismiss).toHaveBeenCalledTimes(3);
  });

  it('closes itself when no owner handler is given', () => {
    const dialog = createAuthDialog();
    document.body.append(dialog.element);
    dialog.open('register');
    expect(dialog.element.classList.contains('auth-dialog--open')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    query('.auth-dialog__backdrop').click();

    expect(dialog.element.classList.contains('auth-dialog--open')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('does not rebuild the form when the mode changes during a request', () => {
    actions.loginWithEmail.mockReturnValue(createDeferred<AppSession>().promise);
    const ui = setup();
    fillLogin(ui);
    ui.submit().click();

    ui.dialog.open('register');

    expect(ui.input('email').value).toBe('student@rs.school');
  });
});
