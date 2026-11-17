import urllib.request
import re

url = 'https://unsplash.com/s/photos/medical-spa'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
})

try:
    with urllib.request.urlopen(req, timeout=8) as resp:
        html = resp.read().decode('utf-8')
        # find photo urls in srcset or images.unsplash.com/photo-
        photos = re.findall(r'https://images\.unsplash\.com/photo-([0-9a-fA-F\-]+)', html)
        # unique
        clean_ids = []
        for p in photos:
            pid = p.split('?')[0]
            if len(pid) >= 10 and pid not in clean_ids:
                clean_ids.append(pid)
        print("Found photo IDs on medical-spa page:", len(clean_ids))
        for cid in clean_ids[:10]:
            print("  photo-" + cid)
except Exception as e:
    print("Error:", e)
