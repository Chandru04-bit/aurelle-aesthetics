import os, hashlib

def get_hash(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()

asset_hashes = {}
for root, dirs, files in os.walk('assets'):
    for f in files:
        if f.endswith(('.jpg', '.jpeg', '.png', '.webp')):
            fp = os.path.join(root, f).replace('\\', '/')
            h = get_hash(fp)
            size = os.path.getsize(fp)
            if h in asset_hashes:
                print(f"IDENTICAL ASSET FILES: {fp} and {asset_hashes[h]}")
            else:
                asset_hashes[h] = (fp, size)

print(f"Total unique images in assets: {len(asset_hashes)}")
for h, (fp, size) in asset_hashes.items():
    print(f"  {fp} ({size} bytes, hash: {h[:12]})")
