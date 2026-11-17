import os
from PIL import Image

scratch_imgs = []
for f in os.listdir('scratch'):
    if f.endswith(('.jpg', '.png', '.jpeg')):
        fp = os.path.join('scratch', f)
        try:
            with Image.open(fp) as im:
                scratch_imgs.append((f, im.size, im.format, os.path.getsize(fp)))
        except Exception as e:
            pass

print(f"Total images in scratch: {len(scratch_imgs)}")
for name, size, fmt, bsize in sorted(scratch_imgs, key=lambda x: -x[3])[:30]:
    print(f"  {name:30} {size[0]}x{size[1]} ({bsize/1024:.1f} KB)")
