/* ui.js — chrome behaviour that is not motion: the scrollbar-free --vw, the nav state
   (wordmark hidden over the hero, hide on scroll-down / show on scroll-up), the menu sheet
   and anchor focus. Works with or without Lenis (Lenis scrolls the window natively). */
(() => {
  const root = document.documentElement;

  /* --vw without the classic scrollbar, so fitted livery lines never cause horizontal scroll */
  const setVw = () => root.style.setProperty('--vw', root.clientWidth / 100 + 'px');
  setVw();
  window.addEventListener('resize', setVw, { passive: true });

  /* ------------------------------------------------------------------ nav state */
  const nav = document.querySelector('[data-nav]');
  const hero = document.querySelector('[data-scene="hero"]');
  let holdNavUntil = 0;   // after a jump to an anchor the nav stays reachable
  const heroFoot = hero && hero.querySelector('[data-hero-copy]');

  /* the hero's photo-space lift (styles.css, .hero --lift) needs the foot's real top: the lead
     wraps differently per width and font. Measured from layout (offsetTop ignores transforms,
     and the foot is outside the scaled group), written to the hero, never to [data-hero-push]. */
  const setFootTop = () => {
    if (!hero || !heroFoot) return;
    hero.style.setProperty('--hero-foot-top', heroFoot.offsetTop + 'px');
  };
  setFootTop();
  window.addEventListener('resize', setFootTop, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setFootTop);
  if (nav && hero) {
    let lastY = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      const navH = nav.offsetHeight;
      const heroBottom = hero.offsetTop + hero.offsetHeight - navH;
      const overHero = y < heroBottom;
      /* the bar turns solid as soon as the hero's lines / CTAs reach the nav band, so the Menu
         label never sits over them; there the photo is already under the bottom ramp (≈ ground),
         so the bar's edge does not cut through a lit photograph */
      const footTop = heroFoot ? hero.offsetTop + heroFoot.offsetTop - 8 : heroBottom;
      nav.classList.toggle('is-over-hero', overHero);
      nav.classList.toggle('is-solid', y + navH > footTop);
      const goingDown = y > lastY + 2;
      const goingUp = y < lastY - 2;
      if (overHero || goingUp) nav.classList.remove('is-hidden');
      else if (goingDown && Date.now() > holdNavUntil && !document.body.classList.contains('menu-open')) nav.classList.add('is-hidden');
      lastY = y;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));
  }

  /* ------------------------------------------------------------------ anchors: move focus too */
  const focusTarget = (el) => {
    if (!el) return;
    if (!el.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  };
  const goTo = (hash) => {
    holdNavUntil = Date.now() + 2000;
    const target = hash === '#top' ? document.getElementById('top') : document.querySelector(hash);
    if (!target) return;
    if (window.lenis) window.lenis.scrollTo(hash === '#top' ? 0 : target, { offset: 0 });
    else target.scrollIntoView({ behavior: 'auto', block: 'start' });
    history.pushState(null, '', hash);
    focusTarget(target);
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    // preselect the enquiry topic when a GT link leads to the form
    if (a.dataset.topic) {
      const radio = document.querySelector(`input[name="topic"][value="${a.dataset.topic}"]`);
      if (radio) radio.checked = true;
    }
    if (a.closest('#menu')) return; // the menu handles its own links (it must close first)
    // scrolling is left to the browser, or to Lenis (anchors: true); focus follows the jump
    const hash = a.getAttribute('href');
    holdNavUntil = Date.now() + 2000;
    focusTarget(hash === '#top' ? document.getElementById('top') : document.querySelector(hash));
  });

  /* ------------------------------------------------------------------ menu sheet */
  const menu = document.getElementById('menu');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = menu && menu.querySelector('[data-menu-close]');
  if (!menu || !openBtn || !closeBtn) return;
  const outside = [document.querySelector('main'), document.querySelector('.foot'), document.querySelector('.skip')];
  const focusables = () => Array.from(menu.querySelectorAll('a[href], button:not([disabled])'));

  const open = () => {
    menu.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    outside.forEach((el) => el && (el.inert = true));
    nav.inert = true;
    window.lenis?.stop();
    closeBtn.focus();
  };
  const close = ({ restoreFocus = true } = {}) => {
    if (menu.hidden) return;
    menu.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    outside.forEach((el) => el && (el.inert = false));
    nav.inert = false;
    window.lenis?.start();
    if (restoreFocus) openBtn.focus();
  };
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', () => close());
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables();
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    close({ restoreFocus: false });
    goTo(a.getAttribute('href'));
  });
  // the sheet is phone/tablet only: close it if the viewport grows past the breakpoint
  window.matchMedia('(min-width: 1000px)').addEventListener('change', (e) => { if (e.matches) close({ restoreFocus: false }); });
})();
