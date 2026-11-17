import os
from PIL import Image

files = [
    'derma_treatment.jpg',
    'full_scene.jpg',
    'full_scene_clean.jpg',
    'hero_candidate_1600.jpg',
    'hero_home_clean.jpg',
    'p1.jpg', 'p2.jpg', 'p3.jpg', 'p4.jpg',
    'q1.jpg', 'q2.jpg', 'q3.jpg', 'q4.jpg',
    'u1.jpg', 'u2.jpg', 'u3.jpg', 'u4.jpg', 'u5.jpg'
]

for f in files:
    p = os.path.join('scratch', f)
    if os.path.exists(p):
        im = Image.open(p)
        print(f"{f:25} | Size: {im.size} | Mode: {im.mode} | Bytes: {os.path.getsize(p)}")
