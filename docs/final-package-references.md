# Final version: reference package

Started 2026-10-19. This file collects what we take from each reference into the final homepage. **Nothing here is built yet.** Add each new reference as its own section.

Binding rules carry over from `CLAUDE.md`:
- sourced facts only;
- LFSC is family history, not the GT's maker;
- no invented brand name, crest, specs, contacts or Instagram posts;
- no upscaling;
- Lenis is on from the first build;
- check desktop and mobile in a real browser.

---

## 1. AERO JET (Behance, private-jet landing)

Captures: `review/references/behance-private-jet/` 01–35.

### What we take

| Device | How it lands on our page |
|---|---|
| **Cut-out object on a calm ground** | The core move. The blue #76, the Spirit of Le Mans front and the #4 GTP sit as cut-outs on the graphite ground. The object is the composition; there is no photo rectangle. |
| **Huge ghost word behind the object** | A pale wordmark sits behind each cut-out. Candidates: a year (1923 / 1953 / 1976) or a place (LE MANS). It is set in our display face at very low contrast, and the car overlaps it. This continues D3's "livery" name idea, used as a ground rather than a headline. |
| **Two-tone headings** | Line 1 in full white, line 2 in grey. Example: "Four generations. / One line of cars." Use only on section openers, not on every heading. |
| **Eyebrow labels** | Kept (user decision 2026-10-19). Small uppercase plus a number, e.g. `01 — THE FAMILY`, `02 — LE MANS 1976`. One per section, always numbered. This merges with the F1 numbered eyebrow (§2). |
| **Pill buttons** | Kept (user decision). One style only: primary is filled, secondary is an outline pill. Used for "Explore the history", "Watch the film", "Send an enquiry". |
| **Spec cards over a photo** | Small glass cards anchored to a car, holding **sourced** numbers only. Example: "218 mph · Mulsanne, June 1976 (Fra Noi)". No GT specs exist, so the GT gets no spec cards. |
| **Equal-height photo tiles** | For the archive row (Lola, Ferrari 328, Aston 009, Mezzacca print). |
| **Minimal palette plus one accent** | AERO JET uses dusty pink. Our accent comes from the cars: #76 blue (`alex_images/Blue No. 76`) or Le Mans red. Choose **one**. |
| **Character at the end** | Kept (user decision). See the caution below. |

### The character: caution

A cartoon of a real person, such as Rick, Jim or another family member, would be generated imagery of a real person. Design DNA **GI3** forbids that, and it also needs the family's consent.

Allowed options:
- (a) a generic, non-likeness figure, such as a driver in a helmet with the visor down, or a mechanic seen from behind;
- (b) an illustration the client commissions or approves.

**Recommendation:** (a), a helmeted driver beside the contact form, waving off with a flag. It needs a client question if it is ever meant to be a family member.

### What we do not take
- The light theme. The brief requires a dark theme.
- Clash Display. We keep our own type decision.

---

## 2. Precision Control: F1 racing landing (Behance)

Captures: `review/references/behance-f1-precision/` (01.gif is the motion, 02–12 are stills).

### What we take

