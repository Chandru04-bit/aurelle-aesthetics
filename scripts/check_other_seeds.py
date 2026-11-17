with open('js/storage.js', 'r', encoding='utf-8') as f:
    c = f.read()

import re
print("Packages:", re.findall(r'SEED_PACKAGES\s*=\s*(\[.*?\]);', c, re.DOTALL))
print("Skincare:", re.findall(r'SEED_SKINCARE\s*=\s*(\[.*?\]);', c, re.DOTALL))
