// Клиент публичного REST API MiniGames (Story 3: только чтение).
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

// Ошибка ответа сервера. status = 0 -- сеть недоступна / запрос не дошёл.
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
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Accept: 'application/json' },
      signal,
    });
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new ApiError('Network error. Check your connection and try again.', 0);
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }

  return (await response.json()) as T;
}

export function fetchFeaturedGames(signal?: AbortSignal): Promise<GamesResponse> {
  return request<GamesResponse>('/games?featured=true', signal);
}

export function fetchGames(query: GamesQuery, signal?: AbortSignal): Promise<GamesResponse> {
  const params = new URLSearchParams({
    category: query.category,
    sort: query.sort,
    page: String(query.page),
    limit: String(query.limit),
  });

  return request<GamesResponse>(`/games?${params.toString()}`, signal);
}

export async function fetchCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await request<{ data: Category[] }>('/categories', signal);

  return response.data;
}

export async function fetchLeaderboard(signal?: AbortSignal): Promise<LeaderboardEntry[]> {
  const response = await request<{ data: LeaderboardEntry[] }>('/leaderboard', signal);

  return response.data;
}

export async function fetchGameDetails(slug: string, signal?: AbortSignal): Promise<GameDetails> {
  const response = await request<{ data: GameDetails }>(
    `/games/${encodeURIComponent(slug)}`,
    signal,
  );

  return response.data;
}

export function fetchGameComments(slug: string, signal?: AbortSignal): Promise<CommentsResponse> {
  const params = new URLSearchParams({ limit: '3', sort: 'newest' });

  return request<CommentsResponse>(
    `/games/${encodeURIComponent(slug)}/comments?${params.toString()}`,
    signal,
  );
}
