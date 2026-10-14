/**
 * Aurelle Aesthetics - Central Storage & Demo Data Layer
 * Handles mock data persistence in localStorage for demonstration purposes.
 * Note: No sensitive health data or plaintext passwords are saved.
 */

const STORAGE_KEYS = {
  THEME: 'aurelle_theme',
  USER: 'aurelle_current_user',
  USERS_LIST: 'aurelle_registered_users',
  APPOINTMENTS: 'aurelle_appointments',
  PACKAGES: 'aurelle_packages',
  NOTIFICATIONS: 'aurelle_notifications',
  SKINCARE: 'aurelle_skincare_routine',
  INQUIRIES: 'aurelle_contact_inquiries'
};

// Seed Treatments Data
const SEED_TREATMENTS = [
  {
    id: 'botox-wrinkle-relaxers',
    name: 'Botox & Wrinkle Relaxers',
    category: 'injectables',
    categoryName: 'Injectables & Relaxers',
    tagline: 'Precision Neuromodulator Smoothing',
    shortDescription: 'Subtle, physician-administered neuromodulators to soften expression lines, smooth crow’s feet, and elevate facial contours without stiffness.',
    fullDescription: 'Our signature neurotoxin treatments utilize FDA-approved neuromodulators (Botox®, Dysport®, and Xeomin®) placed with millimeter-level anatomical precision. We prioritize the "undetectable refresh" philosophy—smoothing dynamic expression lines while preserving your natural facial expressions and emotional warmth.',
    price: 350,
    priceFormatted: '₹350 – ₹650',
    duration: '30 mins',
    downtime: 'None (Zero Downtime)',
    discomfort: 'Minimal (1/5)',
    resultsLongevity: '3 to 5 Months',
    image: 'https://plus.unsplash.com/premium_photo-1771265141291-d2374cc5d04b?auto=format&fit=crop&w=900&q=80',
    heroImage: 'https://plus.unsplash.com/premium_photo-1771265141291-d2374cc5d04b?auto=format&fit=crop&w=1400&q=80',
    targetAreas: ['Forehead Lines', 'Glabellar Frown Lines (11s)', 'Crow’s Feet', 'Masseter / Jaw Slimming', 'Lip Flip', 'Neck Bands'],
    conditionsTreated: [
      'Dynamic Forehead Lines',
      'Glabellar Frown Lines (11s)',
      'Lateral Canthal Crow’s Feet',
      'Masseter Hypertrophy / Teeth Grinding',
      'Gummy Smile & Lip Inversion',
      'Platysmal Neck Bands'
    ],
    procedureOverview: 'Targeted intramuscular micro-injections using ultra-fine 32-gauge medical needles. Neuromodulators selectively block acetylcholine signaling at the neuromuscular junction, softening tension without freezing natural expression.',
    expectedOutcomes: 'Initial relaxation visible in 3–4 days; full smoothing and contour refinement peaks at days 10–14. Results endure 3 to 5 months with preserved natural emotional expressiveness.',
    bestFor: 'Clients seeking subtle upper-face smoothing, preventative wrinkle protection, and non-surgical jawline slimming.',
    benefits: [
      'Preserves natural facial dynamics while eliminating stubborn tension lines',
      'Prevents deeper static line formation over time',
      'Provides subtle brow elevation and refreshed ocular opening',
      'Reduces tension headaches and teeth grinding via masseter injection'
    ],
    preparation: [
      'Avoid blood-thinning supplements (Fish oil, Ginkgo, Vitamin E) for 5 days prior',
      'Avoid alcoholic beverages for 24 hours prior to appointment',
      'Arrive with a clean, makeup-free face if possible',
      'Notify your provider of any active neurological conditions'
    ],
    aftercare: [
      'Remain upright for at least 4 hours post-treatment',
      'Avoid strenuous exercise, saunas, and intense heat for 24 hours',
      'Gently exercise treated facial muscles for 1 hour post-procedure',
      'Do not rub, massage, or apply firm pressure to injected areas for 48 hours'
    ],
    faqs: [
      {
        q: 'Will I look frozen or unnatural?',
        a: 'Never at Aurelle. Our master practitioners specialize in micro-dosing and precise anatomical targeting designed to soften lines while keeping full emotive capability.'
      },
      {
        q: 'When will I see the final results?',
        a: 'Initial softening begins around day 3–4, with full therapeutic and aesthetic results peaking at day 10–14.'
      },
      {
        q: 'How often should I schedule maintenance?',
        a: 'Most clients maintain their radiant, smoothed results with treatments scheduled every 3 to 4 months.'
      }
    ]
  },
  {
    id: 'dermal-fillers',
    name: 'Sculpt & Contour Dermal Fillers',
    category: 'injectables',
    categoryName: 'Injectables & Relaxers',
    tagline: 'Hyaluronic Acid Volumizing & Balancing',
    shortDescription: 'Bespoke hyaluronic acid dermal fillers designed to restore mid-face volume, refine jawline definition, and create naturally pillowy lips.',
    fullDescription: 'Using premier resilient hyaluronic acid portfolios (Juvéderm® and Restylane®), our medical providers restore lost subcutaneous volume, balance facial proportions, and contour bone structure with an artistic eye for harmony and grace.',
    price: 650,
    priceFormatted: '₹650 – ₹1,200 / syringe',
    duration: '45 mins',
    downtime: '1–2 days mild swelling',
    discomfort: 'Mild with topical numbing (2/5)',
    resultsLongevity: '9 to 18 Months',
    image: 'https://plus.unsplash.com/premium_photo-1661769358914-1d33c22bd7ba?auto=format&fit=crop&w=900&q=80',
    heroImage: 'https://plus.unsplash.com/premium_photo-1661769358914-1d33c22bd7ba?auto=format&fit=crop&w=1400&q=80',
    targetAreas: ['Cheekbone Architecture', 'Tear Trough Hollowing', 'Nasolabial Folds', 'Marionette Lines', 'Russian Lip Sculpting', 'Jawline & Chin'],
    conditionsTreated: [
      'Mid-Face Volume Loss & Cheek Flattening',
      'Hollow Tear Troughs & Tired Under-Eyes',
      'Deep Nasolabial Folds & Marionette Lines',
      'Thinning, Asymmetric, or Dehydrated Lips',
      'Weak or Receding Chin & Jaw Profile',
      'Structural Asymmetry from Aging'
    ],
    procedureOverview: 'Anatomically mapped subdermal placement using precision blunt-tip micro-cannulas and fine micro-needles. Biocompatible hyaluronic acid gel integrates seamlessly into soft tissue planes with ultrasound vascular safety verification.',
    expectedOutcomes: 'Immediate structural lift, restored natural volume, and youthful light reflection. Final tissue integration and soft hydration settle smoothly over 10 to 14 days, lasting 9 to 18 months.',
    bestFor: 'Clients desiring structural facial restoration, restored bone projection, and naturally defined, pillowy lips without surgery.',
    benefits: [
      'Immediate structural restoration and youthful projection',
      'High-grade biocompatible Hyaluronic Acid naturally integrates with tissue',
      'Reversible and customizable with enzyme adjustments if desired',
      'Stimulates endogenous hydration within deeper dermal layers'
    ],
    preparation: [
      'Discontinue NSAIDs, aspirin, and fish oils 7 days prior to prevent bruising',
      'Begin Arnica Montana pellets 3 days before procedure for bruise prevention',
      'Avoid dental procedures 2 weeks before and after filler appointments',
      'Ensure you have no active cold sores or skin infections'
    ],
    aftercare: [
      'Apply cool compresses gently for 10 minutes every hour on day one',
      'Sleep elevated on your back for 48 hours to minimize asymmetric swelling',
      'Avoid rigorous exercise and alcohol for 48 hours',
      'Schedule a complimentary two-week refinement check-in'
    ],
    faqs: [
      {
        q: 'Does getting dermal filler hurt?',
        a: 'We apply a compounded clinical numbing cream for 20 minutes prior, and all our fillers contain lidocaine for continuous comfort during the injection.'
      },
      {
        q: 'Can fillers be reversed if I am unsatisfied?',
        a: 'Yes. All hyaluronic acid fillers used at Aurelle can be safely and comfortably dissolved with the targeted enzyme hyaluronidase.'
      }
    ]
  },
  {
    id: 'laser-skin-resurfacing',
    name: 'Fractional Dual-Wave Laser Resurfacing',
    category: 'laser-rf',
    categoryName: 'Laser & RF Technology',
    tagline: 'Advanced Photothermal Skin Renewal',
    shortDescription: 'Targeted fractional laser therapy designed to erase stubborn hyperpigmentation, smooth deep acne scars, and stimulate fresh collagen.',
    fullDescription: 'Our non-ablative and hybrid fractional laser delivers microscopic thermal columns deep into the dermis without harming the epidermal shield. It clears sun damage, age spots, and fine textural irregularities while triggering robust collagen synthesis.',
    price: 750,
    priceFormatted: '₹750 – ₹1,400',
    duration: '60 mins',
    downtime: '2–4 days mild redness',
    discomfort: 'Moderate (2.5/5)',
    resultsLongevity: 'Long-lasting (12+ Months with SPF)',
    image: 'https://plus.unsplash.com/premium_photo-1661573078797-2126237e4de7?auto=format&fit=crop&w=900&q=80',
    heroImage: 'https://plus.unsplash.com/premium_photo-1661573078797-2126237e4de7?auto=format&fit=crop&w=1400&q=80',
    targetAreas: ['Full Face', 'Neck & Décolletage', 'Hands', 'Acne Scar Zones'],
    conditionsTreated: [
      'Stubborn Solar Lentigines & Sun Spots',
      'Atrophic Acne Scarring & Pitted Texture',
      'Enlarged Facial Pores & Oil Congestion',
      'Melasma & Hormonal Dyschromia',
      'Fine Perioral & Periorbital Crepiness',
      'Uneven Rough Skin Texture'
    ],
    procedureOverview: 'Non-ablative and hybrid fractional photothermal therapy delivers microscopic thermal columns deep into dermal layers, triggering coagulative renewal while leaving surrounding skin intact for rapid healing.',
    expectedOutcomes: 'Micro-exfoliation resolves within 4–6 days, revealing noticeably luminous, refined clarity. Dermal collagen continues remodeling and tightening over 3 to 6 months.',
    bestFor: 'Clients seeking clinical correction for long-standing sun damage, pitted acne scarring, and rough textural dullness.',
    benefits: [
      'Visibly reduces stubborn sun spots, melasma, and age-related dyschromia',
      'Rebuilds dermal elasticity for firmer, tighter pore architecture',
      'Smooths uneven pitted scarring and stubborn micro-crepiness',
      'Even-toned luminous skin clarity that lasts'
    ],
    preparation: [
      'Strictly avoid direct sun exposure and tanning beds for 3 weeks prior',
      'Discontinue retinoids, AHAs/BHAs, and active acids 5 days prior',
      'Do not perform waxing or chemical peels within 14 days of appointment',
      'Take prescribed antiviral prophylaxis if prone to facial cold sores'
    ],
    aftercare: [
      'Cleanse solely with gentle lukewarm water and gentle cream cleanser',
      'Apply prescribed epidermal barrier repair balm generously throughout the day',
      'Wear pure physical zinc oxide SPF 50+ continuously without exception',
      'Do not pick, peel, or scrub exfoliating skin flakes'
    ],
    faqs: [
      {
        q: 'How many sessions will I need for optimal results?',
        a: 'A series of 3 sessions spaced 4 weeks apart yields the most transformative clarity and collagen density.'
      }
    ]
  },
  {
    id: 'morpheus8-rejuvenation',
    name: 'RF Microneedling Skin Tightening',
    category: 'laser-rf',
    categoryName: 'Laser & RF Technology',
    tagline: 'Deep Subdermal Remodeling & Adipose Sculpting',
    shortDescription: 'Combines gold-plated micro-pins with focused radiofrequency energy to remodel subdermal fat and tighten sagging facial contours.',
    fullDescription: 'The pinnacle of non-surgical skin remodeling. By delivering fractional radiofrequency energy through insulated micro-pins up to 4mm into the subdermal tissue, Morpheus8 reorganizes collagen scaffolds, tightens the lower face and jawline, and refines skin texture.',
    price: 850,
    priceFormatted: '₹850 – ₹2,200 (Series Available)',
    duration: '60 mins',
    downtime: '2–3 days mild erythema',
    discomfort: 'Tolerable with compounded numbing (3/5)',
    resultsLongevity: '18 to 24 Months',
    image: 'https://plus.unsplash.com/premium_photo-1661573297404-d558c113a7d8?auto=format&fit=crop&w=900&q=80',
    heroImage: 'https://plus.unsplash.com/premium_photo-1661573297404-d558c113a7d8?auto=format&fit=crop&w=1400&q=80',
    targetAreas: ['Lower Face & Jowls', 'Submental / Double Chin Area', 'Neck & Chest', 'Periorbital Fine Lines'],
    conditionsTreated: [
      'Lower Face & Jowl Laxity',
      'Submental Fullness & Double Chin Sagging',
      'Crepey Neck & Décolletage Skin',
      'Deep Surgical & Acne Scars',
      'Enlarged Pore Architecture',
      'Loss of Dermal Firmness & Elasticity'
    ],
    procedureOverview: 'Deep subdermal fractional remodeling combining gold-coated medical micro-pins with focused radiofrequency thermal energy up to 4mm depth to coagulate fat and stimulate intense neocollagenesis.',
    expectedOutcomes: 'Visible skin tightening and texture refinement begin within 3 weeks; structural dermal remodeling and jawline contouring peak at months 3 through 6. Results endure 18 to 24 months.',
    bestFor: 'Clients seeking noticeable non-surgical skin lifting, subdermal adipose remodeling, and severe textural tightening.',
    benefits: [
      'Tightens mild-to-moderate laxity in jowls and submental regions',
      'Dramatically reduces enlarged pore diameters and deep texture flaws',
      'Stimulates triple-action neocollagenesis and elastin proliferation',
      'Safe on all Fitzpatrick skin tones'
    ],
    preparation: [
      'Stay thoroughly hydrated in the 48 hours leading up to your session',
      'Avoid blood thinners, ibuprofen, and alcohol 48 hours prior',
      'Discontinue active exfoliants and retinol 5 days prior'
    ],
    aftercare: [
      'Avoid makeup for 48 hours to allow micro-channels to seal cleanly',
      'Keep skin hydrated with sterile hyaluronic acid serum and soothing creams',
      'Refrain from hot showers, intense workouts, and steam rooms for 3 days'
    ],
    faqs: [
      {
        q: 'Is RF Microneedling painful?',
        a: 'We apply a medical-grade topical anesthetic cream for 45 minutes before treatment to ensure maximum comfort throughout the session.'
      }
    ]
  },
  {
    id: 'advanced-chemical-peel',
    name: 'Medical-Grade TCA & Jessner Glow Peel',
    category: 'peels-facials',
    categoryName: 'Peels & Medical Facials',
    tagline: 'Deep Cellular Exfoliation & Clarifying Radiance',
    shortDescription: 'Customizable medical acid peel formulas that dissolve dull dead cells, unclog congested pores, and reveal glass-smooth skin.',
    fullDescription: 'Customized to your exact skin type, our physician-formulated peels combine Trichloracetic Acid (TCA), Lactic Acid, Salicylic Acid, and Kojic Brighteners. This accelerated exfoliation triggers healthy cellular regeneration and illuminates dull, congested complexions.',
    price: 280,
    priceFormatted: '₹280 – ₹450',
    duration: '45 mins',
    downtime: '3–5 days light flaking',
    discomfort: 'Mild tingling (1.5/5)',
    resultsLongevity: '2 to 3 Months per Peel',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=80',
    targetAreas: ['Full Face', 'Chest / Décolletage', 'Upper Back / Shoulders'],
    conditionsTreated: [
      'Cellular Keratin Buildup & Chronic Dullness',
      'Post-Inflammatory Hyperpigmentation & Blemish Marks',
      'Active Follicular Congestion & Blackheads',
      'Superficial Fine Textural Lines',
      'Uneven Complexion & Solar Discoloration',
      'Excess Sebum Production'
    ],
    procedureOverview: 'Physician-compounded multi-acid solution (TCA, Lactic, Salicylic, and Kojic acids) applied systematically to dissolve cellular desmosomes, accelerating shedding of sun-damaged surface layers.',
    expectedOutcomes: 'Light uniform flaking sloughs naturally on days 3–6, revealing clarified, high-reflectance glass skin with balanced oil production and reduced pigmentation lasting 2 to 3 months.',
    bestFor: 'Clients seeking deep cellular turnover, pore decongestion, and radiant tone renewal with minimal social downtime.',
    benefits: [
      'Unveils luminous, high-clarity skin texture',
      'Fades stubborn post-inflammatory hyperpigmentation and blemish marks',
      'Normalizes excess sebum production and purges congested follicles',
      'Enhances topical skincare absorption by up to 300%'
    ],
    preparation: [
      'Discontinue all exfoliants, retinoids, and benzoyl peroxide 4 days prior',
      'Avoid waxing, threading, or depilatory creams on the face for 1 week prior'
    ],
    aftercare: [
      'Do not pull, scratch, or peel flaking skin; let it slough naturally',
      'Apply soothing peptide moisturizer morning and evening',
      'Strict mineral SPF 50 reapplication every 2 hours when exposed to light'
    ],
    faqs: [
      {
        q: 'Will my face peel heavily?',
        a: 'Depending on the custom peel strength chosen, peeling ranges from microscopic dryness to light flake peeling over days 3 through 6.'
      }
    ]
  },
  {
    id: 'aurelle-signature-facial',
    name: 'Aurelle Triple-Infusion Hydra & Oxygen Facial',
    category: 'peels-facials',
    categoryName: 'Peels & Medical Facials',
    tagline: 'Vortex Cleansing, Peptide Infusion & Cryo-Sculpt',
    shortDescription: 'A multi-step medical glow treatment: deep vortex suction, antioxidant infusion, lymphatic drainage, and cryo-firming for red-carpet luminosity.',
    fullDescription: 'The ultimate luxury clinical facial. Combines hydrodynamic vortex pore extraction, pressurized hyperbaric oxygen infusion with copper peptides, microcurrent muscle lifting, and calming LED phototherapy. Leaves the skin plump, deeply hydrated, and glowing.',
    price: 220,
    priceFormatted: '₹220 – ₹350',
    duration: '60 mins',
    downtime: 'Zero (Immediate Red-Carpet Glow)',
    discomfort: 'Completely relaxing (0/5)',
    resultsLongevity: '3 to 4 Weeks',
    image: 'https://plus.unsplash.com/premium_photo-1675502957609-25148d769841?auto=format&fit=crop&w=900&q=80',
    heroImage: 'https://plus.unsplash.com/premium_photo-1675502957609-25148d769841?auto=format&fit=crop&w=1400&q=80',
    targetAreas: ['Full Face', 'Under-eye Area', 'Neck & Jawline'],
    conditionsTreated: [
      'Acute Dehydration & Parched Moisture Barrier',
      'Clogged Pores, Sebum Plugs & Comedones',
      'Facial Puffiness & Lymphatic Sluggishness',
      'Environmental Pollution & Free-Radical Oxidation',
      'Fatigued, Stressed Pre-Event Complexion',
      'Superficial Dryness Lines'
    ],
    procedureOverview: 'A multi-stage clinical facial utilizing hydrodynamic vortex suction to extract impurities, followed by pressurized hyperbaric oxygen peptide delivery, targeted microcurrent lifting, and medical LED light therapy.',
    expectedOutcomes: 'Instant red-carpet glow, plumped hydration barrier, calmed inflammation, and sculpted contours visible immediately upon completion with zero downtime.',
    bestFor: 'Anyone desiring immediate luminous radiance before events, weddings, or as a monthly cellular maintenance protocol.',
    benefits: [
      'Painless blackhead and sebum extraction via vortex fluidics',
      'Instant plumping of fine dehydration lines',
      'Sculpted facial contouring via gentle lymphatic drainage',
      'Zero downtime—ideal 24 hours before major events or weddings'
    ],
    preparation: [
      'No special preparation required—come as you are and enjoy the relaxation.'
    ],
    aftercare: [
      'Leave active serums on skin overnight without washing for prolonged hydration',
      'Keep hydrated with 8+ glasses of water to enhance cellular plumpness'
    ],
    faqs: [
      {
        q: 'Can I wear makeup right after my facial?',
        a: 'We recommend enjoying your bare radiant glow for the remainder of the day, but clean mineral makeup may be applied immediately if desired.'
      }
    ]
  },
  {
    id: 'ipl-photofacial',
    name: 'Precision IPL Photofacial Rejuvenation',
    category: 'laser-rf',
    categoryName: 'Laser & RF Technology',
    tagline: 'High-Peak Light Therapy for Redness & Pigment',
    shortDescription: 'Advanced intense pulsed light targeting broken capillaries, rosacea redness, and sun freckles to produce an even, glass-like complexion.',
    fullDescription: 'Using state-of-the-art broad-spectrum pulsed light, this treatment selectively targets melanin deposits and hemoglobin vessels. Broken capillaries and sun spots absorb the light energy and are naturally cleared by your immune system.',
    price: 450,
    priceFormatted: '₹450 – ₹800',
    duration: '45 mins',
    downtime: 'None (Mild transient blush)',
    discomfort: 'Mild snap sensation (1.5/5)',
    resultsLongevity: '6 to 12 Months with Sunscreen',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80',
    heroImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1400&q=80',
    targetAreas: ['Cheeks & Nose', 'Full Face', 'Chest / Décolletage', 'Shoulders'],
    conditionsTreated: [
      'Facial Erythema & Chronic Rosacea Redness',
      'Telangiectasias (Broken Facial Capillaries)',
      'Solar Lentigines & Freckles',
      'Poikiloderma of Civatte on Neck & Décolletage',
      'Ruddy Vascular Flushing',
      'Early Photodamage & Keratosis'
    ],
    procedureOverview: 'Broad-spectrum intense pulsed light delivers high-peak energy filtered specifically to target oxyhemoglobin in capillaries and melanin in hyperpigmented lesions, coagulating targeted cells while preserving epidermal integrity.',
    expectedOutcomes: 'Vascular redness diminishes within 48 hours; pigmented spots darken into fine coffee grounds that slough naturally within 5 to 7 days, leaving a clearer, uniform tone.',
    bestFor: 'Clients struggling with persistent facial flushing, broken vessels, and accumulated sun freckling on face, neck, and chest.',
    benefits: [
      'Eliminates visible red vessels, cherry angiomas, and persistent flushing',
      'Lifts sun spots and coffee-ground pigmentation',
      'Stimulates superficial collagen fibers for enhanced skin tightness',
      'Rapid treatment with minimal aftercare hurdles'
    ],
    preparation: [
      'Avoid sun exposure and self-tanning lotions for 4 weeks before treatment',
      'Avoid photosensitizing medications (e.g., doxycycline) prior to appointment'
    ],
    aftercare: [
      'Pigmented spots will darken ("coffee ground" appearance) and naturally flake off in 5-7 days',
      'Avoid hot tubs, intense saunas, and hot showers for 48 hours'
    ],
    faqs: [
      {
        q: 'How many sessions are recommended?',
        a: 'A protocol of 2 to 3 sessions scheduled 3–4 weeks apart delivers optimal vessel reduction and pigment clearing.'
      }
    ]
  },
  {
    id: 'prp-microneedling',
    name: 'PRP Cellular Glow (Vampire Facial)',
    category: 'skin-rejuvenation',
    categoryName: 'Skin Rejuvenation',
    tagline: 'Autologous Growth Factor Bio-Stimulation',
    shortDescription: 'Harnesses your body’s own concentrated blood platelets to awaken cellular regeneration, boost collagen, and smooth fine lines.',
    fullDescription: 'A small sample of your blood is spun in a medical centrifuge to isolate concentrated platelet-rich plasma (PRP) rich in growth factors. This liquid gold is micro-infused into the dermis to turbocharge natural repair mechanisms.',
    price: 690,
    priceFormatted: '₹690 – ₹1,100',
    duration: '75 mins',
    downtime: '24–36 hours mild pinkness',
    discomfort: 'Mild with topical anesthetic (2/5)',
    resultsLongevity: '12+ Months',
    image: 'https://plus.unsplash.com/premium_photo-1674841252366-162fc9b8f983?auto=format&fit=crop&w=900&q=80',
    heroImage: 'https://plus.unsplash.com/premium_photo-1674841252366-162fc9b8f983?auto=format&fit=crop&w=1400&q=80',
    targetAreas: ['Full Face', 'Under-eye Hollows', 'Neck & Chest', 'Hair Restoration Zones'],
    conditionsTreated: [
      'Delicate Under-Eye Crepiness & Dark Circles',
      'Loss of Dermal Elasticity & Skin Thinning',
      'Superficial Facial Fine Lines',
      'Uneven Texture & Post-Acne Pitting',
      'Loss of Skin Bounce & Radiance',
      'Early Hairline Thinning & Scalp Health'
    ],
    procedureOverview: 'Autologous platelet-rich plasma is isolated from your blood via a certified medical centrifuge, concentrating bio-active growth factors. The PRP is micro-channeled into the dermis using automated sterile microneedling.',
    expectedOutcomes: 'Accelerated cellular repair initiates immediately; skin firmness, under-eye density, and radiant collagen matrix improve progressively over 4 to 12 weeks, lasting over 12 months.',
    bestFor: 'Clients seeking 100% natural, autologous bio-stimulation and under-eye skin thickening without synthetic substances.',
    benefits: [
      '100% natural and biocompatible autologous treatment',
      'Significantly thickens delicate under-eye skin and fades dark circles',
      'Accelerates healing and triples collagen induction compared to microneedling alone',
      'Restores youthful bounce, firmness, and radiance'
    ],
    preparation: [
      'Drink at least 64oz of water the day before to facilitate comfortable blood draw',
      'Avoid anti-inflammatory medications (NSAIDs) for 1 week prior'
    ],
    aftercare: [
      'Allow PRP to remain on the skin for at least 6 hours post-treatment',
      'Use only gentle sterile hyaluronic cleanser for 48 hours'
    ],
    faqs: [
      {
        q: 'Is PRP safe?',
        a: 'Because PRP is derived entirely from your own blood, there is virtually zero risk of allergic reaction or cross-reactivity.'
      }
    ]
  }
];

