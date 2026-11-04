/* The GT page: Lenis, the solid nav, and the arrivals of the homepage and the history page: the label from the side,
   the title up from under a mask, the text in steps, side elements from their own side.
   Desktop adds two pinned stops: the five promises light one by one, and each generation band holds while its photograph
   eases out of the close-up. Phones keep native scroll and plain arrivals. Under reduced motion nothing moves. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('[data-nav]');
  const solid = (y) => { if (!nav) return; nav.classList.toggle('is-solid', y > 40); nav.classList.toggle('is-small', y > 24); };

  if (reduce || !window.gsap || !window.ScrollTrigger || !window.Lenis) { addEventListener('scroll', () => solid(scrollY), { passive: true }); solid(scrollY); return; }
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ autoRaf: false, anchors: { offset: -96 }, lerp: 0.1 });
  window.lenis = lenis;
  lenis.on('scroll', (e) => { ScrollTrigger.update(); solid(e.scroll); });
  gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);

  /* the hero: the close-up settles from a slight push-in, the words arrive on it */
  gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
    .from('.gp-hero__img', { scale: 1.12, duration: 2.6, ease: 'expo.out' })
    .from('.gp-hero__status', { y: 30, autoAlpha: 0, duration: 1.2 }, 0.45)
    .from('.gp-hero__mark', { y: 60, clipPath: 'inset(0 0 100% 0)', autoAlpha: 0, duration: 1.4 }, 0.55)
    .from('.gp-hero__line, .gp-hero__words .pills', { y: 50, autoAlpha: 0, duration: 1.2, stagger: 0.12 }, 0.8);
  /* and drifts a little as the page leaves it */
  gsap.to('.gp-hero__img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.gp-hero', start: 'top top', end: 'bottom top', scrub: true } });

  const inView = (el, tl) => ScrollTrigger.create({ trigger: el, start: 'top 72%', once: true, onEnter: () => tl.play() });
  const arrive = (box, steps, side, sideFrom = 180) => {
    if (!box) return;
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 1.4 } });
    const label = box.querySelector('.gp-label'), title = box.querySelector('.gp-d2, .gp-d3');
    if (label) tl.from(label, { x: label.classList.contains('gp-label--center') ? 0 : -160, y: label.classList.contains('gp-label--center') ? 30 : 0, autoAlpha: 0 }, 0);
    if (title) tl.from(title, { y: 90, clipPath: 'inset(0 0 100% 0)', autoAlpha: 0 }, 0.15);
    const s = steps ? box.querySelectorAll(steps) : [];
    if (s.length) tl.from(s, { y: 60, autoAlpha: 0, duration: 1.2, stagger: 0.12 }, 0.35);
    const sd = side ? box.querySelectorAll(side) : [];
    if (sd.length) tl.from(sd, { x: sideFrom, autoAlpha: 0, duration: 1.5, stagger: 0.15 }, 0.45);
    inView(box, tl);
    return tl;
  };

  const concept = arrive(document.querySelector('.gp-concept'), '.gp-concept__copy .statement, .gp-concept__note', '.gp-gens .label, .gp-gens__row');
  /* the drawings are drawn on, left to right, the way the pencil went: with the block, one after the other */
  if (concept) concept.from('.gp-gens__sketch', { clipPath: 'inset(0 100% 0 0)', duration: 1.8, ease: 'power2.inOut', stagger: 0.3 }, 0.7);
  arrive(document.querySelector('.gp-standard'), '.gp-standard__head .lead, .gp-col');
  document.querySelectorAll('.gp-gen .gp-cols').forEach((c) => inView(c, gsap.timeline({ paused: true }).from(c.querySelectorAll('.gp-col'), { y: 60, autoAlpha: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out' })));
  arrive(document.querySelector('.gp-for'), '.gp-for__list li');
  arrive(document.querySelector('.gp-heritage'), '.gp-heritage__text, .gp-stats div, .gp-heritage .pills');
  arrive(document.querySelector('#enquire'), '.contact__head > :not(.contact__title), .enquiry');
  const t = document.querySelector('#enquire .contact__title');
  if (t) inView(t, gsap.timeline({ paused: true }).from(t, { y: 90, clipPath: 'inset(0 0 100% 0)', autoAlpha: 0, duration: 1.4, ease: 'power3.out' }));

  const mm = gsap.matchMedia();

  /* desktop: the pinned stops */
  mm.add('(min-width: 1000px)', () => {
    /* the promise holds; its title arrives, then the five promises light one by one, each with a red rule drawn across */
    const stage = document.querySelector('[data-gp-promise]');
    const rows = stage.querySelectorAll('.gp-rows li');
    const tl = gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top top', end: '+=' + (rows.length * 45) + '%', pin: true, scrub: 0.8 } });
    tl.from(stage.querySelector('.gp-label'), { x: -120, autoAlpha: 0, duration: 0.5 }, 0)
      .from(stage.querySelector('.gp-d2'), { y: 70, clipPath: 'inset(0 0 100% 0)', autoAlpha: 0, duration: 0.7 }, 0.1)
      .from(stage.querySelector('.gp-promise__lead'), { y: 30, autoAlpha: 0, duration: 0.5 }, 0.4)
      .from(rows, { autoAlpha: 0.16, duration: 0.5, stagger: 0.6 }, 0.6)
      .to(rows, { '--lit': '100%', duration: 0.5, stagger: 0.6 }, 0.6)
      .to({}, { duration: 0.4 });

    /* each generation band holds while its photograph eases out of the close-up and the title arrives */
    document.querySelectorAll('.gp-gen__band').forEach((band) => {
      const img = band.querySelector('.gp-gen__img'), head = band.querySelector('.gp-gen__head');
      const g = gsap.timeline({ scrollTrigger: { trigger: band, start: 'top top', end: '+=70%', pin: true, scrub: 0.8 } });
      if (img) g.fromTo(img, { scale: 1.22 }, { scale: 1, ease: 'none', duration: 1 }, 0);
      g.from(head.querySelector('.gp-label'), { x: band.closest('.gp-gen--c3') ? 120 : -120, autoAlpha: 0, duration: 0.35 }, 0.1)
       .from(head.querySelector('.gp-d2'), { y: 70, clipPath: 'inset(0 0 100% 0)', autoAlpha: 0, duration: 0.45 }, 0.2);
      const lead = head.querySelector('.lead');
      if (lead) g.from(lead, { y: 30, autoAlpha: 0, duration: 0.35 }, 0.45);
    });
  });

  /* phones: the same content, arriving as it scrolls in */
  mm.add('(max-width: 999px)', () => {
    arrive(document.querySelector('[data-gp-promise]'), '.gp-promise__lead, .gp-rows li');
    document.querySelectorAll('.gp-gen__band').forEach((band) => arrive(band, '.gp-gen__head .lead'));
  });
})();
