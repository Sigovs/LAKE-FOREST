/* motion.js — Mancuso · Sketch D3 · motion layer (motion-designer, 2026-10-16)
 * Direction: docs/d3-key-scenes.md §3.4, §4.5, §5.4. The static page is complete without
 * this file (no-JS and reduced motion are the static page, DNA39 / MJ5 / MJ9).
 *
 * The page's grammar, set by motion: photographs PARK in front of the painted name — twice
 * (the 1953 sign, the #76) — and at the peak the order reverses once: the name rises in
 * front of the archive photograph as it contracts into a print.
 *
 * Roles (MJ1)                                                   method (DNA45)
 *   push   hero   narrative — the car keeps coming (1.00→1.08)    scroll-driven CSS (styles.css)
 *   paint  1953   narrative — the name is painted above the maker  phone: scroll-driven CSS
 *   join   1923→1953 desk: the wall empties, CHEVROLET drops       GSAP + ScrollTrigger, pin
 *          into its painted line, MANCUSO is painted above it,     (1923 frame held while the
 *          the sign parks in front                                 1953 frame rises over it)
 *   park   #76    hierarchy — the car parks in front of its number ScrollTrigger, no pin
 *   peak   transition — THE signature: the trailer photo contracts ScrollTrigger, pin ~1.4 vh
 *          into a print and BY / MANCUSO rises in front of it
 *
 * Every device is a pure function of scroll progress: any stop is a frame, reverse is the
 * same frames backwards, nothing snaps (MJ4, MJ6). Animated: transform, opacity, clip-path
 * only (DNA76). No photograph is ever shown twice or crossfaded. Desk (>=1000px) and phone
 * are authored separately (G5, MJ8): the phone has no pins.
 */
