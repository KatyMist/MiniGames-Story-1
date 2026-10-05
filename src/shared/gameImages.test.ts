import { describe, expect, it, vi } from 'vitest';
import { getCardImagePath, getPeekImageUrl, resolveAssetUrl, setImageSources } from './gameImages';

describe('image paths', () => {
  it('resolves api paths against the app base url', () => {
    expect(resolveAssetUrl('/assets/images/games/palia-card.jpg')).toBe(
      '/assets/images/games/palia-card.jpg',
    );
  });

  it('builds card and peek image paths from a slug', () => {
    expect(getCardImagePath('palia')).toBe('/assets/images/games/palia-card.jpg');
    expect(getPeekImageUrl('/x/palia-card.jpg')).toBe('/x/palia-card-peek.jpg');
  });
});

describe('setImageSources', () => {
  it('tries the next url when an image fails and reports when all failed', () => {
    const image = document.createElement('img');
    const onFail = vi.fn();

    setImageSources(image, ['/a.jpg', '/b.jpg'], onFail);
    expect(image.getAttribute('src')).toBe('/a.jpg');

    image.dispatchEvent(new Event('error'));
    expect(image.getAttribute('src')).toBe('/b.jpg');
    expect(onFail).not.toHaveBeenCalled();

    image.dispatchEvent(new Event('error'));
    expect(onFail).toHaveBeenCalledTimes(1);
  });
});
