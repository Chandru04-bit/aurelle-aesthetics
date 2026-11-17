import os
from PIL import Image

files_to_check = [
    'assets/images/contact/hero-contact-hd.jpg',
    'assets/images/treatments/hero-treatment-clean.jpg',
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
    'scratch/treatment_clean_card.jpg'
]

print("=== CHECKING LOCAL SCRATCH & ASSETS CANDIDATES ===")
for f in files_to_check:
    if os.path.exists(f):
        with Image.open(f) as im:
            print(f"{f}: {im.size[0]}x{im.size[1]}, format: {im.format}, size: {os.path.getsize(f)/1024:.1f} KB")
    else:
        print(f"NOT FOUND: {f}")