// Seed Providers Data (Clearly labeled demo credentials)
const SEED_PROVIDERS = [
  {
    id: 'dr-elena-vance',
    name: 'Dr. Elena Vance, MD',
    role: 'Medical Director & Board-Certified Aesthetic Physician (Demo)',
    department: 'Physicians & Medical Direction',
    qualifications: 'MD – Johns Hopkins University School of Medicine (Demo)',
    degrees: 'Board-Certified Aesthetic Medicine (ABAM), AMA Fellow (Demo)',
    specialty: 'Master Facial Balancing & Liquid Lifting',
    experience: '14+ Years Clinical Aesthetics Experience',
    bio: 'Dr. Vance completed her medical training at Johns Hopkins and dedicated her career to non-surgical facial rejuvenation. Known for her mathematical eye for facial symmetry and restraint, she is sought after for natural, undetectable neurotoxin and contouring transformations.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'provider-img-vance',
    specialties: ['Full-Face Balancing', 'Master Neurotoxins', 'Tear Trough Fillers', 'Facial Architecture'],
    boardCertifications: [
      'American Board of Aesthetic Medicine (ABAM)',
      'American College of Physicians (ACP)',
      'International Fellowship in Advanced Facial Aesthetics'
    ],
    clinicalExpertise: [
      'Millimeter Precision Neurotoxins',
      'Full-Face Structural Harmonization',
      'Ultrasound-Guided Cannula Delivery',
      'Micro-Dose Facial Relaxation'
    ],
    education: 'MD – Johns Hopkins University; Residency – Internal Medicine & Dermatologic Surgery',
    patientPhilosophy: '"True aesthetics should never proclaim itself. We aim for undetectable rejuvenation where others notice only your radiant vitality, never the syringe."',
    languages: ['English', 'French'],
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    rating: 4.98,
    reviewsCount: 312
  },
  {
    id: 'sarah-lin-np',
    name: 'Sarah Lin, FNP-C',
    role: 'Senior Aesthetic Nurse Practitioner (Demo)',
    department: 'Nurse Practitioners & Injectable Aesthetics',
    qualifications: 'MSN, FNP-C – Columbia University School of Nursing (Demo)',
    degrees: 'Certified Master Aesthetic Nurse Practitioner, ISPAN Member (Demo)',
    specialty: 'Lip Architecture & Biostimulatory Injectables',
    experience: '9+ Years Aesthetic Medicine Experience',
    bio: 'Sarah is an advanced injector with an artistic background in fine arts. She specializes in the micro-droplet lip sculpting technique, subtle jawline refinement, and collagen-stimulating Sculptra therapies that harmonize the lower and mid-face.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'provider-img-lin',
    specialties: ['Russian Lip Technique', 'Cheek & Chin Contouring', 'Sculptra Biostimulators', 'Skin Boosters'],
    boardCertifications: [
      'American Academy of Nurse Practitioners (AANP)',
      'International Society of Plastic & Aesthetic Nurses (ISPAN)',
      'Advanced Allergan Medical Institute Master Injector'
    ],
    clinicalExpertise: [
      'Micro-Droplet Lip Sculpting',
      'Cheek & Chin Architecture',
      'Biostimulatory Sculptra Matrix',
      'Tear Trough Hollowing Restoration'
    ],
    education: 'MSN – Columbia University; Aesthetic Clinical Fellowship – Manhattan Aesthetic Institute',
    patientPhilosophy: '"Balancing facial proportions requires equal parts anatomy and fine art. Every millimeter counts when crafting natural harmony."',
    languages: ['English', 'Mandarin'],
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    rating: 4.96,
    reviewsCount: 245
  },
  {
    id: 'marcus-reid-pa',
    name: 'Marcus Reid, PA-C',
    role: 'Senior Laser & RF Specialist (Demo)',
    department: 'Laser, RF & Energy Technologies',
    qualifications: 'MS, PA-C – Stanford University School of Medicine (Demo)',
    degrees: 'Certified Physician Assistant, ASLMS Laser Specialist (Demo)',
    specialty: 'Energy-Based Skin Tightening & Scar Revision',
    experience: '8+ Years Laser & Surgical Dermatology Experience',
    bio: 'Marcus is an expert in fractional laser physics and radiofrequency microneedling. Having performed thousands of successful laser sessions, he customizes energy parameters to target deep acne scars, stubborn melasma, and skin laxity safely across all skin tones.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'provider-img-reid',
    specialties: ['Morpheus8 RF', 'Fractional Dual Laser', 'IPL Photofacial', 'Acne Scar Subcision'],
    boardCertifications: [
      'National Commission on Certification of PAs (NCCPA)',
      'American Society for Laser Medicine & Surgery (ASLMS)',
      'InMode Certified Morpheus8 Key Opinion Master'
    ],
    clinicalExpertise: [
      'Fractional Dual-Wave Resurfacing',
      'Morpheus8 Subdermal Remodeling',
      'IPL Vascular & Rosacea Phototherapy',
      'Acne Scar Subcision & Tissue Reconstruction'
    ],
    education: 'MS Physician Assistant Studies – Stanford University; Dermatology & Surgical Fellowship',
    patientPhilosophy: '"Energy devices allow us to stimulate the body’s endogenous regenerative engines. When calibrated with physics-backed precision, the skin renews itself."',
    languages: ['English', 'Spanish'],
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    rating: 4.95,
    reviewsCount: 188
  },
  {
    id: 'chloe-dupont-le',
    name: 'Chloe Dupont, LE',
    role: 'Master Medical Aesthetician & Skin Health Specialist (Demo)',
    department: 'Clinical Peels & Dermal Health',
    qualifications: 'Licensed Master Aesthetician, CIDESCO International Diplomat (Demo)',
    degrees: 'Advanced Medical Skincare Certification, Paris & New York (Demo)',
    specialty: 'Clinical Hydra-Infusion & Custom Chemical Peels',
    experience: '11+ Years Medical Aesthetics Experience',
    bio: 'Chloe trained in Paris and New York, combining European lymphatic drainage techniques with cutting-edge medical skincare science. She curates bespoke corrective peel protocols and red-carpet hydra-infusion treatments for radiant epidermal health.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'provider-img-dupont',
    specialties: ['Medical Hydra-Facials', 'TCA & Jessner Peels', 'Lymphatic Sculpting', 'Barrier Repair Therapies'],
    boardCertifications: [
      'CIDESCO International Diploma (Comité International d\'Esthétique et de Cosmétologie)',
      'NCEA Certified Aesthetician',
      'Master Chemical Exfoliation & Vortex Infusion Specialist'
    ],
    clinicalExpertise: [
      'Medical-Grade TCA & Jessner Chemical Peels',
      'Triple-Infusion Hydro & Oxygen Facials',
      'Manual European Lymphatic Sculpting',
      'Epidermal Barrier Repair & Post-Laser Recovery'
    ],
    education: 'CIDESCO Diplôme d’Esthétique – Paris; Advanced Medical Aesthetics Institute – New York',
    patientPhilosophy: '"A radiant complexion is the canvas of all beauty. By restoring the lipid barrier and cellular turnover, we allow natural luminous health to shine."',
    languages: ['English', 'French'],
    availableDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    rating: 4.99,
    reviewsCount: 420
  }
];

