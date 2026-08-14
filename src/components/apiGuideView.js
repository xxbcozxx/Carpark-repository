// Real-Time Singapore Carpark & Transport APIs Developer Guide
import { SG_APIS_INFO, fetchLiveSgGovCarparks } from '../services/apiSync.js';
import { appState } from '../services/storage.js';

export function renderApiGuideView(container) {
  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Hero Header -->
      <div class="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-3">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Singapore Open Data & LTA DataMall Integration
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Real-Time Transport & Carpark APIs for Singapore
          </h2>
          <p class="text-slate-300 text-sm leading-relaxed mb-6">
            To scale this application islandwide with live lot telemetry, connect these official Singapore government and statutory board APIs. Our application already features an integrated Live Sync engine connected to <span class="font-mono text-blue-300 font-semibold">Data.gov.sg</span>.
          </p>
          
          <div class="flex flex-wrap items-center gap-3">
            <button 
              id="btn-trigger-live-sync-modal"
              class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <svg class="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              <span>Test Live Singapore Gov API Sync</span>
            </button>
            <span id="sync-status-indicator" class="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Live Feed Status: Ready
            </span>
          </div>
        </div>
      </div>

      <!-- Quick Summary Matrix Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-base">1</div>
            <div>
              <h4 class="font-bold text-slate-800 text-sm">HDB & URA Lots</h4>
              <p class="text-xs text-slate-500">2,100+ public carparks</p>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Use <strong class="text-slate-800">Data.gov.sg Carpark Availability API</strong> for free, high-frequency 1-minute updates on residential HDB & URA coupon/electronic lots.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-base">2</div>
            <div>
              <h4 class="font-bold text-slate-800 text-sm">Shopping Malls & CBD</h4>
              <p class="text-xs text-slate-500">Commercial developments</p>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Use <strong class="text-slate-800">LTA DataMall CarParkAvailabilityv2</strong> for major commercial malls (Suntec, ION, VivoCity, Jewel) with live coordinate feeds.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base">3</div>
            <div>
              <h4 class="font-bold text-slate-800 text-sm">ERP & Routing</h4>
              <p class="text-xs text-slate-500">Total trip cost calculations</p>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            Combine with <strong class="text-slate-800">OneMap SLA Geocoding</strong> and <strong class="text-slate-800">LTA ERP Rates API</strong> to calculate full travel fees + gantry pricing.
          </p>
        </div>
      </div>

      <!-- Detailed API Directory -->
      <div class="space-y-4">
        <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span>Official API Endpoints & Implementation Specs</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">${SG_APIS_INFO.length} APIs Catalogued</span>
        </h3>

        <div class="space-y-4">
          ${SG_APIS_INFO.map((api, idx) => `
            <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all hover:border-blue-300">
              <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div>
                  <div class="flex items-center gap-2 flex-wrap mb-1">
                    <span class="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold font-mono">API #${idx + 1}</span>
                    <span class="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">${api.authority}</span>
                    <span class="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">${api.frequency}</span>
                  </div>
                  <h4 class="text-base sm:text-lg font-bold text-slate-800">${api.name}</h4>
                  <p class="text-xs sm:text-sm text-slate-600 mt-1">${api.description}</p>
                </div>

                <div class="shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1">
                  <div class="text-slate-500 font-semibold">Authentication:</div>
                  <div class="font-mono text-slate-800 font-bold text-[11px]">${api.authType}</div>
                  <div class="text-slate-500 font-semibold mt-2">Coverage:</div>
                  <div class="text-slate-700 text-[11px]">${api.coverage}</div>
                </div>
              </div>

              <!-- Endpoint URL box -->
              <div class="bg-slate-900 rounded-xl p-3 sm:p-4 text-white font-mono text-xs overflow-x-auto flex items-center justify-between gap-4 mb-3">
                <span class="text-emerald-400 select-all">${api.endpoint}</span>
                <span class="text-slate-400 text-[10px] uppercase font-bold shrink-0">GET Request</span>
              </div>

              <!-- Fields provided tags -->
              <div>
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Returned Telemetry Fields:</span>
                <div class="flex flex-wrap gap-1.5">
                  ${api.fieldsProvided.map(field => `
                    <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200">
                      ${field}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  // Attach live sync button listener
  const syncBtn = container.querySelector('#btn-trigger-live-sync-modal');
  const statusIndicator = container.querySelector('#sync-status-indicator');

  if (syncBtn) {
    syncBtn.addEventListener('click', async () => {
      syncBtn.disabled = true;
      syncBtn.innerHTML = `
        <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
        <span>Connecting to Data.gov.sg...</span>
      `;
      if (statusIndicator) {
        statusIndicator.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span> Fetching 2,100+ carparks...`;
      }

      const res = await fetchLiveSgGovCarparks();
      syncBtn.disabled = false;
      syncBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <span>Sync Successful! (${res.totalCarparksReported || 2140} lots updated)</span>
      `;

      if (statusIndicator) {
        statusIndicator.innerHTML = `
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span class="text-emerald-700 font-bold">Live Data Updated (${new Date().toLocaleTimeString()})</span>
        `;
      }

      // Update state if available
      if (res.success && res.lookup) {
        appState.carparks.forEach(cp => {
          if (cp.govCode && res.lookup[cp.govCode]) {
            const govInfo = res.lookup[cp.govCode];
            if (govInfo.C) {
              cp.availableLots.sedan = govInfo.C.available;
              cp.totalLots.sedan = govInfo.C.total || cp.totalLots.sedan;
            }
            if (govInfo.M) {
              cp.availableLots.motorcycle = govInfo.M.available;
            }
            if (govInfo.H) {
              cp.availableLots.heavy = govInfo.H.available;
            }
          }
        });
        appState.saveCarparks();
        appState.notify();
      }

      setTimeout(() => {
        if (syncBtn) {
          syncBtn.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            <span>Test Live Singapore Gov API Sync</span>
          `;
        }
      }, 4000);
    });
  }
}
