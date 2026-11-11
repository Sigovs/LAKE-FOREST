/* v3 Gallery. The grid is plain HTML and CSS (justified rows, see styles-v3.css "GALLERY"); every photograph is a link
   to its large file, so the page works without this script. The script adds:
   · the category filter: several categories at once (toggle buttons with aria-pressed); at most 40 photographs at a time, then "Show more"
   · the viewer: one <dialog> for every photograph, with previous / next (buttons, arrow keys, a swipe), the caption,
     the category and the position, a link of its own (#photo-<slug>), focus returned to the tile on close.
   It never shows a photograph larger than its file. Under reduced motion nothing animates. */
(() => {
  const grid = document.querySelector('[data-gx]');
  if (!grid) return;
  const items = [...grid.querySelectorAll('.gx__item')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LIMIT = 40;
  const names = {};
  document.querySelectorAll('[data-filter]').forEach((b) => { names[b.dataset.filter] = b.firstChild.textContent.trim(); });
  const status = document.querySelector('[data-gx-status]');
  const moreBox = document.querySelector('.gx-more'), moreBtn = document.querySelector('[data-gx-more]');
  const sel = new Set();   /* the chosen categories; empty means All */
  let shown = LIMIT;

  /* ---------------------------------------------------------------- filter: several categories at once.
     A category toggles on and off; the grid shows every photograph in any chosen category. "All", or switching off
     the last one, shows everything again. Each change re-lays the grid with GSAP Flip: the photographs that stay
     glide to their new places, the ones that go fade down, the ones that come fade up. Without Flip, or under reduced
     motion, the grid simply changes. */
  const flip = !reduce && window.gsap && window.Flip;
  if (flip) gsap.registerPlugin(Flip);
  /* a photograph may sit in several categories: data-cat lists their slugs, separated by spaces */
  const cats = (li) => (li.dataset.cat || '').split(/\s+/).filter(Boolean);
  const inCat = (li) => !sel.size || cats(li).some((c) => sel.has(c));
  const visible = () => items.filter((li) => !li.hidden);
  const apply = (animate) => {
    const state = animate && flip ? Flip.getState(items) : null;
    const before = grid.offsetHeight;
    const match = items.filter(inCat);
    items.forEach((li) => { li.hidden = true; });
    match.slice(0, shown).forEach((li) => { li.hidden = false; });
    const rest = match.length - Math.min(shown, match.length);
    if (moreBox) { moreBox.hidden = rest <= 0; moreBtn.textContent = `Show more photographs (${rest})`; }
    if (status) status.textContent = `${match.length} photograph${match.length === 1 ? '' : 's'}${sel.size ? `: ${[...sel].map((k) => names[k]).join(', ')}` : ''}`;
    if (state) {
      /* Flip lifts every photograph out of the flow while it animates (absolute), which would collapse the grid and
         let the browser pull the scroll up; the grid keeps the taller of its two heights until the move ends */
      grid.style.minHeight = `${Math.max(before, grid.offsetHeight)}px`;
      Flip.from(state, {
        duration: 0.8, ease: 'power3.inOut', absolute: true, scale: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.25, ease: 'power2.out', clearProps: 'opacity,visibility,transform' }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.94, duration: 0.35, ease: 'power2.in', clearProps: 'opacity,visibility,transform' }),
        onComplete: () => { grid.style.minHeight = ''; if (window.ScrollTrigger) ScrollTrigger.refresh(); },
      });
    } else if (window.ScrollTrigger) ScrollTrigger.refresh();
  };

  /* the bar (sticky in CSS): every chosen category is underlined by its own 2px line; past its width the bar scrolls
     sideways inside itself, with a fade on the side that has more */
  const bar = document.querySelector('.gx-filter'), track = bar && bar.querySelector('.gx-filter__track');
  const wrap = document.querySelector('.gx-wrap');
  const edges = () => {
    if (!track) return;
    const over = track.scrollWidth > track.clientWidth + 1;
    track.classList.toggle('is-over-l', over && track.scrollLeft > 2);
    track.classList.toggle('is-over-r', over && track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
  };
  if (track) {
    edges();
    if (document.fonts) document.fonts.ready.then(edges);
    track.addEventListener('scroll', edges, { passive: true });
    addEventListener('resize', edges);
  }

  const buttons = [...document.querySelectorAll('[data-filter]')];
  const press = () => buttons.forEach((o) => o.setAttribute('aria-pressed', String(o.dataset.filter === 'all' ? !sel.size : sel.has(o.dataset.filter))));
  buttons.forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.filter;
    if (k === 'all') { if (!sel.size) return; sel.clear(); }
    else if (sel.has(k)) sel.delete(k); else sel.add(k);
    if (sel.size && sel.size === buttons.length - 1) sel.clear();   /* every category chosen is the same as All */
    /* read before the grid changes: a shorter set shrinks the page and the browser pulls the scroll up with it */
    const deep = wrap && wrap.getBoundingClientRect().top < 0;
    press(); shown = LIMIT; apply(true);
    /* the clicked category scrolls into the bar's view; and if the visitor is deep in the photographs, the page
       returns to the top of the grid, so the new set starts right under the bar */
    if (track) track.scrollTo({ left: Math.max(0, b.offsetLeft - 56), behavior: reduce ? 'auto' : 'smooth' });
    if (deep) {
      /* the target is taken from the real scroll position: the new set has already made the page shorter, so the
         browser may have clamped the scroll under Lenis */
      const head = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--aan-header-h')) || (innerWidth < 900 ? 72 : 80);   /* the WordPress theme's header height, when it sets one */
      const y = Math.max(0, wrap.getBoundingClientRect().top + scrollY - head);
      if (window.lenis) { lenis.resize(); lenis.scrollTo(y, { immediate: reduce, force: true }); }
      else scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }
  }));

  if (moreBtn) moreBtn.addEventListener('click', () => {
    const first = items.filter(inCat)[shown];
    shown += LIMIT; apply();
    const a = first && first.querySelector('.gx__open'); if (a) a.focus();
  });
  apply();

  /* ---------------------------------------------------------------- viewer */
  const ico = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
  const dlg = document.createElement('dialog');
  dlg.className = 'gxl';
  dlg.autofocus = true;   /* the dialog itself takes focus on open: no ring on a button the visitor did not reach by keyboard */
  dlg.setAttribute('aria-label', 'Photograph');
  dlg.innerHTML = '<div class="gxl__stage"><img class="gxl__img" alt=""></div>'
    + '<div class="gxl__bar"><p class="gxl__cap" aria-live="polite"></p><p class="gxl__meta"></p></div>'
    + `<button class="gxl__btn gxl__prev" type="button" aria-label="Previous photograph">${ico('M15 5l-7 7 7 7')}</button>`
    + `<button class="gxl__btn gxl__next" type="button" aria-label="Next photograph">${ico('M9 5l7 7-7 7')}</button>`
    + `<button class="gxl__btn gxl__close" type="button" aria-label="Close">${ico('M6 6l12 12M18 6L6 18')}</button>`;
  document.body.appendChild(dlg);
  const img = dlg.querySelector('.gxl__img'), cap = dlg.querySelector('.gxl__cap'), meta = dlg.querySelector('.gxl__meta');
  const prev = dlg.querySelector('.gxl__prev'), next = dlg.querySelector('.gxl__next');
  let list = [], at = 0, opener = null;

  const show = (i) => {
    at = (i + list.length) % list.length;
    const li = list[at], a = li.querySelector('.gx__open');
    const w = +a.dataset.w, h = +a.dataset.h;
    img.classList.add('is-swap');
    const swap = () => {
      img.width = w; img.height = h;
      img.style.setProperty('--w', `${w}px`);
      img.alt = a.querySelector('img').alt;
      img.src = a.getAttribute('href');
      const done = () => img.classList.remove('is-swap');
      if (img.complete) done(); else img.addEventListener('load', done, { once: true });
    };
    if (reduce || !dlg.open) swap(); else setTimeout(swap, 140);
    cap.textContent = li.querySelector('figcaption').textContent;
    meta.innerHTML = `<span>${cats(li).map((c) => names[c]).filter(Boolean).join(' · ')}</span><span>${at + 1} / ${list.length}</span>`;
    prev.hidden = next.hidden = list.length < 2;
    history.replaceState(null, '', `#${li.id}`);
    /* the neighbours load now, so the next step is instant */
    [at - 1, at + 1].forEach((k) => { const n = list[(k + list.length) % list.length]; if (n) new Image().src = n.querySelector('.gx__open').getAttribute('href'); });
  };

  const open = (li) => {
    list = visible(); opener = li.querySelector('.gx__open');
    show(list.indexOf(li));
    if (window.lenis) lenis.stop();
    dlg.showModal();
  };
  const close = () => {
    if (!dlg.open) return;
    const end = () => { dlg.classList.remove('is-closing'); dlg.close(); };
    if (reduce) end(); else { dlg.classList.add('is-closing'); setTimeout(end, 200); }
  };
  dlg.addEventListener('close', () => {
    if (window.lenis) lenis.start();
    history.replaceState(null, '', location.pathname + location.search);
    if (opener) opener.focus();
  });
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  dlg.querySelector('.gxl__close').addEventListener('click', close);
  prev.addEventListener('click', () => show(at - 1));
  next.addEventListener('click', () => show(at + 1));
  /* a click on the dark around the photograph closes; on the photograph itself it does nothing */
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('gxl__stage')) close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(at - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(at + 1); }
  });
  /* swipe: a mostly horizontal drag of 50px or more */
  let sx = null, sy = null;
  dlg.addEventListener('pointerdown', (e) => { sx = e.clientX; sy = e.clientY; });
  dlg.addEventListener('pointerup', (e) => {
    if (sx === null || list.length < 2) return;
    const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(at + (dx < 0 ? 1 : -1));
  });

  items.forEach((li) => {
    const a = li.querySelector('.gx__open');
    a.setAttribute('aria-label', `Enlarge: ${li.querySelector('figcaption').textContent}`);
    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;   /* a new tab still gets the file */
      e.preventDefault(); open(li);
    });
  });

  /* a shared link opens its photograph */
  const fromHash = () => {
    const li = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (li && li.classList.contains('gx__item')) {
      if (li.hidden) { document.querySelector('[data-filter="all"]').click(); shown = items.length; apply(); }
      open(li);
    }
  };
  fromHash();
  addEventListener('hashchange', () => { if (!dlg.open) fromHash(); });
})();
