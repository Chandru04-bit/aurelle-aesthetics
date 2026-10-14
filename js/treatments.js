/**
 * Aurelle Aesthetics - Treatments Listing & Interactive Filter Engine
 */

(function () {
  let activeCategory = 'all';
  let searchTerm = '';
  let activeSort = 'featured';

  function initTreatmentsPage() {
    const grid = document.getElementById('treatments-grid');
    if (!grid || !window.StorageService) return;

    const treatments = window.StorageService.getTreatments();

    // Check URL for pre-selected category filter if any
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      activeCategory = categoryParam;
      updateActiveCategoryPill(categoryParam);
    }

    renderTreatments(treatments);
    bindEvents(treatments);
  }

  function renderTreatments(treatments) {
    const grid = document.getElementById('treatments-grid');
    const emptyState = document.getElementById('treatments-empty-state');
    const countDisplay = document.getElementById('treatments-count');

    if (!grid) return;

    let filtered = treatments.filter(item => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchTerm.toLowerCase();
      const matchSearch = !searchTerm ||
        item.name.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        (item.fullDescription && item.fullDescription.toLowerCase().includes(q)) ||
        (item.procedureOverview && item.procedureOverview.toLowerCase().includes(q)) ||
        (item.expectedOutcomes && item.expectedOutcomes.toLowerCase().includes(q)) ||
        (item.conditionsTreated && item.conditionsTreated.some(c => c.toLowerCase().includes(q))) ||
        item.targetAreas.some(a => a.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });

    if (activeSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} treatment${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    grid.innerHTML = filtered.map(t => `
      <article class="card-luxury min-w-0 overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury">
        <!-- Treatment Card Image & Badges -->
        <div class="relative h-64 overflow-hidden bg-stone-100 dark:bg-stone-800">
          <img 
            src="${t.image}" 
            alt="${t.name} aesthetic procedure at Aurelle" 
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
          
          <div class="absolute top-4 left-4 flex gap-2">
            <span class="badge-pill bg-white/95 dark:bg-aurelle-darkcard/95 text-aurelle-charcoal dark:text-aurelle-gold text-[10px] tracking-wider uppercase font-semibold backdrop-blur-md shadow-sm">
              ${t.categoryName}
            </span>
          </div>

          <div class="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-x-2 gap-y-2 text-white text-xs">
            <span class="flex items-center gap-1.5 font-medium drop-shadow-sm bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
              <svg class="w-3.5 h-3.5 text-aurelle-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              ${t.duration}
            </span>
            <span class="font-semibold text-sm text-aurelle-gold drop-shadow-sm bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
              ${t.priceFormatted}
            </span>
          </div>
        </div>

        <!-- Treatment Details Body -->
        <div class="p-6 flex-1 min-w-0 flex flex-col gap-5">
          <div class="space-y-4">
            <div>
              <h3 class="treatment-card-title font-serif text-xl sm:text-2xl font-normal text-aurelle-charcoal dark:text-white group-hover:text-aurelle-gold transition-colors [overflow-wrap:anywhere]">
                <a href="./treatment-details.html?id=${t.id}">${t.name}</a>
              </h3>
              <p class="text-xs font-semibold uppercase tracking-widest text-aurelle-gold mt-1">
                ${t.tagline}
              </p>
            </div>

            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
              ${t.shortDescription}
            </p>

          </div>

          <!-- Dual CTAs: Learn More & Book an Appointment -->
          <div class="treatment-card-ctas mt-auto pt-4 border-t border-stone-100 dark:border-aurelle-darkborder">
            <a href="./treatment-details.html?id=${t.id}" class="treatment-card-cta btn-secondary text-xs py-2.5 px-4 text-center font-medium shadow-none">
              Learn More
            </a>
            <a href="./booking.html?treatment=${t.id}" class="treatment-card-cta btn-primary text-xs py-2.5 px-4 text-center font-medium shadow-none">
              Book an Appointment
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  function updateActiveCategoryPill(category) {
    const pills = document.querySelectorAll('.category-filter-btn');
    pills.forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add('bg-aurelle-charcoal', 'text-white', 'dark:bg-aurelle-gold', 'dark:text-aurelle-charcoal');
        btn.classList.remove('bg-stone-100', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300');
      } else {
        btn.classList.remove('bg-aurelle-charcoal', 'text-white', 'dark:bg-aurelle-gold', 'dark:text-aurelle-charcoal');
        btn.classList.add('bg-stone-100', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300');
      }
    });
  }

  function bindEvents(treatments) {
    // Search input listener
    const searchInput = document.getElementById('treatments-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.trim();
        renderTreatments(treatments);
      });
    }

    // Category filter buttons
    const filterBtns = document.querySelectorAll('.category-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category || 'all';
        updateActiveCategoryPill(activeCategory);
        renderTreatments(treatments);
      });
    });

    // Category Explorer cards quick select
    const categoryCardBtns = document.querySelectorAll('[data-category-select]');
    categoryCardBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = btn.dataset.categorySelect;
        if (cat) {
          activeCategory = cat;
          updateActiveCategoryPill(cat);
          renderTreatments(treatments);
          const toolbar = document.getElementById('treatments-filter-toolbar');
          if (toolbar) {
            toolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Sort selector
    const sortSelect = document.getElementById('treatments-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        activeSort = e.target.value;
        renderTreatments(treatments);
      });
    }

    // Reset filters button
    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeCategory = 'all';
        searchTerm = '';
        activeSort = 'featured';
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'featured';
        updateActiveCategoryPill('all');
        renderTreatments(treatments);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initTreatmentsPage);
})();
