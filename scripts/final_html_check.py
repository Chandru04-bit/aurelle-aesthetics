import os, re
from collections import defaultdict

html_files = [f for f in os.listdir('.') if f.endswith('.html')] + [os.path.join('pages', f) for f in os.listdir('pages') if f.endswith('.html')]

img_pattern = re.compile(r'<img\s+[^>]*?src=["\']([^"\']+)["\']', re.IGNORECASE)

seen = defaultdict(list)

for hf in html_files:
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    for match in img_pattern.finditer(content):
        src = match.group(1).split('?')[0].replace('../', '').replace('./', '')
        seen[src].append(hf)

duplicates = {k: v for k, v in seen.items() if len(v) > 1}

print(f"Total scanned HTML files: {len(html_files)}")
print(f"Total unique image paths found in HTML: {len(seen)}")
if duplicates:
    print(f"DUPLICATES IN HTML ({len(duplicates)}):")
    for src, files in duplicates.items():
        print(f"  {src} -> {files}")
else:
    print(">>> ABSOLUTE PERFECTION: ZERO DUPLICATES ACROSS ALL HTML PAGES! <<<")
