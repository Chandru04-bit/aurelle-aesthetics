import os, re

js_files = []
for root, dirs, files in os.walk('.'):
    if any(x in root for x in ['node_modules', '.git', 'dist', 'scratch']):
        continue
    for f in files:
        if f.endswith('.js'):
            js_files.append(os.path.join(root, f).replace('\\', '/'))

print(f"Scanning {len(js_files)} JS files:")
for jf in sorted(js_files):
    with open(jf, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    # Find all strings containing .jpg, .jpeg, .png, .webp, unsplash, or assets/images
    matches = re.findall(r'[\'"]([^\'"]*(?:\.jpg|\.jpeg|\.png|\.webp|unsplash\.com|assets/images)[^\'"]*)[\'"]', c)
    if matches:
        print(f"\n{jf}: {len(matches)} matches")
        for m in matches:
            print(f"   {m}")
