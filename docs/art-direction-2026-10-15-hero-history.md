# LFSC — Hero → opening of History · two directions (EXPLORE)

Art direction, 15 Oct 2026. Direction only: no markup, CSS or tokens here.
Manifest read: `/Users/alex/Desktop/WORK/design_dna/TASTE.md` (canonical Mac path) + `.claude/rules/design-dna.md`.
Delivery: EXPLORE, with two directions rather than §2d's three, because the caller asked for two. That yield is stated here so it is not silent.

## Shared analysis (runs once)

**Mandate: REDESIGN.** These carry through untouched:
- the name *Lake Forest Sports Cars* and the Mancuso family name;
- the family crest, used as it appears in photographs and never redrawn or traced;
- the real archive photographs, in natural colour and at normal brightness, never upscaled past native size;
- only sourced facts;
- the agreed story, "the Mancuso automotive family that leads to the launch of its own GT";
- Lenis as the scroll layer.

V1's composition is **not** a carrier.

**What I found in the material:**
1. The Mancuso Chevrolet letterhead (`Mancuso Adam.jpg`) sets MANCUSO in wide extended navy caps. CHEVROLET follows in a condensed oblique. Triple "speed" rules run into the name from the left margin and out of the address line to the right margin. It is a dealer's stationery that already carries racing.
2. The sun strip on the windscreen of Rick's #76 reads **MANCUSO · FYHRIE · GREENWOOD**. It appears in `76Mancusowindshield` and `RM 76`, in gold sign-painted letters on a dark tint.
3. On the Le Mans car (`76LeMansaboveright`), the glass carries the drivers' names, *John Greenwood / Bernard Darniche*. "Mancuso Chevrolet" appears only small, on the rear quarter. Rick stayed home.
4. The transporter (`Mancuso truck Adam.jpg`, 2048 px) has *Mancuso Chevrolet / CHICAGO* painted in red bracketed-serif signwriting, with a #76 Corvette under the awning.
5. Only one frame in the archive is a real **scene**: the Le Mans grandstand, 3030 px, where the car is about 21% of the frame width. `RM 76` is a full-frame object, because the car fills the width. **It is unsuitable as a full-screen hero, and is recorded as such.**

**Colours sampled from the files:**
- windscreen tint band on RM 76: #162620
- windscreen banner letters: #EABA70
- letterhead paper: #E2E0DD
- letterhead navy: #303261
- truck lettering red: #AD544E
- Le Mans asphalt: #546359

---

## A · ON THE GLASS

**Concept.** Mancuso history is a record of whose names were lettered on the car. The page therefore looks through a windscreen whose sun strip carries the family's name, and then, chapter by chapter, the names actually lettered on the car in view.

**Source:** the MANCUSO · FYHRIE · GREENWOOD windscreen banner (finding 2), and the Le Mans glass that carries other men's names (finding 3).

**Concept Gate: PASS.**
- **CG1:** it opens on the family's names, not on a style or a tool.
- **CG2:** it is one sentence, and it could be wrong if the strip is read as a nav bar.
- **CG3:** swap the strip for an ordinary chapter running head and two things are lost: the names' source, and the Le Mans beat where Mancuso is missing from the glass.
- **CG4:** the static build works. Every section prints its strip state at its own head.
- **CG5:** it shares a persistent band with V1's sticky dateline rail. The necessity specific to this project is that the strip is a literal object in the photographs, and it holds transcribed evidence, not dates.
- **CG6:** this is one direction.
- **CG7:** every chapter has a strip state:
  - the dealership: MANCUSO CHEVROLET
  - the #76: M·F·G
  - Le Mans: GREENWOOD · DARNICHE, with "Mancuso Chevrolet — rear quarter"
  - the Lolas: the crest
  - the GT: MANCUSO alone

**Design Read**
- Reading this as the homepage opening (hero → first History chapter) for collectors and LFSC clients, leaning period-motorsport documentary.
- Mandate: REDESIGN (carriers above). Composition, type, ground and motion are in scope.
- Style mode: HYBRID. Anchor cinematic-industrial (the photograph does the persuading; darkness is controlled). Contrast swiss-editorial (the strip and captions as a declared system). Signature: none, because the strip is derived from the brief. Unifying principle: what is lettered on the car is the text.
- Dimensionality: ABSENT. The photographs carry depth, and the only motion is a state change.

