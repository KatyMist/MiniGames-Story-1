import './auth-dialog.scss';
import { showSnackbar } from '../snackbar/snackbar';
import { loginWithEmail, registerAccount } from '../../app/authActions';
import { getAuthErrorMessage } from '../../app/authErrors';
import type { AppSession } from '../../app/session';
import { getProfileName } from '../../shared/profile';
import {
  isAuthFormValid,
  validateAuthField,
  validateAuthForm,
  type AuthFieldName,
  type AuthFormValues,
  type AuthMode,
} from '../../shared/validation';

export type { AuthMode } from '../../shared/validation';

export interface AuthDialogOptions {
  // Закрытие действием пользователя (бэкдроп/Escape). Если передано,
  // диалог сам себя не закрывает, а просит об этом владельца -- тот
  // меняет URL, и уже роутер вызывает close().
  onDismiss?: () => void;
  // Переключение Login/Register пользователем (вкладки и ссылки внизу формы).
  onModeChange?: (mode: AuthMode) => void;
  // Успешная авторизация: сессия уже создана, владелец закрывает диалог.
  onAuthenticated?: (session: AppSession) => void;
}

export interface AuthDialogHandle {
  element: HTMLElement;
  open: (mode: AuthMode) => void;
  close: () => void;
}

// Стандартный многоцветный логотип Google для кнопки "Continue/Sign up
// with Google" -- статичная разметка, не пользовательский ввод.
const GOOGLE_ICON_SVG = `
<svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true" focusable="false">
  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.4-6 7.5-11.3 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z"/>
  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.8 1.1 8 3l6-6C34.6 5.1 29.6 3 24 3 16.1 3 9.3 7.5 6.3 14.7z"/>
  <path fill="#4CAF50" d="M24 45c5.4 0 10.3-1.8 14.1-5l-6.5-5.5C29.6 36.6 26.9 37.5 24 37.5c-5.3 0-9.8-3.4-11.4-8.1l-6.5 5C9.1 40.5 15.9 45 24 45z"/>
  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.1 5.4-5.7 7l6.5 5.5C40.5 36.9 44 31 44 24c0-1.4-.1-2.7-.4-3.5z"/>
</svg>
`.trim();

interface FieldConfig {
  name: AuthFieldName;
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: string;
  autocomplete?: HTMLInputElement['autocomplete'];
}

// Поле формы вместе с элементами, которые нужны валидации: сам input и
// место под inline-ошибку (связано с input через aria-describedby).
interface AuthField {
  name: AuthFieldName;
  element: HTMLDivElement;
  input: HTMLInputElement;
  error: HTMLParagraphElement;
  // Ошибку показываем только после того, как пользователь начал вводить
  // значение или покинул поле, -- а не сразу при открытии формы.
  touched: boolean;
}

function createInputIcon(name: string): HTMLSpanElement {
  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined auth-dialog__input-icon';
  icon.translate = false;
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = name;

  return icon;
}

function createField(config: FieldConfig): AuthField {
  const field = document.createElement('div');
  field.className = 'auth-dialog__field';

  const label = document.createElement('label');
  label.className = 'auth-dialog__label';
  label.htmlFor = config.id;
  label.textContent = config.label;

  const wrap = document.createElement('div');
  wrap.className = 'auth-dialog__input-wrap';

  const input = document.createElement('input');
  input.className = 'auth-dialog__input';
  input.id = config.id;
  input.name = config.name;
  input.type = config.type;
  input.placeholder = config.placeholder;
  input.required = true;
  if (config.autocomplete) input.autocomplete = config.autocomplete;

  const error = document.createElement('p');
  error.className = 'auth-dialog__error';
  error.id = `${config.id}-error`;
  input.setAttribute('aria-describedby', error.id);

  wrap.append(createInputIcon(config.icon), input);
  field.append(label, wrap, error);

  return { name: config.name, element: field, input, error, touched: false };
}

