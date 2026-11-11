"""Build the gallery's web images and its list markup from tools/gallery-data.json.

Two files per photograph in assets/img/gallery/:
  <slug>-960.jpg   the grid tile, fitted inside 960 x 720 (sharp at 2x for the tallest row)
  <slug>-1600.jpg  the enlarged view, fitted inside 1600 x 1600
A photograph smaller than the box keeps its own size (never upscaled); when it already fits the tile box,
only the tile is written and the enlarged view uses it too.
Every file is turned upright from its EXIF orientation, converted to sRGB, and saved with NO metadata:
the phone photographs carry GPS coordinates, and the collection's address must not ship with them.

Run: python -I tools/prepare-gallery.py <folder with the client's originals>
Writes the images, and prints the <li> markup for gallery_v3.html to tools/gallery-markup.html.
"""
import io
import json
import os
import sys
from html import escape
from PIL import Image, ImageCms, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'img', 'gallery')
DATA = os.path.join(ROOT, 'tools', 'gallery-data.json')
TILE, FULL = (960, 720), (1600, 1600)
SRGB = ImageCms.createProfile('sRGB')


def load(path):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    icc = im.info.get('icc_profile')
    if im.mode not in ('RGB', 'L'):
        im = im.convert('RGB')
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            im = ImageCms.profileToProfile(im, src, SRGB, outputMode='RGB')
        except Exception:
            pass
    return im.convert('RGB')


def fit(im, box):
    w, h = im.size
    k = min(box[0] / w, box[1] / h, 1.0)
    return im if k == 1.0 else im.resize((round(w * k), round(h * k)), Image.LANCZOS)


def save(im, name, q):
    path = os.path.join(OUT, name)
    im.save(path, 'JPEG', quality=q, optimize=True, progressive=True, subsampling='4:2:0')
    return os.path.getsize(path)


def main(src_dir):
    os.makedirs(OUT, exist_ok=True)
    data = json.load(open(DATA, encoding='utf-8'))
    rows, total_tile, total_full = [], 0, 0
    for i, p in enumerate(data['photos']):
        im = load(os.path.join(src_dir, p['src']))
        tile = fit(im, TILE)
        total_tile += save(tile, f"{p['slug']}-960.jpg", 78)
        if tile.size == im.size:
            full_name, full = f"{p['slug']}-960.jpg", tile
        else:
            full = fit(im, FULL)
            full_name = f"{p['slug']}-1600.jpg"
            total_full += save(full, full_name, 80)
        r = round(tile.width / tile.height, 4)
        lazy = '' if i < 3 else ' loading="lazy"'
        rows.append(
            f'      <li class="gx__item" id="photo-{p["slug"]}" data-cat="{p["cat"]}" style="--r: {r}">\n'
            f'        <figure>\n'
            f'          <a class="gx__open" href="assets/img/gallery/{full_name}" data-w="{full.width}" data-h="{full.height}">'
            f'<img src="assets/img/gallery/{p["slug"]}-960.jpg" width="{tile.width}" height="{tile.height}"{lazy} decoding="async" alt="{escape(p["alt"])}"></a>\n'
            f'          <figcaption class="caption">{escape(p["caption"], quote=False)}</figcaption>\n'
            f'        </figure>\n'
            f'      </li>')
        print(f"{p['slug']:32} {im.size[0]:>5}x{im.size[1]:<5} tile {tile.width}x{tile.height}  full {full.width}x{full.height}")
    open(os.path.join(ROOT, 'tools', 'gallery-markup.html'), 'w', encoding='utf-8').write('\n'.join(rows) + '\n')
    print(f'tiles {total_tile // 1024} KB · enlarged {total_full // 1024} KB · {len(rows)} photographs')


if __name__ == '__main__':
    main(sys.argv[1])
