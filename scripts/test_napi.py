import urllib.request
import json

url = 'https://unsplash.com/napi/search/photos?query=aesthetic+clinic&per_page=3'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
})

try:
    with urllib.request.urlopen(req, timeout=5) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print("Success! Results count:", len(data.get('results', [])))
        for r in data.get('results', []):
            print(f"ID: {r['id']}, Desc: {r.get('description') or r.get('alt_description')}, URL: {r['urls']['raw']}")
except Exception as e:
    print("Error:", e)
