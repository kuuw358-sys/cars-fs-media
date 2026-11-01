"""Usage: python3 plate.py in.jpg out.jpg x1,y1 x2,y2 x3,y3 x4,y4  (corners TL TR BR BL of the plate)"""
import sys, numpy as np
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
q = [tuple(map(float, a.split(','))) for a in sys.argv[3:7]]
# grow quad ~6% around its centre so the sticker fully hides the plate edges
cx, cy = sum(p[0] for p in q)/4, sum(p[1] for p in q)/4
q = [(cx+(x-cx)*1.08, cy+(y-cy)*1.10) for x, y in q]
st = Image.open('sticker.png').convert('RGBA'); W, H = st.size
photo = Image.open(src).convert('RGBA')
s = [(0,0),(W,0),(W,H),(0,H)]
A=[];B=[]
for (x,y),(u,v) in zip(q,s):           # output (photo) -> input (sticker)
    A += [[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]]; B += [u,v]
coef = np.linalg.solve(np.array(A,float), np.array(B,float))
warped = st.transform(photo.size, Image.PERSPECTIVE, tuple(coef), Image.BICUBIC)
photo.alpha_composite(warped)
photo.convert('RGB').save(dst, quality=95)
