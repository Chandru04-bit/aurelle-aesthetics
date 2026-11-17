import urllib.request
import os

os.makedirs('scratch/inspections2', exist_ok=True)
ids = [
    ('laser_proc', '9Q0eej67EDs'),
    ('facial_peel', 'HtXyytr9304'),
    ('rejuv_smile', 'CY1dxMkQOYM')
]

for name, pid in ids:
    for domain in ['images.unsplash.com', 'plus.unsplash.com']:
        if domain == 'images.unsplash.com':
            url = f'https://images.unsplash.com/photo-{pid}?auto=format&fit=crop&w=400&q=80'
        else:
            url = f'https://plus.unsplash.com/premium_photo-{pid}?auto=format&fit=crop&w=400&q=80'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            resp = urllib.request.urlopen(req, timeout=4)
            data = resp.read()
            out_file = f'scratch/inspections2/{name}.jpg'
            with open(out_file, 'wb') as f:
                f.write(data)
            print(f'SUCCESS {name}: {url} ({len(data)} bytes)')
            break
        except Exception as e:
            print(f'Fail {name} on {domain}: {e}')
