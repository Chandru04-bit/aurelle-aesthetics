# AURELLE AESTHETICS
### Premium Med Spa & Non-Surgical Aesthetics Clinic Website

A complete, modern, responsive website for **AURELLE AESTHETICS**, an aesthetics clinic and med spa specializing in physician-administered neuromodulators, dermal fillers, fractional laser resurfacing, RF microneedling, and clinical medical facials.

Built strictly according to project specifications using **HTML5, CSS3, Vanilla JavaScript, and Tailwind CSS 3 CLI**.

---

## 🏛️ Project Architecture & Structure

```text
med-spa-clinic/
├── index.html                       # Homepage (Hero, Philosophy, Signature Services, Providers, FAQs, CTA)
├── package.json                     # NPM build scripts (Tailwind CLI build/dev & static server)
├── tailwind.config.js               # Tailwind configuration (Palette, fonts, dark mode)
├── README.md                        # Project documentation & setup instructions
├── .gitignore                       # Git ignored files
│
├── pages/
│   ├── treatments.html              # Full treatment directory with live search & category filters
│   ├── treatment-details.html       # Dynamic treatment specifics, pre/post care & FAQs
│   ├── providers.html               # Medical directors & specialist profiles with bio modal
│   ├── about.html                   # Clinic heritage, 4 pillars of care & sanctuary gallery
│   ├── contact.html                 # Contact details, hours, and validated inquiry form
│   ├── booking.html                 # 5-step interactive appointment booking engine
│   ├── login.html                   # Demo client portal authentication interface
│   ├── register.html                # Demo VIP registration interface
│   └── dashboard.html               # Client portal (appointments, rescheduling, packages, skincare)
│
├── components/
│   ├── navbar.html                  # Shared sticky glass navigation header fragment
│   └── footer.html                  # Shared luxury footer fragment with newsletter & hours
│
├── css/
│   ├── input.css                    # Tailwind CSS input file with custom component layers
│   ├── output.css                   # Compiled, minified production stylesheet
│   ├── custom.css                   # Custom luxury styling (stepper, toasts, glassmorphism)
│   ├── responsive.css               # Responsive adjustments for ultra-small to 4K displays
│   └── themes.css                   # CSS color variables and dark mode overrides
│
├── js/
│   ├── main.js                      # Application bootstrap and image error fallbacks
│   ├── components.js                # Dynamic HTML component fragment loader
│   ├── navigation.js                # Sticky header, mobile drawer & auth sync
│   ├── theme.js                     # Persistent dark/light mode toggle
│   ├── treatments.js                # Treatment filtering, search, and dynamic cards
│   ├── treatment-details.js         # Dynamic URL-parameter-based treatment viewer
│   ├── providers.js                 # Provider profiles and bio modal controller
│   ├── booking.js                   # 5-step wizard appointment booking engine
│   ├── auth-demo.js                 # Client login/registration validation & demo autofill
│   ├── dashboard.js                 # Portal controller for appointment rescheduling & cancellation
│   ├── forms.js                     # Accessible form validation engine & toast alerts
│   ├── storage.js                   # Central localStorage data store & seed dataset
│   └── animations.js                # Toast notifications, modal controller & accordion engine
│
└── assets/
    ├── images/
    │   ├── hero/
    │   ├── treatments/
    │   ├── providers/
    │   └── clinic/
    ├── icons/
    └── fonts/
```

---

## 🎨 Design System & Palette

- **Ivory (`#FAF8F4`)** — Primary warm canvas background.
- **Warm Beige (`#E9E0D5`)** — Soft border and neutral fill tones.
- **Soft Blush (`#EBD9D5`)** — Delicate accent badges and highlights.
- **Muted Sage (`#A8B5A0`)** — Clinical calm and botanic undertones.
- **Charcoal (`#292A27`)** — Deep contrast text and primary buttons.
- **Champagne Gold (`#C5A880`)** — Luxury highlights, icons, and focus indicators.
- **White (`#FFFFFF`)** — Clean card backgrounds.
- **Onyx / Dark Mode (`#161715` / `#1F201D`)** — Elegant, accessible dark theme.

