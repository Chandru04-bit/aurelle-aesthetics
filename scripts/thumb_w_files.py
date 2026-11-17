import os
from PIL import Image

for f in ['w1.jpg', 'w2.jpg', 'w3.jpg', 'w4.jpg']:
    p = os.path.join('scratch', f)
    if os.path.exists(p):
        im = Image.open(p)
        im.thumbnail((400, 400))
        out_p = os.path.join('scratch', 'inspections2', f'thumb_{f}')
        im.save(out_p, 'JPEG', quality=80)
        print(f"Saved thumb_{f}")
