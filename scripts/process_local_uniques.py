import os
from PIL import Image

# 1. Process w4.jpg -> laser-resurfacing-hd.jpg
im_w4 = Image.open('scratch/w4.jpg')
# w4 is vertical (3988, 5982). Let's see its aspect ratio and crop for landscape / card
w, h = im_w4.size
# Crop focused on the handpiece, laser beam, and patient
# The handpiece and contact point are in the center/lower half
box = (0, int(h * 0.15), w, int(h * 0.85))
crop_w4 = im_w4.crop(box)
crop_w4.thumbnail((1600, 1200), Image.Resampling.LANCZOS)
dest_laser = 'assets/images/treatments/laser-resurfacing-hd.jpg'
crop_w4.save(dest_laser, 'JPEG', quality=88, optimize=True)
print(f"Saved {dest_laser}: {crop_w4.size}, {os.path.getsize(dest_laser)} bytes")

# 2. Process w1.jpg -> botox-neurotoxin-hd.jpg
im_w1 = Image.open('scratch/w1.jpg')
# w1 is landscape (4599, 3061)
im_w1_thumb = im_w1.copy()
im_w1_thumb.thumbnail((1600, 1067), Image.Resampling.LANCZOS)
dest_botox = 'assets/images/treatments/botox-neurotoxin-hd.jpg'
im_w1_thumb.save(dest_botox, 'JPEG', quality=88, optimize=True)
print(f"Saved {dest_botox}: {im_w1_thumb.size}, {os.path.getsize(dest_botox)} bytes")
