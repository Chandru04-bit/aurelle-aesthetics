import urllib.request

candidates = [
    'photo-1522337360788-8b13dee7a37e', # Skincare beauty
    'photo-1598440947619-2c35fc9aa908', # Facial aesthetic
    'photo-1608248597359-563229b389f4', # Serum bottle
    'photo-1508214751196-bcfd4ca60f91', # Woman portrait
    'photo-1524504388940-b1c1722653e1', # Model portrait
    'photo-1531746020798-e6953c6e8e04', # Portrait
    'photo-1507003211169-0a1dd7228f2d', # Male portrait
    'photo-1500648767791-00dcc994a43e', # Male portrait
    'photo-1560750588-73207b1ef5b8', # Skincare clinic
    'photo-1516549655169-df83a0774514', # Medical lab / clinic
    'photo-1617897903246-719242758050', # Cosmetic aesthetics
    'photo-1584515933487-779824d29309', # Doctor patient
    'photo-1629909613654-28e377c37b09', # Clinical room
    'photo-1583912267670-6575ad362e4a', # Clinic
    'photo-1579684385127-1ef15d508118', # Doctor stethoscope
    'photo-1631217868264-e5b90bb7e133', # Medical consultation
    'photo-1629909615184-74f495363b67', # Aesthetic treatment suite
    'photo-1612349317150-e413f6a5b16d', # Male doctor
    'photo-1559839734-2b71ea197ec2', # Female doctor
    'photo-1551836022-d5d88e9218df', # Nurse practitioner
    'photo-1573496359142-b8d87734a5a2', # Aesthetician
    'photo-1576091160399-112ba8d25d1d', # Medical consultation
    'photo-1576091160550-2173dba999ef', # Medical team
    'photo-1582750433449-648ed127bb54', # Medical doctor
    'photo-1576765608535-5f04d1e3f289'  # Skincare
]

print("Testing candidates...")
for pid in candidates:
    url = f"https://images.unsplash.com/{pid}?auto=format&fit=crop&w=800&q=80"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urllib.request.urlopen(req, timeout=4)
        print(f"200 OK: {pid}")
    except Exception as e:
        print(f"FAILED {pid}: {e}")
