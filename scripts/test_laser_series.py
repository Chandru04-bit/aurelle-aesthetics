import urllib.request

test_urls = [
    # Laser / dermatology / clinic
    ('laser1', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b'),
    ('laser2', 'https://plus.unsplash.com/premium_photo-1661769523136-a6936ba1f519'),
    ('laser3', 'https://plus.unsplash.com/premium_photo-1661769524021-e737c3858c97'),
    ('laser4', 'https://plus.unsplash.com/premium_photo-1661769523125-9c5950e32607'),
    ('laser5', 'https://plus.unsplash.com/premium_photo-1661769523145-219bc04279ea'),
    ('laser6', 'https://plus.unsplash.com/premium_photo-1661769524185-132d733158c3'),
    ('laser7', 'https://plus.unsplash.com/premium_photo-1661769524251-5b7f1ecae973'),
    ('laser8', 'https://plus.unsplash.com/premium_photo-1661769523111-e6c1e9563214'),
    ('laser9', 'https://plus.unsplash.com/premium_photo-1661769523101-92e105e1a2f6'),
    ('laser10', 'https://plus.unsplash.com/premium_photo-1661769523118-2e0e417e923e')
]

for name, u in test_urls:
    url = f"{u}?auto=format&fit=crop&w=800&q=80"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        urllib.request.urlopen(req, timeout=3)
        print(f"200 OK: {name} -> {u}")
    except Exception as e:
        print(f"FAIL: {name}: {e}")