// Seed Sample User
const SEED_USER = {
  id: 'usr-demo-001',
  name: 'Eleanor Sterling',
  email: 'eleanor.sterling@example.com',
  phone: '(555) 382-9912',
  memberSince: 'March 2024',
  membershipTier: 'Aurelle Elite VIP',
  points: 1250,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  skinProfile: {
    skinType: 'Combination / Sensitive',
    concerns: ['Fine lines around eyes', 'Mild cheek sun spots', 'Occasional dehydration'],
    allergies: 'None reported'
  }
};

// Seed Sample Appointments
const SEED_APPOINTMENTS = [
  {
    id: 'AUR-2026-8942',
    treatmentId: 'botox-wrinkle-relaxers',
    treatmentName: 'Botox & Wrinkle Relaxers',
    providerId: 'dr-elena-vance',
    providerName: 'Dr. Elena Vance, MD',
    date: '2026-10-24',
    time: '11:00 AM',
    status: 'Upcoming',
    price: 350,
    duration: '30 mins',
    notes: 'Focus on forehead smoothing and subtle crow’s feet soften.',
    createdAt: '2026-10-01'
  },
  {
    id: 'AUR-2026-7731',
    treatmentId: 'aurelle-signature-facial',
    treatmentName: 'Aurelle Triple-Infusion Hydra & Oxygen Facial',
    providerId: 'chloe-dupont-le',
    providerName: 'Chloe Dupont, LE',
    date: '2026-11-08',
    time: '02:30 PM',
    status: 'Upcoming',
    price: 220,
    duration: '60 mins',
    notes: 'Pre-event glow session.',
    createdAt: '2026-10-05'
  },
  {
    id: 'AUR-2026-4190',
    treatmentId: 'dermal-fillers',
    treatmentName: 'Sculpt & Contour Dermal Fillers',
    providerId: 'sarah-lin-np',
    providerName: 'Sarah Lin, FNP-C',
    date: '2026-07-14',
    time: '10:15 AM',
    status: 'Completed',
    price: 650,
    duration: '45 mins',
    notes: 'Subtle lip hydration and cheek volume restoration.',
    createdAt: '2026-07-02'
  },
  {
    id: 'AUR-2026-3021',
    treatmentId: 'advanced-chemical-peel',
    treatmentName: 'Medical-Grade TCA & Jessner Glow Peel',
    providerId: 'chloe-dupont-le',
    providerName: 'Chloe Dupont, LE',
    date: '2026-05-20',
    time: '03:00 PM',
    status: 'Completed',
    price: 280,
    duration: '45 mins',
    notes: 'Cellular renewal peel for summer radiance.',
    createdAt: '2026-05-10'
  }
];