**Hero declaration**
- **Viewport ownership:** full. The strip takes y 0–104 and the photograph y 104–900, at 1440×900.
- **Scene treatment:** environment. The 1976 Le Mans main straight and grandstand, natural colour.
- **Object scale:** as in the source. The Corvette is about 21% of the frame width.
- **Focal point:** the white #76 at about (1010, 560).
- **Negative space:** the lower-left asphalt and the white kerb curves, which carry the eye from the claim up to the car.
- **Text safe zone:** the strip (full width), plus a claim block at x 308–800, y 782–884. This is the only clean asphalt between the kerb lines and the yellow lane dashes.
- **Desktop crop:** source x 0–3030, y 390–2031, at 0.475×. That is 0.95× on retina, so there is no upscale.
- **Mobile crop:** authored separately (below).
- **Asset suitability:** yes. This is the only true scene in the archive.

**Governing event**
- **Event:** the team's Corvette passes the Le Mans grandstand, seen through a windscreen whose strip names the family.
- **Primary subject:** the #76 in the crowd scene.
- **Identity mass:** the strip.
- **Evidence:** the claim and caption.
- **CTA:** the strip nav, plus "The family history ↓".
- **Active field:** the photograph.
- **Intentional negative space:** the lower-left kerb.
- **Excluded:** scroll cue, cookie bar, logo lockup.

**Type.** The typefaces come from the material:
- **Besley** (Google), a Clarendon revival. It matches the bracketed-serif signwriting on the truck and the windscreen banner.
  - 800 caps for the strip only, because that is painted lettering.
  - 500/600 sentence case for claims and heads.
  - 500 italic for the quote.
- **Libre Franklin** 400/500/600 for body (18/28), captions (15/22) and labels (14px caps, +0.1em). Franklin Gothic is the American race-programme and newspaper grotesque.

**Colour**
- Ground "tint": #141E1A, the windscreen band #162620 deepened.
- Strip letters: #E9BC6E, the banner gold. Gold appears **only** in the strip.
- Text: #EEE8DA, the warm white of the Le Mans car body.
- Secondary: #A9B3AC, about 8.6:1 on the ground.

**Motion.** There is one idea: **the strip swap.**
- When the photograph that carries the next lettering crosses the vertical centre of the viewport, the strip's text is replaced by a left-to-right clip wipe of 420 ms, ease-out. It is laid like a decal.
- **Narrative role:** it announces whose names are on this car.
- There is nothing else: no reveals, no parallax.
- Reduced motion: an instant swap.
- Lenis is the scroll layer.

**Shots**

**A1 · Hero (reveal; feeling: scale and pride).** Uses `11.1-1-1976-Le-Mans-Greenwood-in-Front-of-Keyser-Oursler Adam.jpg`. The web copy is the existing `assets/img/hero-lemans-1976-2400.jpg`.
- **Masses:**
  - The strip, a band at y 0–104 in #141E1A.
    - Left, at x 64: "MANCUSO · LAKE FOREST SPORTS CARS", Besley 800, 38px, caps, +0.05em, gold. It is about 900px wide.
    - Right, ending at x 1376: "HISTORY · THE GT · CONTACT", Franklin 500, 14px, caps, +0.12em, #EEE8DA.
  - The photograph, full width, at y 104–900.
  - The claim block at x 308:
    - "An automotive family since 1923." in Besley 500, 34px, #EEE8DA, baseline about 826. The line is from the GT film.
    - Under it, Franklin 15px: "Le Mans, June 1976 — the Greenwood Corvette Rick Mancuso turned over to his teammates. He stayed home to run the business."
- **There is no headline over the car and no scrim.** Measure contrast on the render; the target is ≥ 4.5:1 for the 15px line against #546359.

**A2 · Before the glass, 1923–1953 (interruption; feeling: rootedness). 110vh.** The strip wipes to **"MANCUSO CHEVROLET"**.
- **Ground:** tint. Full width, no photo bleed.
- Left column, x 64–600:
  - label "1923 — 1953", Franklin 600, 14px, caps;
  - body, Franklin 18/28: "Benjamin Mancuso founds the family's automobile business in Batavia, New York, in 1923. In 1953 Jim Mancuso establishes Mancuso Chevrolet in Skokie, Illinois."
- Right, x 776–1376: `Mancuso Chevy Adam.jpg` (`assets/img/mancuso-chevrolet-sign.jpg`) at **600×465, native 1:1**, uncropped.
- Below, spanning x 64–1100:
  - Besley 500 italic, 48/56, #EEE8DA: "You're no longer just a car guy, you're a Mancuso, and I'm proud of you."
  - Attribution, Franklin 15px: "Jim Mancuso to his son Rob — Ward's Dealer Business, March 2001." This is pending client approval (Q5); the sketch marks it.

