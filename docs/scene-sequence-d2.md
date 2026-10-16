# LFSC · Sketch D2 — the scene sequence

Art-director's direction, 2026-10-16. Direction only: no markup, CSS or scene code is in
this file. It supersedes the *form* of sketch D and BRIEF.md §2, §6 and §7 for D2; the
content, copy, sources, tokens and Direction C's carriers stay. Builder: `designer` (static
composition). Motion: `motion-designer` (the motion module and the recording). Review:
`design-critic`. Gate 5 is Alex's.

Resolved from: `/Users/alex/Desktop/WORK/design_dna/TASTE.md` (canonical Mac path), build
standard `.claude/rules/design-dna.md`, skills academic-composition, motion-judgment and
dimensionality, dialect `immersive-authored-world`. Every asset below was opened and
measured. Native sizes come from the files, and lettering positions were read off
gridded previews (±2%). The builder re-measures them on native pixels (§2.0).

---

## 0. Verdict on D, and the Selection Pass

D collected the material, and the user's verdict is right. Every scene in D is the same
object: a heading, a paragraph, and one or two rectangles on black, laid out on a grid.
Nothing on the page goes from one generation to the next, so a century comes across as
a list. The lower third (GT, RPM, Instagram, contact) is text in boxes.

The real problem was never polish. D had no idea about how one generation becomes the
next, which is the only thing a family history has to show. D2 is built on that idea.

- **Carried from D, verbatim:** all copy, sources and captions in `sketches/d-family/index.html`.
  The only copy changes are listed in §8. Also carried: `form.js` validation, the
  Lenis-on-`gsap.ticker` setup, and the token values.
- **What D did better, kept:** D's `pass` device, where the makes hand "Chevrolet" to the
  dealership. It survives in S1 in a new form. D's captions are also kept: they are honest
  about what is not recorded.
- **Killed:** D's `join` device (the crest rising onto the paddock), D's dashed
  "handle to be confirmed" box, the GT eyebrow line (§8), and D's ruled spec rows.
- **Files:** D2 is built in `sketches/d2-scenes/`. When D2 is delivered, `sketches/d-family/`
  is frozen as a reference and stops being live. It is not a parallel option.

---

## 1. Design Read, concept, peak

```
Reading this as a scroll-led family-history homepage for collectors and LFSC clients, leaning contemporary motorsport launch (cinematic-documentary).
Mandate: REDESIGN — carried untouched: the names and LFSC wordmark as set; every line of copy, source and caption in D; real photographs at natural brightness, CSS width ≤ native, printed credits intact; Funnel Display + Funnel Sans; ground #0F1112 / ink #EDEAE4 / secondary #A7ABAD / red #EF3A4C (GT only); section order Hero → History → GT → RPM Club → Instagram → Contact; Lenis. In scope: composition, scale, scene structure, photo behaviour, motion.
Style mode: HYBRID — anchor immersive-authored-world / contrast technical-luxury / signature expressive-poster (image-scale collision only); unifying principle: the name holds still while the machine changes.
Dimensionality: SUPPORT — 2.5D photographic depth (scale-to-native, layering, travel, registered cuts) carries the relays; the static build stands without it; no 3D.
```

### The concept

> **The page holds the Mancuso name still while each generation's machine changes around
> it — sign, transporter, race car, trailer — until the line painted on the trailer
> becomes the GT's own.**

The fact behind it is in the photographs, not in my head. The family painted its name on
every machine it had: "MANCUSO CHEVROLET" on the OK Used Cars sign, "Mancuso Chevrolet
CHICAGO" on the transporter, "MANCUSO CHEVROLET" on the #76's hood, "MANCUSO · FYHRIE ·
GREENWOOD" across its windscreen, "LFSC" on the Ferrari 328, "www.LFSC.com" on the Aston
#009, and "LAKE FOREST SPORTSCARS" on the Lola trailer. Under that last one, in small
capitals, the trailer reads **"BY MANCUSO / AN AUTOMOTIVE FAMILY SINCE 1923"**
(`lola-paddock-trailer.jpg`, at x 0.41–0.46, y 0.41–0.43, partly hidden by an orange
pole). That is the same line as the GT film card's "by Mancuso … An automotive family
since 1923". The trailer and the GT carry one sentence.

```
Concept Gate: PASS
CG1 opens on the family's name, not a style, device or tool.
CG2 one sentence; falsifiable — it fails if the photographs did not carry the name (they do, measured).
CG3 replace the registered relays with fades and the generations become a slideshow; "holds still" is gone. The technique carries the meaning.
CG4 static build: every relay frame still shows the name in place, and the GT line sits beside the trailer print that carries it. The point survives with nothing moving.
CG5 not D (pass/join), not C (strip), not V1 (rail), not Pagani's atelier split or 296's sticky stack; registration on painted lettering exists only because this family lettered everything it owned.
CG6 one direction.
CG7 carried down to the last mass — see the ledger in §3.
```

### The peak (`DNA28`)

**S6, "The line lifts off the trailer."** The camera pushes into the Lola trailer until it
reaches native resolution. "BY MANCUSO / AN AUTOMOTIVE FAMILY SINCE 1923" arrives at the
page's hold point. The line then lifts out of the paint into set type and becomes the
GT's announcement. The peak gets:

- the largest asset (`lola-paddock-trailer.jpg`, 2400 px, 672 KB);
- the page's only deliberate silence in front of it (30 vh of ground after S5);
- the longest pin (240 vh).

The #76 relay in S2 is the history's own climax. It is demoted to a 180 vh pin, uses a
smaller asset (353 KB), and has no silence in front of it.

### The signature move (`DNA37`)

**The painted line becomes type.** A line of lettering photographed on the family's
trailer is matched in position and size by set type. The photograph then contracts
away, and the type stays and grows into the GT's line. It is built from this family's
own words on its own trailer. No other site has the material to do it.

### Feeling curve (`DNA29`)

