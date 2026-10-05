import { beforeEach, describe, expect, it, vi } from 'vitest';

async function loadRouter(url = '/') {
  window.history.replaceState({}, '', url);
  vi.resetModules();
  const router = await import('./router');
  router.startRouter();

  return router;
}

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('route parsing', () => {
  it.each([
    ['/', 'home'],
    ['/home', 'home'],
    ['/library/', 'library'],
    ['/index.html', 'home'],
    ['/unknown', 'not-found'],
  ])('%s -> %s page', async (url, page) => {
    const router = await loadRouter(url);

    expect(router.getRoute().page).toBe(page);
  });

  it('migrates legacy hash routes to real paths', async () => {
    const router = await loadRouter('/#/library?category=puzzle');

    expect(window.location.pathname).toBe('/library');
    expect(router.getRoute().query.get('category')).toBe('puzzle');
  });

  it('builds hrefs with query strings', async () => {
    const router = await loadRouter();

    expect(router.toHref('library', new URLSearchParams({ page: '2' }))).toBe('/library?page=2');
    expect(router.toHref('/')).toBe('/');
  });
});

describe('navigation', () => {
  it('pushes a new entry and notifies subscribers', async () => {
    const router = await loadRouter();
    const listener = vi.fn();
    router.subscribe(listener);

    router.navigate('/library', new URLSearchParams({ page: '2' }));

    expect(window.location.pathname + window.location.search).toBe('/library?page=2');
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ page: 'library', path: '/library' }),
      expect.objectContaining({ page: 'home' }),
    );
  });

  it('does not push the same url twice and supports unsubscribe', async () => {
    const router = await loadRouter('/library');
    const listener = vi.fn();
    const unsubscribe = router.subscribe(listener);
    const length = window.history.length;

    router.navigate('/library');
    expect(window.history.length).toBe(length);
    expect(listener).not.toHaveBeenCalled();

    unsubscribe();
    router.navigate('/');
    expect(listener).not.toHaveBeenCalled();
  });

  it('updates only query parameters and keeps path and hash', async () => {
    const router = await loadRouter('/library?category=puzzle&auth=login#top');

    router.updateQuery({ auth: undefined, page: 2 }, { replace: true });

    expect(window.location.pathname).toBe('/library');
    expect(window.location.search).toBe('?category=puzzle&page=2');
    expect(window.location.hash).toBe('#top');
  });

  it('marks dialog entries so closing goes back in history', async () => {
    const router = await loadRouter('/');
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {});

    router.updateQuery({ game: 'palia' }, { dialog: true });
    expect(window.history.state).toEqual({ dialog: true });

    // replace без явного dialog сохраняет метку текущей записи.
    router.updateQuery({ game: 'cat-chess' }, { replace: true });
    expect(window.history.state).toEqual({ dialog: true });

    router.closeDialog('game');
    expect(back).toHaveBeenCalledTimes(1);
  });

  it('removes the dialog parameter when the dialog came from a deep link', async () => {
    const router = await loadRouter('/?game=palia');

    router.closeDialog('game');

    expect(window.location.search).toBe('');
  });

  it('follows popstate (back/forward) without page reloads', async () => {
    const router = await loadRouter('/');
    const listener = vi.fn();
    router.subscribe(listener);

    window.history.pushState({}, '', '/library');
    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ page: 'library' }),
      expect.anything(),
    );
  });

  it('intercepts clicks on spa links but not modified clicks', async () => {
    await loadRouter('/');
    const link = document.createElement('a');
    link.href = '/library?category=arcade';
    link.dataset.route = '/library?category=arcade';
    const label = document.createElement('span');
    link.append(label);
    document.body.append(link);

    const modified = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true });
    label.dispatchEvent(modified);
    expect(modified.defaultPrevented).toBe(false);

    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    label.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(window.location.pathname + window.location.search).toBe('/library?category=arcade');
  });
});