**A3 · On the glass, 1972–1976 (macro; feeling: ownership and intimacy). 170vh.** The strip wipes to **"MANCUSO · FYHRIE · GREENWOOD"**.

Screen 1:
- `76Mancusowindshield Adam.jpg` (`mancuso-76-windshield.jpg`) at **648×414, native 1:1**, at x 728–1376, y 152. Its banner falls at about page y 267–342, so it lies parallel to the site strip. The printed credit "Buzz Fyhrie" stays visible.
- Left column, x 64–600:
  - label "1972 — 1976";
  - Besley 600, 44px: "Rick's own Corvette";
  - Franklin 18/28: "Rick Mancuso took the green flag in 1972 in a 1958 Corvette, B-Production. The #76 that followed was, by the Revell kit's account, the first customer car John Greenwood built — for Rick — raced with Mancuso Chevrolet sponsorship."

Screen 2:
- `RM 76 Adam.jpg` (`mancuso-76-blue.jpg`) at **1024×768 CSS (0.5× native)**, x 352–1376, uncropped. The same banner shows on its windscreen, so the strip rhymes a second time.
- Caption at x 64–320, bottom-aligned: "The #76 in the pit lane. Circuit and date not recorded."
- Next, out of scope: Le Mans, where the strip reads "JOHN GREENWOOD · BERNARD DARNICHE" and a small line reads "Mancuso Chevrolet — rear quarter only".

**Mobile 390×844 (authored)**

**A1.**
- Strip at y 0–64: "MANCUSO" in Besley 800, 28px, gold, and "Menu" in Franklin 14px on the right.
- Photo at y 64–624, using source window x 1400–2813, full height, at 0.276×. The car sits at x 116–289, centred right, with crowd above and road below.
- A tint panel at y 624–844 holds:
  - the claim, Besley 500, 26px, in 2 lines;
  - the caption, 14px;
  - the CTA at y about 800.
- There is no type on the photo.

**A2.**
- Strip: "MANCUSO CHEVROLET", Besley 800, 22px.
- Label, then body at 17/27.
- Sign at 358×277 (0.6×).
- Quote in Besley italic, 30/36, with attribution at 14px.

**A3.**
- Strip: "MANCUSO · FYHRIE · GREENWOOD", Besley 800, 15px, +0.02em. Menu on the right.
- Head at 30px, then body.
- Windscreen at 358×229 (0.55×).
- `RM 76` with its own square crop: source x 200–1736, y 300–1536, holding the hood script and the windscreen banner. The tail is cut, and that cut is a stated decision. Shown at 358×358.

**Peak (page):** the GT chapter, the only time the strip reads **MANCUSO** alone. This sequence is the establishing shot and must not out-spend it.
**Signature move:** the sun strip that transcribes the lettering on the car in view.
**Budgets:**
- Viewport heights: A1 100vh, A2 110vh, A3 170vh, so 380vh in total.
- Payload: ≤ 1.4 MB for the sequence, including Besley ×3 and Franklin ×3 (woff2, latin subset, about 180 KB).
- Largest asset: the hero at 2400w, recompressed to ≤ 420 KB.
- LCP: ≤ 2.0 s on cable and ≤ 2.5 s on 4G.

**Principal risk.** It could read as V1 with a band on top: the same Le Mans frame, dark, a photo with a caption. If the strip is not big and gold enough to read as lettering rather than as a nav bar, the concept is invisible.

---

## B · THE FAMILY FILE

**Concept.** Since 1923 the business has been the fixed sheet the racing came back to. So the history is laid on Mancuso Chevrolet's own letterhead, with every print at the size it arrived, and the GT is the first thing the page shows full size.

**Source:** the letterhead (finding 1), the transporter (finding 4), Fra Noi's "Rick stayed home for business", and the archive itself (648 px prints with their photographers' credits printed in).

**Concept Gate: PASS.**
- **CG1:** it opens on the business, not a style.
- **CG2:** it is one idea, the business as the constant, and the GT clause is its consequence. It could be wrong if the page reads as a museum.
- **CG3:** make the prints full-bleed and "the size it arrived" is lost, along with the GT payoff.
- **CG4:** the static build is the design.
- **CG5:** it deliberately drops V1's mono captions, dated plates, sticky rail and dark ground. Captions are the credits printed inside the prints.
- **CG6:** this is one direction.
- **CG7:** every chapter opens with a letterhead line, and the GT breaks the sheet.

