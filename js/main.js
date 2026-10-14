/**
 * Aurelle Aesthetics - Main Application Bootstrap
 * High-performance clinical chic Med Spa application initialization.
 */

(function () {
  'use strict';

  function initApp() {
    // Dynamic Copyright Year
    function updateYear() {
      const yearEls = document.querySelectorAll('#current-year');
      const currentYear = new Date().getFullYear();
      yearEls.forEach(el => el.textContent = currentYear);
    }
    updateYear();
    window.addEventListener('componentsLoaded', updateYear);

    // Set up graceful image loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.addEventListener('error', function () {
        // Fallback placeholder if any remote image is unreachable
        this.src = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80';
      });
    });

    // Clean console signature
    console.log(
      '%c AURELLE AESTHETICS %c Medical Spa & Clinical Aesthetics Portal Initialized %c',
      'background: #292A27; color: #FAF8F4; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
      'background: #C5A880; color: #FFFFFF; padding: 4px 8px; border-radius: 4px;',
      'background: transparent'
    );
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
