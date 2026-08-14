// Real-Time Spot Visualizer, Reservation & Digital Payment Modal (Vanilla JS - Sleek Interface Theme)
import { appState } from '../services/storage.js';
import { VEHICLE_TYPES } from '../data/carparkData.js';
import { showToast } from './banner.js';

let activeModal = null;

export function openReservationModal(carparkId, preselectedSpotId = null) {
  closeReservationModal();

  const cp = appState.carparks.find(c => c.id === carparkId);
  if (!cp) return;

  const currentVehicle = appState.selectedVehicle;
  const vehicleObj = VEHICLE_TYPES[currentVehicle.toUpperCase()] || VEHICLE_TYPES.SEDAN;

  // Initial state for this reservation modal
  let selectedSpotId = preselectedSpotId || (cp.spots && cp.spots[0] ? cp.spots[0].id : 'LOT-AUTO');
  let selectedDurationMin = 60; // default 1 hour
  let vehicleNumber = localStorage.getItem('parkpulse_last_vnum') || 'SBA 8888 A';
  let selectedPaymentMethod = 'paynow'; // 'paynow' | 'applepay' | 'googlepay' | 'card'
  let appliedPromoId = null;

  // Auto-check if any claimed promo matches this carpark
  const claimedForCarpark = appState.mallPromos.filter(p => 
    p.partnerCarParkId === cp.id && appState.claimedPromos.includes(p.id)
  );
  if (claimedForCarpark.length > 0) {
    appliedPromoId = claimedForCarpark[0].id;
  }

  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'reservation-modal-overlay';
  modalOverlay.className = 'fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in';

  function calculatePricing() {
    let baseRatePerHour = 2.40;
    if (currentVehicle === 'sedan') {
      baseRatePerHour = cp.rates.sedan.hourlyAvg || 2.40;
    } else if (currentVehicle === 'motorcycle') {
      baseRatePerHour = cp.rates.motorcycle.hourlyAvg || 0.70;
    } else if (currentVehicle === 'heavy') {
      baseRatePerHour = cp.rates.heavy.hourlyAvg || 4.00;
    }

    const durationHours = selectedDurationMin / 60;
    let subtotal = baseRatePerHour * durationHours;

    let discount = 0;
    if (appliedPromoId) {
      const promo = appState.mallPromos.find(p => p.id === appliedPromoId);
      if (promo) {
        if (promo.discountType === 'percentage_discount') {
          discount = (subtotal * promo.discountPercent) / 100;
        } else if (promo.discountType === 'fixed_discount') {
          discount = Math.min(subtotal, promo.discountAmount);
        }
      }
    }

    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total, baseRatePerHour };
  }

  function renderContent() {
    const pricing = calculatePricing();
    const spots = cp.spots || [];

    modalOverlay.innerHTML = `
      <div class="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <!-- Modal Top Header (Sleek Interface Style) -->
        <div class="bg-slate-900 text-white p-6 pb-5 flex items-start justify-between">
          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-xl shrink-0 font-bold">
              P
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/20 text-white font-mono uppercase">
                  ${cp.code}
                </span>
                <span class="text-xs text-slate-300 font-medium">${cp.operator}</span>
              </div>
              <h2 class="text-lg sm:text-xl font-bold text-white mt-1">${cp.name}</h2>
              <p class="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                📍 ${cp.address}
              </p>
            </div>
          </div>
          <button id="btn-close-modal" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Modal Body Scrollable -->
        <div class="p-6 overflow-y-auto space-y-5 text-slate-800">
          
          <!-- STEP 1: Live Interactive Spot Layout / Selection -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span>1. Select Live Parking Spot / Bay</span>
                <span class="text-[10px] lowercase font-normal bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">real-time sensor feed</span>
              </label>
              <span class="text-xs font-bold text-blue-600 font-mono">
                Selected: ${selectedSpotId}
              </span>
            </div>

            <!-- Floor Map Grid -->
            <div class="bg-slate-900 rounded-3xl p-4 border border-slate-800">
              <div class="flex items-center justify-between text-[11px] text-slate-400 mb-3 pb-2 border-b border-slate-800">
                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1 text-emerald-400"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Available</span>
                  <span class="flex items-center gap-1 text-amber-400"><span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span> Expiring</span>
                  <span class="flex items-center gap-1 text-slate-500"><span class="w-2 h-2 rounded-full bg-slate-600"></span> Occupied</span>
                </div>
                <span class="text-slate-400 font-mono text-[10px]">Zone Floor B1/L1</span>
              </div>

              <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                ${spots.map(s => {
                  const isChosen = selectedSpotId === s.id;
                  let bgClass = 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:border-emerald-400';
                  let subLabel = 'Open';

                  if (s.status === 'expiring') {
                    const minLeft = s.expiresAt ? Math.max(1, Math.round((s.expiresAt - Date.now()) / 60000)) : 5;
                    bgClass = 'bg-amber-950/60 border-amber-500/60 text-amber-300 hover:border-amber-400 animate-pulse';
                    subLabel = `~${minLeft}m`;
                  } else if (s.status === 'occupied') {
                    bgClass = 'bg-slate-800/80 border-slate-700 text-slate-500 cursor-not-allowed opacity-50';
                    subLabel = 'Taken';
                  }

                  if (isChosen) {
                    bgClass = 'bg-blue-600 border-blue-300 text-white shadow-lg shadow-blue-500/50 ring-2 ring-blue-400';
                  }

                  return `
                    <button 
                      data-spot-btn="${s.id}" 
                      ${s.status === 'occupied' ? 'disabled' : ''}
                      class="spot-selector-btn rounded-2xl p-2.5 flex flex-col items-center justify-center border text-center transition-all cursor-pointer ${bgClass}"
                    >
                      <span class="text-xs font-mono font-black">${s.id}</span>
                      <span class="text-[9px] uppercase tracking-wider font-semibold opacity-90">${s.type === 'heavy' ? '🚚 Bay' : s.type === 'motorcycle' ? '🏍️ Bay' : s.isEV ? '⚡ EV' : s.level}</span>
                      <span class="text-[9px] font-bold mt-0.5">${subLabel}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- STEP 2: Vehicle Number & Type -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                2. Vehicle Registration No.
              </label>
              <input 
                type="text" 
                id="input-vnum" 
                value="${vehicleNumber}"
                placeholder="e.g. SBA 8888 A / GBF 1234 K" 
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900 uppercase focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label class="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Vehicle Category
              </label>
              <div class="px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-100 text-slate-800 text-sm font-semibold flex items-center gap-2">
                <span>${vehicleObj.icon}</span>
                <span>${vehicleObj.name}</span>
                <span class="text-xs text-slate-500 ml-auto font-mono">$${pricing.baseRatePerHour.toFixed(2)}/hr avg</span>
              </div>
            </div>
          </div>

          <!-- STEP 3: Duration Selection -->
          <div>
            <label class="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              3. Parking Duration
            </label>
            <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
              ${[
                { min: 30, label: '30 Mins' },
                { min: 60, label: '1 Hour' },
                { min: 120, label: '2 Hours' },
                { min: 240, label: '4 Hours' },
                { min: 480, label: 'Full Day' }
              ].map(d => {
                const isSel = selectedDurationMin === d.min;
                return `
                  <button 
                    data-duration="${d.min}"
                    class="btn-duration-opt py-2.5 px-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                      isSel 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }"
                  >
                    ${d.label}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- STEP 4: Mall Promo & Rebate Codes -->
          <div class="bg-blue-50/60 rounded-3xl p-4 sm:p-5 border border-blue-100">
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <span>🎟️ Nearby Mall / F&B Parking Discount</span>
              </label>
              <button id="btn-browse-deals-modal" class="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View Deals &rarr;
              </button>
            </div>

            <div class="flex items-center gap-2">
              <select id="select-promo-discount" class="flex-1 bg-white border border-blue-200 rounded-2xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option value="">-- No Discount Applied --</option>
                ${appState.mallPromos.map(p => `
                  <option value="${p.id}" ${appliedPromoId === p.id ? 'selected' : ''}>
                    ${p.mallName}: ${p.title} (${p.badge})
                  </option>
                `).join('')}
              </select>
              <button id="btn-apply-promo" class="px-4 py-2 rounded-2xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 cursor-pointer">
                Apply
              </button>
            </div>

            ${appliedPromoId ? `
              <div class="mt-2 text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                <span>✅ Promo attached: <strong>-$${pricing.discount.toFixed(2)}</strong> subsidy</span>
                <button id="btn-remove-promo" class="text-rose-600 font-bold hover:underline cursor-pointer">Remove</button>
              </div>
            ` : ''}
          </div>

          <!-- STEP 5: Payment Method & Breakdown -->
          <div>
            <label class="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              5. Digital Payment Method
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              ${[
                { id: 'paynow', name: 'PayNow QR', icon: '🇸🇬' },
                { id: 'applepay', name: 'Apple Pay', icon: '' },
                { id: 'googlepay', name: 'Google Pay', icon: 'GPay' },
                { id: 'card', name: 'Credit / NETS', icon: '💳' }
              ].map(m => {
                const isSel = selectedPaymentMethod === m.id;
                return `
                  <button 
                    data-pay-method="${m.id}"
                    class="btn-pay-method-opt py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSel 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }"
                  >
                    <span>${m.icon}</span>
                    <span>${m.name}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Summary Breakdown Box -->
          <div class="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-2 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>Parking Rate (${selectedDurationMin} mins @ $${pricing.baseRatePerHour.toFixed(2)}/hr):</span>
              <span>$${pricing.subtotal.toFixed(2)}</span>
            </div>
            ${pricing.discount > 0 ? `
              <div class="flex justify-between text-emerald-600 font-semibold">
                <span>Mall Merchant Subsidy Discount:</span>
                <span>-$${pricing.discount.toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="flex justify-between text-slate-500 text-[11px] pt-1.5 border-t border-slate-200">
              <span>Grace Period:</span>
              <span>15 Minutes Free Exit Guarantee</span>
            </div>
            <div class="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Payable:</span>
              <span class="text-blue-600 text-lg font-mono font-black">$${pricing.total.toFixed(2)} SGD</span>
            </div>
          </div>

        </div>

        <!-- Modal Footer Actions -->
        <div class="bg-slate-50 p-5 sm:p-6 border-t border-slate-200 flex items-center justify-between gap-3">
          <div class="text-xs text-slate-500 hidden sm:block">
            Instant digital coupon activated upon payment.
          </div>
          <div class="flex items-center gap-2.5 w-full sm:w-auto">
            <button id="btn-cancel-modal" class="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer">
              Cancel
            </button>
            <button id="btn-confirm-payment" class="flex-1 sm:flex-none px-6 py-2.5 rounded-2xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 active:scale-95 transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer">
              <span>Pay $${pricing.total.toFixed(2)} & Reserve</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    // Attach all interactive event listeners inside modal
    modalOverlay.querySelector('#btn-close-modal').addEventListener('click', closeReservationModal);
    modalOverlay.querySelector('#btn-cancel-modal').addEventListener('click', closeReservationModal);

    // Spot click
    modalOverlay.querySelectorAll('.spot-selector-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedSpotId = btn.getAttribute('data-spot-btn');
        renderContent();
      });
    });

    // Duration buttons
    modalOverlay.querySelectorAll('.btn-duration-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDurationMin = parseInt(btn.getAttribute('data-duration'), 10);
        renderContent();
      });
    });

    // Payment methods
    modalOverlay.querySelectorAll('.btn-pay-method-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedPaymentMethod = btn.getAttribute('data-pay-method');
        renderContent();
      });
    });

    // Promo selector
    const promoSelect = modalOverlay.querySelector('#select-promo-discount');
    if (promoSelect) {
      promoSelect.addEventListener('change', (e) => {
        appliedPromoId = e.target.value || null;
      });
    }

    const applyPromoBtn = modalOverlay.querySelector('#btn-apply-promo');
    if (applyPromoBtn) {
      applyPromoBtn.addEventListener('click', () => {
        const val = modalOverlay.querySelector('#select-promo-discount').value;
        appliedPromoId = val || null;
        renderContent();
        if (appliedPromoId) {
          showToast('Coupon discount applied successfully!');
        }
      });
    }

    const removePromoBtn = modalOverlay.querySelector('#btn-remove-promo');
    if (removePromoBtn) {
      removePromoBtn.addEventListener('click', () => {
        appliedPromoId = null;
        renderContent();
      });
    }

    const browseDeals = modalOverlay.querySelector('#btn-browse-deals-modal');
    if (browseDeals) {
      browseDeals.addEventListener('click', () => {
        closeReservationModal();
        appState.setTab('deals');
      });
    }

    // Vehicle number input
    const vnumInput = modalOverlay.querySelector('#input-vnum');
    if (vnumInput) {
      vnumInput.addEventListener('input', (e) => {
        vehicleNumber = e.target.value.toUpperCase();
        localStorage.setItem('parkpulse_last_vnum', vehicleNumber);
      });
    }

    // Confirm payment and start active session
    const confirmBtn = modalOverlay.querySelector('#btn-confirm-payment');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (!vehicleNumber.trim()) {
          alert('Please enter a valid vehicle license plate number.');
          return;
        }

        // Processing simulation animation
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Processing Payment...
        `;

        setTimeout(() => {
          try {
            const pricing = calculatePricing();
            const session = appState.reserveSpot(
              cp.id,
              selectedSpotId,
              vehicleNumber,
              selectedDurationMin,
              {
                totalAmount: pricing.total,
                discountAmount: pricing.discount,
                method: selectedPaymentMethod
              }
            );

            closeReservationModal();
            showToast(`✅ Spot ${session.spotId} reserved! Active parking session started.`);
          } catch (err) {
            alert(err.message || 'Payment failed');
            renderContent();
          }
        }, 800);
      });
    }
  }

  renderContent();
  document.body.appendChild(modalOverlay);
  activeModal = modalOverlay;
}

export function closeReservationModal() {
  if (activeModal) {
    activeModal.remove();
    activeModal = null;
  }
}
