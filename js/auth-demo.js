/** Account registration and sign-in backed by the site's shared storage service. */
(function () {
  const encoder = new TextEncoder();

  function passwordHash(password, salt) {
    return crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])
      .then(key => crypto.subtle.deriveBits({ name: 'PBKDF2', salt: encoder.encode(salt), iterations: 210000, hash: 'SHA-256' }, key, 256))
      .then(bits => Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, '0')).join(''));
  }

  function showFormError(form, message) {
    let banner = form.querySelector('.auth-form-error');
    if (!banner) {
      banner = document.createElement('p');
      banner.className = 'auth-form-error text-xs text-rose-600 dark:text-rose-400';
      banner.setAttribute('role', 'alert');
      form.prepend(banner);
    }
    banner.textContent = message;
  }

  function clearFormError(form) {
    form.querySelector('.auth-form-error')?.remove();
  }

  function initPasswordToggles() {
    document.querySelectorAll('.toggle-password-visibility').forEach(button => {
      button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
      });
    });
  }

  function initLogin() {
    const form = document.getElementById('demo-login-form');
    if (!form) return;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      clearFormError(form);
      const emailInput = document.getElementById('login-email');
      const passwordInput = document.getElementById('login-password');
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      if (!window.FormValidator.validateEmail(email)) {
        window.FormValidator.showError(emailInput, 'Please enter a valid email address');
        return;
      }
      if (!password) {
        window.FormValidator.showError(passwordInput, 'Password is required');
        return;
      }
      const record = window.StorageService.getRegisteredUsers().find(user => user.email.toLowerCase() === email);
      if (!record || await passwordHash(password, record.salt) !== record.passwordHash) {
        showFormError(form, 'Email or password is incorrect. Please try again.');
        return;
      }
      const { passwordHash: _hash, salt: _salt, ...profile } = record;
      window.StorageService.setCurrentUser(profile);
      window.dispatchEvent(new CustomEvent('userAuthChanged'));
      window.location.href = '../index.html';
    });
  }

  function initRegistration() {
    const form = document.getElementById('demo-register-form');
    if (!form) return;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      clearFormError(form);
      const nameInput = document.getElementById('register-name');
      const emailInput = document.getElementById('register-email');
      const phoneInput = document.getElementById('register-phone');
      const passwordInput = document.getElementById('register-password');
      const confirmInput = document.getElementById('register-confirm-password');
      const name = nameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();
      const phone = phoneInput.value.trim();
      const password = passwordInput.value;
      const confirm = confirmInput.value;
      let valid = true;
      if (!name) { window.FormValidator.showError(nameInput, 'Full name is required'); valid = false; }
      if (!window.FormValidator.validateEmail(email)) { window.FormValidator.showError(emailInput, 'Please provide a valid email'); valid = false; }
      if (!window.FormValidator.validatePhone(phone)) { window.FormValidator.showError(phoneInput, 'Please provide a valid phone number'); valid = false; }
      if (password.length < 8) { window.FormValidator.showError(passwordInput, 'Password must be at least 8 characters'); valid = false; }
      if (password !== confirm) { window.FormValidator.showError(confirmInput, 'Passwords do not match'); valid = false; }
      if (!document.getElementById('register-terms').checked) { showFormError(form, 'Please agree to the terms to continue.'); valid = false; }
      if (!valid) return;

      const users = window.StorageService.getRegisteredUsers();
      if (users.some(user => user.email.toLowerCase() === email)) {
        window.FormValidator.showError(emailInput, 'An account with this email already exists. Please sign in.');
        return;
      }
      const saltBytes = crypto.getRandomValues(new Uint8Array(16));
      const salt = Array.from(saltBytes, byte => byte.toString(16).padStart(2, '0')).join('');
      const hashedPassword = await passwordHash(password, salt);
      const saved = window.StorageService.saveRegisteredUser({
        id: `usr-${crypto.randomUUID()}`, name, email, phone, salt, passwordHash: hashedPassword,
        membershipTier: 'Aurelle Member', points: 250, memberSince: new Date().toLocaleDateString()
      });
      if (!saved) {
        window.FormValidator.showError(emailInput, 'An account with this email already exists. Please sign in.');
        return;
      }
      window.location.href = './login.html?registered=1';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggles();
    initLogin();
    initRegistration();
    if (new URLSearchParams(location.search).has('registered')) {
      const form = document.getElementById('demo-login-form');
      if (form) {
        const message = document.createElement('p');
        message.className = 'text-xs text-emerald-700 dark:text-emerald-400';
        message.setAttribute('role', 'status');
        message.textContent = 'Account created. Please sign in with your new credentials.';
        form.prepend(message);
      }
    }
  });
})();
