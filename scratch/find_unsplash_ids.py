import urllib.request
import re

# Let's search DuckDuckGo specifically for `images.unsplash.com/photo-` with keywords:
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

queries = [
    '"images.unsplash.com/photo-" "consultation" female OR woman',
    '"images.unsplash.com/photo-" "receptionist" clinic OR spa OR doctor',
    '"images.unsplash.com/photo-" "dermatologist" woman OR female',
    '"images.unsplash.com/photo-" "aesthetician" OR "aesthetic" woman',
    '"images.unsplash.com/photo-" "concierge" clinic OR hotel OR spa'
]

found_ids = set()
for q in queries:
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(q)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8')
            matches = re.findall(r'images\.unsplash\.com/photo-([0-9a-fA-F\-]+)', html)
            for m in matches:
                # clean up
                pid = m.split('?')[0].split('"')[0].split('&')[0]
                if len(pid) >= 12:
                    found_ids.add('photo-' + pid)
    except Exception as e:
        print('Query error:', q, e)

print('Found photo IDs count:', len(found_ids))
for fid in found_ids:
    print('Found:', fid)
