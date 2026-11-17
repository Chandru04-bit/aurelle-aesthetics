import os, glob

# Check scripts and files that mentioned image downloads
history_files = glob.glob('scratch/*.py') + glob.glob('scripts/*.py')
for hf in history_files:
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    if 'unsplash' in c or 'photo-' in c:
        print(f"=== {hf} ===")
        for line in c.splitlines():
            if any(k in line for k in ['photo-', 'download', 'unsplash.com', 'candidate', 'targets', 'dest']):
                print("  ", line.strip())