| # | Scene | Feeling | What causes it |
|---|---|---|---|
| S0 | Hero | arrival, scale | 1976 grandstand; the camera closes in on the family's car among the crowd |
| S1 | The house, 1923–1953 | roots, patience | twelve makes pass like decades; "Chevrolet" lights; the house's own paper |
| S2 | The name goes racing, 1972 | ambition, pride | the name on the sign becomes the name on a truck, then on a race car, without leaving its place |
| S3 | Le Mans, June 1976 | drama, then loss | the newspaper, the car's face, **218 mph**, the car passing in smoke; Rick at home |
| S4 | Lake Forest Sports Cars | momentum, plurality | Ferraris and an Aston run past on one shared line of LFSC lettering |
| S5 | Father and son | intimacy, lineage | wide paddock, then down to the crest on a nose; then silence |
| S6 | **Peak** | recognition | the trailer's painted line is the GT's line |
| S7 | The GT | anticipation | what is known, what is not yet, how to ask |
| S8 | RPM Club | company, warmth | the family's voices, weekly, on Chicago radio |
| S9 | Instagram + Contact | invitation, resolution | write to the family; the page hands over an input |

The Instagram band and Contact share S9. Kept as an act of its own, Instagram would
produce the same feeling as S8, the "present tense" of the family (`DNA29`), so it
becomes the first beat of the ending. It keeps its own heading and `id="instagram"`.

---

## 2. The linking system: **hold the name, change the machine**

One system for the whole page. It is not a one-off effect in each scene.

**2.0 Data.** Each photograph that carries the family's lettering gets a
`data-name="x,y"` attribute: the centre of the lettering as a fraction of the native image.
The builder measures it on native pixels. These are my readings:

| Asset (native) | Lettering | Centre (x, y) |
|---|---|---|
| `mancuso-chevrolet-sign.jpg` 600×465 | MANCUSO CHEVROLET panel | 0.55, 0.59 |
| `mancuso-chevrolet-letter.jpg` 619×800 | MANCUSO CHEVROLET letterhead | 0.33, 0.10 |
| `mancuso-truck.jpg` 2048×1536 | Mancuso Chevrolet / CHICAGO | 0.25, 0.25 |
| `mancuso-76-blue-wide.jpg` 2048×1056 | MANCUSO CHEVROLET (hood) | 0.28, 0.385 |
| `mancuso-76-windshield.jpg` 648×414 | MANCUSO · FYHRIE · GREENWOOD | 0.45, 0.40 |
| `ferrari-328-grattan.jpg` 800×534 | LFSC (front quarter) | 0.88, 0.78 |
| `ferrari-328-grattan-front.jpg` 800×534 | LAKE FOREST SPORTSCARS · MOSLER RACING (windscreen) | 0.40, 0.25 |
| `aston-009-rear.jpg` 1600×1200 | www.LFSC.com | 0.50, 0.69 |
| `lola-tents.jpg` 2000×1500 | LAKE FOREST SPORTSCARS (valance) | 0.38, 0.33 |
| `lola-paddock-trailer.jpg` 2400×1596 | LAKE FOREST SPORTSCARS | 0.41, 0.32 |
| ″ | BY MANCUSO / AN AUTOMOTIVE FAMILY SINCE 1923 | 0.433, 0.418 (≈120×35 px native) |

**2.1 The hold point.** The page has one fixed coordinate, **H = (25vw, 30vh)**. At
1440×900 that is (360, 270). The eye learns it in S1, when "Chevrolet" lights as it
crosses H. In S2, the sign's panel, the transporter's lettering and the #76's hood
lettering all sit on H, one after another, while the photographs change around them. In
S6, the trailer's painted line arrives on H at native size. In S7, the GT line stands
on H. The hold point is never drawn. It is felt because the eye does not have to move
while the world does.

**2.2 The registration rule.** In a relay, the photo is placed so that its `data-name`
point lands on H, subject to two constraints:

- the photo still covers its stage;
- its CSS scale never exceeds native.

When both cannot hold at a viewport, the photo takes the nearest feasible position, and
the name drifts as little as possible. The builder computes this; nobody hand-places
it. I verified that it is feasible at 1440×900 for every relay (numbers in S2 and S6).

**2.3 The line.** In S4 the name does not hold still: it *runs*. Every LFSC frame in the
reel hangs at the height that puts its lettering on one horizontal, y = 55vh. The frames
step up and down as a result. That stagger is Fukinsei that comes from the material
(Shizen), not from a grid offset.

**2.4 Where the system is deliberately absent.** The hero, Le Mans, RPM and Contact do
not use it. Le Mans is the interruption: the name went to France without the man. A
device used at every seam stops saying anything (`MJ2`).

