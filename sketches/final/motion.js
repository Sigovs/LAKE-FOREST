/* =====================================================================
   Mancuso — final sketch · motion
   Lenis on gsap.ticker (autoRaf off), not constructed under reduced motion.
   Desktop (>=1000px): hero pin (hold → trail → documents → push-in → hold → name wipe),
   peak pin on the #76, spine fill, chapter reveals.
   Phones: hero intro + trail on load, reveals only, no pins.
   Static path: everything is laid out complete in CSS; motion only adds states.
   ===================================================================== */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('[data-nav]');
  const hero = document.querySelector('[data-hero]');

  /* ---------------- nav: solid after the hero, hides on scroll down */
  let lastY = 0;
  const onScroll = (y) => {
    const past = y > (hero ? hero.offsetHeight * 0.6 : 200);
    nav.classList.toggle('is-solid', past);
    nav.classList.toggle('is-hidden', past && y > lastY + 2);
    if (y < lastY - 2 || !past) nav.classList.remove('is-hidden');
    lastY = y;
  };

  if (reduce || !window.gsap || !window.ScrollTrigger) {
    addEventListener('scroll', () => onScroll(scrollY), { passive: true });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------------- Lenis (DNA90) */
  const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.09 });
  lenis.on('scroll', (e) => { ScrollTrigger.update(); onScroll(e.scroll); tickerSpeed(e.velocity); });
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;

  /* ---------------- ticker speed follows scroll velocity */
  const track = document.querySelector('[data-ticker-track]');
  const tickerAnim = track && track.getAnimations ? track.getAnimations()[0] : null;
  function tickerSpeed(v) {
    if (!tickerAnim) return;
    const rate = 1 + Math.min(Math.abs(v) * 0.35, 5);
    tickerAnim.playbackRate += (rate - tickerAnim.playbackRate) * 0.2;
  }
  gsap.ticker.add(() => { if (tickerAnim) tickerAnim.playbackRate += (1 - tickerAnim.playbackRate) * 0.04; });

  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];

  const bg = q('[data-hero-bg]'), name = q('[data-hero-name]'), since = q('[data-hero-since]');
  const car = q('[data-hero-car]'), trail = q('[data-hero-trail] path'), wipe = q('[data-hero-wipe]');
  const foot = q('[data-hero-foot]'), lines = qa('.callout__line'), labels = qa('.callout__label'), docs = qa('[data-doc]');

  /* ---------------- hero intro (every width): the colour car resolves out of the smoke */
  gsap.set(trail, { strokeDashoffset: 1 });
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro
    .from(bg, { autoAlpha: 0, scale: 1.05, duration: 1.6, ease: 'power2.out' }, 0)
    .from(since, { autoAlpha: 0, y: 12, duration: 0.8 }, 0.35)
    .from(name, { autoAlpha: 0, y: 40, duration: 1.2 }, 0.4)
    .from(car, { autoAlpha: 0, y: 30, filter: 'grayscale(1) brightness(.6)', duration: 1.4, ease: 'power3.out' }, 0.7)
    .from(lines, { scaleY: 0, duration: 0.9, stagger: 0.12, ease: 'power3.inOut' }, 1.1)
    .from(labels, { autoAlpha: 0, y: 6, duration: 0.6, stagger: 0.12 }, 1.6)
    .from(foot, { autoAlpha: 0, y: 16, duration: 0.8 }, 1.4);

  const mm = gsap.matchMedia();

  /* ================================================================ DESKTOP */
  mm.add('(min-width: 1000px)', () => {
    /* hero pin — the v2 grammar: hold → one accent → objects staggered → push → hold → release */
    gsap.set(docs, { autoAlpha: 0, y: 70 });
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: hero, start: 'top top', end: '+=170%', pin: true, scrub: 0.7, anticipatePin: 1 },
    });
    tl.to({}, { duration: 0.10 })                                                    // hold
      .to(trail, { strokeDashoffset: 0, duration: 0.20, ease: 'power2.inOut' })       // the accent
      .to(name, { opacity: 0.32, duration: 0.08 }, 0.30)
      .to(docs, { autoAlpha: 1, y: 0, duration: 0.10, stagger: 0.06, ease: 'power3.out' }, 0.30) // documents
      .to(foot, { autoAlpha: 0, y: 20, duration: 0.08 }, 0.32)
      .to(car, { scale: 1.08, transformOrigin: '50% 100%', duration: 0.20, ease: 'power2.inOut' }, 0.55) // push-in
      .to(bg, { scale: 1.05, duration: 0.20, ease: 'power2.inOut' }, 0.55)
      .to(trail, { opacity: 0, duration: 0.10 }, 0.58)
      .to(name, { opacity: 1, duration: 0.10 }, 0.62)
      .to({}, { duration: 0.10 }, 0.75)                                               // hold
      .to(docs, { autoAlpha: 0, y: -50, duration: 0.08, stagger: 0.02 }, 0.85)        // release
      .to([lines, labels], { autoAlpha: 0, duration: 0.06 }, 0.85)
      .fromTo(wipe, { x: 0, autoAlpha: 1 }, { x: () => name.offsetWidth, duration: 0.15, ease: 'power2.in', immediateRender: false }, 0.85)
      .fromTo(name, { clipPath: 'inset(-10% -10% -10% 0%)' }, { clipPath: 'inset(-10% -10% -10% 100%)', duration: 0.15, ease: 'power2.in', immediateRender: false }, 0.85)
      .to(wipe, { autoAlpha: 0, duration: 0.02 }, 0.99);

    /* the peak: the #76 arrives over its number; notes draw; hold */
    const peak = q('[data-peak-stage]');
    const ptl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: peak, start: 'top top', end: '+=130%', pin: true, scrub: 0.7, anticipatePin: 1 },
    });
    ptl.from(q('[data-peak-num]'), { scale: 0.86, opacity: 0, duration: 0.3, ease: 'power2.out' }, 0)
       .from(q('[data-peak-car]'), { scale: 0.84, xPercent: 8, duration: 0.45, ease: 'power2.out' }, 0) // never above native size
       .from(qa('[data-peak-note]'), { autoAlpha: 0, y: 14, duration: 0.12, stagger: 0.08 }, 0.35)
       .from(q('[data-peak-body]'), { autoAlpha: 0, y: 30, duration: 0.15 }, 0.55)
       .to({}, { duration: 0.3 });

    /* Le Mans: the B&W frame opens from a print to the full bleed */
    gsap.fromTo('[data-smoke]', { clipPath: 'inset(14% 10% 14% 10%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: '[data-smoke]', start: 'top 90%', end: 'top 15%', scrub: 0.6 },
    });

    /* ghost years drift against the scroll */
    qa('[data-ghost]').forEach((g) => gsap.fromTo(g, { yPercent: -12 }, {
      yPercent: 12, ease: 'none', scrollTrigger: { trigger: g.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    }));
  });

  /* ================================================================ PHONES */
  mm.add('(max-width: 999px)', () => {
    gsap.to(trail, { strokeDashoffset: 0, duration: 1.1, delay: 1.6, ease: 'power2.inOut' });
  });

  /* ================================================================ EVERY WIDTH */
  /* spine fills with the reading */
  gsap.fromTo('[data-spine-fill]', { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '[data-history]', start: 'top 55%', end: 'bottom 55%', scrub: true },
  });

  /* chapter reveals: head, body, documents and frames arrive once */
  qa('[data-ch]').forEach((ch) => {
    const items = qa('.ch__head, .ch__body:not([data-peak-body]), .smoke__text', ch);
    if (items.length) gsap.from(items, {
      autoAlpha: 0, y: 40, duration: 1, ease: 'expo.out', stagger: 0.12,
      scrollTrigger: { trigger: ch, start: 'top 72%', once: true },
    });
  });
  qa('[data-paper], [data-frame], [data-cutout]').forEach((el) => gsap.from(el, {
    autoAlpha: 0, y: 70, duration: 1.2, ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
  }));
  gsap.from('[data-gt] > *:not(.gt__floor)', {
    autoAlpha: 0, y: 30, duration: 1, ease: 'expo.out', stagger: 0.1,
    scrollTrigger: { trigger: '[data-gt]', start: 'top 70%', once: true },
  });

  /* fonts and images change heights: keep the triggers honest */
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
})();