// Seed Sample Treatment Packages
const SEED_PACKAGES = [
  {
    id: 'pkg-01',
    name: 'Hydra-Glow Signature Series',
    treatment: 'Aurelle Triple-Infusion Hydra Facial',
    totalSessions: 4,
    completedSessions: 1,
    remainingSessions: 3,
    expiryDate: '2027-04-15',
    savings: '20% Package Discount'
  },
  {
    id: 'pkg-02',
    name: 'Morpheus8 Collagen Renewal Trio',
    treatment: 'RF Microneedling Skin Tightening',
    totalSessions: 3,
    completedSessions: 2,
    remainingSessions: 1,
    expiryDate: '2027-02-28',
    savings: '₹400 Savings Bundle'
  }
];

// Seed Notifications
const SEED_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Pre-Appointment Preparation',
    message: 'Friendly reminder: Avoid blood-thinning supplements for your Botox visit with Dr. Vance on Oct 24.',
    date: 'Oct 8, 2026',
    read: false,
    type: 'reminder'
  },
  {
    id: 'notif-2',
    title: 'VIP Loyalty Reward Earned',
    message: 'You have earned 250 loyalty reward points from your recent consultation!',
    date: 'Sep 29, 2026',
    read: true,
    type: 'reward'
  },
  {
    id: 'notif-3',
    title: 'Seasonal Skincare Protocol',
    message: 'Autumn barrier repair guide has been added to your personalized skincare dashboard.',
    date: 'Sep 20, 2026',
    read: true,
    type: 'info'
  }
];

