/* =====================================================================
   Micro details:
   - the chapter plate (bottom centre) and the orientation line in the header
     follow the chapter under the middle of the screen; the numeral turns over
     like a board when the chapter changes
   - the hour-8 colour photograph sits muted; colour shows through a window
     that follows the pointer (fine pointers only; on touch it stays in colour)
   ===================================================================== */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------------- chapter plate + header orientation */
  const plate = document.querySelector('[data-plate]');
  const where = document.querySelector('[data-where-a]');
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  if (plate && chapters.length) {
    const win = plate.querySelector('.plate__win'), title = plate.querySelector('[data-plate-t]');
    let cur = null;

    const turn = (el, text, up) => {   /* the old value leaves, the new one arrives from the other side */
      const olds = [...el.children];
      if (reduce || !olds.length) { el.innerHTML = `<span class="plate__n">${text}</span>`; return; }
      /* every value still on the board leaves, however quickly the chapters change; at most one old one stays to animate */
      olds.forEach((o, k) => { if (k < olds.length - 1) o.remove(); });
      const old = el.lastElementChild;
      old.classList.remove('is-in', 'from-top', 'to-bottom'); old.classList.add('is-out'); if (up) old.classList.add('to-bottom');
      const next = document.createElement('span');
      next.className = 'plate__n is-in' + (up ? ' from-top' : ''); next.textContent = text;
      el.appendChild(next);
      requestAnimationFrame(() => requestAnimationFrame(() => next.classList.remove('is-in', 'from-top')));
      setTimeout(() => { if (old.parentNode) old.remove(); }, 450);
    };

    const pick = () => {
      const mid = innerHeight * 0.5;
      let hit = null;
      for (const c of chapters) { const r = c.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) { hit = c; break; } }
      if (hit === cur) return;
      const up = cur && hit && chapters.indexOf(hit) < chapters.indexOf(cur);
      cur = hit;
      plate.classList.toggle('is-on', !!hit);
      if (where) where.parentElement.classList.toggle('is-on', !!hit);
      if (!hit) return;
      turn(win, hit.dataset.chapter, up);
      title.textContent = hit.dataset.title;
      if (where) where.textContent = hit.dataset.where;
    };
    win.innerHTML = '';
    if (window.lenis) lenis.on('scroll', pick); else addEventListener('scroll', pick, { passive: true });
    addEventListener('resize', pick);
    pick();
  }

  /* ---------------- colour under the pointer */
  document.querySelectorAll('[data-tint]').forEach((box) => {
    if (!fine || reduce) return;          /* touch and reduced motion: the photograph stays in colour */
    box.classList.add('is-live');
    const W = 0.34, H = 0.46;               /* the window, as a share of the photograph */
    let raf = 0, tx = 0.5, ty = 0.5, x = 0.5, y = 0.5, on = 0, target = 0;
    const draw = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18; on += (target - on) * 0.16;
      const w = W * on, h = H * on;
      const l = Math.max(0, x - w / 2), t = Math.max(0, y - h / 2), r = Math.max(0, 1 - x - w / 2), b = Math.max(0, 1 - y - h / 2);
      box.style.setProperty('--clip', `inset(${(t * 100).toFixed(2)}% ${(r * 100).toFixed(2)}% ${(b * 100).toFixed(2)}% ${(l * 100).toFixed(2)}%)`);
      raf = (Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(target - on) > 0.001) ? requestAnimationFrame(draw) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    box.addEventListener('pointerenter', (e) => { const r = box.getBoundingClientRect(); x = tx = (e.clientX - r.left) / r.width; y = ty = (e.clientY - r.top) / r.height; target = 1; kick(); });
    box.addEventListener('pointermove', (e) => { const r = box.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height; kick(); });
    box.addEventListener('pointerleave', () => { target = 0; kick(); });
  });
})();
