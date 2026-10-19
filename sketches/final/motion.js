/* =====================================================================
   Mancuso — final sketch · motion
   Lenis on gsap.ticker (autoRaf off), not constructed under reduced motion.
   Desktop (>=1000px): hero push on exit, the Spirit drives in at Le Mans,
   peak pin on the #76, chapter reveals.
   Phones: hero intro, reveals only, no pins.
   Static path: everything is laid out complete in CSS; motion only adds states.
   ===================================================================== */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('[data-nav]');
  const hero = document.querySelector('[data-hero]');

  /* ---------------- nav: solid after the hero, hides on scroll down */
  /* the header is locked: it never hides or resizes; it only gains a backing once past the hero */
  const onScroll = (y) => {
    nav.classList.toggle('is-solid', y > (hero ? hero.offsetHeight * 0.6 : 200));
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

    /* chapter cards: the page stops, the row travels sideways with the scroll */
    const track = q('[data-cards-track]'), vp = q('[data-cards-viewport]');
    const dist = () => Math.max(0, track.scrollWidth - (vp.clientWidth - parseFloat(getComputedStyle(vp).paddingLeft) * 2));
    gsap.timeline({ defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.cards', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true } })
      .to(track, { x: () => -dist() }, 0)
      .fromTo('[data-cards-bar]', { scaleX: 1 / 6 }, { scaleX: 1 }, 0);


    /* the peak: the page is already blue; the #76 drives in from the right, its number slides the other way */
    const peak = q('[data-peak-stage]');
    gsap.timeline({ defaults: { ease: 'none' },
      scrollTrigger: { trigger: peak, start: 'top top', end: '+=110%', pin: true, scrub: 0.7, anticipatePin: 1 } })
      .fromTo(q('[data-peak-car]'), { xPercent: 40, scale: 0.82, autoAlpha: 0 }, { xPercent: -6, scale: 1, autoAlpha: 1, duration: 0.55, ease: 'power2.out' }, 0)
      .fromTo(q('[data-peak-num]'), { xPercent: -18 }, { xPercent: 6, duration: 1 }, 0)
      .from(q('[data-peak-body]'), { autoAlpha: 0, y: 30, duration: 0.2 }, 0.45)
      .to({}, { duration: 0.25 });

    /* "Next — Le Mans": the frame stops, the line drives up, the CTA follows; on the way out it goes dark */
    const bp = q('[data-bleed-pin]');
    if (bp) gsap.timeline({ defaults: { ease: 'none' },
      scrollTrigger: { trigger: bp, start: 'top top', end: '+=120%', pin: true, scrub: 0.6, anticipatePin: 1 } })
      .fromTo(q('[data-bleed-text]', bp), { y: 120, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' }, 0)
      .fromTo(q('[data-bleed-cta]', bp), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.2, ease: 'power2.out' }, 0.18)
      .to({}, { duration: 0.25 })
      .to([q('[data-bleed-text]', bp), q('[data-bleed-cta]', bp)], { y: -40, autoAlpha: 0, duration: 0.15 }, 0.62)
      .to(q('[data-bleed-dark]', bp), { opacity: 1, duration: 0.3 }, 0.62);

    /* Le Mans: the film's push-in is driven by the scroll (all-intra encode, so seeking is smooth) */
    const vid = q('[data-lm-video]'); const lmScrub = { t: 0 };
    if (vid) {
      vid.pause();
      /* load the film whole: seeking then works on any server, with or without range requests */
      fetch(vid.querySelector('source').src).then(r => r.blob()).then(b => { vid.src = URL.createObjectURL(b); vid.load(); }).catch(() => {});
      gsap.ticker.add(() => {
      if (!vid.duration) return; const want = lmScrub.t * (vid.duration - 0.05);
      if (Math.abs(vid.currentTime - want) > 0.02 && !vid.seeking) vid.currentTime = want; }); }

    /* Le Mans: the lines climb out of the smoke one after another, the facts arrive at their tips */
    /* the scene stays pinned without a spacer of its own: a 140vh spacer gives the film its run,
       then the chapter text slides up OVER the pinned frame */
    ScrollTrigger.create({ trigger: '[data-lm-scene]', start: 'top top', endTrigger: '[data-lm-text]', end: 'top top', pin: true, pinSpacing: false, anticipatePin: 1 });
    /* the timing board follows the film: one fact lit at a time, the marker runs along the rule */
    const facts = qa('[data-fact]'), board = q('.facts');
    const setFact = (p) => { const i = Math.min(facts.length - 1, Math.floor(p * facts.length));
      facts.forEach((f, k) => f.classList.toggle('is-on', k === i)); board.style.setProperty('--p', i); };
    setFact(0);
    const lm = gsap.timeline({ scrollTrigger: { trigger: '[data-lm-scene]', start: 'top top', end: '+=320%', scrub: 0.6,
      onUpdate: (st) => setFact(Math.min(.999, st.progress / 0.9)) } });

    /* a stop on every fact: when the wheel rests inside the board, the page settles on the nearest fact */
    const lmST = lm.scrollTrigger; let settle = 0;
    lenis.on('scroll', ({ scroll, velocity }) => {
      clearTimeout(settle);
      if (scroll <= lmST.start || scroll >= lmST.start + (lmST.end - lmST.start) * 0.9) return;
      settle = setTimeout(() => {
        const span = (lmST.end - lmST.start) * 0.9, n = facts.length;
        const i = Math.max(0, Math.min(n - 1, Math.round(((lenis.scroll - lmST.start) / span) * n - 0.5)));
        const target = lmST.start + span * (i + 0.5) / n;
        if (Math.abs(target - lenis.scroll) > 4) lenis.scrollTo(target, { duration: 0.7, easing: (t) => 1 - Math.pow(1 - t, 3) });
      }, 160);
    });
    lm.to(lmScrub, { t: 1, ease: 'none', duration: 1.2 }, 0)
      /* as the camera closes in, the film softens and dims so the facts stay readable */
      .fromTo('[data-lm-video]', { filter: 'blur(0px) brightness(1)' }, { filter: 'blur(6px) brightness(0.6)', ease: 'power1.in', duration: 0.7 }, 0.75);

    /* the exit: the chapter text rides over the still frame; facts and title fade softly, the frame only dims */
    gsap.timeline({ defaults: { ease: 'none' },
      scrollTrigger: { trigger: '[data-lm-text]', start: 'top bottom', end: 'top 20%', scrub: 1 } })
      .to(qa('.fact'), { y: -90, '--out': 0, stagger: 0.1, duration: 0.35, ease: 'power2.in' }, 0)
      .to('.facts', { '--rule': 0, duration: 0.3 }, 0.5)
      .to('.lm__title', { autoAlpha: 0, duration: 0.5 }, 0)
      .to('.lm__photo', { opacity: 0.35, duration: 1 }, 0);

    qa('[data-ghost]').forEach((g) => gsap.fromTo(g, { yPercent: -12 }, {
      yPercent: 12, ease: 'none', scrollTrigger: { trigger: g.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    }));
  });

  /* ================================================================ EVERY WIDTH */
  /* chapter reveals: head, body, documents and frames arrive once */
  qa('[data-ch]').forEach((ch) => {
    const items = qa('.ch__head, .ch__body:not([data-peak-body]), .lm__text', ch);
    if (items.length) gsap.from(items, {
      autoAlpha: 0, y: 40, duration: 1, ease: 'expo.out', stagger: 0.12,
      scrollTrigger: { trigger: ch, start: 'top 72%', once: true },
    });
  });
  gsap.from('.cards__head, .card', {
    autoAlpha: 0, y: 40, duration: 1, ease: 'expo.out', stagger: 0.07,
    scrollTrigger: { trigger: '.cards', start: 'top 75%', once: true },
  });
  gsap.from('[data-gen]', { autoAlpha: 0, y: 40, duration: 1.1, ease: 'expo.out', stagger: 0.12,
    scrollTrigger: { trigger: '.gens', start: 'top 80%', once: true } });
  gsap.from('.jim__head, .jim__quote', { autoAlpha: 0, y: 40, duration: 1.1, ease: 'expo.out', stagger: 0.15,
    scrollTrigger: { trigger: '.jim', start: 'top 72%', once: true } });
  qa('[data-paper], [data-frame], [data-cutout]').forEach((el) => gsap.from(el, {
    autoAlpha: 0, y: 70, duration: 1.2, ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
  }));
  /* the stage lights come up, then the words */
  gsap.timeline({ scrollTrigger: { trigger: '[data-gt]', start: 'top 65%', once: true } })
    .from('.gt__stage img', { autoAlpha: 0, duration: 1.8, ease: 'power2.out' }, 0)
    .from('.gt__top > *, .gt__bottom > *', { autoAlpha: 0, y: 24, duration: 1, ease: 'expo.out', stagger: 0.12 }, 0.5);

  /* fonts and images change heights: keep the triggers honest */
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
})();
