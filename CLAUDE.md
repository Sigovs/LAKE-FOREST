# Lake Forest Sports Cars

> Built to Alex's design system. The rules are **not vendored here** — they are
> resolved live, so this project never drifts from a stale copy.

# DESIGN DNA

**Read before producing anything visual** — a page, a component, a scene, CSS,
tokens, an image — and before any art direction, palette, type scale, spacing
ramp, motion or composition decision.

1. `/Users/alex/Desktop/WORK/design_dna/TASTE.md`
   — the manifest: operating rules, the two tiers, the Design Read, the dialect index.
2. `/Users/alex/Desktop/WORK/design_dna/.claude/rules/design-dna.md`
   — the build standard, `DNA1`–`DNA94`.
3. `/Users/alex/Desktop/WORK/design_dna/skills` — load the skills the task actually touches.
4. Fallback if this machine has no working copy: https://github.com/Sigovs/design_dna

**Say which path resolved, in one line, at the top of the report.**

## For scroll-driven or cinematic work

Load the **`scroll-site`** skill first. It carries the stack, the scaffold, the
concept gate and the definition of done.

## Stack

**Lenis ships on this project (`DNA90`)**, off under reduced motion, on one
loop with GSAP when GSAP is present.

## The concept gate

**`BRIEF.md` is complete before the first line of markup (`DNA1`).** An empty
section in it is an unfinished gate, not a detail to fill in later.

## Order of authority

1. Truth and access — contrast, provenance, reduced motion, discoverability.
2. `TASTE.md` and the INVARIANT tier of the skills.
3. The build standard, `DNA1`–`DNA94`.
4. The selected dialect, and this project's own direction below.
5. Plugins — `frontend-design`, Scrollcraft, `threejs-webgl`,
   `gsap-scrolltrigger`. **Reference only. They bind nothing** and are never the
   reason for a design decision. Neither is a library name.

## Working style

Never ask yes/no or confirmation questions to resolve taste — make the senior
call and note it in the report. Questions about **facts** — scope, content,
constraints, contradictions, missing assets — are expected. Three at most.

## Project direction

_A project direction is a brief executed inside the invariants, never instead of
them. Write it here: the business goal, the audience, what must not change._

- **Business goal:** the homepage of Lake Forest Sports Cars presents the Mancuso automotive
  family (since 1923) launching its own GT, an upcoming tribute to the Chevrolet Corvette.
  Racing history is the foundation of trust, not the aesthetic.
- **Audience:** collectors and LFSC clients.
- **Theme:** dark. A contemporary motorsport-launch presentation; NOT a historic car club, NOT
  a printed catalogue, NOT dark editorial (V1). `auction-editorial` is out for this project.
- **Must not change:** real photographs only, at natural brightness, never upscaled, with their
  printed credits; sourced facts only (`docs/client-questions.md` lists what is unconfirmed);
  Rick did not attend Le Mans 1976; historic cars stay in the history — the GT gets a compact
  announcement with confirmed facts and an enquiry CTA until it has its own photographs; the
  Vimeo teaser is never a main visual.
- **Current direction:** `docs/art-direction-2026-10-15-direction-c.md` and `BRIEF.md`.
- **Source photos** in `lake photos/` are read-only; web copies come from
  `tools/prepare-images.py`.

## Feedback log

- **Type system (approved 20 Oct 2026).** One face, Archivo. Display voice 640 / wdth 74; text voice wdth 100.
  Roles are tokens in `styles.css` `:root`: D1 (the GT), D2 (h1 and chapter openers), D3 (titles inside a
  chapter), H3, H4, sub-line, statement, lead, body, body-sm, caption, label (14px / 600 / .14em, uppercase),
  control (15px / 500). Each role sets its own leading and tracking in em; never add a size by hand.
- **Second lines:** a continuation of the sentence stays the title's size in `--tone`; a separate statement
  (a place, a descriptor, a status) is the sentence-case `.sub` role. "218 mph" is the page's number moment
  (`.figline`), never a geographic sub-line.
- **Rejected:** the whole display tier at regular weight / normal width with every second line uppercase grey.
- Long reading text is never set in the display face (the LFSC paragraph uses `.statement` sizing in the text voice).
- **TO VERIFY plate (28 Oct 2026, Alex).** When the client's reference to a photo is unclear, stand in the best real candidate and mark it
  with `.verify` (road-yellow plate, `styles-v2.css`); never leave the slot empty or guess silently. Remove the plate when confirmed.
- **"News section" (resolved 29 Oct 2026, client screenshot).** It is the homepage "Dealers and racers" block (`.era`): AutoWeek
  2005 is its third panel beside Lake Forest Sports Cars and Father and son. AutoWeek also keeps its own history chapter. No separate
  "In the press" section on the homepage.
- **GT page (28 Oct 2026).** Content only from the family's film (`docs/gt-film-content.md`); stand-in photos are original C2/C3 Corvettes,
  credited in place, until the client sends GT photos or renders. Rights for those are the client's call (Alex).
- **After launch (10 Nov 2026, Alex).** The live site (www.lakeforestmotorsports.com, AAN WordPress) was built from tag `live-2026-11`.
  Edits go into the v3 files as before. They are handed to the devs as **one combined package per round**
  (`handoff/changes/update-N/`), never one per change, and only once the client approves the preview. Packages are written so the devs can hand them to an AI agent as they are: exact
  before/after against the live code, raw download URLs and checks. Update 1: GT and RPM approved. The hero was revised on 11 Nov:
  the client's first note ("black lasts longer") was a mix-up for "the colour stays longer before the black car".
- **Gallery (11 Nov 2026, Alex).** `gallery_v3.html`: the family's photo archive, which the client will keep filling in the CMS. It is
  **its own header item after History, not a dropdown** (a History dropdown was built and rejected). Captions stay neutral: only what
  is visible, the camera date and facts already sourced; the client refines them. No duplicate frames. Photos come from
  `tools/gallery-data.json` via `tools/prepare-gallery.py` (EXIF/GPS stripped, sRGB, 960 tile + 1600 view, light files).
  Category filter, **rejected:** a plain hairline list with counts ("1/10"); a title-scale typographic index ("much smaller");
  a photo popping up beside the cursor on hover. **Current:** a small one-line bar, sticky under the header, control-size words
  with counts and a sliding 2px marker; it scrolls sideways when categories are added; a choice re-lays the grid with Flip.
- **v2 (28 Oct 2026):** client notes go into `index_v2.html` / `history_v2.html` / `styles-v2.css`; the delivered v1 (tag
  `client-2026-10-21`) stays untouched. Shared JS changes must keep v1 working (e.g. `data-speed` falls back to 218).
