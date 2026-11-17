import urllib.request
import os

mapping = {
    # index.html
    'index_hero_main': './assets/images/hero/hero-home-consultation.jpg',
    'index_hero_accent': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    'index_treat_botox': 'https://plus.unsplash.com/premium_photo-1771265141291-d2374cc5d04b?auto=format&fit=crop&w=800&q=80',
    'index_treat_filler': 'https://plus.unsplash.com/premium_photo-1661769358914-1d33c22bd7ba?auto=format&fit=crop&w=800&q=80',
    'index_treat_rf': 'https://plus.unsplash.com/premium_photo-1661573297404-d558c113a7d8?auto=format&fit=crop&w=800&q=80',
    'index_treat_laser': 'https://plus.unsplash.com/premium_photo-1661573078797-2126237e4de7?auto=format&fit=crop&w=800&q=80',
    'index_treat_peel': './assets/images/contact/hero-contact-hd.jpg',
    'index_treat_hydra': 'https://plus.unsplash.com/premium_photo-1675502957609-25148d769841?auto=format&fit=crop&w=800&q=80',
    'index_spec_elena': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    'index_spec_sarah': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    'index_spec_marcus': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    'index_spec_chloe': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    'index_test_genevieve': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    'index_test_alexis': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    'index_test_rachel': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',

    # home-2.html
    'home2_hero_main': 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=80',
    'home2_hero_sec': 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80',
    'home2_disc_inj': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
    'home2_disc_cell': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    'home2_disc_laser': 'https://plus.unsplash.com/premium_photo-1661769523136-a6936ba1f519?auto=format&fit=crop&w=800&q=80',
    'home2_disc_derm': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    'home2_consult': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    'home2_step3': 'https://plus.unsplash.com/premium_photo-1661779386497-1f7b9ec4d8f3?auto=format&fit=crop&w=800&q=80',
    'home2_sanc_vip': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    'home2_sanc_recov': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    'home2_sanc_theater': '../assets/images/clinic/theater-clean-hd.jpg',
    'home2_cta': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',

    # about.html
    'about_hero_right': '../assets/images/about/hero-about-consultation.jpg',
    'about_narrative': 'https://plus.unsplash.com/premium_photo-1683134294916-473fc738750b?auto=format&fit=crop&w=1000&q=80',
    'about_fac_surgical': 'https://plus.unsplash.com/premium_photo-1673953510197-0950d951c6d9?auto=format&fit=crop&w=800&q=80',
    'about_fac_mapping': 'https://plus.unsplash.com/premium_photo-1661686292786-713ffdf08a9e?auto=format&fit=crop&w=800&q=80',
    'about_fac_laser': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    'about_spec_elena': 'https://images.unsplash.com/photo-1758691462954-e6fa5005474b?auto=format&fit=crop&w=700&q=80',
    'about_spec_sarah': 'https://plus.unsplash.com/premium_photo-1664475450083-5c9eef17a191?auto=format&fit=crop&w=700&q=80',
    'about_spec_marcus': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80',
    'about_spec_chloe': 'https://plus.unsplash.com/premium_photo-1661376764850-cd7f326b5a4d?auto=format&fit=crop&w=700&q=80',
    'about_bottom_cta': 'https://images.unsplash.com/photo-1758691461957-474a7686e388?auto=format&fit=crop&w=1200&q=80',

    # treatments.html
    'treat_hero_right': '../assets/images/treatments/hero-treatment-hd.jpg',
    'treat_cat_injectables': 'https://images.unsplash.com/photo-1746017062285-13c77e29fc25?auto=format&fit=crop&w=700&q=80',
    'treat_cat_laser': 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=700&q=80',
    'treat_cat_autologous': 'https://images.unsplash.com/photo-1761819920857-7edc5e808fd3?auto=format&fit=crop&w=700&q=80',
    'treat_cat_peels': '../assets/images/hero/hero-home-facial.jpg',
    'treat_bottom_cta': 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',

    # treatment-details.html
    'tdetails_page_hero_bg': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80',
    'tdetails_bottom_cta': '../assets/images/providers/hero-specialists-hd.jpg',

    # providers.html
    'prov_hero_right': '../assets/images/providers/hero-specialists-team.jpg',
    'prov_bottom_cta': 'https://plus.unsplash.com/premium_photo-1661779396815-56fe1ca9877c?auto=format&fit=crop&w=1200&q=80',

    # contact.html
    'contact_hero_right': 'https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?auto=format&fit=crop&w=1200&q=80',
    'contact_bottom_cta': 'https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?auto=format&fit=crop&w=1200&q=80',

    # booking.html
    'booking_hero_bg': 'https://images.unsplash.com/photo-1794202219320-9e19cafaefe2?auto=format&fit=crop&w=2000&q=80',
    'booking_bottom_guidance': 'https://plus.unsplash.com/premium_photo-1682130168752-185b6d96268a?auto=format&fit=crop&w=1200&q=80',

    # dashboard.html
    'dash_user_avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'dash_bottom_vip': 'https://plus.unsplash.com/premium_photo-1663100126765-1ad02ca4ff69?auto=format&fit=crop&w=1200&q=80',

    # privacy.html
    'priv_hero_bg': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=2000&q=80',

    # terms.html
    'terms_hero_bg': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=80',

    # sitemap.html
    'sitemap_hero_bg': 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=2000&q=80',

    # storage.js hero images (treatment details dynamic header visual)
    'seed_botox_hero': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80',
    'seed_filler_hero': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1400&q=80',
    'seed_laser_hero': 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1400&q=80', # wait, check treat_cat_laser!
    'seed_rf_hero': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1400&q=80',
    'seed_peel_hero': 'https://plus.unsplash.com/premium_photo-1664299134229-8a98c99de63b?auto=format&fit=crop&w=1400&q=80',
    'seed_hydra_hero': 'https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f?auto=format&fit=crop&w=1400&q=80',
    'seed_ipl_hero': 'https://plus.unsplash.com/premium_photo-1702599058912-3874997f5991?auto=format&fit=crop&w=1400&q=80',
    'seed_prp_hero': 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1400&q=80',
    'seed_bio_hero': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80',

    # storage.js treatment card images (for treatments.html grid)
    'seed_botox_card': 'https://plus.unsplash.com/premium_photo-1771265141291-d2374cc5d04b?auto=format&fit=crop&w=900&q=80',
    'seed_filler_card': 'https://plus.unsplash.com/premium_photo-1661769358914-1d33c22bd7ba?auto=format&fit=crop&w=900&q=80',
    'seed_laser_card': 'https://plus.unsplash.com/premium_photo-1661573078797-2126237e4de7?auto=format&fit=crop&w=900&q=80',
    'seed_rf_card': 'https://plus.unsplash.com/premium_photo-1661573297404-d558c113a7d8?auto=format&fit=crop&w=900&q=80',
    'seed_peel_card': '../assets/images/contact/hero-contact-hd.jpg',
    'seed_hydra_card': 'https://plus.unsplash.com/premium_photo-1675502957609-25148d769841?auto=format&fit=crop&w=900&q=80',
    'seed_ipl_card': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80',
    'seed_prp_card': 'https://plus.unsplash.com/premium_photo-1674841252366-162fc9b8f983?auto=format&fit=crop&w=900&q=80',
    'seed_bio_card': 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80'
}

def clean(u):
    return u.split('?')[0].replace('../', '').replace('./', '')

print(f"Total entries in map: {len(mapping)}")
seen = {}
duplicates = []
for k, v in mapping.items():
    c = clean(v)
    if c in seen:
        duplicates.append((k, seen[c], c))
    else:
        seen[c] = k

if duplicates:
    print(f"WARNING: {len(duplicates)} duplicates found:")
    for d in duplicates:
        print(f"  {d[0]} and {d[1]} both use {d[2]}")
else:
    print(">>> SUCCESS: ZERO DUPLICATES! ALL 74 IMAGE ASSIGNMENTS ARE 100% GLOBALLY UNIQUE! <<<")
