<div align="center">

# MiniGames — Casual Games Catalog 

**Учебный проект RS School · JS/FE Short Track 2026 Q3 · Stories 1–4**<br>
**RS School learning project · JS/FE Short Track 2026 Q3 · Stories 1–4**

<a href="https://katymist.github.io/MiniGames-Story-1/"><img src="https://img.shields.io/badge/ОТКРЫТЬ_ДЕМО-KATYMIST.GITHUB.IO-ffd02b?style=for-the-badge&logo=googlechrome&logoColor=242145&labelColor=242145" alt="Открыть демо"></a>

<img src="https://skillicons.dev/icons?i=ts,vite,sass,firebase,vitest,githubactions,github" alt="TypeScript, Vite, Sass, Firebase, Vitest, GitHub Actions, GitHub">

<img src="https://img.shields.io/badge/RU-Русский-ffd02b?labelColor=242145" alt="Русский"> <img src="https://img.shields.io/badge/EN-English-ffd02b?labelColor=242145" alt="English"> <img src="https://img.shields.io/badge/coverage-80%25+-ffd02b?labelColor=242145" alt="Coverage 80%+">

<a href="https://katymist.github.io/MiniGames-Story-1/">
  <img width="2760" height="1580" alt="image" src="https://github.com/user-attachments/assets/07b60638-4dfd-4d61-8193-7be093e788b6" />
</a>

</div>

<br>