// Поле пароля с переключателем видимости -- по референсу иконка "глаз"
// есть только у пароля на форме логина; у Password/Confirm Password на
// форме регистрации её нет вообще.
function createPasswordField(config: Omit<FieldConfig, 'type' | 'icon'>): AuthField {
  const field = createField({ ...config, type: 'password', icon: 'lock' });
  const { input } = field;
  input.classList.add('auth-dialog__input--with-toggle');

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'auth-dialog__input-toggle';
  toggle.setAttribute('aria-label', 'Show password');

  const toggleIcon = document.createElement('span');
  toggleIcon.className = 'material-symbols-outlined';
  toggleIcon.translate = false;
  toggleIcon.setAttribute('aria-hidden', 'true');
  toggleIcon.textContent = 'visibility';
  toggle.append(toggleIcon);

  toggle.addEventListener('click', () => {
    const isCurrentlyHidden = input.type === 'password';
    input.type = isCurrentlyHidden ? 'text' : 'password';
    toggleIcon.textContent = isCurrentlyHidden ? 'visibility_off' : 'visibility';
    toggle.setAttribute('aria-label', isCurrentlyHidden ? 'Hide password' : 'Show password');
  });

  input.after(toggle);

  return field;
}

function createDivider(): HTMLDivElement {
  const divider = document.createElement('div');
  divider.className = 'auth-dialog__divider';

  const lineLeft = document.createElement('span');
  lineLeft.className = 'auth-dialog__divider-line';

  const text = document.createElement('span');
  text.className = 'auth-dialog__divider-text';
  text.textContent = 'OR';

  const lineRight = document.createElement('span');
  lineRight.className = 'auth-dialog__divider-line';

  divider.append(lineLeft, text, lineRight);

  return divider;
}

// OAuth через Google пока не подключен (бэкенда для реальной авторизации
// нет вообще -- см. src/shared/authState.ts) -- кнопка пока декоративная.
function createGoogleButton(label: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn--outline btn--lg auth-dialog__google';

  const icon = document.createElement('span');
  icon.className = 'auth-dialog__google-icon';
  icon.innerHTML = GOOGLE_ICON_SVG;

  const text = document.createElement('span');
  text.textContent = label;

  button.append(icon, text);

  return button;
}

// Индикатор загрузки внутри кнопки на время запроса.
function createSpinner(): HTMLSpanElement {
  const spinner = document.createElement('span');
  spinner.className = 'material-symbols-outlined spinner';
  spinner.translate = false;
  spinner.setAttribute('aria-hidden', 'true');
  spinner.textContent = 'progress_activity';

  return spinner;
}

function createSubmitButton(label: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'btn btn--primary btn--lg auth-dialog__submit';
  button.textContent = label;

  return button;
}

function createSwitchRow(
  text: string,
  linkLabel: string,
  onSwitch: () => void,
): HTMLParagraphElement {
  const row = document.createElement('p');
  row.className = 'auth-dialog__switch';
  row.append(document.createTextNode(`${text} `));

  const link = document.createElement('button');
  link.type = 'button';
  link.className = 'auth-dialog__switch-link';
  link.textContent = linkLabel;
  link.addEventListener('click', onSwitch);

  row.append(link);

  return row;
}

interface FormCopy {
  heading: string;
  subtitle: string;
  submitLabel: string;
  googleLabel: string;
  switchText: string;
  switchLabel: string;
}

const FORM_COPY: Readonly<Record<AuthMode, FormCopy>> = {
  login: {
    heading: 'Welcome Back!',
    subtitle: 'Sign in to resume your games and progress.',
    submitLabel: 'Login',
    googleLabel: 'Continue with Google',
    switchText: "Don't have an account?",
    switchLabel: 'Register',
  },
  register: {
    heading: 'Create Account',
    subtitle: 'Join MiniGames to track your score & streak.',
    submitLabel: 'Create Account',
    googleLabel: 'Sign up with Google',
    switchText: 'Already have an account?',
    switchLabel: 'Login',
  },
};