### Typography
- **Headings**: *Playfair Display* & *Cormorant Garamond* (Serif).
- **Body & UI**: *Plus Jakarta Sans* & *Inter* (Clean, modern sans-serif).

---

## 🚀 Installation & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (version 9 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Tailwind CSS for Production
```bash
npm run build
```

### 3. Start Development Watcher
```bash
npm run dev
```

### 4. Serve the Website Locally
Because shared HTML components (`navbar.html` and `footer.html`) are fetched asynchronously by `components.js`, serve the project via a local HTTP server:
```bash
npm run serve
```
Or with Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` or `http://localhost:3000` in your web browser.

---

## 💎 Features & Interactive Functionality

1. **Homepage (`index.html`)**:
   - Hero banner with headline and direct booking CTA.
   - Clinical care philosophy with floating feature highlights.
   - Six signature treatment cards with duration, price, and learn more links.
   - Master provider previews with credentials.
   - 4-step personalized patient care process.
   - Client feedback testimonials (clearly labeled as demonstration content).
   - Interactive FAQ accordion.

2. **Treatment Directory & Search (`pages/treatments.html`)**:
   - Instant real-time search across names, descriptions, and anatomical areas.
   - Category filtering pills (Injectables, Laser & RF, Skin Rejuvenation, Peels & Facials).
   - Sorting by curated featured, price low-to-high, and price high-to-low.
   - Dynamic parameter passing to details and booking pages.

3. **Dynamic Treatment Details (`pages/treatment-details.html`)**:
   - Dynamic rendering based on `?id=` URL query parameter.
   - Comprehensive performance metrics (Duration, Downtime, Discomfort, Longevity).
   - Pre-treatment preparation checklist and post-care recovery protocols.
   - Interactive FAQ accordion for specific procedures.
   - Sticky booking summary card with direct pre-filled appointment link.

4. **Specialists & Providers (`pages/providers.html`)**:
   - Medical director and aesthetic nurse practitioner cards with sample credentials.
   - Specialty filtering by provider discipline.
   - Interactive biography modal dialog.
   - Clinical safety and hygiene protocols disclosure.

5. **5-Step Appointment Booking Engine (`pages/booking.html`)**:
   - Multi-step wizard:
     1. Select Treatment (supports URL pre-selection).
     2. Select Specialist (supports URL pre-selection).
     3. Select Date (past-date rejection) & sample time slot.
     4. Client contact details and medical history notes.
     5. Review & confirmation with demonstration disclaimer.
   - Live sidebar calculating totals, duration, and selected options.
   - Generates unique reference code (`AUR-2026-XXXX`), saves to localStorage, and updates dashboard in real-time.

6. **Client Portal & Dashboard (`pages/dashboard.html`)**:
   - Overview with welcome tier badge and procedure counts.
   - **Appointments tab**: Upcoming confirmed visits with **Reschedule** (date/time selector modal) and **Cancel** (reason modal) workflows.
   - **Packages tab**: Visual progress bars showing remaining sessions and expiry dates.
   - **Skincare Regimen tab**: Morning (AM) and Evening (PM) tailored protocols.
   - **Notifications tab**: Real-time alerts and "Mark all as read" capability.
   - **Profile tab**: Editable contact details and logout.

7. **Authentication Interfaces (`pages/login.html` & `pages/register.html`)**:
   - Demo login with one-click **"Autofill Credentials"** helper button.
   - Password visibility eye toggles.
   - Password confirmation and live error handling.

8. **Accessibility & Dark Mode**:
   - Keyboard navigable elements, ARIA labels, and visible focus rings.
   - Persistent light/dark mode switch adhering to system preferences.
   - Responsive across 320px mobile devices, tablets, laptops, and ultra-wide desktops.

---

## 🔒 Limitations & Backend Architecture Notes

- **Demonstration Storage**: User session state, appointments, inquiries, and notifications are saved locally in browser `localStorage`. No actual passwords or Protected Health Information (PHI) are stored in plaintext.
- **Backend Ready**: JavaScript modules are structured with clear service objects (`StorageService`, `FormValidator`, `ThemeController`) to allow dropping in REST or GraphQL APIs with minimal refactoring.
- **Medical Disclaimer**: All content, treatment descriptions, and provider profiles are intended for aesthetic med spa demonstration purposes.
