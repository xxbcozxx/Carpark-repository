// Nearby Malls Promotion & Parking Rate Discounts Hub (Vanilla JS - Sleek Interface Theme)
import { appState } from '../services/storage.js';
import { showToast } from './banner.js';
import { openReservationModal } from './spotReservationModal.js';

export function renderMallDealsPage(container) {
  let filterCategory = 'ALL';

  function update() {
    let promos = appState.mallPromos;

    if (filterCategory !== 'ALL') {
      promos = promos.filter(p => p.tag.includes(filterCategory) || p.badge.includes(filterCategory));
    }

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Header Banner (Sleek Interface Style) -->
        <div class="bg-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="max-w-2xl">
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/20 text-white inline-block mb-3">
              Mall Merchant & F&B Partnerships
            </span>
            <h1 class="text-2xl sm:text-3xl font-black text-white leading-tight">
              Mall Parking Rebates & Lunch Deals
            </h1>
            <p class="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
              Dine, shop, or run errands at partnered shopping malls to unlock subsidized or 100% free parking hours. Claim any coupon below to automatically offset your parking reservation fees.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-white"></div>
            <div class="w-3 h-3 rounded-full bg-white/40"></div>
            <div class="w-3 h-3 rounded-full bg-white/40"></div>
          </div>
        </div>

        <!-- Filter Tags -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          ${[
            { id: 'ALL', label: 'All Promotions' },
            { id: 'Lunch', label: '🍜 Lunch & Dine' },
            { id: 'SPEND', label: '💳 Spend & Redeem' },
            { id: 'EVENING', label: '🌙 Evening / Dinner' },
            { id: 'SUPERMARKET', label: '🛒 Groceries & Retail' }
          ].map(c => `
            <button 
              data-cat="${c.id}"
              class="btn-deals-filter px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterCategory === c.id 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }"
            >
              ${c.label}
            </button>
          `).join('')}
        </div>

        <!-- Deals Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${promos.map(p => {
            const isClaimed = appState.claimedPromos.includes(p.id);
            const linkedCarpark = appState.carparks.find(c => c.id === p.partnerCarParkId);

            return `
              <div class="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
                <div>
                  <!-- Card Header Banner -->
                  <div class="bg-gradient-to-r ${p.color} p-5 text-white relative">
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/25 text-white border border-white/20">
                        ${p.badge}
                      </span>
                      <span class="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-lg font-mono">
                        ${p.discountType === 'percentage_discount' ? `${p.discountPercent}% OFF` : `$${p.discountAmount.toFixed(2)} REBATE`}
                      </span>
                    </div>
                    <h3 class="text-base font-bold text-white mt-2 leading-snug">${p.mallName}</h3>
                    <p class="text-xs text-white/90 font-medium">${p.title}</p>
                  </div>

                  <!-- Card Details -->
                  <div class="p-5 space-y-3 text-xs">
                    <p class="text-slate-600 leading-relaxed">${p.description}</p>

                    <div class="space-y-1.5 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      <div class="flex justify-between">
                        <span>Min. Spending:</span>
                        <strong class="text-slate-800">$${p.minSpend.toFixed(2)} SGD</strong>
                      </div>
                      <div class="flex justify-between">
                        <span>Valid Hours:</span>
                        <span class="text-slate-700 font-medium">${p.validHours}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Redemption:</span>
                        <span class="text-slate-700 font-medium">${p.redemptionType}</span>
                      </div>
                      ${linkedCarpark ? `
                        <div class="flex justify-between">
                          <span>Facility:</span>
                          <strong class="text-blue-600">${linkedCarpark.code} (${linkedCarpark.name.split(' ')[0]})</strong>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </div>

                <!-- Card Footer Actions -->
                <div class="p-5 pt-0 bg-white">
                  <div class="grid grid-cols-2 gap-2">
                    <button 
                      data-claim-promo="${p.id}"
                      class="px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        isClaimed 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                          : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                      }"
                    >
                      ${isClaimed ? '<span>✅ Claimed</span>' : '<span>Claim Voucher</span>'}
                    </button>

                    ${linkedCarpark ? `
                      <button 
                        data-reserve-with-promo="${p.partnerCarParkId}"
                        class="px-3 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 active:scale-95 transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Park & Save &rarr;</span>
                      </button>
                    ` : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Category button filters
    container.querySelectorAll('.btn-deals-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        filterCategory = btn.getAttribute('data-cat');
        update();
      });
    });

    // Claim promo button
    container.querySelectorAll('[data-claim-promo]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-claim-promo');
        appState.claimPromo(pId);
        showToast('🎟️ Promo coupon added to your wallet! It will auto-apply when you reserve parking.');
        update();
      });
    });

    // Reserve with promo button
    container.querySelectorAll('[data-reserve-with-promo]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cpId = btn.getAttribute('data-reserve-with-promo');
        openReservationModal(cpId);
      });
    });
  }

  update();
}