function createLoginFields(): AuthField[] {
  return [
    createField({
      name: 'email',
      id: 'login-email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'e.g. alex@minigames.com',
      icon: 'mail',
      autocomplete: 'email',
    }),
    createPasswordField({
      name: 'password',
      id: 'login-password',
      label: 'Password',
      placeholder: '••••••••',
      autocomplete: 'current-password',
    }),
  ];
}

function createRegisterFields(): AuthField[] {
  return [
    createField({
      name: 'username',
      id: 'register-username',
      label: 'Username',
      type: 'text',
      placeholder: 'e.g. CozyGamer99',
      icon: 'person',
      autocomplete: 'username',
    }),
    createField({
      name: 'email',
      id: 'register-email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your.email@domain.com',
      icon: 'mail',
      autocomplete: 'email',
    }),
    createField({
      name: 'password',
      id: 'register-password',
      label: 'Password',
      type: 'password',
      placeholder: 'Min. 6 characters',
      icon: 'lock',
      autocomplete: 'new-password',
    }),
    createField({
      name: 'confirmPassword',
      id: 'register-confirm-password',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Repeat your password',
      icon: 'lock',
      autocomplete: 'new-password',
    }),
  ];
}

interface AuthFormView {
  form: HTMLFormElement;
  fields: AuthField[];
  submitButton: HTMLButtonElement;
  googleButton: HTMLButtonElement;
  formError: HTMLParagraphElement;
  getValues: () => AuthFormValues;
  updateSubmitState: () => void;
}

interface AuthFormHandlers {
  onSwitchMode: () => void;
  onSubmit: (values: AuthFormValues) => void;
}

function showFieldError(field: AuthField, message: string): void {
  field.error.textContent = message;
  field.input.setAttribute('aria-invalid', String(Boolean(message)));
  field.element.classList.toggle('auth-dialog__field--invalid', Boolean(message));
}

// Форма текущего режима с валидацией "на лету": поле проверяется при
// вводе (input) и при уходе с него (blur), кнопка отправки активна только
// когда валидны все поля режима.
function createAuthForm(mode: AuthMode, handlers: AuthFormHandlers): AuthFormView {
  const copy = FORM_COPY[mode];

  const form = document.createElement('form');
  form.className = 'auth-dialog__form';
  form.noValidate = true;

  const heading = document.createElement('h2');
  heading.className = 'auth-dialog__heading';
  heading.textContent = copy.heading;

  const subtitle = document.createElement('p');
  subtitle.className = 'auth-dialog__subtitle';
  subtitle.textContent = copy.subtitle;

  // Общая ошибка формы (ответ Firebase), в отличие от ошибок полей.
  const formError = document.createElement('p');
  formError.className = 'auth-dialog__form-error';
  formError.setAttribute('role', 'alert');

  const fields = mode === 'login' ? createLoginFields() : createRegisterFields();
  const submitButton = createSubmitButton(copy.submitLabel);
  const googleButton = createGoogleButton(copy.googleLabel);

  const getValues = (): AuthFormValues => {
    const values: AuthFormValues = {};
    for (const field of fields) values[field.name] = field.input.value;
    return values;
  };

  const updateSubmitState = (): void => {
    submitButton.disabled = !isAuthFormValid(mode, getValues());
  };

  const validateField = (field: AuthField): void => {
    if (!field.touched) return;
    showFieldError(field, validateAuthField(mode, field.name, getValues()));
  };

  for (const field of fields) {
    const handleChange = (): void => {
      field.touched = true;
      validateField(field);

      // Подтверждение пароля зависит от пароля -- перепроверяем его при
      // каждом изменении пароля.
      if (field.name === 'password') {
        const confirm = fields.find((item) => item.name === 'confirmPassword');
        if (confirm) validateField(confirm);
      }

      updateSubmitState();
    };

    field.input.addEventListener('input', handleChange);
    field.input.addEventListener('blur', handleChange);
  }

  // Отправка невалидной формы невозможна (кнопка disabled), но Enter в
  // поле всё равно вызывает submit -- в этом случае просто подсвечиваем
  // все ошибки и запрос не отправляем.
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const values = getValues();
    const errors = validateAuthForm(mode, values);
    for (const field of fields) {
      field.touched = true;
      showFieldError(field, errors[field.name] ?? '');
    }

    if (Object.keys(errors).length === 0) handlers.onSubmit(values);
  });

  const extras: HTMLElement[] = [];

  if (mode === 'login') {
    const forgot = document.createElement('button');
    forgot.type = 'button';
    forgot.className = 'auth-dialog__forgot';
    forgot.textContent = 'Forgot Password?';
    extras.push(forgot);
  }

  form.append(
    heading,
    subtitle,
    formError,
    ...fields.map((field) => field.element),
    ...extras,
    submitButton,
    createDivider(),
    googleButton,
    createSwitchRow(copy.switchText, copy.switchLabel, handlers.onSwitchMode),
  );

  updateSubmitState();

  return { form, fields, submitButton, googleButton, formError, getValues, updateSubmitState };
}

