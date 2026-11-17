import os
from PIL import Image

for f in ['w1.jpg', 'w2.jpg', 'w3.jpg', 'w4.jpg']:
    p = os.path.join('scratch', f)
    if os.path.exists(p):
        im = Image.open(p)
        print(f"{f}: {im.size}, mode {im.mode}, bytes {os.path.getsize(p)}")
