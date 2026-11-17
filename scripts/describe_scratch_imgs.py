import os
from PIL import Image

images_info = [
    'scratch/derma_consult_1.jpg',
    'scratch/derma_consult_2.jpg',
    'scratch/derma_clinic_3.jpg',
    'scratch/aesthetic_team_4.jpg',
    'scratch/skin_treatment_6.jpg',
    'scratch/laser_clinic_7.jpg',
    'scratch/aesthetician_8.jpg',
    'scratch/luxury_reception_9.jpg',
    'scratch/dr_consult_10.jpg',
    'scratch/team1.jpg',
    'scratch/team2.jpg',
    'scratch/bio_stim_card.jpg',
    'scratch/treatment_clean_card.jpg',
    'assets/images/contact/hero-contact-hd.jpg',
    'assets/images/treatments/hero-treatment-clean.jpg'
]

for p in images_info:
    if os.path.exists(p):
        with Image.open(p) as img:
            w, h = img.size
            # compute simple stats
            stat = img.resize((10, 10)).convert('RGB')
            pixels = list(stat.getdata())
            avg_r = sum(px[0] for px in pixels) / len(pixels)
            avg_g = sum(px[1] for px in pixels) / len(pixels)
            avg_b = sum(px[2] for px in pixels) / len(pixels)
            print(f"{p:45} | {w}x{h} (ratio: {w/h:.2f}) | RGB: ({avg_r:.0f}, {avg_g:.0f}, {avg_b:.0f})")
