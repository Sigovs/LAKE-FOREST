/* =====================================================================
   RPM Club: the latest episode plays in the page.
   Play/Pause, the wave as progress, seek by click or keys.
   The wave moves only while the audio is actually playing.
   ===================================================================== */
(() => {
  const root = document.querySelector('[data-player]');
  if (!root) return;
  const audio = root.querySelector('[data-player-audio]');
  const btn = root.querySelector('[data-player-btn]');
  const seek = root.querySelector('[data-player-seek]');
  const time = root.querySelector('[data-player-time]');
  const bars = [...root.querySelectorAll('.player__bars i')];
  const title = root.querySelector('.ep__title').textContent;
  const idle = time.textContent;
  let dur = +seek.max;

  /* each bar breathes on its own phase, so the wave never moves in lockstep */
  bars.forEach((b, i) => b.style.setProperty('--d', ((i * 0.37) % 1.6).toFixed(2)));

  const clock = (s) => { s = Math.max(0, Math.floor(s)); const m = Math.floor(s / 60), r = s % 60;
    return m >= 60 ? `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}:${String(r).padStart(2, '0')}` : `${m}:${String(r).padStart(2, '0')}`; };

  const paint = () => {
    const t = audio.currentTime || 0, p = dur ? t / dur : 0, cut = Math.round(p * bars.length);
    bars.forEach((b, i) => b.classList.toggle('is-past', i < cut));
    seek.value = Math.floor(t);
    seek.setAttribute('aria-valuetext', `${clock(t)} of ${clock(dur)}`);
    if (t > 0 || !audio.paused) time.textContent = `${clock(t)} / ${clock(dur)}`;
  };

  const setState = (playing) => {
    root.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'}: ${title}`);
  };

  btn.addEventListener('click', () => {
    if (audio.paused) {
      const go = audio.play();
      if (go && go.catch) go.catch(() => { setState(false); time.textContent = 'Could not play here. Use the episode page.'; });
    } else audio.pause();
  });
  audio.addEventListener('play', () => setState(true));
  audio.addEventListener('pause', () => setState(false));
  audio.addEventListener('ended', () => { setState(false); audio.currentTime = 0; time.textContent = idle; paint(); });
  audio.addEventListener('loadedmetadata', () => { if (isFinite(audio.duration)) { dur = audio.duration; seek.max = Math.floor(dur); } paint(); });
  audio.addEventListener('timeupdate', paint);
  audio.addEventListener('error', () => { setState(false); time.textContent = 'Could not play here. Use the episode page.'; });

  /* seeking: the range input sits over the wave (click, drag, arrows, Home/End) */
  seek.addEventListener('input', () => {
    if (audio.preload === 'none' && audio.readyState === 0) audio.preload = 'metadata';
    audio.currentTime = +seek.value; paint();
  });
})();