**Design Read**
- Reading this as the homepage opening for collectors and LFSC clients, leaning dealer-archival (stationery and file).
- Mandate: REDESIGN (carriers above). The ground moves from graphite to paper. **This yields the original graphite brief, and the yield is stated.**
- Style mode: HYBRID. Anchor swiss-editorial (the letterhead is a declared system; position and rule do the explaining). Contrast technical-luxury (provenance as the desirable content: native scale, credits intact). Signature: none. Unifying principle: everything is filed on the dealer's paper.
- Dimensionality: ABSENT. Paper is flat on purpose.

**Hero declaration**
- **Viewport ownership:** full. A constructed field, the letterhead, owns the screen, and one print sits on it. This is an event of record, claim and subject, not a full-bleed photograph.
- **Scene treatment:** constructed stationery, plus one period photograph.
- **Object scale:** the print is 840×630, about 58% of the width. Inside it, the car fills the right half and the truck's lettering the left.
- **Focal point:** the MANCUSO wordmark, then "Mancuso Chevrolet CHICAGO" painted on the truck. The name is read twice, first as type and then as paint.
- **Negative space:** the right column beside the print, and the margin between the letterhead and the print.
- **Text safe zone:** y 40–210 at full width, and x 1032–1376.
- **Desktop crop:** truck uncropped, 4:3, at 0.41×.
- **Mobile crop:** authored separately.
- **Asset suitability:** a soft scan. It holds as a print at ≤ 0.45×, and it is never asked to bleed.

**Governing event**
- **Event:** the family's letterhead names the house; under it, the dealership's own transporter stands beside the #76.
- **Identity mass:** the letterhead line.
- **Evidence:** the print and its caption.
- **CTA:** "The family file ↓" and "The GT — launching soon →".
- **Excluded:** any texture, shadow or rotation.

**Type.** **Archivo** (Google, variable: wdth 62–125, wght 100–900, ital). It is one family whose three widths are the letterhead's three voices:
- wdth 125 / 800 caps: the extended MANCUSO;
- wdth 75 / 500 italic caps: the condensed oblique CHEVROLET slot;
- wdth 100 / 400: the address line, which becomes body text at 18/30 and captions at 15/22.

There is no serif and no mono.

**Colour**
- Paper: #ECEAE5, the letterhead stock #E2E0DD with the scan's grey lifted.
- Ink: #26285A, the letterhead navy #303261 deepened for 18px text. That is about 11:1.
- Rules are navy.
- **There is no accent colour.** The photographs bring all the colour.

**Motion.** **None.** A file does not perform, and stillness is the structural contrast with A. Lenis is the scroll layer. Reduced motion is identical.

**Signature move.** **The letterhead line.**
- A triple rule (three 3px navy lines, 7px apart) runs in from the left page edge.
- Then comes a word in Archivo extended.
- Then a condensed italic slot.
- An address line closes it and runs a triple rule out to the right page edge.

It is the hero masthead and every History entry header. In the hero the italic slot holds LAKE FOREST SPORTS CARS, where the letterhead had CHEVROLET.

**Shots**

**B1 · Hero (reveal; feeling: trust and recognition).**
- Paper ground.
- The triple rule at x 0–112, centred on the wordmark's caps.
- "MANCUSO": Archivo 125/800, 112px, +0.1em, navy, at x 136, top about y 64. It is about 735px wide.
- The italic slot: "LAKE FOREST SPORTS CARS", Archivo 75/500 italic caps, 34px, baseline-aligned, from x 916.
- The address line: "An automotive family since 1923", Archivo 400, 17px, right-aligned to x 1296 at y about 196. A triple rule follows from x 1312 to 1440.
- The print: `Mancuso truck Adam.jpg`. The builder makes a new web copy at 1680w, ≤ 280 KB, because it is not yet in `assets/img`. It sits at **840×630** at x 136–976, y 236–866, with no border, shadow or radius.
- The right column, x 1032–1376, bottom-aligned to y 866:
  - caption, 15/22: "The Mancuso Chevrolet transporter, with a #76 Corvette under the awning. Circuit and date not recorded.";
  - then the two CTAs in Archivo 125/700, 14px caps.
- The hero video arrives later. It plays inside this rectangle and never bleeds.

**B2 · The house, 1923–1953 (dolly; feeling: continuity). 160vh.**

Entry "1923":
- Letterhead line: rule, then "1923" in 125/800 at 72px, then the italic slot "BATAVIA, NEW YORK" at 28px.
- Body at x 136–616: "Benjamin Mancuso founds the family's automobile business." Source line: Fra Noi, Feb 2005.
- At x 760, the makes that followed the name, from Fra Noi: STUDEBAKER / OLDSMOBILE / CHEVROLET / BUICK / PONTIAC / CADILLAC / HONDA / SAAB / PEUGEOT / ASTON MARTIN / MASERATI / FERRARI. They are set in 75/500 italic caps, 30/34, as one column about 410px tall. This is content, and it shows what has stood in the italic slot for a century.
- There is no image, because none exists.

