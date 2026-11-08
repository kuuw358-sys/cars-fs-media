"""Extend a car photo's ground downward (mirroring the bottom strip) so it can fill the whole template.
usage: python3 tools/extend_ground.py in.jpg out.jpg [target_height=2400] [strip=160]"""
import sys
from PIL import Image, ImageOps
src, dst = sys.argv[1], sys.argv[2]
H = int(sys.argv[3]) if len(sys.argv) > 3 else 2400
S = int(sys.argv[4]) if len(sys.argv) > 4 else 160
im = Image.open(src).convert('RGB'); w, h = im.size
strip = im.crop((0, h - S, w, h)); flip = ImageOps.flip(strip)
out = Image.new('RGB', (w, max(H, h))); out.paste(im, (0, 0))
y, k = h, 0
while y < out.height:
    out.paste(flip if k % 2 == 0 else strip, (0, y)); y += S; k += 1
out.save(dst, quality=95)
