/* LFSC prototype — scroll layer and the chapter's two motion ideas.
 *
 * 1. Lenis on gsap.ticker (DNA90). Not constructed under reduced motion.
 * 2. Dateline rail: marks which beat of Chapter 01 the reader is in.
 * 3. Signature: the family line under "An automotive family since 1923" fills
 *    as the reader moves from the 1976 chapter into the GT — the generations
 *    lead to the next chapter. Desktop only; phones and reduced motion get the
 *    finished line. It states nothing about the GT's engineering.
 * Plates rise in once as they arrive. The hidden state is set in <head> only when
 * motion is allowed, and removed by a failsafe if these scripts never run.
 * The GT film is a link to Vimeo; with JS it opens inline under the spec plate.
 * The enquiry form validates inline and says plainly that it is not connected yet.
 */
(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Motion tokens: durations come from css/main.css; GSAP's 'power3.out' is the
  // closest named curve to --ease-out (cubic-bezier(0.22, 1, 0.36, 1)).
  const token = (name) => parseFloat(getComputedStyle(root).getPropertyValue(name)) / 1000;
  const MOTION = { reveal: token('--dur-4'), stagger: token('--dur-1') * 0.8, ease: 'power3.out', scrub: 0.6 };

  initFilm();
  initForm();

  if (!window.gsap || !window.ScrollTrigger) {
    root.classList.remove('has-motion');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  let lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis; // prototype: lets review tooling scroll through Lenis
  }
  initAnchors();

  gsap.context(() => {
    initRail();

    if (reduced) return;
    root.classList.add('motion-ready');

    // Plates rise in once, eased out, no repeat on the way back up.
    ScrollTrigger.batch('.reveal', {
      start: 'top 88%',
      once: true,
      onEnter: (els) => gsap.to(els, {
        opacity: 1, y: 0, duration: MOTION.reveal, ease: MOTION.ease, stagger: MOTION.stagger, overwrite: true,
      }),
    });

    const mm = gsap.matchMedia();
    mm.add('(min-width: 760px)', () => {
      const marks = gsap.utils.toArray('.familyline__mark');
      gsap.fromTo('.familyline__fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.bridge',
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: MOTION.scrub,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const reached = self.progress * marks.length;
              marks.forEach((m, i) => m.classList.toggle('is-reached', reached >= i + 0.5));
            },
          },
        });
    });
  });

  // Geometry changes when lazy images arrive and when fonts settle; every
  // trigger is re-measured then, not only on window load.
  const refresh = debounce(() => ScrollTrigger.refresh(), 150);
  document.querySelectorAll('img').forEach((img) => {
    if (!img.complete) img.addEventListener('load', refresh, { once: true });
  });
  if (document.fonts) document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh);

  // In-page links scroll through Lenis and then hand focus to their target,
  // so keyboard users continue from where they landed.
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: 0 });
        else target.scrollIntoView({ block: 'start' });
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        history.replaceState(null, '', a.getAttribute('href'));
      });
    });
  }

  function initRail() {
    const links = new Map();
    document.querySelectorAll('[data-rail]').forEach((a) => links.set(a.dataset.rail, a));
    document.querySelectorAll('[data-beat]').forEach((beat) => {
      const link = links.get(beat.dataset.beat);
      if (!link) return;
      ScrollTrigger.create({
        trigger: beat,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          link.classList.toggle('is-active', self.isActive);
          if (self.isActive) link.setAttribute('aria-current', 'step');
          else link.removeAttribute('aria-current');
        },
      });
    });
  }

  function initFilm() {
    const slot = document.querySelector('.film-slot');
    document.querySelectorAll('[data-film]').forEach((link) => {
      if (!slot) return;
      link.setAttribute('role', 'button');
      link.setAttribute('aria-expanded', 'false');
      link.addEventListener('keydown', (e) => {
        if (e.key === ' ') { e.preventDefault(); link.click(); }
      });
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (!slot.hidden) {
          slot.hidden = true;
          slot.replaceChildren();
          link.setAttribute('aria-expanded', 'false');
          if (window.ScrollTrigger) ScrollTrigger.refresh();
          return;
        }
        if (!slot.firstChild) {
          const iframe = document.createElement('iframe');
          iframe.src = `https://player.vimeo.com/video/${link.dataset.vimeo}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`;
          iframe.title = 'Introducing the GT';
          iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
          iframe.setAttribute('data-lenis-prevent', '');
          slot.appendChild(iframe);
        }
        slot.hidden = false;
        link.setAttribute('aria-expanded', 'true');
        slot.firstChild.focus();
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      });
    });
  }

  // Prototype form: real validation and states, no transport. It never claims to
  // have sent anything.
  function initForm() {
    const form = document.querySelector('.enquiry');
    if (!form) return;
    const status = form.querySelector('.enquiry__status');
    const checks = [
      ['f-name', (v) => v.trim().length > 0],
      ['f-email', (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
      ['f-message', (v) => v.trim().length > 0],
    ];
    const validate = (id, test) => {
      const input = document.getElementById(id);
      const err = document.getElementById(id + '-err');
      const ok = test(input.value);
      input.setAttribute('aria-invalid', String(!ok));
      if (ok) input.removeAttribute('aria-describedby'); else input.setAttribute('aria-describedby', err.id);
      err.classList.toggle('is-shown', !ok);
      return ok;
    };
    checks.forEach(([id, test]) => {
      document.getElementById(id).addEventListener('blur', (e) => { if (e.target.value) validate(id, test); });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = checks.map(([id, test]) => validate(id, test));
      const firstBad = checks.find((_, i) => !results[i]);
      if (firstBad) {
        status.textContent = '';
        document.getElementById(firstBad[0]).focus();
        return;
      }
      status.textContent = 'This prototype is not connected yet, so nothing was sent. The live form will deliver your enquiry to the family business.';
    });
  }

  function debounce(fn, ms) {
    let t;
    return () => { clearTimeout(t); t = setTimeout(fn, ms); };
  }
})();