| Device | How it lands on our page |
|---|---|
| **Annotated hero** | The car side-on, with thin hairline callouts drawing in, each one a short line plus a label. For us the labels are **sourced history, not specs**: "Greenwood-built · 1976", "Le Mans 24 Hours", "218 mph on the Mulsanne". The GT gets no callouts until specs are released. |
| **Smoke / atmosphere reveal** | The car emerges from haze, then the haze clears. This is the reveal shot for the hero still or the peak (#76). We build it with a CSS/canvas gradient haze and a mask, not stock smoke footage. |
| **Marquee ticker strip** | One thin strip between History and the GT: `1923 · BENJAMIN · 1953 · JIM · 1976 · LE MANS · RICK · …`. It runs once on the page, as a transition. |
| **Numbered eyebrow, heavy uppercase heading, body, text link** | The section grammar for History chapters. It merges with AERO's eyebrows: `01 — 1923`. |
| **Framed image panel left/right** | Split panels alternate sides and follow the negative space in our photos (§3). |
| **Thin accent vertical line** | A section divider, and also a scroll-progress line down the History chapters. |
| **Countdown card** | **Not used as a countdown**: there is no launch date. If one is supplied (question #11), it becomes a GT card. Until then the slot holds "Introducing the GT — watch the film" (Vimeo). |
| **Footer CTA block** | A big closing word plus a pill CTA. Ours is "Next chapter." with an enquiry pill. |

### Motion read from 01.gif
1. The hero smoke builds, then the car resolves and the callouts draw in one after another.
2. Scroll pins the hero. The car stays while the text panel swaps.
3. The pin releases into split sections, and the image panels slide in from their own side.
4. The in-page scroll inside a panel is the idea the user flagged: the outer page is pinned while the content inside the frame scrolls. We use it for the **History timeline**. The section pins, and inside the frame the years scroll past while the car cut-out changes.

---

## 3. `alex_images/`: inventory (supplied 2026-10-19)

Contact sheet: `review/references/alex-images-contact-sheet.jpg`. These are the user's files; treat them as read-only like `lake photos/`.

| File | Size | Type | Space | Best use |
|---|---|---|---|---|
| `Blue No. 76 race car cutout.png` | 1448×1086 | **cut-out** | n/a | **Peak.** The #76 on the ghost word "76"; spec card 218 mph |
| `2b65f8f8-…png` (Spirit of Le Mans, front) | 1572×1001 | **cut-out** | n/a | Le Mans 1976 chapter, head-on; works for the "doors open" style reveal |
| `8040c663-…png` (#4 GTP, ¾ top) | 1672×941 | **cut-out** | n/a | Archive or transition; **status unconfirmed (question #17)** |
| `4abd3955-…png` (#4 GTP, side) | 1804×872 | **cut-out** | n/a | **Side-on for annotated callouts** (F1 move); only once #17 is cleared |
| `Number 4 Corvette GTP, doors raised.png` | 1539×1022 | **cut-out** | n/a | Visual break, symmetrical, doors up; #17 |
| `aston_back.png` (Aston 009, www.LFSC.com) | 1448×1086 | **cut-out** | n/a | The LFSC era (dealer racing), rear view. Doubles as an exit shot for the "sold" chapter |
| `back_red.png` (red prototype rear, paddock) | 1977×1079 | photo | centre | Visual break; car and source unidentified, so a client question |
| `Screenshot … Adam 2.png` (#4 panning, sunset) | 1920×1080 | photo | **left and top** | Full-bleed visual break with text on the left; #17 |
| `76 Greenwood Adam 1.png` | 2218×1384 | photo | **left and top** | Full-bleed break, text on the left |
| `76 greenwood 2 Adam 1.png` | 2307×1384 | photo | **both sides and top** | Wide break or hero alternative; text either side |
| `lola-on-track 1.png` (Lake Forest Lola) | 1520×799 | photo | **right** | Split panel with the image left and text right (LFSC racing era) |
| `ferrari-328-grattan 1.png` | 1095×724 | photo | left | Small archive tile only (low resolution) |
| `1976 Le Mans Corvette at Speed.png` | 1532×1026 | photo | **left and top (crowd)** | Le Mans chapter split panel, text top-left |
| `mancuso-76-mezzacca 1.png` | 1587×1016 | archive print | centre | Archive tile; credit Mezzacca (question #15) |

### 3b. Second batch: paper and documents (added 2026-10-19)

Contact sheet: `review/references/alex-images-contact-sheet-2.jpg`. All nine are flat scans of paper on a cream background. None is a cut-out.

| File | Size | What it is | What it proves / use |
|---|---|---|---|
| `1.png` | 1920×1080 | Revell kit box panel, "MANCUSO CORVETTE® #76", with plan and side views of the blue #76 | The known source for the "first customer car" claim (question #3). The **livery drawings** work as an annotated graphic; quote the text as "per Revell". |
| `4.png` | 1920×1080 | *Le Maine Libre* front page, 24 H. The masthead says "Demain: St A. de Padoue" (13 June), with the Spirit of Le Mans Corvette on track | **Strongest Le Mans 1976 artefact.** A local newspaper on race weekend. It is the hero object of the Le Mans chapter: the newspaper as a cut-out on graphite, its masthead as the eyebrow. |
| `3.png` | 1080×1080 | Yenko "Mini Muscle Cars / The Deuce" flyer, dealer-stamped **MANCUSO CHEVROLET, INC., 4700 Golf Road, Skokie, Ill. 60076** | **New sourced fact:** a Mancuso Chevrolet dealership in Skokie that sold Yenko cars. Fits the dealership generation. The flyer is undated, so no year goes on the site until the client confirms one. |
| `5.png` | 1920×1080 | B&W photo of the **Mancuso** theatre marquee ("Get Shorty / Jade", so 1995) | **Previously excluded by the user ("theatre out").** It needs a decision: is the family link confirmed (question #7)? Do not use it until then. |
| `2.png` | 1080×1080 | Technical sheet, "Section 1 – Chassis": **Lola, 1984, chassis HU T711-02**, carbon/aluminium honeycomb monocoque | Identifies the #4 GTP as the **Lola T711 GTP Corvette (1984)**. This answers *what* the car is; the family link is still question #17. |
| `5ef10ecd…png` | 1427×1102 | GTP Corvette press brochure page (Aerodynamics / Cockpit) | GTP archive spread, same status as above |
| `d095bb88…png` | 1339×1174 | "GTP CORVETTE" brochure with the Chevrolet cutaway illustration | **Cutaway drawing.** A ready-made image for the F1 "annotated callouts" idea. Its rights belong to Chevrolet (rights question). |
| `d8b9da35…png` | 1362×1155 | GTP brochure "Platform" page (Lola badge, mechanics at the car) | GTP archive |
| `3e8cab46…png` | 1434×1097 | Chevrolet PR "Specifications/Comparisons": GTP Corvette vs production Corvette | **Never use as GT specs.** These are 1980s GTP figures. At most, show them as an archive document. |

#### How the paper goes into the design
- **Documents become a second kind of cut-out.**
  - Crop to the paper edge, place on graphite with a soft contact shadow, and add a slight rotation (≤2°). There is no photo frame.
  - This happens in derivatives made by `tools/prepare-images.py`; `alex_images/` is never written to.
- **They answer the "where is the evidence" problem.** Each History chapter gets *one car, one document*:
  - 1953 dealership: the Yenko flyer stamp;
  - 1976: the *Le Maine Libre* front page and the Revell #76;
  - the GTP era: the Lola sheet and the cutaway.
  - In the pinned in-frame scroll (§4, act 3), the document slides in over the car as the second stop of each chapter.
- **Callouts from a document:** zoom into the Yenko stamp ("Mancuso Chevrolet, Inc. · Skokie") with a hairline callout. It is the F1 annotation move applied to a source, not to specs.
- **Size limits:**
  - The scans are 1080–1920 px wide, and the actual paper inside them is narrower: the newspaper is about 1100 px, the flyer about 820 px.
  - So documents render at ≤550 CSS px wide on a 2× screen, and zoom-ins are crops at 1:1, never enlarged.

#### New client questions
- The Yenko flyer: what year, and was Skokie the first Mancuso Chevrolet location?
- The *Le Maine Libre* page: is it the family's own copy, and may we reproduce it?
- The GTP brochure and cutaway: Chevrolet material, so do we have permission? Were the Mancusos involved with the Lola T711 (#4)?
- The theatre photo: is it in or out? It was excluded earlier.

### 3c. Black-and-white set, for contrast (added 2026-10-19)

Contact sheet: `review/references/alex-images-contact-sheet-bw.jpg`. Four files, all 1672×941 and opaque. The printed credit "photo courtesy of Albert Lamberts" is visible on bw1–bw3, so rights fall under question #15 and the credit stays inside the frame.

| File | What it shows | Space | Best use |
|---|---|---|---|
| `bw1.png` | Spirit of Le Mans #76 laying **tyre smoke**, ¾ front, TOTAL hoarding and the crowd | **left** (smoke) and the top band | **The real smoke for the F1 "smoke reveal"**, so no synthetic haze is needed. Text sits in the smoke on the left. Hero or Le Mans chapter opener. |
| `bw2.png` | Same car from the rear, a smoke trail across the frame, ACO banners | **left and bottom** | Pair with bw1 as a two-frame cut during the pin: frame 1 car arrives, frame 2 car leaves. Scrub crossfade on scroll. |
| `bw3.png` | Car on the grid/pit lane, head-on ¾, crowd and photographers around it | little; it is busy | Human-scale "on the day" image. An archive tile or the chapter's second stop. Not a text ground. |
| `bw4.png` | **Cockpit macro**: wheel, gauges, gear lever, extinguisher | right (upper) | **Macro shot / visual break.** The only interior image we have. Use full-bleed at 1×, or framed beside the 218 mph spec card. |

**Role in the system:** B&W is the archive register, and colour is the object register. Colour cut-outs (blue #76, Spirit front) sit on graphite. B&W full-frame photos are the breaks between them. The contrast between the two **is** the rhythm: colour object → B&W atmosphere → colour object.

**Hero decision (user, 2026-10-19): the hero is COLOUR, not B&W.** The hero is the colour Spirit of Le Mans #76 front cut-out (`2b65f8f8…`) in front of MANCUSO, over a dimmed colour Le Mans 1976 ground. bw1/bw2 become the B&W smoke break that opens the Le Mans chapter. The superseded idea is kept below for the record.

**~~Revised hero candidate~~ (superseded):**
- bw1 full-bleed, with MANCUSO set inside the smoke on the left.
- On scroll, the smoke frame dims, and the colour Spirit of Le Mans cut-out (`2b65f8f8…`) resolves in the same position.
- This is the move from history to the object, and it uses real smoke instead of a CSS effect.
- **Size:** 1672 px is about 840 CSS px at 2×. As a full-bleed image at 1440 it renders at ~1.16× device pixels, which is soft. The smoke hides the softness, so it is acceptable for the hero; the car stays crisp in the colour cut-out.

**Check:** were these converted to B&W from colour originals in `lake photos/`? If so, the conversion is a deliberate art-direction choice. Record it, and keep the colour version as the source.

### Size limits (no upscaling)
- Cut-outs are 1448–1804 px wide. On a 2× screen that is at most **~720–900 CSS px** across.
- So cut-outs fill about half of a 1440 frame, not the full width. The ghost word and the haze carry the rest.
- Full-bleed breaks need ≥2880 px for a sharp 1440@2×. Only the two "Adam" Greenwood frames (2218 / 2307) come close: use them at 1× full bleed and accept a slight softness, or set them inside a frame at ~1150 px.

### Questions to add to `client-questions.md`
- The "Adam" frames: who took them, and are they current photos of the restored car? Are they cleared for use?
- The red prototype in `back_red.png`: what car is it?
- The `alex_images` cut-outs: who made them, and may we publish them?

---

## 4. Motion plan for the final

The stack is the same as D3: GSAP 3.15 + ScrollTrigger, and Lenis 1.3.26 on `gsap.ticker`.
- Lenis is set to `autoRaf:false`, `anchors:true` and `lagSmoothing(0)`. It is not created under reduced motion.
- **Lenis is in the first commit**, before any pin is tuned.

| # | Act | Shot | Pin / stop | Desktop | Mobile |
|---|---|---|---|---|---|
| 1 | Hero | reveal | short pin (~120vh) | Haze clears and the hero still or cut-out resolves. The name sits behind. Callouts draw in on scroll, hairline first, then the label. | No pin. Haze fades on load, callouts appear as a list under the image. |
| 2 | Ticker | interruption | none | The marquee strip runs once and is scroll-linked (speed follows velocity). | Same, slower. |
| 3 | History 1923 → 1953 → LFSC (car + document per stop) | **in-frame scroll** (F1 idea) | **pinned frame ~300vh** | The outer page stops. Inside the frame, the years scroll on the left while the car cut-out swaps on the right. The ghost year behind changes with each. Snap stops at each chapter. | No pin. Stacked chapters, each with its eyebrow, cut-out and ghost year. |
| 4 | Peak: #76 / Le Mans 1976 | push-in | pin ~150vh | The blue #76 cut-out pushes from ~60% to full allowed size over the ghost "76". The spec card (218 mph) and callouts appear. This is the most scroll room on the page. | The cut-out scales in once, followed by a spec card. |
| 5 | Visual break | release | none | Full-bleed Greenwood "Adam" frame with slow parallax (≤8%) and one line of text in the negative space. | Static crop. |
| 6 | Archive row | dolly | none | Equal-height tiles move sideways with scroll (horizontal track, pinned ~100vh). | Native horizontal scroll with snap, `data-lenis-prevent`. |
| 7 | The GT | reveal | short pin | Black frame and a "Next chapter" two-tone heading. Film pill (Vimeo on click). No car image until question #10 is cleared. | Same, no pin. |
| 8 | RPM Club / Instagram / contact | release | none | Calm, small reveals only. The character waves at the contact form. | Same. |

Stop frames for review: **eight positions**, one per act, each judged as a composed frame at 1440 and 390. Record two videos with the stops (desktop and mobile), as for D3.

---

## 5. Vault board

`review/vault-all-sites.jpg`: 36 sites. The final is judged against them side by side **before** it is shown. If it does not hold up next to the board, it is not ready.

---

## 5b. Mood board (Midjourney, from our prompts, added 2026-10-19)

Folder: `mood_board/`, with 6 stills and 3 five-second videos. Frame strips of the videos are in `review/references/mood-board/`.

**This is a mood board, not assets.** The cars are invented (a Porsche 917-like car, a C3 Corvette), and "MANCUSO" is garbled. Nothing from it ships (GI3/GI6). We take composition, motion and register.

### What we take

| # | Device | Source | How it lands |
|---|---|---|---|
| M1 | **Callouts that rise out of the scene as a timeline.** Hairlines rise vertically from the smoke to staggered heights, each ending in a year and a short note. | "oooomy god…png", "full-length…png" | **Signature move candidate.** In the hero, the annotation lines *are* the timeline: 1923, 1953, 1976 and so on hang above the car. On scroll, the page dives into the year a line points at. This replaces generic spec callouts and stays sourced. |
| M2 | **Documents surface on the callout lines.** Newspaper, magazine cover and spec card float up out of the smoke and pin at the top of the lines. | video "what a concept", video "oh my" | Scroll-scrubbed: our real documents (*Le Maine Libre*, Revell box, Yenko flyer) rise on their lines one by one, in history order. |
| M3 | **The camera dives in** to the car flank, then a close-up, then pulls back. | video "oh my", video v0 | The peak shot (#76 / Spirit): a pinned push-in through 3 stops. Only scale and position change, never upscaled past the source; the close-up is a 1:1 crop of the cut-out. |
| M4 | **A single light trail arcs around the car** (cyan swoosh). | video "what a concept" | One SVG stroke (DrawSVG) tracing the car's line once on arrival. Used only in the hero. |
| M5 | **A type wipe:** the name is split by a cyan bar that wipes through it ("MAN▌CUSO"). | video v0 | Transition from hero to History: the accent bar sweeps through the name. |
| M6 | **A smoke band across the hero with the name inside the cloud**, thin wide letters. | "Tall_916…png" | An alternative hero type treatment (wide, thin, inside the smoke). Keep as option B to the condensed heavy MANCUSO. |
| M7 | **Objects hung on vertical timeline rails.** Family photo, flyer, car and newspaper each pinned to its own line; years at the foot of the rails. | "Tall_916…png" | The History pinned frame: three vertical rails, with an object sliding along its rail on scroll. Pairs with the F1 in-frame scroll. |
| M8 | **The road centre-line as the timeline.** A yellow dashed lane line runs vertically, with a car crossing it and a giant year at the top. | "history…_3.png" (1977 poster) | **Strong candidate for the page spine.** The dashed centre-line runs down the whole History section, the scroll progress fills the dashes, and the year at the top changes. |
| M9 | **Colour object over a monochrome world.** A coloured car comes out of smoke onto a desaturated, newsprint ground with one beam of teal light. | 1977 poster | **This answers "colour hero" without losing the B&W set.** The colour Spirit cut-out sits over bw1's smoke (desaturated); the car is the only full-colour thing on screen. |
| M10 | **Diagonal race lines across a newspaper collage**, with a numbered marker on the line. | "history…_0.png" | Le Mans chapter opener: the newspaper tilted ~15°, the accent lines cross it as the racing line, with a "76" marker. |
| M11 | **Filmstrip navigation** at the foot: a row of tiny car thumbnails with the active one highlighted. | "THE Store" stills | The archive row as a filmstrip, which also works as the History chapter index (click to jump). |
| M12 | **A big numeral plus two text columns.** The large "1" in the accent colour beside a body set in two columns. | "THE Store" stills | The chapter text block below each History stop. |

### Video timing (frames every 0.25 s, motion energy measured per 0.25 s)

Strips: `review/references/mood-board/dense-v0…v3.jpg`. There are four clips, each 5 s at 24 fps.

| Clip | Beats | Energy curve |
|---|---|---|
| **v2 "what a concept"** | 0–0.25 hold. 0.25–1.0 **cyan trail arcs once around the car**. 1.0–2.0 **three documents rise onto the callout lines, staggered about 0.25 s**. 2.25–3.25 **push-in head-on** (~1.6×). 3.25–3.75 hold close. 3.75–4.5 pull back, cards retract. 4.5 chequered flag. | Calm, peaks at 10. **The cleanest model for the hero pin.** |
| **v1 "oh my"** | 0–1 slow push. 1.25–2.25 two photo cards rise (one is a blue car). 2.5–3.0 the camera **whips into the flank**. 3.0–4.25 tracks along the side. 4.5 the name locks up with a flag. | Builds to a peak of 22 at 3 s, then settles. Model for the **#76 peak**. |
| **v0 "MAN▌CUSO"** | 1.0–1.25 the name lands. 1.25–2.0 **a cyan bar wipes through the name**. 2.0 a document card. 2.25–3.25 dolly along the car (peak 28). 3.5 **returns to the opening frame**. | Strongest, and ends where it started. |
| **v3 (0496…_2)** | 0.25–2.0 dolly in while **document tiles slide down from the top like a strip** (blue car, newspaper, a number card). 3.0 a vertical cyan bar sweeps. 3.5–4.75 **the car drives past IN FRONT of a giant ground-level MANCUSO**. | Model for the **History → name** transition. The car crossing the name is the paddock rule in motion. |

**What the timing teaches**
- Every clip follows the same structure: **hold → one accent gesture → objects arrive staggered → camera move → hold → release.** Only one thing leads at a time.
- At most one camera move per beat, and the documents never move while the camera does.
- Three of the four clips end on their opening frame, so **a scroll-scrubbed version reverses cleanly**.

**Translation to scroll.** 5 s maps to one pin of about 250vh.

| Pin progress | Beat |
|---|---|
| 0–10% | hold |
| 10–30% | the trail draws |
| 30–55% | documents rise, staggered |
| 55–75% | push-in |
| 75–85% | hold, with a snap stop |
| 85–100% | release into the name wipe |

On mobile: no pin. The trail draws once on load; documents appear as a stacked list; there is no push-in.

### Palette shift the moods suggest
- **Cyan (#2FD3E0-ish) plus yellow line (#F2D21B-ish)** on near-black and newsprint grey.
- Cyan is close to the #76 blue, so it replaces the light blue as the accent.
- **Yellow is functional only:** the centre-line, the marker and the progress fill. It never appears on text or buttons. This keeps "one accent" honest: cyan is the accent, yellow is a road marking.

### What we do not take
- The light theme ("full-length…png"): the brief is dark. Its **blueprint line drawings** are kept as a document type (the GTP cutaway, the Revell plan view).
- Invented cars, garbled names, "THE Store" wordmark.
- The gradient from graphite to steel blue down the page (Tall_916): it reads as a template sky. Rejected.

### Consequence for the hero (supersedes 3c)
**The hero becomes M9, M1 and M4:**
- bw1 smoke frame, desaturated, full-bleed;
- the colour Spirit of Le Mans cut-out resolving out of it (the only colour on screen);
- MANCUSO behind the car;
- hairline callouts rising from the smoke to the years;
- one cyan light trail on arrival.

On scroll, the documents rise onto the lines (M2), then the name wipe (M5) leads into History, where the dashed centre-line spine (M8) takes over.

## 6. Open: next references
- (waiting for the user)
