import './auth-dialog.scss';

export type AuthMode = 'login' | 'register';

interface AuthDialogHandle {
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
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: string;
  autocomplete?: HTMLInputElement['autocomplete'];
}

function createField(config: FieldConfig): HTMLDivElement {
  const field = document.createElement('div');
  field.className = 'auth-dialog__field';

  const label = document.createElement('label');
  label.className = 'auth-dialog__label';
  label.htmlFor = config.id;
  label.textContent = config.label;

  const wrap = document.createElement('div');
  wrap.className = 'auth-dialog__input-wrap';

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined auth-dialog__input-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = config.icon;

  const input = document.createElement('input');
  input.className = 'auth-dialog__input';
  input.id = config.id;
  input.name = config.id;
  input.type = config.type;
  input.placeholder = config.placeholder;
  if (config.autocomplete) input.autocomplete = config.autocomplete;

  wrap.append(icon, input);
  field.append(label, wrap);

  return field;
}

// Поле пароля с переключателем видимости -- по референсу иконка "глаз"
// есть только у пароля на форме логина; у Password/Confirm Password на
// форме регистрации её нет вообще (см. createField с icon: 'lock' там).
function createPasswordField(config: Omit<FieldConfig, 'type' | 'icon'>): HTMLDivElement {
  const field = document.createElement('div');
  field.className = 'auth-dialog__field';

  const label = document.createElement('label');
  label.className = 'auth-dialog__label';
  label.htmlFor = config.id;
  label.textContent = config.label;

  const wrap = document.createElement('div');
  wrap.className = 'auth-dialog__input-wrap';

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined auth-dialog__input-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = 'lock';

  const input = document.createElement('input');
  input.className = 'auth-dialog__input auth-dialog__input--with-toggle';
  input.id = config.id;
  input.name = config.id;
  input.type = 'password';
  input.placeholder = config.placeholder;
  if (config.autocomplete) input.autocomplete = config.autocomplete;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'auth-dialog__input-toggle';
  toggle.setAttribute('aria-label', 'Show password');

  const toggleIcon = document.createElement('span');
  toggleIcon.className = 'material-symbols-outlined';
  toggleIcon.setAttribute('aria-hidden', 'true');
  toggleIcon.textContent = 'visibility';
  toggle.append(toggleIcon);

  toggle.addEventListener('click', () => {
    const isCurrentlyHidden = input.type === 'password';
    input.type = isCurrentlyHidden ? 'text' : 'password';
    toggleIcon.textContent = isCurrentlyHidden ? 'visibility_off' : 'visibility';
    toggle.setAttribute('aria-label', isCurrentlyHidden ? 'Hide password' : 'Show password');
  });

  wrap.append(icon, input, toggle);
  field.append(label, wrap);

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

function createLoginForm(onSwitchToRegister: () => void): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'auth-dialog__form';
  form.noValidate = true;

  const heading = document.createElement('h2');
  heading.className = 'auth-dialog__heading';
  heading.textContent = 'Welcome Back!';

  const subtitle = document.createElement('p');
  subtitle.className = 'auth-dialog__subtitle';
  subtitle.textContent = 'Sign in to resume your games and progress.';

  const email = createField({
    id: 'login-email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'e.g. alex@minigames.com',
    icon: 'mail',
    autocomplete: 'email',
  });

  const password = createPasswordField({
    id: 'login-password',
    label: 'Password',
    placeholder: '••••••••',
    autocomplete: 'current-password',
  });

  const forgot = document.createElement('button');
  forgot.type = 'button';
  forgot.className = 'auth-dialog__forgot';
  forgot.textContent = 'Forgot Password?';

  // Бэкенда для авторизации пока нет (см. src/shared/authState.ts) --
  // сабмит только гасит перезагрузку страницы, реального логина не
  // происходит. Восстановление пароля (Forgot Password?) по той же причине
  // тоже пока декоративное.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  form.append(
    heading,
    subtitle,
    email,
    password,
    forgot,
    createSubmitButton('Login'),
    createDivider(),
    createGoogleButton('Continue with Google'),
    createSwitchRow("Don't have an account?", 'Register', onSwitchToRegister),
  );

  return form;
}

function createRegisterForm(onSwitchToLogin: () => void): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'auth-dialog__form';
  form.noValidate = true;

  const heading = document.createElement('h2');
  heading.className = 'auth-dialog__heading';
  heading.textContent = 'Create Account';

  const subtitle = document.createElement('p');
  subtitle.className = 'auth-dialog__subtitle';
  subtitle.textContent = 'Join MiniGames to track your score & streak.';

  const username = createField({
    id: 'register-username',
    label: 'Username',
    type: 'text',
    placeholder: 'e.g. CozyGamer_99',
    icon: 'person',
    autocomplete: 'username',
  });

  const email = createField({
    id: 'register-email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'your.email@domain.com',
    icon: 'mail',
    autocomplete: 'email',
  });

  const password = createField({
    id: 'register-password',
    label: 'Password',
    type: 'password',
    placeholder: 'Min. 8 characters',
    icon: 'lock',
    autocomplete: 'new-password',
  });

  const confirmPassword = createField({
    id: 'register-confirm-password',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Repeat your password',
    icon: 'lock',
    autocomplete: 'new-password',
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  form.append(
    heading,
    subtitle,
    username,
    email,
    password,
    confirmPassword,
    createSubmitButton('Create Account'),
    createDivider(),
    createGoogleButton('Sign up with Google'),
    createSwitchRow('Already have an account?', 'Login', onSwitchToLogin),
  );

  return form;
}

export function createAuthDialog(): AuthDialogHandle {
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

  const renderMode = (): void => {
    content.replaceChildren();

    const isLogin = mode === 'login';
    loginTab.classList.toggle('auth-dialog__tab--active', isLogin);
    loginTab.setAttribute('aria-selected', String(isLogin));
    registerTab.classList.toggle('auth-dialog__tab--active', !isLogin);
    registerTab.setAttribute('aria-selected', String(!isLogin));
    content.setAttribute('aria-labelledby', isLogin ? loginTab.id : registerTab.id);

    content.append(
      isLogin
        ? createLoginForm(() => setMode('register'))
        : createRegisterForm(() => setMode('login')),
    );
  };

  const setMode = (nextMode: AuthMode): void => {
    mode = nextMode;
    renderMode();
  };

  loginTab.addEventListener('click', () => setMode('login'));
  registerTab.addEventListener('click', () => setMode('register'));

  const close = (): void => {
    if (!isOpen) return;
    isOpen = false;
    root.classList.remove('auth-dialog--open');
    document.body.style.removeProperty('overflow');
  };

  const open = (requestedMode: AuthMode): void => {
    isOpen = true;
    setMode(requestedMode);
    root.classList.add('auth-dialog--open');
    document.body.style.overflow = 'hidden';
  };

  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  renderMode();

  panel.append(tabs, content);
  root.append(backdrop, panel);

  return { element: root, open, close };
}
