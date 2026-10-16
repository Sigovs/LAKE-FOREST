/* LFSC · Sketch D2 — motion module (motion-designer). Spec: docs/scene-sequence-d2.md §2–§5.
 *
 * Concept carried: the page holds the Mancuso name still while each generation's machine
 * changes around it, until the line painted on the trailer becomes the GT's own.
 *
 * Roles (MJ1), bound to data-* hooks rather than to section names (MJ11):
 *   push   S0  narrative progression — the camera closes on the family's car (pin 60vh)
 *   makes  S1  progression + hierarchy — the makes pass; "Chevrolet" lights on H
 *   relay  S2  continuity — sign → transporter → #76: the name holds on H (pin 180vh)
 *   planes S2  spatial explanation — the crew on a nearer plane than the master
 *   pass   S3  subject expression — the car comes, the car has gone (scroll-driven CSS)
 *   reel   S4  narrative progression — the cars run past on one line of lettering (pin 160vh)
 *   lift   S6  continuity, THE signature — the painted line becomes set type (pin 240vh)
 *
 * Every sequence ends on the static composition, which is also the no-JS and the
 * reduced-motion page (G7, MJ5, MJ9). Phone is authored separately: no pins (MJ8, G5).
 * Animated properties: transform, opacity, clip-path (DNA76). Scroll owns every scrub.
 */