// Seed Skincare Regimen
const SEED_SKINCARE = {
  morning: [
    { step: 1, name: 'Gentle Calming Gel Cleanser', detail: 'Lukewarm water, pat dry softly' },
    { step: 2, name: 'Triple-Antioxidant Vitamin C + E Ferulic', detail: '4-5 drops pressed gently into face & neck' },
    { step: 3, name: 'Multi-Molecular Hyaluronic Acid Hydrator', detail: 'Apply to damp skin for maximum moisture bind' },
    { step: 4, name: 'Mineral Zinc Shield SPF 50+ Invisible Finish', detail: 'Essential daily shield against UVA/UVB & HEV light' }
  ],
  evening: [
    { step: 1, name: 'Purifying Botanical Cleansing Balm', detail: 'Melt away daily impurities and SPF gently' },
    { step: 2, name: 'Micro-Encapsulated Retinaldehyde (0.05%)', detail: 'Apply 3 nights per week to boost cellular turnover' },
    { step: 3, name: 'Bio-Ceramide & Peptide Recovery Cream', detail: 'Locks moisture barrier and repairs overnight' }
  ],
  providerNotes: 'Recommended by Dr. Vance & Chloe Dupont to prolong injectables and protect laser resurfacing results.'
};

/**
 * Centralized INR Currency Formatter Helper
 */
