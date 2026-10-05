# MiniGames

Каталог казуальных мини-игр — учебный проект квалификационного этапа [RS School](https://rs.school/) (Stories 1–4).

**Демо:** https://katymist.github.io/MiniGames-Story-1/

Одностраничное приложение (SPA) на чистом TypeScript без фреймворков: главная страница с каруселью новых игр и таблицей лидеров, библиотека игр с фильтрами, сортировкой и пагинацией, диалоги Game Details и авторизации. Все данные загружаются с REST API, вёрстка адаптивная (375 / 768 / 1440 / 1920 px) и сделана по макету Figma.

## Скриншоты

| Главная                                        | Библиотека                                      |
| ---------------------------------------------- | ----------------------------------------------- |
| ![Главная страница](docs/screenshots/home.png) | ![Библиотека игр](docs/screenshots/library.png) |

| Game Details                                              | Мобильная версия                                 |
| --------------------------------------------------------- | ------------------------------------------------ |
| ![Диалог Game Details](docs/screenshots/game-details.png) | ![Мобильная версия](docs/screenshots/mobile.png) |

## Возможности

- **Главная:** карусель новых игр (свайп, автопрокрутка, бесконечная лента) и таблица «Top Players This Week» — данные из API.
- **Библиотека:** карточки игр по 6 на странице; фильтр по категориям, сортировка по рейтингу и названию, пагинация — всё выполняется на сервере.
- **Game Details:** описание, характеристики, рекорды игроков и последние комментарии с относительным временем («2 hours ago»).
- **Авторизация (Story 4):** вход и регистрация по email/паролю и через Google (Firebase Authentication), валидация форм «на лету», блокировка диалога на время запроса.
- **Профиль и сессия:** имя и аватар (фото или инициалы) в шапке и мобильном меню, сессия приложения на 5 минут, выход с возвратом в гостевой режим.
- **Действия пользователя:** избранное, комментарии (автоувеличение поля, отправка по Enter) и лайки комментариев — только для авторизованных; гость видит диалог входа и предупреждение.
- **Роутинг:** собственный роутер на History API. URL — единственный источник правды: страница, фильтры, пагинация и открытые диалоги восстанавливаются по ссылке и работают кнопки «Назад»/«Вперёд».
  - `/`, `/home` — главная, `/library` — библиотека, любой другой путь — страница 404;
  - `/library?category=puzzle&sort=rating-desc&page=2` — фильтры и пагинация;
  - `?game=<slug>` — Game Details, `?auth=login` / `?auth=register` — авторизация.
- **Состояния загрузки:** скелетоны, баннеры ошибок с повтором запроса, заглушки «Data Not Found» и Snackbar-уведомления во всех секциях.

## API

[MiniGames REST API](https://faxb76kxra.execute-api.eu-central-1.amazonaws.com/docs) (`src/shared/api.ts`):

- `GET /api/games?featured=true` — карусель на главной;
- `GET /api/games?category=…&sort=…&page=…&limit=6` — библиотека;
- `GET /api/categories` — категории фильтра;
- `GET /api/leaderboard` — таблица лидеров;
- `GET /api/games/{slug}` и `GET /api/games/{slug}/comments?limit=3&sort=newest` — Game Details.

Story 4 (только при активной сессии приложения):

- `GET /api/games/{slug}?userEmail=…` и `GET /api/games/{slug}/comments?limit=3&sort=newest&userEmail=…` — персональные `isLikedByCurrentUser`;
- `POST /api/games/{slug}/favorite` — добавить/убрать из избранного;
- `POST /api/games/{slug}/comments` — новый комментарий;
- `POST /api/comments/{commentId}/like` — лайк комментария.

Запросы-переключатели не повторяются автоматически: при неизвестном результате (таймаут, обрыв сети) пользователь видит сообщение и решает сам.

Картинки игр берутся по путям из API (`cardImage`, `heroImage`) и лежат в `public/assets/images/games`.

## Авторизация и сессия

- **Firebase Authentication** (`src/app/firebase.ts`, конфиг — `src/app/firebaseConfig.ts`): провайдеры Email/Password и Google. Firebase только подтверждает личность пользователя.
- **Сессия приложения** (`src/app/session.ts`, `src/app/authStore.ts`) — источник правды для UI и защиты действий. Хранится в `localStorage` под ключом:

  ```
  minigames:katymist-minigames:app-session
  ```

  Значение — JSON `{ displayName, email, authenticatedAt, avatarUrl? }`, где `authenticatedAt` — `Date.now()` в момент входа. Пароли и токены Firebase не сохраняются.

- Сессия действует **5 минут** с момента входа; перезагрузка и работа с приложением срок не продлевают. Проверка — при старте, при возврате на вкладку, перед навигацией и перед каждым защищённым действием (плюс таймер на момент истечения). По истечении, при выходе или повреждённой записи удаляется только этот ключ, вызывается Firebase `signOut`, интерфейс переходит в гостевой режим.
- **Проверка ревьюером:** DevTools → Application → Local Storage → ключ выше → уменьшите `authenticatedAt` больше чем на 300000 мс (или сломайте JSON) → перезагрузите страницу или нажмите «Add to Favorites».
- Пользователь с активной сессией не может открыть диалог авторизации (кнопки, `?auth=login`, Back/Forward): параметр `auth` удаляется из URL, показывается уведомление.

## Тесты

Vitest + jsdom, покрытие — `@vitest/coverage-v8` (настройки и исключения с пояснениями — в `vitest.config.ts`). Firebase и сеть в тестах заменены моками.

- `npm test` — запуск всех unit-тестов;
- `npm run test:coverage` — тесты и таблица покрытия в терминале (порог — 80% операторов);
- `npm run test:watch` — режим наблюдения.

## Стек

- TypeScript (без фреймворков и UI-библиотек)
- Vite
- Firebase Authentication
- Vitest + jsdom
- Sass (дизайн-токены, миксины брейкпоинтов)
- ESLint + Prettier, Husky + commitlint
- GitHub Actions + GitHub Pages (деплой)

## Структура

```
src/
  app/         сборка приложения, роутер, сессия, Firebase, guards
  components/  компоненты страниц и диалогов
  shared/      API-клиент, форматирование, общие данные
  styles/      токены, миксины, базовые стили
public/        статика (favicon, картинки игр)
```

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется по адресу, который выведет Vite (обычно `http://localhost:5173`).

## Скрипты

- `npm run dev` — запуск в режиме разработки
- `npm run build` — сборка для продакшена (папка `dist`)
- `npm run preview` — просмотр собранной версии
- `npm run lint` — проверка ESLint
- `npm run format` — форматирование Prettier
- `npm test` / `npm run test:coverage` — unit-тесты / покрытие

## Автор

[@KatyMist](https://github.com/KatyMist)
