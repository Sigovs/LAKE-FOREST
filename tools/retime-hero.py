"""Hold the coloured No. 48 longer in the hero film's concept clip (0-10 s), then let it turn into the black car as before.

The client (11 Nov 2026): "hold the color on the first 48 car for a little longer, then fade into the new car".
In the film the No. 48 is fully coloured only from ~2.05 s to ~2.65 s; the morph into the black car starts right after.
Colour cannot arrive before 1.62 s (the frames before it are pure black and white), so the coloured stretch is slowed:

  source            0-1.5 s     1.5-1.92   1.92-2.0   2.0-2.6        2.6-2.68   2.68-3.75   3.75-7.4    7.4-10
  speed             4/3         1          2/3        1/3 (the hold) 2/3        1           4/3         1

The clip stays exactly 10 s (240 frames), so the page's CLIP = 10 and the caption switch do not change, and the
1977 film after 10 s is untouched.

How: the graded clip is motion-interpolated to exactly 3x (72 fps). Only 3x moves evenly: at 120, 144 or 240 fps
minterpolate stalls next to every real frame, which reads as a stutter. Every speed is then a whole number of 1/72 s
steps per output frame (1 = a third, 3 = normal, 4 = 4/3). Steps of 3 that land on a real frame take the real frame.

Steps: 1. grade the original's first 10 s exactly as tools/regrade-hero.py does (colour full by 2.12 s), losslessly;
2. interpolate to 72 fps; 3. pick the frames; 4. join the 1977 film from 10 s and encode with the delivered x264
settings (two-pass).

usage: python -I retime-hero.py <original.mp4> <out.mp4> <bitrate> <level> <workdir> [WxH]
The original is the delivered film before any re-grade:  git show f0985e9:assets/img/final/hero-v3.mp4 > orig.mp4
Pass WxH (e.g. 720x406) to build the phone copy from the desktop original's frames.
"""
import subprocess, sys, os, re

src, out, rate, level, work = sys.argv[1:6]
size = sys.argv[6] if len(sys.argv) > 6 else None
FPS, X, CLIP_FRAMES = 24, 3, 240
T0, T1, CAP = 1.62, 2.12, 4.0                      # the colour grade, as in regrade-hero.py
HOLD = 43                                          # output frames at a third of the speed (~1.8 s)
ff = ['ffmpeg', '-v', 'error', '-y']


# 1. the grade (same gains as regrade-hero.py's first pass)
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


graded = os.path.join(work, 'graded.mkv')
scale = f',scale={size.replace("x", ":")}:flags=lanczos' if size else ''
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
    subprocess.run(ff + ['-i', src, '-t', '10', '-vf', f"hue=s='{expr}'{scale}", '-c:v', 'ffv1', '-pix_fmt', 'yuv420p',
                         graded + '.part.mkv'], check=True)
    os.replace(graded + '.part.mkv', graded)

# 2. exactly 3x, motion-compensated
hi = os.path.join(work, f'x{X}.mkv')
if not os.path.exists(hi):
    subprocess.run(ff + ['-i', graded, '-vf', f'minterpolate=fps={FPS * X}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1',
                         '-c:v', 'ffv1', '-pix_fmt', 'yuv420p', hi + '.part.mkv'], check=True)
    os.replace(hi + '.part.mkv', hi)

# 3. the steps between output frames, in 1/72 s (see the table above); they must sum to the last real frame, 717
fast = 2 * HOLD - 21                               # 4/3-speed frames in the street shot that give the hold's time back
steps = [4] * 27 + [3] * 10 + [2] * 3 + [1] * HOLD + [2] * 3 + [3] * 26 + [4] * fast
steps += [3] * (CLIP_FRAMES - 1 - len(steps))
ticks = [0]
for s in steps:
    ticks.append(ticks[-1] + s)
assert len(ticks) == CLIP_FRAMES and ticks[-1] == (CLIP_FRAMES - 1) * X, (len(ticks), ticks[-1])
f0 = 27 + 10 + 3 + HOLD + 3 + 26                   # first 4/3 frame of the street shot
print(f'hold: source {ticks[40] / 72:.2f}-{ticks[40 + HOLD] / 72:.2f} s, on screen {40 / 24:.2f}-{(40 + HOLD) / 24:.2f} s;',
      f'street at 4/3: source {ticks[f0] / 72:.2f}-{ticks[f0 + fast] / 72:.2f} s')

w, h = map(int, (size or '1280x720').split('x'))
fsize = w * h * 3 // 2                              # one yuv420p frame


def reader(path):
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', path, '-f', 'rawvideo', '-pix_fmt', 'yuv420p', '-'],
                         stdout=subprocess.PIPE)
    n = -1
    frame = None

    def at(i):                                     # frame i (i only grows)
        nonlocal n, frame
        while n < i:
            frame = p.stdout.read(fsize)
            n += 1
        assert len(frame) == fsize, f'{path}: no frame {i}'
        return frame
    return p, at


held = os.path.join(work, 'held.mkv')
pr, real = reader(graded)
pi, interp = reader(hi)
enc = subprocess.Popen(ff + ['-f', 'rawvideo', '-pix_fmt', 'yuv420p', '-s', f'{w}x{h}', '-r', str(FPS), '-i', '-',
                             '-c:v', 'ffv1', '-pix_fmt', 'yuv420p', held], stdin=subprocess.PIPE)
for t in ticks:
    enc.stdin.write(real(t // X) if t % X == 0 else interp(t))
enc.stdin.close(); enc.wait(); pr.kill(); pi.kill()
assert enc.returncode == 0, 'held clip failed'

# 4. + the 1977 film from 10 s, encoded like the delivered file
fc = f'[0:v]setpts=PTS-STARTPTS[a];[1:v]trim=start_frame={CLIP_FRAMES},setpts=PTS-STARTPTS{scale}[b];[a][b]concat=n=2:v=1:a=0[v]'
common = ['-filter_complex', fc, '-map', '[v]', '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high',
          '-level', level, '-pix_fmt', 'yuv420p', '-b:v', rate, '-color_primaries', 'bt709', '-color_trc', 'bt709',
          '-colorspace', 'bt709', '-an', '-map_metadata', '-1']
log = os.path.join(work, 'x264-2pass')
subprocess.run(ff + ['-i', held, '-i', src, *common, '-pass', '1', '-passlogfile', log, '-f', 'mp4', os.devnull], check=True)
subprocess.run(ff + ['-i', held, '-i', src, *common, '-pass', '2', '-passlogfile', log, '-movflags', '+faststart', out],
               check=True)
print('written', out, os.path.getsize(out))
