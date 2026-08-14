// Carpark List, Search & Real-Time Availability View (Vanilla JS - Sleek Interface Theme)
import { appState } from '../services/storage.js';
import { VEHICLE_TYPES } from '../data/carparkData.js';
import { openReservationModal } from './spotReservationModal.js';

export function renderCarparkList(container) {
  const vType = appState.selectedVehicle;
  const currentVehicleInfo = VEHICLE_TYPES[vType.toUpperCase()] || VEHICLE_TYPES.SEDAN;
  
  // Filter carparks
  let carparks = [...appState.carparks];

  if (appState.selectedZone && appState.selectedZone !== 'ALL') {
    carparks = carparks.filter(c => c.zone.toLowerCase().includes(appState.selectedZone.toLowerCase()));
  }

  if (appState.searchQuery && appState.searchQuery.trim()) {
    const q = appState.searchQuery.toLowerCase();
    carparks = carparks.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.zone.toLowerCase().includes(q) || 
      c.address.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.operator.toLowerCase().includes(q)
    );
  }

  // Get distinct zones for filter pills
  const allZones = ['ALL', 'Marina Bay', 'Bugis', 'Chinatown', 'Woodlands', 'Jurong West', 'HarbourFront', 'Toa Payoh'];

  container.innerHTML = `
    <!-- Top Filter & Search Controls -->
    <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <!-- Search input -->
        <div class="relative flex-1">
          <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input 
            type="text" 
            id="cp-search-input" 
            value="${appState.searchQuery}"
            placeholder="Search carparks, malls, HDB/URA codes (e.g. Suntec, Marina, Chinatown, TPY08)..."
            class="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/70 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
          />
          ${appState.searchQuery ? `
            <button id="btn-clear-search" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          ` : ''}
        </div>

        <!-- Vehicle Type Filter -->
        <div class="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 shrink-0">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 hidden sm:inline">Vehicle:</span>
          ${Object.values(VEHICLE_TYPES).map(v => {
            const isSelected = appState.selectedVehicle === v.id;
            return `
              <button 
                data-vehicle-id="${v.id}"
                class="btn-vehicle-filter px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }"
              >
                <span>${v.icon}</span>
                <span>${v.name.split('/')[0].trim()}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Zone Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar border-t border-slate-100 mt-4">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Zone:</span>
        ${allZones.map(zone => {
          const isSelected = (appState.selectedZone === zone) || (zone === 'ALL' && !appState.selectedZone);
          return `
            <button 
              data-zone="${zone}"
              class="btn-zone-filter px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }"
            >
              ${zone === 'ALL' ? '📍 All Singapore' : zone}
            </button>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Real-time Status Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1">
      <div class="flex items-center gap-2.5">
        <div class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
        <h2 class="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
          Real-Time Availability: <span class="text-blue-600 font-semibold">${currentVehicleInfo.name}</span>
        </h2>
      </div>

      <div class="flex items-center gap-4 text-xs font-medium text-slate-500">
        <div class="flex items-center gap-1.5">
          <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span>Available</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-3 h-3 rounded-full bg-amber-500"></div>
          <span>Expiring &le;15m</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-3 h-3 rounded-full bg-slate-200"></div>
          <span>Occupied</span>
        </div>
      </div>
    </div>

    <!-- Carpark Grid Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      ${carparks.map(cp => renderCarparkCard(cp, vType)).join('')}
    </div>

    ${carparks.length === 0 ? `
      <div class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
        <div class="text-4xl mb-3">🔍</div>
        <h3 class="text-base font-bold text-slate-800 mb-1">No Carpark Facilities Found</h3>
        <p class="text-xs text-slate-500 max-w-md mx-auto mb-4">
          We couldn't find any facilities matching "${appState.searchQuery}". Try searching by zone like "Marina Bay" or reset your filters.
        </p>
        <button id="btn-reset-filters" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 cursor-pointer shadow-sm shadow-blue-600/20">
          Reset All Filters
        </button>
      </div>
    ` : ''}
  `;

  // Attach search listener
  const searchInput = container.querySelector('#cp-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.setSearchQuery(e.target.value);
    });
  }

  const clearSearch = container.querySelector('#btn-clear-search');
  if (clearSearch) {
    clearSearch.addEventListener('click', () => {
      appState.setSearchQuery('');
    });
  }

  const resetFilters = container.querySelector('#btn-reset-filters');
  if (resetFilters) {
    resetFilters.addEventListener('click', () => {
      appState.setSearchQuery('');
      appState.setSelectedZone('ALL');
    });
  }

  // Vehicle filter listeners
  container.querySelectorAll('.btn-vehicle-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.getAttribute('data-vehicle-id');
      appState.setVehicleType(v);
    });
  });

  // Zone filter listeners
  container.querySelectorAll('.btn-zone-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const z = btn.getAttribute('data-zone');
      appState.setSelectedZone(z);
    });
  });

  // Reserve button listeners
  container.querySelectorAll('.btn-reserve-carpark').forEach(btn => {
    btn.addEventListener('click', () => {
      const cpId = btn.getAttribute('data-carpark-id');
      const spotId = btn.getAttribute('data-spot-id') || null;
      openReservationModal(cpId, spotId);
    });
  });

  // Historical analytics jump button
  container.querySelectorAll('.btn-view-analytics').forEach(btn => {
    btn.addEventListener('click', () => {
      const cpId = btn.getAttribute('data-carpark-id');
      appState.setSelectedCarpark(cpId);
      appState.setTab('analytics');
    });
  });
}

