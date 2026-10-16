# LFSC · Sketch D3: three key scenes

Art direction, 2026-10-16. This file is direction only: no markup, CSS or scene code.
Builder: `designer` builds **exactly these three scenes**: the Hero, the History stretch
(1923 → 1953 → the #76) and the Transition into the GT. They are then compared side by side
with the Vault references named in §6. The full page is built only if every scene reaches
≥ 7/10. Motion: `motion-designer`. Review: `design-critic`. Gate 5 belongs to Alex.

Resolved from: `/Users/alex/Desktop/WORK/design_dna/TASTE.md` (canonical Mac path), the
build standard `.claude/rules/design-dna.md`, academic-composition, typography-taste and the
Vault (`oilstainlab-com` 3, `rolls-roycemotorcars-com-en-us-home-html` 3,
`hispanosuizacars-com` 2, `beings-co` 3).

**Blocking frames** are in `docs/d3-key-scenes/`: `d-*.png` at 1440×900 and `m-*.png` at
390×844. I rendered them with the real assets and the real typeface to check geometry,
contrast and overlap.
- They are blocking: the masses, positions and scale.
- The car silhouette and the tone ramps in them are approximate.
- The builder measures on native pixels and decides the final numbers on the real render.
  The user's instruction stands: sizes, pins and page length are guidelines.

---

## 0. What changed since D2, and why this is not tidying

D2 put its idea into **photographed** lettering, and that lettering was too small to see. It
scaled photographs by pixel count, so soft scans went full-bleed. It also set every scene
the same way: a 44 px heading, a paragraph, then rectangles. D3 moves the scale from the
photographs to the **type**:
- The family's name is set at the size it was painted on its machines.
- The photographs stand in front of it at the size their sharpness allows, and no larger.

The archive is mostly 600–900 px prints, so this is the only honest way to get scale. It
also comes from the family's own picture: the Lola paddock frame (`Lola's Adam.pdf` p.8)
shows cars parked in front of 2-metre lettering. The page composes itself the way that
photograph is composed, and the transition shows the photograph.

---

## 1. Design Read, concept, gate

```
Delivery: BUILD — three scenes, one direction.
Reading this as the three key scenes (hero, a history stretch, the hand-over to the GT) of the Mancuso family's homepage for collectors and the family's clients, leaning contemporary motorsport launch.
Mandate: REDESIGN — carried: sourced copy and captions (changes listed in §7), real photographs at natural brightness with CSS width ≤ native, printed credits intact, ground #0F1112 / ink #EDEAE4 / secondary #A7ABAD / red #EF3A4C (GT only), dark theme, section order, Lenis. Changed: the type pair (Funnel → Archivo, §2.2), LFSC no longer presented as the current business (the manager's update), D2's hold-point system.
Style mode: HYBRID — anchor immersive-authored-world (one subject per frame, layered photographic depth) / contrast technical-luxury (captions, the evidence box, facts with their source) / signature expressive-poster (TYPE AS IMAGE — the painted name). Unifying principle: the name is set at the size it was painted, and the machines park in front of it.
Dimensionality: SUPPORT — 2.5D layering only: the car in front of the name, prints parked over the name's lower third, and at the transition the name stepping in front of the print. The static build stands without motion.
```

**Yield recorded.** D2 limited the expressive-poster signature to image-scale collision,
"never type". D3 reverses that on purpose. Every vault reference Alex named (Oilstain HF/11,
Hispano's script across the car, Beings) gets its strength from type used as image, and D2
failed for lack of it.

### Page concept (one sentence)

> **The Mancuso name was painted large across every machine the family sold, hauled and
> raced; the page sets it at that painted scale with the photographs parked in front of it,
> until "by Mancuso" steps out in front of the last photograph — the race trailer — and
> becomes the GT's signature.**

**Status of the business (binding).**
- LFSC appears only as history: it is the name painted on the trailer, inside the
  photograph.
- The GT's maker is never named, because the brand is pending. The page signs it the way
  the GT film does: "by Mancuso".
- The nav wordmark is "Mancuso" (Archivo 125/700, 14 px), never "LFSC".

```
Concept Gate: PASS
CG1 opens on the family's painted name — a fact in the photographs (letterhead, OK sign, transporter, #76 hood, trailer) — not a style, device or tool.
CG2 one sentence, falsifiable: it fails if the family had not lettered its machines (it did, on every one we hold), or if the trailer did not carry "by Mancuso" (it does, native crop verified).
CG3 replace the painted-scale name with ordinary headings and the photographs become pictures beside text again; the transition loses its only meaning (the line stepping out in front of the archive). The technique carries the sentence.
CG4 static build: every frame is a poster without motion (blocking frames are static renders).
CG5 not D2 (photographed lettering registered on a hold point), not V1 (dated rail), not C (strip), not Chicago Motor Cars (condensed workwear type — explicitly avoided, §2.2). The extended face is taken from the dealership's own letterhead.
CG6 one direction.
CG7 every scene carries it: hero (name + the car in front), 1923 (the makers' names the family sold before painting its own), 1953 (its name beside the maker's), #76 (the number painted on the door), transition (the line steps out), GT (the signature with nothing yet parked in front of it).
```

### Feeling curve, for these three scenes (`DNA29`)

| Scene | Feeling | Caused by |
|---|---|---|
| Hero | arrival, nerve | 100,000 people at Le Mans, the family's name across the straight, the lead car driving through it |
| 1923 | patience, scale of time | a wall of other makers' names; one of them lit |
| 1953 | ownership | the family writes its own name above the maker's; the painted sign is the proof |
| #76 | pride, speed | the number from the door at architectural size, the pale-blue car parked in front of it |
| Transition (peak) | recognition | the trailer's smallest lettering becomes the page's largest and steps in front of the photograph |

No two adjacent rows produce the same feeling.

### Peak and signature

- **Peak (`DNA28`): the Transition.**
  - It has the sharpest and largest asset: the Lola trailer frame, 3008×2000 at source.
  - It has the page's only silence (30 vh of ground) in front of it.
  - It has the longest pin.
  - Within the history, the #76 is a lesser climax: no pin and no silence. It holds only by
    `position: sticky`.
- **Signature move (`DNA37`): the scale inversion.** On the trailer, "BY MANCUSO / AN
  AUTOMOTIVE FAMILY SINCE 1923" is painted about 95 px wide under the company name, which
  is about 900 px wide (both at 3008 px native).
  - At the transition, the photograph contracts into a print and the family line is set at
    1344 px, six times wider than the company name now is inside the print.
  - Then, for the only time on the page, the name stands *in front of* a photograph.
  - Everywhere else the photographs stand in front of the name.

  Nobody else has this material, and the layering reversal is the meaning: the business
  goes back into the archive and the family line comes forward.

---

## 2. The system the three scenes establish

### 2.1 The paddock rule (one rule, page-wide)

1. **The name is the back wall.** Each scene has exactly one painted line, set in `livery`
   (§2.2) and sized to its measure, never to a type scale. It is the largest thing in the
   frame and the subject of the frame (C13: the permitted case 2, where the subject enters
   and breaks the mark).
2. **Photographs park in front of it.**
   - A scene's master photograph overlaps the **lower third** of the painted line's cap
     height. On mobile it overlaps the **lower quarter**.
   - The overlap is never more, so every letter stays identifiable.
   - The overlap is never less than 20%, which would be a tangency (C9).
3. **Prints stand on a kerb.** Supporting prints in a row share one **bottom** line, the way
   cars stand on one ground line. They are never top-aligned and never on a grid. Captions
   hang under the kerb.
4. **One reversal.** At the Transition the name stands in front of the photograph (§5).
   That is the only place on the page where it does.
5. **No frames.** No containers, borders, radii, shadows, grades or rotations. A photograph
   sits straight on the ground.

Information never depends on a painted word. Every livery word is repeated in reading text
or in the accessible name (`DNA17`). The livery is `aria-hidden`; the reading text carries
the semantics.

### 2.2 Type: Archivo, one family, two voices

**Funnel Display and Funnel Sans are killed.** The Funnel pair has no relation to the
material. The dealership's own letterhead sets **MANCUSO** in a heavy **extended**
grotesque (`mancuso-chevrolet-letter.jpg`, top line). Period race lettering is extended too:
"LE MANS 76" on the hero car, and "MANCUSO CHEVROLET" on the #76 hood. An extended heavy
sans is this family's own voice.

- **Archivo** (Omnibus-Type, Google Fonts) is a variable font with **wdth 62–125** and
  **wght 100–900**. It gives the painted voice and the reading voice from one family. The
  page has two voices, and each has a systemic job (typography I8).
- **Big Shoulders is excluded:** it was the display face of the rejected Chicago Motor
  Cars concept 2, "condensed workwear typography".
- Load: `family=Archivo:wdth,wght@62..125,100..900`, `display=swap`.

| Role | Spec (desktop / mobile) | Used for |
|---|---|---|
| `livery` | wdth **125** (mobile **100**), wght 800, UPPERCASE, tracking 0, stacked-line pitch 0.86 em. Size = fit to measure per line (values below). Cap height = 0.688 em | painted names and numbers only: MANCUSO, the makes, MANCUSO / CHEVROLET, 76, BY / MANCUSO |
| `statement` | wdth 100, wght 600, 34/41, −0.5% · mobile 24/30 | the one reading headline per scene; the year is its first word |
| `lead` | wdth 100, wght 500, 24/32 · mobile 17/25 | hero lines; the GT description at 21/31 |
| `body` | wdth 100, wght 400, 17/27, max 36 em · mobile 16/25 | paragraphs |
| `caption` | wdth 100, wght 400, 14/20, #A7ABAD | provenance |
| `label` | wdth 100, wght 600, 14/18, UPPERCASE, +6% | "Launching soon" only |
| `ui` | wdth 100, wght 600, 16; buttons 48 px tall, 20 px side padding | CTAs |
| nav | wordmark wdth 125 / 700 / 14 px, +4%; links wdth 100 / 500 / 14 px | chrome |

**Register rule (the fix for D2's single register).** Only two type sizes are ever large:
- the `livery` line, between 7× and 26× the body size;
- the `statement`, at 2× the body size.

Nothing sits between them. The scale collision between those two is the rhythm, as in
Oilstain's "HF" against "LESS IS MORE".

Before adoption, verify I10 in the render: set "76", "1923", "CHEVROLET" and the 14 px
captions at their real sizes on the ground and on the photographs.

### 2.3 Colour

- Ground #0F1112, ink #EDEAE4, secondary #A7ABAD (8.2:1).
- Makes wall dim tone **#6B7073** (3.78:1 on ground, large text). Its only use is the
  makers' names in 1923.
- Red #EF3A4C **GT only**: the hero "Discover the GT" outline (4.85:1), "Launching soon" and
  "Ask about the GT".
  - The "Ask about the GT" button is red fill with **ground** text at 4.85:1. Ink on red
    measures 3.25:1 and fails.

### 2.4 Optical-sharpness ceilings (measured 2026-10-16)

I estimated effective resolution by down/up-sampling loss on the originals, then checked the
crops at 100%. **Display width never exceeds the ceiling**, whatever the native pixel count.

| Asset | Native | Effective (measured) | Display ceiling (CSS px) | Verdict |
|---|---|---|---|---|
| `hero-lemans-1976-2400.jpg` (source 3030×2031 film) | 2400 | ≈2700 at source | 2400 | full-bleed OK to 2400 vw |
| `hero-lemans-1976-mobile.jpg` | 1100×1590 | sharp | 1100 | mobile hero at 584 wide |
| `lola-paddock-trailer.jpg` (from PDF 3008×2000) | 2400 | ≈2700 at source | 2400 | full-bleed OK; **the sharpest frame we have** |
| Lola PDF p.8 native, for the mobile crop | 3008×2000 | sharp | crop at native | new derivative §3.4 |
| **`76_mancuso-fyhrie_credit_tonymezzacca Adam.jpg`** | **900×591** | ≈720–900, crisp | **900** | **the new #76 master**; replaces `RM 76` |
| `RM 76 Adam.jpg` / `mancuso-76-blue*.jpg` | 2048×1536 | ≈1100–1200, mushy at 100% | 960 | **not used**: soft, and a duplicate of the master's car |
| `mancuso-truck.jpg` | 2048×1536 | **≈450–500** (upscaled scan) | **400** | small evidence only |
| `mancuso-chevrolet-sign.jpg` | 600×465 | ≈540 | 540 | 1953 master at 0.9 |
| `mancuso-chevrolet-letter.jpg` | 619×800 | full | 619 | shown at 372 (0.6) |
| `yenko-deuce-ad.jpg` | 615×800 | full | 615 | shown at 340 (0.55) |
| `mancuso-76-windshield.jpg`, `crew-x.jpg`, `crew-garage.jpg`, `crew-kodak.jpg` | 648×414 | ≈520 | 520 | kerb prints at 440 |
| `crew-pitwall.jpg` | 648×414 | — | — | **killed**: the same photograph as the new 900 px master |

---

## 3. Scene 1 · HERO: "the name across the straight"

**The idea that makes it not a text-and-photo layout:** the family name is a physical layer
*inside* the photograph's depth.
- It runs across the Le Mans straight at painted scale.
- The two far cars pass **behind** it, as the photo shows them.
- The lead car (the white #76) drives **in front of** it, its roof cutting into the lower
  third of "U–S".

That depth is coherent: near car, then name, then far cars. Name and photograph become one
mass, which is the Beings move (C13 case 2) done with this family's car. No reference on
file has a period race photograph doing it.

### 3.1 Hero declaration (TASTE §2)

| | |
|---|---|
| viewport ownership | the full first screen, 100 vh; not pinned |
| scene treatment | environment: Le Mans grandstand, pit straight, three cars, 1976 film |
| object scale | lead car ≈ 0.21 of frame width (x 865–1162 of 1440), at its source position, never enlarged |
| focal point | the lead car's nose, about (1010, 600) |
| negative-space region | the asphalt below and left of the car (y 560–900): the ground the name and the lines stand on |
| text safe zone | x 48–640, y 760–884 over the asphalt, after the bottom ramp (§3.2) |
| desktop crop | 2400 derivative at 1440×965 (0.60), top-anchored, bottom 65 px cut |
| mobile crop | authored: `hero-lemans-1976-mobile.jpg` at height 844 (0.531 → 584 wide), shifted 120 px left |
| asset suitability | yes: sharp to 2400 CSS px; the asphalt is a measured ~4:1 ground for ink |

| Event component | Rectangle (1440×900) |
|---|---|
| event statement | "The Mancuso name stretched across Le Mans, with the family's Corvette driving through it." |
| primary subject | the lead car, plus the name it cuts (one mass) |
| identity mass | `livery` MANCUSO, 196 px (13.6 vw), cap 135, x 48–1392, cap-top y 420, baseline 555 |
| supporting mass | the two lead lines, x 48–640, y 764–828 |
| CTA cluster | y 836–884: **"The family story"** (ink fill, ground text, x 48–226); **"Discover the GT"** (1 px red outline, red text, x 242–410) |
| active field | the photograph, full-bleed |
| negative space | the asphalt, y 560–760 |
| caption | "Le Mans, June 1976." right-aligned to x 1392, baseline ~880 |
| excluded | the nav: four links at the top right, **no wordmark while the hero is in view** (the hero *is* the wordmark), hidden on scroll-down |

### 3.2 Desktop 1440×900: build notes

- **The car layer.** A second copy of the same image sits above the livery, clipped by an
  SVG path traced around the lead car.
  - Trace it on the **2400 native file**: the roof, mirrors, rear wing, wheels and front
    splitter. Feather 0.5–1 px.
  - The antenna is excluded.
  - Approximate polygon at 1440 scale: (867,680) (865,605) (880,577) (902,535) (940,517)
    (1070,514) (1085,525) (1100,529) (1145,527) (1150,540) (1160,585) (1162,645)
    (1155,670) (1130,675) (1120,682) (870,687).
  - The roof enters the bottom **41 px of the cap (30%)**, between x ≈ 905 and 1150.
  - Verify the overlap stays between 25% and 35%. Below that it reads as an accident;
    above it the U and S stop reading.
- **Second car.** The white car at x 630–765, y 360–440 passes behind the "C". Keep it: it
  is the far plane.
- **Bottom ramp.** Ground #0F1112 from 0% at y 520 to 88% at y 900. This is a measured
  legibility construction, not mood.
  - The white curve lines are the worst region: unramped, they measure 2.5:1 behind the
    first lead line.
  - Required: the lead lines ≥ 4.5:1 at the 98th-percentile pixel of their box; the name
    ≥ 3:1 at the 95th percentile, excluding pixels under the car layer. My measurement is
    a 4.0:1 median, with a local dip where the second car is.
- **Top ramp.** 55% → 0 across y 0–120, for the nav links over the crowd. Measured
  ≥ 4.5:1.
- **h1.** The livery is `aria-hidden`. The h1's accessible text is: "The Mancuso family —
  car dealers since 1923, racers since 1972."
- **Copy (new; every clause sourced, see §7):**
  - "Car dealers since 1923. Racers since 1972."
  - "Next, the GT — a tribute to the Chevrolet Corvette."

  The trailer line ("an automotive family since 1923") is **not** used here. It is saved
  for the transition.

### 3.3 Mobile 390×844 (authored, `m-hero.png`)

- Field: the mobile crop full-bleed. The lead car spans x ≈ 31–339 and y ≈ 374–554.
- Livery MANCUSO is set at **wdth 100**, 65 px (cap 45), x 16–374, cap-top **y 340**.
  - The roof enters the bottom **quarter** of the cap.
  - The car layer is the same technique; trace the path on the 1100 px file.
  - Check that each letter is identifiable. If the white roof merges with the letters'
    feet, lower the overlap toward 20% but never to zero: the depth move *is* the hero.
- Lead lines at 17/25 from y 640. CTAs side by side at y 712–760 (16 / 179 and 205 / 170
  wide). Caption at y 800.
- Ramp: 0 → 85% ground from y 560 to 844. Menu at the top right; no wordmark.
- Measure the name band outside the car silhouette. The white track line around y 300–360
  is the risk.
  - If the name falls under 3:1 at the 95th percentile, add a feathered 40 px ground band
    behind the name zone only, at ≤ 35%, measured.
  - Moving the name off the car is not an acceptable fix.

### 3.4 Motion (`motion-designer`)

- **No load animation.** The first frame is the composed frame.
- **Not pinned.** While the hero scrolls out (0 → 100 vh), the whole stage (photo, name and
  car layer as one group) pushes in 1.00 → 1.08 about the car's centre. It is scrubbed,
  linear, transform only.
- The layers are never moved against each other. Parallax would contradict the occlusion,
  because the far cars are in the same photo plane.
- Role: narrative. The car keeps coming.
- Reduced motion: nothing moves.
- Stop frames to verify: 0% (the composed frame), 50% and 100%.

---

## 4. Scene 2 · HISTORY: 1923 → 1953 → the #76 (the system, established)

**The idea that makes it not a text-and-photo layout:** each era is set by **the largest
thing it painted**, and what stands beside the family name changes.
- **1923.** Other makers' names; the family sells them.
- **1953.** MANCUSO / CHEVROLET: the family name above the maker's.
- **1972–76.** **76**: the door number becomes the era's sign, and the pale-blue car parks
  in front of it.

Each era is one poster: one painted line, one master print parked on its lower third, one
statement. The three eras look different (a type texture, a name with a small b/w print, a
numeral with a colour print) and obey one rule.

### 4.1 Frame S1 · 1923, "the names it sold" (`d-history-1923.png`)

The rest beat. There is no photograph: none exists of Benjamin, and none is borrowed. The
Batavia/Mancuso Theatre images stay excluded.

- **Statement** x 48, cap-top y 112, max 640:
  "1923 — Benjamin Mancuso, a pioneer dealer in Batavia, New York, founds the family's
  automobile business." (3 lines)
- **The makes wall**: the dominant.
  - `livery` at 78 px (cap 54), line pitch 76, from cap-top y 360, flowing ragged in
    x 48–1392, word gap 0.42 em, no separators. It runs to six lines and ends about y 760.
  - Order as in the copy: STUDEBAKER OLDSMOBILE **CHEVROLET** BUICK PONTIAC CADILLAC HONDA
    SAAB PEUGEOT ASTON MARTIN MASERATI FERRARI.
  - #6B7073, except **CHEVROLET in ink**.
- **Caption** baseline ~860: "Makes sold by the family's dealerships over the decades.
  Source: Fra Noi, 'Andrettis' heirs', February 2005." The list spans decades, not 1923;
  the caption says so.
- The upper-right void (x 720–1392, y 96–330) is the scene's air. Leave it; the wall needs
  room above it to read as a wall.
- Reference read: Oilstain strip-4's word-texture block, here made of facts.

### 4.2 Frame S2 · 1953, "the name above the maker's" (`d-history-1953.png`)

This is the end state of the S1→S2 pin.

- **Livery**, two lines, sized to fit CHEVROLET in 1346 px: **166 px (cap 114)**.
  - MANCUSO at cap-top y 112.
  - CHEVROLET at cap-top y 254 (pitch 0.86 em), x 46–1392.
- **Master print** `mancuso-chevrolet-sign.jpg` at **540×419** (0.9), x 804–1344, top
  **y 330**.
  - It parks over the bottom 38 px (1/3) of "R-O-L-E".
  - The giant set name stands directly above the photographed sign that carries the same
    name.
- **Statement** x 48, cap-top y 440, max 600: "1953 — His son Jim opens Mancuso Chevrolet
  in Skokie, Illinois."
- **Body** 17/27, max 560: the Mille Miglia sentence. Then the source caption.
- Print caption under the print: "'OK Used Cars' — Mancuso Chevrolet. Date and place not
  recorded."
- **Kerb row, after the frame (in flow, not pinned):**
  - Letterhead **372×481** at x 48 and Deuce ad **340×442** at x 452, both standing on one
    bottom line about 96 px below the statement block.
  - Captions as in D2.
  - The letterhead sits under the statement on purpose. Its printed extended MANCUSO is
    the source of the page's livery voice, and the eye can make that link.
- Reference read: Hispano strip-2, where the headline and the image are one composition.

### 4.3 Frame S3 · the #76, "the number from the door" (`d-history-76.png`)

- **Livery "76"** at **640 px (cap 441)**, x 48–1019, cap-top y 96.
  - "76" is the car's number and also the year it raced at Le Mans. The number's size
    does that work, and no copy states the double meaning.
- **Master print**: the Mezzacca photograph at **720×473** (0.8 of 900 native, crisp),
  x 672–1392, top **y 390**.
  - It parks over the lower right of the "6": 147 px, 1/3 of the cap.
  - The car, the crew on the pit wall and the 1970s colour all sit in front of the
    numeral.
- **Statement** x 48, cap-top 593, max 400: "1972 — Jim's son Rick takes the dealership
  racing."
- **Body**, max 400: the 1972/1958-Corvette/#76 sentence. As in D2, the copy keeps "by the
  Revell kit's account" for the customer-car claim (client question 3).
- **Caption** under the print: "Mancuso Chevrolet #76, 'Mancuso · Fyhrie · Greenwood'
  across the windscreen. Photo courtesy of Bob Brandle & Tony Mezzacca." The credit is the
  one printed on the 648 px copy of this frame; client question 15 still applies.
- **Kerb row, in flow, passing in front of the sticky numeral (§4.5):**
  - `mancuso-truck` at **400×300**, x 48: the dealership's transporter with the #76, the
    hinge from dealer to racer;
  - windscreen at **440×281**, x 480;
  - crew-x at **440×281**, x 952.

  All share one bottom line. Garage and Kodak are held in reserve.
- Reference read: Oilstain hero, the "11" numeral as image against a single object; and
  Oilstain strip-5/6, a master print beside a column.

### 4.4 Mobile 390×844 (`m-history-*.png`), authored, not shrunk

- **Livery runs at wdth 100. Prints overlap the lower quarter. Statements at 24/30.**
- **1923**
  - Statement from y 88.
  - Makes wall at 40 px (cap 28), ragged in 16–374, 10 lines, CHEVROLET in ink.
  - Caption.
- **1953**
  - MANCUSO / CHEVROLET at 55 px (cap 38) from y 96.
  - Sign print **full-bleed 390×302** (0.65, crisp), its top on the lower quarter of
    CHEVROLET.
  - Caption, then statement and body.
  - Kerb row: letterhead and Deuce side by side at 171 px wide each, bottoms aligned.
- **#76**
  - **"76" at 286 px (cap 197)**, x 16–374, from y 80.
  - Mezzacca **full-bleed 390×256** on its lower quarter.
  - Caption, statement, body.
  - Kerb: truck, windscreen and crew-x stacked full-bleed at 390 wide (below every
    ceiling).
- **No pins on mobile.** S1 and S2 are two frames in flow, and "76" is not sticky.

### 4.5 Motion (`motion-designer`)

**S1 → S2, "the name joins the maker" (pinned).**
- The stage pins at S1. It runs about 120 vh of scroll; tune it on the render.

| Scroll | Event |
|---|---|
| 0–15% | hold S1 |
| 15–45% | the 11 dim makes fall 16 px and fade out; **CHEVROLET** moves FLIP-style from its wall position (78 px) to line 2 of S2 (166 px, x 46, y 254), transform only |
| 40–65% | **MANCUSO** is painted onto line 1: clip-path wipe left → right, linear, scrubbed (a sign-writer's stroke, not a reveal flourish) |
| 55–80% | the 1923 statement leaves (−24 px, fade); the 1953 statement enters; the **sign print parks**: translateY +160 → 0, opaque throughout (an object arriving, not a fade), `power2.out` |
| 80–100% | hold S2 (the designed stop frame), then release |

- Role: narrative. The family puts its own name above the maker's.
- Reduced motion and static: S1 and S2 as two consecutive frames. CHEVROLET appears in
  both: in the wall, then in the name.
- Stop frames to verify: 30%, 50%, 70%. At each, the moving CHEVROLET must be either fully
  over ground or fully in its final line, never half over the parking print.

**S3, "the crew passes the number" (sticky, not scrubbed).**
- "76" is `position: sticky` (top 96) for about 100 vh.
- The master print, the statement and the kerb row flow up past it, in front. Nearer
  things move and the wall holds: depth-coherent.
- Then the numeral releases.
- Role: hierarchy. The era's number holds while its people go by.
- Reduced motion: identical (sticky is not animation).

---

## 5. Scene 3 · TRANSITION: "the line steps out of the archive" (the peak)

**The idea that makes it not a text-and-photo layout:** the reversal. All page long, the
photographs have stood in front of the name. Here the trailer photograph, the last frame of
the family's history and of LFSC, contracts into a print, and the family's smallest painted
line becomes the page's largest set line, **standing in front of the print**.

Then the print leaves upward; LFSC is sold and stays in the past. The line stays and becomes
the head of the GT, with nothing parked in front of it yet. The GT has no photographs, and
the empty bay in front of the name *is* the announcement.

Preceded by 30 vh of plain ground: the page's only silence.

### 5.1 Frame T-A · the paddock (`d-transition-A.png`)

- `lola-paddock-trailer.jpg` (2400) at 1440×958, top-anchored.
- The photo fills y 0–836. Under it is a 64 px ground strip with the caption: "Lake Forest
  Sportscars in the paddock. Circuit and date not recorded."
- One subject, the environment, minimal chrome (the Rolls-Royce strip-2 standard).
- At this scale the painted line sits at x 585–665, y 385–412. It is visible as a texture,
  and nobody is asked to read it.
- The nav is hidden.

### 5.2 Frame T-B · the inversion (`d-transition-B.png`, the designed stop frame)

- **The print.** The same image element, not a second download and not a second exposure.
  - Clipped to rows 0–78% of the frame, which drops the plastic chairs.
  - Scaled to **864×460** (0.36), at x 528–1392, y 205–665.
  - Its bottom 90 px ramps to ground (0 → 70%), so the name in front of it reads. Measured:
    the band without the ramp is 1.7:1 at the 95th percentile; the ramp is required.
- **Evidence box.** A 1 px ink rectangle exactly around the painted line inside the print,
  at about x 876–930, y 433–455. It is the only annotation.
- **Annotation**, x 48–448, top y 205:
  - body: "Under the company's name, in small capitals, the trailer carried the family's
    own line."
  - caption: "Lake Forest Sportscars in the paddock. Circuit and date not recorded."
- **Livery BY**: 196 px (cap 135), x 48–407, cap-top 452, on ground.
- **Livery MANCUSO**: 196 px, x 48–1392, cap-top **620**, baseline 755.
  - It stands **in front of** the print's bottom 45 px (1/3 cap). This is the reversal.
  - It is the same size and measure as the hero's MANCUSO. That is a deliberate bookend:
    the hero is the name with the family's car in front of it; here it is the name with
    "BY", which makes it the maker's signature.
- **Statement**, x 48, cap-top ~795: "An automotive family since 1923."
- Masses: dominant BY / MANCUSO; subordinate, the print (past); support, the annotation
  and box.
- Past and future in one frame: Hispano strip-2 / strip-6.

### 5.3 Frame T-C · hand-over to the GT (`d-transition-C.png`)

- BY / MANCUSO and the statement stay exactly where they are.
- The print has gone. In its place, the GT block sits in the bay (x 528–1128, from y 205):
  - "The GT." in Archivo 100/600 at 72/1.0, −1.5%. **Not livery**: the GT's name is not
    painted on anything yet, and the brand is pending.
  - "LAUNCHING SOON" `label`, red.
  - Lead 21/31, max 600: "A tribute to the iconic Chevrolet Corvette — the authenticity
    and style of original Corvettes, with modern comfort and driveability. Only by
    Mancuso."
  - CTA row: **"Ask about the GT"** (red fill, ground text, 4.85:1) and "Watch
    'Introducing the GT' · 2:19" (ui, ink, play glyph from the page's one icon set).
- This frame is the GT scene's opening. The record row (Specification / Photography /
  Source) follows below it in flow. That row is out of scope here.

### 5.4 Motion (`motion-designer`)

- **Pinned for about 180 vh.** This is the longest pin on the page, as the peak's budget
  requires.

| Scroll | Event |
|---|---|
| 0–25% | hold T-A |
| 25–60% | the photo contracts (FLIP, transform plus clip-path) from full-bleed to the print rectangle; the bottom-ramp and the evidence box fade in over the last 30% of the move; **BY** and **MANCUSO** rise 120 → 0 px, opacity 0 → 1, MANCUSO arriving last so that it lands *over* the print; the annotation fades in |
| 60–72% | **hold T-B**, the designed stop frame. Nothing moves |
| 72–95% | the print exits upward (−720 px; opacity 1 → 0 over its last 20%), the archive leaves; the GT block enters at the print's place (+24 px rise, fade) |
| 95–100% | hold T-C, then release into the GT record row |

- Stop frames to verify (`MJ4`): 40% (the print mid-contraction; the name must not yet
  overlap the print, or it must overlap fully with the ramp present), 66% (T-B), 85% (the
  print half out, the GT half in, with no text-over-text collision).
- **Reduced motion and static** (also the **mobile** form): T-A full-bleed with its
  caption. BY / MANCUSO then stands in front of the photo's bottom edge: the photo's own
  bottom 90 px ramps to ground, and MANCUSO overlaps the lower third of the cap. Then
  "An automotive family since 1923." Then the GT block in flow. The photograph appears
  **once**, with no double exposure.
- **Mobile** (`m-transition.png`), no pin:
  - **New authored portrait crop** of Lola PDF p.8 at native: x 0.255–0.555, y 0.06–0.79
    (902×1460), shown at 390×631.
  - It holds the full LFSC lettering, the painted line and the Lola's cockpit with "RICK
    MANCUSO" on its flank. The chairs are cut.
  - BY / MANCUSO at wdth 100, 65 px (cap 45): MANCUSO stands on the photo's bottom quarter
    (with the ramp), and BY sits on the Lola's green (measure ≥ 3:1).
  - Then the statement at 24/30, the caption, and the GT block in flow.

---

## 6. Side-by-side comparison plan (for `design-critic`)

**Captures**
- Desktop 1440×900 at DPR 1 and 2: the designed stop frames H-0, S1, S2 (pin 100%), S3
  (print parked), T-A, T-B (pin 66%), T-C.
- Mobile 390×844: hero, 1923, 1953, #76, transition.
- Plus a 25% thumbnail of each, and a 100% crop of every photograph in each frame.

**Pairs**

| Our frame | Vault shot(s) | Must match |
|---|---|---|
| H-0 | `oilstainlab-com/hero.jpg`; `beings-co/hero.jpg`; `rolls-roycemotorcars-com-en-us-home-html/hero.jpg` | type as image at full measure; the subject entering the mark (Beings); one subject in its environment with chrome reduced to links + 2 CTAs + caption (RR) |
| S1 | `oilstainlab-com/strip-4.jpg` (the MANIACS block) | a word texture that reads as one mass at the thumbnail; one element lit |
| S2 | `hispanosuizacars-com/strip-2.jpg`; `oilstainlab-com/strip-5.jpg` | the headline as part of the composition with the image; a small master standing on the large type, not beside it |
| S3 | `oilstainlab-com/hero.jpg` (the "11"); `oilstainlab-com/strip-6.jpg` | numeral scale against one object; a half-width master with a subordinate column |
| T-A | `rolls-roycemotorcars-com-en-us-home-html/strip-2.jpg` | one subject per viewport, the environment, nothing on top |
| T-B | `hispanosuizacars-com/strip-2.jpg`, `strip-6.jpg` | past and future in one frame; type crossing the image edge |
| T-C | `oilstainlab-com/strip-7.jpg`, `strip-8.jpg` (DESCEND / HF end) | an ending that resolves on type; the page lands |
| mobile | `oilstainlab-com/strip-m-1.jpg`, `beings-co/strip-m-1.jpg`, `hispanosuizacars-com/strip-m-2.jpg` | the word at full measure with the subject under it; authored, not shrunk |

**Rubric per frame** (0–2 each, total /10; **≥ 7 to proceed**; any 0 on criterion 1 or 4
fails the frame):

1. **Thumbnail read.** At 25%, one dominant mass, and the frame is identifiable: the name,
   the numeral, the car.
2. **Scale collision.** The livery cap is ≥ 6× the body size and the statement is 2×.
   Nothing between them competes.
3. **Interlock.** Type and photograph engage: occlusion, parking on the lower third, or the
   reversal. Any frame where a photograph merely sits beside a heading scores 0 here.
4. **Optical sharpness.** At a 100% crop, no photograph shows upscale mush at DPR 1, and
   none is displayed above its ceiling in §2.4.
5. **Character.** Next to the reference, ours holds its own in strength and is visibly
   *this* family (lettering, number, trailer), not a reference costume.

Also report:
- the overlap percentages actually rendered (25–35% desktop, 20–30% mobile);
- the measured contrast of every livery word and line of reading text on its composited
  ground;
- whether any photograph appears twice (it must not).

---

## 7. Copy and fact changes in these scenes

| Change | Source / status |
|---|---|
| Hero: "Car dealers since 1923. Racers since 1972." | Fra Noi, Feb 2005 (business founded 1923; Rick took the green flag 1972) |
| Hero: "Next, the GT — a tribute to the Chevrolet Corvette." | "Introducing the GT" film, Jul 2026 |
| Hero h1 accessible name: "The Mancuso family — car dealers since 1923, racers since 1972." | as above |
| 1923 statement reworded to "…founds the family's automobile business." | Fra Noi |
| 1923 caption: "Makes sold by the family's dealerships over the decades." | Fra Noi ("over the decades… as a dealership for:") |
| #76 master caption credit: "Photo courtesy of Bob Brandle & Tony Mezzacca" | printed on the 648 px copy of the same frame; the source file is named for Tony Mezzacca; client question 15 |
| Transition annotation: "Under the company's name, in small capitals, the trailer carried the family's own line." | the photograph (Lola PDF p.8, native crop verified) |
| Nav wordmark "Mancuso", not "LFSC" | the manager's update (LFSC sold); the GT film ("by Mancuso") |

**Not used:** the Ward's "Let's sell cars" and "you're a Mancuso" quotes. They would suit
1953, but permission is pending (client question 5), and these scenes must stand without
them.

**New derivatives for `tools/prepare-images.py`:**
1. `mancuso-76-mezzacca.jpg`: `76_mancuso-fyhrie_credit_tonymezzacca Adam.jpg` at native
   900, q86.
2. `mancuso-truck-400.jpg`: truck downscaled to 400 w (its honest ceiling; the 2048 file
   stops shipping).
3. `lola-trailer-mobile.jpg`: Lola PDF p.8, crop (0.255, 0.06, 0.555, 0.79), native
   902×1460.
4. `hero-car-path`: the traced SVG path for the desktop (2400 coordinates) and mobile
   (1100 coordinates) car layers.

---

## 8. Killed from D2, and kept

**Killed**
- The hold point H and photo-registration relays: the concept rested on lettering too small
  to see.
- The S6 push-in to native to "read" the painted line. Even at native the line is 10 px
  caps, so the set type carries it now.
- The full-bleed truck and the full-bleed `mancuso-76-blue-wide`: soft scans. RM 76 is
  dropped altogether in favour of the sharp Mezzacca frame.
- `crew-pitwall.jpg`: a duplicate of the new master.
- The makes **marquee**: it is now a static wall plus a FLIP.
- Every "44 px h2 + paragraph + rectangles" scene: one register is replaced by two extremes.
- Funnel Display and Funnel Sans.
- The 64 px caption strip under pinned stages: captions hang under their prints.
- Every reuse of `lola-paddock-trailer.jpg`: D2 showed it three times. Now it is one
  element that contracts.
- The trailer line as the hero's or the whole page's main event.
- "Lake Forest Sports Cars" as the hero label, and LFSC as the nav wordmark.
- The hero's 0.6 → 1.38 zoom (too much travel for a cold open).

**Kept**
- Every sourced fact and caption not listed in §7.
- The palette values, and red as GT-only.
- The hero photograph and its authored mobile crop.
- The idea that the family lettered its machines. It was D2's true insight; D3 executes it
  in type at a size that can be seen.
- The scale-inversion meaning of the trailer line, now as a reversal of the layering
  instead of a zoom.
- The S1 "Chevrolet lights" beat, as the FLIP into "MANCUSO / CHEVROLET".
- "Ask about the GT" in red fill with ground text.
- Lenis on `gsap.ticker`, off under reduced motion.
- `form.js` (out of scope here).

---

## 9. Critique panel on the direction (before build)

1. **Composition.** One dominant per frame, and it is the subject:
   - the hero is name and car as one mass;
   - S1–S3 are each the painted line (C13 permitted case 2: the prints break it);
   - T-B is the name.

   The eye path runs livery → master print → statement → caption in every history frame;
   the statement is always below or beside the print, never above the livery.

   *Risk:* in S1 the top-right void reads as unfinished. Keep it at ≤ 34% of the frame and
   check it in the render.
2. **Craft.** The measured numbers are in §2.3 and §3.2. Open measurements:
   - the hero lead-line box at the 98th percentile, after the ramp;
   - the mobile name band outside the car;
   - T-B's overlap band with the ramp;
   - BY on Lola green on mobile.

   Tap targets are 48 px. The livery is `aria-hidden`, with accessible names on the
   reading text.
3. **User advocate.** Job 1, "who is this": the hero answers in one read (name, 1923,
   racing, GT next). Job 2, "the GT": the red CTA is in the hero and at T-C. Job 3,
   "trust": a fact with its source in every frame.

   *Fiftieth-visit annoyance:* the 180 vh transition pin. Keep it pinned and keep it short.
   Lenis gives the transport back, and nothing is gated.
4. **Brief advocate.** The brief asks for "a noticeable leap… in art direction, composition
   and typography" and that the scenes not "look like an ordinary layout of text and
   photographs". Every frame interlocks type with image, and criterion 3 of §6 fails any
   frame that does not. "LFSC… part of the family history": it appears only as paint in a
   photograph.
5. **Contrarian.** *Collectors come for cars, and this page makes them read giant
   letters.* Three of the five frames are dominated by type, and a typographic page can
   feel like a design exercise: the Chicago Motor Cars failure, which came from type
   reducing desire. The alternative most worth considering: full-bleed sharp Lola and Le
   Mans frames carrying the history, with type as caption.

| Point | Disposition |
|---|---|
| C: S1 void may read as unfinished | **accept**: cap it, and verify in the render |
| Craft: four open contrast measurements | **accept**: required before review (§3.2, §3.3, §5.2) |
| User: transition pin fatigue | **accept**: ≤ 180 vh, no scroll-jacking, Lenis transport |
| Contrarian: type dominates; collectors want cars | **reject, with reason**: the archive cannot carry the cars at size. Only two frames are sharp beyond 1440 (Le Mans, the Lola trailer), and both already own full screens (hero, T-A). Everything else is 540–900 px. Blowing those up is exactly D2's root cause 2. The type is the family's own lettering, not decoration: the letterhead's extended MANCUSO and the #76's door number. Where a car can be big, it is (hero, T-A), and it sits in front of the name. Desire is kept by putting every car physically in front of the type. Core point: resolved, not deferred |

---

## 10. Budgets (`DNA38`, `DM3`)

**Viewport heights, desktop**
- Hero: 100 vh.
- History: S1+S2 pin about 120 vh of travel on a 100 vh stage; the 1953 kerb about 60 vh;
  S3 100 vh plus about 100 vh sticky.
- Silence: 30 vh.
- Transition: about 180 vh pinned.
- Total for the three scenes ≈ 690 vh. Tune on the render; no empty band over ~24 vh except
  the one silence.

**Mobile:** in flow, ≈ 6.5 screens.

**Payload for the three-scene sketch**
- Hero 2400 (540 KB) or mobile (240 KB).
- Trailer 2400 (676 KB, lazy).
- Mezzacca about 180 KB; the others under 100 KB each.
- Archivo variable woff2 about 120 KB, subset Latin.
- Initial load ≤ 900 KB.
- Largest asset: the trailer, 676 KB.

**Targets**
- LCP ≤ 2.0 s on cable: the hero image plus the livery text, with the font preloaded.
- 60 fps; transform, opacity and clip-path only.
