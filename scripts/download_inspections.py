import urllib.request
import os

os.makedirs('scratch/inspections', exist_ok=True)
photos = [
    ('photo-1598440947619-2c35fc9aa908', 'facial_treatment'),
    ('photo-1560750588-73207b1ef5b8', 'skincare_clinic'),
    ('photo-1631217868264-e5b90bb7e133', 'modern_consult_suite'),
    ('photo-1576091160550-2173dba999ef', 'clinical_team'),
    ('photo-1584515933487-779824d29309', 'doctor_patient_consult'),
    ('photo-1617897903246-719242758050', 'serum_cosmetic')
]

for pid, name in photos:
    url = f"https://images.unsplash.com/{pid}?auto=format&fit=crop&w=600&q=80"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    dest = f"scratch/inspections/{name}.jpg"
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read()
            with open(dest, 'wb') as f:
                f.write(data)
            print(f"Downloaded {name}: {len(data)} bytes")
    except Exception as e:
        print(f"Failed {name}: {e}")
