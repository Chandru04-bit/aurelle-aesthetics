import os
from PIL import Image

files = [
    'derma_treatment.jpg',
    'hero_candidate_1600.jpg',
    'p1.jpg', 'p2.jpg', 'p3.jpg', 'p4.jpg',
    'q1.jpg', 'q2.jpg', 'q3.jpg', 'q4.jpg'
]

os.makedirs('scratch/inspections3', exist_ok=True)
for f in files:
    p = os.path.join('scratch', f)
    if os.path.exists(p):
        im = Image.open(p)
        im.thumbnail((300, 300))
        out_p = os.path.join('scratch', 'inspections3', f)
        im.save(out_p, 'JPEG', quality=75)
print("Done creating thumbnails.")