function formatPriceINR(amount) {
  if (typeof amount === 'number') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  if (typeof amount === 'string') {
    return amount.replace(/\$/g, '₹');
  }
  return amount;
}

window.formatPriceINR = formatPriceINR;

/**
 * Storage Service Object
 */
const StorageService = {
  formatPrice: formatPriceINR,

  init() {
    // Remove the legacy demo session that older builds wrote for every visitor.
    try {
      const priorUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null');
      if (priorUser?.id === 'usr-demo-001' || priorUser?.email === 'eleanor.sterling@example.com') {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
    // Reset or update packages if older USD seed existed
    const existingPackages = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    if (existingPackages && existingPackages.includes('$')) {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(SEED_PACKAGES));
    } else if (!existingPackages) {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(SEED_PACKAGES));
    }

    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(SEED_APPOINTMENTS));
    }
    // A missing current-user value means guest. Do not seed a signed-in user.
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SKINCARE)) {
      localStorage.setItem(STORAGE_KEYS.SKINCARE, JSON.stringify(SEED_SKINCARE));
    }
  },

  getTreatments() {
    return SEED_TREATMENTS;
  },

  getTreatmentById(id) {
    return SEED_TREATMENTS.find(t => t.id === id) || SEED_TREATMENTS[0];
  },

  getProviders() {
    return SEED_PROVIDERS;
  },

  getProviderById(id) {
    return SEED_PROVIDERS.find(p => p.id === id) || SEED_PROVIDERS[0];
  },

  getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    try {
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  setCurrentUser(userData) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  },

  getRegisteredUsers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_LIST) || '[]'); }
    catch (e) { return []; }
  },

  saveRegisteredUser(userData) {
    const users = this.getRegisteredUsers();
    const email = String(userData.email || '').trim().toLowerCase();
    if (users.some(user => user.email.toLowerCase() === email)) return false;
    users.push({ ...userData, email });
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(users));
    return true;
  },

  logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  isLoggedIn() {
    return !!this.getCurrentUser();
  },

  getAppointments() {
    this.init();
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    try {
      return data ? JSON.parse(data) : SEED_APPOINTMENTS;
    } catch (e) {
      return SEED_APPOINTMENTS;
    }
  },

  addAppointment(appointmentData) {
    const appointments = this.getAppointments();
    const newAppointment = {
      id: `AUR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Upcoming',
      createdAt: new Date().toISOString().split('T')[0],
      ...appointmentData
    };
    appointments.unshift(newAppointment);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));

    // Also add a confirmation notification
    this.addNotification({
      title: 'Appointment Confirmed',
      message: `Your booking for ${newAppointment.treatmentName} with ${newAppointment.providerName} on ${newAppointment.date} at ${newAppointment.time} is confirmed. Ref: ${newAppointment.id}`,
      type: 'reminder'
    });

    return newAppointment;
  },

  updateAppointment(id, updatedFields) {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...updatedFields };
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
      return appointments[index];
    }
    return null;
  },

  cancelAppointment(id, reason = 'Client request') {
    return this.updateAppointment(id, { 
      status: 'Cancelled',
      cancelReason: reason,
      cancelledAt: new Date().toISOString()
    });
  },

  rescheduleAppointment(id, newDate, newTime) {
    return this.updateAppointment(id, {
      date: newDate,
      time: newTime,
      rescheduledAt: new Date().toISOString()
    });
  },

  getPackages() {
    this.init();
    const data = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    try {
      return data ? JSON.parse(data) : SEED_PACKAGES;
    } catch (e) {
      return SEED_PACKAGES;
    }
  },

  getNotifications() {
    this.init();
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    try {
      return data ? JSON.parse(data) : SEED_NOTIFICATIONS;
    } catch (e) {
      return SEED_NOTIFICATIONS;
    }
  },

  addNotification(notif) {
    const list = this.getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      read: false,
      ...notif
    };
    list.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    return newNotif;
  },

  markNotificationsAsRead() {
    const list = this.getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
  },

  getSkincareRoutine() {
    this.init();
    const data = localStorage.getItem(STORAGE_KEYS.SKINCARE);
    try {
      return data ? JSON.parse(data) : SEED_SKINCARE;
    } catch (e) {
      return SEED_SKINCARE;
    }
  },

  saveInquiry(inquiry) {
    const inquiries = JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
    const newInquiry = {
      id: `INQ-${Date.now()}`,
      date: new Date().toISOString(),
      ...inquiry
    };
    inquiries.push(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    return newInquiry;
  },

  resetDemoData() {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(SEED_APPOINTMENTS));
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.USERS_LIST);
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(SEED_PACKAGES));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.SKINCARE, JSON.stringify(SEED_SKINCARE));
  }
};

// Auto-initialize on load
StorageService.init();

// Export to window for vanilla JS access across all scripts
window.StorageService = StorageService;