export function createAuthDialog(options: AuthDialogOptions = {}): AuthDialogHandle {
  const root = document.createElement('div');
  root.className = 'auth-dialog';

  const backdrop = document.createElement('div');
  backdrop.className = 'auth-dialog__backdrop';

  const panel = document.createElement('div');
  panel.className = 'auth-dialog__panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Authentication');

  const tabs = document.createElement('div');
  tabs.className = 'auth-dialog__tabs';
  tabs.setAttribute('role', 'tablist');

  const loginTab = document.createElement('button');
  loginTab.type = 'button';
  loginTab.id = 'auth-dialog-tab-login';
  loginTab.className = 'auth-dialog__tab';
  loginTab.setAttribute('role', 'tab');
  loginTab.textContent = 'Login';

  const registerTab = document.createElement('button');
  registerTab.type = 'button';
  registerTab.id = 'auth-dialog-tab-register';
  registerTab.className = 'auth-dialog__tab';
  registerTab.setAttribute('role', 'tab');
  registerTab.textContent = 'Register';

  tabs.append(loginTab, registerTab);

  const content = document.createElement('div');
  content.id = 'auth-dialog-panel';
  content.className = 'auth-dialog__content';
  content.setAttribute('role', 'tabpanel');

  loginTab.setAttribute('aria-controls', 'auth-dialog-panel');
  registerTab.setAttribute('aria-controls', 'auth-dialog-panel');

  let isOpen = false;
  let mode: AuthMode = 'login';
  let isPending = false;
  let view: AuthFormView | undefined;

  // Пока запрос авторизации в процессе, заблокированы все поля и кнопки
  // диалога (вкладки, отправка, Google, переключатели, крестик) -- второй
  // запрос запустить нельзя, а закрыть диалог -- тоже.
  function setPending(pending: boolean): void {
    isPending = pending;
    root.classList.toggle('auth-dialog--pending', pending);
    panel.setAttribute('aria-busy', String(pending));

    for (const control of panel.querySelectorAll<HTMLInputElement | HTMLButtonElement>(
      'input, button',
    )) {
      control.disabled = pending;
    }

    if (!pending) view?.updateSubmitState();
  }

  async function authenticate(
    request: () => Promise<AppSession>,
    activeButton: HTMLButtonElement,
    pendingLabel: string,
  ): Promise<void> {
    if (isPending || !view) return;

    const currentView = view;
    const originalContent = [...activeButton.childNodes];
    const finish = (): void => {
      activeButton.replaceChildren(...originalContent);
      setPending(false);
    };

    currentView.formError.textContent = '';
    activeButton.replaceChildren(createSpinner(), document.createTextNode(pendingLabel));
    setPending(true);

    try {
      const session = await request();
      finish();
      showSnackbar(`Welcome, ${getProfileName(session)}!`, { variant: 'success' });
      if (isOpen) options.onAuthenticated?.(session);
    } catch (error) {
      // Ошибка: диалог остаётся открытым, контролы разблокируются, можно
      // повторить попытку.
      finish();
      const message = getAuthErrorMessage(error);
      currentView.formError.textContent = message;
      showSnackbar(message, { variant: 'error' });
    }
  }

  function submitForm(values: AuthFormValues): void {
    if (!view) return;

    const email = values.email ?? '';
    const password = values.password ?? '';

    if (mode === 'login') {
      void authenticate(() => loginWithEmail(email, password), view.submitButton, 'Logging in…');
    } else {
      void authenticate(
        () => registerAccount(values.username ?? '', email, password),
        view.submitButton,
        'Creating account…',
      );
    }
  }

  const renderMode = (): void => {
    content.replaceChildren();

    const isLogin = mode === 'login';
    loginTab.classList.toggle('auth-dialog__tab--active', isLogin);
    loginTab.setAttribute('aria-selected', String(isLogin));
    registerTab.classList.toggle('auth-dialog__tab--active', !isLogin);
    registerTab.setAttribute('aria-selected', String(!isLogin));
    content.setAttribute('aria-labelledby', isLogin ? loginTab.id : registerTab.id);

    // Каждый режим получает новую форму: при переключении Login/Register
    // поля и ошибки валидации очищаются.
    view = createAuthForm(mode, {
      onSwitchMode: () => selectMode(isLogin ? 'register' : 'login'),
      onSubmit: submitForm,
    });
    content.append(view.form);
  };

  const setMode = (nextMode: AuthMode): void => {
    mode = nextMode;
    renderMode();
  };

  // Смена режима самим пользователем: переключаем форму и сообщаем
  // владельцу, чтобы тот синхронизировал URL (?auth=login|register).
  function selectMode(nextMode: AuthMode): void {
    if (nextMode === mode) return;
    setMode(nextMode);
    options.onModeChange?.(nextMode);
  }

  loginTab.addEventListener('click', () => selectMode('login'));
  registerTab.addEventListener('click', () => selectMode('register'));

  const close = (): void => {
    if (!isOpen) return;
    isOpen = false;
    root.classList.remove('auth-dialog--open');
    document.body.style.removeProperty('overflow');
  };

  const open = (requestedMode: AuthMode): void => {
    if (isOpen && requestedMode === mode) return;
    // Во время запроса форму не пересоздаём (например, при Back/Forward
    // между ?auth=login и ?auth=register).
    if (isOpen && isPending) return;
    isOpen = true;
    setMode(requestedMode);
    root.classList.add('auth-dialog--open');
    document.body.style.overflow = 'hidden';
  };

  const dismiss = (): void => {
    if (!isOpen || isPending) return;

    if (options.onDismiss) {
      options.onDismiss();
    } else {
      close();
    }
  };

  backdrop.addEventListener('click', dismiss);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dismiss();
  });

  renderMode();

  // Явная кнопка закрытия (вдобавок к бэкдропу и Escape).
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'auth-dialog__close';
  closeButton.setAttribute('aria-label', 'Close authentication dialog');

  const closeIcon = document.createElement('span');
  closeIcon.className = 'material-symbols-outlined';
  closeIcon.translate = false;
  closeIcon.setAttribute('aria-hidden', 'true');
  closeIcon.textContent = 'close';
  closeButton.append(closeIcon);
  closeButton.addEventListener('click', dismiss);

  panel.append(closeButton, tabs, content);
  root.append(backdrop, panel);

  return { element: root, open, close };
}