> [!NOTE]
> **О проекте.** Учебная работа квалификационного этапа [RS School](https://rs.school/). Проект собирался по «историям» (Stories): от вёрстки главной страницы до SPA с API, авторизацией и unit-тестами. Макет — Figma от RS School, данные — учебный REST API курса. Код — моя работа.
>
> **About the project.** A learning project for the [RS School](https://rs.school/) qualifying stage. It was built story by story: from a static home page to an SPA with a REST API, authentication and unit tests. The design is an RS School Figma mockup, the data comes from the course's REST API. The code is my own work.

---

## О приложении · About

Одностраничное приложение на чистом TypeScript без фреймворков: главная с каруселью новых игр и таблицей лидеров, библиотека игр с фильтрами, сортировкой и пагинацией, диалоги Game Details и авторизации. Вёрстка адаптивная: 375 / 768 / 1440 / 1920 px.

A single-page application in plain TypeScript, no frameworks: a home page with a new-games carousel and a leaderboard, a games library with filters, sorting and pagination, plus Game Details and authentication dialogs. Responsive layout: 375 / 768 / 1440 / 1920 px.

| Страница · Page | Что на ней · Content |
|---|---|
| [Главная · Home](https://katymist.github.io/MiniGames-Story-1/) | Карусель новых игр, Top Players This Week<br>New games carousel, Top Players This Week |
| [Библиотека · Library](https://katymist.github.io/MiniGames-Story-1/library) | Карточки игр, категории, сортировка, пагинация<br>Game cards, categories, sorting, pagination |
| Game Details · `?game=<slug>` | Описание, рекорды, комментарии, избранное<br>Description, high scores, comments, favorites |
| Авторизация · Auth · `?auth=login` | Вход и регистрация: email/пароль и Google<br>Sign in and sign up: email/password and Google |
| 404 | Любой неизвестный путь<br>Any unknown path |

## Скриншоты · Screenshots

<details open>
<summary><b>Главная · Home</b></summary>
<br>
<img src="https://raw.githubusercontent.com/KatyMist/MiniGames-Story-1/story-4/docs/screenshots/home.png" alt="Home page" width="100%">
</details>

<details>
<summary><b>Библиотека · Library</b></summary>
<br>
<img src="https://raw.githubusercontent.com/KatyMist/MiniGames-Story-1/story-4/docs/screenshots/library.png" alt="Library page" width="100%">
</details>

<details>
<summary><b>Game Details</b></summary>
<br>
<img src="https://raw.githubusercontent.com/KatyMist/MiniGames-Story-1/story-4/docs/screenshots/game-details.png" alt="Game Details dialog" width="100%">
</details>

<details>
<summary><b>Мобильная версия · Mobile Version</b></summary>
<br>
<img width="2760" height="1580" alt="image" src="https://github.com/user-attachments/assets/514f5a3a-96fa-4ab7-9815-0896a61e596e" />
</details>

## Возможности · Features

| Русский | English |
|---|---|
| **Карусель новых игр**: свайп, автопрокрутка, бесконечная лента | **New games carousel**: swipe, autoplay, infinite loop |
| **Библиотека**: фильтр, сортировка и пагинация на сервере | **Library**: server-side filtering, sorting and pagination |
| **Game Details**: рекорды и комментарии с относительным временем | **Game Details**: high scores and comments with relative time |
| **Авторизация** через Firebase: email/пароль и Google | **Authentication** via Firebase: email/password and Google |
| **Валидация форм** «на лету» | **Live form validation** |
| **Сессия на 5 минут** с выходом в гостевой режим | **5-minute app session** with fallback to guest mode |
| **Избранное, комментарии, лайки** — только для авторизованных | **Favorites, comments, likes** — signed-in users only |
| **Свой роутер** на History API: URL — единственный источник правды | **Custom router** on the History API: the URL is the single source of truth |
| **Скелетоны, баннеры ошибок, Snackbar** во всех секциях | **Skeletons, error banners, Snackbar** in every section |
| **Unit-тесты**, покрытие от 80% | **Unit tests**, 80%+ coverage |

## Технологии · Tech Stack

| | |
|---|---|
| Язык · Language | TypeScript, без фреймворков · no frameworks |
| Сборка · Build | Vite |
| Стили · Styles | Sass: дизайн-токены, миксины брейкпоинтов · design tokens, breakpoint mixins |
| Авторизация · Auth | Firebase Authentication |
| Данные · Data | [MiniGames REST API](https://faxb76kxra.execute-api.eu-central-1.amazonaws.com/docs) |
| Тесты · Tests | Vitest + jsdom, `@vitest/coverage-v8` |
| Качество · Quality | ESLint, Prettier, Husky, commitlint |
| Хостинг · Hosting | GitHub Actions + GitHub Pages |

## Для ревьюера · For Reviewers

<details>
<summary><b>Сессия приложения · App session</b></summary>
<br>

Сессия хранится в `localStorage` под ключом · The session is stored in `localStorage` under the key:

```text
minigames:katymist-minigames:app-session
```

Значение · Value: `{ displayName, email, authenticatedAt, avatarUrl? }`. Пароли и токены Firebase не сохраняются · No passwords or Firebase tokens are stored.

**Проверка · How to check:** DevTools → Application → Local Storage → уменьшите `authenticatedAt` больше чем на 300000 мс (или сломайте JSON) → перезагрузите страницу или нажмите «Add to Favorites».<br>
DevTools → Application → Local Storage → decrease `authenticatedAt` by more than 300000 ms (or break the JSON) → reload the page or click “Add to Favorites”.

</details>

<details>
<summary><b>Маршруты · Routes</b></summary>
<br>

| URL | Что открывается · Opens |
|---|---|
| `/`, `/home` | Главная · Home |
| `/library?category=puzzle&sort=rating-desc&page=2` | Библиотека с фильтрами · Library with filters |
| `?game=<slug>` | Game Details |
| `?auth=login`, `?auth=register` | Авторизация · Authentication |
| любой другой · any other | 404 |

</details>

## Структура проекта · Project Structure

```text
├── src/
│   ├── app/          # роутер, сессия, Firebase, guards · router, session, Firebase, guards
│   ├── components/   # страницы и диалоги · pages and dialogs
│   ├── shared/       # API-клиент, форматирование · API client, formatting
│   └── styles/       # токены, миксины · tokens, mixins
├── public/           # favicon, картинки игр · game images
├── docs/screenshots/
├── index.html
└── vite.config.ts  vitest.config.ts
```

## Запуск локально · Running Locally

```bash
git clone https://github.com/KatyMist/MiniGames-Story-1.git
cd MiniGames-Story-1
npm install
npm run dev             # режим разработки · dev server
npm test                # unit-тесты · unit tests
npm run test:coverage   # покрытие · coverage report
npm run build           # сборка в dist · production build
```

## Автор · Author

**Екатерина Туманова · Ekaterina Tumanova** — Frontend Developer & Designer

[Портфолио · Portfolio](https://katymist.github.io/Portfolio/) · [GitHub](https://github.com/KatyMist)
