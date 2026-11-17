import urllib.request
import os

pics = [
    ('photo-1584467735871-8e85353a8413', 'syringe_precision'),
    ('photo-1588776814546-1ffcf47267a5', 'clinical_procedure'),
    ('photo-1584467735867-4297ae2ebcee', 'clinical_tech')
]

for pid, name in pics:
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