function renderCarparkCard(cp, vType) {
  const available = cp.availableLots[vType] || 0;
  const total = cp.totalLots[vType] || 100;
  const occupied = Math.max(0, total - available);
  const expiring = cp.expiringWithin15Min[vType] || 0;
  const occupancyPercent = Math.min(100, Math.round(((total - available) / total) * 100));

  const isFull = available <= 0;
  const isCrowded = occupancyPercent >= 85;

  let statusBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let statusText = `${available} Lots Available`;
  if (isFull) {
    statusBadgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
    statusText = 'Lot Full';
  } else if (isCrowded) {
    statusBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
    statusText = `Crowded (${available} left)`;
  }

  const rateInfo = cp.rates[vType] || cp.rates.sedan;
  const expiringSpots = cp.spots ? cp.spots.filter(s => s.status === 'expiring' && (s.type === vType || !s.type)) : [];

  return `
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <!-- Card Top Header -->
      <div class="p-6 pb-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                ${cp.code}
              </span>
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                ${cp.operator}
              </span>
              <span class="text-xs text-slate-400 font-medium">
                • ${cp.distanceKm} km away
              </span>
            </div>

            <h3 class="text-lg font-bold text-slate-800 mt-2 leading-snug">
              ${cp.name}
            </h3>
            <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span class="line-clamp-1">${cp.address}</span>
            </p>
          </div>

          <div class="flex flex-col items-end shrink-0">
            <span class="px-3 py-1 rounded-full text-xs font-bold border ${statusBadgeClass}">
              ${statusText}
            </span>
          </div>
        </div>

        <!-- 4-Stat Metric Blocks (Sleek Interface Style) -->
        <div class="mt-5 grid grid-cols-4 gap-2.5 sm:gap-3">
          <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Total Slots</p>
            <p class="text-xl sm:text-2xl font-black text-slate-800">${total}</p>
          </div>
          <div class="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-100">
            <p class="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-1">Available</p>
            <p class="text-xl sm:text-2xl font-black text-emerald-700">${available}</p>
          </div>
          <div class="bg-rose-50 p-3.5 rounded-2xl border border-rose-100">
            <p class="text-[10px] text-rose-600 font-bold uppercase tracking-wider mb-1">Occupied</p>
            <p class="text-xl sm:text-2xl font-black text-rose-700">${occupied}</p>
          </div>
          <div class="bg-blue-50 p-3.5 rounded-2xl border border-blue-100">
            <p class="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-1">Occupancy</p>
            <p class="text-xl sm:text-2xl font-black text-blue-700">${occupancyPercent}%</p>
          </div>
        </div>

        <!-- Expiring Coupon Radar Strip -->
        <div class="mt-4 bg-amber-50/70 rounded-2xl p-3 border border-amber-200/70">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 font-bold text-amber-900">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>Expiring Radar:</span>
              <span class="bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded font-mono font-bold">${expiring} slots</span>
            </div>
            <span class="text-[11px] text-amber-700 font-medium">Freeing up &le; 15 mins</span>
          </div>

          ${expiringSpots.length > 0 ? `
            <div class="flex items-center gap-2 mt-2 overflow-x-auto no-scrollbar">
              ${expiringSpots.slice(0, 3).map(s => {
                const minLeft = s.expiresAt ? Math.max(1, Math.round((s.expiresAt - Date.now()) / 60000)) : 5;
                return `
                  <button 
                    data-carpark-id="${cp.id}" 
                    data-spot-id="${s.id}"
                    class="btn-reserve-carpark flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-amber-300 text-xs text-slate-800 hover:bg-amber-100/70 cursor-pointer shrink-0 shadow-2xs font-medium"
                  >
                    <span class="font-bold font-mono text-amber-800">${s.id}</span>
                    <span class="text-slate-500 text-[10px]">(${s.level})</span>
                    <span class="bg-amber-100 text-amber-800 px-1.5 rounded font-bold text-[10px]">~${minLeft}m left</span>
                  </button>
                `;
              }).join('')}
            </div>
          ` : `
            <p class="text-[11px] text-amber-800/80 mt-1">
              Active sessions tracked in real-time so you can reserve upcoming freed spots before arrival.
            </p>
          `}
        </div>

        <!-- Rates & Feature highlights -->
        <div class="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div>
            <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Pricing Rate</span>
            <p class="font-bold text-slate-700 mt-0.5 line-clamp-1">
              ${rateInfo.weekday}
            </p>
          </div>
          <div class="text-right">
            <span class="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Highlights</span>
            <p class="text-slate-600 font-medium mt-0.5">
              ${cp.features ? cp.features.slice(0, 2).join(' • ') : 'Sheltered EPS'}
            </p>
          </div>
        </div>
      </div>

      <!-- Card Bottom Actions -->
      <div class="bg-slate-50/90 px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <button 
          data-carpark-id="${cp.id}"
          class="btn-view-analytics px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          <span>Historical %</span>
        </button>

        <div class="flex items-center gap-2">
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cp.address)}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="p-2.5 rounded-xl text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
            title="Open in Maps"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </a>

          <button 
            data-carpark-id="${cp.id}"
            class="btn-reserve-carpark px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white active:scale-95 transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <span>Reserve Spot</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

