import os, re
from collections import defaultdict

html_files = []
for root, dirs, files in os.walk('.'):
    if any(x in root for x in ['node_modules', '.git', 'dist', 'scratch']):
        continue
    for f in files:
        if f.endswith('.html') or f.endswith('storage.js'):
            html_files.append(os.path.join(root, f))

image_map = defaultdict(list)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        lines = content.splitlines()
        for idx, line in enumerate(lines):
            # Find img src
            srcs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', line)
            for s in srcs:
                if not s.startswith('data:') and not s.endswith('.svg') and not s.endswith('.ico'):
                    clean_s = s.split('?')[0]
                    image_map[clean_s].append((file_path, idx + 1, line.strip()[:100]))
            
            # Find inline background-image
            bgs = re.findall(r'url\(["\']?([^"\')]+)["\']?\)', line)
            for b in bgs:
                if not b.startswith('data:') and not b.endswith('.svg') and not b.endswith('.ico'):
                    clean_b = b.split('?')[0]
                    image_map[clean_b].append((file_path, idx + 1, 'BG: ' + line.strip()[:96]))

            # In storage.js find image and heroImage properties
            if 'storage.js' in file_path:
                props = re.findall(r'(?:image|heroImage|photo|avatar):\s*["\']([^"\']+)["\']', line)
                for p in props:
                    clean_p = p.split('?')[0]
                    image_map[clean_p].append((file_path, idx + 1, 'DATA: ' + line.strip()[:90]))

print(f'=== TOTAL UNIQUE IMAGE SOURCES FOUND: {len(image_map)} ===\n')

duplicates = {k: v for k, v in image_map.items() if len(v) > 1}
print(f'=== DUPLICATE IMAGES DETECTED: {len(duplicates)} ===\n')

for img, locs in sorted(duplicates.items(), key=lambda x: -len(x[1])):
    print(f'IMAGE: {img} (Used {len(locs)} times)')
    for f, l, snippet in locs:
        print(f'   - {f}:{l} -> {snippet[:80]}')
    print()
