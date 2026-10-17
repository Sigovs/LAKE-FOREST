"""Build web derivatives from `lake photos/` into `assets/img/`.

Originals are only read, never written. Archive frames smaller than the
target are re-encoded at their native size — never upscaled.

Run: PYTHONPATH=<site-packages with Pillow> python3 -E tools/prepare-images.py [output names…]
With output names, only those derivatives are rebuilt.
"""
import sys
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'lake photos')
OUT = os.path.join(ROOT, 'assets', 'img')

# (source file, output name, max width, optional crop box as fractions l,t,r,b)
JOBS = [
    ('11.1-1-1976-Le-Mans-Greenwood-in-Front-of-Keyser-Oursler Adam.jpg', 'hero-lemans-1976-2400.jpg', 2400, None),
    ('11.1-1-1976-Le-Mans-Greenwood-in-Front-of-Keyser-Oursler Adam.jpg', 'hero-lemans-1976-1400.jpg', 1400, None),
    # D3 fix1: the film scan at its native width, for viewports wider than 2400 (never upscaled)
    ('11.1-1-1976-Le-Mans-Greenwood-in-Front-of-Keyser-Oursler Adam.jpg', 'hero-lemans-1976-native.jpg', 4000, None),
    # Portrait frame authored for phones: the Corvette with the asphalt below it.
    ('11.1-1-1976-Le-Mans-Greenwood-in-Front-of-Keyser-Oursler Adam.jpg', 'hero-lemans-1976-mobile.jpg', 1100, (0.50, 0.16, 0.89, 1.0)),
    ('Mancuso Adam.jpg', 'mancuso-chevrolet-letter.jpg', 2000, None),
    ('Mancuso Chevy Adam.jpg', 'mancuso-chevrolet-sign.jpg', 2000, ('inset', 4)),   # D3 fix1: 4 px off every edge removes the dark scan tick at the top-right corner
    ('76LeMansElji4 Adam.jpg', 'lemans-1976-pits.jpg', 2000, None),
    ('76LeMansaboveright Adam.jpg', 'lemans-1976-above.jpg', 2000, None),
    ('1976-1976-mans_76_chevrolet-corvette_ab_150a-big Adam.jpg', 'lemans-1976-nose.jpg', 2000, None),
    ('76LeMansBWsmokingfront Adam.jpg', 'lemans-1976-smoke-front.jpg', 2000, None),
    ('76LeMansBWsmokingrear Adam.jpg', 'lemans-1976-smoke-rear.jpg', 2000, None),
    ('76LeMansnewspaper Adam.jpg', 'lemans-1976-le-maine.jpg', 2000, None),
    ('RM 76 Adam.jpg', 'mancuso-76-blue.jpg', 2048, None),
    ('RM 76 Adam.jpg', 'mancuso-76-blue-1200.jpg', 1200, None),
    ('76Mancusowindshield Adam.jpg', 'mancuso-76-windshield.jpg', 2000, None),
    ('76SebringMancusoleft Adam.jpg', 'mancuso-76-sebring.jpg', 2000, None),
    ('coverVVMay77 Adam.jpg', 'vette-vues-may-1977.jpg', 2000, None),
    # Sketches (Hero → History, two directions)
    ('Mancuso truck Adam.jpg', 'mancuso-truck.jpg', 2048, None),
    ('RM 76 Adam.jpg', 'mancuso-76-blue-wide.jpg', 2048, (0.0, 0.25, 1.0, 0.9375)),   # 2048×1056, car whole
    ('Deuce1 Adam.jpg', 'yenko-deuce-ad.jpg', 2000, None),
    ('76Mancusoingarage Adam.jpg', 'crew-garage.jpg', 2000, None),
    ('76Mancusopitsrtfrt Adam.jpg', 'crew-x.jpg', 2000, None),
    ('76MancusoleftfrtFyhrie Adam.jpg', 'crew-kodak.jpg', 2000, None),
    ('76Mancusoinpits Adam.jpg', 'crew-pitwall.jpg', 2000, None),
    ('76MAncusorightcrowd Adam.jpg', 'crowd-76.jpg', 2000, None),
    ('s-l1600 Adam.jpg', 'revell-76-panel.jpg', 2000, None),
    # Sketch D — later eras
    ('Grattan 88 328 Adam.jpg', 'ferrari-328-grattan.jpg', 2000, None),
    ('Grattan 88 328 Ken Smith Adam.jpg', 'ferrari-328-grattan-front.jpg', 2000, None),
    ('100_0104 Adam.JPG', 'lola-tents.jpg', 2000, None),
    ('DSC03059 Adam.JPG', 'aston-007.jpg', 1600, None),
    ('DSC03479 Adam.JPG', 'aston-009-rear.jpg', 1600, None),
    # Sketch D2 — the tents wide shot never shows above 0.72 of 2000 at 1440 (downscale only;
    # the 2000w file stays for viewports wider than 1440).
    ('100_0104 Adam.JPG', 'lola-tents-1440.jpg', 1440, None),
    # Sketch D3 — sharpness-led derivatives (docs/d3-key-scenes.md §2.4, §7)
    ('76_mancuso-fyhrie_credit_tonymezzacca Adam.jpg', 'mancuso-76-mezzacca.jpg', 900, None),  # native, the #76 master
    ('Mancuso truck Adam.jpg', 'mancuso-truck-400.jpg', 400, None),   # upscaled scan: 400 is its honest ceiling
    ('DSC03090 Adam.JPG', 'aston-009-007.jpg', 2000, None),           # Aston Martin #009 + #007, showroom
]

