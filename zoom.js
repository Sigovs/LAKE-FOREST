/* =====================================================================
   Documents (letter, flyer, newspaper): a slight tilt under the pointer,
   and a click (or Enter) opens the document large, closing on click or Esc.
   ===================================================================== */
(() => {
  const docs = [...document.querySelectorAll('.paper img')];
  if (!docs.length) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* the viewer: one dialog for every document */
  const dlg = document.createElement('dialog');
  dlg.className = 'zoom';
  dlg.setAttribute('aria-label', 'Document, enlarged');
  dlg.innerHTML = '<figure class="zoom__fig"><img alt=""><figcaption class="caption"></figcaption></figure>'
    + '<button class="zoom__close" type="button" aria-label="Close">×</button>';
  document.body.appendChild(dlg);
  const big = dlg.querySelector('img'), cap = dlg.querySelector('figcaption');
  let opener = null;

  const close = () => {
    if (!dlg.open) return;
    if (reduce) { dlg.close(); return; }
    dlg.classList.add('is-closing');
    setTimeout(() => { dlg.classList.remove('is-closing'); dlg.close(); }, 200);
  };
  dlg.addEventListener('click', close);
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  dlg.addEventListener('close', () => { if (window.lenis) lenis.start(); if (opener) opener.focus(); });

  const open = (img) => {
    opener = img;
    big.src = img.currentSrc || img.src; big.alt = img.alt;
    big.style.width = `${img.naturalWidth}px`;   /* never larger than the scan itself (the CSS caps it to the screen) */
    const fc = img.closest('figure').querySelector('figcaption');
    cap.textContent = fc ? fc.textContent : '';
    if (window.lenis) lenis.stop();
    dlg.showModal();
  };

  docs.forEach((img) => {
    img.classList.add('doc-zoom');
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Enlarge: ${img.alt}`);
    img.addEventListener('click', () => open(img));
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); } });

    if (!fine || reduce) return;
    /* tilt: at most 6 degrees, the edge under the pointer dips away */
    img.addEventListener('pointermove', (e) => {
      const r = img.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      img.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
      img.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`);
    });
    img.addEventListener('pointerleave', () => { img.style.setProperty('--ry', '0deg'); img.style.setProperty('--rx', '0deg'); });
  });
})();
