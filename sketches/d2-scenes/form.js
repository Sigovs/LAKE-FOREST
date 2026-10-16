/* Prototype enquiry form: real validation and states, no transport. It never claims to
   have sent anything. Error lines are reserved in the layout so nothing moves. */
(() => {
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
  checks.forEach(([id, test]) => document.getElementById(id).addEventListener('blur', (e) => { if (e.target.value) validate(id, test); }));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = checks.find(([id, test]) => !validate(id, test));
    checks.forEach(([id, test]) => validate(id, test));
    if (bad) { status.textContent = ''; document.getElementById(bad[0]).focus(); return; }
    status.textContent = 'This prototype is not connected yet, so nothing was sent.';
  });
})();
