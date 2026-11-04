/* v3 phone menu. Below 900px the header keeps room for only two links, so a Menu button opens a full-screen list
   of every page, built from the header's own links so the two never drift apart. Esc, a link or the button closes it;
   the page behind stops scrolling while it is open. */
(() => {
  const nav = document.querySelector('[data-nav]'), links = nav && nav.querySelector('.nav__links');
  if (!links) return;

  const btn = document.createElement('button');
  btn.className = 'nav__menu'; btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'phone-menu');
  btn.innerHTML = '<span class="nav__menu-t">Menu</span><span class="nav__menu-i" aria-hidden="true"><i></i><i></i></span>';

  const panel = document.createElement('nav');
  panel.className = 'pmenu'; panel.id = 'phone-menu'; panel.setAttribute('aria-label', 'Pages'); panel.hidden = true;
  const list = document.createElement('ul');
  [...links.querySelectorAll('a')].forEach((a) => {
    const li = document.createElement('li'), c = a.cloneNode(true);
    li.appendChild(c); list.appendChild(li);
  });
  panel.appendChild(list);
  nav.appendChild(btn); document.body.appendChild(panel);

  const set = (open) => {
    btn.setAttribute('aria-expanded', String(open)); btn.querySelector('.nav__menu-t').textContent = open ? 'Close' : 'Menu';
    document.documentElement.classList.toggle('is-menu', open);
    if (open) { panel.hidden = false; requestAnimationFrame(() => panel.classList.add('is-open')); window.lenis && window.lenis.stop(); panel.querySelector('a').focus(); }
    else { panel.classList.remove('is-open'); window.lenis && window.lenis.start(); setTimeout(() => { if (!panel.classList.contains('is-open')) panel.hidden = true; }, 350); }
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); } });
  matchMedia('(min-width: 900px)').addEventListener('change', (m) => { if (m.matches) set(false); });
})();