**2.5 The caption strip.** Pinned stages (S2, S6) are 100vh tall. The photographs fill the
top `100vh − 64px`, and a 64 px strip of ground at the bottom carries the live caption
(Sans 14/20, #A7ABAD, left at x 64). The caption crossfades as the frame changes, like a
film subtitle. Its job is to keep provenance legible during full-bleed frames without
putting captions on photographs. It is the one recurring device that holds captions.

---

## 3. The scene sequence (desktop 1440×900 unless stated)

**Grid, named after the masses:** 12 columns, 64 px margins, 24 px gutters (column ≈ 87 px).
Positions are given in px at 1440 and scale with the viewport.

**Type** (Funnel Display 600/700, Funnel Sans 400/500/600; no serif, mono or italic):

| Role | Spec | Used in |
|---|---|---|
| `gt` | Display 700, 152/0.92, −2% tracking | "The GT." only |
| `number` | Display 600, 176/0.9, tabular | "218" only |
| `makes` | Display 600, 96/1.0 | S1 line |
| `h1` | Display 600, 60/1.04, −1.5% tracking | hero |
| `line` | Display 600, 52/1.08 | the lifted line, S6/S7 |
| `h2` | Display 600, 44/1.1, −1% tracking | chapter headings; year as first word |
| `lead` | Sans 400, 20/30 | GT description |
| `body` | Sans 400, 17/27, max 36em, #EDEAE4 at 86% | — |
| `caption` | Sans 400, 14/20, #A7ABAD | — |
| `label` | Sans 600, 14/18, uppercase, +6% tracking | eyebrows, field labels |

Years are never plates or running heads. A year is the first word of its `h2`
("1953 — His son Jim opens…"), in the same size and weight.

**Photographs:** no container, border, radius, shadow, grade, rotation or scrim-as-mood.
Each photograph sits directly on the ground with its caption beneath. Printed credit
bands are never cropped. The only scrim on the page is the hero's legibility gradient
(S0), and its contrast is measured.

---

### S0 · Hero — "Le Mans, June 1976" (cold open)

- **Shot:** reveal → push-in.
- **Asset:** `hero-lemans-1976-2400.jpg` (2400×1609), displayed 1440×965 (0.60 native),
  top-anchored, the bottom 65 px cut. The 1400w derivative is **not** used at ≥1400 px:
  at 1440 it would be upscaled. Mobile uses `hero-lemans-1976-mobile.jpg`.
- **Masses:**
  - M1, the field: the full viewport. The lead car (Spirit of Le Mans #76) is the focal
    point at (1008, 598), about 0.13 of frame width. The air around it is the 100,000
    people in the grandstand: it is the scene, not empty space.
  - M2, identity mass: x 64–664, y 520–780.
    - Label "Lake Forest Sports Cars".
    - `h1` in three lines: "The Mancuso family. / In the automobile / business since 1923."
  - M3, the GT line and the CTAs: x 64–664, y 800–880.
    - GT line (`body`, ink).
    - "Explore our history": ink fill, ground text, 48 px high.
    - "Discover the GT": red #EF3A4C text and 1 px red outline. This is the first red on
      the page, and it belongs to the GT.
  - M4, caption: bottom-right, x ≤ 1376, y 864. "Le Mans, June 1976 — one chapter of
    the family story."
  - Excluded from the event: the nav, which is a hairline LFSC wordmark plus 4 links,
    hidden on scroll-down and while pinned.
- **Safe zone:** the lower-left asphalt (x 0–0.46, y 0.55–1.0). Legibility gradient: from
  #0F1112 at 0% (y 500) to 72% (y 900). Measure body text ≥ 4.5:1 against the worst
  region, which is the white curve lines.
- **Motion:** pinned 60 vh.
  - Scroll 0–40%: the text block exits per `DNA95` (rises 72 px, fades to 0, linear,
    scrub 0.35).
  - Scroll 0–85%: the photo scales 1.00 → 1.38 about the lead car (origin 70% 66%).
    1.38 × 1440 = 1987 px, which stays under the 2400 native.
  - Scroll 85–100%: hold on the car among the crowd. Release.
  - Role: narrative progression, approaching the family's car.
  - No load animation. The first frame is the composed frame.
- **Handover:** the photo's bottom 12% fades into the ground (Rolls-Royce: one
  continuous environment). S1's type begins on that ground with no seam and no box.

### S1 · The house, 1923–1953 (Benjamin → Jim)

- **Shot:** interruption (type), then the paper of the house, close.
- **Assets:**
  - `mancuso-chevrolet-letter.jpg` 619×800, displayed 372×481 (0.60).
  - `yenko-deuce-ad.jpg` 615×800, displayed 340×442 (0.55).
  - No photograph for Benjamin. None exists, and none is borrowed.
- **Masses** (scene ≈ 180 vh):
  1. 1923 block, x 64–600, y 120:
     - `h2` "1923 — It began with Benjamin Mancuso, a pioneer dealer in Batavia, New York."
     - `body` "He founded … as a dealership for:".
  2. The makes line, y ≈ 420–516: one line of `makes`, about 4,100 px long. Studebaker ·
     Oldsmobile · Chevrolet · Buick · Pontiac · Cadillac · Honda · Saab · Peugeot · Aston
     Martin · Maserati · Ferrari, separated by 72 px of air with no dots, in #A7ABAD.
     **"Chevrolet" lights to full ink as its centre crosses x = 25vw (H)** and stays lit.
  3. 1953 block, x 760–1376, y 640:
     - `h2` "1953 — His son Jim opens Mancuso Chevrolet in Skokie, Illinois."
     - `body` (road rallyer, Great Lakes Mille Miglia).
     - `caption` source.
  4. The house's paper, below-left, stepping down as the counterweight to the 1953 block:
     - letter at x 64–436, y 700–1181;
     - Yenko ad at x 484–824, y 820–1262.
     - Each has its caption under it. They do not overlap and are not rotated.
- **Composition:** a diagonal from the 1923 block (top-left) through the makes line
  (full width) to the 1953 text (right) and down to the paper (lower-left). The paper's
  low-left mass hands the eye to S2's sign, which hangs top-left.
- **Motion:** not pinned. The makes line translates −2,800 px horizontally, linked to the
  scene passing through the viewport (scroll-driven CSS `view()` timeline is enough,
  `DNA45`).
  - "Chevrolet" lights with a 240 ms colour change when it crosses H. Role: narrative
    progression, the decades pass, plus hierarchy, the family's make.
  - The paper does not move.
- **Static and reduced motion:** the makes wrap into three lines across 64–1376, with
  "Chevrolet" in ink.
- **Handover:** the scroll passes the paper. S2's stage pins with the OK sign already
  hanging from the top-left at H, so the family name is the first thing on the new
  stage.

### S2 · The name goes racing, 1972 (Rick) — relay I and II, then the crew

- **Shots:** dolly (scale-to-native reveal) → match cut on the name → dolly out → macro
  (the crew).
- **Assets:**

  | Asset | Native | Display |
  |---|---|---|
  | `mancuso-chevrolet-sign.jpg` | 600×465 | native |
  | `mancuso-truck.jpg` | 2048×1536 | 1440×1080, crop to stage |
  | `mancuso-76-blue-wide.jpg` | 2048×1056 | native (1.0), then 1440×743 |
  | `mancuso-76-windshield.jpg` | 648×414 | native |
  | `crew-pitwall.jpg` | 648×414 | 560×358 |
  | `crew-garage.jpg` | 648×414 | 416×266 |
  | `crew-x.jpg` | 648×414 | 416×266 |

  `crew-kodak.jpg` is held in reserve (§6).

- **Stage (pinned 180 vh):** 1440 × (900 − 64) for photographs, plus the 64 px caption
  strip.

  | Scroll | What happens |
  |---|---|
  | 0–20% | **Hold.** The sign at native, x 30–630, y 0–465. Its panel is on H (360, 274). Rick's text sits on the ground right, x 760–1376, y 420–700: `h2` "1972 — Jim's son Rick takes the dealership racing." plus `body`. Caption strip: sign caption. |
  | 20–30% | Rick's text exits (`DNA95`, rise 72 px, fade). |
  | 30–55% | **Relay I.** The transporter, at full-bleed scale (1440 wide, top-anchored), appears *inside the sign's rectangle* (clip-path inset = the sign's rect). At that scale its lettering is already at (360, 265): the same name, in the same place, bigger. The sign fades under it. The clip expands to the full stage. Caption: transporter caption. |
  | 55–65% | Hold the transporter. |
  | 65–78% | **Relay II, the match cut.** Crossfade to the #76 at native 2048×1056, offset (−213, −142), so the hood's "MANCUSO CHEVROLET" sits on H (it covers the stage; checked). The name has moved from the truck that carries the car onto the car. Caption: #76 caption. |
  | 78–95% | **Dolly out.** The #76 goes from native to 1440×743, centred (y 47), and the whole car is revealed. The native close crop at the cut (nose and tail trimmed) is a decided crop, and the pull-back resolves it. |
  | 95–100% | Hold. Release. |

