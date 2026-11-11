"""Colour the No. 48 earlier in the hero film's concept clip, at its own speed, so the colour lasts longer before the morph.

The client (11 Nov 2026): "hold the color on the first 48 car for a little longer, then fade into the new car".
In the original the No. 48 is in full colour only from ~2.05 s to ~2.65 s; the morph into the black 441 starts right
after, and the frames before 1.62 s are pure black and white. A slow-motion hold was tried and rejected (Alex: the
slowing shows). Instead the colour of the first fully coloured frame (2.125 s, after the regrade-hero.py grade) is
carried back onto the black-and-white frames along the optical flow, so the shot keeps its own speed and timing:

  0-0.9 s black and white (as before) · 0.9-1.4 s the colour comes in (smoothstep) · from 1.4 s full colour ·
  ~2.65 s the morph, untouched · 10 s the 1977 film, untouched

Only chroma is carried; every frame keeps its own luma, so detail and light are the original's. The flow is taken in
short hops (each frame is warped from an anchor at most HOP frames later, the anchor already coloured), because one long
warp smears the trees. Same length, frame rate and 10 s point, so the page code does not change.

usage: python -I colour-hero.py <original.mp4> <out.mp4> <bitrate> <level> <workdir> [WxH]
The original is the delivered film before any re-grade:  git show f0985e9:assets/img/final/hero-v3.mp4 > orig.mp4
Pass WxH (e.g. 720x406) to build the phone copy from the desktop original's frames.
"""
import subprocess, sys, os, re
import numpy as np, cv2

src, out, rate, level, work = sys.argv[1:6]
size = sys.argv[6] if len(sys.argv) > 6 else None
FPS, CLIP_FRAMES, W, H = 24, 240, 1280, 720
T0, T1, CAP = 1.62, 2.12, 4.0                      # the grade of regrade-hero.py
REF, HOP = 51, 12                                  # first fully coloured frame (2.125 s); flow hop in frames
C0, C1 = 0.9, 1.4                                  # the colour comes in between these (s)
ff = ['ffmpeg', '-v', 'error', '-y']


def measure(path, t=3.5):
    res, cur = [], None
    txt = subprocess.run(['ffmpeg', '-v', 'error', '-t', str(t), '-i', path, '-vf',
                          'signalstats,metadata=print:key=lavfi.signalstats.SATAVG:file=-', '-f', 'null', '-'],
                         capture_output=True, text=True).stdout
    for line in txt.splitlines():
        m = re.search(r'frame:(\d+)\s+pts:\d+\s+pts_time:([\d.]+)', line)
        if m:
            cur = (int(m.group(1)), float(m.group(2)))
        m = re.search(r'SATAVG=([\d.]+)', line)
        if m and cur:
            res.append((cur[0], cur[1], float(m.group(1))))
    return res


def smooth(x):
    x = min(1.0, max(0.0, x))
    return x * x * (3 - 2 * x)


# 1. the grade, losslessly, full size (same gains as regrade-hero.py's first pass)
graded = os.path.join(work, 'graded-full.mkv')
if not os.path.exists(graded):
    frames = measure(src)
    full = max(s for _, t, s in frames if 2.8 <= t <= 3.1)
    gains = {}
    for n, t, s in frames:
        if t >= T0 and s > 0.05:
            g = min(CAP, max(s, full * smooth((t - T0) / (T1 - T0))) / s)
            if g > 1.005:
                gains[n] = round(g, 4)
    expr = '1'
    for n in sorted(gains, reverse=True):
        expr = f'if(eq(n\\,{n})\\,{gains[n]}\\,{expr})'
    subprocess.run(ff + ['-i', src, '-t', '10', '-vf', f"hue=s='{expr}'", '-c:v', 'ffv1', '-pix_fmt', 'yuv420p',
                         graded + '.part.mkv'], check=True)
    os.replace(graded + '.part.mkv', graded)

# 2. carry the colour back along the flow
fs = W * H * 3 // 2
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', graded, '-f', 'rawvideo', '-pix_fmt', 'yuv420p', '-'],
                     capture_output=True, check=True).stdout
fr = [np.frombuffer(raw[i * fs:(i + 1) * fs], np.uint8) for i in range(len(raw) // fs)]
assert len(fr) == CLIP_FRAMES, len(fr)
Y = lambda f: f[:W * H].reshape(H, W)
UV = lambda f: (f[W * H:W * H * 5 // 4].reshape(H // 2, W // 2), f[W * H * 5 // 4:].reshape(H // 2, W // 2))
dis = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
small = lambda y: cv2.equalizeHist(cv2.resize(y, (W // 2, H // 2), interpolation=cv2.INTER_AREA))
gx, gy = np.meshgrid(np.arange(W // 2, dtype=np.float32), np.arange(H // 2, dtype=np.float32))

first = int(C0 * FPS)                              # frames before this stay black and white
col, anchor = {REF: tuple(c.astype(np.float32) for c in UV(fr[REF]))}, REF
for k in range(REF - 1, first - 1, -1):
    if anchor - k > HOP:
        anchor = k + 1
    fl = dis.calc(small(Y(fr[k])), small(Y(fr[anchor])), None)     # where each pixel of k sits in the anchor
    col[k] = tuple(cv2.remap(c, gx + fl[..., 0], gy + fl[..., 1], cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
                   for c in col[anchor])

held = os.path.join(work, 'coloured.mkv')
enc = subprocess.Popen(ff + ['-f', 'rawvideo', '-pix_fmt', 'yuv420p', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                             '-c:v', 'ffv1', '-pix_fmt', 'yuv420p', held], stdin=subprocess.PIPE)
for k, f in enumerate(fr):
    if first <= k < REF:
        a = smooth((k / FPS - C0) / (C1 - C0))
        u, v = (np.clip(np.rint(128 + a * (c - 128)), 0, 255).astype(np.uint8) for c in col[k])
        f = np.concatenate([Y(f).ravel(), u.ravel(), v.ravel()])
    enc.stdin.write(f.tobytes())
enc.stdin.close(); enc.wait()
assert enc.returncode == 0, 'coloured clip failed'

# 3. + the 1977 film from 10 s, encoded like the delivered file
scale = f',scale={size.replace("x", ":")}:flags=lanczos' if size else ''
fc = (f'[0:v]setpts=PTS-STARTPTS{scale}[a];[1:v]trim=start_frame={CLIP_FRAMES},setpts=PTS-STARTPTS{scale}[b];'
      '[a][b]concat=n=2:v=1:a=0[v]')
common = ['-filter_complex', fc, '-map', '[v]', '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high',
          '-level', level, '-pix_fmt', 'yuv420p', '-b:v', rate, '-color_primaries', 'bt709', '-color_trc', 'bt709',
          '-colorspace', 'bt709', '-an', '-map_metadata', '-1']
log = os.path.join(work, 'x264-2pass')
subprocess.run(ff + ['-i', held, '-i', src, *common, '-pass', '1', '-passlogfile', log, '-f', 'mp4', os.devnull], check=True)
subprocess.run(ff + ['-i', held, '-i', src, *common, '-pass', '2', '-passlogfile', log, '-movflags', '+faststart', out],
               check=True)
print('written', out, os.path.getsize(out))
