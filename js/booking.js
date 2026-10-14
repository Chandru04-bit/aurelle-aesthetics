/**
 * Aurelle Aesthetics - Interactive Multi-Step Appointment Booking Engine
 */

(function () {
  let currentStep = 1;
  const totalSteps = 5;

  const bookingState = {
    treatment: null,
    provider: null,
    date: null,
    time: null,
    client: {
      fullName: '',
      email: '',
      phone: '',
      notes: '',
      isFirstTime: true
    }
  };

  const SAMPLE_TIME_SLOTS = [
    { time: '09:30 AM', period: 'Morning' },
    { time: '11:00 AM', period: 'Morning' },
    { time: '01:30 PM', period: 'Afternoon' },
    { time: '03:00 PM', period: 'Afternoon' },
    { time: '04:45 PM', period: 'Afternoon' },
    { time: '06:00 PM', period: 'Evening' }
  ];

  function initBookingWizard() {
    const wizardContainer = document.getElementById('booking-wizard-container');
    if (!wizardContainer || !window.StorageService) return;

    // Prefill user data if logged in
    const user = window.StorageService.getCurrentUser();
    if (user) {
      bookingState.client.fullName = user.name || '';
      bookingState.client.email = user.email || '';
      bookingState.client.phone = user.phone || '';
    }

    // Parse URL params for pre-selected treatment or provider
    const urlParams = new URLSearchParams(window.location.search);
    const preTreatmentId = urlParams.get('treatment');
    const preProviderId = urlParams.get('provider');

    const treatments = window.StorageService.getTreatments();
    const providers = window.StorageService.getProviders();

    if (preTreatmentId) {
      const found = treatments.find(t => t.id === preTreatmentId);
      if (found) bookingState.treatment = found;
    } else {
      bookingState.treatment = treatments[0];
    }

    if (preProviderId) {
      const foundP = providers.find(p => p.id === preProviderId);
      if (foundP) bookingState.provider = foundP;
    } else {
      bookingState.provider = providers[0];
    }

    // Set minimum date for date picker to tomorrow
    const dateInput = document.getElementById('booking-date-input');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const minStr = tomorrow.toISOString().split('T')[0];
      dateInput.min = minStr;
      dateInput.value = minStr;
      bookingState.date = minStr;
    }

    bookingState.time = SAMPLE_TIME_SLOTS[1].time;

    renderStep1Treatments(treatments);
    renderStep2Providers(providers);
    renderTimeSlots();
    populateClientInputs();
    updateSummarySidebar();
    bindWizardNavigation();
    bindFormInputs();
  }

  // Render Step 1: Treatments selection list
  function renderStep1Treatments(treatments) {
    const container = document.getElementById('step-1-treatments-list');
    if (!container) return;

    container.innerHTML = treatments.map(t => {
      const isSelected = bookingState.treatment && bookingState.treatment.id === t.id;
      return `
        <div 
          class="treatment-select-card p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${isSelected ? 'border-aurelle-gold bg-aurelle-blush/10 dark:bg-stone-800' : 'border-stone-200 dark:border-aurelle-darkborder hover:border-stone-400 bg-white dark:bg-aurelle-darkcard'}"
          data-treatment-id="${t.id}"
        >
          <div class="flex items-center gap-4">
            <img src="${t.image}" alt="${t.name}" class="w-16 h-16 rounded-lg object-cover shrink-0">
            <div>
              <span class="text-[10px] uppercase font-bold tracking-wider text-aurelle-gold">${t.categoryName}</span>
              <h4 class="font-serif text-base font-medium text-aurelle-charcoal dark:text-aurelle-darktext">${t.name}</h4>
              <p class="text-xs text-stone-500 dark:text-stone-400 mt-0.5">⏱ ${t.duration} &bull; Downtime: ${t.downtime}</p>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="text-sm font-semibold text-aurelle-charcoal dark:text-aurelle-gold block">${t.priceFormatted}</span>
            <span class="text-[11px] font-medium text-stone-400">${isSelected ? '✓ Selected' : 'Select'}</span>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.treatment-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.treatmentId;
        bookingState.treatment = treatments.find(t => t.id === id);
        renderStep1Treatments(treatments);
        updateSummarySidebar();
      });
    });
  }

  // Render Step 2: Providers selection list
  function renderStep2Providers(providers) {
    const container = document.getElementById('step-2-providers-list');
    if (!container) return;

    container.innerHTML = providers.map(p => {
      const isSelected = bookingState.provider && bookingState.provider.id === p.id;
      return `
        <div 
          class="provider-select-card p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${isSelected ? 'border-aurelle-gold bg-aurelle-blush/10 dark:bg-stone-800' : 'border-stone-200 dark:border-aurelle-darkborder hover:border-stone-400 bg-white dark:bg-aurelle-darkcard'}"
          data-provider-id="${p.id}"
        >
          <div class="flex items-center gap-4">
            <img src="${p.image}" alt="${p.name}" class="w-16 h-16 rounded-full object-cover ${p.imagePosition || 'provider-img-vance'} shrink-0 border border-stone-200">
            <div>
              <span class="text-[10px] uppercase font-bold tracking-wider text-aurelle-sage">Specialist</span>
              <h4 class="font-serif text-base font-medium text-aurelle-charcoal dark:text-aurelle-darktext">${p.name}</h4>
              <p class="text-xs text-stone-500 dark:text-stone-400 mt-0.5">${p.specialty}</p>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="text-xs text-amber-500 font-medium block">★ ${p.rating}</span>
            <span class="text-[11px] font-medium text-stone-400">${isSelected ? '✓ Selected' : 'Select'}</span>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.provider-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.providerId;
        bookingState.provider = providers.find(p => p.id === id);
        renderStep2Providers(providers);
        updateSummarySidebar();
      });
    });
  }

  // Render Step 3: Time slots
  function renderTimeSlots() {
    const container = document.getElementById('time-slots-container');
    if (!container) return;

    container.innerHTML = SAMPLE_TIME_SLOTS.map(slot => {
      const isSelected = bookingState.time === slot.time;
      return `
        <button 
          type="button" 
          class="time-slot-btn py-3 px-4 rounded-xl border text-xs sm:text-sm font-medium transition-all ${isSelected ? 'bg-aurelle-charcoal text-white dark:bg-aurelle-gold dark:text-aurelle-charcoal border-transparent shadow-sm' : 'bg-white dark:bg-aurelle-darkcard border-stone-200 dark:border-aurelle-darkborder text-stone-700 dark:text-stone-300 hover:border-aurelle-gold'}"
          data-time="${slot.time}"
        >
          <span class="block font-semibold">${slot.time}</span>
          <span class="text-[10px] opacity-75">${slot.period}</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.time-slot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bookingState.time = btn.dataset.time;
        renderTimeSlots();
        updateSummarySidebar();
      });
    });
  }

  function populateClientInputs() {
    const nameInput = document.getElementById('booking-client-name');
    const emailInput = document.getElementById('booking-client-email');
    const phoneInput = document.getElementById('booking-client-phone');
    const notesInput = document.getElementById('booking-client-notes');

    if (nameInput && bookingState.client.fullName) nameInput.value = bookingState.client.fullName;
    if (emailInput && bookingState.client.email) emailInput.value = bookingState.client.email;
    if (phoneInput && bookingState.client.phone) phoneInput.value = bookingState.client.phone;
    if (notesInput && bookingState.client.notes) notesInput.value = bookingState.client.notes;
  }

  function bindFormInputs() {
    const dateInput = document.getElementById('booking-date-input');
    if (dateInput) {
      dateInput.addEventListener('change', (e) => {
        bookingState.date = e.target.value;
        updateSummarySidebar();
      });
    }

    const nameInput = document.getElementById('booking-client-name');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        bookingState.client.fullName = e.target.value;
      });
    }

    const emailInput = document.getElementById('booking-client-email');
    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        bookingState.client.email = e.target.value;
      });
    }

    const phoneInput = document.getElementById('booking-client-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        bookingState.client.phone = e.target.value;
      });
    }

    const notesInput = document.getElementById('booking-client-notes');
    if (notesInput) {
      notesInput.addEventListener('input', (e) => {
        bookingState.client.notes = e.target.value;
      });
    }
  }

  function updateSummarySidebar() {
    const summaryTreatment = document.getElementById('summary-treatment-name');
    const summaryTreatmentPrice = document.getElementById('summary-treatment-price');
    const summaryTreatmentDuration = document.getElementById('summary-treatment-duration');
    const summaryProvider = document.getElementById('summary-provider-name');
    const summaryDateTime = document.getElementById('summary-datetime');
    const summaryTotal = document.getElementById('summary-total-price');

    if (bookingState.treatment) {
      if (summaryTreatment) summaryTreatment.textContent = bookingState.treatment.name;
      if (summaryTreatmentPrice) summaryTreatmentPrice.textContent = bookingState.treatment.priceFormatted;
      if (summaryTreatmentDuration) summaryTreatmentDuration.textContent = bookingState.treatment.duration;
      if (summaryTotal) summaryTotal.textContent = bookingState.treatment.priceFormatted;
    }

    if (bookingState.provider && summaryProvider) {
      summaryProvider.textContent = bookingState.provider.name;
    }

    if (summaryDateTime) {
      const dateFormatted = bookingState.date ? new Date(bookingState.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date';
      summaryDateTime.textContent = `${dateFormatted} at ${bookingState.time || 'Select Time'}`;
    }
  }

  function renderStep5Review() {
    const reviewContainer = document.getElementById('step-5-review-container');
    if (!reviewContainer) return;

    const dateFormatted = bookingState.date ? new Date(bookingState.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Not selected';

    reviewContainer.innerHTML = `
      <div class="space-y-4">
        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-aurelle-darkborder">
          <span class="text-[10px] uppercase font-bold tracking-wider text-aurelle-gold">Selected Procedure</span>
          <h4 class="font-serif text-lg text-aurelle-charcoal dark:text-aurelle-darktext font-medium mt-1">${bookingState.treatment?.name}</h4>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">Duration: ${bookingState.treatment?.duration} &bull; Investment: ${bookingState.treatment?.priceFormatted}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-aurelle-darkborder">
            <span class="text-[10px] uppercase font-bold tracking-wider text-aurelle-sage">Aesthetic Specialist</span>
            <p class="font-serif text-base text-aurelle-charcoal dark:text-aurelle-darktext font-medium mt-1">${bookingState.provider?.name}</p>
            <p class="text-xs text-stone-500 dark:text-stone-400">${bookingState.provider?.role}</p>
          </div>

          <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-aurelle-darkborder">
            <span class="text-[10px] uppercase font-bold tracking-wider text-aurelle-gold">Appointment Time</span>
            <p class="font-serif text-base text-aurelle-charcoal dark:text-aurelle-darktext font-medium mt-1">${dateFormatted}</p>
            <p class="text-xs text-stone-500 dark:text-stone-400">${bookingState.time}</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-aurelle-darkborder space-y-1 text-xs">
          <span class="text-[10px] uppercase font-bold tracking-wider text-stone-400">Client Details</span>
          <p class="text-stone-800 dark:text-stone-200 font-medium">${bookingState.client.fullName} &bull; ${bookingState.client.phone}</p>
          <p class="text-stone-500 dark:text-stone-400">${bookingState.client.email}</p>
          ${bookingState.client.notes ? `<p class="text-stone-500 dark:text-stone-400 pt-1 italic">Note: "${bookingState.client.notes}"</p>` : ''}
        </div>
      </div>
    `;
  }

  function goToStep(step) {
    if (step < 1 || step > totalSteps) return;

    // Step validation before advancing
    if (step > currentStep) {
      if (currentStep === 1 && !bookingState.treatment) {
        if (window.AurelleUI) window.AurelleUI.toast('Please select a treatment to proceed', 'error');
        return;
      }
      if (currentStep === 2 && !bookingState.provider) {
        if (window.AurelleUI) window.AurelleUI.toast('Please select a specialist to proceed', 'error');
        return;
      }
      if (currentStep === 3) {
        if (!bookingState.date || !window.FormValidator.validateNotPastDate(bookingState.date)) {
          if (window.AurelleUI) window.AurelleUI.toast('Please select a valid future date', 'error');
          return;
        }
        if (!bookingState.time) {
          if (window.AurelleUI) window.AurelleUI.toast('Please select a time slot', 'error');
          return;
        }
      }
      if (currentStep === 4) {
        const nameVal = document.getElementById('booking-client-name')?.value.trim();
        const emailVal = document.getElementById('booking-client-email')?.value.trim();
        const phoneVal = document.getElementById('booking-client-phone')?.value.trim();

        if (!nameVal || !emailVal || !phoneVal) {
          if (window.AurelleUI) window.AurelleUI.toast('Please complete all required client contact fields', 'error');
          return;
        }
        if (!window.FormValidator.validateEmail(emailVal)) {
          if (window.AurelleUI) window.AurelleUI.toast('Please enter a valid email address', 'error');
          return;
        }
        bookingState.client.fullName = nameVal;
        bookingState.client.email = emailVal;
        bookingState.client.phone = phoneVal;
      }
    }

    currentStep = step;

    // Toggle step panes
    document.querySelectorAll('.wizard-step-pane').forEach((pane, idx) => {
      if (idx + 1 === currentStep) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    // Update Stepper Progress UI
    document.querySelectorAll('.step-item').forEach((item, idx) => {
      const stepNum = idx + 1;
      item.classList.remove('active', 'completed');
      if (stepNum === currentStep) {
        item.classList.add('active');
      } else if (stepNum < currentStep) {
        item.classList.add('completed');
      }
    });

    // Update bottom nav buttons
    const prevBtn = document.getElementById('wizard-prev-btn');
    const nextBtn = document.getElementById('wizard-next-btn');
    const submitBtn = document.getElementById('wizard-submit-btn');

    if (prevBtn) {
      if (currentStep === 1) prevBtn.classList.add('hidden');
      else prevBtn.classList.remove('hidden');
    }

    if (nextBtn && submitBtn) {
      if (currentStep === totalSteps) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
        renderStep5Review();
      } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
      }
    }

    window.scrollTo({ top: 150, behavior: 'smooth' });
  }

  function bindWizardNavigation() {
    const prevBtn = document.getElementById('wizard-prev-btn');
    const nextBtn = document.getElementById('wizard-next-btn');
    const submitBtn = document.getElementById('wizard-submit-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToStep(currentStep - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToStep(currentStep + 1));
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', handleBookingSubmission);
    }
  }

  function handleBookingSubmission() {
    const termsCheck = document.getElementById('booking-terms-check');
    if (termsCheck && !termsCheck.checked) {
      if (window.AurelleUI) window.AurelleUI.toast('Please acknowledge the demonstration clinic cancellation policy.', 'error');
      return;
    }

    const appointmentPayload = {
      treatmentId: bookingState.treatment.id,
      treatmentName: bookingState.treatment.name,
      providerId: bookingState.provider.id,
      providerName: bookingState.provider.name,
      date: bookingState.date,
      time: bookingState.time,
      price: bookingState.treatment.price,
      duration: bookingState.treatment.duration,
      notes: bookingState.client.notes || 'Routine consultation and procedure.'
    };

    const createdAppointment = window.StorageService.addAppointment(appointmentPayload);

    // Show Confirmation Modal
    const modalRef = document.getElementById('confirm-modal-ref');
    const modalTreatment = document.getElementById('confirm-modal-treatment');
    const modalProvider = document.getElementById('confirm-modal-provider');
    const modalDateTime = document.getElementById('confirm-modal-datetime');

    if (modalRef) modalRef.textContent = createdAppointment.id;
    if (modalTreatment) modalTreatment.textContent = createdAppointment.treatmentName;
    if (modalProvider) modalProvider.textContent = createdAppointment.providerName;
    if (modalDateTime) modalDateTime.textContent = `${createdAppointment.date} at ${createdAppointment.time}`;

    if (window.AurelleUI && window.AurelleUI.modal) {
      window.AurelleUI.modal.open('booking-success-modal');
    }
  }

  document.addEventListener('DOMContentLoaded', initBookingWizard);
})();
