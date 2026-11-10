# Update 1 · changes to the live site

**For:** www.lakeforestmotorsports.com, built from this handoff as it stood on 4 November 2026.
**Reference build with every change below:** https://sigovs.github.io/LAKE-FOREST/handoff/site/index.html

| # | Page | Change | What you touch |
|---|---|---|---|
| 1 | `/` | Hero film: black and white lasts longer | two video files and their cache version |
| 2 | `/` (desktop) | GT block: the words show at once, and the picture is lighter | `aan-home.js` (two lines), `style.css` (three rules) |
| 3 | `/` and `/rpm/` | RPM Club: the studio picture from rpmclub.com replaces the yellow-Corvette photograph | one new image, two `<img>` tags |

After applying, bump the versions on `style.css` and `aan-home.js`, and purge the page cache or CDN if you have one.

---

## 1. Homepage hero film: black and white lasts longer

The opening of the hero film now stays black and white until 3.0 s and is in full colour by 3.8 s. Before, it was black
and white until 1.6 s. Only the grade changes. The length (40.04 s), the frame rate, the size, the poster and the 10 s
point where the second slide starts are all as before, so there are **no code changes**.

![Hero, before and after, 0–4.5 s](images/01-hero-before-after.jpg)

**Replace** these files with the ones in `videos/`, keeping the same names:

| File | Size | Replaces on the server |
|---|---|---|
| `videos/hero-v3.mp4` | 1280×720 · 9.3 MB | `wp-content/themes/aanWordpress/videos/hero-v3.mp4` |
| `videos/hero-v3-mobile.mp4` | 720×406 · 2.7 MB | `wp-content/themes/aanWordpress/videos/hero-v3-mobile.mp4` |

**Bust the cache (required).** The server sends these files with `Cache-Control: max-age=31536000`, so returning visitors
would keep the old film for up to a year. In the homepage `<video id="home-video">`, add `?v=2` to both sources:

```html
<source src="…/aanWordpress/videos/hero-v3-mobile.mp4?v=2" type="video/mp4" media="(max-width: 699px)" />
<source src="/wp-content/themes/aanWordpress/videos/hero-v3.mp4?v=2" type="video/mp4" />
```

**Check:** the No. 48 race car is black and white for about 3 seconds, then the colour comes in as it turns into the black
441. The same below 700px. The "The GT" / "Since 1923" controller still switches at 10 s.

---

## 2. Homepage GT block: words at once, a lighter picture

This is the "A tribute to the Chevrolet Corvette" block (`#gt`), on desktop only. On a phone it is a still picture and does not
change.

- **The words are there when you arrive.** "A tribute to the Chevrolet Corvette", the lead line, "Launching soon" and the
  two buttons used to fade in near the end of the pinned scroll. Now they are visible from the start.
- **The picture is lighter.** The two cars and the GT mark are visible from the start. The two lamps still strike on the
  scroll and add their pools of light. The beams, the pointer torch and the dust are unchanged.
- The pin, its length and the lamp timing are unchanged.

![GT block, before and after, 1440 px](images/02-gt-before-after.jpg)

**JavaScript: `assets/js/aan-home.js`, in the GT timeline (around lines 357–370).**

Change the brightness of the warehouse layer:

```js
// before
.fromTo(q('.gt__dark'), { filter: 'brightness(0.16) contrast(1.05)' }, { filter: 'brightness(0.3) contrast(1.05)', duration: 0.5 }, 0.38)
// after
.fromTo(q('.gt__dark'), { filter: 'brightness(1) contrast(1.05)' }, { filter: 'brightness(1.05) contrast(1.05)', duration: 0.5 }, 0.38)
```

Delete the line that fades the words in. Keep the rest of the timeline, including the closing `.to({}, { duration: 0.2 }, 1.2)`:

```js
// delete
.fromTo(qa('.gt__top > *, .gt__bottom > *'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'power1.out' }, 0.72)
```

**CSS: `assets/css/style.css`.** Replace these three rules:

```css
/* before */
.gt__dark { filter: brightness(.16) contrast(1.05); }
.gt__stage--photo .gt__dark img { filter: brightness(.55); }
.gt__stage--photo .gt__lit img { filter: brightness(.68) contrast(1.08); }
```

with these:

```css
/* after */
.gt__dark { filter: brightness(1) contrast(1.05); }
.gt__stage--photo .gt__dark img { filter: brightness(.72); }
.gt__stage--photo .gt__lit img:not(.gt__mark) { filter: brightness(1.2) contrast(1.08); }
```

The `:not(.gt__mark)` matters. The old rule also dimmed the GT mark, which is why the mark looked grey. The mark now keeps
its own rule, which is already in the file: `.gt__stage--photo .gt__mark--cs { … filter: drop-shadow(…) }`.

**Check, on a desktop at 1440 or 1920:**
- On reaching the block, the cars, the GT mark and all the words are visible while the lamps are still dark.
- Scrolling on, the left lamp strikes, then the right one, and the cars brighten in their pools. Then the block releases.
- With the mouse over the block, the torch and the lamps still follow it.
- Below 700px, nothing changes.

---

## 3. RPM Club: the studio picture from rpmclub.com replaces the yellow-Corvette photograph

The client does not want the photograph of Rob and Rick on the yellow Corvette. It is replaced by the studio picture from
the show's own website (rpmclub.com): both hosts at their microphones under the RPM Club sign. This is on the homepage RPM
Club block and on the RPM Club page hero. The layout does not change, only the image.

![RPM Club block, before and after](images/03-rpm-before-after.jpg)

**Add** `images/rpm-studio.jpg` (576×1024, 167 KB, as published on rpmclub.com as `rpm-studio-mobile.jpg`) to
`wp-content/themes/aanWordpress/images/mockup/`.

**Homepage `/`, the RPM Club block (`.rpm__photo`).** Replace the `<img>`:

```html
<!-- before -->
<img src="…/images/mockup/rpm-yellow-vette.jpg" width="1123" height="1400" loading="lazy" alt="Rob and Rick Mancuso in white shirts, …">
<!-- after -->
<img src="…/images/mockup/rpm-studio.jpg?v=2" width="576" height="1024" style="object-position: 50% 42%" loading="lazy"
     alt="Rob and Rick Mancuso at their microphones in the RPM Club studio, under the RPM Club sign.">
```

**RPM Club page `/rpm/`, the hero picture (`.cp-hero__pic`).** Replace the `<img>` the same way and keep `fetchpriority="high"`.
The caption "Rob and Rick Mancuso, the hosts." stays:

```html
<img fetchpriority="high" src="…/images/mockup/rpm-studio.jpg?v=2" width="576" height="1024" style="object-position: 50% 42%"
     alt="Rob and Rick Mancuso at their microphones in the RPM Club studio, under the RPM Club sign.">
```

No CSS changes: both slots already crop to their portrait frame (`object-fit: cover`), and the `object-position` keeps the sign and
both hosts in it. You can delete `rpm-yellow-vette.jpg` from the theme once both pages are updated.

**Check:** on the homepage and on `/rpm/`, the RPM CLUB sign and both hosts are in the frame, at desktop and on a phone.