# Images embedded in the Lola PDFs: (pdf, page index, output, max width[, crop l,t,r,b])
PDF_JOBS = [
    ("Lola's Adam.pdf", 8, 'lola-paddock-trailer.jpg', 2400),   # LAKE FOREST SPORTSCARS trailer, #9
    ("Lola's Adam.pdf", 8, 'lola-paddock-trailer-native.jpg', 4000),   # D3 fix1: native 3008 for viewports > 2400
    ("Lola's Adam.pdf", 3, 'lola-crest-nose.jpg', 1600),        # family crest on the nose
    ("Lola's Adam.pdf", 5, 'lola-paddock-1.jpg', 1600),
    ("LFSC Lola's (2) Adam.pdf", 13, 'lola-on-track.jpg', 1024),
    # Sketch D2 — square crest close for the S5 abutting row; 832 px native so the row can
    # run to 1920 wide (needs 475) without upscaling. No credit band in the crop.
    ("Lola's Adam.pdf", 3, 'lola-crest-square.jpg', 832, (0.275, 0.1583, 0.6, 0.5917)),
    # Sketch D3 — authored portrait crop of the trailer frame for phones, native pixels (902×1460)
    ("Lola's Adam.pdf", 8, 'lola-trailer-mobile.jpg', 1460, (0.255, 0.06, 0.555, 0.79)),
]

ONLY = set(sys.argv[1:])

for src, out, max_w, crop in JOBS:
    if ONLY and out not in ONLY:
        continue
    im = Image.open(os.path.join(SRC, src)).convert('RGB')
    if crop and crop[0] == 'inset':          # a pixel inset on every edge (scan borders)
        n = crop[1]
        im = im.crop((n, n, im.width - n, im.height - n))
    elif crop:
        w, h = im.size
        im = im.crop((int(w * crop[0]), int(h * crop[1]), int(w * crop[2]), int(h * crop[3])))
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, out), 'JPEG', quality=84, optimize=True, progressive=True)
    print(f'{out:34s} {im.width}x{im.height}')

import io
try:
    import fitz
except ImportError:
    fitz = None
if fitz:
    for pdf, page, out, max_w, *crop in PDF_JOBS:
        if ONLY and out not in ONLY:
            continue
        doc = fitz.open(os.path.join(SRC, pdf))
        xref = doc[page].get_images(full=True)[0][0]
        im = Image.open(io.BytesIO(doc.extract_image(xref)['image'])).convert('RGB')
        if crop:
            w, h = im.size
            c = crop[0]
            im = im.crop((int(w * c[0]), int(h * c[1]), int(w * c[2]), int(h * c[3])))
        if im.width > max_w:
            im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
        im.save(os.path.join(OUT, out), 'JPEG', quality=84, optimize=True, progressive=True)
        print(f'{out:34s} {im.width}x{im.height}  (from {pdf} p{page + 1})')