(() => {
  'use strict';
  const html = document.documentElement;
  const status = { version: 'd3-motion-1', lenis: false, mode: null, devices: [], pins: {}, ranges: {} };
  window.__motion = status; // checkable presence (MJ11)

  const { gsap, ScrollTrigger, Lenis } = window;
  const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Without GSAP the scroll layer still ships (DNA90), on its own rAF. */
  if (!gsap || !ScrollTrigger) {
    if (!reduceMq.matches && typeof Lenis === 'function') {
      window.lenis = new Lenis({ autoRaf: true, anchors: true });
      status.lenis = true;
      html.classList.add('has-lenis');
    }
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* ---- tokens (G4): read from the MOTION BLOCK in styles.css ------------------------ */
  const tok = (name) => getComputedStyle(html).getPropertyValue(name).trim();
  const tokNum = (name, fallback) => { const n = parseFloat(tok(name)); return Number.isFinite(n) ? n : fallback; };
  const tokEase = (name, fallback) => gsap.parseEase(tok(name) || fallback);

  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const seg = (p, a, b) => clamp01((p - a) / (b - a));
  const lerp = (a, b, t) => a + (b - a) * t;
  const r2 = (v) => Math.round(v * 100) / 100;

  /* One writer per element; it owns transform / opacity / clip-path of that element (G6)
     and only touches the DOM when a value actually changes. */
  const writer = (el) => {
    const last = {};
    const w = (prop, val) => { if (last[prop] !== val) { el.style[prop] = val; last[prop] = val; } };
    return {
      el,
      tf(x, y, s = 1) { w('transform', s === 1 && x === 0 && y === 0 ? 'none' : `translate3d(${r2(x)}px, ${r2(y)}px, 0) scale(${r2(s * 10000) / 10000})`); },
      op(o) { w('opacity', o >= 0.999 ? '' : String(r2(o))); },
      clip(v) { w('clipPath', v); },
      vis(v) { w('visibility', v); },
      origin(v) { w('transformOrigin', v); },
      reset() { ['transform', 'opacity', 'clipPath', 'visibility', 'transformOrigin'].forEach((p) => { el.style[p] = ''; delete last[p]; }); },
      clear() { el.style.transform = ''; delete last.transform; },
    };
  };
  const relRect = (el, base) => {
    const a = el.getBoundingClientRect(), b = base.getBoundingClientRect();
    return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height, r: a.right - b.left, b: a.bottom - b.top };
  };
  const textBox = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect(); };
  const hit = (a, b) => a.x < b.r && a.r > b.x && a.y < b.b && a.b > b.y;

  const mm = gsap.matchMedia();
  const pinTriggers = new Set();

  /* ======================================================================================
     1 · Lenis — the scroll layer (DNA90). Not constructed under reduced motion.
     ====================================================================================== */
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (typeof Lenis !== 'function') return undefined;
    const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.1, smoothWheel: true });
    const tick = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis;
    status.lenis = true;
    html.classList.add('has-lenis');

    /* Anchors. Lenis 1.3.26 (anchors: true) starts its smooth scroll on window but never
       cancels the browser's native hash jump, so the page snaps to the target for a frame
       and every scrub on the way flashes. Cancel the native jump here (document runs before
       window), scroll with Lenis, keep the URL. ui.js still moves focus (same click). The
       menu sheet handles its own links (it calls preventDefault first, so we skip those). */
    const onAnchor = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      const hash = a.getAttribute('href');
      const target = hash === '#top' ? 0 : document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target === null) return;
      e.preventDefault();
      e.stopPropagation(); // keeps Lenis's own window listener from starting a second scroll
      if (location.hash !== hash) history.pushState(null, '', hash);
      lenis.scrollTo(target);
    };
    document.addEventListener('click', onAnchor);

    return () => {
      document.removeEventListener('click', onAnchor);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      window.lenis = undefined;
      status.lenis = false;
      html.classList.remove('has-lenis');
    };
  });

  /* ======================================================================================
     2 · DESK (>= 1000 px): join · park · peak
     ====================================================================================== */
  mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
    const main = document.querySelector('main');
    if (!main) return undefined;
    const q = (sel, root = main) => root.querySelector(sel); // scoped (G2)
    const qa = (sel, root = main) => Array.from(root.querySelectorAll(sel));
    status.mode = 'desk';
    status.devices = ['push(css)'];
    html.classList.add('motion-desk');
    const cleanups = [];
    const writers = [];
    const W = (el) => { const w = writer(el); writers.push(w); return w; };
    const u = () => Math.min(document.documentElement.clientWidth, 1600) / 1440;

    /* ---------------------------------------------------------------- join: 1923 → 1953 */
    (() => {
      const wrap = q('[data-pin="s1s2"]');
      const s1 = wrap && q('[data-scene="1923"]', wrap);
      const s2 = wrap && q('[data-scene="1953"]', wrap);
      if (!s1 || !s2) return;
      const stmt = q('[data-statement="1923"]', s1);
      const wallC = q('[data-make="chevrolet"]', s1);
      const makes = qa('[data-make]', s1).filter((m) => m !== wallC);
      const cap = q('[data-makes] ~ .caption', s1);
      const lineM = q('[data-livery-line="mancuso"]', s2);
      const lineC = q('[data-livery-line="chevrolet"]', s2);
      const sign = q('[data-print="sign"]', s2);
      if (!stmt || !wallC || !lineM || !lineC || !sign) return;

      const wStmt = W(stmt), wCap = cap ? W(cap) : null, wWall = W(wallC);
      const wMakes = makes.map(W);
      const wM = W(lineM), wC = W(lineC), wSign = W(sign);
      wC.origin('0 0');

      const easeTravel = tokEase('--m-ease-travel', 'power2.inOut');
      const easePark = tokEase('--m-ease-park', 'power2.out');
      const fall = tokNum('--m-fall', 16);
      const lift = tokNum('--m-lift', 24);
      const parkMax = () => tokNum('--m-park-sign', 160) * u();

      /* the schedule (fractions of the held distance); the statement's exit is solved per
         geometry so that nothing ever crosses it while it is still visible */
      const T = { m0: 0.03, m1: 0.24, w0: 0.2, w1: 0.5, p0: 0.52, p1: 0.82, k0: 0.44, k1: 0.94, s0: 0.6, s1: 0.76 };
      let G = null;

      const measure = (st) => {
        [wC, wM, wSign, wStmt].forEach((w) => w.clear());
        const D = st.end - st.start; // the 1953 frame rises D px while 1923 is held
        const s1r = s1.getBoundingClientRect(), s2r = s2.getBoundingClientRect();
        const dTop = (s2r.top - s1r.top); // == D when unpinned; measured from the boxes
        // wall slot: baseline of the lit word, by a zero-size probe
        const probe = document.createElement('i');
        probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
        wallC.prepend(probe);
        const base = probe.getBoundingClientRect().top - s1r.top;
        probe.remove();
        const lc = lineC.getBoundingClientRect();
        const wallFs = parseFloat(getComputedStyle(wallC).fontSize);
        const lineFs = parseFloat(getComputedStyle(lineC).fontSize);
        const s = wallFs / lineFs; // cap-registered scale (cap/em identical across weights)
        const wallT = textBox(wallC), lineT = textBox(lineC), mT = textBox(lineM);
        const capC = lc.height; // text-box: trim-both cap alphabetic -> the box IS the cap
        const A = { x: wallT.left - s1r.left, y: base - s * capC, s };
        const slot = { x: lc.left - s1r.left, y: lc.top - s1r.top - (dTop - D), w: lineT.width, h: capC };
        const mRect = lineM.getBoundingClientRect();
        const M = { x: mRect.left - s1r.left, y: mRect.top - s1r.top - (dTop - D), w: mT.width, h: mRect.height };
        const signR = sign.getBoundingClientRect();
        const signY = signR.top - s1r.top - (dTop - D);
        const stR = relRect(stmt, s1);
        const stBox = { x: stR.x - 12, r: stR.r + 12, y: stR.y - 12, b: stR.b + 12 };
        G = { D, A, slot, M, signY, stBox, park: Math.max(parkMax(), slot.y + slot.h - signY + 16) };

        // solve the statement's exit: first progress at which the travelling word or the
        // painted part of MANCUSO would touch it
        let pHit = 0.8;
        for (let p = 0; p <= 1; p += 0.0025) {
          const wb = wordBox(p), mb = paintBox(p);
          if ((wb && hit(wb, stBox)) || (mb && hit(mb, stBox))) { pHit = Math.min(pHit, p); break; }
        }
        T.s1 = Math.max(0.12, pHit - 0.02);
        T.s0 = Math.max(0.06, T.s1 - 0.16);
        status.ranges.join = { start: Math.round(st.start), end: Math.round(st.end), statementExit: [r2(T.s0), r2(T.s1)] };
      };
      const travel = (p) => easeTravel(seg(p, T.w0, T.w1));
      const wordPos = (p) => {
        const { A, slot, D } = G;
        const t = travel(p);
        const B = { x: slot.x, y: slot.y - T.w1 * D };
        return { x: lerp(A.x, B.x, t), y: lerp(A.y, B.y, t), s: lerp(A.s, 1, t), t };
      };
      const wordBox = (p) => {
        const w = wordPos(p);
        return { x: w.x, y: w.y, r: w.x + G.slot.w * w.s, b: w.y + G.slot.h * w.s };
      };
      const paintBox = (p) => {
        const t = seg(p, T.p0, T.p1);
        if (t <= 0) return null;
        const y = G.M.y - p * G.D;
        return { x: G.M.x, y, r: G.M.x + G.M.w * t, b: y + G.M.h };
      };

      const render = (p) => {
        if (!G) return;
        const { D, slot } = G;
        // the dim makes fall away in the order they were sold; the caption with the last
        const n = wMakes.length;
        wMakes.forEach((w, i) => {
          const a = T.m0 + (i / n) * (T.m1 - T.m0) * 0.55;
          const t = seg(p, a, a + (T.m1 - T.m0) * 0.45);
          w.tf(0, fall * t); w.op(1 - t);
        });
        if (wCap) { const t = seg(p, T.m0 + (T.m1 - T.m0) * 0.5, T.m1); wCap.tf(0, fall * t); wCap.op(1 - t); }
        // the lit word IS the painted line, scaled into the wall (no swap mid-move)
        if (p >= T.w1) wC.tf(0, 0, 1);
        else {
          const w = wordPos(p);
          wC.tf(w.x - slot.x, w.y - (slot.y - p * D), w.s);
        }
        // MANCUSO, painted left → right (a sign-writer's stroke, linear)
        const pt = seg(p, T.p0, T.p1);
        wM.clip(pt >= 1 ? '' : `inset(-25% ${r2((1 - pt) * 100)}% -25% -3%)`);
        // 1923 statement lifts away before anything can reach it
        const st = seg(p, T.s0, T.s1);
        wStmt.tf(0, -lift * st); wStmt.op(1 - st);
        // the photographed sign parks in front of CHEVROLET's lower third
        const k = easePark(seg(p, T.k0, T.k1));
        wSign.tf(0, G.park * (1 - k));
      };

      wWall.vis('hidden'); // the painted line stands in its slot (identical cap, ≤1% advance)
      const st = ScrollTrigger.create({
        trigger: s1,
        start: 'top top',
        endTrigger: s2,
        end: 'top top',
        pin: s1,
        pinSpacing: false,
        invalidateOnRefresh: true,
        onRefresh: (self) => { measure(self); render(self.progress); },
        onUpdate: (self) => render(self.progress),
      });
      pinTriggers.add(st);
      status.pins.join = st;
      status.devices.push('join');
      cleanups.push(() => pinTriggers.delete(st));
    })();

    /* ---------------------------------------------------------------- park: the #76 */
    (() => {
      const s3 = q('[data-scene="76"]');
      const mez = s3 && q('[data-print="mezzacca"]', s3);
      const kerb = s3 && q('[data-kerb="76"]', s3);
      if (!mez) return;
      const wMez = W(mez);
      const easePark = tokEase('--m-ease-park', 'power2.out');
      let off = 0;
      const measure = () => {
        wMez.clear();
        const gap = kerb ? kerb.getBoundingClientRect().top - mez.getBoundingClientRect().bottom : 999;
        off = Math.max(0, Math.min(tokNum('--m-park-76', 80) * u(), gap - 16));
      };
      const render = (p) => wMez.tf(0, off * (1 - easePark(p)));
      const st = ScrollTrigger.create({
        trigger: mez,
        start: 'top bottom',
        endTrigger: s3,
        end: 'top top',
        invalidateOnRefresh: true,
        onRefresh: (self) => { measure(); render(self.progress); status.ranges.park76 = { start: Math.round(self.start), end: Math.round(self.end), off: Math.round(off) }; },
        onUpdate: (self) => render(self.progress),
      });
      status.devices.push('park76');
      cleanups.push(() => st.kill());
    })();

    /* ---------------------------------------------------------------- peak: the transition */
    (() => {
      const tr = q('[data-scene="transition"]');
      const photo = tr && q('[data-trailer]', tr);
      const box = tr && q('[data-evidence-box]', tr);
      const by = tr && q('[data-livery-line="by"]', tr);
      const bym = tr && q('[data-livery-line="by-mancuso"]', tr);
      const stmt = tr && q('[data-statement="family"]', tr);
      const note = tr && q('[data-annotation]', tr);
      if (!photo || !by || !bym || !stmt) return;
      const wPhoto = W(photo), wBox = box ? W(box) : null, wBy = W(by), wBym = W(bym), wSt = W(stmt), wNote = note ? W(note) : null;
      wPhoto.origin('0 0');
      const easeC = tokEase('--m-ease-contract', 'power1.inOut');
      const easeR = tokEase('--m-ease-rise', 'power2.out');
      const T = { c0: 0.16, c1: 0.6, b0: 0.48, b1: 0.6, y0: 0.26, y1: 0.56, m0: 0.32, m1: 0.62, t0: 0.38, t1: 0.66 };
      let G = null;
      const measure = (self) => {
        [wPhoto, wBy, wBym, wSt, wNote].forEach((w) => w && w.clear());
        const vh = window.innerHeight;
        const ph = relRect(photo, tr), byR = relRect(by, tr), bmR = relRect(bym, tr);
        const stT = textBox(stmt); const trTop = tr.getBoundingClientRect().top;
        const noteB = note ? relRect(note, tr).b : 0;
        const groupBottom = Math.max(stT.bottom - trTop, noteB);
        const gutter = byR.x;
        const s = tokNum('--m-print', 0.6);
        const d1 = Math.max(0, groupBottom - (vh - 24)); // the whole name group lifts by d1
        const d0 = Math.max(0, vh - byR.y + 24);          // …and starts below the fold
        const mTop = bmR.y - d1;
        const printBottom = mTop + bmR.h / 3;              // MANCUSO stands on the print's lower third
        const pw = ph.w * s, phh = ph.h * s;
        G = { s, d0, d1, tx: ph.w - gutter - pw, ty: printBottom - phh, pw, phh };
        status.ranges.peak = { start: Math.round(self.start), end: Math.round(self.end), print: [Math.round(G.tx), Math.round(G.ty), Math.round(pw), Math.round(phh)] };
      };
      const render = (p) => {
        if (!G) return;
        const c = easeC(seg(p, T.c0, T.c1));
        wPhoto.tf(G.tx * c, G.ty * c, lerp(1, G.s, c));
        if (wBox) wBox.op(seg(p, T.b0, T.b1));
        const rise = (a, b) => { const t = easeR(seg(p, a, b)); return lerp(G.d0, -G.d1, t); };
        wBy.tf(0, rise(T.y0, T.y1));
        wBym.tf(0, rise(T.m0, T.m1));
        const yt = rise(T.t0, T.t1);
        wSt.tf(0, yt);
        if (wNote) wNote.tf(0, yt);
      };
      const len = () => tokNum('--m-peak-pin', 1.4) * window.innerHeight;
      const st = ScrollTrigger.create({
        trigger: tr,
        start: 'top top',
        end: () => '+=' + Math.round(len()),
        pin: tr,
        pinSpacing: true,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        onRefresh: (self) => { measure(self); render(self.progress); },
        onUpdate: (self) => render(self.progress),
      });
      pinTriggers.add(st);
      status.pins.peak = st;
      status.devices.push('peak');
      cleanups.push(() => pinTriggers.delete(st));
    })();

    // ScrollTrigger reverts pins on refresh; our transforms are cleared in each measure()
    return () => {
      cleanups.forEach((f) => f());
      writers.forEach((w) => w.reset());
      html.classList.remove('motion-desk');
      status.mode = null;
      status.devices = [];
      status.pins = {};
      status.ranges = {};
    };
  });

  /* ======================================================================================
     3 · PHONE / TABLET (< 1000 px): no pins, no JS choreography. The hero push and the 1953
     paint run as scroll-driven CSS (styles.css, MOTION BLOCK) — lighter, authored, and
     off-main-thread. Recorded here so absence is checkable (MJ11).
     ====================================================================================== */
  mm.add('(max-width: 999px) and (prefers-reduced-motion: no-preference)', () => {
    status.mode = 'phone';
    status.devices = CSS.supports('animation-timeline: view()') ? ['push(css)', 'paint(css)'] : [];
    html.classList.add('motion-phone');
    return () => { html.classList.remove('motion-phone'); status.mode = null; status.devices = []; };
  });

  /* ======================================================================================
     4 · refresh strategy (G8): ScrollTrigger refreshes on resize itself; beyond that only
     when the document's height really changes (web font swap, a late image) — debounced.
     ====================================================================================== */
  const main = document.querySelector('main');
  let lastH = main ? main.offsetHeight : 0;
  let pending = 0;
  if (main && 'ResizeObserver' in window) {
    new ResizeObserver(() => {
      const h = main.offsetHeight;
      if (Math.abs(h - lastH) < 1) return;
      lastH = h;
      clearTimeout(pending);
      pending = setTimeout(() => ScrollTrigger.refresh(), 150);
    }).observe(main);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

  /* A deep link (#gt …) lands where the pinned layout puts it, not where the static one did. */
  window.addEventListener('load', () => {
    if (location.hash.length < 2) return;
    const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!t) return;
    const land = () => {
      if (window.lenis) window.lenis.scrollTo(t, { immediate: true, force: true });
      else t.scrollIntoView({ block: 'start' });
    };
    // re-land after any late geometry refresh (font swap, lazy image) for 2 s, unless the
    // reader has already started scrolling
    let userMoved = false;
    const mark = () => { userMoved = true; };
    ['wheel', 'touchstart', 'keydown'].forEach((ev) => window.addEventListener(ev, mark, { once: true, passive: true }));
    const onRefresh = () => { if (!userMoved) land(); };
    ScrollTrigger.addEventListener('refresh', onRefresh);
    setTimeout(() => ScrollTrigger.removeEventListener('refresh', onRefresh), 2000);
    ScrollTrigger.refresh();
    land();
  });
})();
