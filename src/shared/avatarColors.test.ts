import { describe, expect, it, vi } from 'vitest';
import { AVATAR_TONE_COUNT, createAvatarToneRegistry } from './avatarColors';

describe('createAvatarToneRegistry', () => {
  it('picks a random avatar-random token number', () => {
    expect(createAvatarToneRegistry(() => 0).getTone('A')).toBe(1);
    expect(createAvatarToneRegistry(() => 0.999).getTone('A')).toBe(AVATAR_TONE_COUNT);
    expect(createAvatarToneRegistry(() => 0.45).getTone('A')).toBe(3);
  });

  it('keeps the tone stable for the same author', () => {
    const random = vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(0.9);
    const registry = createAvatarToneRegistry(random);

    expect(registry.getTone('Forest')).toBe(1);
    expect(registry.getTone(' forest ')).toBe(1);
    expect(registry.getTone('Mira')).toBe(5);
    expect(random).toHaveBeenCalledTimes(2);
  });
});
