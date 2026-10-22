/**
 * Aurelle Aesthetics - Treatment Details Dynamic Page Controller
 * Reads ?id= URL parameter, populates complete treatment specifics,
 * preparation, aftercare, FAQs, and connects to booking flow.
 */

(function () {
  function initTreatmentDetails() {
    if (!window.StorageService) return;

    const urlParams = new URLSearchParams(window.location.search);
    const treatmentId = urlParams.get('id') || 'botox-wrinkle-relaxers';
    const treatment = window.StorageService.getTreatmentById(treatmentId);

    if (!treatment) return;

    // Update document title
    document.title = `${treatment.name} | Aurelle Aesthetics Med Spa`;

    // Populate Breadcrumb & Header
    const breadcrumbCurrent = document.getElementById('details-breadcrumb-current');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = treatment.name;

    const titleEl = document.getElementById('details-title');
    if (titleEl) titleEl.textContent = treatment.name;

    const taglineEl = document.getElementById('details-tagline');
    if (taglineEl) taglineEl.textContent = treatment.tagline;

    const categoryBadge = document.getElementById('details-category-badge');
    if (categoryBadge) categoryBadge.textContent = treatment.categoryName;

    const heroImg = document.getElementById('details-hero-img');
    if (heroImg) {
      heroImg.src = treatment.heroImage || treatment.image;
      heroImg.alt = `${treatment.name} aesthetic procedure`;
    }

    const descEl = document.getElementById('details-description');
    if (descEl) descEl.textContent = treatment.fullDescription;

    // Key Performance Metrics
    const metricDuration = document.getElementById('metric-duration');
    if (metricDuration) metricDuration.textContent = treatment.duration;

    const metricDowntime = document.getElementById('metric-downtime');
    if (metricDowntime) metricDowntime.textContent = treatment.downtime;

    const metricDiscomfort = document.getElementById('metric-discomfort');
    if (metricDiscomfort) metricDiscomfort.textContent = treatment.discomfort;

    const metricLongevity = document.getElementById('metric-longevity');
    if (metricLongevity) metricLongevity.textContent = treatment.resultsLongevity;

    // Target Areas
    const areasContainer = document.getElementById('details-target-areas');
    if (areasContainer && treatment.targetAreas) {
      areasContainer.innerHTML = treatment.targetAreas.map(area => `
        <li class="flex items-center gap-2.5 text-sm text-stone-700 dark:text-stone-300">
          <span class="w-2 h-2 rounded-full bg-aurelle-gold shrink-0"></span>
          <span>${area}</span>
        </li>
      `).join('');
    }

    // Key Clinical Benefits
    const benefitsContainer = document.getElementById('details-benefits');
    if (benefitsContainer && treatment.benefits) {
      benefitsContainer.innerHTML = treatment.benefits.map(b => `
        <div class="flex items-start gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-900/40 border border-stone-200/60 dark:border-aurelle-darkborder">
          <div class="p-1 rounded-full bg-aurelle-sage/20 text-aurelle-sage dark:text-aurelle-sage shrink-0 mt-0.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          </div>
          <p class="text-sm text-stone-700 dark:text-stone-300 font-light leading-relaxed">${b}</p>
        </div>
      `).join('');
    }

    // Pre-Treatment Preparation Checklist
    const prepContainer = document.getElementById('details-preparation');
    if (prepContainer && treatment.preparation) {
      prepContainer.innerHTML = treatment.preparation.map((prep, i) => `
        <li class="flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300">
          <span class="w-6 h-6 rounded-full bg-stone-100 dark:bg-stone-800 text-aurelle-charcoal dark:text-aurelle-gold text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
            ${i + 1}
          </span>
          <span class="font-light leading-relaxed">${prep}</span>
        </li>
      `).join('');
    }

    // Post-Treatment Aftercare Checklist
    const aftercareContainer = document.getElementById('details-aftercare');
    if (aftercareContainer && treatment.aftercare) {
      aftercareContainer.innerHTML = treatment.aftercare.map((care, i) => `
        <li class="flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300">
          <div class="w-6 h-6 rounded-full bg-aurelle-blush/40 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
            ✓
          </div>
          <span class="font-light leading-relaxed">${care}</span>
        </li>
      `).join('');
    }

    // Treatment Specific FAQs Accordion
    const faqsContainer = document.getElementById('details-faqs');
    if (faqsContainer && treatment.faqs) {
      faqsContainer.innerHTML = treatment.faqs.map((faq, idx) => `
        <div class="accordion-item border border-stone-200 dark:border-aurelle-darkborder rounded-xl bg-white dark:bg-aurelle-darkcard overflow-hidden">
          <button type="button" class="accordion-header w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none" aria-expanded="${idx === 0 ? 'true' : 'false'}">
            <span class="font-serif text-base text-aurelle-charcoal dark:text-aurelle-darktext font-medium">${faq.q}</span>
            <svg class="accordion-chevron w-4 h-4 text-aurelle-gold shrink-0 ${idx === 0 ? 'rotated' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="accordion-content ${idx === 0 ? 'open' : ''} px-6 pb-5 text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed border-t border-stone-100 dark:border-aurelle-darkborder/50 pt-3">
            ${faq.a}
          </div>
        </div>
      `).join('');

      if (window.AurelleUI && window.AurelleUI.initAccordions) {
        window.AurelleUI.initAccordions();
      }
    }

    // Sticky Booking Summary Card
    const bookingPrice = document.getElementById('booking-card-price');
    if (bookingPrice) {
      const unitSeparator = treatment.priceFormatted.lastIndexOf('/');
      const priceAmount = unitSeparator >= 0
        ? treatment.priceFormatted.slice(0, unitSeparator).trim()
        : treatment.priceFormatted;
      const priceAmountElement = document.createElement('span');
      priceAmountElement.className = 'min-w-0 break-words font-serif text-2xl sm:text-3xl font-bold leading-tight text-aurelle-charcoal dark:text-aurelle-darktext';
      priceAmountElement.textContent = priceAmount;
      bookingPrice.replaceChildren(priceAmountElement);

      if (unitSeparator >= 0) {
        const priceUnitElement = document.createElement('span');
        priceUnitElement.className = 'whitespace-nowrap text-sm text-stone-500 font-light';
        priceUnitElement.textContent = treatment.priceFormatted.slice(unitSeparator).trim();
        bookingPrice.append(priceUnitElement);
      }
    }

    const bookingBtn = document.getElementById('details-book-btn');
    if (bookingBtn) {
      bookingBtn.href = `./booking.html?treatment=${treatment.id}`;
    }

    // Related Treatments
    renderRelatedTreatments(treatment);
  }

  function renderRelatedTreatments(currentTreatment) {
    const container = document.getElementById('related-treatments-grid');
    if (!container || !window.StorageService) return;

    const all = window.StorageService.getTreatments();
    const related = all.filter(t => t.id !== currentTreatment.id).slice(0, 3);

    container.innerHTML = related.map(t => `
      <div class="card-luxury p-5 flex flex-col justify-between group">
        <div>
          <div class="h-40 rounded-xl overflow-hidden mb-4 bg-stone-100">
            <img src="${t.image}" alt="${t.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          </div>
          <span class="text-[10px] font-semibold tracking-widest uppercase text-aurelle-gold">${t.categoryName}</span>
          <h4 class="font-serif text-lg text-aurelle-charcoal dark:text-aurelle-darktext mt-1 group-hover:text-aurelle-gold transition-colors">
            <a href="./treatment-details.html?id=${t.id}">${t.name}</a>
          </h4>
          <p class="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-2 font-light">${t.shortDescription}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-stone-100 dark:border-aurelle-darkborder flex items-center justify-between text-xs">
          <span class="font-semibold text-aurelle-charcoal dark:text-aurelle-gold">${t.priceFormatted}</span>
          <a href="./treatment-details.html?id=${t.id}" class="text-aurelle-gold font-medium hover:underline">View &rarr;</a>
        </div>
      </div>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', initTreatmentDetails);
})();
