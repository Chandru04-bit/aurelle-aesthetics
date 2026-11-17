import os
import re

html_files = []
for root, dirs, files in os.walk('.'):
    if any(x in root for x in ['node_modules', '.git', 'dist', 'scratch']):
        continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f).replace('\\', '/'))

print(f"Found {len(html_files)} HTML files:")
for hf in sorted(html_files):
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    # Check for img, background-image, or data attributes
    imgs = re.findall(r'<img\s+[^>]*src=[\'"]([^\'"]+)[\'"]', c, re.I)
    bgs = re.findall(r'url\([\'"]?([^\'"\)]+)[\'"]?\)', c, re.I)
    bg_imgs = [b for b in bgs if not b.endswith('.svg') and not b.endswith('.woff') and not b.endswith('.woff2') and not b.startswith('data:')]
    img_tags = [i for i in imgs if not i.endswith('.svg') and not i.endswith('.ico') and not i.startswith('data:')]
    print(f"  {hf} (length: {len(c)}): {len(img_tags)} imgs, {len(bg_imgs)} bgs")
    for i in img_tags:
        print(f"     IMG: {i}")
    for b in bg_imgs:
        print(f"     BG:  {b}")
