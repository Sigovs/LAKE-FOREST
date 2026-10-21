/* History page v3: Lenis, the rail follows the chapter being read, and a single soft arrival per chapter. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('[data-nav]');
  const solid = (y) => { if (!nav) return; nav.classList.toggle('is-solid', y > 40); nav.classList.toggle('is-small', y > 24); };

  /* rail: the chapter that holds the middle of the screen is lit */
  const items = [...document.querySelectorAll('[data-rail] li')];
  const byId = new Map(items.filter((li) => li.querySelector('a')).map((li) => [li.querySelector('a').hash.slice(1), li]));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { items.forEach((li) => li.classList.remove('is-on')); const li = byId.get(e.target.id); if (li) li.classList.add('is-on'); } }),
    { rootMargin: '-45% 0px -50% 0px' });
  byId.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });

  if (reduce || !window.gsap || !window.Lenis) { addEventListener('scroll', () => solid(scrollY), { passive: true }); return; }
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ autoRaf: false, anchors: { offset: -96 }, lerp: 0.1 });
  window.lenis = lenis;
  lenis.on('scroll', (e) => { ScrollTrigger.update(); solid(e.scroll); });
  gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);

  /* titles slide in, as on the homepage: the year from the side, the title up from under a mask,
     the text rises line by line, the documents come in from the right */
  /* the page head: the title lines slide up from under a mask, the lead follows */
  gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
    .from('.hist__title', { y: 110, clipPath: 'inset(0 0 100% 0)', autoAlpha: 0, duration: 1.5 })
    .from('.hist__title span', { x: -120, autoAlpha: 0, duration: 1.4 }, 0.25)
    .from('.hist__lead', { y: 50, autoAlpha: 0, duration: 1.3 }, 0.45);

  const inView = (el, tl) => ScrollTrigger.create({ trigger: el, start: 'top 72%', once: true, onEnter: () => tl.play() });
  document.querySelectorAll('.chap, .films, .next').forEach((ch) => {
    const when = ch.querySelector('.chap__when'), title = ch.querySelector('.chap__title');
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 1.4 } });
    if (when) tl.from(when, { x: -160, autoAlpha: 0 }, 0);                                     /* from the side */
    if (title) tl.from(title, { y: 90, clipPath: 'inset(0 0 100% 0)', autoAlpha: 0 }, 0.15);    /* up from under a mask */
    tl.from(ch.querySelectorAll('.quote, .chap__text > p, .makes, .chap__src, .pills, .films__list li'), { y: 60, autoAlpha: 0, duration: 1.2, stagger: 0.12 }, 0.35);
    const media = ch.querySelectorAll('.doc, .pic');
    const fromLeft = getComputedStyle(ch.querySelector('.chap__media') || ch).gridColumnStart === '1';   /* media slide in from their own side */
    if (media.length) tl.from(media, { x: fromLeft ? -180 : 180, autoAlpha: 0, duration: 1.5, stagger: 0.15 }, 0.45);
    inView(ch, tl);
  });
  document.querySelectorAll('.pause').forEach((el) => {
    const tl = gsap.timeline({ paused: true }).from(el.querySelector('.win'), { clipPath: 'inset(12% 0 12% 0)', duration: 1.4, ease: 'expo.out' })
      .from(el.querySelector('figcaption'), { y: 20, autoAlpha: 0, duration: .8, ease: 'expo.out' }, 0.4);
    inView(el, tl);
  });
})();
