import urllib.request
import urllib.parse
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
}

def search_bing(query):
    url = f"https://www.bing.com/search?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Look for photo IDs or unsplash links
            matches = re.findall(r'unsplash\.com/photos/([a-zA-Z0-9_\-]+)', html)
            return list(set(matches))
    except Exception as e:
        print("Bing error:", e)
        return []

tests = [
    'site:unsplash.com/photos "aesthetician" facial',
    'site:unsplash.com/photos "botox" injection',
    'site:unsplash.com/photos "medical spa" reception',
    'site:unsplash.com/photos female doctor consultation portrait'
]

for t in tests:
    res = search_bing(t)
    print(f"{t} -> {len(res)} results:")
    for r in res[:5]:
        print("  ", r)
