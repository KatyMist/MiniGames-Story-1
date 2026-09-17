import './hero.scss';

function createCta(): HTMLButtonElement {
  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'btn btn--primary btn--lg hero__cta';
  cta.textContent = 'Browse Library';

  return cta;
}

export function createHero(): HTMLElement {
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.setAttribute('aria-label', 'Welcome');

  const inner = document.createElement('div');
  inner.className = 'hero__inner';

  const card = document.createElement('div');
  card.className = 'hero__card';

  const title = document.createElement('h1');
  title.className = 'hero__title';
  title.textContent = 'Take a Short Break & Have Fun';

  const subtitle = document.createElement('p');
  subtitle.className = 'hero__subtitle';
  subtitle.textContent =
    'Discover hundreds of curated casual mini-games. Play instantly in your browser — puzzle, match 3, farm, and board classics.';

  const actions = document.createElement('div');
  actions.className = 'hero__actions';
  actions.append(createCta());

  card.append(title, subtitle, actions);
  inner.append(card);
  hero.append(inner);

  return hero;
}
