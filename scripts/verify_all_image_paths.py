import os, re, urllib.request

html_files = [f for f in os.listdir('.') if f.endswith('.html')] + [os.path.join('pages', f) for f in os.listdir('pages') if f.endswith('.html')]

img_pattern = re.compile(r'<img\s+[^>]*?src=["\']([^"\']+)["\']', re.IGNORECASE)

all_sources = set()
for hf in html_files:
    base_dir = os.path.dirname(hf) or '.'
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    for match in img_pattern.finditer(content):
        raw_src = match.group(1)
        all_sources.add((hf, raw_src))

# Also add JS storage sources
with open('js/storage.js', 'r', encoding='utf-8', errors='ignore') as f:
    js_content = f.read()
js_sources = re.findall(r'(?:image|heroImage|avatar)\s*:\s*[\'"]([^\'"]+)[\'"]', js_content)
for js_src in js_sources:
    all_sources.add(('js/storage.js', js_src))

print(f"Total distinct image source references to verify: {len(all_sources)}")

errors = []
verified_urls = set()

for origin, src in sorted(all_sources):
    if src.startswith('http://') or src.startswith('https://'):
        # Check cache
        if src in verified_urls:
            continue
        req = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            resp = urllib.request.urlopen(req, timeout=5)
            if resp.status == 200:
                verified_urls.add(src)
            else:
                errors.append((origin, src, f"HTTP status {resp.status}"))
        except Exception as e:
            errors.append((origin, src, str(e)))
    else:
        # Local file
        clean_p = src.split('?')[0]
        if origin.startswith('pages') or origin.startswith('js'):
            resolved_p = os.path.normpath(os.path.join('pages', clean_p))
        else:
            resolved_p = os.path.normpath(clean_p)
        if not os.path.exists(resolved_p):
            errors.append((origin, src, f"Local file not found: {resolved_p}"))

if errors:
    print(f"FAILED: {len(errors)} broken images found:")
    for origin, src, err in errors:
        print(f"  [{origin}] {src} -> {err}")
else:
    print(f">>> 100% HEALTH CHECK PASSED! All {len(all_sources)} images verified (200 OK / local file exists)! <<<")
