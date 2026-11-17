import os
import re
from collections import defaultdict

def get_clean_url(url):
    return url.split('?')[0].strip()

files = [
    './index.html',
    './pages/home-2.html',
    './pages/about.html',
    './pages/treatments.html',
    './pages/treatment-details.html',
    './pages/providers.html',
    './pages/contact.html',
    './pages/booking.html',
    './pages/dashboard.html',
    './pages/privacy.html',
    './pages/terms.html',
    './pages/sitemap.html',
    './pages/login.html',
    './pages/register.html',
    './js/storage.js'
]

image_usages = []

for fp in files:
    if not os.path.exists(fp):
        continue
    with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    if fp.endswith('.html'):
        # Find all img tags multiline
        for m in re.finditer(r'<img\s+([^>]+)>', content, re.DOTALL | re.IGNORECASE):
            attrs = m.group(1)
            src_m = re.search(r'src=[\'"]([^\'"]+)[\'"]', attrs)
            alt_m = re.search(r'alt=[\'"]([^\'"]*)[\'"]', attrs)
            if src_m:
                src = src_m.group(1).strip()
                if src and not src.endswith('.svg') and not src.endswith('.ico') and not src.startswith('data:'):
                    alt = alt_m.group(1).strip() if alt_m else ''
                    line_no = content[:m.start()].count('\n') + 1
                    
                    # Find enclosing section id or previous heading
                    before_text = content[:m.start()]
                    sec_matches = list(re.finditer(r'<section[^>]*id=[\'"]([^\'"]+)[\'"]', before_text))
                    sec_id = sec_matches[-1].group(1) if sec_matches else ''
                    
                    h_matches = list(re.finditer(r'<h[1-4][^>]*>(.*?)</h[1-4]>', before_text, re.DOTALL))
                    heading = ''
                    if h_matches:
                        heading = re.sub(r'<[^>]+>', '', h_matches[-1].group(1)).strip()
                    
                    image_usages.append({
                        'file': fp,
                        'line': line_no,
                        'section': sec_id,
                        'heading': heading,
                        'src': src,
                        'clean_src': get_clean_url(src),
                        'alt': alt
                    })

    elif fp.endswith('.js'):
        lines = content.splitlines()
        current_entity = ''
        for i, line in enumerate(lines, 1):
            if 'id:' in line:
                id_m = re.search(r'id:\s*[\'"]([^\'"]+)[\'"]', line)
                if id_m:
                    current_entity = id_m.group(1)
            if 'name:' in line:
                name_m = re.search(r'name:\s*[\'"]([^\'"]+)[\'"]', line)
                if name_m:
                    current_entity += ' (' + name_m.group(1) + ')'

            for prop in ['image', 'heroImage', 'avatar', 'photo']:
                prop_m = re.search(rf'{prop}:\s*[\'"]([^\'"]+)[\'"]', line)
                if prop_m:
                    src = prop_m.group(1).strip()
                    if src and not src.endswith('.svg') and not src.endswith('.ico') and not src.startswith('data:'):
                        image_usages.append({
                            'file': fp,
                            'line': i,
                            'section': 'js_seed',
                            'heading': f"{current_entity} [{prop}]",
                            'src': src,
                            'clean_src': get_clean_url(src),
                            'alt': ''
                        })

grouped = defaultdict(list)
for u in image_usages:
    grouped[u['clean_src']].append(u)

print(f"TOTAL IMAGE USAGE LOCATIONS: {len(image_usages)}")
print(f"UNIQUE IMAGES: {len(grouped)}")
duplicates = {k: v for k, v in grouped.items() if len(v) > 1}
print(f"DUPLICATE IMAGES: {len(duplicates)}")

print("\n================== COMPLETE ACCURATE DUPLICATE AUDIT ==================")
for clean_src, locs in sorted(duplicates.items(), key=lambda x: len(x[1]), reverse=True):
    print(f"\nImage: {clean_src} (Used in {len(locs)} places)")
    for l in locs:
        print(f"  - {l['file']}:{l['line']} | Sec: '{l['section']}' | Heading: '{l['heading'][:50]}' | Alt: '{l['alt']}'")
