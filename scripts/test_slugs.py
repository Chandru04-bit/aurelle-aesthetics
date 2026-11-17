import urllib.request

slugs = ['0uFkDXR8cgA', 'rG5elqddGzo', '7MnUpCGxPR0', '8WYkI3cEZm8', 'RcfH53KZjsc', 'RbIcMsh0NSk']
for s in slugs:
    url = f'https://unsplash.com/photos/{s}/download?w=1200'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urllib.request.urlopen(req, timeout=5)
        print(f"Slug: {s} -> Final URL: {resp.geturl()[:80]}")
    except Exception as e:
        print(f"Slug {s} failed: {e}")
