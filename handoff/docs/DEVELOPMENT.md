# Development notes

## Stack

The site is static: HTML, one stylesheet and plain JavaScript. There is no build step, no framework and no npm.

Third-party code is loaded from CDNs, with pinned versions:

| Library | Version | From | Used for |
|---|---|---|---|
| GSAP + ScrollTrigger | 3.15.0 | cdnjs | timelines, scroll-linked motion, pinned stops |
| Lenis | 1.3.26 | unpkg | smooth scroll (with `lenis.css`) |
| Archivo, Cinzel | — | Google Fonts | the one typeface, and the wordmark |
| Besley | — | Google Fonts | one italic use on the homepage |

To self-host, download the same versions and change the `<script>` and `<link>` URLs. Nothing else depends on the
CDN paths.

## Pages and their parts

| Page | Sections (in order) | Scripts |
|---|---|---|
| `index.html` | hero (two slides over one film), chapter cards, the family, #76, Le Mans, Lake Forest years, the GT, RPM Club, Instagram, contact | motion, micro, menu, player, form, zoom, plus three inline scripts at the end of the page |
| `family.html` | hero, four generations | inner, menu |
| `history.html` | chapter rail and chapters, 1923 → today, with documents | history, zoom-history, menu |
| `gt.html` | hero, concept, promise, standard, C2, C3, who it is for, heritage, enquiry | gt, form, menu |
| `rpm.html` | hero, latest episode (plays in the page), archive, where to listen | inner, player, menu |
| `contact.html` | hero, details, enquiry form, map | inline, form, menu |

The three inline scripts on `index.html` are:

- the hero slides and their controller;
- the GT torch and the lamps that follow the pointer (desktop with a mouse only);
- the GT dust particles (≥ 700px only).

## Scripts

| File | Job |
|---|---|
| `js/motion.js` | Homepage motion. Creates Lenis on the GSAP ticker; then handles the pinned stops (the cards row holds until every card is in), the section slide-ins, the Le Mans film scrubbed by scroll, and the GT lamps striking on scroll. |
| `js/gt.js` | GT page motion and its two pinned stops (desktop). |
| `js/history.js` | History page: Lenis, the sticky chapter rail, the arrivals. |
| `js/inner.js` | Family and RPM pages: Lenis and the arrivals. |
| `js/menu.js` | Phone menu. Built from the header's own links, so the two never drift apart. Handles Esc, focus and the scroll lock. |
| `js/micro.js` | Header state (solid on scroll, compact logo) and small UI details. |
| `js/player.js` | RPM Club audio player: play/pause, the wave as the progress bar, seeking by click or keys. |
| `js/form.js` | Enquiry form: validation, error and success states. **Sends nothing yet** (see TODO.md). |
| `js/zoom.js`, `js/zoom-history.js` | The zoom view for documents and photographs: arrows step through, Esc closes. |

## CSS

- **`css/styles.css`** is the stylesheet for every page.
  - The tokens sit in `:root` at the top; see `../design-system/`.
  - The file grew through the prototype rounds. Later blocks, marked `/* v3 … */`, refine earlier rules, so **the order
    of the file matters**: add new rules at the end, or edit the v3 block that owns the component.
- **`css/history.css`** holds the history page's chapter layout and loads after `styles.css`.
- **Breakpoints:** 999px (tablet), 899px (header menu), 699px (phone), 599px (small phone).

## Behaviour to keep

1. **Reduced motion.**
   - Under `prefers-reduced-motion: reduce`, Lenis is not created, nothing pins, the dust and the torch are off, and
     every element stands in its final state.
   - Test the site with this setting on. Each page must read completely.
2. **No JavaScript.**
   - The content is in the HTML.
   - Motion only animates it from a visible end state, so the pages stay readable without scripts.
3. **Phone layouts (≤ 699px) are designed, not shrunk.**
   - **Hero:** the film runs across the top, under the header. The words, the buttons and the slide controller sit
     below the film, never over the car.
   - **The GT block:** a still 9:16 frame (`gt-coming-soon-phone*.jpg`). There is no pin, no lamps and no particles.
     The words sit in the empty lower half of the frame.
   - **Le Mans:** the clip on top with nothing written on it, then the six facts as a list.
   - **#76 and Le Mans** run edge to edge, with no inner box.
4. **Lenis.**
   - Scroll from code with `lenis.scrollTo(target)`. `window.scrollTo` does not move the page while Lenis is on.
   - Inner scrollers (the textarea, the map) carry `data-lenis-prevent`.
5. **Sections that are jump targets** (`#rpm-club`, `#contact` …) have `tabindex="-1"` so focus lands in them. They
   deliberately draw no focus ring; controls still do.
6. **Cache-busting.** Assets are referenced with `?v=` query strings. When you replace a file, raise its version, or
   phones will keep the old one.

## Accessibility

- **Contrast:** every text colour clears WCAG AA on its ground (ratios in `design-system/README.md`).
- **Text size:** functional text is never below 14px.
- **Images:** every image has an `alt` that describes what is in it. Decorative copies (the dimmed and lit stage
  frames) are `alt=""` / `aria-hidden`.
- **Keyboard:** the slide controller, the player, the form and the phone menu all work from the keyboard, with a
  visible focus state.

## Performance

- The heaviest files are the two films:
  - `hero-v3.mp4`: 9.3 MB desktop, 2.7 MB phone.
  - `lemans-76.mp4`: 7.7 MB. It is encoded all-intra so scroll scrubbing is smooth; it plays on the homepage only.
- Images below the first screen are `loading="lazy"`, and the large ones have `srcset` variants.
- Before launch:
  - put the site behind a CDN with long cache headers on `assets/`;
  - consider a WebM/AV1 copy of the films.