- **The crew** (after release, ≈ 120 vh, oilstain master + native inserts):
  - The #76 at 1440×743 is the master and scrolls on as the top of the composition.
  - Inserts on a nearer plane:
    - windscreen at native, x 728–1376, y 640. It overlaps the master's bottom by
      103 px, over asphalt only; the car ends at y ≈ 609.
    - pit wall, x 64–624, y 820.
    - crew-x, x 960–1376, y 1110.
    - garage, x 336–752, y 1240.
  - Each caption sits beneath its print.
  - The windscreen carries the name again, now shared with Fyhrie and Greenwood: the
    crew is in the name.
- **Motion (crew):** the inserts move on a faster plane, −80 px relative to the master
  over their pass, so the people come in front of the car. Role: spatial explanation.
  The master does not move.
- **Signature?** No. This is the history's climax and the system's clearest
  demonstration.
- **Handover:** the last insert (garage) leaves upward. S3 opens on its left column of
  type: a cut in register, from photographs to the newspaper's front page.

### S3 · Le Mans, June 1976 — the interruption

- **Shot:** interruption → macro → release.
- **Assets:**
  - `lemans-1976-le-maine.jpg` 648×417, native.
  - `lemans-1976-nose.jpg` 976×622, native.
  - `lemans-1976-above.jpg` 648×479, displayed 536×396.
  - `lemans-1976-smoke-front.jpg` 644×479 and `lemans-1976-smoke-rear.jpg` 648×486,
    both displayed 644×483.
- **Masses** (scene ≈ 170 vh):
  1. Top band:
     - left, x 64–544: `h2` "June 1976 — An invitation to Le Mans." plus `body` (the
       Fra Noi paragraph, unchanged);
     - right: *Le Maine Libre* at native, x 728–1376, y 0.
  2. The car's face: the nose at native, x 64–1040, y 480–1102. This is the master, and
     the largest Le Mans mass.
     - Beside it, x 1088–1376: **"218"** in `number`, with "mph" in `h2` under it, then
       the `caption` "On the Mulsanne Straight — the fastest entry on the course. Fra
       Noi, February 2005."
     - One true number, as an event (oilstain). It does not count up: a count-up would
       pretend to be a measurement.
  3. The pass:
     - left: above at x 64–600, y 1180 (Mancuso Chevrolet on the rear quarter, the name
       at Le Mans without the man);
     - right: one 644×483 frame at x 732–1376, y 1150, holding smoke-front and
       smoke-rear stacked.
- **Motion:** across the pass frame's transit through the middle 50% of the viewport,
  smoke-front crossfades to smoke-rear. The car comes, and the car has gone. Scrubbed,
  not pinned. Role: subject expression. Nothing else moves.
- **Static and reduced motion:** the two smoke frames side by side at 0.5 width each,
  x 640–1376.
- **Handover:** a hard cut to S4's pinned stage. Colour returns with Ferrari red.

### S4 · Lake Forest Sports Cars — the line of LFSC

- **Shot:** dolly (lateral). The machines pass.
- **Assets:** shown at their native widths or smaller.

  | Asset | Native | Display | Top (puts lettering on the line) |
  |---|---|---|---|
  | `ferrari-328-grattan.jpg` | 800×534 | 800×534 | y 78 |
  | `ferrari-328-grattan-front.jpg` | 800×534 | 720×481 | y 375 |
  | `aston-009-rear.jpg` | 1600×1200 | 800×600 | y 81 |

  `aston-007.jpg` is held in reserve: no family lettering is visible on that frame.
  #007 does appear behind #009, lettered "Lake Forest Sportscars".
- **Stage (pinned 160 vh):**
  - Text, still, x 64–464, vertically centred: `h2` "Lake Forest Sports Cars.", `body`
    (Rick president and CEO, the race cars list, Rob 1986 champion), `caption` source.
  - The reel window runs from x 512 to the right edge (it bleeds). Frames are separated
    by 64 px of ground, each caption travels under its frame, and all three LFSC
    letterings sit on y = 495 (55vh).
  - The tops step 78 / 375 / 81, which is the zig-zag the material produces.
- **Motion:** the reel translates −1,632 px over the 160 vh pin, linear, scrub 0.5 (the
  weight of a passing car).
  - The text column never moves: reading-zone stillness (`DM9`).
  - Role: narrative progression, the plurality of cars under one name. Snap: none.
- **Static and reduced motion:** the three frames at 0.5 scale, staggered on the line,
  in a row from x 512 to 1376.
- **Handover:** the Aston leaves the window right-to-left. The pin releases onto S5's
  heading.

### S5 · Father and son — wide to close, then silence

- **Shots:** wide → medium → close (Rolls-Royce strip-2/3), then full width by count
  (Hispano Suiza strip-6).
- **Assets:**

  | Asset | Native | Display |
  |---|---|---|
  | `lola-tents.jpg` | 2000×1500 | 1440×760 (scale 0.72, crop y 15–85%) |
  | `lola-on-track.jpg` | 1024×667 | 547×356 |
  | `lola-paddock-1.jpg` | 1600×1064 | 536×356 |
  | `lola-crest-nose.jpg`, square crop x 0.30–0.58, y 0.19–0.56 | 448×448 crop | 357×356 |

