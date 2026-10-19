/* =====================================================================
   Mancuso — final sketch · motion
   Lenis on gsap.ticker (autoRaf off), not constructed under reduced motion.
   Desktop (>=1000px): hero push on exit, the Spirit drives in at Le Mans,
   peak pin on the #76, spine fill, chapter reveals.
   Phones: hero intro, reveals only, no pins.
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

  const photo = q('[data-hero-photo] img'), copy = q('[data-hero-copy]');

  /* ---------------- hero intro: the photograph settles, the copy arrives line by line */
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from(photo, { scale: 1.06, autoAlpha: 0, duration: 2.2, ease: 'power2.out' }, 0)
    .from(copy.children, { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.12 }, 0.5);

  const mm = gsap.matchMedia();

  /* ================================================================ DESKTOP */
  mm.add('(min-width: 1000px)', () => {
    /* hero exit: the camera keeps rolling toward the car while the copy lifts away */
    gsap.timeline({ defaults: { ease: 'none' },
      scrollTrigger: { trigger: q('[data-hero]'), start: 'top top', end: 'bottom top', scrub: 0.6 } })
      .to(photo, { scale: 1.08, transformOrigin: '70% 62%' }, 0)
      .to(copy, { y: -80, autoAlpha: 0 }, 0);

    /* the Spirit drives in, head-on, up to (never past) its native size */
    gsap.fromTo('[data-arrive] img', { scale: 0.55, yPercent: 30, autoAlpha: 0 }, {
      scale: 1, yPercent: 0, autoAlpha: 1, ease: 'power2.out',
      scrollTrigger: { trigger: '[data-arrive]', start: 'top 95%', end: 'center 55%', scrub: 0.6 },
    });

    /* the peak: the #76 arrives over its number; notes draw; hold */
    const peak = q('[data-peak-stage]');
    const ptl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: peak, start: 'top top', end: '+=130%', pin: true, scrub: 0.7, anticipatePin: 1 },
    });
    ptl.from(q('[data-peak-num]'), { scale: 0.86, opacity: 0, duration: 0.3, ease: 'power2.out' }, 0)
       .from(q('[data-peak-car]'), { scale: 0.84, xPercent: 8, duration: 0.45, ease: 'power2.out' }, 0)
       .from(qa('[data-peak-note]'), { autoAlpha: 0, y: 14, duration: 0.12, stagger: 0.08 }, 0.35)
       .from(q('[data-peak-body]'), { autoAlpha: 0, y: 30, duration: 0.15 }, 0.55)
       .to({}, { duration: 0.3 });

    /* Le Mans: the lines climb out of the smoke one after another, the facts arrive at their tips */
    const lm = gsap.timeline({ scrollTrigger: { trigger: '[data-lm-scene]', start: 'top top', end: '+=90%', pin: true, scrub: 0.6, anticipatePin: 1 } });
    lm.from('.fact__line', { scaleY: 0, transformOrigin: 'bottom center', stagger: 0.12, ease: 'power2.out' }, 0)
      .from('.fact p', { autoAlpha: 0, y: 8, stagger: 0.12, ease: 'power2.out' }, 0.25)
      .from('.lm__photo img', { scale: 1.06, transformOrigin: '50% 80%', ease: 'none', duration: 1.2 }, 0);

    qa('[data-ghost]').forEach((g) => gsap.fromTo(g, { yPercent: -12 }, {
      yPercent: 12, ease: 'none', scrollTrigger: { trigger: g.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    }));
  });

  /* ================================================================ EVERY WIDTH */
  /* spine fills with the reading */
  gsap.fromTo('[data-spine-fill]', { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '[data-history]', start: 'top 55%', end: 'bottom 55%', scrub: true },
  });

  /* chapter reveals: head, body, documents and frames arrive once */
  qa('[data-ch]').forEach((ch) => {
    const items = qa('.ch__head, .ch__body:not([data-peak-body]), .lm__text', ch);
    if (items.length) gsap.from(items, {
      autoAlpha: 0, y: 40, duration: 1, ease: 'expo.out', stagger: 0.12,
      scrollTrigger: { trigger: ch, start: 'top 72%', once: true },
    });
  });
  gsap.from('.cards__head, .card', {
    autoAlpha: 0, y: 40, duration: 1, ease: 'expo.out', stagger: 0.08,
    scrollTrigger: { trigger: '.cards', start: 'top 75%', once: true },
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
