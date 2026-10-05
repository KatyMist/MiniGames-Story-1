// Клиент публичного REST API MiniGames: чтение (Story 3) и действия
// авторизованного пользователя (Story 4: избранное, комментарии, лайки).
// Документация: https://faxb76kxra.execute-api.eu-central-1.amazonaws.com/docs

export const API_BASE_URL = 'https://faxb76kxra.execute-api.eu-central-1.amazonaws.com/api';

export type SortOption = 'rating-desc' | 'rating-asc' | 'name-asc' | 'name-desc';

export interface GameSummary {
  slug: string;
  name: string;
  category: string;
  price: string;
  shortDescription: string;
  rating: number;
  likesCount: number;
  cardImage: string;
}

export interface ListMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface GamesResponse {
  data: GameSummary[];
  meta: ListMeta;
}

export interface Category {
  slug: string;
  label: string;
  isDefault: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  gamesPlayed: number;
  totalScore: number;
  streakDays: number;
  favoriteGameSlug: string;
  favoriteGameName: string;
}

export interface GameSpecs {
  genre: string;
  players: string;
  duration: string;
  price: string;
}

export interface GameRecord {
  position: number;
  playerName: string;
  score: number;
  achievedAt: string;
}

export interface GameDetails {
  slug: string;
  name: string;
  heroImage: string;
  rating: number;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  fullDescription: string;
  specs: GameSpecs;
  topRecords: GameRecord[];
}

export interface GameComment {
  commentId: string;
  authorName: string;
  text: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
}

export interface CommentsResponse {
  data: GameComment[];
  meta: {
    totalComments: number;
    returnedCount: number;
  };
}

export interface GamesQuery {
  category: string;
  sort: SortOption;
  page: number;
  limit: number;
}

// Ошибка ответа сервера. status = 0 -- сеть недоступна / запрос не дошёл
// или не дождался ответа.
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  // Результат изменяющего запроса неизвестен: ответа нет (сеть, таймаут)
  // или сервер упал в процессе (5xx). Такие запросы нельзя повторять
  // автоматически -- toggle-эндпоинты при повторе отменили бы действие.
  get isUnknownOutcome(): boolean {
    return this.status === 0 || this.status >= 500;
  }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

// Изменяющие запросы ждут ответа не дольше этого времени.
export const MUTATION_TIMEOUT_MS = 15_000;

interface RequestOptions {
  method?: 'GET' | 'POST';
  body?: unknown;
  signal?: AbortSignal;
  timeoutMs?: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// Текст ошибки из тела ответа ({ error: { message } } или { message }),
// если сервер его прислал.
async function readErrorMessage(response: Response): Promise<string> {
  const fallback = `Request failed with status ${response.status}`;

  try {
    const body: unknown = await response.json();

    if (isRecord(body)) {
      const error = isRecord(body.error) ? body.error : body;
      if (typeof error.message === 'string' && error.message) return error.message;
    }
  } catch {
    // Тело не JSON -- используем стандартное сообщение.
  }

  return fallback;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal, timeoutMs } = options;
  const headers: Record<string, string> = { Accept: 'application/json' };
  // Таймаут -- через собственный AbortController; внешний signal (если
  // передан) тоже отменяет запрос.
  const controller = new AbortController();
  const abortFromOutside = (): void => controller.abort();
  let timedOut = false;

  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort', abortFromOutside, { once: true });

  const timer =
    timeoutMs === undefined
      ? undefined
      : window.setTimeout(() => {
          timedOut = true;
          controller.abort();
        }, timeoutMs);

  if (body !== undefined) headers['Content-Type'] = 'application/json';

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    if (timedOut) throw new ApiError('The server did not respond in time.', 0);
    if (isAbortError(error)) throw error;
    throw new ApiError('Network error. Check your connection and try again.', 0);
  } finally {
    window.clearTimeout(timer);
    signal?.removeEventListener('abort', abortFromOutside);
  }

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  return (await response.json()) as T;
}

// Персональные данные (избранное, лайки) API отдаёт по ?userEmail=...
// Гостевые запросы этот параметр не содержат.
function withUserEmail(params: URLSearchParams, userEmail?: string): URLSearchParams {
  if (userEmail) params.set('userEmail', userEmail);
  return params;
}

function toQueryString(params: URLSearchParams): string {
  const query = params.toString();
  return query ? `?${query}` : '';
}

export function fetchFeaturedGames(signal?: AbortSignal): Promise<GamesResponse> {
  return request<GamesResponse>('/games?featured=true', { signal });
}

export function fetchGames(query: GamesQuery, signal?: AbortSignal): Promise<GamesResponse> {
  const params = new URLSearchParams({
    category: query.category,
    sort: query.sort,
    page: String(query.page),
    limit: String(query.limit),
  });

  return request<GamesResponse>(`/games?${params.toString()}`, { signal });
}

export async function fetchCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await request<{ data: Category[] }>('/categories', { signal });

  return response.data;
}

export async function fetchLeaderboard(signal?: AbortSignal): Promise<LeaderboardEntry[]> {
  const response = await request<{ data: LeaderboardEntry[] }>('/leaderboard', { signal });

  return response.data;
}

export async function fetchGameDetails(
  slug: string,
  signal?: AbortSignal,
  userEmail?: string,
): Promise<GameDetails> {
  const query = toQueryString(withUserEmail(new URLSearchParams(), userEmail));
  const response = await request<{ data: GameDetails }>(
    `/games/${encodeURIComponent(slug)}${query}`,
    { signal },
  );

  return response.data;
}

export function fetchGameComments(
  slug: string,
  signal?: AbortSignal,
  userEmail?: string,
): Promise<CommentsResponse> {
  const params = withUserEmail(new URLSearchParams({ limit: '3', sort: 'newest' }), userEmail);

  return request<CommentsResponse>(
    `/games/${encodeURIComponent(slug)}/comments?${params.toString()}`,
    { signal },
  );
}

export interface FavoriteState {
  isFavorited: boolean;
  likesCount: number;
}

// POST /api/games/{slug}/favorite -- переключатель: каждый успешный
// запрос добавляет игру в избранное или убирает из него.
export async function toggleFavorite(slug: string, userEmail: string): Promise<FavoriteState> {
  const response = await request<{ data: FavoriteState }>(
    `/games/${encodeURIComponent(slug)}/favorite`,
    { method: 'POST', body: { userEmail }, timeoutMs: MUTATION_TIMEOUT_MS },
  );

  return response.data;
}

export interface NewComment {
  userEmail: string;
  authorName: string;
  text: string;
}

// POST /api/games/{slug}/comments -> 201 с созданным комментарием в data.
// Общего числа комментариев в ответе нет -- его даёт следующий GET.
export async function postComment(slug: string, comment: NewComment): Promise<GameComment> {
  const response = await request<{ data: GameComment }>(
    `/games/${encodeURIComponent(slug)}/comments`,
    { method: 'POST', body: comment, timeoutMs: MUTATION_TIMEOUT_MS },
  );

  return response.data;
}
