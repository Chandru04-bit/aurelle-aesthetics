import os, re

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
    './pages/register.html'
]

for fp in files:
    if not os.path.exists(fp):
        continue
    with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find all <img ...>
    img_matches = list(re.finditer(r'<img\s+([^>]+)>', content, re.IGNORECASE))
    print(f"\n=======================================================")
    print(f"FILE: {fp} (Found {len(img_matches)} img tags)")
    print(f"=======================================================")
    for m in img_matches:
        full_tag = m.group(0)
        attrs = m.group(1)
        src_m = re.search(r'src=[\'"]([^\'"]+)[\'"]', attrs)
        alt_m = re.search(r'alt=[\'"]([^\'"]*)[\'"]', attrs)
        src = src_m.group(1) if src_m else ''
        alt = alt_m.group(1) if alt_m else ''
        line_num = content[:m.start()].count('\n') + 1
        print(f"  Line {line_num}:")
        print(f"    src: {src}")
        print(f"    alt: {alt}")
        # print snippet
        start = max(0, m.start() - 100)
        end = min(len(content), m.end() + 100)
        # print(f"    snippet: {content[start:end]}")
