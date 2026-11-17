import urllib.request

test_ids = [
    # Aesthetic / medical / injectables / lasers / skincare
    'photo-1512290900672-1f02e70e4e75',
    'photo-1570172619644-dfd03ed5d881',
    'photo-1616394584738-fc6e612e71b9',
    'photo-1516549655169-df83a0774514',
    'photo-1588776814546-1ffcf47267a5', # medical treatment
    'photo-1519494026892-80bbd2d6fd0d',
    'photo-1584467735815-f778f274e296', # doctor syringe injection
    'photo-1579684453423-f84349ef60b0', # medical lab
    'photo-1584515979956-d9f6e5d09982', # doctor consultation
    'photo-1584515933487-779824d29309', # doctor consultation
    'photo-1584467735871-8e85353a8413', # cosmetic syringe
    'photo-1583912267670-6575ad362e4a',
    'photo-1551076805-e1869033e561', # hospital surgery
    'photo-1584467735867-4297ae2ebcee', # medical equipment
    'photo-1576091160399-112ba8d25d1d',
    'photo-1576091160550-2173dba999ef',
    'photo-1532938911079-1b06ac7ceec7',
    'photo-1629909615184-74f495363b67',
    'photo-1629909613654-28e377c37b09',
    'photo-1507652313519-d4e9174996dd',
    'photo-1540555700478-4be289fbecef',
    'photo-1509967419530-da38b4704bc6',
    'photo-1556228720-195a672e8a03',
    'photo-1581594693702-fbdc51b2763b',
    'photo-1512496015851-a90fb38ba796',
    'photo-1527799820374-dcf8d9d4a388',
    'photo-1559839734-2b71ea197ec2',
    'photo-1551836022-d5d88e9218df',
    'photo-1622253692010-333f2da6031d',
    'photo-1573496359142-b8d87734a5a2',
    'photo-1544005313-94ddf0286df2',
    'photo-1494790108377-be9c29b29330',
    'photo-1517841905240-472988babdf9',
    'photo-1534528741775-53994a69daeb'
]

print("Scanning candidate IDs...")
for pid in test_ids:
    url = f"https://images.unsplash.com/{pid}?auto=format&fit=crop&w=400&q=80"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        r = urllib.request.urlopen(req, timeout=3)
        print(f"200: {pid}")
    except Exception as e:
        print(f"FAIL: {pid}: {e}")
