import os
from PIL import Image

im_w2 = Image.open('scratch/w2.jpg')
w, h = im_w2.size
# Let's crop centered around the physician's face, hands, syringe, and patient's face
# w2 is vertical (2592, 3888). Physician face is at top, hands/syringe at middle/lower.
box = (0, int(h * 0.1), w, int(h * 0.9))
crop_w2 = im_w2.crop(box)
crop_w2.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
dest_filler = 'assets/images/treatments/dermal-filler-hd.jpg'
crop_w2.save(dest_filler, 'JPEG', quality=88, optimize=True)
print(f"Saved {dest_filler}: {crop_w2.size}, {os.path.getsize(dest_filler)} bytes")
