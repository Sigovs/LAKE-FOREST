#!/usr/bin/env python3
"""Write handoff/docs/ASSETS.md: every image and video the v3 site ships, with its size, the pages that use it,
and where it came from. Run after tools/build-handoff.py."""
import glob
import os
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'handoff', 'site')
OUT = os.path.join(ROOT, 'handoff', 'docs', 'ASSETS.md')

FAMILY = 'Family archive (supplied by the client)'
GT_FRAME = 'GT “coming soon” frame'
ORIGIN = {
    'crest-full.png': 'Family crest, from the client’s logo files',
    'crest-mark.png': 'Family crest mark, from the client’s logo files',
    'gt-mark.png': 'The GT mark, from the family’s film “Introducing the GT”',
    'aston-009-007.jpg': FAMILY + ': Aston Martin #009 and #007',
    'autoweek-2005.jpg': 'AutoWeek, 14 March 2005 (press clipping, family archive)',
    'blue-76.webp': FAMILY + ': the #76, cut out from the photograph',
    'bw3.jpg': 'Le Mans 1976, pit lane — photo courtesy of Albert Lamberts',
    'father-son-car.jpg': FAMILY,
    'father-son-garage.jpg': FAMILY + ': Adam and Rick Mancuso',
    'father-son-garage-1200.jpg': FAMILY + ': Adam and Rick Mancuso (1200px copy)',
    'fra-noi-2005.jpg': 'Fra Noi, February 2005 (press clipping, family archive)',
    'gt-c2-mancuso-37.jpg': FAMILY + ': the #37 Mancuso Chevrolet C2, restored',
    'gt-c3-greenwood.jpg': FAMILY + ': a Greenwood C3, restored',
    'gt-coming-soon.jpg': GT_FRAME + ' (No. 48 and 441, GT mark)',
    'gt-coming-soon-1280.jpg': GT_FRAME + ' (1280px copy)',
    'gt-coming-soon-2.jpg': GT_FRAME + ' (warehouse frame, homepage GT block)',
    'gt-coming-soon-2-1280.jpg': GT_FRAME + ' (1280px copy)',
    'gt-coming-soon-phone.jpg': GT_FRAME + ' (9:16 phone frame)',
    'gt-coming-soon-phone-720.jpg': GT_FRAME + ' (720px copy)',
    'gt-sketch-c2.png': 'Drawing from the family’s film “Introducing the GT”',
    'gt-sketch-c3.png': 'Drawing from the family’s film “Introducing the GT”',
    'hero-1977-poster.jpg': 'Still from Buzz Fyhrie’s 1977 Road America film (family-approved)',
    'hero-lemans-1976-2400.jpg': 'Le Mans 1976 archive photograph (history page hero)',
    'hero-lemans-1976-mobile.jpg': 'Le Mans 1976 archive photograph, phone crop',
    'hero-v3-poster.jpg': 'First frame of the hero film',
    'hotwheels-76.png': 'Hot Wheels “’76 Greenwood Corvette”, product photograph',
    'le-maine-1976.jpg': 'Le Maine Libre, 12–13 June 1976 (newspaper, family archive)',
    'lemans-1976-nose.jpg': 'Le Mans 1976 archive photograph',
    'lemans-76-poster.jpg': 'First frame of the Le Mans clip',
    'lemans-hour8-2.jpg': 'Le Mans 1976, hour 8 — photo courtesy of Jean-Louis Pene',
    'lfsc-showroom.jpg': FAMILY + ': the Lake Forest Sportscars showroom',
    'lfsc-store.jpg': 'The store, after the drawing on Rick’s 2000 newsletter',
    'lola-paddock-1.jpg': FAMILY + ': the Lake Forest Sportscars Lola in the paddock',
    'lola-rick-mancuso.jpg': FAMILY + ': Lola #4, “Rick Mancuso”',
    'mancuso-76-blue.jpg': FAMILY + ': the #76 at the pit wall',
    'mancuso-chevrolet-sign.jpg': FAMILY + ': the Mancuso Chevrolet sign',
    'mancuso-truck.jpg': FAMILY + ': the Mancuso Chevrolet transporter',
    'rick-letter.jpg': FAMILY + ': a letter on the dealership’s paper, signed by Rick',
    'rpm-glow.svg': 'Drawn light shape behind the RPM hosts (from the Figma file)',
    'rpm-studio.jpg': 'RPM Club: Rob and Rick Mancuso in the studio, from the show’s own website (rpmclub.com, rpm-studio-mobile.jpg), as published',
    'skokie-sign.jpg': FAMILY + ': the “OK Used Cars — Mancuso Chevrolet” roadside sign',
    'spirit-today-center.jpg': 'The Spirit of Le Mans 76 Corvette today',
    'yenko-deuce.jpg': FAMILY + ': a Yenko “Deuce” flyer stamped by the dealership',
    'hero-v3.mp4': '0–10 s the No. 48 → 441 film (black and white for the first 1.6 s, in full colour from 2.1 s), then 30 s of Buzz Fyhrie’s 1977 Road America film',
    'hero-v3-mobile.mp4': 'Phone copy of hero-v3.mp4 (720px)',
    'lemans-76.mp4': 'The 1976 Le Mans photograph by Albert Lamberts, animated; number shown as 76. All-intra encode for scroll scrubbing',
}


def dims(path):
    if path.endswith('.mp4'):
        out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', path],
                             capture_output=True, text=True).stdout.split()
        return out[0] if out else ''
    if path.endswith('.svg'):
        return 'vector'
    out = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', path], capture_output=True, text=True).stdout
    w = h = ''
    for line in out.splitlines():
        if 'pixelWidth' in line:
            w = line.split()[-1]
        if 'pixelHeight' in line:
            h = line.split()[-1]
    return f'{w}×{h}'


pages = {p: open(p, encoding='utf-8').read() for p in glob.glob(os.path.join(SITE, '*.html')) + glob.glob(os.path.join(SITE, 'css', '*.css'))}
rows, missing = [], []
for path in sorted(glob.glob(os.path.join(SITE, 'assets', '*', '*'))):
    name = os.path.basename(path)
    rel = os.path.relpath(path, SITE)
    used = sorted({os.path.relpath(p, SITE) for p, t in pages.items() if name in t})
    kb = os.path.getsize(path) / 1024
    size = f'{kb / 1024:.1f} MB' if kb > 1024 else f'{kb:.0f} KB'
    origin = ORIGIN.get(name)
    if origin is None:
        missing.append(name)
        origin = 'not recorded'
    rows.append(f'| `{rel}` | {dims(path)} | {size} | {", ".join(used)} | {origin} |')

doc = f'''# Assets

Every image and video the site ships ({len(rows)} files), the pages that use it, and where it came from.
Credits printed on the pages stay with their photographs.

| File | Size (px) | Weight | Used on | Origin |
|---|---|---|---|---|
''' + '\n'.join(rows) + '''

The source originals (full-resolution files, the client’s folders) are not part of the site and are kept outside
this repository.
'''
open(OUT, 'w', encoding='utf-8').write(doc)
print('rows', len(rows), 'origin not recorded:', missing)
