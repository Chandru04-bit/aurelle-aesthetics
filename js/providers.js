/**
 * Aurelle Aesthetics - Providers & Specialists Directory Engine
 */

(function () {
  let activeRoleFilter = 'all';
  let searchTerm = '';

  function initProvidersPage() {
    const grid = document.getElementById('providers-grid');
    if (!grid || !window.StorageService) return;

    const providers = window.StorageService.getProviders();

    // Check URL parameters for preset provider or filter
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam) {
      activeRoleFilter = filterParam;
      updateActiveFilterPill(filterParam);
    }

    renderProviders(providers);
    bindFilterEvents(providers);
  }

  function renderProviders(providers) {
    const grid = document.getElementById('providers-grid');
    const emptyState = document.getElementById('providers-empty-state');
    const countDisplay = document.getElementById('providers-count');
    if (!grid) return;

    let filtered = providers.filter(p => {
      let matchRole = true;
      if (activeRoleFilter !== 'all') {
        const rf = activeRoleFilter.toLowerCase();
        matchRole = p.id.toLowerCase().includes(rf) ||
                    (p.role && p.role.toLowerCase().includes(rf)) ||
                    (p.department && p.department.toLowerCase().includes(rf));
      }
      const q = searchTerm.toLowerCase();
      const matchSearch = !searchTerm ||
        p.name.toLowerCase().includes(q) ||
        (p.role && p.role.toLowerCase().includes(q)) ||
        (p.department && p.department.toLowerCase().includes(q)) ||
        (p.specialty && p.specialty.toLowerCase().includes(q)) ||
        (p.qualifications && p.qualifications.toLowerCase().includes(q)) ||
        (p.degrees && p.degrees.toLowerCase().includes(q)) ||
        (p.clinicalExpertise && p.clinicalExpertise.some(e => e.toLowerCase().includes(q))) ||
        (p.specialties && p.specialties.some(s => s.toLowerCase().includes(q)));
      return matchRole && matchSearch;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} specialist${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    grid.innerHTML = filtered.map(p => `
      <article class="card-luxury overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury">
        <!-- Provider Headshot & Header Badges -->
        <div class="relative h-80 sm:h-96 overflow-hidden bg-stone-100 dark:bg-stone-800">
          <img 
            src="${p.image}" 
            alt="Portrait of ${p.name}" 
            loading="lazy"
            class="w-full h-full object-cover ${p.imagePosition || 'provider-img-vance'} transition-transform duration-700 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
          
          <!-- Department Pill Badge -->
          <div class="absolute top-4 left-4">
            <span class="badge-pill bg-white/95 dark:bg-aurelle-darkcard/95 text-aurelle-charcoal dark:text-aurelle-gold text-[10px] tracking-wider uppercase font-semibold backdrop-blur-md shadow-sm">
              ${p.department || 'Clinical Specialist'}
            </span>
          </div>

          <!-- Bottom Image Overlay Information -->
          <div class="absolute bottom-4 left-4 right-4 text-white">
            <div class="flex items-center gap-2 mb-1">
              <span class="inline-block px-2.5 py-0.5 rounded-full bg-aurelle-gold text-stone-900 text-[10px] font-bold tracking-widest uppercase">
                Verified Specialist
              </span>
              <span class="text-[11px] text-stone-300 font-light">Demo Credentials</span>
            </div>
            <h3 class="font-serif text-2xl sm:text-3xl font-normal text-white drop-shadow-sm">${p.name}</h3>
            <p class="text-xs text-stone-200 font-light drop-shadow-sm mt-0.5">${p.degrees || p.role}</p>
          </div>
        </div>

        <!-- Provider Detailed Information -->
        <div class="p-6 sm:p-7 flex-1 min-w-0 flex flex-col gap-5">
          <div class="flex-1 min-w-0 flex flex-col gap-4">
            
            <!-- Experience & Rating Header Bar -->
            <div class="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pb-3 border-b border-stone-100 dark:border-aurelle-darkborder">
              <span class="font-medium text-aurelle-charcoal dark:text-stone-200">✨ ${p.experience}</span>
              <span class="flex items-center gap-1 text-amber-500 font-semibold">
                ★ ${p.rating} <span class="text-stone-400 font-normal">(${p.reviewsCount} reviews)</span>
              </span>
            </div>

            <!-- Focus Specialty & Qualifications -->
            <div>
              <span class="text-[10px] font-bold uppercase tracking-widest text-aurelle-gold block mb-1">Medical Focus</span>
              <h4 class="text-base font-medium text-aurelle-charcoal dark:text-white">${p.specialty}</h4>
              <p class="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-light">
                <strong>Training:</strong> ${p.qualifications || p.education || 'Advanced Clinical Aesthetics'}
              </p>
            </div>

            <!-- Bio Excerpt -->
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed line-clamp-3">
              ${p.bio}
            </p>

            <!-- Clinical Expertise Tags -->
            <div class="space-y-1.5 pt-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Areas of Clinical Expertise:</span>
              <div class="flex flex-wrap gap-1.5">
                ${(p.clinicalExpertise || p.specialties).map(spec => `
                  <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-aurelle-darkborder">
                    ${spec}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Board Certifications Highlight -->
            ${p.boardCertifications ? `
              <div class="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-100 dark:border-aurelle-darkborder/70 text-xs space-y-1">
                <span class="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Board Certifications:</span>
                <p class="text-stone-600 dark:text-stone-300 font-light">${p.boardCertifications.slice(0, 2).join(' • ')}</p>
              </div>
            ` : ''}

            <!-- Availability & Languages Bar -->
            <div class="provider-availability mt-auto pt-3 border-t border-stone-100 dark:border-aurelle-darkborder text-xs text-stone-500 dark:text-stone-400 grid gap-2">
              <div class="min-w-0 flex items-start gap-1.5">
                <svg class="w-4 h-4 text-aurelle-sage shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>Clinic Days: <strong>${p.availableDays.join(', ')}</strong></span>
              </div>
              ${p.languages ? `
                <span class="provider-languages text-[11px] text-stone-400">Languages: ${p.languages.join(', ')}</span>
              ` : ''}
            </div>

          </div>

          <!-- Dual CTAs: View Profile & Book Appointment -->
          <div class="mt-auto pt-4 border-t border-stone-100 dark:border-aurelle-darkborder flex flex-col sm:flex-row items-center gap-2.5">
            <button 
              type="button" 
              class="provider-bio-btn btn-secondary text-xs py-2.5 px-4 w-full sm:flex-1 text-center font-medium shadow-none" 
              data-provider-id="${p.id}"
            >
              View Profile
            </button>
            <a 
              href="./booking.html?provider=${p.id}" 
              class="btn-primary text-xs py-2.5 px-4 w-full sm:flex-1 text-center font-medium shadow-none"
            >
              Book Appointment
            </a>
          </div>

        </div>
      </article>
    `).join('');

    bindBioModalEvents(providers);
  }

  function updateActiveFilterPill(filterValue) {
    const filterButtons = document.querySelectorAll('.provider-filter-btn');
    filterButtons.forEach(b => {
      if (b.dataset.filter === filterValue) {
        b.classList.add('bg-aurelle-charcoal', 'text-white', 'dark:bg-aurelle-gold', 'dark:text-aurelle-charcoal');
        b.classList.remove('bg-stone-100', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300');
      } else {
        b.classList.remove('bg-aurelle-charcoal', 'text-white', 'dark:bg-aurelle-gold', 'dark:text-aurelle-charcoal');
        b.classList.add('bg-stone-100', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300');
      }
    });
  }

  function bindFilterEvents(providers) {
    // Search input
    const searchInput = document.getElementById('providers-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.trim();
        renderProviders(providers);
      });
    }

    // Role filter buttons
    const filterButtons = document.querySelectorAll('.provider-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        activeRoleFilter = btn.dataset.filter || 'all';
        updateActiveFilterPill(activeRoleFilter);
        renderProviders(providers);
      });
    });

    // Quick department cards click
    const deptCards = document.querySelectorAll('[data-department-filter]');
    deptCards.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const f = btn.dataset.departmentFilter;
        if (f) {
          activeRoleFilter = f;
          updateActiveFilterPill(f);
          renderProviders(providers);
          const toolbar = document.getElementById('providers-filter-toolbar');
          if (toolbar) {
            toolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Reset filter button
    const resetBtn = document.getElementById('providers-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeRoleFilter = 'all';
        searchTerm = '';
        if (searchInput) searchInput.value = '';
        updateActiveFilterPill('all');
        renderProviders(providers);
      });
    }
  }

  function bindBioModalEvents(providers) {
    const bioButtons = document.querySelectorAll('.provider-bio-btn');
    const modalTitle = document.getElementById('provider-modal-name');
    const modalRole = document.getElementById('provider-modal-role');
    const modalDepartment = document.getElementById('provider-modal-department');
    const modalQualifications = document.getElementById('provider-modal-qualifications');
    const modalEducation = document.getElementById('provider-modal-education');
    const modalCerts = document.getElementById('provider-modal-certs');
    const modalExpertise = document.getElementById('provider-modal-expertise');
    const modalPhilosophy = document.getElementById('provider-modal-philosophy');
    const modalBio = document.getElementById('provider-modal-bio');
    const modalImg = document.getElementById('provider-modal-img');
    const modalBook = document.getElementById('provider-modal-book-btn');

    bioButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.providerId;
        const provider = providers.find(p => p.id === id);
        if (!provider) return;

        if (modalTitle) modalTitle.textContent = provider.name;
        if (modalRole) modalRole.textContent = provider.degrees || provider.role;
        if (modalDepartment) modalDepartment.textContent = provider.department || 'Aesthetics Department';
        if (modalQualifications) modalQualifications.textContent = provider.qualifications || '';
        if (modalEducation) modalEducation.textContent = provider.education || '';
        
        if (modalCerts) {
          if (provider.boardCertifications && provider.boardCertifications.length) {
            modalCerts.innerHTML = provider.boardCertifications.map(c => `
              <li class="flex items-start gap-2">
                <span class="text-aurelle-gold font-bold">✓</span>
                <span>${c}</span>
              </li>
            `).join('');
          } else {
            modalCerts.innerHTML = '<li>Medical Aesthetics Practice Certification</li>';
          }
        }

        if (modalExpertise) {
          const areas = provider.clinicalExpertise || provider.specialties;
          modalExpertise.innerHTML = areas.map(a => `
            <span class="text-xs px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              ${a}
            </span>
          `).join('');
        }

        if (modalPhilosophy) {
          modalPhilosophy.textContent = provider.patientPhilosophy || '';
        }

        if (modalBio) modalBio.textContent = provider.bio;

        if (modalImg) {
          modalImg.src = provider.image;
          modalImg.className = `w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover ${provider.imagePosition || 'provider-img-vance'} border border-stone-200 shrink-0`;
        }

        if (modalBook) modalBook.href = `./booking.html?provider=${provider.id}`;

        if (window.AurelleUI && window.AurelleUI.modal) {
          window.AurelleUI.modal.open('provider-bio-modal');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initProvidersPage);
})();
