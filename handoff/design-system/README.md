# Design system — Lake Forest Motor Sports v3

Open `index.html` (live: https://sigovs.github.io/LAKE-FOREST/handoff/design-system/) for the visual reference. Every
component on that page is copied from the built site and drawn by the site's own stylesheet, so it is always
exactly what ships.

## Files

| File | What it is |
|---|---|
| `tokens.css` | All design tokens as CSS custom properties, each with its role and its contrast ratio |
| `tokens.json` | The same tokens in the W3C Design Tokens format, for Figma Tokens / Style Dictionary |
| `index.html` | Living reference of colour, type, space, shape and motion, brand, components and rules |

The site itself declares the same values at the top of `site/css/styles.css`. `tokens.css` adds four named values
that the site writes out literally: `--rule`, `--r-media` (14px), `--r-pill` and the `--d-*` durations. Use the names
in new code.

## Colour

Ink on graphite: the interface has no brand hue.

| Token | Hex | Role | On `--ground` |
|---|---|---|---|
| `--ground` | #0b0c0d | page background | — |
| `--ground-2` | #121416 | raised surface: panels, the form, tiles | — |
| `--ink` | #edebe6 | primary text, primary button fill | 16.4:1 |
| `--ink-2` | #c9cbcd | secondary reading text | 12.0:1 |
| `--mute` | #a3a5a7 | captions, labels, sources | 7.9:1 |
| `--tone` | #8d8f91 | second line of a two-tone heading | 6.0:1 |
| `--gt-red` · `--gt-white` · `--gt-blue` | #e2342b · #e6e6ea · #1f5fd0 | the tricolour flag before a label, and nothing else | — |
| `--livery` / `--navy` | #5a9fc7 / #0d2236 | the #76 chapter only: navy text on livery blue | 5.6:1 |
| `--lm-blue` | #1869d2 | Le Mans: the lit fact, large type only | 3.7:1 |

All text clears WCAG AA. `--lm-blue` is for large type only, because it is 3.7:1.

## Type

The site uses one face, **Archivo** (variable: width 62–125, weight 100–900, from Google Fonts), in two voices:

- **Display voice:** weight 640, width 74. Used for titles.
- **Text voice:** width 100. Used for reading.

**Cinzel** is used only for the LAKE FOREST wordmark.

| Role | Token | Use |
|---|---|---|
| D1 | `--t-d1` clamp(64–148px) | the page's single peak: the hero title |
| D2 | `--t-d2` clamp(44–88px) | h1, chapter openers |
| D3 | `--t-d3` clamp(36–60px) | section titles |
| H3 / H4 | `--t-h3` / `--t-h4` | item titles, small titles |
| Sub-line | `--t-sub` | a separate statement under a title, in `--tone` |
| Statement | `--t-statement` | a chapter's single paragraph, set large |
| Lead | `--t-lead` | the first paragraph of a page or block |
| Body | `--t-body` 17px | reading text |
| Body small | `--t-body-sm` 15px | card, list and form text |
| Caption | `--t-caption` 14px | credits and sources; this is the smallest size allowed |
| Label | `--t-label` 14px / 600 / .14em, uppercase | eyebrows, field labels, metadata |

Each role sets its own leading and tracking in em, so pick a role rather than setting a size by hand.

**Two-tone titles.** A second line that continues the sentence keeps the title's size and takes `--tone` (`.tone`). A
second line that is a separate statement, such as a place, a descriptor or a status, uses the sub-line role (`.sub`,
`.hero__sub`).

## Space and layout

- **Spacing scale:** `--s-1` … `--s-11` = 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192px. Gaps inside a group are
  always smaller than gaps between groups.
- **Page margin:** `--gutter`, clamp(16px, 3.4vw, 48px).
- **Grid:** 12 columns (`--col`). Content usually starts half a column in.
- **Header:** 80px, or 72px below 900px. Anchors are offset by 96px.
- **Breakpoints:**

| Width | What changes |
|---|---|
| ≤ 999px | one column; pins and rails off |
| ≤ 899px | the phone menu replaces the header links |
| ≤ 699px | phone layouts: the hero, the GT block and Le Mans are recomposed |
| ≤ 599px | small-phone adjustments |

## Shape and motion

- **Radius:** 14px (`--r-media`) for framed photographs, panels and the form; pill (`--r-pill`) for buttons and chips.
- **Easing:** `--ease-out` cubic-bezier(.16, 1, .3, 1) for every arrival.
- **Durations:** hover .25s, state changes .4s, slide-ins 1.4s.
- **Engine:** GSAP 3.15 with ScrollTrigger, running on Lenis 1.3.26, all on one ticker.
- **Reduced motion:** no Lenis, no pins, every element in its final place.

## Rules

**Do**

- Use a type role from the scale.
- Keep photographs at natural brightness, with their credits.
- Give every animation a still state that reads on its own.
- Use one primary button per block; the second action is a line button or a text link.

**Don't**

- Set functional text below 14px, or long reading text in the display voice.
- Use the tricolour anywhere except the label flag, or add a new hue.
- Put words over a car on a phone. The picture goes first, then the words.
- Add a fact without a source.
