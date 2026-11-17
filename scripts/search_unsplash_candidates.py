import urllib.request
import urllib.parse
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def search_unsplash(query, max_results=5):
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(query + ' site:unsplash.com/photos')
    req = urllib.request.Request(url, headers=headers)
    photo_ids = []
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8')
            # Extract URLs
            links = re.findall(r'unsplash\.com/photos/([a-zA-Z0-9_\-]+)', html)
            for l in links:
                if len(l) > 6 and l not in photo_ids and not any(x in l for x in ['collections', 'premium', 'plus', 'images']):
                    photo_ids.append(l)
    except Exception as e:
        print(f"Search error for '{query}':", e)
    return photo_ids[:max_results]

# Let's test a couple of searches
tests = [
    'luxury clinic reception lounge aesthetic',
    'chemical peel facial skincare',
    'female doctor medical portrait white coat smiling',
    'male doctor physician portrait stethoscope professional'
]

for t in tests:
    res = search_unsplash(t)
    print(f"Query: {t} -> {res}")
