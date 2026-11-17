import urllib.request
import re

urls = [
    'https://unsplash.com/photos/HPvamFdg6tU',
    'https://unsplash.com/photos/ZRc3V6k8fMM',
    'https://unsplash.com/photos/HpeOgsQ_r-k',
    'https://unsplash.com/photos/gWCCGEcUmuY'
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

for u in urls:
    print(f"Fetching {u}...")
    req = urllib.request.Request(u, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # find images.unsplash.com/photo- or plus.unsplash.com/premium_photo-
            matches = re.findall(r'(https://[a-zA-Z0-9\.\-]+unsplash\.com/(?:photo|premium_photo)-[a-zA-Z0-9\-_]+)', html)
            print(f"Found {len(matches)} matches in {u}")
            for m in list(set(matches))[:5]:
                print(" ", m)
    except Exception as e:
        print(f"Error {u}: {e}")