Entry "1953 · SKOKIE, ILLINOIS":
- Body: "Jim Mancuso establishes Mancuso Chevrolet."
- `Mancuso Adam.jpg` (`mancuso-chevrolet-letter.jpg`) at **464×600 (0.75×)**, x 136–600: the real letterhead, revealed as the page's own source.
- `Mancuso Chevy Adam.jpg` at **600×465, native**, x 776–1376, bottom-aligned with the letter.
- Captions 15px below each.
- Then Jim's quote, 75/500 italic, 40/46, at x 136–1100, with its attribution (pending Q5).

**B3 · As it arrived, 1972–1976 (interruption; feeling: distance and pride). 150vh.**

Entry "1972 · B-PRODUCTION": text only. "Rick Mancuso takes the green flag in a 1958 Corvette."

Entry "1976 · LE MANS, FRANCE":
- Body at x 136–520: "For the bicentennial the French government invites Mancuso and his team to race a Corvette at Le Mans. Rick stays in Skokie to run the business and turns the Greenwood wide-body IMSA Corvette over to his teammates. It reaches 218 mph on the Mulsanne, the fastest entry on the course, before a fuel malfunction ends its race in the eighth hour."
- Stacked at x 616–1264:
  - `76LeMansnewspaper Adam.jpg` (`lemans-1976-le-maine.jpg`) at **648×417, native**;
  - 24px below it, `76LeMansaboveright Adam.jpg` (`lemans-1976-above.jpg`) at **648×479, native**, with the Albert Lamberts credit intact. "Mancuso Chevrolet" is visible on its rear quarter.
- Captions below each print:
  - "Le Maine Libre, 12–13 June 1976."
  - "Driver names on the glass; Mancuso Chevrolet on the rear quarter."

**Mobile 390×844 (authored)**

**B1.**
- Rule at x 0–12.
- "MANCUSO", 125/800, 44px, +0.08em, at x 16 (about 285px wide), y 24.
- Italic slot below at 20px.
- Address line at 15px, right-aligned to x 330, then a rule from 342 to 390.
- The truck as a **square crop**: source x 120–1656, y 0–1536, showing the lettering whole and the car nose to the door. The tail is cut, and that cut is stated. Shown at 358×358, y 168–526.
- Caption at 15/22.
- CTAs at y about 780.

**B2.**
- Entry headers: "1923" at 48px with the italic slot below at 18px.
- The makes column at 22/26.
- Letterhead at 358×463.
- Sign at 358×277.
- Quote at 28/34.

**B3.**
- Text entries at 17/27.
- Le Maine Libre at 358×230.
- Above-right at 358×265.
- The credits stay inside the frames.

**Peak (page):** the GT, the first and only full-bleed image on the page. Everything before it, the hero included, is a print on paper.
**Budgets:**
- Viewport heights: B1 100vh, B2 160vh, B3 150vh, so 410vh in total.
- Payload: ≤ 1.0 MB, including Archivo variable roman and italic (about 140 KB).
- Largest asset: the truck at 1680w, ≤ 280 KB.
- LCP: the wordmark, ≤ 1.5 s.

**Principal risk.** It could read as a museum or scrapbook: paper and old prints that undersell a Ferrari, Maserati and Aston Martin house that is launching a car. It also departs from the graphite brief.

---

## Recommendation

**B.**
- It comes from the one object that is unmistakably theirs: a dealer's letterhead that already ran speed lines into the family name.
- It turns the archive's hardest constraint, 648 px prints, into the meaning.
- It leaves "dark ground + big headline + thin rules + scroll animation" entirely.
- It has a page-level payoff A lacks, because the GT is the first thing shown full size.
- Carry A's best finding into B's 1976 entry: the Mancuso name rode on the rear quarter because Rick stayed home.
- The cost is the graphite ground. That needs Alex's call, and if the client insists on dark, the answer is A, not a dark B.

**Must not happen in execution:**
- No paper grain or texture.
- No rotated, taped, shadowed or polaroid-framed prints.
- No scattered "desk" arrangement.
- No upscaling, and no cropping off printed credits.
- Nothing from V1: no mono captions, dateline rail or ghost numerals.
- No fade or slide reveals.
- No accent colour.
- No traced or vectorised letterhead or crest. The letterhead line is rebuilt in Archivo.
- No invented circuits or dates for photographs.
- In A specifically: no gold outside the strip, and no strip text that is not on the car in view.
- Lenis is in from the first build.
