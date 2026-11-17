import urllib.request
import os

candidates = [
    ('0uFkDXR8cgA', 'beautician_consulting_client'),
    ('rG5elqddGzo', 'two_women_consultation'),
    ('7MnUpCGxPR0', 'woman_doctor_consultation'),
    ('8WYkI3cEZm8', 'doctor_writing_chart'),
    ('RcfH53KZjsc', 'woman_in_lab_coat'),
    ('RbIcMsh0NSk', 'facial_treatment_clinic')
]

os.makedirs('scratch/candidates', exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for pid, name in candidates:
    url = f'https://images.unsplash.com/photo-{pid}?auto=format&fit=crop&w=1600&h=1200&q=90'
    dest = f'scratch/candidates/{name}.jpg'
    # Try photo-{pid} or direct unsplash URL
    try:
        req = urllib.request.Request(f'https://unsplash.com/photos/{pid}/download?force=true&w=1600', headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(dest, 'wb') as f:
                f.write(data)
            print(f'Downloaded {name} via download link: {len(data)} bytes')
    except Exception as e:
        print(f'Download link failed for {name}: {e}')
