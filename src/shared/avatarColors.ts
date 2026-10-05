// Случайный цвет аватара комментатора из набора токенов avatar-random-*
// (Story 4, RSS-QS-4-2-3). Цвет закрепляется за автором при первом
// показе и не меняется при перерисовках, пока жив реестр (т.е. пока
// смонтирован список комментариев).

// Количество токенов avatar-random-N в styles/tokens/_colors.scss.
export const AVATAR_TONE_COUNT = 5;

export interface AvatarToneRegistry {
  // Номер токена (1..AVATAR_TONE_COUNT) для автора.
  getTone: (authorName: string) => number;
}

export function createAvatarToneRegistry(random: () => number = Math.random): AvatarToneRegistry {
  const tones = new Map<string, number>();

  return {
    getTone(authorName) {
      const key = authorName.trim().toLowerCase();
      let tone = tones.get(key);

      if (tone === undefined) {
        tone = Math.min(Math.floor(random() * AVATAR_TONE_COUNT), AVATAR_TONE_COUNT - 1) + 1;
        tones.set(key, tone);
      }

      return tone;
    },
  };
}
