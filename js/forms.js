/**
 * Aurelle Aesthetics - Accessible Form Validation Engine
 */

(function () {
  const EMAIL_REGEX = /^(?:[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+[A-Z]{2,}$/i;
  const FULL_NAME_REGEX = /^\p{L}+(?:\s+\p{L}+)*$/u;
  const PHONE_CHARACTERS_REGEX = /^(?:\+|00)?[0-9][0-9\s().-]*$/;

  const FormValidator = {
    validateEmail(email) {
      return EMAIL_REGEX.test(String(email).trim());
    },

    validatePhone(phone) {
      const value = String(phone || '').trim();
      if (!value || !PHONE_CHARACTERS_REGEX.test(value)) return false;

      let parenthesisDepth = 0;
      for (const character of value) {
        if (character === '(') parenthesisDepth += 1;
        if (character === ')') parenthesisDepth -= 1;
        if (parenthesisDepth < 0 || parenthesisDepth > 1) return false;
      }
      if (parenthesisDepth !== 0) return false;

      const digitCount = value.replace(/\D/g, '').length;
      return digitCount >= 7 && digitCount <= 15;
    },

    validateFullName(name) {
      return FULL_NAME_REGEX.test(String(name || '').normalize('NFC').trim());
    },

    validateNotEmpty(value) {
      return String(value || '').trim().length > 0;
    },

    validateMinLength(value, min = 6) {
      return String(value || '').trim().length >= min;
    },

    validateNotPastDate(dateString) {
      if (!dateString) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(dateString + 'T00:00:00');
      return selected >= today;
    },

    showError(inputElement, message) {
      if (!inputElement) return;
      inputElement.setAttribute('aria-invalid', 'true');
      inputElement.classList.add('border-rose-500', 'focus:ring-rose-400');

      const errorId = `${inputElement.id}-error`;
      let errorEl = document.getElementById(errorId);
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.id = errorId;
        errorEl.className = 'form-error-msg text-xs text-rose-500 mt-1';
        errorEl.setAttribute('role', 'alert');
        errorEl.dataset.validationError = 'true';
        if (inputElement.type === 'checkbox') {
          inputElement.parentElement.insertAdjacentElement('afterend', errorEl);
        } else {
          inputElement.insertAdjacentElement('afterend', errorEl);
        }
      }
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
      const describedBy = new Set((inputElement.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
      describedBy.add(errorId);
      inputElement.setAttribute('aria-describedby', [...describedBy].join(' '));
    },

    clearError(inputElement) {
      if (!inputElement) return;
      inputElement.removeAttribute('aria-invalid');
      inputElement.classList.remove('border-rose-500', 'focus:ring-rose-400');

      const errorId = `${inputElement.id}-error`;
      const errorEl = document.getElementById(errorId);
      if (errorEl) {
        if (errorEl.dataset.validationError) {
          errorEl.remove();
        } else {
          errorEl.textContent = '';
          errorEl.classList.add('hidden');
        }
      }
      if (!errorEl || errorEl.dataset.validationError) {
        const describedBy = (inputElement.getAttribute('aria-describedby') || '')
          .split(/\s+/)
          .filter(id => id && id !== errorId);
        if (describedBy.length) inputElement.setAttribute('aria-describedby', describedBy.join(' '));
        else inputElement.removeAttribute('aria-describedby');
      }
    },

    bindLiveValidation(formElement) {
      if (!formElement) return;
      const inputs = formElement.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateSingleField(input);
        });
        input.addEventListener('input', () => {
          if (input.getAttribute('aria-invalid') === 'true') {
            this.validateSingleField(input);
          }
        });
        input.addEventListener('change', () => {
          if (input.getAttribute('aria-invalid') === 'true') {
            this.validateSingleField(input);
          }
        });
      });
    },

    validateSingleField(field) {
      if (!field || !field.name) return true;
      const value = field.value.trim();

      if ((field.name === 'fullName' || field.id === 'contact-name') && value && !this.validateFullName(value)) {
        this.showError(field, 'Enter your name using letters and spaces only.');
        return false;
      }

      if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
        this.showError(field, 'Please provide consent before submitting.');
        return false;
      }

      if (field.hasAttribute('required') && !this.validateNotEmpty(value)) {
        this.showError(field, 'This field is required.');
        return false;
      }

      if (field.type === 'email' && value && !this.validateEmail(value)) {
        this.showError(field, 'Please enter a valid email address');
        return false;
      }

      if (field.type === 'tel' && value && !this.validatePhone(value)) {
        this.showError(field, 'Enter a valid phone number with 7 to 15 digits. Country codes and common separators are accepted.');
        return false;
      }

      if ((field.name === 'message' || field.id === 'contact-message') && value.length < 10) {
        this.showError(field, 'Please enter at least 10 characters so our team can help you.');
        return false;
      }

      if (field.type === 'date' && value && !this.validateNotPastDate(value)) {
        this.showError(field, 'Please select today or a future date');
        return false;
      }

      this.clearError(field);
      return true;
    }
  };

  // Contact form submission handler
  function initContactForm() {
    const form = document.getElementById('contact-inquiry-form');
    if (!form) return;

    FormValidator.bindLiveValidation(form);
    let isSubmitting = false;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      document.getElementById('contact-success-banner')?.classList.add('hidden');

      let isValid = true;
      const inputs = form.querySelectorAll('[required]');

      inputs.forEach(input => {
        if (!FormValidator.validateSingleField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        if (window.AurelleUI) window.AurelleUI.toast('Please correct the highlighted errors in the form.', 'error');
        return;
      }

      const formData = {
        fullName: form.querySelector('#contact-name').value.normalize('NFC').trim().replace(/\s+/g, ' '),
        email: form.querySelector('#contact-email').value.trim(),
        phone: form.querySelector('#contact-phone').value.trim(),
        interest: form.querySelector('#contact-interest')?.value,
        message: form.querySelector('#contact-message').value.trim(),
        preferredTime: form.querySelector('#contact-time')?.value,
        consent: form.querySelector('#contact-consent').checked
      };

      const submitButton = form.querySelector('button[type="submit"]');
      const submissionError = document.getElementById('contact-submission-error');
      isSubmitting = true;
      form.setAttribute('aria-busy', 'true');
      if (submitButton) submitButton.disabled = true;
      if (submissionError) {
        submissionError.textContent = '';
        submissionError.classList.add('hidden');
      }

      try {
        if (!window.StorageService || typeof window.StorageService.saveInquiry !== 'function') {
          throw new Error('Inquiry storage is unavailable.');
        }
        const savedInquiry = window.StorageService.saveInquiry(formData);
        if (!savedInquiry || !savedInquiry.id) {
          throw new Error('Inquiry storage did not confirm the save.');
        }

        const successBox = document.getElementById('contact-success-banner');
        if (successBox) {
          successBox.classList.remove('hidden');
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        form.reset();
        form.querySelectorAll('input, select, textarea').forEach(field => FormValidator.clearError(field));
        if (window.AurelleUI) {
          window.AurelleUI.toast('Inquiry submitted successfully! Our clinic concierge will reach out shortly (Demo).', 'success', 5000);
        }
      } catch (error) {
        console.error('Failed to save contact inquiry:', error);
        if (submissionError) {
          submissionError.textContent = 'We could not save your inquiry. Please try again.';
          submissionError.classList.remove('hidden');
        }
        if (window.AurelleUI) window.AurelleUI.toast('We could not save your inquiry. Please try again.', 'error');
      } finally {
        isSubmitting = false;
        form.removeAttribute('aria-busy');
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  // Newsletter form submission handler
  function initNewsletterForms() {
    document.addEventListener('submit', (e) => {
      const form = e.target.closest('#footer-newsletter-form');
      if (form) {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && FormValidator.validateEmail(emailInput.value)) {
          const feedback = document.getElementById('newsletter-feedback');
          if (feedback) feedback.classList.remove('hidden');
          if (window.AurelleUI) window.AurelleUI.toast('Welcome to the Aurelle VIP Journal!', 'success');
          emailInput.value = '';
        } else if (emailInput) {
          FormValidator.showError(emailInput, 'Please enter a valid email address');
        }
      }
    });
  }

  window.FormValidator = FormValidator;
  document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initNewsletterForms();
  });
})();
