import os
from PIL import Image

scratch_list = [
    'luxury_reception_9.jpg',
    'laser_clinic_7.jpg',
    'derma_clinic_3.jpg',
    'derma_consult_1.jpg',
    'derma_consult_2.jpg',
    'dr_consult_10.jpg',
    'aesthetician_8.jpg',
    'aesthetic_team_4.jpg',
    'skin_treatment_6.jpg',
    'team1.jpg',
    'team2.jpg',
    'bio_stim_card.jpg',
    'treatment_clean_card.jpg'
]

print("=== INSPECTING SCRATCH ASSETS ===")
for fname in scratch_list:
    fp = os.path.join('scratch', fname)
    if os.path.exists(fp):
        im = Image.open(fp)
        print(f"{fname:25} | Size: {im.size} | Mode: {im.mode} | Bytes: {os.path.getsize(fp)}")
