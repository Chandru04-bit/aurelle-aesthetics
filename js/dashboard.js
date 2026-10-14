/**
 * Aurelle Aesthetics - Client Dashboard & Portal Controller
 * Manages appointments, rescheduling, cancellation, packages, regimen, and profile settings.
 */

(function () {
  let selectedAppointmentId = null;
  const DEMO_DASHBOARD_USER = Object.freeze({
    id: 'dashboard-demo-user',
    name: 'Demo User',
    email: 'demo@example.com',
    phone: '(555) 010-2026',
    role: 'Customer',
    membershipTier: 'Customer',
    points: 1250
  });

  function getDashboardUser() {
    return window.StorageService.getCurrentUser() || DEMO_DASHBOARD_USER;
  }

  function initDashboard() {
    if (!window.StorageService) return;

    renderUserHeader();
    renderAppointmentsTab();
    renderPackagesTab();
    renderSkincareTab();
    renderNotificationsTab();
    renderProfileTab();
    bindTabNavigation();
    bindDashboardModals();
  }

  function renderUserHeader() {
    const user = getDashboardUser();
    const appointments = window.StorageService.getAppointments();
    const packages = window.StorageService.getPackages();

    const nameEl = document.getElementById('dash-user-name');
    const emailEl = document.getElementById('dash-user-email');
    const tierEl = document.getElementById('dash-user-tier');
    const pointsEl = document.getElementById('dash-user-points');
    const statUpcomingEl = document.getElementById('dash-stat-upcoming');
    const statPackagesEl = document.getElementById('dash-stat-packages');
    const statCompletedEl = document.getElementById('dash-stat-completed');

    if (nameEl && user) nameEl.textContent = user.name;
    if (emailEl && user) emailEl.textContent = user.email || '';
    if (tierEl && user) tierEl.textContent = user.membershipTier || 'Aurelle Elite VIP';
    if (pointsEl && user) pointsEl.textContent = `${user.points || 1250} Pts`;

    const upcomingCount = appointments.filter(a => a.status === 'Upcoming').length;
    const completedCount = appointments.filter(a => a.status === 'Completed').length;

    if (statUpcomingEl) statUpcomingEl.textContent = upcomingCount;
    if (statPackagesEl) statPackagesEl.textContent = packages.length;
    if (statCompletedEl) statCompletedEl.textContent = completedCount;
  }

  function renderAppointmentsTab() {
    const appointments = window.StorageService.getAppointments();
    const upcomingContainer = document.getElementById('dash-upcoming-list');
    const pastContainer = document.getElementById('dash-past-list');
    const upcomingEmpty = document.getElementById('dash-upcoming-empty');
    const pastEmpty = document.getElementById('dash-past-empty');

    const upcoming = appointments.filter(a => a.status === 'Upcoming');
    const past = appointments.filter(a => a.status !== 'Upcoming');

    // Upcoming Appointments List
    if (upcomingContainer) {
      if (upcoming.length === 0) {
        upcomingContainer.innerHTML = '';
        if (upcomingEmpty) upcomingEmpty.classList.remove('hidden');
      } else {
        if (upcomingEmpty) upcomingEmpty.classList.add('hidden');
        upcomingContainer.innerHTML = upcoming.map(appt => `
          <div class="dashboard-appointment-card p-6 rounded-2xl border border-stone-200/80 dark:border-aurelle-darkborder bg-white dark:bg-aurelle-darkcard shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-luxury">
            <div class="dashboard-appointment-details flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-aurelle-blush/30 dark:bg-stone-800 text-aurelle-charcoal dark:text-aurelle-gold flex flex-col items-center justify-center shrink-0 border border-stone-200/40">
                <span class="text-[10px] uppercase font-bold tracking-wider">${new Date(appt.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}</span>
                <span class="text-base font-serif font-bold leading-none">${new Date(appt.date + 'T00:00:00').getDate()}</span>
              </div>
              <div class="dashboard-appointment-copy">
                <div class="dashboard-appointment-meta flex items-center gap-2">
                  <span class="badge-pill bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px]">
                    Confirmed Visit
                  </span>
                  <span class="text-xs text-stone-400">Ref: ${appt.id}</span>
                </div>
                <h4 class="font-serif text-lg text-aurelle-charcoal dark:text-aurelle-darktext font-medium mt-1">
                  ${appt.treatmentName}
                </h4>
                <p class="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                  With <span class="font-medium text-aurelle-charcoal dark:text-stone-200">${appt.providerName}</span> &bull; ⏱ ${appt.time} (${appt.duration || '45 mins'})
                </p>
                ${appt.notes ? `<p class="text-xs text-stone-500 italic mt-1 font-light">"${appt.notes}"</p>` : ''}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="dashboard-appointment-actions flex items-center gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100 dark:border-aurelle-darkborder shrink-0">
              <button 
                type="button" 
                class="reschedule-btn px-4 py-2 text-xs font-semibold rounded-full border border-stone-300 dark:border-stone-700 hover:border-aurelle-gold text-aurelle-charcoal dark:text-stone-200 transition-colors"
                data-appointment-id="${appt.id}"
                data-appointment-date="${appt.date}"
                data-appointment-time="${appt.time}"
              >
                Reschedule
              </button>
              <button 
                type="button" 
                class="cancel-btn px-4 py-2 text-xs font-semibold rounded-full text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                data-appointment-id="${appt.id}"
              >
                Cancel
              </button>
            </div>
          </div>
        `).join('');
      }
    }

    // Past / Cancelled Appointments
    if (pastContainer) {
      if (past.length === 0) {
        pastContainer.innerHTML = '';
        if (pastEmpty) pastEmpty.classList.remove('hidden');
      } else {
        if (pastEmpty) pastEmpty.classList.add('hidden');
        pastContainer.innerHTML = past.map(appt => `
          <div class="p-5 rounded-xl border border-stone-200/60 dark:border-aurelle-darkborder bg-stone-50/70 dark:bg-stone-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="badge-pill ${appt.status === 'Completed' ? 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300' : 'bg-rose-100 dark:bg-rose-950/50 text-rose-600'} text-[10px]">
                  ${appt.status}
                </span>
                <span class="text-xs text-stone-400">${appt.date} &bull; ${appt.time}</span>
              </div>
              <h5 class="font-serif text-base text-aurelle-charcoal dark:text-aurelle-darktext mt-1">${appt.treatmentName}</h5>
              <p class="text-xs text-stone-500">Provider: ${appt.providerName}</p>
            </div>
            <div>
              <a href="./booking.html?treatment=${appt.treatmentId}" class="inline-flex items-center gap-1 text-xs font-semibold text-aurelle-gold hover:underline">
                Book Again &rarr;
              </a>
            </div>
          </div>
        `).join('');
      }
    }

    bindAppointmentActions();
  }

  function bindAppointmentActions() {
    // Reschedule Click
    document.querySelectorAll('.reschedule-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedAppointmentId = btn.dataset.appointmentId;
        const currentDate = btn.dataset.appointmentDate;
        const currentTime = btn.dataset.appointmentTime;

        const dateInput = document.getElementById('reschedule-date-input');
        const timeInput = document.getElementById('reschedule-time-input');

        if (dateInput) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          dateInput.min = tomorrow.toISOString().split('T')[0];
          dateInput.value = currentDate || dateInput.min;
        }
        if (timeInput) timeInput.value = currentTime || '11:00 AM';

        if (window.AurelleUI && window.AurelleUI.modal) {
          window.AurelleUI.modal.open('reschedule-modal');
        }
      });
    });

    // Cancel Click
    document.querySelectorAll('.cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedAppointmentId = btn.dataset.appointmentId;
        if (window.AurelleUI && window.AurelleUI.modal) {
          window.AurelleUI.modal.open('cancel-modal');
        }
      });
    });
  }

  function renderPackagesTab() {
    const packages = window.StorageService.getPackages();
    const container = document.getElementById('dash-packages-list');
    if (!container) return;

    container.innerHTML = packages.map(pkg => {
      const percentage = Math.round((pkg.completedSessions / pkg.totalSessions) * 100);
      return `
        <div class="dashboard-package-card p-6 rounded-2xl border border-stone-200/80 dark:border-aurelle-darkborder bg-white dark:bg-aurelle-darkcard shadow-soft space-y-4">
          <div class="flex items-start justify-between">
            <div>
              <span class="badge-pill bg-aurelle-blush/30 dark:bg-stone-800 text-aurelle-charcoal dark:text-aurelle-gold text-[10px]">
                ${pkg.savings}
              </span>
              <h4 class="font-serif text-lg text-aurelle-charcoal dark:text-aurelle-darktext font-medium mt-1">${pkg.name}</h4>
              <p class="text-xs text-stone-500">${pkg.treatment}</p>
            </div>
            <div class="text-right">
              <span class="font-serif text-xl font-bold text-aurelle-gold">${pkg.remainingSessions}</span>
              <span class="text-xs text-stone-400 block">Remaining</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div>
            <div class="flex justify-between text-xs text-stone-500 mb-1.5">
              <span>${pkg.completedSessions} of ${pkg.totalSessions} Sessions Completed</span>
              <span>Expires: ${pkg.expiryDate}</span>
            </div>
            <div class="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div class="h-full bg-aurelle-gold rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
            </div>
          </div>

          <div class="pt-2 flex justify-end">
            <a href="./booking.html" class="btn-secondary text-xs py-2 px-4">
              Schedule Next Session
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderSkincareTab() {
    const routine = window.StorageService.getSkincareRoutine();
    const morningContainer = document.getElementById('routine-morning-steps');
    const eveningContainer = document.getElementById('routine-evening-steps');
    const notesContainer = document.getElementById('routine-provider-notes');

    if (morningContainer && routine.morning) {
      morningContainer.innerHTML = routine.morning.map(s => `
        <li class="flex items-start gap-3 text-xs sm:text-sm">
          <span class="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
            ${s.step}
          </span>
          <div>
            <span class="font-medium text-aurelle-charcoal dark:text-stone-200 block">${s.name}</span>
            <span class="text-stone-500 dark:text-stone-400 text-xs font-light">${s.detail}</span>
          </div>
        </li>
      `).join('');
    }

    if (eveningContainer && routine.evening) {
      eveningContainer.innerHTML = routine.evening.map(s => `
        <li class="flex items-start gap-3 text-xs sm:text-sm">
          <span class="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
            ${s.step}
          </span>
          <div>
            <span class="font-medium text-aurelle-charcoal dark:text-stone-200 block">${s.name}</span>
            <span class="text-stone-500 dark:text-stone-400 text-xs font-light">${s.detail}</span>
          </div>
        </li>
      `).join('');
    }

    if (notesContainer && routine.providerNotes) {
      notesContainer.textContent = routine.providerNotes;
    }
  }

  function renderNotificationsTab() {
    const notifications = window.StorageService.getNotifications();
    const container = document.getElementById('dash-notifications-list');
    if (!container) return;

    container.innerHTML = notifications.map(n => `
      <div class="p-4 rounded-xl border border-stone-200/70 dark:border-aurelle-darkborder ${n.read ? 'bg-stone-50/50 dark:bg-stone-900/30 opacity-75' : 'bg-white dark:bg-aurelle-darkcard shadow-sm border-l-4 border-l-aurelle-gold'} flex items-start gap-3">
        <div class="p-1.5 rounded-full bg-aurelle-gold/20 text-aurelle-gold shrink-0 mt-0.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h5 class="text-sm font-semibold text-aurelle-charcoal dark:text-aurelle-darktext">${n.title}</h5>
            <span class="text-[11px] text-stone-400">${n.date}</span>
          </div>
          <p class="text-xs text-stone-600 dark:text-stone-300 font-light mt-1">${n.message}</p>
        </div>
      </div>
    `).join('');

    const markReadBtn = document.getElementById('mark-all-read-btn');
    if (markReadBtn) {
      markReadBtn.addEventListener('click', () => {
        window.StorageService.markNotificationsAsRead();
        renderNotificationsTab();
        if (window.AurelleUI) window.AurelleUI.toast('All notifications marked as read', 'info');
      });
    }
  }

  function renderProfileTab() {
    const user = getDashboardUser();
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const phoneInput = document.getElementById('profile-phone');

    if (nameInput && user) nameInput.value = user.name || '';
    if (emailInput && user) emailInput.value = user.email || '';
    if (phoneInput && user) phoneInput.value = user.phone || '';

    const profileForm = document.getElementById('dash-profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (user.id === DEMO_DASHBOARD_USER.id) {
          if (window.AurelleUI) window.AurelleUI.toast('Profile changes are not saved in demo mode.', 'info');
          return;
        }
        const updated = {
          ...user,
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim()
        };
        window.StorageService.setCurrentUser(updated);
        renderUserHeader();
        window.dispatchEvent(new CustomEvent('userAuthChanged'));
        if (window.AurelleUI) window.AurelleUI.toast('Profile updated successfully!', 'success');
      });
    }

    // Logout Handler
    const logoutBtn = document.getElementById('dash-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        window.StorageService.logoutUser();
        window.dispatchEvent(new CustomEvent('userAuthChanged'));
        if (window.AurelleUI) window.AurelleUI.toast('You have been signed out.', 'info');
        setTimeout(() => {
          window.location.href = '../index.html';
        }, 800);
      });
    }
  }

  function bindTabNavigation() {
    const tabButtons = document.querySelectorAll('.dashboard-tab-btn');
    const tabPanes = document.querySelectorAll('.dashboard-tab-pane');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        tabButtons.forEach(b => {
          b.classList.remove('border-aurelle-gold', 'text-aurelle-charcoal', 'dark:text-aurelle-gold', 'font-semibold');
          b.classList.add('border-transparent', 'text-stone-500', 'hover:text-stone-700');
        });

        btn.classList.add('border-aurelle-gold', 'text-aurelle-charcoal', 'dark:text-aurelle-gold', 'font-semibold');
        btn.classList.remove('border-transparent', 'text-stone-500');

        tabPanes.forEach(pane => {
          if (pane.id === `tab-${targetTab}`) {
            pane.classList.remove('hidden');
          } else {
            pane.classList.add('hidden');
          }
        });
      });
    });
  }

  function bindDashboardModals() {
    // Confirm Reschedule Form
    const rescheduleForm = document.getElementById('reschedule-submit-form');
    if (rescheduleForm) {
      rescheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newDate = document.getElementById('reschedule-date-input')?.value;
        const newTime = document.getElementById('reschedule-time-input')?.value;

        if (!newDate || !newTime || !selectedAppointmentId) return;

        window.StorageService.rescheduleAppointment(selectedAppointmentId, newDate, newTime);
        if (window.AurelleUI) {
          window.AurelleUI.modal.close('reschedule-modal');
          window.AurelleUI.toast('Appointment rescheduled successfully!', 'success');
        }
        renderAppointmentsTab();
        renderUserHeader();
      });
    }

    // Confirm Cancel Form
    const cancelForm = document.getElementById('cancel-confirm-form');
    if (cancelForm) {
      cancelForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const reason = document.getElementById('cancel-reason-input')?.value || 'Client requested cancellation';

        if (!selectedAppointmentId) return;

        window.StorageService.cancelAppointment(selectedAppointmentId, reason);
        if (window.AurelleUI) {
          window.AurelleUI.modal.close('cancel-modal');
          window.AurelleUI.toast('Appointment cancelled.', 'info');
        }
        renderAppointmentsTab();
        renderUserHeader();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initDashboard);
})();
