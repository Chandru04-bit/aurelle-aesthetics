import os, hashlib

with open('assets/images/providers/hero-specialists-hd.jpg', 'rb') as f:
    h1 = hashlib.sha256(f.read()).hexdigest()

print("hero-specialists-hd.jpg hash:", h1)
