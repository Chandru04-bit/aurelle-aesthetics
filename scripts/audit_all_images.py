import os
import re
from collections import defaultdict
from urllib.parse import urlparse

files_to_scan = []
for root, dirs, files in os.walk('.'):
    if any(x in root for x in ['node_modules', '.git', 'dist', 'scratch']):
        continue
    for f in files:
        if f.endswith('.html') or f.endswith('.js'):
            files_to_scan.append(os.path.join(root, f).replace('\\', '/'))

print(f"Total files to scan: {len(files_to_scan)}")

# We want to extract every image reference:
# 1. <img ... src="...">
# 2. style="... background-image: url(...) ..."
# 3. In JS: properties like image: "...", heroImage: "...", avatar: "...", photo: "..."
# 4. srcset attributes if any

def normalize_url(url):
    # Remove query string for unsplash or similar if needed, or keep base
    # But let's check what the url is
    url = url.strip()
    return url

results = []

for filepath in sorted(files_to_scan):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    lines = content.splitlines()
    for line_idx, line in enumerate(lines, 1):
        # 1. img tags
        for match in re.finditer(r'<img\s+[^>]*src=[\'"]([^\'"]+)[\'"]', line, re.IGNORECASE):
            src = match.group(1).strip()
            if not src.startswith('data:') and not src.endswith('.svg') and not src.endswith('.ico'):
                # Extract alt tag if present
                alt_m = re.search(r'alt=[\'"]([^\'"]*)[\'"]', line, re.IGNORECASE)
                alt = alt_m.group(1) if alt_m else ''
                results.append({
                    'file': filepath,
                    'line': line_idx,
                    'type': 'img',
                    'src': src,
                    'alt': alt,
                    'context': line.strip()
                })

        # 2. inline background-image
        for match in re.finditer(r'url\([\'"]?([^\'"\)]+)[\'"]?\)', line, re.IGNORECASE):
            url = match.group(1).strip()
            if not url.startswith('data:') and not url.endswith('.svg') and not url.endswith('.ico') and not url.endswith('.woff') and not url.endswith('.woff2'):
                results.append({
                    'file': filepath,
                    'line': line_idx,
                    'type': 'bg',
                    'src': url,
                    'alt': '',
                    'context': line.strip()
                })

        # 3. JS properties
        if filepath.endswith('.js'):
            for match in re.finditer(r'(?:image|heroImage|avatar|photo|thumbnail|banner)\s*:\s*[\'"]([^\'"]+)[\'"]', line, re.IGNORECASE):
                src = match.group(1).strip()
                if not src.startswith('data:') and not src.endswith('.svg') and not src.endswith('.ico'):
                    results.append({
                        'file': filepath,
                        'line': line_idx,
                        'type': 'js_prop',
                        'src': src,
                        'alt': '',
                        'context': line.strip()
                    })

print(f"Total image references found: {len(results)}")

# Group by normalized image source (stripping query parameters for comparison)
def get_base_img(url):
    # If it's unsplash or local, get clean base path
    if 'unsplash.com' in url:
        return url.split('?')[0]
    return url

grouped = defaultdict(list)
for r in results:
    base = get_base_img(r['src'])
    grouped[base].append(r)

print(f"\nUnique base images: {len(grouped)}")
print(f"Duplicates count: {sum(1 for k, v in grouped.items() if len(v) > 1)}")

print("\n--- DUPLICATE IMAGES DETAILED BREAKDOWN ---")
for base, refs in sorted(grouped.items(), key=lambda x: len(x[1]), reverse=True):
    if len(refs) > 1:
        print(f"\n[DUPLICATE] Base: {base} (Used {len(refs)} times)")
        for ref in refs:
            print(f"  - {ref['file']}:{ref['line']} ({ref['type']}) | Alt: '{ref['alt']}' | Context: {ref['context'][:90]}")
    else:
        # single use
        pass

print("\n--- ALL UNIQUE IMAGES (USED ONCE) ---")
for base, refs in sorted(grouped.items(), key=lambda x: x[0]):
    if len(refs) == 1:
        ref = refs[0]
        print(f"[UNIQUE] {base} -> {ref['file']}:{ref['line']} | Alt: '{ref['alt']}'")
