import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

queries = [
    'dermatologist woman consultation site:unsplash.com/photos',
    'medical spa consultation woman site:unsplash.com/photos',
    'clinic receptionist woman site:unsplash.com/photos',
    'aesthetician facial clinic site:unsplash.com/photos'
]

results = []
for q in queries:
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(q)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8')
            matches = re.findall(r'unsplash\.com/photos/([a-zA-Z0-9_\-]+)', html)
            for m in matches:
                if len(m) > 6 and m not in results:
                    results.append(m)
    except Exception as e:
        print('Error:', q, e)

print(f'Total found: {len(results)}')
for r in results[:20]:
    print('Photo:', r)
