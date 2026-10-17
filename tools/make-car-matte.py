"""Derive an alpha matte of the lead Corvette from the hero photographs (GrabCut),
seeded by the hand-traced outline. Output: a PNG whose alpha channel is the matte, same aspect as the
photo, used as CSS mask-image on the hero car layer. Reads assets/img only.

Run: python3 tools/make-car-matte.py
"""
import os, cv2, numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'assets', 'img')

JOBS = [  # (photo, output, seed polygon in % of the frame)
    ('hero-lemans-1976-2400.jpg', 'hero-car-matte.png',
     [(63.000,54.941),(65.250,54.692),(65.500,53.822),(66.458,53.325),(72.917,53.139),(74.875,53.822),(75.917,54.630),(79.500,54.630),(79.833,55.749),(80.250,58.111),(80.625,60.597),(80.833,63.393),(80.750,67.122),(80.625,69.733),(79.167,70.106),(78.125,70.976),(60.417,70.976),(60.083,69.608),(60.000,64.326),(60.208,61.218),(61.000,59.789),(61.083,58.421),(61.750,56.246),(62.500,55.314)]),
    ('hero-lemans-1976-mobile.jpg', 'hero-car-matte-mobile.png',
     [(33.333,46.360),(39.103,46.064),(39.744,45.028),(42.201,44.436),(58.761,44.214),(63.782,45.028),(66.453,45.990),(75.641,45.990),(76.496,47.322),(77.564,50.133),(78.526,53.093),(79.060,56.422),(78.846,60.861),(78.526,63.969),(74.786,64.413),(72.115,65.448),(26.709,65.448),(25.855,63.821),(25.641,57.532),(26.175,53.832),(28.205,52.131),(28.419,50.503),(30.128,47.914),(32.051,46.804)]),
]

for src, out, poly in JOBS:
    img = cv2.imread(os.path.join(IMG, src))
    h, w = img.shape[:2]
    pts = np.array([[x * w / 100, y * h / 100] for x, y in poly], np.int32)
    seed = np.zeros((h, w), np.uint8); cv2.fillPoly(seed, [pts], 1)
    k = max(3, w // 160)
    inner = cv2.erode(seed, np.ones((k, k), np.uint8), iterations=2)
    outer = cv2.dilate(seed, np.ones((k, k), np.uint8), iterations=3)
    mask = np.full((h, w), cv2.GC_BGD, np.uint8)
    mask[outer == 1] = cv2.GC_PR_BGD
    mask[seed == 1] = cv2.GC_PR_FGD
    mask[inner == 1] = cv2.GC_FGD
    x, y, bw, bh = cv2.boundingRect(outer)
    pad = k * 4
    x0, y0 = max(0, x - pad), max(0, y - pad); x1, y1 = min(w, x + bw + pad), min(h, y + bh + pad)
    sub = mask[y0:y1, x0:x1].copy()
    bg, fg = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
    cv2.grabCut(img[y0:y1, x0:x1], sub, None, bg, fg, 6, cv2.GC_INIT_WITH_MASK)
    car = np.where((sub == cv2.GC_FGD) | (sub == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
    # keep the largest component, close small holes, feather the edge by ~1px at display size
    n, lab, stats, _ = cv2.connectedComponentsWithStats(car)
    if n > 1:
        car = np.where(lab == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA]), 255, 0).astype(np.uint8)
    car = cv2.morphologyEx(car, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    full = np.zeros((h, w), np.uint8); full[y0:y1, x0:x1] = car
    full = cv2.GaussianBlur(full, (0, 0), 1.2)
    # CSS masks read alpha by default: ship white with the matte as its alpha channel
    rgba = np.dstack([np.full_like(full, 255)] * 3 + [full])
    cv2.imwrite(os.path.join(IMG, out), rgba, [cv2.IMWRITE_PNG_COMPRESSION, 9])
    print(out, w, h, 'fg px', int((full > 127).sum()), 'seed px', int(seed.sum()))
