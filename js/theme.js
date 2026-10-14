/**
 * Aurelle Aesthetics - Theme & Direction Switcher
 * Persists theme (dark / light mode) and direction (ltr / rtl) in localStorage.
 * Respects OS preferences and provides global controllers.
 */

(function () {
  const THEME_KEY = 'aurelle_theme';
  const DIRECTION_KEY = 'aurelle_direction';

  /* ========================================================
     THEME CONTROLLER
     ======================================================== */
  function applyTheme(isDark) {
    document.documentElement.classList.add('theme-transition');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateToggleIcons(isDark);
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = !isDark;
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
    
    // Dispatch custom event for dynamic components
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark: newTheme } }));
  }

  function updateToggleIcons(isDark) {
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach(btn => {
      const sunIcon = btn.querySelector('.sun-icon');
      const moonIcon = btn.querySelector('.moon-icon');
      const textLabel = btn.querySelector('.theme-text-label');

      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
      if (textLabel) {
        textLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
    });
  }

  /* ========================================================
     DIRECTION CONTROLLER (LTR / RTL)
     ======================================================== */
  function applyDirection(dir) {
    const isRtl = dir === 'rtl';
    const finalDir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', finalDir);
    if (isRtl) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
    updateDirectionButtons(finalDir);
    window.dispatchEvent(new CustomEvent('directionChanged', { detail: { direction: finalDir, isRtl } }));
  }

  function getPreferredDirection() {
    const saved = localStorage.getItem(DIRECTION_KEY);
    if (saved === 'rtl' || saved === 'ltr') {
      return saved;
    }
    return document.documentElement.getAttribute('dir') || 'ltr';
  }

  function setDirection(dir) {
    const finalDir = dir === 'rtl' ? 'rtl' : 'ltr';
    localStorage.setItem(DIRECTION_KEY, finalDir);
    applyDirection(finalDir);
  }

  function updateDirectionButtons(currentDir) {
    const buttons = document.querySelectorAll('.dir-btn');
    buttons.forEach(btn => {
      const btnDir = btn.getAttribute('data-direction');
      const isActive = btnDir === currentDir;
      if (isActive) {
        btn.classList.add('active');
        btn.classList.remove('text-stone-500', 'dark:text-stone-400');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.classList.add('text-stone-500', 'dark:text-stone-400');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  // Early Theme & Direction Init to prevent flash of unstyled theme/direction
  const initialTheme = getPreferredTheme();
  if (initialTheme) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const initialDir = getPreferredDirection();
  document.documentElement.setAttribute('dir', initialDir);
  if (initialDir === 'rtl') {
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.classList.remove('rtl');
  }

  // Expose global controllers
  window.ThemeController = {
    toggle: toggleTheme,
    isDark: () => document.documentElement.classList.contains('dark'),
    sync: () => updateToggleIcons(document.documentElement.classList.contains('dark'))
  };

  window.DirectionController = {
    set: setDirection,
    get: () => document.documentElement.getAttribute('dir') || 'ltr',
    isRtl: () => (document.documentElement.getAttribute('dir') || 'ltr') === 'rtl',
    sync: () => updateDirectionButtons(document.documentElement.getAttribute('dir') || 'ltr')
  };

  // Bind to DOM when loaded
  document.addEventListener('DOMContentLoaded', () => {
    updateToggleIcons(document.documentElement.classList.contains('dark'));
    updateDirectionButtons(document.documentElement.getAttribute('dir') || 'ltr');
    
    document.body.addEventListener('click', (e) => {
      // Theme toggle click
      const toggleBtn = e.target.closest('.theme-toggle-btn');
      if (toggleBtn) {
        e.preventDefault();
        toggleTheme();
        return;
      }

      // Direction toggle click
      const dirBtn = e.target.closest('.dir-btn');
      if (dirBtn) {
        e.preventDefault();
        const targetDir = dirBtn.getAttribute('data-direction');
        if (targetDir) {
          setDirection(targetDir);
        }
      }
    });

    // Listen to system preference changes if no manual override
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches);
        }
      });
    }
  });

  // Sync on custom components load event
  window.addEventListener('componentsLoaded', () => {
    updateToggleIcons(document.documentElement.classList.contains('dark'));
    updateDirectionButtons(document.documentElement.getAttribute('dir') || 'ltr');
  });
})();
