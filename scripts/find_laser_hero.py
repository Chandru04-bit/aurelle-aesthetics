import urllib.request
import urllib.parse
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

queries = [
    '"images.unsplash.com/photo-" "laser" facial woman dermatologist',
    '"images.unsplash.com/photo-" "skin rejuvenation" doctor woman',
    '"images.unsplash.com/photo-" aesthetician facial treatment clinic doctor',
    '"images.unsplash.com/photo-" "facial treatment" doctor clinic patient',
    '"images.unsplash.com/photo-" dermatologist performing facial',
    '"images.unsplash.com/photo-" "laser treatment" female face',
    '"images.unsplash.com/photo-" "medical aesthetic" patient doctor facial'
]

found_ids = set()
for q in queries:
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(q)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8')
            matches = re.findall(r'images\.unsplash\.com/(photo-[0-9a-zA-Z\-]+)', html)
            for m in matches:
                pid = m.split('?')[0].split('"')[0]
                if len(pid) >= 15:
                    found_ids.add(pid)
    except Exception as e:
        print('Query error:', e)

print(f"Total unique IDs found: {len(found_ids)}")
for pid in sorted(found_ids):
    print(pid)
