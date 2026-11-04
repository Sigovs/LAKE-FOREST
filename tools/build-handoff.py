#!/usr/bin/env python3
"""Build the developer handoff of the v3 site into ./handoff/site.

The v3 pages live at the project root under their working names (index_v3.html, styles-v3.css, ...) next to the
v1 and v2 files. This script copies only what the six v3 pages actually use into a clean tree, renames the pages,
the stylesheet and the scripts to plain names, sorts the assets into brand / img / video, and rewrites every
reference to match. Run it again after any change to the v3 pages:

    python3 tools/build-handoff.py
"""
import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'handoff', 'site')

PAGES = {
    'index_v3.html': 'index.html',
    'family_v3.html': 'family.html',
    'history_v3.html': 'history.html',
    'gt_v3.html': 'gt.html',
    'rpm_v3.html': 'rpm.html',
    'contact_v3.html': 'contact.html',
}
CODE = {
    'styles-v3.css': 'css/styles.css',
    'history.css': 'css/history.css',
    'motion.js': 'js/motion.js',
    'gt.js': 'js/gt.js',
    'history.js': 'js/history.js',
    'inner_v3.js': 'js/inner.js',
    'menu_v3.js': 'js/menu.js',
    'micro.js': 'js/micro.js',
    'player.js': 'js/player.js',
    'form.js': 'js/form.js',
    'zoom.js': 'js/zoom.js',
    'zoom-history.js': 'js/zoom-history.js',
}
BRAND = {'crest-full.png', 'crest-mark.png', 'gt-mark.png'}
# referenced from CSS only, so the HTML scan does not see them
CSS_ASSETS = {'assets/img/final/hero-1977-poster.jpg', 'assets/img/final/rpm-glow.svg'}


def asset_target(path):
    name = os.path.basename(path)
    if name.endswith('.mp4'):
        return 'assets/video/' + name
    if name in BRAND:
        return 'assets/brand/' + name
    return 'assets/img/' + name


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)

    used = set(CSS_ASSETS)
    html = {}
    for src in PAGES:
        s = open(os.path.join(ROOT, src), encoding='utf-8').read()
        html[src] = s
        for m in re.finditer(r'(?:src|href|poster)="([^"#]+)"', s):
            used.add(m.group(1).split('?')[0])
        for m in re.finditer(r'srcset="([^"]+)"', s):
            for part in m.group(1).split(','):
                used.add(part.strip().split(' ')[0].split('?')[0])
    assets = sorted(u for u in used if u.startswith('assets/'))

    moves = {a: asset_target(a) for a in assets}
    for a, t in moves.items():
        src = os.path.join(ROOT, a)
        if not os.path.isfile(src):
            raise SystemExit('missing asset: ' + a)
        os.makedirs(os.path.join(OUT, os.path.dirname(t)), exist_ok=True)
        shutil.copy2(src, os.path.join(OUT, t))

    # longest paths first, so assets/img/final/x is rewritten before assets/img/x could match it
    order = sorted(moves, key=len, reverse=True)

    def rewrite(text, prefix=''):
        for a in order:
            text = text.replace(a, prefix + moves[a])
        return text

    for src, dst in PAGES.items():
        s = html[src]
        for a, b in PAGES.items():
            s = s.replace(a, b)
        for a, b in CODE.items():
            s = re.sub(r'(["\'])' + re.escape(a) + r'(\?[^"\']*)?\1', lambda m: m.group(1) + b + (m.group(2) or '') + m.group(1), s)
        s = rewrite(s)
        open(os.path.join(OUT, dst), 'w', encoding='utf-8').write(s)

    for src, dst in CODE.items():
        s = open(os.path.join(ROOT, src), encoding='utf-8').read()
        if dst.endswith('.css'):
            s = rewrite(s, '../')   # css/ sits one level down from the assets
        for a, b in PAGES.items():
            s = s.replace(a, b)
        os.makedirs(os.path.join(OUT, os.path.dirname(dst)), exist_ok=True)
        open(os.path.join(OUT, dst), 'w', encoding='utf-8').write(s)

    print('pages', len(PAGES), '· code', len(CODE), '· assets', len(assets), '→', os.path.relpath(OUT, ROOT))


if __name__ == '__main__':
    main()
