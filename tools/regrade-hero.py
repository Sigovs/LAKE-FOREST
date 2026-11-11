"""Re-grade the hero film's colour arrival with a per-frame gain measured on the original.

The original turns from black and white to colour between 1.62 s and 2.83 s (SATAVG 0 -> 9.8, monotonic). The client wants
the colour sooner. The target saturation is max(original, FULL * smoothstep over 1.62..2.12 s); each frame's chroma is scaled
by target / original (hue s=), so the result rises smoothly and never wobbles. Frames outside the window are untouched.

usage: python -I tools/regrade-hero.py <original.mp4> <out.mp4> <bitrate> <level> <workdir> [<first result.mp4>]
  The original is the delivered film before any re-grade:  git show f0985e9:assets/img/final/hero-v3.mp4 > orig.mp4
  (and hero-v3-mobile.mp4). Desktop: 1930k, level 3.1; phone: 560k, level 3.0. Run once, then again with the first
  result as the last argument: the second pass corrects each frame toward the target (11 Nov 2026 files are pass two).
"""
import subprocess, sys, os, re

src, out, rate, level, work = sys.argv[1:6]
prev = sys.argv[6] if len(sys.argv) > 6 else None   # a first result: its measured colour corrects each frame's gain
T0, T1, CAP = 1.62, 2.12, 4.0

# 1. measure the original, frame by frame, over the first 3.5 s
def measure(path):
    meas = subprocess.run(['ffmpeg', '-v', 'error', '-t', '3.5', '-i', path, '-vf',
                           'signalstats,metadata=print:key=lavfi.signalstats.SATAVG:file=-', '-f', 'null', '-'],
                          capture_output=True, text=True).stdout
    res, cur = [], None
    for line in meas.splitlines():
        m = re.search(r'frame:(\d+)\s+pts:\d+\s+pts_time:([\d.]+)', line)
        if m:
            cur = (int(m.group(1)), float(m.group(2)))
        m = re.search(r'SATAVG=([\d.]+)', line)
        if m and cur:
            res.append((cur[0], cur[1], float(m.group(1))))
    return res
frames = measure(src)
got = {n: s for n, t, s in measure(prev)} if prev else {}
full = max(s for _, t, s in frames if 2.8 <= t <= 3.1)   # the original's settled colour


def smooth(x):
    x = min(1.0, max(0.0, x))
    return x * x * (3 - 2 * x)


gains = {}
for n, t, s in frames:
    if t < T0 or s <= 0.05:
        continue
    target = max(s, full * smooth((t - T0) / (T1 - T0)))
    g = target / s
    if n in got and got[n] > 0.05:
        g *= min(1.1, max(0.9, target / got[n]))   # close the loop on what the encode actually produced
    g = min(CAP, g)
    if g > 1.005:
        gains[n] = round(g, 4)
print('settled colour', full, '· frames boosted', len(gains), '· max gain', max(gains.values()) if gains else 1)

# 2. hue s= as a per-frame lookup on n
expr = '1'
for n in sorted(gains, reverse=True):
    expr = f'if(eq(n\\,{n})\\,{gains[n]}\\,{expr})'
vf = f"hue=s='{expr}'"
common = ['-vf', vf, '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-level', level, '-pix_fmt', 'yuv420p',
          '-b:v', rate, '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-an', '-map_metadata', '0']
log = os.path.join(work, 'x264-2pass')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, *common, '-pass', '1', '-passlogfile', log, '-f', 'mp4', os.devnull], check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, *common, '-pass', '2', '-passlogfile', log, '-movflags', '+faststart', out], check=True)
print('written', out, os.path.getsize(out))
