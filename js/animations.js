/**
 * Aurelle Aesthetics - Animations, Modals, Accordions & Toast Notification Engine
 */

(function () {
  // Toast Notifications Engine
  function showToast(message, type = 'success', duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast flex items-start gap-3 p-4 rounded-xl shadow-luxury bg-white dark:bg-aurelle-darkcard border border-stone-200 dark:border-aurelle-darkborder text-sm text-aurelle-charcoal dark:text-aurelle-darktext';

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<div class="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      </div>`;
    } else if (type === 'error') {
      iconSvg = `<div class="p-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </div>`;
    } else {
      iconSvg = `<div class="p-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="flex-1 text-xs sm:text-sm font-normal leading-snug">${message}</div>
      <button type="button" class="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs shrink-0" aria-label="Close notification">&times;</button>
    `;

    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => removeToast(toast));

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 20);

    const timer = setTimeout(() => {
      removeToast(toast);
    }, duration);

    function removeToast(el) {
      clearTimeout(timer);
      el.classList.remove('show');
      el.classList.add('hide');
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 350);
    }
  }

  // Modal Manager
  const ModalController = {
    open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.add('open');
      }, 10);
      document.body.style.overflow = 'hidden';

      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length) focusable[0].focus();
    },

    close(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      modal.classList.remove('open');
      setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }
  };

  // Accordion Controller
  function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item') || header.parentElement;
        const content = item.querySelector('.accordion-content');
        const chevron = header.querySelector('.accordion-chevron');
        const isOpen = content.classList.contains('open');

        // Optional: close other accordions in the same group if needed
        const group = header.closest('[data-accordion-group]');
        if (group) {
          group.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
          group.querySelectorAll('.accordion-chevron').forEach(ch => ch.classList.remove('rotated'));
        }

        if (!isOpen) {
          content.classList.add('open');
          if (chevron) chevron.classList.add('rotated');
          header.setAttribute('aria-expanded', 'true');
        } else {
          content.classList.remove('open');
          if (chevron) chevron.classList.remove('rotated');
          header.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Reveal On Scroll Observer
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('opacity-100', 'translate-y-0'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-6');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
      el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-6');
      observer.observe(el);
    });
  }

  // Global listeners for modals with data-modal-close
  document.addEventListener('click', (e) => {
    const closeTrigger = e.target.closest('[data-modal-close]');
    if (closeTrigger) {
      const modal = closeTrigger.closest('.modal-backdrop');
      if (modal && modal.id) {
        ModalController.close(modal.id);
      }
    }

    // Click outside backdrop to close
    if (e.target.classList.contains('modal-backdrop')) {
      ModalController.close(e.target.id);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-backdrop.open');
      if (openModal) {
        ModalController.close(openModal.id);
      }
    }
  });

  // Expose to window
  window.AurelleUI = {
    toast: showToast,
    modal: ModalController,
    initAccordions,
    initScrollReveal
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initScrollReveal();
  });
})();
