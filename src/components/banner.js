// Mall Promotion & Parking Discount Banner Component (Vanilla JS - Sleek Interface Theme)
import { appState } from '../services/storage.js';

export function renderPromoBanner(container) {
  const promos = appState.mallPromos;
  if (!promos || promos.length === 0) {
    container.innerHTML = '';
    return;
  }

  const activePromo = promos[0];

  container.innerHTML = `
    <section id="mall-promo-banner" class="bg-blue-600 text-white px-6 sm:px-8 py-3.5 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-6 transition-all">
      <div class="flex items-center gap-3 sm:gap-4 flex-1">
        <span class="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shrink-0">
          Promo
        </span>
        <p class="text-sm font-medium leading-snug">
          <strong class="font-bold">${activePromo.mallName}:</strong> ${activePromo.title} (${activePromo.validHours})! 
          <span id="btn-claim-inline" class="underline ml-2 font-bold cursor-pointer hover:text-blue-100">Claim Rebate &rarr;</span>
        </p>
      </div>

      <div class="flex items-center gap-4 shrink-0">
        <button id="btn-view-all-deals" class="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl transition-colors cursor-pointer">
          All Deals (${promos.length})
        </button>

        <div class="flex items-center gap-1.5">
          <div class="w-2 h-2 rounded-full bg-white"></div>
          <div class="w-2 h-2 rounded-full bg-white/40"></div>
          <div class="w-2 h-2 rounded-full bg-white/40"></div>
        </div>
      </div>
    </section>
  `;

  // Attach event listeners
  const viewDealsBtn = container.querySelector('#btn-view-all-deals');
  if (viewDealsBtn) {
    viewDealsBtn.addEventListener('click', () => {
      appState.setTab('deals');
    });
  }

  const claimInline = container.querySelector('#btn-claim-inline');
  if (claimInline) {
    claimInline.addEventListener('click', () => {
      appState.claimPromo(activePromo.id);
      showToast(`🎉 Claimed! ${activePromo.title} is now ready to apply on checkout.`);
    });
  }
}

export function showToast(message, duration = 3000) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center justify-between gap-3 animate-fade-in';
  toast.innerHTML = `
    <div class="flex items-center gap-2.5">
      <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
      <span>${message}</span>
    </div>
    <button class="text-slate-400 hover:text-white text-sm font-bold">&times;</button>
  `;

  toast.querySelector('button').addEventListener('click', () => toast.remove());
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
