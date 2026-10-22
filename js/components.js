/**
 * Aurelle Aesthetics - Shared HTML Component Loader
 * Loads components/navbar.html seamlessly via Fetch API,
 * adjusting relative paths based on whether current page is in root or pages/ directory.
 */

(function () {
  const isInsidePagesDir = window.location.pathname.includes('/pages/') || 
                           window.location.pathname.includes('\\pages\\') ||
                           window.location.pathname.endsWith('/treatments.html') ||
                           window.location.pathname.endsWith('/treatment-details.html') ||
                           window.location.pathname.endsWith('/providers.html') ||
                           window.location.pathname.endsWith('/about.html') ||
                           window.location.pathname.endsWith('/contact.html') ||
                           window.location.pathname.endsWith('/booking.html') ||
                           window.location.pathname.endsWith('/login.html') ||
                           window.location.pathname.endsWith('/register.html') ||
                           window.location.pathname.endsWith('/dashboard.html') ||
                           window.location.pathname.endsWith('/sitemap.html') ||
                           window.location.pathname.endsWith('/privacy.html') ||
                           window.location.pathname.endsWith('/terms.html') ||
                           window.location.pathname.endsWith('/home-2.html') ||
                           window.location.pathname.endsWith('\\home-2.html');

  const basePath = isInsidePagesDir ? '../' : './';
  const pagesPath = isInsidePagesDir ? './' : './pages/';
  const indexPath = isInsidePagesDir ? '../index.html' : './index.html';

  async function loadFragment(url, targetElementId) {
    const container = document.getElementById(targetElementId);
    if (!container) return;

    try {
      // Revalidate shared fragments so browsers do not keep rendering an older
      // partial footer after the component markup has been updated.
      const response = await fetch(url, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Failed to load ${url}: ${response.statusText}`);
      let html = await response.text();

      // Normalize internal links in the loaded fragment
      html = html.replace(/href="\.\/index\.html"/g, `href="${indexPath}"`);
      html = html.replace(/href="\.\/pages\//g, `href="${pagesPath}`);
      html = html.replace(/src="\.\/assets\//g, `src="${basePath}assets/`);
      html = html.replace(/href="\.\/assets\//g, `href="${basePath}assets/`);

      if (targetElementId === 'navbar-placeholder') {
        const parsed = new DOMParser().parseFromString(html, 'text/html');
        const mobileNav = parsed.querySelector('#mobile-drawer nav[aria-label="Mobile Navigation"]');
        const mobileAuth = parsed.querySelector('#mobile-drawer .mobile-auth-section');
        const requiredItems = ['Treatments', 'Specialists', 'About Clinic', 'Contact', 'Dashboard'];
        const navText = mobileNav ? mobileNav.textContent : '';

        if (
          !parsed.getElementById('mobile-menu-toggle') ||
          !parsed.getElementById('mobile-drawer-close') ||
          !mobileNav ||
          !navText.includes('Home') ||
          requiredItems.some(item => !navText.includes(item)) ||
          !mobileAuth?.textContent.trim() ||
          !parsed.querySelector('#mobile-drawer .dir-switcher') ||
          !parsed.querySelector('#mobile-drawer [data-direction="ltr"]') ||
          !parsed.querySelector('#mobile-drawer [data-direction="rtl"]')
        ) {
          throw new Error(`Incomplete mobile navigation in ${url}`);
        }
      }

      container.innerHTML = html;
    } catch (error) {
      console.warn(`Component loader fallback for ${url}:`, error);
      // A local fallback keeps shared controls available when the fragment is unavailable or incomplete.
      renderInlineFallback(targetElementId);
    }
  }

  function renderInlineFallback(targetElementId) {
    const container = document.getElementById(targetElementId);
    if (!container) return;

    if (targetElementId === 'navbar-placeholder' && !container.innerHTML.trim()) {
      container.innerHTML = `
        <header id="main-header" class="fixed inset-x-0 top-0 z-50 transition-all duration-300 glass-header border-b border-stone-200/60 dark:border-aurelle-darkborder">
          <div class="site-content-container">
            <div class="flex items-center justify-between h-20">
              <a href="${indexPath}" class="flex shrink-0 items-center gap-2 sm:gap-3 group focus:outline-none" aria-label="Aurelle Aesthetics Home">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-aurelle-gold/60 flex items-center justify-center bg-white dark:bg-aurelle-darkcard shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <span class="font-serif text-base sm:text-lg font-bold text-aurelle-charcoal dark:text-aurelle-gold">A</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-serif text-lg sm:text-xl tracking-widest uppercase font-semibold text-aurelle-charcoal dark:text-aurelle-darktext group-hover:text-aurelle-gold transition-colors">Aurelle</span>
                  <span class="hidden sm:block text-[9px] tracking-[0.25em] uppercase text-stone-500 dark:text-aurelle-sage font-medium -mt-1">Aesthetics &bull; Med Spa</span>
                </div>
              </a>
              <nav class="hidden lg:flex flex-1 items-center justify-center gap-3 2xl:gap-5 px-3" aria-label="Main Navigation">
                <div class="relative group/nav-dropdown inline-block" id="desktop-home-dropdown">
                  <button type="button" class="nav-link nav-dropdown-trigger inline-flex items-center gap-1 text-sm font-medium tracking-wide text-aurelle-charcoal/80 hover:text-aurelle-gold dark:text-aurelle-darktext/80 dark:hover:text-aurelle-gold transition-colors duration-200 focus:outline-none" id="home-dropdown-btn" aria-expanded="false" aria-haspopup="true">
                    <span>Welcome</span>
                    <svg class="w-3.5 h-3.5 transition-transform duration-200 dropdown-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div class="nav-dropdown-menu absolute left-0 top-full pt-2" id="home-dropdown-menu" role="menu" aria-labelledby="home-dropdown-btn">
                    <div class="bg-white dark:bg-aurelle-darkcard rounded-2xl shadow-lg border border-stone-200/80 dark:border-aurelle-darkborder p-2 space-y-1">
                      <a href="${indexPath}" class="nav-link nav-dropdown-link flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-aurelle-charcoal dark:text-aurelle-darktext hover:bg-stone-100/80 dark:hover:bg-stone-800/80 hover:text-aurelle-gold dark:hover:text-aurelle-gold transition-colors duration-150" role="menuitem"><span>Home 1</span></a>
                      <a href="${pagesPath}home-2.html" class="nav-link nav-dropdown-link flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-aurelle-charcoal dark:text-aurelle-darktext hover:bg-stone-100/80 dark:hover:bg-stone-800/80 hover:text-aurelle-gold dark:hover:text-aurelle-gold transition-colors duration-150" role="menuitem"><span>Home 2 (Signature)</span></a>
                    </div>
                  </div>
                </div>
                <a href="${pagesPath}treatments.html" class="nav-link text-sm font-medium tracking-wide text-aurelle-charcoal/80 hover:text-aurelle-gold dark:text-aurelle-darktext/80 dark:hover:text-aurelle-gold transition-colors duration-200">Treatments</a>
                <a href="${pagesPath}providers.html" class="nav-link text-sm font-medium tracking-wide text-aurelle-charcoal/80 hover:text-aurelle-gold dark:text-aurelle-darktext/80 dark:hover:text-aurelle-gold transition-colors duration-200">Specialists</a>
                <a href="${pagesPath}about.html" class="nav-link text-sm font-medium tracking-wide text-aurelle-charcoal/80 hover:text-aurelle-gold dark:text-aurelle-darktext/80 dark:hover:text-aurelle-gold transition-colors duration-200">About Us</a>
                <a href="${pagesPath}contact.html" class="nav-link text-sm font-medium tracking-wide text-aurelle-charcoal/80 hover:text-aurelle-gold dark:text-aurelle-darktext/80 dark:hover:text-aurelle-gold transition-colors duration-200">Contact</a>
              </nav>
              <div class="navbar-toolbar hidden shrink-0 xl:flex items-center gap-4">
                <div class="dir-switcher inline-flex items-center border border-stone-200/80 dark:border-aurelle-darkborder rounded-full p-1 bg-stone-100/70 dark:bg-stone-900/70" role="group" aria-label="Layout direction controls">
                  <button type="button" class="dir-btn px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200" data-direction="ltr" aria-pressed="true">LTR</button>
                  <button type="button" class="dir-btn px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100" data-direction="rtl" aria-pressed="false">RTL</button>
                </div>
                <button type="button" class="theme-toggle-btn inline-flex h-10 w-10 items-center justify-center p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors" aria-label="Toggle light and dark theme">
                  <svg class="sun-icon w-5 h-5 hidden text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                  <svg class="moon-icon w-5 h-5 text-stone-700 dark:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                </button>
                <a href="${pagesPath}dashboard.html" class="nav-dashboard-btn inline-flex h-10 items-center justify-center px-5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-full border border-stone-300 dark:border-aurelle-darkborder text-aurelle-charcoal hover:border-aurelle-gold hover:text-aurelle-gold dark:text-aurelle-darktext dark:hover:border-aurelle-gold dark:hover:text-aurelle-gold shadow-sm focus:outline-none focus:ring-2 focus:ring-aurelle-gold">Dashboard</a>
                <a href="${pagesPath}login.html" class="nav-login-btn inline-flex h-10 items-center justify-center px-5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-full border border-transparent bg-aurelle-charcoal text-white hover:bg-black hover:shadow-luxury dark:bg-aurelle-ivory dark:text-aurelle-charcoal dark:hover:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-aurelle-gold">Login</a>
              </div>
              <div class="navbar-mobile-controls flex shrink-0 items-center lg:hidden">
                <button id="mobile-menu-toggle" type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-aurelle-charcoal dark:text-aurelle-darktext hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-aurelle-gold" aria-expanded="false" aria-controls="mobile-drawer" aria-label="Open main navigation menu">
                  <svg class="w-6 h-6 menu-open-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  <svg class="w-6 h-6 menu-close-icon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>
        </header>
          <div id="mobile-backdrop" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300 lg:hidden"></div>
          <div id="mobile-drawer" class="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-aurelle-ivory dark:bg-aurelle-darkcard z-50 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto transform translate-x-full transition-transform duration-300 lg:hidden" aria-hidden="true">
            <div>
              <div class="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-aurelle-darkborder">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full border border-aurelle-gold flex items-center justify-center font-serif font-bold text-aurelle-charcoal dark:text-aurelle-gold">A</div>
                  <span class="font-serif tracking-wider uppercase font-semibold text-aurelle-charcoal dark:text-aurelle-darktext">Aurelle</span>
                </div>
                <button id="mobile-drawer-close" type="button" class="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-white" aria-label="Close menu">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <nav class="flex flex-col space-y-4 py-6" aria-label="Mobile Navigation">
                <div class="mobile-home-group border-b border-stone-100 dark:border-stone-800 pb-1">
                  <button type="button" class="w-full flex items-center justify-between py-2 text-base font-medium text-aurelle-charcoal dark:text-aurelle-darktext hover:text-aurelle-gold focus:outline-none mobile-home-toggle" id="mobile-home-toggle" aria-expanded="false" aria-controls="mobile-home-submenu">
                    <span>Welcome</span>
                    <svg class="w-4 h-4 transition-transform duration-200 mobile-home-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div id="mobile-home-submenu" class="hidden pl-3 pt-1 pb-1 space-y-1">
                    <a href="${indexPath}" class="nav-link mobile-sub-link block px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-aurelle-gold dark:hover:text-aurelle-gold rounded-lg transition-colors">Home 1</a>
                    <a href="${pagesPath}home-2.html" class="nav-link mobile-sub-link block px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-aurelle-gold dark:hover:text-aurelle-gold rounded-lg transition-colors">Home 2 (Signature)</a>
                  </div>
                </div>
                <a href="${pagesPath}treatments.html" class="nav-link text-base font-medium text-aurelle-charcoal dark:text-aurelle-darktext hover:text-aurelle-gold py-2 border-b border-stone-100 dark:border-stone-800">Treatments</a>
                <a href="${pagesPath}providers.html" class="nav-link text-base font-medium text-aurelle-charcoal dark:text-aurelle-darktext hover:text-aurelle-gold py-2 border-b border-stone-100 dark:border-stone-800">Specialists</a>
                <a href="${pagesPath}about.html" class="nav-link text-base font-medium text-aurelle-charcoal dark:text-aurelle-darktext hover:text-aurelle-gold py-2 border-b border-stone-100 dark:border-stone-800">About Clinic</a>
                <a href="${pagesPath}contact.html" class="nav-link text-base font-medium text-aurelle-charcoal dark:text-aurelle-darktext hover:text-aurelle-gold py-2 border-b border-stone-100 dark:border-stone-800">Contact</a>
                <a href="${pagesPath}dashboard.html" class="nav-link mobile-dashboard-link text-base font-medium text-aurelle-charcoal dark:text-aurelle-darktext hover:text-aurelle-gold py-2 border-b border-stone-100 dark:border-stone-800">Dashboard</a>
              </nav>
            </div>
            <div class="pt-6 border-t border-stone-200 dark:border-aurelle-darkborder space-y-4">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">Direction</span>
                  <div class="dir-switcher flex items-center border border-stone-200/80 dark:border-aurelle-darkborder rounded-full p-0.5 bg-stone-100/70 dark:bg-stone-900/70 text-xs" role="group" aria-label="Layout direction controls">
                    <button type="button" class="dir-btn px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200" data-direction="ltr" aria-pressed="true">LTR</button>
                    <button type="button" class="dir-btn px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 text-stone-500 dark:text-stone-400" data-direction="rtl" aria-pressed="false">RTL</button>
                  </div>
                </div>
                <button type="button" class="theme-toggle-btn inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors" aria-label="Toggle light and dark theme">
                  <svg class="sun-icon w-5 h-5 hidden text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                  <svg class="moon-icon w-5 h-5 text-stone-700 dark:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                </button>
              </div>
              <div class="mobile-auth-section flex flex-col gap-2">
                <div class="flex gap-2">
                  <a href="${pagesPath}dashboard.html" class="nav-dashboard-btn flex-1 text-center py-2.5 text-xs font-semibold tracking-wider uppercase rounded-full border border-stone-300 dark:border-aurelle-darkborder text-aurelle-charcoal dark:text-aurelle-darktext hover:border-aurelle-gold hover:text-aurelle-gold">Dashboard</a>
                  <a href="${pagesPath}login.html" class="mobile-login-btn flex-1 text-center py-2.5 text-xs font-semibold tracking-wider uppercase rounded-full border border-aurelle-charcoal dark:border-aurelle-beige text-aurelle-charcoal dark:text-aurelle-ivory bg-aurelle-charcoal text-white dark:bg-aurelle-ivory dark:text-aurelle-charcoal">Login</a>
                </div>
                <a href="${pagesPath}register.html" class="mobile-register-btn w-full text-center py-2.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-stone-200/70 dark:bg-stone-800 text-aurelle-charcoal dark:text-aurelle-ivory">Create Account</a>
              </div>
            </div>
          </div>
      `;
    }

    if (targetElementId === 'footer-placeholder' && !container.innerHTML.trim()) {
      container.innerHTML = `
        <footer class="site-footer" aria-label="Site footer">
          <div class="site-content-container site-footer-main">
            <div class="site-footer-grid">
              <section class="site-footer-brand" aria-labelledby="footer-brand-name-fallback">
                <a class="site-footer-logo" href="${indexPath}" aria-label="Aurelle Aesthetics home">
                  <span class="site-footer-mark" aria-hidden="true">A</span>
                  <span class="site-footer-wordmark" id="footer-brand-name-fallback">
                    <span class="site-footer-wordmark-name">Aurelle</span>
                    <span class="site-footer-wordmark-tagline">Aesthetics &bull; Med Spa</span>
                  </span>
                </a>
                <p class="site-footer-description">Physician-led aesthetics and thoughtful care, tailored to your features and skin.</p>
                <div class="site-footer-socials" aria-label="Social media">
                  <a class="site-footer-social-link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="${basePath}assets/icons/instagram.svg" alt="" aria-hidden="true"></a>
                  <a class="site-footer-social-link" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="${basePath}assets/icons/facebook.svg" alt="" aria-hidden="true"></a>
                  <a class="site-footer-social-link" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><img src="${basePath}assets/icons/tiktok.svg" alt="" aria-hidden="true"></a>
                  <a class="site-footer-social-link" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><img src="${basePath}assets/icons/youtube.svg" alt="" aria-hidden="true"></a>
                </div>
              </section>
              <nav class="site-footer-column" aria-labelledby="footer-links-heading-fallback">
                <h2 class="site-footer-heading" id="footer-links-heading-fallback">Explore</h2>
                <ul class="site-footer-list">
                  <li><a class="site-footer-link" href="${indexPath}">Home</a></li>
                  <li><a class="site-footer-link" href="${pagesPath}home-2.html">Home 2 (Signature)</a></li>
                  <li><a class="site-footer-link" href="${pagesPath}about.html">About Us</a></li>
                  <li><a class="site-footer-link" href="${pagesPath}treatments.html">Services</a></li>
                  <li><a class="site-footer-link" href="${pagesPath}providers.html">Specialists</a></li>
                  <li><a class="site-footer-link" href="${pagesPath}contact.html">Contact Us</a></li>
                </ul>
              </nav>
              <nav class="site-footer-column" aria-labelledby="footer-services-heading-fallback">
                <h2 class="site-footer-heading" id="footer-services-heading-fallback">Our Services</h2>
                <ul class="site-footer-list">
                  <li><a class="site-footer-link" href="${pagesPath}treatment-details.html?id=botox-wrinkle-relaxers">Botox &amp; Wrinkle Relaxers</a></li>
                  <li><a class="site-footer-link" href="${pagesPath}treatment-details.html?id=dermal-fillers">Dermal Fillers</a></li>
                  <li><a class="site-footer-link" href="${pagesPath}treatment-details.html?id=morpheus8-rejuvenation">RF Microneedling</a></li>
                  <li><a class="site-footer-link" href="${pagesPath}treatment-details.html?id=laser-skin-resurfacing">Laser Resurfacing</a></li>
                  <li><a class="site-footer-link" href="${pagesPath}treatment-details.html?id=aurelle-signature-facial">Signature Facial</a></li>
                </ul>
              </nav>
              <section class="site-footer-column site-footer-contact" aria-labelledby="footer-contact-heading-fallback">
                <h2 class="site-footer-heading" id="footer-contact-heading-fallback">Contact</h2>
                <ul class="site-footer-list">
                  <li><a class="site-footer-link" href="tel:5557942026">(555) 794-2026</a></li>
                  <li><a class="site-footer-link site-footer-email" href="mailto:concierge@aurelle-aesthetics-demo.com">concierge@aurelle-aesthetics-demo.com</a></li>
                </ul>
                <h3 class="site-footer-heading site-footer-hours-heading">Clinical Operating Hours</h3>
                <ul class="site-footer-list site-footer-hours">
                  <li>Monday – Friday: 9:00 AM – 7:00 PM</li>
                  <li>Saturday: 10:00 AM – 5:00 PM</li>
                  <li>Sunday: VIP Private Reservations Only</li>
                </ul>
              </section>
            </div>
          </div>
          <div class="site-footer-bottom"><p>&copy; <span data-current-year>${new Date().getFullYear()}</span> Aurelle Aesthetics. All rights reserved.</p></div>
        </footer>
      `;
    }
  }

  async function initComponents() {
    await loadFragment(`${basePath}components/navbar.html`, 'navbar-placeholder');
    await loadFragment(`${basePath}components/footer.html`, 'footer-placeholder');
    document.querySelectorAll('[data-current-year]').forEach((year) => {
      year.textContent = String(new Date().getFullYear());
    });

    // Dispatch completion event
    window.dispatchEvent(new CustomEvent('componentsLoaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
  } else {
    initComponents();
  }
})();
