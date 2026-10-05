// Вспомогательные функции для unit-тестов: ответы fetch, фикстуры API и
// работа с сессией приложения.
import { vi } from 'vitest';
import { SESSION_STORAGE_KEY, type AppSession } from '../app/session';
import type { CommentsResponse, GameComment, GameDetails, GameSummary } from '../shared/api';

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export type FetchHandler = (url: string, init?: RequestInit) => Response | Promise<Response>;

// Подменяет глобальный fetch; возвращает mock для проверки вызовов.
export function mockFetch(handler: FetchHandler) {
  const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) =>
    Promise.resolve(handler(String(input), init)),
  );
  vi.stubGlobal('fetch', fetchMock);

  return fetchMock;
}

// Дать отработать всем уже запущенным промисам/микрозадачам.
export async function flushPromises(times = 5): Promise<void> {
  for (let index = 0; index < times; index += 1) {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
  }
}

// Промис, который тест может разрешить/отклонить вручную -- для проверки
// состояния "запрос в процессе".
export function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });

  return { promise, resolve, reject };
}

export function makeSession(overrides: Partial<AppSession> = {}): AppSession {
  return {
    displayName: 'Forest Dweller',
    email: 'student@rs.school',
    authenticatedAt: Date.now(),
    ...overrides,
  };
}

export function storeSession(session: AppSession): void {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function makeGameSummary(overrides: Partial<GameSummary> = {}): GameSummary {
  return {
    slug: 'palia',
    name: 'Palia',
    category: 'simulation',
    price: 'Free',
    shortDescription: 'A cozy community sim.',
    rating: 4.6,
    likesCount: 38_200,
    cardImage: '/assets/images/games/palia-card.jpg',
    ...overrides,
  };
}

export function makeGameDetails(overrides: Partial<GameDetails> = {}): GameDetails {
  return {
    slug: 'palia',
    name: 'Palia',
    heroImage: '/assets/images/games/palia-hero.jpg',
    rating: 4.6,
    likesCount: 1200,
    isLikedByCurrentUser: false,
    fullDescription: 'Build a home and make friends.',
    specs: { genre: 'Simulation', players: '1-4', duration: '30 min', price: 'Free' },
    topRecords: [{ position: 1, playerName: 'Mira', score: 94_250, achievedAt: '2026-01-01' }],
    ...overrides,
  };
}

export function makeComment(overrides: Partial<GameComment> = {}): GameComment {
  return {
    commentId: 'c-1',
    authorName: 'ForestDweller',
    text: 'Such a calming little game!',
    likesCount: 3,
    isLikedByCurrentUser: false,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

export function makeCommentsResponse(
  comments: GameComment[] = [makeComment()],
  totalComments = comments.length,
): CommentsResponse {
  return { data: comments, meta: { totalComments, returnedCount: comments.length } };
}