- **Masses** (scene ≈ 170 vh):
  1. Heading band:
     - x 64–700: `h2` "Father and son, in Aston Martin racing green."
     - x 760–1280: `body` (Adam, Skip Barber, Lola Sports Racers, the crest) and `caption`.
  2. The wide shot: tents full-bleed, y 260–1020. The valance reads "LAKE FOREST
     SPORTSCARS". Caption beneath at x 64.
  3. **The only abutting row on the page:** three frames edge to edge, 0 gutter, full
     1440 width, equal height 356: on-track (motion), then paddock (people), then crest
     (close). The eye ends on the crest, on the right. Captions in three columns,
     aligned to their frames.
  4. **Silence:** 30 vh of ground. Nothing on it. This is the one deliberate pause on
     the page, and it is the silence before the peak (`DNA28`, P8).
- **Motion:** none. Every frame here is still: this is the quiet before the peak, and
  stillness is its job.

### S6 · THE PEAK — the line lifts off the trailer (signature)

- **Shot:** push-in to native → transformation → release.
- **Asset:** `lola-paddock-trailer.jpg` 2400×1596. It is the largest asset. Preload it
  when S5 enters.
- **Stage (pinned 240 vh):** photo area 1440×836, plus the caption strip.

  | Scroll | What happens |
  |---|---|
  | 0–15% | **Hold, wide.** The photo at 0.6 scale (1440×958, top-anchored). Trailer, two green Lolas, crew. Caption: "Lake Forest Sportscars in the paddock. Circuit and date not recorded." |
  | 15–60% | **Push-in to native.** Scale 0.6 → 1.0. Translate so the painted line's centre goes from (624, 400) to **H (360, 270)**: image offset (−679, −397), which covers the stage (checked). Ease `power1.inOut`: a camera with weight (`DNA42`). At native, "LAKE FOREST SPORTSCARS" stands about 670 px wide above H, and under it, small, partly behind the orange pole, sits "BY MANCUSO / AN AUTOMOTIVE FAMILY SINCE 1923". |
  | 60–68% | **Hold at native.** The designed stop frame. Nothing moves. |
  | 68–80% | **The lift.** Set type appears exactly over the painted line, at the painted size and in the painted near-black, opacity 0 → 1: "By Mancuso — / an automotive family since 1923." It completes the letters the pole hides, and the GT card confirms that wording. The photo then contracts. Its clip-path closes onto the trailer-side crop (native x 0.25–0.58, y 0.18–0.46, 792×447: lettering only, **no car**). At the same time it scales to 0.707 and moves to its GT position (x 64–624, y 420–736). The type stays on H. Its colour tweens from near-black to ink #EDEAE4, tied to the clip progress, so the type is dark over trailer and ink over ground. Its scale grows 0.25 → 1.0, ending in `line` at 52 px, left-aligned at x 64, block y 214–326. |
  | 80–100% | The GT mass enters on the right (fade plus 24 px rise, supporting band). The pin releases onto the S7 composition, which *is* the end frame. |

- **Why it is the peak:** it is the concept's sentence happening on screen. The history's
  last machine hands its own words to the future.
- **Reduced motion and static:**
  - the trailer full-bleed (0.6), with the caption;
  - then S7 exactly as composed. The trailer-side print beside the line in type keeps
    the meaning. Only the transformation is lost.
- **Stop frames to verify (`MJ4`):** at 25, 50 and 75% of the lift, the type is either
  on trailer (dark) or on ground (ink). Where it straddles the edge, the clip must
  already be past the type block. Measure it.

### S7 · The GT — past and future in one composition

Hispano Suiza strip-2, built with *our* rule: the past is the family's painted words,
never a car.

- **Masses** at 1440×900 (the end frame of S6):
  1. **The line** (`line`, ink), x 64–884, y 214–326, on H: "By Mancuso — / an
     automotive family since 1923."
  2. **The past:** the trailer-side print, 560×316, at x 64–624, y 420–736. CSS crop
     from the same file, no new download. Caption: "The family's line, painted on the
     Lake Forest Sportscars trailer in the years father and son raced. Date not
     recorded."
  3. **The GT mass,** x 760–1376:
     - "The GT." (`gt`) at y 380–520;
     - "Launching soon" (Sans 600 16, red) at y 548;
     - description (`lead`, ink, 560 w) at y 590–680: "A tribute to the iconic
       Chevrolet Corvette — the authenticity and style of original Corvettes, with
       modern comfort and driveability. Only by Mancuso.";
     - CTA row at y 712: **"Ask about the GT"** with red fill and ground text (4.85:1,
       measured; ink on red fails at 3.25), plus "Watch 'Introducing the GT' · 2:19"
       (Sans 500 16 ink, underline offset 4, play glyph from one set).
  4. **The record,** x 760–1376, y 790–870: three label/value pairs in one row, no rules.
     - Specification: *To be announced*
     - Photography: *To be announced*
     - Source: "Introducing the GT", Mancuso, July 2026
- **Why it looks finished without a photograph:** the GT is not shown, and nothing
  pretends to show it. The scene is complete because three real things meet:
  - the family's own words, painted, which is the past;
  - the same words, set, which is the present;
  - the confirmed announcement, which is the future.

  The pending items are set as decided information, ink on ink, with no greyed-out
  boxes. The red appears only here and in the hero's GT link.
- **Not used:** `gt-poster-1920.jpg` (the film card). The teaser is not a visual anchor,
  and the card prints "Timeless Corvettes engineered for today", which is unconfirmed
  as the family's own words (client question 11). The film stays a text link.
- **Motion:** none after S6 lands.
- **Handover:** ground continues to S8. The type drops from `gt` to `h2`: the register
  comes down after the peak.

### S8 · RPM Club — the name on the air

