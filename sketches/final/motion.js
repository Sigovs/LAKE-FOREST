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
    const lm = gsap.timeline({ scrollTrigger: { trigger: '[data-lm-scene]', start: 'top top', end: '+=140%', scrub: 0.6,
      onUpdate: (st) => setFact(Math.min(.999, st.progress / 0.85)) } });
    lm.to(lmScrub, { t: 1, ease: 'none', duration: 1.2 }, 0)
      /* as the camera closes in, the film softens and dims so the facts stay readable */
      .fromTo('[data-lm-video]', { filter: 'blur(0px) brightness(1)' }, { filter: 'blur(6px) brightness(0.6)', ease: 'power1.in', duration: 0.7 }, 0.75);

    /* the exit: the chapter text rides over the still frame; facts and title fade softly, the frame only dims */
    gsap.timeline({ defaults: { ease: 'none' },
      scrollTrigger: { trigger: '[data-lm-text]', start: 'top bottom', end: 'top 20%', scrub: 1 } })
      .to(qa('.fact').reverse(), { autoAlpha: 0, stagger: 0.08, duration: 0.5 }, 0)
      .to('.lm__title', { autoAlpha: 0, duration: 0.5 }, 0)
      .to('.lm__photo', { opacity: 0.35, duration: 1 }, 0);

    qa('[data-ghost]').forEach((g) => gsap.fromTo(g, { yPercent: -12 }, {
      yPercent: 12, ease: 'none', scrollTrigger: { trigger: g.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    }));
  });

  /* ================================================================ EVERY WIDTH */
  /* the spine: on desktop a winding racing line drawn down the history — straights, sweepers,
     a chicane — and the reading fills it; on phones the straight dashed line stays */
  const spine = q('.spine'), history = q('[data-history]');
  let trackSvg = null;
  const buildTrack = () => {
    if (!spine || !history) return;
    if (trackSvg) { trackSvg.remove(); trackSvg = null; }
    if (!matchMedia('(min-width: 1000px)').matches) { spine.classList.remove('spine--track'); qa('.history .tick').forEach((t) => { t.style.left = ''; }); return; }
    const H = history.offsetHeight, x0 = spine.offsetLeft + 1, A = 34;
    // a fixed lap: [kind, length in px, lateral shift]
    const lap = [['straight', 380, 0], ['sweep', 520, A], ['straight', 260, 0], ['chicane', 220, -A * .45], ['sweep', 600, -A * .9],
                 ['straight', 420, 0], ['hairpin', 360, A * 1.1], ['chicane', 200, -A * .4], ['sweep', 560, -A * .5], ['straight', 300, 0]];
    let y = 0, x = x0, i = 0, d = `M ${x0} 0`;
    while (y < H) {
      const [kind, len, dx] = lap[i++ % lap.length]; const y1 = Math.min(H, y + len); const x1 = Math.max(x0 - A, Math.min(x0 + A, x + dx));
      if (kind === 'straight') d += ` L ${x} ${y1}`;
      else if (kind === 'chicane') { const m = (y + y1) / 2; d += ` C ${x} ${y + 40}, ${x1} ${m - 40}, ${x1} ${m} S ${x} ${y1 - 30}, ${x} ${y1}`; }
      else d += ` C ${x} ${y + len * .45}, ${x1} ${y1 - len * .45}, ${x1} ${y1}`, x = x1;
      y = y1;
    }
    const ns = 'http://www.w3.org/2000/svg';
    trackSvg = document.createElementNS(ns, 'svg'); trackSvg.setAttribute('class', 'spine__track'); trackSvg.setAttribute('aria-hidden', 'true');
    trackSvg.setAttribute('width', x0 + A * 2 + 20); trackSvg.setAttribute('height', H);
    trackSvg.innerHTML = `<path class="spine__base" d="${d}"/><path class="spine__run" d="${d}"/>`;
    history.prepend(trackSvg); spine.classList.add('spine--track');
    const run = trackSvg.querySelector('.spine__run'), L = run.getTotalLength();
    run.style.strokeDasharray = L; run.style.strokeDashoffset = L; run.dataset.len = L;
    // year markers sit on the line
    const hb = history.getBoundingClientRect();
    qa('.history .tick').forEach((t) => {
      const ty = t.getBoundingClientRect().top + t.offsetHeight / 2 - hb.top; let best = 0, bd = 1e9;
      for (let s = 0; s <= L; s += 8) { const p = run.getPointAtLength(s); const dd = Math.abs(p.y - ty); if (dd < bd) { bd = dd; best = p.x; } }
      t.style.left = (best - 7.5) + 'px';
    });
  };
  ScrollTrigger.addEventListener('refresh', buildTrack);
  ScrollTrigger.create({ trigger: '[data-history]', start: 'top 55%', end: 'bottom 55%', onUpdate: (st) => {
    const run = trackSvg && trackSvg.querySelector('.spine__run'); if (run) run.style.strokeDashoffset = run.dataset.len * (1 - st.progress);
  } });
  gsap.fromTo('[data-spine-fill]', { scaleY: 0 }, { scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '[data-history]', start: 'top 55%', end: 'bottom 55%', scrub: true } });

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
  qa('[data-paper], [data-frame], [data-cutout]').forEach((el) => gsap.from(el, {
    autoAlpha: 0, y: 70, duration: 1.2, ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
  }));
  /* the stage lights come up, then the words */
  gsap.timeline({ scrollTrigger: { trigger: '[data-gt]', start: 'top 65%', once: true } })
    .from('.gt__stage img', { autoAlpha: 0, duration: 1.8, ease: 'power2.out' }, 0)
    /* the spotlight switches on: two short flickers, then it holds */
    .fromTo('[data-gt-light]', { opacity: 0 }, { keyframes: [{ opacity: .7, duration: .06 }, { opacity: .1, duration: .08 }, { opacity: .9, duration: .05 }, { opacity: .3, duration: .1 }, { opacity: 1, duration: .5 }], ease: 'none' }, 0.9)
    .from('.gt__top > *, .gt__bottom > *', { autoAlpha: 0, y: 24, duration: 1, ease: 'expo.out', stagger: 0.12 }, 0.5);

  /* fonts and images change heights: keep the triggers honest */
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
})();
