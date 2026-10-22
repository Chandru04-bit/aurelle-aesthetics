/**
 * Aurelle Aesthetics - Navigation Controller
 * Handles mobile drawer, sticky glass header scroll states, active link highlighting,
 * and user auth status in the navigation bar.
 */

(function () {
  function initNavigation() {
    const header = document.getElementById('main-header');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const mobileClose = document.getElementById('mobile-drawer-close');
    const mobileControls = mobileToggle ? mobileToggle.closest('.navbar-mobile-controls') : null;
    const openIcon = mobileToggle ? mobileToggle.querySelector('.menu-open-icon') : null;
    const closeIcon = mobileToggle ? mobileToggle.querySelector('.menu-close-icon') : null;

    // Sticky Header Scroll Effect
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          header.classList.add('shadow-sm', 'py-1');
        } else {
          header.classList.remove('shadow-sm', 'py-1');
        }
      });
    }

    // Mobile Menu Toggling
    function openMenu() {
      if (!mobileDrawer || !mobileBackdrop) return;
      mobileDrawer.classList.remove('translate-x-full');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileBackdrop.classList.remove('hidden');
      setTimeout(() => mobileBackdrop.classList.add('opacity-100'), 10);
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
      if (mobileToggle) mobileToggle.setAttribute('aria-label', 'Close main navigation menu');
      if (mobileControls) mobileControls.classList.add('menu-open');
      if (openIcon && closeIcon) {
        openIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (!mobileDrawer || !mobileBackdrop) return;
      mobileDrawer.classList.add('translate-x-full');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileBackdrop.classList.remove('opacity-100');
      setTimeout(() => mobileBackdrop.classList.add('hidden'), 300);
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      if (mobileToggle) mobileToggle.setAttribute('aria-label', 'Open main navigation menu');
      if (mobileControls) mobileControls.classList.remove('menu-open');
      if (openIcon && closeIcon) {
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
      document.body.style.overflow = '';
    }

    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
        if (isOpen) closeMenu();
        else openMenu();
      });
    }

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMenu);
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMenu);
    }

    if (mobileDrawer) {
      mobileDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
      });
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && mobileToggle?.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    });

    // Desktop Home Dropdown Click / Touch handler
    const homeDropdownBtn = document.getElementById('home-dropdown-btn');
    const homeDropdownMenu = document.getElementById('home-dropdown-menu');
    const homeDropdownContainer = document.getElementById('desktop-home-dropdown');

    if (homeDropdownBtn && homeDropdownMenu) {
      const closeHomeDropdown = () => {
        homeDropdownMenu.classList.remove('dropdown-open');
        homeDropdownContainer?.classList.add('dropdown-dismissed');
        homeDropdownBtn.setAttribute('aria-expanded', 'false');
      };

      const openHomeDropdown = () => {
        homeDropdownContainer?.classList.remove('dropdown-dismissed');
        homeDropdownMenu.classList.add('dropdown-open');
        homeDropdownBtn.setAttribute('aria-expanded', 'true');
      };

      homeDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = homeDropdownMenu.classList.contains('dropdown-open');
        if (isOpen) {
          closeHomeDropdown();
        } else {
          openHomeDropdown();
        }
      });

      homeDropdownContainer?.addEventListener('mouseenter', () => {
        homeDropdownContainer.classList.remove('dropdown-dismissed');
      });
      homeDropdownContainer?.addEventListener('focusin', () => {
        homeDropdownContainer.classList.remove('dropdown-dismissed');
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!homeDropdownContainer || !homeDropdownContainer.contains(e.target)) {
          closeHomeDropdown();
        }
      });
    }

    // Mobile Home Accordion Toggle
    const mobileHomeToggle = document.getElementById('mobile-home-toggle');
    const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');

    if (mobileHomeToggle && mobileHomeSubmenu) {
      mobileHomeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = mobileHomeToggle.getAttribute('aria-expanded') === 'true';
        const chevron = mobileHomeToggle.querySelector('.mobile-home-chevron');
        if (isExpanded) {
          mobileHomeSubmenu.classList.add('hidden');
          mobileHomeToggle.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        } else {
          mobileHomeSubmenu.classList.remove('hidden');
          mobileHomeToggle.setAttribute('aria-expanded', 'true');
          if (chevron) chevron.classList.add('rotate-180');
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        if (homeDropdownMenu) {
          homeDropdownMenu.classList.remove('dropdown-open');
          homeDropdownContainer?.classList.add('dropdown-dismissed');
          homeDropdownBtn?.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Highlight Active Nav Links
    highlightActiveLinks();

    // Sync Auth Status in Navbar
    syncNavbarAuth();
  }

  function highlightActiveLinks() {
    const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const target = href.replace(/^(\.\/|\.\.\/)/, '').toLowerCase();

      const isHome1 = (currentPath.endsWith('/') || currentPath.endsWith('index.html')) && (target === 'index.html' || target === '');
      const isHome2 = currentPath.endsWith('home-2.html') && target.endsWith('home-2.html');
      const isMatch = isHome1 || isHome2 || (target && target !== 'index.html' && !target.endsWith('home-2.html') && currentPath.endsWith(target));

      if (isMatch) {
        link.classList.add('text-aurelle-gold', 'font-semibold');
        link.classList.remove('text-aurelle-charcoal/80', 'dark:text-aurelle-darktext/80', 'text-stone-300', 'text-stone-200');
      }
    });

    // Highlight parent Home dropdown triggers when on either Home 1 or Home 2
    const isAnyHome = currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath.endsWith('home-2.html');
    const homeBtn = document.getElementById('home-dropdown-btn');
    if (homeBtn && isAnyHome) {
      homeBtn.classList.add('text-aurelle-gold', 'font-semibold');
      homeBtn.classList.remove('text-aurelle-charcoal/80', 'dark:text-aurelle-darktext/80');
    }
    const mobileHomeToggle = document.getElementById('mobile-home-toggle');
    if (mobileHomeToggle && isAnyHome) {
      mobileHomeToggle.classList.add('text-aurelle-gold', 'font-semibold');
      const mobileSubmenu = document.getElementById('mobile-home-submenu');
      const mobileChevron = mobileHomeToggle.querySelector('.mobile-home-chevron');
      if (mobileSubmenu) {
        mobileSubmenu.classList.remove('hidden');
        mobileHomeToggle.setAttribute('aria-expanded', 'true');
        if (mobileChevron) mobileChevron.classList.add('rotate-180');
      }
    }
  }

  function syncNavbarAuth() {
    if (!window.StorageService) return;
    const user = window.StorageService.getCurrentUser();
    const isLoggedIn = window.StorageService.isLoggedIn();
    const isPages = window.location.pathname.includes('/pages/');
    const dashPath = isPages ? './dashboard.html' : './pages/dashboard.html';
    const safeName = user?.name ? user.name.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]) : '';
    document.querySelectorAll('.nav-login-btn, .mobile-login-btn').forEach(link => {
      const logout = isLoggedIn && !!user;
      link.textContent = logout ? 'Logout' : 'Login';
      link.href = logout ? '#' : (isPages ? './login.html' : './pages/login.html');
      link.dataset.authAction = logout ? 'logout' : 'login';
      link.setAttribute('aria-label', logout ? 'Logout' : 'Login');
    });
    document.querySelectorAll('.nav-dashboard-btn').forEach(link => {
      link.href = dashPath;
    });
    document.querySelectorAll('.mobile-auth-section').forEach(section => {
      const loginPath = isPages ? './login.html' : './pages/login.html';
      const registerPath = isPages ? './register.html' : './pages/register.html';
      section.innerHTML = isLoggedIn && user
        ? `<div class="flex gap-2"><a href="${dashPath}" class="flex-1 text-center py-2.5 text-xs font-semibold tracking-wider uppercase rounded-full border border-stone-300 dark:border-aurelle-darkborder text-aurelle-charcoal dark:text-aurelle-darktext">Dashboard</a><a href="${dashPath}" class="flex-1 text-center py-2.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-stone-200/80 dark:bg-stone-800 text-aurelle-charcoal dark:text-aurelle-ivory">${safeName}</a></div><button type="button" data-auth-action="logout" class="nav-logout-btn w-full text-center py-2 text-xs text-stone-500 hover:text-aurelle-gold">Logout</button>`
        : `<div class="flex gap-2"><a href="${dashPath}" class="nav-dashboard-btn flex-1 text-center py-2.5 text-xs font-semibold tracking-wider uppercase rounded-full border border-stone-300 dark:border-aurelle-darkborder text-aurelle-charcoal dark:text-aurelle-darktext hover:border-aurelle-gold hover:text-aurelle-gold">Dashboard</a><a href="${loginPath}" class="mobile-login-btn flex-1 text-center py-2.5 text-xs font-semibold tracking-wider uppercase rounded-full border border-aurelle-charcoal dark:border-aurelle-beige text-aurelle-charcoal dark:text-aurelle-ivory bg-aurelle-charcoal text-white dark:bg-aurelle-ivory dark:text-aurelle-charcoal">Login</a></div><a href="${registerPath}" class="mobile-register-btn w-full text-center py-2.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-stone-200/70 dark:bg-stone-800 text-aurelle-charcoal dark:text-aurelle-ivory">Create Account</a>`;
    });
  }

  // One delegated handler covers the desktop button, mobile button and drawer.
  document.addEventListener('click', event => {
    const logoutControl = event.target.closest('[data-auth-action="logout"], .nav-logout-btn');
    if (!logoutControl || !window.StorageService?.isLoggedIn()) return;
    event.preventDefault();
    window.StorageService.logoutUser();
    window.dispatchEvent(new CustomEvent('userAuthChanged'));
    const isPages = window.location.pathname.includes('/pages/');
    window.location.href = isPages ? '../index.html' : './index.html';
  });

  window.addEventListener('componentsLoaded', initNavigation);
  window.addEventListener('userAuthChanged', syncNavbarAuth);
  window.addEventListener('storage', event => {
    if (event.key === 'aurelle_current_user') syncNavbarAuth();
  });
  document.addEventListener('DOMContentLoaded', () => {
    // If components are already statically present
    if (document.getElementById('main-header')) {
      initNavigation();
    }
  });
})();
