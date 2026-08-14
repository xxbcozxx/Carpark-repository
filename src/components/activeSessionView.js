// Active Parking Session & Digital Receipt Management (Vanilla JS - Sleek Interface Theme)
import { appState } from '../services/storage.js';
import { showToast } from './banner.js';
import { VEHICLE_TYPES } from '../data/carparkData.js';

let timerInterval = null;

export function renderActiveSessionView(container) {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  const session = appState.activeSession;
  const history = appState.reservations || [];

  function update() {
    if (!session) {
      container.innerHTML = `
        <div class="max-w-2xl mx-auto py-6 space-y-6">
          <div class="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm">
            <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mx-auto mb-4">
              🅿️
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-2">No Active Parking Session</h2>
            <p class="text-sm text-slate-500 max-w-md mx-auto mb-6">
              You currently do not have an ongoing digital parking session. Search for a carpark facility to reserve a spot or start parking.
            </p>
            <button id="btn-find-carpark" class="px-6 py-3 rounded-2xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-900/20 cursor-pointer">
              Find & Reserve Spot
            </button>
          </div>

          ${renderSessionHistory(history)}
        </div>
      `;

      const findBtn = container.querySelector('#btn-find-carpark');
      if (findBtn) {
        findBtn.addEventListener('click', () => {
          appState.setTab('explore');
        });
      }
      return;
    }

    // Active session present - calculate time left
    const now = Date.now();
    const timeLeftMs = session.expiresAt - now;
    const isExpired = timeLeftMs <= 0;
    
    let hours = Math.floor(Math.abs(timeLeftMs) / (1000 * 60 * 60));
    let minutes = Math.floor((Math.abs(timeLeftMs) % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((Math.abs(timeLeftMs) % (1000 * 60)) / 1000);

    const pad = (n) => n.toString().padStart(2, '0');
    const isExpiringSoon = !isExpired && timeLeftMs < 15 * 60 * 1000;

    const totalDurationMs = session.durationMinutes * 60 * 1000;
    const elapsedMs = Math.max(0, totalDurationMs - timeLeftMs);
    const progressPercent = Math.min(100, Math.max(0, (elapsedMs / totalDurationMs) * 100));

    const vehicleObj = VEHICLE_TYPES[session.vehicleType ? session.vehicleType.toUpperCase() : 'SEDAN'] || VEHICLE_TYPES.SEDAN;

    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6">
        
        <!-- Live Active Session Card (Sleek Interface Style) -->
        <div class="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col gap-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Active Session</h3>
              <p class="text-xl sm:text-2xl font-bold">Parking Spot ${session.spotId}</p>
              <p class="text-xs text-slate-400 mt-0.5">${session.carparkName} • ${session.carparkAddress}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="bg-rose-500 text-white px-3 py-1 rounded-full text-[10px] font-black animate-pulse tracking-wider">LIVE</span>
            </div>
          </div>

          <!-- Countdown and Top Up Block -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-slate-700/80 pt-5 gap-4">
            <div>
              <p class="text-slate-400 text-xs font-bold mb-1 uppercase tracking-tight">
                ${isExpired ? 'Grace Period (Overstay)' : 'Coupon Expiring'}
              </p>
              <p class="text-3xl sm:text-4xl font-black ${isExpired ? 'text-rose-500' : isExpiringSoon ? 'text-rose-400' : 'text-emerald-400'} font-mono">
                ${pad(hours)}:${pad(minutes)}:${pad(seconds)} <span class="text-xs font-normal text-slate-500 italic">remaining</span>
              </p>
            </div>

            <div class="flex items-center gap-2.5 w-full sm:w-auto">
              <button id="btn-extend-30m" class="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-900/40 cursor-pointer">
                Top Up +30m
              </button>
              <button id="btn-end-session" class="flex-1 sm:flex-none bg-slate-800 hover:bg-rose-600 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer">
                End & Pay
              </button>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-300 ${
                isExpired ? 'bg-rose-500' : isExpiringSoon ? 'bg-rose-400' : 'bg-emerald-500'
              }"
              style="width: ${progressPercent}%"
            ></div>
          </div>

          <!-- Session Metadata 3-Col -->
          <div class="grid grid-cols-3 gap-3 bg-slate-800/60 rounded-2xl p-4 text-center border border-slate-700/60 text-xs">
            <div>
              <span class="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Vehicle Plate</span>
              <span class="font-bold text-amber-300 font-mono text-sm mt-0.5 block">${session.vehicleNumber}</span>
            </div>
            <div>
              <span class="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Vehicle Type</span>
              <span class="font-bold text-white mt-0.5 block">${vehicleObj.name.split('/')[0]}</span>
            </div>
            <div>
              <span class="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Total Amount</span>
              <span class="font-bold text-emerald-400 font-mono text-sm mt-0.5 block">$${(session.totalPaid || 0).toFixed(2)} SGD</span>
            </div>
          </div>
        </div>

        ${renderSessionHistory(history)}
      </div>
    `;

    // Button event listeners
    const extendBtn = container.querySelector('#btn-extend-30m');
    if (extendBtn) {
      extendBtn.addEventListener('click', () => {
        appState.extendSession(30, 1.20);
        showToast('🕒 Extended parking session by 30 minutes!');
      });
    }

    const endBtn = container.querySelector('#btn-end-session');
    if (endBtn) {
      endBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to end this parking session? Any unused time will be automatically adjusted.')) {
          appState.endSession();
          showToast('✅ Parking session ended. Receipt generated below.');
        }
      });
    }
  }

  update();
  timerInterval = setInterval(update, 1000);
}

function renderSessionHistory(history) {
  if (!history || history.length === 0) return '';

  return `
    <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-bold text-slate-800 flex items-center gap-2">
          <span>🧾 Parking History & Digital Invoices</span>
        </h3>
        <span class="text-xs text-slate-400 font-mono">${history.length} completed</span>
      </div>

      <div class="space-y-3">
        ${history.map(item => `
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-800">${item.carparkName}</span>
                <span class="px-2 py-0.5 rounded-lg bg-slate-200/80 text-slate-700 font-mono text-[10px] font-bold">${item.vehicleNumber}</span>
              </div>
              <p class="text-slate-500 text-[11px] mt-0.5">
                ${new Date(item.startTime).toLocaleDateString()} • ${new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Spot: ${item.spotId}
              </p>
            </div>

            <div class="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <div class="text-right">
                <span class="text-slate-900 font-mono font-bold text-sm">$${(item.totalPaid || 0).toFixed(2)}</span>
                <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">${item.paymentMethod ? item.paymentMethod.toUpperCase() : 'PAID'}</span>
              </div>
              <button 
                onclick="window.print()" 
                class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-[11px] font-bold cursor-pointer shadow-2xs"
              >
                <span>Invoice</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

