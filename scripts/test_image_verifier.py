import urllib.request
import json
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def verify_image(url):
    try:
        req = urllib.request.Request(url, headers=headers, method='HEAD')
        with urllib.request.urlopen(req, timeout=8) as resp:
            content_type = resp.headers.get('Content-Type', '')
            content_len = resp.headers.get('Content-Length', '0')
            return resp.status == 200, content_type, int(content_len)
    except Exception as e:
        # Fallback to GET with Range 0-100
        try:
            req = urllib.request.Request(url, headers={'Range': 'bytes=0-100', **headers})
            with urllib.request.urlopen(req, timeout=8) as resp:
                return resp.status in [200, 206], resp.headers.get('Content-Type', ''), 0
        except Exception as e2:
            return False, str(e2), 0

print("Testing test unsplash URL...")
ok, ct, cl = verify_image('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80')
print("Result:", ok, ct, cl)
