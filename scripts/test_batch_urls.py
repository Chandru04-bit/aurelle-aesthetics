import urllib.request

test_urls = [
    # Aesthetic clinics / treatment rooms
    ('clinic_suite_1', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80'),
    ('clinic_suite_2', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80'),
    ('clinic_suite_3', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80'),
    ('clinic_suite_4', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80'),
    ('clinic_suite_5', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80'),
    ('clinic_suite_6', 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80'),
    
    # Skincare / procedures
    ('skincare_glow_1', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80'),
    ('skincare_glow_2', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80'),
    ('skincare_glow_3', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80'),
    ('skincare_glow_4', 'https://images.unsplash.com/photo-1512290900672-1f02e70e4e75?auto=format&fit=crop&w=1200&q=80'),
    ('skincare_glow_5', 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80'),

    # Medical consultations
    ('consult_doc_1', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'),
    ('consult_doc_2', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80'),
    ('consult_doc_3', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80'),
    ('consult_doc_4', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80'),
    ('consult_doc_5', 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80')
]

print("Checking test URLs...")
for name, url in test_urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urllib.request.urlopen(req, timeout=4)
        print(f"200 OK: {name}")
    except Exception as e:
        print(f"FAIL: {name}: {e}")
