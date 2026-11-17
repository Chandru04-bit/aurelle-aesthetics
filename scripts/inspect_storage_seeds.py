import re

with open('js/storage.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find SEED_TREATMENTS items
print("=== SEED_TREATMENTS ===")
treatments = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"].*?name:\s*[\'"]([^\'"]+)[\'"].*?image:\s*[\'"]([^\'"]+)[\'"].*?heroImage:\s*[\'"]([^\'"]+)[\'"]', content, re.DOTALL)
for t in treatments:
    print(f"ID: {t[0]}\n  Name: {t[1]}\n  Image: {t[2]}\n  HeroImage: {t[3]}\n")

print("=== SEED_PROVIDERS ===")
providers = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"].*?name:\s*[\'"]([^\'"]+)[\'"].*?image:\s*[\'"]([^\'"]+)[\'"]', content, re.DOTALL)
for p in providers:
    print(f"ID: {p[0]}\n  Name: {p[1]}\n  Image: {p[2]}\n")

print("=== SEED_USER ===")
users = re.findall(r'avatar:\s*[\'"]([^\'"]+)[\'"]', content)
for u in users:
    print(f"User Avatar: {u}\n")
