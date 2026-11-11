#!/usr/bin/env python3
"""Build the living design-system page, handoff/design-system/index.html.

Every component on the page is copied out of the built site (handoff/site), not redrawn, and the page loads the
site's own stylesheet, so what the page shows is exactly what the site ships. Run after tools/build-handoff.py:

    python3 tools/build-handoff.py && python3 tools/build-design-system.py
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'handoff', 'site')
OUT = os.path.join(ROOT, 'handoff', 'design-system', 'index.html')


def read(name):
    return open(os.path.join(SITE, name), encoding='utf-8').read()


def grab(text, pattern):
    m = re.search(pattern, text, re.S)
    if not m:
        raise SystemExit('component not found: ' + pattern)
    return m.group(0)


def rebase(html):
    """Point the copied markup at the site folder, one level up."""
    html = re.sub(r'((?:src|href|poster)=")(assets/|css/|js/)', r'\1../site/\2', html)
    html = re.sub(r'(srcset=")([^"]+)"', lambda m: m.group(1) + re.sub(r'(^|,\s*)assets/', r'\1../site/assets/', m.group(2)) + '"', html)
    html = re.sub(r'href="((?:index|family|history|gallery|gt|rpm|contact)\.html[^"]*)"', r'href="../site/\1"', html)
    return html


idx, con = read('index.html'), read('contact.html')
C = {
    'header': grab(idx, r'<header class="nav" data-nav>.*?</header>'),
    'gens': grab(idx, r'<ol class="gens">.*?</ol>'),
    'card': grab(idx, r'<li><a class="card" href="history\.html#y76">.*?</a></li>'),
    'card_next': grab(idx, r'<li><a class="card card--next".*?</a></li>'),
    'player': grab(idx, r'<div class="ep ep--latest player" data-player>.*?</audio>\s*</div>'),
    'eplist': grab(idx, r'<ol class="ep-list">.*?</ol>'),
    'record': grab(con, r'<dl class="contact__record">.*?</dl>'),
    'form': grab(con, r'<form class="enquiry cp-form".*?</form>'),
    'era': grab(idx, r'<figure class="era__pic" id="ch-lola" data-frame>.*?</figure>'),
    'foot': grab(idx, r'<footer class="foot">.*?</footer>'),
}
C = {k: rebase(v).replace(' id="ch-lola"', '') for k, v in C.items()}
# the header as it sits once the page scrolls: no motion script runs here, and the top-of-page state scales the logo 1.7x
C['header'] = C['header'].replace('<header class="nav" data-nav>', '<header class="nav is-solid is-small">')
# and the Menu button js/menu.js adds on the site, drawn statically (it only shows below 900px)
C['header'] = C['header'].replace('</header>', '  <button class="nav__menu" type="button" aria-expanded="false" tabindex="-1"><span class="nav__menu-t">Menu</span>'
                                  '<span class="nav__menu-i" aria-hidden="true"><i></i><i></i></span></button>\n</header>')

COLOURS = [
    ('Surface', [
        ('--ground', '#0b0c0d', 'Page background', ''),
        ('--ground-2', '#121416', 'Raised surface: panels, the form, tiles', ''),
    ]),
    ('Text', [
        ('--ink', '#edebe6', 'Primary text, headings, button fill', '16.4:1'),
        ('--ink-2', '#c9cbcd', 'Secondary reading text', '12.0:1'),
        ('--mute', '#a3a5a7', 'Captions, labels, sources', '7.9:1'),
        ('--tone', '#8d8f91', 'Second line of a two-tone heading', '6.0:1'),
    ]),
    ('Accent: the GT tricolour (only as the label flag)', [
        ('--gt-red', '#e2342b', 'Flag, first third', ''),
        ('--gt-white', '#e6e6ea', 'Flag, second third', ''),
        ('--gt-blue', '#1f5fd0', 'Flag, last third', ''),
    ]),
    ('Chapter colours (one chapter each, never interface)', [
        ('--livery', '#5a9fc7', 'The #76 chapter ground', 'navy 5.6:1'),
        ('--navy', '#0d2236', 'Text on the livery blue', ''),
        ('--lm-blue', '#1869d2', 'Le Mans: the lit fact, large type only', '3.7:1'),
    ]),
]

TYPE = [
    ('D1', 'd1', 'The page’s one peak: the hero title', 'We build the GT.'),
    ('D2', 'd2', 'h1 and chapter openers', 'Four generations'),
    ('D3', 'd3', 'Section titles inside a chapter', 'Dealers and racers'),
    ('H3', 'h3', 'Item titles, pull quotes', 'Rick takes it racing.'),
    ('H4', 'h4', 'Small titles, times', 'Lake Forest Sports Cars'),
    ('Sub-line', 'sub', 'A separate statement under a title, in --tone', 'A tribute to the Chevrolet Corvette'),
    ('Statement', 'statement', 'A chapter’s one paragraph, set large', 'Timeless Corvettes engineered for today, by Mancuso.'),
    ('Lead', 'lead', 'The first paragraph of a page or block', 'C2 and C3 Corvettes, 1963–1982, inspired by the race cars of the ’70s.'),
    ('Body', 'body', 'Reading text', 'Rick Mancuso took the green flag in 1972, in a 1958 Corvette prepared to B-Production specs.'),
    ('Body small', 'body-sm', 'Card text, list text, form notes', 'Jim opens the family’s Chevrolet dealership in Skokie.'),
    ('Caption', 'caption', 'Photo credits and sources — the 14px floor', 'Source: Fra Noi, February 2005.'),
    ('Label', 'label', 'Uppercase, short: eyebrows, field labels, meta', 'The family story'),
]

SPACE = [(1, 4), (2, 8), (3, 12), (4, 16), (5, 24), (6, 32), (7, 48), (8, 64), (9, 96), (10, 128), (11, 192)]


def swatches():
    out = []
    for group, items in COLOURS:
        out.append(f'<h3 class="ds-h">{group}</h3><ul class="ds-swatches">')
        for name, hexv, role, ratio in items:
            out.append(f'<li><span class="ds-chip" style="background:{hexv}"></span><code>{name}</code><span class="ds-hex">{hexv}</span>'
                       f'<span class="ds-role">{role}</span>' + (f'<span class="ds-ratio">{ratio} on ground</span>' if ratio else '') + '</li>')
        out.append('</ul>')
    return '\n'.join(out)


def type_rows():
    out = []
    for name, key, use, sample in TYPE:
        if key == 'label':
            style = 'font-size:var(--t-label);font-weight:var(--w-label);letter-spacing:var(--ls-label);line-height:var(--lh-label);text-transform:uppercase;color:var(--mute)'
        elif key in ('d1', 'd2', 'd3', 'h3', 'h4', 'sub'):
            style = (f'font-family:var(--f-display);font-weight:var(--w-display);font-variation-settings:"wdth" var(--display-wdth);'
                     f'font-size:var(--t-{key});line-height:var(--lh-{key});letter-spacing:var(--ls-{key})' + (';color:var(--tone)' if key == 'sub' else ''))
        else:
            style = f'font-size:var(--t-{key});line-height:var(--lh-{key})' + (';color:var(--mute)' if key == 'caption' else '')
        tokens = f'--t-{key}' + ('' if key in ('body', 'body-sm', 'caption', 'lead', 'statement') else f' · --lh-{key}') if key != 'label' else '--t-label · --w-label · --ls-label'
        out.append(f'<div class="ds-type"><div class="ds-type__meta"><b>{name}</b><code>{tokens}</code><span>{use}</span></div>'
                   f'<p class="ds-type__sample" style=\'{style}\'>{sample}</p></div>')
    return '\n'.join(out)


def space_rows():
    return '\n'.join(f'<li><code>--s-{n}</code><span class="ds-bar" style="width:{px}px"></span><span class="ds-px">{px}px</span></li>' for n, px in SPACE)


PAGE = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Design system · Lake Forest Motor Sports</title>
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Cinzel:wght@400;500&display=swap">
<link rel="stylesheet" href="../site/css/styles.css">
<link rel="stylesheet" href="tokens.css">
<style>
  /* the design-system page's own chrome, built from the same tokens */
  body {{ background: var(--ground); color: var(--ink); }}
  .ds {{ max-width: 1240px; margin: 0 auto; padding: var(--s-9) var(--gutter) var(--s-10); }}
  .ds-top {{ display: grid; gap: var(--s-5); padding-bottom: var(--s-8); border-bottom: 1px solid var(--rule); }}
  .ds-top h1 {{ margin: 0; font-family: var(--f-display); font-weight: var(--w-display); font-variation-settings: "wdth" var(--display-wdth);
    font-size: var(--t-d2); line-height: var(--lh-d2); letter-spacing: var(--ls-d2); }}
  .ds-top h1 span {{ display: block; color: var(--tone); }}
  .ds-index {{ display: flex; flex-wrap: wrap; gap: var(--s-2) var(--s-5); margin: 0; padding: 0; list-style: none; }}
  .ds-index a {{ color: var(--ink-2); text-underline-offset: 4px; font-size: var(--t-body-sm); }}
  .ds-sec {{ padding: var(--s-9) 0 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--s-6); }}   /* never wider than the page, whatever a specimen holds */
  .ds-sec > h2 {{ margin: 0; font-family: var(--f-display); font-weight: var(--w-display); font-variation-settings: "wdth" var(--display-wdth);
    font-size: var(--t-d3); line-height: var(--lh-d3); letter-spacing: var(--ls-d3); }}
  .ds-sec > p, .ds-note {{ margin: 0; max-width: 68ch; color: var(--ink-2); font-size: var(--t-body); line-height: var(--lh-body); }}
  .ds-h {{ margin: var(--s-5) 0 0; font-size: var(--t-label); font-weight: var(--w-label); letter-spacing: var(--ls-label); text-transform: uppercase; color: var(--mute); }}
  .ds-swatches {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--s-5); margin: 0; padding: 0; list-style: none; }}
  .ds-swatches li {{ display: grid; gap: var(--s-1); font-size: var(--t-body-sm); line-height: var(--lh-body-sm); }}
  .ds-chip {{ height: 88px; border-radius: var(--r-media); border: 1px solid var(--rule); margin-bottom: var(--s-2); }}
  .ds-hex, .ds-ratio {{ color: var(--mute); font-variant-numeric: tabular-nums; }}
  .ds-role {{ color: var(--ink-2); }}
  code {{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; color: var(--ink); }}
  .ds-type {{ display: grid; grid-template-columns: minmax(0, 260px) minmax(0, 1fr); gap: var(--s-6); align-items: baseline; padding: var(--s-5) 0; border-top: 1px solid var(--rule); }}
  .ds-type__meta {{ display: grid; gap: var(--s-1); font-size: var(--t-body-sm); color: var(--mute); }}
  .ds-type__meta b {{ color: var(--ink); }}
  .ds-type__sample {{ margin: 0; text-wrap: balance; }}
  .ds-space {{ display: grid; gap: var(--s-3); margin: 0; padding: 0; list-style: none; }}
  .ds-space li {{ display: grid; grid-template-columns: 72px minmax(0, 1fr) 64px; gap: var(--s-4); align-items: center; }}
  .ds-bar {{ display: block; height: 12px; background: var(--ink-2); border-radius: 2px; max-width: 100%; }}
  .ds-px {{ color: var(--mute); font-size: var(--t-body-sm); font-variant-numeric: tabular-nums; }}
  .ds-table {{ width: 100%; border-collapse: collapse; font-size: var(--t-body-sm); }}
  .ds-table th, .ds-table td {{ text-align: left; padding: var(--s-3) var(--s-4) var(--s-3) 0; border-top: 1px solid var(--rule); vertical-align: top; }}
  .ds-table th {{ color: var(--mute); font-weight: var(--w-label); }}
  .ds-stage {{ position: relative; padding: var(--s-7) var(--s-6); background: var(--ground-2); border: 1px solid var(--rule); border-radius: var(--r-media); }}
  .ds-stage.ds-stage--flush {{ padding: 0; overflow: hidden; }}
  .ds-row {{ display: flex; flex-wrap: wrap; gap: var(--s-5); align-items: center; }}
  .ds-cap {{ margin: var(--s-3) 0 0; color: var(--mute); font-size: var(--t-caption); line-height: var(--lh-caption); }}
  .ds-grid2 {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--s-6); }}
  .ds-rules {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--s-5); margin: 0; padding: 0; list-style: none; }}
  .ds-rules li {{ padding: var(--s-5); border: 1px solid var(--rule); border-radius: var(--r-media); display: grid; gap: var(--s-2); }}
  .ds-rules b {{ font-size: var(--t-label); letter-spacing: var(--ls-label); text-transform: uppercase; }}
  .ds-rules .do b {{ color: var(--ink); }} .ds-rules .dont b {{ color: var(--gt-red); }}
  .ds-rules p {{ margin: 0; color: var(--ink-2); font-size: var(--t-body-sm); line-height: var(--lh-body-sm); }}
  /* components shown in place: the fixed header and the stage-wide blocks are put back in the flow */
  .ds-stage .nav {{ position: relative; inset: auto; }}
  .ds-stage .foot {{ border-top: 0; }}
  .ds-cards {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 300px)); gap: var(--s-5); margin: 0; padding: 0; list-style: none; }}
  .ds-stage .enquiry {{ grid-column: auto; }}
  @media (max-width: 699px) {{ .ds-type {{ grid-template-columns: 1fr; gap: var(--s-3); }} .ds-stage {{ padding: var(--s-6) var(--s-4); }} }}
</style>
</head>
<body>
<main class="ds">

<header class="ds-top">
  <p class="eyebrow">Design system · v3</p>
  <h1>Lake Forest Motor Sports<span>by Mancuso</span></h1>
  <p class="ds-note">The values and components the v3 site is built from. Every component below is copied from the
  built pages in <code>../site/</code> and drawn by the site’s own stylesheet, so this page is the reference.
  Tokens: <a href="tokens.css">tokens.css</a> · <a href="tokens.json">tokens.json</a>.</p>
  <ul class="ds-index">
    <li><a href="#principles">Principles</a></li><li><a href="#colour">Colour</a></li><li><a href="#type">Type</a></li>
    <li><a href="#space">Space &amp; layout</a></li><li><a href="#shape">Shape &amp; motion</a></li><li><a href="#brand">Brand</a></li>
    <li><a href="#components">Components</a></li><li><a href="#rules">Rules</a></li>
  </ul>
</header>

<section class="ds-sec" id="principles">
  <h2>Principles</h2>
  <ul class="ds-rules">
    <li><b>Ink on graphite</b><p>The interface has no brand hue. Text is warm off-white on near-black; the only accent is the GT tricolour flag.</p></li>
    <li><b>History is the trust</b><p>Real photographs at natural brightness, with their printed credits. Facts carry their source on the page.</p></li>
    <li><b>One face, two voices</b><p>Archivo throughout: a condensed display voice (640, wdth 74) for titles and the normal text voice (wdth 100) for reading.</p></li>
    <li><b>Phones get their own layout</b><p>Below 700px the hero, the GT block and Le Mans are re-composed, not squeezed: the picture first, the words below it.</p></li>
  </ul>
</section>

<section class="ds-sec" id="colour">
  <h2>Colour</h2>
  <p>Contrast ratios are WCAG 2.x against <code>--ground</code>. Everything set as text clears AA (4.5:1); <code>--lm-blue</code> is used for large type only.</p>
  {swatches()}
</section>

<section class="ds-sec" id="type">
  <h2>Type</h2>
  <p>Archivo variable (wdth 62–125, wght 100–900) from Google Fonts; Cinzel only for the wordmark. Each role sets its own size,
  leading and tracking — set a role, never a size by hand. Display sizes are fluid between their <code>clamp()</code> limits.</p>
  {type_rows()}
</section>

<section class="ds-sec" id="space">
  <h2>Space &amp; layout</h2>
  <p>One 4-based scale. Inside a group the gap is smaller than between groups: a label sits <code>--s-3</code> from its title, a block <code>--s-9</code> from the next.</p>
  <ul class="ds-space">{space_rows()}</ul>
  <h3 class="ds-h">Layout</h3>
  <table class="ds-table">
    <tr><th>Token</th><th>Value</th><th>Use</th></tr>
    <tr><td><code>--gutter</code></td><td>clamp(16px, 3.4vw, 48px)</td><td>Page side margin</td></tr>
    <tr><td><code>--col</code></td><td>(100vw − 2 × gutter) / 12</td><td>One column of the 12-column grid; content usually starts half a column in</td></tr>
    <tr><td><code>--header-h</code></td><td>80px · 72px below 900px</td><td>Fixed header; anchors offset by 96px</td></tr>
  </table>
  <h3 class="ds-h">Breakpoints</h3>
  <table class="ds-table">
    <tr><th>Width</th><th>What changes</th></tr>
    <tr><td>≤ 999px</td><td>One column; the history rail, the pinned stops and the side-by-side spreads are off</td></tr>
    <tr><td>≤ 899px</td><td>The phone menu replaces the header links</td></tr>
    <tr><td>≤ 699px</td><td>Own layouts: hero film on top with the words below, the GT block as a still 9:16 frame, Le Mans as a photo and a fact list</td></tr>
    <tr><td>≤ 599px</td><td>Small-phone adjustments: buttons and links stack only where they must</td></tr>
  </table>
</section>

<section class="ds-sec" id="shape">
  <h2>Shape &amp; motion</h2>
  <table class="ds-table">
    <tr><th>Token</th><th>Value</th><th>Use</th></tr>
    <tr><td><code>--r-media</code></td><td>14px</td><td>Photographs in frames, panels, tiles, the form</td></tr>
    <tr><td><code>--r-pill</code></td><td>999px</td><td>Buttons and chips</td></tr>
    <tr><td><code>--ease-out</code></td><td>cubic-bezier(.16, 1, .3, 1)</td><td>All arrivals</td></tr>
    <tr><td><code>--d-fast</code></td><td>.25s</td><td>Hover: colour, border</td></tr>
    <tr><td><code>--d-base</code></td><td>.4s</td><td>State changes, fades</td></tr>
    <tr><td><code>--d-arrive</code></td><td>1.4s</td><td>Section heads and items sliding in (GSAP)</td></tr>
  </table>
  <p>Motion is GSAP 3.15 + ScrollTrigger on Lenis 1.3.26 smooth scroll, one ticker. Under <code>prefers-reduced-motion: reduce</code>
  Lenis is not created, nothing pins and every element stands in its final place.</p>
</section>

<section class="ds-sec" id="brand">
  <h2>Brand</h2>
  <div class="ds-grid2">
    <div class="ds-stage"><img src="../site/assets/brand/crest-full.png" width="196" alt="The Mancuso family crest"><p class="ds-cap">Family crest, full — footer. <code>assets/brand/crest-full.png</code></p></div>
    <div class="ds-stage"><img src="../site/assets/brand/crest-mark.png" width="80" alt="The crest mark"><p class="ds-cap">Crest mark — header. <code>assets/brand/crest-mark.png</code></p></div>
    <div class="ds-stage"><img src="../site/assets/brand/gt-mark.png" width="280" alt="The GT mark"><p class="ds-cap">The GT mark. <code>assets/brand/gt-mark.png</code></p></div>
    <div class="ds-stage"><p class="eyebrow">The family story</p><p class="ds-cap">The tricolour flag: 36×8px, red · white · blue, before a section label. Its only use.</p></div>
  </div>
</section>

<section class="ds-sec" id="components">
  <h2>Components</h2>

  <h3 class="ds-h">Header</h3>
  <div class="ds-stage ds-stage--flush">{C['header']}</div>
  <p class="ds-note">Fixed, 80px, transparent over the hero and solid once the page scrolls, shown here in that scrolled state. At the top
  of the page the logo stands 1.7× larger over the hero and settles to this size on scroll. Below 900px the links become a Menu button
  that opens every page full-screen (<code>js/menu.js</code>).</p>

  <h3 class="ds-h">Buttons and links</h3>
  <div class="ds-stage"><div class="ds-row">
    <a class="pill pill--fill" href="#components">Discover the GT</a>
    <a class="pill pill--line" href="#components">Ask about the GT</a>
    <a class="hero__film" href="#components"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5v13L18.5 12z"/></svg>Watch the 1977 film</a>
  </div><p class="ds-cap"><code>.pill.pill--fill</code> one primary action per block · <code>.pill.pill--line</code> secondary · text link with an icon for media.</p></div>

  <h3 class="ds-h">Section head</h3>
  <div class="ds-stage">
    <p class="eyebrow">The Lake Forest years</p>
    <h2 class="heading">Dealers and racers<span class="tone">Lake Forest Sports Cars, and father and son</span></h2>
    <p class="ds-cap">Label with the flag, then a two-tone title: a continuation of the sentence stays the title’s size in <code>--tone</code>.</p>
  </div>

  <h3 class="ds-h">Chapter card</h3>
  <div class="ds-stage"><ul class="ds-cards">{C['card']}{C['card_next']}</ul></div>

  <h3 class="ds-h">Generations</h3>
  <div class="ds-stage">{C['gens']}</div>

  <h3 class="ds-h">Photograph with caption</h3>
  <div class="ds-stage"><div style="max-width:560px">{C['era']}</div></div>

  <h3 class="ds-h">Contact record</h3>
  <div class="ds-stage"><div style="max-width:520px">{C['record']}</div></div>

  <h3 class="ds-h">Enquiry form</h3>
  <div class="ds-stage"><div style="max-width:720px">{C['form']}</div>
  <p class="ds-cap">Validation and states are live (<code>js/form.js</code>); the form does not send yet. Errors appear in reserved space, so nothing moves.</p></div>

  <h3 class="ds-h">Audio player and episode list</h3>
  <div class="ds-stage"><div style="max-width:620px;display:grid;gap:var(--s-5)">{C['player']}{C['eplist']}</div></div>

  <h3 class="ds-h">Footer</h3>
  <div class="ds-stage ds-stage--flush">{C['foot']}</div>
</section>

<section class="ds-sec" id="rules">
  <h2>Rules</h2>
  <ul class="ds-rules">
    <li class="do"><b>Do</b><p>Use a type role from the scale; let each role carry its own leading and tracking.</p></li>
    <li class="do"><b>Do</b><p>Keep photographs at natural brightness, uncropped where the subject would be cut, with their credits.</p></li>
    <li class="do"><b>Do</b><p>Give every animation a still state that reads on its own (reduced motion, no script).</p></li>
    <li class="do"><b>Do</b><p>One primary button per block; the second action is a line button or a text link.</p></li>
    <li class="dont"><b>Don’t</b><p>Set functional text below 14px, or long reading text in the display voice.</p></li>
    <li class="dont"><b>Don’t</b><p>Use the tricolour anywhere but the label flag, or add a new hue to the interface.</p></li>
    <li class="dont"><b>Don’t</b><p>Put words over a car on a phone: the picture goes first, the words below it.</p></li>
    <li class="dont"><b>Don’t</b><p>Add a fact without a source.</p></li>
  </ul>
</section>

</main>
<script src="../site/js/form.js"></script>
<script src="../site/js/player.js"></script>
</body>
</html>
'''

open(OUT, 'w', encoding='utf-8').write(PAGE)
print('wrote', os.path.relpath(OUT, ROOT))
