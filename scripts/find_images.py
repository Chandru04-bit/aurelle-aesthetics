import os, re

urls = set()
for root, dirs, files in os.walk('.'):
    if any(x in root for x in ['node_modules', '.git', '.vscode', 'dist']):
        continue
    for file in files:
        if file.endswith(('.html', '.js')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                found = re.findall(r'https://(?:images|plus)\.unsplash\.com/[^\s"\'\)]+', content)
                for u in found:
                    base = u.split('?')[0]
                    urls.add((base, os.path.basename(path)))

for base, file in sorted(urls):
    print(f'{file} -> {base}')
