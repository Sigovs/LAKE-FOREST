/* v3 inner pages (Family, RPM Club): Lenis (off under reduced motion), the solid nav, the hero words in a side
   staircase with the small photograph sliding in from the right, and each later block arriving once as it enters.
   Without GSAP, Lenis or motion, everything simply stands in place. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('[data-nav]');
  const solid = (y) => { if (!nav) return; nav.classList.toggle('is-solid', y > 40); nav.classList.toggle('is-small', y > 24); };

  if (reduce || !window.gsap || !window.ScrollTrigger || !window.Lenis) { addEventListener('scroll', () => solid(scrollY), { passive: true }); solid(scrollY); return; }
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ autoRaf: false, anchors: { offset: -96 }, lerp: 0.1 });
  window.lenis = lenis;
  lenis.on('scroll', (e) => { ScrollTrigger.update(); solid(e.scroll); });
  gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);

  const hero = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.6 }, delay: 0.1 })
    .from('[data-cp-step]', { x: -140, autoAlpha: 0, stagger: 0.18 });
  /* the side piece is a photograph on Family and RPM, the category index on the Gallery (no image to settle) */
  if (document.querySelector('[data-cp-pic]')) hero.from('[data-cp-pic]', { x: 120, autoAlpha: 0, duration: 1.8 }, 0.25);
  if (document.querySelector('[data-cp-pic] img')) hero.from('[data-cp-pic] img', { scale: 1.18, duration: 2.4, ease: 'expo.out' }, 0.25);

  /* a block arrives once: its own steps from the left, its picture from its own side */
  document.querySelectorAll('[data-ip-reveal]').forEach((box) => {
    const steps = box.querySelectorAll('[data-ip-step]'), pics = box.querySelectorAll('[data-ip-pic]');
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 1.4 } });
    if (steps.length) tl.from(steps, { x: -120, autoAlpha: 0, stagger: 0.14 }, 0);
    pics.forEach((p) => tl.from(p, { x: p.dataset.ipPic === 'left' ? -120 : 120, autoAlpha: 0, duration: 1.6 }, 0.15));
    ScrollTrigger.create({ trigger: box, start: 'top 78%', once: true, onEnter: () => tl.play() });
  });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
