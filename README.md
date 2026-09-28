# MiniGames

Учебный проект «MiniGames» — квалификационный этап RS School (Stories 1–3).

Деплой: https://katymist.github.io/MiniGames-Story-1/

Одностраничное приложение (SPA) на чистом TypeScript без фреймворков: адаптивная главная страница, библиотека игр, диалоги Game Details и авторизации, свёрстанные по макету Figma.

## Story 3

- Данные главной, библиотеки и Game Details загружаются из [MiniGames REST API](https://faxb76kxra.execute-api.eu-central-1.amazonaws.com/docs) (`src/shared/api.ts`).
- Фильтрация по категориям, сортировка и пагинация выполняются на сервере (`GET /api/games?category=…&sort=…&page=…&limit=6`).
- Скелетоны, баннеры ошибок с повтором запроса, заглушки «нет данных» и Snackbar-уведомления — общие для всех секций (`src/components/feedback`, `src/components/snackbar`).
- Собственный роутер на History API (`src/app/router.ts`): URL — единственный источник правды для страницы, фильтров, пагинации и открытых диалогов.
  - `/`, `/home` — главная, `/library` — библиотека, любой другой путь — страница 404;
  - `/library?category=puzzle&sort=rating-desc&page=2` — фильтры и пагинация;
  - `?game=<slug>` — диалог Game Details, `?auth=login` / `?auth=register` — диалог авторизации.

## Стек

- TypeScript
- Vite
- Sass
- ESLint + Prettier
- Husky

## Запуск проекта

```bash
npm install
npm run dev
```

Приложение будет доступно по адресу, который выведет Vite (обычно `http://localhost:5173`).

## Сборка

```bash
npm run build
```

Собранные файлы появятся в папке `dist`.

## Скрипты

- `npm run dev` — запуск в режиме разработки
- `npm run build` — сборка для продакшена
- `npm run lint` — проверка кода ESLint
- `npm run format` — форматирование кода Prettier