- **Shot:** release.
- **Asset:** `rpm-club-cover.jpg` 900×900, displayed 520×520 (0.58).
- **Masses** (≈ 110 vh):
  - The cover at x 64–584, y 120–640. It is the only white mass on the page and the
    scene's dominant: an interruption in tone, not a box.
  - Right column, x 680–1376:
    - label "AM 560 The Answer · Chicago";
    - `h2` "RPM Club, with Rick and Rob Mancuso." (two lines; cap height aligned to the
      cover's top);
    - `body` (the weekly-show sentence);
    - links "Listen on AM 560" and "All episodes".
    - The episode list: four rows, 72 px each, no rules. Each row has the date in
      `caption` with tabular figures (col 680–800), the title in Sans 500 18 ink
      (800–1250), and "40 min" right-aligned at 1376. Hover: an underline on the title.
      **The last row's baseline aligns with the cover's bottom edge.**
    - Feed note in `caption` beneath.
- **Why it is finished:** it uses real art, four real episodes, and the people's names.
  The cover's red is the show's own artwork, so it is left as it is. The page's own red
  stays GT-only.
- **Motion:** none, on purpose. This is the page's rest after the peak.

### S9 · Instagram + Contact — write to the family (the ending)

- **Beat A, Instagram band** (≈ 24 vh, `id="instagram"`), one row:
  - x 64: "Instagram" (Display 600 32);
  - x 360–960: "The family's latest posts will appear here once the account is
    connected." (`body`, #A7ABAD);
  - right-aligned to 1376: the pending marker **"Account handle — to be confirmed"**.
  - **Pending-marker system,** one style everywhere (GT record, Instagram, contact
    channels, footer crest): label in `caption`, value in Sans 500 15 ink. No dashed
    boxes, no grey fills, no fake tiles.
  - Future state, documented for when the handle arrives: six square posts in a row,
    208 px each, 24 px gutters, linking out.
- **Beat B, Contact** (≈ 100 vh):
  - Left, x 64–544:
    - `h2` "Get in touch." This is the quietest heading setting: the ending lands, it
      does not shout (`DNA30`).
    - `body` "About the GT, the family's cars, or anything else."
    - Three pending markers: Address, Phone, Email — *to be confirmed*.
  - Right, x 640–1376, the form:
    - Name | Email in two columns, then Phone (optional), then About (radio: **The GT**
      / Something else), then Message (4 rows), then Send.
    - Fields have a 1 px bottom border in #A7ABAD at 50%. It is a functional
      affordance, not a decorative rule.
    - Labels use `label`. Focus: the border turns ink, with a 2 px outline.
    - "The GT" radio, when selected, shows a red dot. Arriving from "Ask about the GT"
      preselects it.
    - Send: ink fill, ground text.
  - Errors as in `form.js`.
- **Footer** (120 px):
  - LFSC wordmark (Display 700 24) at left;
  - "Lake Forest Sports Cars · the Mancuso family, since 1923" (`caption`) in the
    centre;
  - pending marker "Crest — vector file requested" at right;
  - working label "Sketch D2 · not for publication".
- **Motion:** none, apart from focus and feedback states (band 3).

### Section-language ledger (§2c)

| Scene | Ask | Ground | Type voice | Containers | Image treatment | Depth | Motion | Device |
|---|---|---|---|---|---|---|---|---|
| S0 | nothing → read | photo into ground | h1 | none | full scene | push | pin 60 | — |
| S1 | read | ground | h2 + makes | none | native paper | flat | type travel | hold point introduced |
| S2 | nothing | stage | h2 | none | full bleed → master + inserts | 2 planes | pin 180 | **relay (system)** |
| S3 | read | ground | h2 + number | none | native evidence | flat | pass | number |
| S4 | read | stage | h2 | none | native reel | flat | pin 160 travel | **line (system)** |
| S5 | nothing | ground | h2 | none | wide → abutting row | flat | none | silence |
| S6 | nothing | stage | line | none | push to native → print | 2 planes | pin 240 | **signature** |
| S7 | act | ground | gt + line | none | lettering print | flat | none | record |
| S8 | browse | ground | h2 | none | artwork | flat | none | — |
| S9 | act | ground | h2 | fields only | none | flat | none | pending markers |

Reading down the columns: ground, containers and type voice are constant, so this is one
art direction. Motion and image treatment change on purpose (carried by the concept).
The ask column varies: nothing, read, act, browse, act. That is not a sales floor.

**CG7 per scene:** the clause each scene carries.

| Scene | How it carries the concept |
|---|---|
| S0 | the family's car in the crowd |
| S1 | the name joins a make |
| S2 | the name holds through three machines |
| S3 | the name goes to Le Mans without the man |
| S4 | the name runs on one line |
| S5 | the name on tents, then the crest |
| S6 | the line becomes type |
| S7 | the line is the GT's |
| S8 | the name on the air |
| S9 | the name you can write to |

---

## 4. Motion Read and plan (for motion-designer)

```
Subject          a family business across a century; heightened register (automotive launch + heritage) — temporal in its relays.
Journey          arrive → read the generations → see the name pass between machines → reach the GT → listen / ask.
Static verdict   yes — every scene is composed still; relays read as adjacent registered frames.
Time adds        the name holding while the machine changes (S2, S6); the decades passing (S1); a car passing (S3); many cars under one name (S4).
Register         heightened — the presentation of a launch is the message (MJ3).
Primary idea     per viewport, one: push (S0) · makes (S1) · relay (S2) · pass (S3) · reel (S4) · lift (S6).
Stable           all reading text while it is read (DM9); the GT, RPM, IG, contact and footer; captions.
Roles            push → narrative progression · makes → progression + hierarchy · relay → continuity · crew planes → spatial explanation · pass → subject expression · reel → narrative progression · lift → continuity (signature).
Transport        the reader. Scrub everywhere; no autoplay, no snap, no scroll-jacking beyond pins.
Learning         none; pins hold ≤ 240 vh, and the nav and anchors skip them (Lenis anchors: true).
Mobile           re-authored, no pins (§5).
Reduced motion   Lenis not constructed; every sequence replaced by its composed still (named per scene).
Cost             4 pins = 640 vh of pinned travel out of ≈ 1,800; 672 KB trailer at the peak; clip-path + transform on a 2400 px image (verify 60 fps, transform/opacity/clip only); learning cost nil.
Cut              load/intro animation · fade-ups on headings · tents parallax · count-up on 218 · D's crest "join" · C's 6vw lateral pan · RPM cover motion · hover lifts on photos · cursor effects · snap.
```

- **Method (`DNA45`):** S1's makes and S3's pass are scroll-driven CSS (`view()`
  timelines), with a GSAP fallback only where an engine lacks support. The pins (S0, S2,
  S4, S6) are GSAP ScrollTrigger, one at a time, `invalidateOnRefresh`, inside
  `gsap.context()`. Lenis runs on `gsap.ticker`, `autoRaf: false`; under reduced motion
  it is not constructed. The registration offsets are computed from `data-name` on
  refresh, never hard-coded.
- **Signature count (`DNA41`):** two signature interactions, the relay (S2) and the lift
  (S6). The lift is *the* signature.

### Scroll budget (`DNA38`) and payload

| Scene | vh | Pin |
|---|---|---|
| S0 | 160 | 60 |
| S1 | 180 | — |
| S2 | 300 | 180 |
| S3 | 170 | — |
| S4 | 220 | 160 |
| S5 | 200 (incl. 30 silence) | — |
| S6 | 240 | 240 |
| S7 | 100 | — |
| S8 | 110 | — |
| S9 + footer | 130 | — |
| **Page** | **≈ 1,810 vh** (≈ 16,300 px at 900) | |

History is S1–S6, about 72% of the page and about 70% of the history. Le Mans takes 13%
of the history, less than its share in sketch C.

- Initial payload ≤ 1.0 MB: hero 2400w at 536 KB, fonts about 100 KB, gsap + ScrollTrigger
  + Lenis about 125 KB.
- Everything below the fold is lazy. Total images ≈ 4.2 MB.
- Largest asset: `lola-paddock-trailer.jpg` at 672 KB, the peak.
- Derivatives: re-encode `lola-tents.jpg` to a 1440w derivative (it never shows above
  0.72), via `tools/prepare-images.py`. That is downscaling only.
- LCP ≤ 2.0 s on cable. The LCP element is the hero image.
- Frame budget: 60 fps on desktop. No layout properties are animated.

---

## 5. Mobile (390×844): authored recomposition per scene

Mobile has no pins. The hold-point registration survives *within frames*: consecutive
relay frames abut with no gap, and each is cropped so its lettering sits at the same
frame-relative point (50%, 40%). The name reads in place as the thumb scrolls frame to
frame.

- **S0:** `hero-lemans-1976-mobile.jpg` fills a 390×560 window (car with the crowd above,
  car at about 62% height). The claim sits on the ground below, not on the photo: `h1` at
  36/38, the GT line, and two full-width CTAs. Motion: a 1.00 → 1.06 drift while the
  window passes, with no pin.
- **S1:** the makes wrap in 44 px, with Chevrolet in ink once in view (a 240 ms colour
  change). Letter and ad as a 2-up pair, 171 px each. Then the 1953 text.
- **S2:**
  - The relay as an abutting stack, each frame 390 wide:
    - the sign at 390×302;
    - the transporter, crop 390×390 with its lettering at (50%, 40%);
    - the #76, crop 390×292 with the hood lettering at (50%, 40%);
    - then the #76 whole, 390×201.
  - Rick's text sits above the stack.
  - Crew: windscreen full width, then pit wall and crew-x as a 2-up, then garage full
    width. No planes.
- **S3:** text, then "218 mph" (number 96), then the newspaper full width, the nose
  full-bleed, above, and the two smoke frames stacked front then rear: the pass, read
  downward.
- **S4:** text, then a native horizontal swipe reel (scroll-snap, `data-lenis-prevent`).
  Frames are 300 px tall, with every LFSC lettering on one line at 55% of the reel height
  and the same stagger rule.
- **S5:** tents full-bleed 390×292. The row becomes on-track (full width), then paddock
  and crest as a 2-up abutting pair. Silence becomes 16 vh.
- **S6:** the trailer full-bleed 390×259, then a native-pixel crop of the trailer side
  (390×220, the painted line at its centre). The type line is set directly beneath at
  30/34, fading in over 300 ms when in view: photo line, then type line, adjacent.
- **S7:**
  1. the line (30/34);
  2. "The GT." at 72;
  3. status;
  4. description;
  5. full-width CTAs;
  6. the trailer-side print;
  7. the record as stacked pairs.
- **S8:** cover 160×160 beside the label and `h2` (28). Episodes stacked, with the date
  above the title.
- **S9:** the Instagram band as two lines. The form stacked. Footer stacked.

---

## 6. Vault ledger — what is implemented, and from where

All shots are in `/Users/alex/Desktop/WORK/design_dna/vault/shots/`.

| Decision | Vault entry · shot | Scene |
|---|---|---|
| Master frame of the machine with native inserts of the same moment around it | `oilstainlab-com` · `strip-6.jpg` (large B/W car, small second frame), `strip-5.jpg` (text column beside a master, one insert) | S2 crew around the #76; S3 nose plus newspaper |
| Two frames of the same car read as one action | `oilstainlab-com` · `strip-7.jpg` | S3 smoke front → rear pass |
| One true number as the event | `oilstainlab-com` · `hero.jpg` ("11") | S3 "218 mph" |
| Photographs straight on the ground, no containers; minimal chrome; the photo continues the environment | `rolls-roycemotorcars-com-en-us-home-html` · `hero.jpg`, `strip-2.jpg` | every scene; S0 bottom fade into ground; hairline nav |
| Wide-to-close edit | `rolls-roycemotorcars-com-en-us-home-html` · `strip-2.jpg` (wide road) → `strip-3.jpg` (hand close) | S5 tents → row → crest |
| Past and future in one composition | `hispanosuizacars-com` · `strip-2.jpg` | S6 end frame / S7: painted line (past) beside set line and GT (future) |
| Full width by count, frames abutting | `hispanosuizacars-com` · `strip-6.jpg` | S5 three-frame row (the page's only one) |

- **Not taken:**
  - oilstain's mannered type, light ground and manifesto voice;
  - Rolls-Royce's frosted glass, round controls and warm grade;
  - Hispano Suiza's script over images, thin tracked caps and red hairline UI.
- **Rating discrepancy:** `hispanosuizacars-com` is stored as 2 in `sites.json` and called
  3 in `README.md`. It is used only for the past/future relationship and the abutting
  row, as the user allowed. The vault is unchanged.
- **No new vault entry.** The three references cover every scene. The relay and the lift
  come from the material, not from a reference.
- **For the showing:** `review/<date>-sketch-d2/vault-ledger.jpg` pairs each vault shot
  above with the D2 frame that implements it, one row per table line.

---

## 7. Risks, and what must not happen

1. **No V1 / C / D repeat.** Do not use:
   - running heads, dated plates or year badges;
   - rules between rows;
   - the caption-print as a repeating unit;
   - serif or mono type;
   - period lettering transcribed into type as decoration.

   The *only* lettering set in type is the trailer line, because the GT's confirmed copy
   says the same words.
2. **No historic car stands for the GT.** S7 uses the trailer-side crop, which shows
   lettering only, with the Lolas excluded. The builder verifies the crop on the render.
3. **No upscaling.**
   - Every display size above is ≤ native, and the pushes end exactly at native.
   - The hero 1400w derivative is never shown at ≥ 1400 px.
   - DPR is not an excuse in either direction: the CSS width ≤ native rule governs.
4. **No empty placeholders and no fake content.**
   - No stand-in Instagram tiles, no generated imagery, no borrowed photos for Benjamin
     and no GT silhouette.
   - The film card is not used.
   - Pending items use the one pending-marker style.
5. **Natural brightness.** No grading. The hero's legibility gradient is the only
   overlay, and it is measured.
6. **Credits stay.** Never crop the printed credit bands (crew prints, Le Mans prints).
   The S5 crest crop and the S6/S7 trailer crop contain no credits.
7. **Registration fails silently** if `data-name` values are guessed. They are measured
   on native pixels, and the relays are checked at 1280, 1440 and 1920 wide with the
   name position logged per frame.
8. **Pin fatigue.** There are 4 pins. If the recording shows any hold where nothing
   changes for more than 25 vh outside the declared holds, shorten that pin. Do not add
   a device to fill it.
9. **Nav over pins.** It is hidden on scroll-down and during pins, and returns on
   scroll-up. Light frames (the trailer at native) would fail its contrast otherwise.
10. **Lettering positions** in §2.0 are ±2% readings. The trailer line is the tightest
    (about 120×35 px native), so the S6 offsets must use the measured value.

## 8. Copy changes from D (the only ones)

- **GT eyebrow** "An automotive family since 1923 — and the next chapter." is
  **removed**. The lifted line says it, in the family's own wording from the trailer.
- **The S6/S7 line** "By Mancuso — an automotive family since 1923." is new to the page.
  - Source: the Lola trailer's lettering, which the photograph shows, plus the GT film
    card. The film card is ledgered in BRIEF §11 as "Only by Mancuso — an automotive
    family since 1923".
- **S7 caption for the trailer print** is new. It is written from what is recorded:
  "Date not recorded".
- **Years** move into the `h2` as their first word, for example "1972 — Jim's son Rick
  takes the dealership racing." No words are changed.
- **"218" + "mph"** is split out of the Le Mans paragraph as the number event. The
  paragraph stays verbatim.
- **Footer working label:** "Sketch D2 · not for publication".

## 9. The next showing (what is delivered)

1. **Full-page captures,** desktop 1440 and mobile 390, of the static build. This is
   also the reduced-motion page.
2. **The motion recording,** desktop, at normal scroll pace, with stops of about 2 s on:
   - S0 first frame; S0 end of push;
   - S1 "Chevrolet" lit;
   - S2: the sign hold, the clip half-open, the match cut at 50%, the #76 at native, and
     the #76 whole;
   - S3 the pass at 50%;
   - S4 the reel at 50%;
   - S5 the row;
   - S6: the hold at native, and the lift at 50%;
   - S7 end frame;
   - S8;
   - S9.

   Plus a mobile recording.
3. **`vault-ledger.jpg`** as in §6.
4. **A ≥ 7/10 check per criterion,** stated as what was looked at, not as a score:

   | Criterion | What was checked |
   |---|---|
   | Composition | one dominant per scene, full width used in ≥ 6 scenes |
   | Typography | the scale above, with nothing else |
   | Photography | ≤ native, natural brightness, ≥ 6 moments where photos move |
   | Rhythm | the ledger's ask/motion columns |
   | Motion | the recording, plus the 4 scroll types: normal, fast, interrupted, reversed |
   | LFSC character | the name visible in S1, S2, S4, S5, S6 and S7 |

5. **design-critic** runs the panel on the render before Alex sees it.

## 10. Critique panel on the direction (before the build)

- **Composition:** one centre per scene, and the page's centre of gravity is S6. Risk:
  S2 and S6 are both long pinned full-bleed stages, which could read as the same device
  twice. They differ in shot: S2 is a reveal, a match cut and a dolly out; S6 is a
  push-in and a transformation. Their asset budget and pin length are also ranked.
- **Craft:** red on ground 4.85:1 and ground on red 4.85:1 pass. Ink on red (3.25) is
  banned below 24 px. The hero gradient must be measured on the composited render. The
  caption strip's 14 px on ground reads at 8.18:1.
- **User advocate:**
  - Job 1, "who are these people": answered by screen 1.
  - Job 2, "the GT": two clicks via "Discover the GT", which skips the pins by anchor.
  - Job 3, "contact": via the nav.
  - On the 50th visit, 640 vh of pins annoy. The anchors and the hidden-on-down nav
    are the exit.
- **Brief advocate:** "History is the main section" is served (72%). "Missing material
  is not covered by a large empty section" is served: S7 is full, S9's Instagram band is
  24 vh. "The Vimeo teaser is never a main visual" is served.
- **Contrarian:** the hold point is invisible. A visitor may never notice that the name
  stays put, and then S2 is just three photos crossfading. The alternative most worth
  considering is to draw H once, as a faint crosshair, in S1 only.

**Disposition:**

| Point | Disposition | Reason |
|---|---|---|
| S2/S6 read as the same device | **accept** | ranked: different shots, S6 longer, larger and preceded by silence |
| Ink on red | **accept** | banned below 24 px |
| Hero gradient | **accept** | measure on the render (Gate 1) |
| Pin fatigue | **accept** | §7.8 rule; anchors skip the pins |
| Contrarian (H invisible) | **reject** | a drawn crosshair is an imported HUD ornament (fails Shizen) and announces the trick. The match cut works only if it is felt. In S2 it is reinforced because the lettering *grows* at the same spot (sign panel ≈ 70 px → truck ≈ 490 px → hood). If the recording shows it is not perceived, the fix is a longer hold at 55–65% of S2, not a mark. |
