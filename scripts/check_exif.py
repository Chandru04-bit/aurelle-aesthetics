import os
from PIL import Image, ExifTags

scratch_files = [
    'aesthetician_8.jpg',
    'aesthetic_team_4.jpg',
    'derma_clinic_3.jpg',
    'derma_consult_1.jpg',
    'derma_consult_2.jpg',
    'dr_consult_10.jpg',
    'laser_clinic_7.jpg',
    'luxury_reception_9.jpg',
    'skin_treatment_6.jpg',
    'team1.jpg',
    'team2.jpg'
]

for f in scratch_files:
    fp = os.path.join('scratch', f)
    if not os.path.exists(fp):
        continue
    try:
        im = Image.open(fp)
        exif = im.getexif()
        print(f"\n=== {f} ({im.size}) ===")
        # search raw bytes for unsplash or photographer
        with open(fp, 'rb') as bf:
            raw = bf.read()
        import re
        urls = re.findall(rb'https?://[^\s<>"\'\x00]+', raw)
        for u in urls[:3]:
            print("  URL in binary:", u.decode('utf-8', errors='ignore'))
    except Exception as e:
        print(f"Error {f}: {e}")
