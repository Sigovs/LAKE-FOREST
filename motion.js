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
    nav.classList.toggle('is-small', y > 24);   /* the large logo settles to its header size as soon as the page moves */
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

  const photo = q('[data-hero-photo] video, [data-hero-photo] img'), copy = q('[data-hero-copy]');

  /* ---------------- hero intro: the photograph fades in at full size, the copy slides in from the left
     as a staircase: eyebrow, title, its second line, lead, then each button, every step a beat later */
  const heroSteps = [q('.hero__eyebrow', copy), q('.hero__title', copy), q('.hero__lead', copy), ...qa('.hero__ctas > *', copy)];
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from(photo, { autoAlpha: 0, duration: 1.6, ease: 'power2.out' }, 0)
    /* slower and longer than before so it reads as a slide, not a fade: the eyebrow from the side,
       the title up from under a mask, the lead and the button rise after it */
    .from(heroSteps[0], { autoAlpha: 0, x: -140, duration: 1.5, ease: 'power3.out' }, 0.5)
    .from(heroSteps[1], { autoAlpha: 0, y: 110, clipPath: 'inset(0 0 100% 0)', duration: 1.6, ease: 'power3.out' }, 0.65)
    .from(heroSteps.slice(2), { autoAlpha: 0, y: 50, duration: 1.4, stagger: 0.15, ease: 'power3.out' }, 0.95);

  const mm = gsap.matchMedia();

  /* ================================================================ DESKTOP */
  mm.add('(min-width: 1000px)', () => {
    /* hero exit: the photograph holds its size; only the copy lifts away */
    gsap.timeline({ defaults: { ease: 'none' },
      scrollTrigger: { trigger: q('[data-hero]'), start: 'top top', end: 'bottom top', scrub: 0.6 } })
      .to(copy, { y: -80, autoAlpha: 0 }, 0);

    /* hero: a small pointer parallax — the photograph drifts a few pixels against the cursor, the copy a little with it */
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const heroEl = q('[data-hero]'), pic = q('[data-hero-photo]');
      const px = gsap.quickTo(pic, 'x', { duration: 1.1, ease: 'power3.out' }), py = gsap.quickTo(pic, 'y', { duration: 1.1, ease: 'power3.out' });
      const cx = gsap.quickTo(copy, 'x', { duration: 1.3, ease: 'power3.out' });
      const onMove = (e) => { const r = heroEl.getBoundingClientRect(); if (r.bottom < 0) return;
        const nx = (e.clientX / innerWidth) * 2 - 1, ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        px(-nx * 16); py(-ny * 10); cx(nx * 6); };
      heroEl.addEventListener('pointermove', onMove);
      heroEl.addEventListener('pointerleave', () => { px(0); py(0); cx(0); });
    }

    /* chapter cards: no pin. The row scrolls sideways by itself (trackpad, shift + wheel, drag); the bar follows it */
    const vp = q('[data-cards-viewport]'), bar = q('[data-cards-bar]');
    if (vp && innerWidth < 700) {
      const sync = () => { const max = vp.scrollWidth - vp.clientWidth; gsap.set(bar, { scaleX: max > 0 ? Math.max(1 / 6, vp.scrollLeft / max) : 1 }); };
      vp.addEventListener('scroll', sync, { passive: true }); sync();
      let down = false, sx = 0, sl = 0, moved = false;
      vp.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = vp.scrollLeft; vp.classList.add('is-drag'); });
      addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; vp.scrollLeft = sl - dx; });
      addEventListener('pointerup', () => { down = false; vp.classList.remove('is-drag'); });
      vp.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    }


    /* pin stops on the full-bleed chapters: the frame is sticky (CSS), its title arrives and holds,
       then the chapter text rides over it as one solid layer */
    qa('[data-pinstop]').forEach((fig) => {
      const text = q('.bleed__text', fig);
      gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top top', end: '+=60%', scrub: 0.6, refreshPriority: -1 } })
        .fromTo(text, { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'power2.out', duration: 0.35 }, 0)
        .to(text.children, { y: -70, autoAlpha: 0, ease: 'power2.in', duration: 0.3, stagger: 0.06 }, 0.55);   /* leaves upward, line by line */
    });

    /* the family: one pinned screen. No block slides over another: on each step the current panel's
       elements leave upward one by one, then the next panel's elements arrive one by one. After the last
       panel its elements leave the same way, and the screen releases. A stop on every panel. */
    const dyn = q('[data-dyn-stage]');
    if (dyn) {
      const panels = qa('[data-dyn-panel]', dyn), steps = qa('[data-dyn-step]', dyn), n = panels.length;
      const items = (p) => qa('.dyn__head > *, .gen, :scope > .caption, .dyn__doc', p);
      const mark = (i) => steps.forEach((s, k) => s.classList.toggle('is-on', k === i));
      panels.slice(1).forEach((p) => gsap.set(items(p), { y: 60, autoAlpha: 0 }));
      gsap.set(panels, { autoAlpha: 1 });
      const units = n;                       // n-1 changes + 1 exit
      const dtl = gsap.timeline({ defaults: { ease: 'power2.inOut' },
        scrollTrigger: { trigger: dyn, start: 'top top', end: '+=' + units * 100 + '%', pin: true, scrub: 0.6, anticipatePin: 1,
          onUpdate: (st) => mark(Math.min(n - 1, Math.round(st.progress * units))) } });
      for (let k = 0; k < n; k++) {
        const out = items(panels[k]);
        dtl.to(out, { y: -60, autoAlpha: 0, duration: 0.3, stagger: 0.05 }, k + 0.15);
        if (k < n - 1) dtl.to(items(panels[k + 1]), { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.05 }, k + 0.5);
      }
      dtl.to(steps, { y: -40, autoAlpha: 0, duration: 0.25, stagger: 0.05 }, n - 1 + 0.45);
      const dST = dtl.scrollTrigger; let dSettle = 0;
      lenis.on('scroll', () => {
        clearTimeout(dSettle);
        const span = dST.end - dST.start, u = (lenis.scroll - dST.start) / span * units;
        if (u <= 0 || u >= n - 0.5) return;
        dSettle = setTimeout(() => {
          const i = Math.max(0, Math.min(n - 1, Math.round(u)));
          const target = dST.start + span * i / units;
          if (Math.abs(target - lenis.scroll) > 4) lenis.scrollTo(target, { duration: 0.8, easing: (t) => 1 - Math.pow(1 - t, 3) });
        }, 160);
      });
    }

    /* Skokie: the sign stops; the line appears in place and holds, then the page moves on */
    const sk = q('[data-skokie]');
    if (sk) gsap.timeline({ defaults: { ease: 'none' },
      scrollTrigger: { trigger: sk, start: 'top top', end: '+=90%', pin: true, scrub: 0.6, anticipatePin: 1 } })
      .fromTo(q('.bleed__text', sk).children, { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, stagger: 0.1, ease: 'power3.out' }, 0.05)
      .to({}, { duration: 0.5 });

    /* the swap: the white Spirit holds; the red GTP wipes in from the right over it, the Spirit drifts left and dims */
    const swap = q('[data-swap]');
    if (swap) {
      const A = q('[data-swap-a]', swap), B = q('[data-swap-b]', swap);
      /* one rule for both titles: each arrives from the right on its own frame, holds, then the frame changes */
      const tIn = { x: 0, autoAlpha: 1, duration: 0.2, ease: 'power2.out' };
      gsap.timeline({ defaults: { ease: 'none' },
        scrollTrigger: { trigger: swap, start: 'top top', end: '+=200%', pin: true, scrub: 0.6, anticipatePin: 1 } })
        .fromTo(q('.bleed__text', A), { x: 80, autoAlpha: 0 }, tIn, 0)
        .to({}, { duration: 0.2 }, 0.2)
        .to(q('.bleed__text', A), { x: -60, autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, 0.4)
        .fromTo(B, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 0.6, ease: 'power2.inOut' }, 0.45)
        .fromTo(q('img', B), { xPercent: 12 }, { xPercent: 0, duration: 0.6, ease: 'power2.out' }, 0.45)
        .fromTo(q('img', A), { xPercent: 0, filter: 'brightness(1)' }, { xPercent: -10, filter: 'brightness(0.45)', duration: 0.6, ease: 'power2.inOut' }, 0.45)
        .fromTo(q('.bleed__text', B), { x: 80, autoAlpha: 0 }, tIn, 0.95)
        .to({}, { duration: 0.25 }, 1.15)
        /* before the release the GTP title leaves upward, line by line, so the showroom rises over a clean frame */
        .to(q('.bleed__text', B).children, { y: -70, autoAlpha: 0, duration: 0.22, stagger: 0.06, ease: 'power2.in' }, 1.4)
        .to({}, { duration: 0.1 }, 1.68);
    }

    /* pin stops: each main section rests for a short beat when it reaches the top, so its slide-in plays
       while the page holds still. Short (about half a screen), never a multi-screen trap. */
    /* and on the way out of the stop, the section's parts leave upward one by one, scrubbed to the scroll */
    const parts = {
      '.cards': ['.cards__head .eyebrow', '.cards__head h2', '.card'],
      '.dyn':   ['.dyn__head .eyebrow', '.dyn__head h2', '.gen', '.dyn__panel > .caption'],
      '.peak':  ['.peak__eyebrow', '.peak__title', '[data-peak-car]', '[data-peak-body]'],
      '.era':   ['.era__head .eyebrow', '.era__head h2', '.era__pic', '.era__src', '.era__more'],
    };
    Object.entries(parts).forEach(([sel, list]) => {
      const el = q(sel); if (!el) return;
      const st = ScrollTrigger.create({ trigger: el, start: () => (el.offsetHeight > innerHeight - 80 ? 'bottom bottom' : 'top 80px'),
        end: '+=55%', pin: true, anticipatePin: 1, invalidateOnRefresh: true });
      const items = list.flatMap((s) => qa(s, el));
      gsap.timeline({ scrollTrigger: { trigger: el, start: () => st.start + innerHeight * 0.2, end: () => st.end, scrub: 0.6, invalidateOnRefresh: true } })
        .fromTo(items, { y: 0, autoAlpha: 1 }, { y: -90, autoAlpha: 0, stagger: 0.08, ease: 'power2.in', immediateRender: false });   /* always leave from the visible state */
    });   /* a tall section rests on its foot, a short one under the header */

    /* the peak: the page is already blue; the #76 drives in from the right, its number slides the other way */
    const peak = q('[data-peak-static]');
    if (peak) {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 1.4 } })
        .from(q('.peak__eyebrow'), { x: -140, autoAlpha: 0 }, 0)
        .from(q('.peak__title'), { y: 110, clipPath: 'inset(0 0 100% 0)', autoAlpha: 0, duration: 1.5 }, 0.12)
        .from(q('.peak__title span'), { x: -120, autoAlpha: 0 }, 0.35)
        .from(q('[data-peak-car]'), { xPercent: 22, autoAlpha: 0, duration: 1.6 }, 0.2)
        .from(q('[data-peak-body]'), { y: 60, autoAlpha: 0, duration: 1.2 }, 0.55);
      ScrollTrigger.create({ trigger: peak, start: 'top 70%', once: true, onEnter: () => tl.play() });
    }

    /* "Next — Le Mans": the frame stops, the line drives up, the CTA follows; on the way out it goes dark */
    const bp = q('[data-bleed-pin]');
    if (bp) gsap.timeline({ defaults: { ease: 'none' },
      scrollTrigger: { trigger: bp, start: 'top top', end: '+=120%', pin: true, scrub: 0.6, anticipatePin: 1 } })
      .fromTo(q('[data-bleed-text]', bp), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, 0)
      .fromTo(q('[data-bleed-cta]', bp), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power1.out' }, 0.18)
      .to({}, { duration: 0.25 })
      .to([q('[data-bleed-text]', bp), q('[data-bleed-cta]', bp)], { autoAlpha: 0, duration: 0.15 }, 0.62)
      .to(q('[data-bleed-dark]', bp), { opacity: 1, duration: 0.25 }, 0.6)
      /* the frame dissolves: the Le Mans film is already waiting underneath, in place */
      .to(bp, { autoAlpha: 0, duration: 0.15 }, 0.85);

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
    let factOn = 0;
    const setFact = (p) => { const i = Math.min(facts.length - 1, Math.floor(p * facts.length));
      if (i !== factOn) board.classList.toggle('is-back', i < factOn); factOn = i;   /* the marker's gradient leads in the direction it travels */
      facts.forEach((f, k) => f.classList.toggle('is-on', k === i)); board.style.setProperty('--p', i);
      board.style.setProperty('--mx', facts[i].offsetLeft + 'px'); board.style.setProperty('--mw', facts[i].offsetWidth + 'px'); };
    /* the speed readout climbs with the scroll and tops out at 218 on the 218 mph fact (fact 5 of 6) */
    const speedN = q('[data-speed-n]'), speedBox = q('[data-speed]');
    const setSpeed = (p) => { if (!speedN) return; const k = Math.min(1, Math.max(0, p / (4.5 / 6)));
      const v = Math.round(218 * (1 - Math.pow(1 - k, 2)));
      speedN.textContent = String(v).padStart(3, '0'); speedBox.classList.toggle('is-top', v >= 218); };
    setFact(0);
    addEventListener('resize', () => setFact((factOn + 0.5) / facts.length));
    const lm = gsap.timeline({ scrollTrigger: { trigger: '[data-lm-scene]', start: 'top top', end: '+=120%', scrub: 0.4,
      onUpdate: (st) => { setFact(Math.min(.999, st.progress / 0.9)); setSpeed(st.progress / 0.9); } } });

    const lmST = lm.scrollTrigger;

    /* the arrow skips the board: straight to the chapter text below it */
    const down = q('[data-lm-down]');
    const textTop = () => lenis.scroll + q('[data-lm-text]').getBoundingClientRect().top - (q('[data-nav]') ? q('[data-nav]').offsetHeight : 0);
    if (down) down.addEventListener('click', (e) => { e.preventDefault();
      lenis.scrollTo(textTop(), { duration: 1.4, easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), force: true,
        /* the pins re-measure on the way: settle on the text's live position */
        onComplete: () => { const t = textTop(); if (Math.abs(t - lenis.scroll) > 4) lenis.scrollTo(t, { duration: 0.5, force: true }); } }); });
    lm.to(lmScrub, { t: 1, ease: 'none', duration: 1.2 }, 0)
      /* as the camera closes in, the film softens and dims so the facts stay readable */
      .fromTo('[data-lm-video]', { filter: 'blur(0px) brightness(1)' }, { filter: 'blur(6px) brightness(0.6)', ease: 'power1.in', duration: 0.7 }, 0.75);

    /* the exit: the chapter text rides over the still frame; facts and title fade softly, the frame only dims */
    gsap.timeline({ defaults: { ease: 'none' },
      scrollTrigger: { trigger: '[data-lm-text]', start: 'top bottom', end: 'top 20%', scrub: 1 } })
      .to(qa('.fact'), { y: -90, '--out': 0, stagger: 0.1, duration: 0.35, ease: 'power2.in' }, 0)
      .fromTo('.facts', { '--rule': 1 }, { '--rule': 0, duration: 0.12, immediateRender: false }, 0)   /* the rule and its marker go first, before the facts lift (explicit start: an unset custom property reads back as 0) */
      .to('.lm__title', { autoAlpha: 0, duration: 0.5 }, 0)
      .to('.lm__down', { autoAlpha: 0, duration: 0.12 }, 0)
      .to('.lm__speed', { autoAlpha: 0, duration: 0.12 }, 0)
      .to('.lm__photo', { opacity: 0, duration: 1 }, 0);   /* gone by the time the text reaches the top: nothing shows through below it */

    qa('[data-ghost]').forEach((g) => gsap.fromTo(g, { yPercent: -12 }, {
      yPercent: 12, ease: 'none', scrollTrigger: { trigger: g.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    }));
  });

  /* ================================================================ EVERY WIDTH */
  /* LFSC and Lola: as the text layer rolls up over the photograph, its text floats up into place with it
     (scrubbed to the scroll, so it never plays ahead of the reader) */
  qa('.ch-full__body').forEach((body) => {
    gsap.fromTo(qa(':scope > .body, .ch-full__aside > :not([data-paper])', body),   /* the newspaper keeps its own entrance */ { y: 90, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, ease: 'power2.out', stagger: 0.12,
      scrollTrigger: { trigger: body, start: 'top 92%', end: 'top 30%', scrub: 0.6 },
    });
  });
  /* RPM Club: the two hosts close in from either side as the section comes up the screen */
  if (q('.rpm__hosts')) gsap.timeline({ scrollTrigger: { trigger: '.rpm__hosts', start: 'top 100%', end: 'top 20%', scrub: 1, refreshPriority: -1 } })   /* measured after the GT pin above it */
    .fromTo('.rpm__host--a', { xPercent: -14, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: 'power2.out' }, 0)
    .fromTo('.rpm__host--b', { xPercent: 14, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: 'power2.out' }, 0.08);
  /* ONE slide-in for every section head on the page, the same as the hero:
     the small line above comes in from the side, the heading rises from under a mask, its grey second line
     slides in from the side, then the text and the section's items rise one by one. Slow enough to see. */
  const slideHead = (head, items, start = 'top 78%') => {
    if (!head) return;
    const eyebrow = head.querySelector('.eyebrow, .peak__eyebrow, .lm__eyebrow');
    const heading = head.querySelector('h2');
    const tone = heading && heading.querySelector('span');
    const rest = [...head.querySelectorAll(':scope > p, :scope > .body, :scope > dl, :scope .lm__col > p, :scope .lm__col > .caption')].filter((el) => el !== eyebrow);
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 1.4 } });
    if (eyebrow) tl.from(eyebrow, { x: -140, autoAlpha: 0 }, 0);
    if (heading) tl.from(heading, { y: 100, clipPath: 'inset(0 0 100% 0)', autoAlpha: 0, duration: 1.5 }, 0.12);
    if (tone) tl.from(tone, { x: -120, autoAlpha: 0 }, 0.35);
    if (rest.length) tl.from(rest, { y: 60, autoAlpha: 0, stagger: 0.12, duration: 1.2 }, 0.45);
    if (items && items.length) tl.from(items, { y: 80, autoAlpha: 0, stagger: 0.1, duration: 1.3 }, 0.55);
    ScrollTrigger.create({ trigger: head, start, once: true, onEnter: () => tl.play(), refreshPriority: -1 });
  };
  slideHead(q('.cards__head'), qa('.card'));
  slideHead(q('.dyn__head'), qa('.gen'));
  slideHead(q('.lm__text'), [], 'top 70%');
  slideHead(q('.era__head'), qa('.era__pic, .era__more'));
  slideHead(q('.rpm__head'), qa('.ep, .ep-list > li'));
  slideHead(q('.ig__head'), qa('.ig__grid > li'));
  slideHead(q('.contact__head'), qa('.enquiry > *'));
  qa('[data-paper], [data-cutout]').forEach((el) => gsap.from(el, {
    autoAlpha: 0, y: 80, duration: 1.4, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
  }));
  /* the stage lights up with the scroll. The stage holds (pinned) on a dark frame; the left lamp strikes and
     its beam opens down to the car, then the right one; the words arrive once the car is lit, then it releases */
  const gtStage = q('[data-gt-stage]');
  gsap.set(gtStage, { '--la': '-10%', '--lb': '-10%' });   /* below zero: the soft edge too stays dark */
  gsap.timeline({ defaults: { ease: 'none' },
    scrollTrigger: { trigger: '[data-gt]', start: 'top top', end: '+=140%', pin: true, scrub: 0.8, anticipatePin: 1 } })   /* restored (Alex, 21 Oct): the stage holds while the lamps strike */
    .to({}, { duration: 0.08 }, 0)                                                                     /* dark, a beat */
    .to(gtStage, { '--la': '2%', duration: 0.05, ease: 'power4.out' }, 0.08)                           /* the left lamp strikes */
    .to(gtStage, { '--la': '100%', duration: 0.5, ease: 'power1.inOut' }, 0.16)                        /* its beam opens */
    .to(gtStage, { '--lb': '2%', duration: 0.05, ease: 'power4.out' }, 0.3)                            /* the right lamp */
    .to(gtStage, { '--lb': '100%', duration: 0.5, ease: 'power1.inOut' }, 0.38)
    .fromTo('.gt__dark', { filter: 'brightness(0.16) contrast(1.05)' }, { filter: 'brightness(0.3) contrast(1.05)', duration: 0.5 }, 0.38)
    .fromTo('.gt__top > *, .gt__bottom > *', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.18, stagger: 0.05, ease: 'power2.out' }, 0.8)
    .to({}, { duration: 0.2 }, 1.2);                                                                   /* hold lit, then release */

  /* fonts and images change heights: keep the triggers honest */
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
  /* lazy images arrive after load and change heights: re-measure once they settle */
  let reflow = 0;
  qa('img[loading="lazy"]').forEach((img) => { if (!img.complete) img.addEventListener('load', () => { clearTimeout(reflow); reflow = setTimeout(() => ScrollTrigger.refresh(), 200); }, { once: true }); });
})();