(() => {
  'use strict';
  const { gsap, ScrollTrigger, Lenis } = window;
  if (!gsap || !ScrollTrigger) return; // the static build stands on its own

  gsap.registerPlugin(ScrollTrigger);
  const html = document.documentElement;
  const root = document.querySelector('main');
  if (!root) return;

  /* ---- tokens, read from the MOTION BLOCK in sketch.css (G4) --------------- */
  const raw = (name) => getComputedStyle(html).getPropertyValue(name).trim();
  const num = (name) => {
    const r = raw(name);
    const n = parseFloat(r);
    if (r.endsWith('vh')) return (n * window.innerHeight) / 100;
    if (r.endsWith('ms')) return n / 1000;
    return n;
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  const status = { lenis: false, mode: null, devices: [], pins: {} }; // checkable absence (MJ11)
  window.__motion = status;
  const pinTriggers = new Set();
  const anchorY = { fn: null }; // desk mode: where an anchor really lands (the GT is the pin's end)

  const mm = gsap.matchMedia();

  /* ======================================================================
     1 · Lenis — the scroll layer (DNA90), the nav, anchors
     ====================================================================== */
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (!Lenis) return;
    const lenis = new Lenis({ autoRaf: false, anchors: true });
    const tick = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis;
    status.lenis = true;
    html.classList.add('has-lenis');

    /* the nav: hidden on scroll-down and while a stage is pinned (light frames would
       fail its contrast, and it would sit on the composition); back on scroll-up. */
    const nav = document.querySelector('[data-nav]');
    let dir = 0;
    const setNav = (scroll) => {
      if (!nav) return;
      const top = scroll < 8;
      const pinned = [...pinTriggers].some((st) => st.isActive);
      const focused = nav.contains(document.activeElement);
      const hide = !top && !focused && (pinned || dir > 0);
      nav.classList.toggle('is-hidden', hide);
      nav.classList.toggle('is-floating', !top);
    };
    const onScroll = (l) => {
      if (l.direction) dir = l.direction;
      setNav(l.scroll);
    };
    lenis.on('scroll', onScroll);
    const onNavFocus = () => setNav(lenis.scroll);
    nav && nav.addEventListener('focusin', onNavFocus);

    /* anchors: Lenis 1.3.26 starts its own smooth scroll but leaves the browser's native
       hash jump in place (a one-frame snap to the target that flashes every scrub on the
       way). Cancel the native jump only. Where the target sits inside a pinned stage (the
       GT is the lift's end frame) the scroll goes to the pin's end, not the element's top. */
    const onAnchor = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.hash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      history.pushState(null, '', a.hash);
      const y = anchorY.fn && anchorY.fn(target);
      if (y != null) {
        e.stopPropagation(); // keeps Lenis's own window listener from going to the element top
        lenis.scrollTo(y);
      }
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onAnchor);

    return () => {
      document.removeEventListener('click', onAnchor);
      nav && nav.removeEventListener('focusin', onNavFocus);
      nav && nav.classList.remove('is-hidden', 'is-floating');
      html.classList.remove('has-lenis');
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      window.lenis = undefined;
      status.lenis = false;
    };
  });

  /* ======================================================================
     2 · the scenes — desk and phone authored separately (G5)
     ====================================================================== */
  mm.add(
    {
      desk: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
      phone: '(max-width: 899px) and (prefers-reduced-motion: no-preference)',
    },
    (ctx) => {
      const { desk, phone } = ctx.conditions;
      if (!desk && !phone) return;
      const q = gsap.utils.selector(root); // scoped (G2)
      const one = (sel) => q(sel)[0];
      const made = []; // runtime-only nodes
      const undo = []; // attribute / class restores
      const add = (name) => status.devices.push(name);
      html.classList.add('has-motion', desk ? 'motion-desk' : 'motion-phone');
      status.mode = desk ? 'desk' : 'phone';
      const pin = (name, st) => {
        pinTriggers.add(st);
        status.pins[name] = st;
        return st;
      };

      /* images in a stage that is clipped sideways or stacked are not "near the viewport"
         to the lazy loader until they are already on screen: load them a screen early */
      const eagerOn = (trigger, imgs) => {
        ScrollTrigger.create({
          trigger, start: 'top bottom+=100%', once: true,
          onEnter: () => imgs.forEach((img) => { img.loading = 'eager'; }),
        });
      };

      /* S1 · the make that lights. The ink copy is runtime-only, so the static page
         (Chevrolet already in ink) never contains it. */
      const chev = one('[data-hold="chevrolet"]');
      let setLit = () => {};
      if (chev) {
        chev.classList.remove('is-lit');
        undo.push(() => chev.classList.add('is-lit'));
        const ink = document.createElement('span');
        ink.className = 'hold-ink';
        ink.setAttribute('aria-hidden', 'true');
        ink.textContent = chev.textContent;
        chev.appendChild(ink);
        made.push(ink);
        setLit = (on) => ink.classList.toggle('is-on', on);
      }

      if (desk) {
        /* ---------------------------------------------------------- S0 push */
        const s0 = one('[data-pin="hero"]');
        const media = s0.querySelector('[data-push]');
        const copy = s0.querySelector('[data-exit]');
        const heroImg = media.querySelector('img');
        // the push needs the 2400 file at every desk width (it is preloaded at ≥ 900 anyway)
        const oldSizes = heroImg.getAttribute('sizes');
        heroImg.setAttribute('sizes', '138vw');
        undo.push(() => heroImg.setAttribute('sizes', oldSizes));
        const onHeroLoad = () => ScrollTrigger.refresh();
        heroImg.addEventListener('load', onHeroLoad);
        undo.push(() => heroImg.removeEventListener('load', onHeroLoad));
        // never above native: object-fit cover scale × push ≤ 1
        const pushTo = () => {
          const want = parseFloat(media.dataset.pushTo) || 1.38;
          const nw = heroImg.naturalWidth || 2400;
          const nh = heroImg.naturalHeight || 1609;
          const cover = Math.max(heroImg.offsetWidth / nw, heroImg.offsetHeight / nh);
          return Math.max(1, Math.min(want, 1 / cover));
        };
        gsap.set(media, { transformOrigin: media.dataset.pushOrigin || '70% 66%' });
        const heroTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: s0, start: 'top top', end: () => '+=' + num('--pin-hero'),
            pin: true, scrub: true, invalidateOnRefresh: true,
          },
        });
        heroTl
          .fromTo(media, { scale: 1 }, { scale: () => pushTo(), ease: raw('--ease-camera'), duration: 0.85 }, 0)
          .to({}, { duration: 0.15 }, 0.85); // hold on the car among the crowd
        pin('hero', heroTl.scrollTrigger);
        // DNA95 exit: the copy alone rises and fades over the first 40% of the pin.
        // (Measured off the pin itself: a second trigger on a pinned element starts after it.)
        const heroST = heroTl.scrollTrigger;
        gsap.fromTo(copy, { y: 0, opacity: 1 }, {
          y: () => -num('--dist-exit'), opacity: 0, ease: 'none',
          scrollTrigger: {
            trigger: s0, start: () => heroST.start, end: () => heroST.start + 0.4 * num('--pin-hero'),
            scrub: num('--scrub-text'), invalidateOnRefresh: true,
          },
        });
        add('push');

        /* ---------------------------------------------------------- S1 makes */
        const makes = one('[data-makes]');
        const track = makes && makes.querySelector('[data-makes-track]');
        if (track && chev) {
          /* The decades run fast; the family's make slows as it crosses H, lights, and the
             line runs on. Velocity is one smooth profile (fast · raised-cosine dip to
             SLOW · fast), integrated once, so there is no jolt at the hold. */
          const SLOW = 0.3; // speed at the hold, as a fraction of the running speed
          const HALF = 0.18; // half-width of the dip, in scroll progress
          const N = 400;
          const profile = (pc) => {
            const X = [0];
            for (let i = 1; i <= N; i++) {
              const p = (i - 0.5) / N;
              const d = Math.abs(p - pc);
              const dip = d < HALF ? 0.5 * (1 + Math.cos((Math.PI * d) / HALF)) : 0;
              X.push(X[i - 1] + (1 - (1 - SLOW) * dip) / N);
            }
            const tot = X[N];
            return X.map((v) => v / tot);
          };
          const at = (X, p) => {
            const f = clamp(p, 0, 1) * N;
            const i = Math.min(N - 1, Math.floor(f));
            return lerp(X[i], X[i + 1], f - i);
          };
          const m = { travel: 0, x: 0, pc: 0.4, X: profile(0.4) };
          const measure = () => {
            m.travel = Math.max(0, track.scrollWidth - makes.clientWidth);
            const r = chev.getBoundingClientRect();
            const c0 = r.left + r.width / 2 - m.x; // untransformed centre
            const want = m.travel ? clamp((c0 - 0.25 * html.clientWidth) / m.travel, 0, 1) : 0;
            // find the dip centre whose integrated position puts Chevrolet on H there
            let lo = 0, hi = 1;
            for (let k = 0; k < 24; k++) {
              const mid = (lo + hi) / 2;
              if (at(profile(mid), mid) < want) lo = mid; else hi = mid;
            }
            m.pc = (lo + hi) / 2;
            m.X = profile(m.pc);
          };
          measure();
          undo.push(() => { track.style.transform = ''; });
          const run = { p: 0 };
          const render = () => {
            m.x = -m.travel * at(m.X, run.p);
            track.style.transform = `translate3d(${m.x}px, 0, 0)`;
            setLit(run.p >= m.pc);
          };
          gsap.to(run, {
            p: 1, ease: 'none', onUpdate: render,
            scrollTrigger: {
              trigger: makes, start: 'top bottom', end: 'bottom top', scrub: true,
              onRefreshInit: () => { m.x = 0; track.style.transform = ''; },
              onRefresh: () => { measure(); render(); },
            },
          });
          add('makes');
        }

        /* ---------------------------------------------------------- S2 relay */
        const relay = one('[data-pin="relay"]');
        if (relay) {
          const F = (n) => relay.querySelector(`[data-frame="${n}"]`);
          const [sign, truck, nat, whole] = ['sign', 'truck', '76-native', '76-whole'].map(F);
          const ph = (f) => f.querySelector('.frame__photo');
          const cap = (f) => f.querySelector('[data-caption]');
          const rick = sign.querySelector('[data-exit]');
          const signImg = sign.querySelector('img');
          const natImg = nat.querySelector('img');
          const wholeImg = whole.querySelector('img');
          const g = { clip: 'inset(0px 0px 0px 0px)', x: 0, y: 0, s: 1 };
          const measure = () => {
            const p = ph(truck);
            const W = p.clientWidth;
            const H = p.clientHeight;
            const l = signImg.offsetLeft;
            const t = signImg.offsetTop;
            const w = signImg.offsetWidth;
            const h = signImg.offsetHeight;
            // the transporter appears inside the sign's own rectangle
            g.clip = `inset(${Math.max(0, t)}px ${Math.max(0, W - l - w)}px ${Math.max(0, H - t - h)}px ${Math.max(0, l)}px)`;
            // dolly out: the native #76 lands exactly on the whole-car frame (same file)
            g.s = wholeImg.offsetWidth / natImg.offsetWidth;
            g.x = wholeImg.offsetLeft - natImg.offsetLeft;
            g.y = wholeImg.offsetTop - natImg.offsetTop;
          };
          measure();
          gsap.set([ph(truck), ph(nat), ph(whole), cap(truck), cap(nat), cap(whole)], { opacity: 0 });
          const full = 'inset(0px 0px 0px 0px)';
          const cam = raw('--ease-camera');
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: relay, start: 'top top', end: () => '+=' + num('--pin-relay'),
              pin: true, scrub: true, invalidateOnRefresh: true, onRefreshInit: measure,
            },
          });
          tl
            // 0–20 hold: the sign at native, its panel on H; Rick's chapter read
            .fromTo(rick, { y: 0, opacity: 1 }, { y: () => -num('--dist-exit'), opacity: 0, duration: 0.1 }, 0.2)
            // 30–55 relay I: the transporter inside the sign's rectangle, its lettering on H, bigger
            .to(cap(sign), { opacity: 0, duration: 0.03 }, 0.3)
            .to(ph(truck), { opacity: 1, duration: 0.06 }, 0.3)
            .to(cap(truck), { opacity: 1, duration: 0.03 }, 0.33)
            .to(ph(sign), { opacity: 0, duration: 0.02 }, 0.36)
            .fromTo(ph(truck), { clipPath: () => g.clip }, { clipPath: full, duration: 0.19, ease: cam }, 0.36)
            // 55–65 hold the transporter
            // 65–72 relay II, the match cut: the hood's lettering arrives on the same point
            .to(ph(nat), { opacity: 1, duration: 0.07 }, 0.65)
            .to(cap(truck), { opacity: 0, duration: 0.03 }, 0.65)
            .to(cap(whole), { opacity: 1, duration: 0.03 }, 0.69)
            // the transporter leaves once the #76 covers it, so the dolly opens onto ground,
            // not onto the previous frame (it showed through under the whole-car strip)
            .to(ph(truck), { opacity: 0, duration: 0.02 }, 0.70)
            // 72–86 dolly out to the whole car
            .fromTo(natImg, { x: 0, y: 0, scale: 1 }, { x: () => g.x, y: () => g.y, scale: () => g.s, duration: 0.14, ease: cam }, 0.72)
            .set(ph(whole), { opacity: 1 }, 0.86)
            .set(ph(nat), { opacity: 0 }, 0.86)
            // 86–100 hold the master; the crew's nearest print rises over it
            .to({}, { duration: 0.14 }, 0.86);
          pin('relay', tl.scrollTrigger);
          eagerOn(relay, [truck, nat, whole].map((f) => f.querySelector('img')));
          add('relay');

          // the crew: inserts on a nearer plane — they travel faster than the master and
          // land on the composed positions above the middle of the screen
          q('[data-plane="near"]').forEach((el) => {
            gsap.fromTo(el, { y: () => num('--dist-near') }, {
              y: 0, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'center 55%', scrub: true, invalidateOnRefresh: true },
            });
          });
          add('planes');
        }

        /* ---------------------------------------------------------- S3 pass */
        const pass = one('[data-pass]');
        if (pass) {
          const rear = pass.querySelector('[data-pass-frame="rear"]');
          if (window.CSS && CSS.supports('animation-timeline: view()')) {
            html.classList.add('pass-css'); // scroll-driven CSS (DNA45): no script in the loop
            undo.push(() => html.classList.remove('pass-css'));
          } else if (rear) {
            gsap.fromTo(rear, { opacity: 0 }, {
              opacity: 1, ease: 'none',
              scrollTrigger: { trigger: pass, start: 'center 75%', end: 'center 25%', scrub: true },
            });
          }
          add('pass');
        }

        /* ---------------------------------------------------------- S4 reel */
        const s4 = one('[data-pin="reel"]');
        const reel = s4 && s4.querySelector('[data-reel]');
        const rtrack = reel && reel.querySelector('[data-reel-track]');
        if (rtrack) {
          // on desk the reel is not a scroller; Lenis must keep the wheel over it
          reel.removeAttribute('data-lenis-prevent');
          undo.push(() => reel.setAttribute('data-lenis-prevent', ''));
          const r = { travel: 0 };
          const measure = () => {
            const last = rtrack.lastElementChild;
            const right = reel.clientWidth - (html.clientWidth - s4.getBoundingClientRect().right) - 64 * Math.min(1, html.clientWidth / 1440);
            r.travel = Math.max(0, last.offsetLeft + last.offsetWidth - right);
          };
          measure();
          const tw = gsap.fromTo(rtrack, { x: 0 }, {
            x: () => -r.travel, ease: 'none',
            scrollTrigger: {
              trigger: s4, start: 'top top', end: () => '+=' + num('--pin-reel'),
              pin: true, scrub: num('--scrub-reel'), invalidateOnRefresh: true, onRefreshInit: measure,
            },
          });
          pin('reel', tw.scrollTrigger);
          eagerOn(s4, [...rtrack.querySelectorAll('img')]);
          add('reel');
        }

        /* ---------------------------------------------------------- S6 lift */
        const peak = root.querySelector('[data-pin="lift"]');
        const tImg = peak && peak.querySelector('img.trailer');
        if (tImg) buildLift(peak, tImg);

        /* S5 → preload the peak's asset as the scene before it enters (doc §S6) */
        const pre = one('[data-preload-peak]');
        if (pre && tImg) {
          eagerOn(pre, [tImg, peak.querySelector('[data-print] img')]);
        }
      }

      if (phone) {
        /* S0 drift: 1.00 → 1.06 while the window passes; no pin */
        const media = one('[data-push]');
        const img = media && media.querySelector('img');
        if (img) {
          const to = () => {
            const want = num('--drift-phone') || 1.06;
            const cap = (img.naturalWidth || 1100) / img.offsetWidth;
            return Math.max(1, Math.min(want, cap));
          };
          gsap.fromTo(img, { scale: 1 }, {
            scale: () => to(), transformOrigin: '50% 62%', ease: 'none',
            scrollTrigger: { trigger: media, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
          });
          add('drift');
        }
        /* S1: the makes wrap; "Chevrolet" lights once its line is in the reading band */
        if (chev) {
          ScrollTrigger.create({
            trigger: chev, start: 'center 62%',
            onEnter: () => setLit(true), onLeaveBack: () => setLit(false),
            onRefresh: (self) => setLit(self.progress > 0 || self.isActive),
          });
          add('makes');
        }
        /* S6: the set line arrives under the painted one (photo line, then type line) */
        const line = one('[data-lift-type]');
        if (line) {
          gsap.fromTo(line, { opacity: 0 }, {
            opacity: 1, duration: num('--dur-fade'), ease: 'power1.out',
            scrollTrigger: { trigger: line, start: 'top 85%', toggleActions: 'play none none reverse' },
          });
          add('line');
        }
      }

      return () => {
        made.forEach((n) => n.remove());
        undo.forEach((f) => f());
        html.classList.remove('has-motion', 'motion-desk', 'motion-phone');
        pinTriggers.clear();
        status.pins = {};
        status.devices.length = 0;
        status.mode = null;
        anchorY.fn = null;
      };

      /* ==================================================================
         S6 · THE PEAK — the line lifts off the trailer (signature)
         One proxy state, one render: the photo's camera and clip, the set type's two
         copies and their masks are all written from the same numbers, so the type is
         near-black exactly where it lies over the trailer and ink exactly where it lies
         over ground, at every frame (G6: one owner per property).
         ================================================================== */
      function buildLift(peak, tImg) {
        const tPhoto = tImg.parentElement;
        const tCap = peak.querySelector('.frame--trailer [data-caption]');
        const line = peak.querySelector('[data-lift-type]');
        const print = peak.querySelector('[data-print]');
        const printCrop = print.querySelector('.s7__crop');
        const printCap = print.querySelector('figcaption');
        const gtMass = peak.querySelector('[data-gt-mass]');
        const NW = +tImg.getAttribute('width') || 2400;
        const NH = +tImg.getAttribute('height') || 1596;
        const [nx, ny] = tImg.dataset.name.split(',').map(Number);
        const crop = tImg.dataset.crop.split(',').map(Number); // x0, y0, x1, y1 (fractions)
        const rows = (tImg.dataset.nameRows || '').split(';').map((p) => p.split(',').map(Number));
        const rowW = parseFloat(tImg.dataset.nameW) || 0.0508;

        /* the set line, as three groups that each register on one painted row:
           "BY MANCUSO" / "AN AUTOMOTIVE FAMILY" / "SINCE 1923" → two set lines */
        const groups = ['By Mancuso —', 'an automotive family', 'since 1923.'];
        const lift = document.createElement('div');
        lift.className = 'lift';
        lift.setAttribute('aria-hidden', 'true');
        const layers = ['dark', 'ink'].map((k) => {
          const d = document.createElement('div');
          d.className = 'lift__layer lift__layer--' + k;
          lift.appendChild(d);
          return groups.map((txt) => {
            const s = document.createElement('span');
            s.className = 'lift__g';
            s.textContent = txt;
            d.appendChild(s);
            return s;
          });
        });
        const layerEls = [...lift.children];
        peak.appendChild(lift);
        made.push(lift);
        undo.push(() => {
          peak.classList.remove('is-lifting');
          ['transform', 'clipPath', 'opacity'].forEach((p) => { tImg.style[p] = ''; });
          printCrop.style.opacity = '';
        });

        const rangeOf = (el, text) => {
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            const i = n.data.indexOf(text);
            if (i >= 0) {
              const r = document.createRange();
              r.setStart(n, i);
              r.setEnd(n, i + text.length);
              return r;
            }
          }
          return null;
        };

        const geo = {};
        const measure = () => {
          const base = tPhoto.getBoundingClientRect();
          const W = tPhoto.clientWidth;
          const H = tPhoto.clientHeight;
          geo.W = W; geo.H = H;
          const hx = 0.25 * W;
          const hy = 0.3 * window.innerHeight;
          // wide: cover, top-anchored, centred (the static object-fit position)
          geo.s0 = Math.max(W / NW, H / NH);
          geo.x0 = (W - NW * geo.s0) / 2;
          geo.y0 = 0;
          // native: the painted line on H, the photo still covering the stage (§2.2)
          geo.x1 = clamp(hx - nx * NW, W - NW, 0);
          geo.y1 = clamp(hy - ny * NH, H - NH, 0);
          // the print: the crop of the same file, where S7 sets it
          const cr = printCrop.getBoundingClientRect();
          geo.ps = cr.width / ((crop[2] - crop[0]) * NW);
          geo.px = cr.left - base.left - crop[0] * NW * geo.ps;
          geo.py = cr.top - base.top - crop[1] * NH * geo.ps;
          geo.clip = [crop[1] * NH, NW - crop[2] * NW, NH - crop[3] * NH, crop[0] * NW]; // t r b l
          // the groups: final = where the S7 line sets them; start = on their painted row
          const lineBox = line.getBoundingClientRect();
          geo.g = groups.map((txt, i) => {
            const r = rangeOf(line, txt);
            const rr = r ? r.getBoundingClientRect() : lineBox;
            return { left: rr.left - base.left, top: rr.top - base.top, w: rr.width, h: rr.height, row: rows[i] || [nx, ny] };
          });
          // place both copies, then correct for the span's own glyph offset
          layers.forEach((spans) => spans.forEach((s, i) => {
            s.style.transform = 'none';
            s.style.left = geo.g[i].left + 'px';
            s.style.top = geo.g[i].top + 'px';
          }));
          layers.forEach((spans) => spans.forEach((s, i) => {
            const r = document.createRange();
            r.selectNodeContents(s);
            const b = r.getBoundingClientRect();
            const dx = geo.g[i].left - (b.left - base.left);
            const dy = geo.g[i].top - (b.top - base.top);
            s.style.left = geo.g[i].left + dx + 'px';
            s.style.top = geo.g[i].top + dy + 'px';
          }));
          // one type size for all three rows: the widest row matches its painted width
          geo.ts = (rowW * NW) / geo.g[1].w;
          // the slot: an edge just under the set line while it is still at painted size.
          // The trailer side clears down to it, then slides out from under it into the
          // print, so the big painted letters never pass beneath the type.
          geo.slot = Math.max(...geo.g.map((gi) => geo.y1 + gi.row[1] * NH + (gi.h * geo.ts) / 2)) + 6;
        };

        const st = { cam: 0, type: 0, clip: 0, wipe: 0, drop: 0, grow: 0 };
        const render = () => {
          const { W, H } = geo;
          // photo: wide → native (cam), then native → print (drop)
          let s = lerp(geo.s0, 1, st.cam);
          let x = lerp(geo.x0, geo.x1, st.cam);
          let y = lerp(geo.y0, geo.y1, st.cam);
          if (st.drop > 0) {
            s = lerp(1, geo.ps, st.drop);
            x = lerp(geo.x1, geo.px, st.drop);
            y = lerp(geo.y1, geo.py, st.drop);
          }
          // clip insets in image px (t r b l): full frame → the trailer side (the print's crop)
          const c = geo.clip.map((v) => v * st.clip);
          if (st.wipe > 0) {
            const edge = lerp(0, geo.slot, st.wipe); // clears down through the set line to the slot
            c[0] = clamp(Math.max(c[0], (edge - y) / s), 0, NH - c[2]);
          }
          tImg.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
          tImg.style.clipPath = st.clip > 0 ? `inset(${c[0]}px ${c[1]}px ${c[2]}px ${c[3]}px)` : '';
          // the photo's visible rectangle on the stage
          const R = [
            clamp(x + c[3] * s, 0, W), clamp(y + c[0] * s, 0, H),
            clamp(x + (NW - c[1]) * s, 0, W), clamp(y + (NH - c[2]) * s, 0, H),
          ];
          // masks: dark copy inside R, ink copy outside it
          layerEls[0].style.clipPath = `inset(${R[1]}px ${W - R[2]}px ${H - R[3]}px ${R[0]}px)`;
          layerEls[1].style.clipPath = `polygon(evenodd, 0 0, ${W}px 0, ${W}px ${H}px, 0 ${H}px, 0 0, ${R[0]}px ${R[1]}px, ${R[0]}px ${R[3]}px, ${R[2]}px ${R[3]}px, ${R[2]}px ${R[1]}px, ${R[0]}px ${R[1]}px)`;
          // the groups: on their painted rows at painted size → set in the line
          // the rows regroup into two lines: each word group moves sideways first and rises
          // late, so "since 1923." clears "an automotive family" on its way to its place
          const k = st.grow;
          const kx = 1 - (1 - k) * (1 - k);
          const ky = k * k;
          const sc = lerp(geo.ts, 1, k);
          layers.forEach((spans) => spans.forEach((sp, i) => {
            const gi = geo.g[i];
            const px = geo.x1 + gi.row[0] * NW; // painted row centre, photo at native
            const py = geo.y1 + gi.row[1] * NH;
            const dx = (px - (gi.left + gi.w / 2)) * (1 - kx);
            const dy = (py - (gi.top + gi.h / 2)) * (1 - ky);
            sp.style.transform = `translate(${dx}px, ${dy}px) scale(${sc})`;
            sp.style.opacity = st.type;
          }));
          // the end: the print, then the real line, take over at identical pixels
          const landed = st.drop >= 1;
          const set = landed && st.grow >= 1;
          tImg.style.opacity = landed ? 0 : 1;
          printCrop.style.opacity = landed ? 1 : 0;
          lift.style.visibility = set || st.type <= 0 ? 'hidden' : 'visible';
          peak.classList.toggle('is-lifting', !set);
        };

        const cam = raw('--ease-camera');
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: render,
          scrollTrigger: {
            trigger: peak, start: 'top top', end: () => '+=' + num('--pin-lift'),
            pin: true, scrub: true, invalidateOnRefresh: true,
            onRefreshInit: () => { gsap.set(tImg, { clearProps: 'transform,clipPath' }); },
            onRefresh: () => { measure(); render(); },
          },
        });
        gsap.set([printCap], { opacity: 0 });
        gsap.set(gtMass, { opacity: 0, y: () => num('--dist-rise') });
        tl
          // 0–12 hold, wide: the trailer, the two Lolas, the crew
          .to(st, { cam: 1, duration: 0.43, ease: cam }, 0.12)          // 12–55 push-in to native, the painted line onto H
          // 55–62 hold at native: the designed stop frame
          .to(st, { type: 1, duration: 0.03 }, 0.62)                      // 62–65 set type arrives on the painted rows
          .to(st, { clip: 1, duration: 0.05, ease: cam }, 0.65)           // 65–70 the photo closes onto the trailer side
          .to(tCap, { opacity: 0, duration: 0.03 }, 0.65)
          .to(st, { wipe: 1, duration: 0.04 }, 0.7)                       // 70–74 it clears down to the slot: the set line is ink on ground
          .to(st, { drop: 1, duration: 0.09, ease: cam }, 0.74)           // 74–83 and slides out from under it into the print
          .to(st, { grow: 1, duration: 0.1, ease: raw('--ease-type') }, 0.81) // 81–91 three painted rows become two set lines
          .to(gtMass, { opacity: 1, y: 0, duration: 0.08 }, 0.89)         // 89–97 the GT mass, supporting band
          .to(printCap, { opacity: 1, duration: 0.05 }, 0.92)
          .to({}, { duration: 0.04 }, 0.96);
        pin('lift', tl.scrollTrigger);
        measure();
        render();

        // the GT lives at the end of this pin: anchors and keyboard focus go there
        const endY = () => tl.scrollTrigger.end;
        anchorY.fn = (target) => (target.id === 'gt' || peak.contains(target) ? endY() : null);
        const onFocus = (e) => {
          if (!gtMass.contains(e.target) || tl.scrollTrigger.progress >= 0.99) return;
          if (window.lenis) window.lenis.scrollTo(endY(), { immediate: true });
        };
        peak.addEventListener('focusin', onFocus);
        undo.push(() => peak.removeEventListener('focusin', onFocus));
        add('lift');
      }
    },
    root,
  );

  /* ======================================================================
     3 · refresh strategy (G8): measured once, re-measured only when the page's height
     really changes (webfonts, a lazy image) or on ScrollTrigger's own resize refresh.
     ====================================================================== */
  let lastH = root.offsetHeight;
  let pending = 0;
  const ro = new ResizeObserver(() => {
    const h = root.offsetHeight;
    if (h === lastH) return;
    lastH = h;
    clearTimeout(pending);
    pending = setTimeout(() => ScrollTrigger.refresh(), 120);
  });
  ro.observe(root);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

  /* a deep link (#gt …) lands where the motion layout puts it, not where the static one did */
  window.addEventListener('load', () => {
    if (location.hash.length < 2 || !window.lenis) return;
    const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!t) return;
    ScrollTrigger.refresh();
    const y = anchorY.fn && anchorY.fn(t);
    window.lenis.scrollTo(y != null ? y : t, { immediate: true, force: true });
  });
})();
