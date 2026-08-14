// Carpark List, Search & Real-Time Availability View (Vanilla JS - Sleek Interface Theme)
import { appState } from '../services/storage.js';
import { VEHICLE_TYPES } from '../data/carparkData.js';
import { openReservationModal } from './spotReservationModal.js';

export function renderCarparkList(container) {
  const vType = appState.selectedVehicle || 'sedan';
  const currentVehicleInfo = VEHICLE_TYPES[(vType || 'sedan').toUpperCase()] || VEHICLE_TYPES.SEDAN;
  
  // Base carpark dataset
  const allCarparks = Array.isArray(appState.carparks) ? [...appState.carparks] : [];

  // Region / Zone filter
  let filteredCarparks = allCarparks;
  if (appState.selectedZone && appState.selectedZone !== 'ALL') {
    const selZone = String(appState.selectedZone || '').toLowerCase();
    filteredCarparks = filteredCarparks.filter(c => {
      if (!c) return false;
      const zone = String(c.zone || '').toLowerCase();
      const region = String(c.region || '').toLowerCase();
      const address = String(c.address || '').toLowerCase();
      return zone.includes(selZone) || region.includes(selZone) || address.includes(selZone);
    });
  }

  // Search Query matching
  const hasSearch = Boolean(appState.searchQuery && appState.searchQuery.trim().length > 0);
  let primaryMatches = [];
  let otherLocationCarparks = [];

  if (hasSearch) {
    const q = String(appState.searchQuery || '').trim().toLowerCase();
    
    // Split into primary matches (matching location/name/code/zone/address/spots)
    primaryMatches = allCarparks.filter(c => {
      if (!c) return false;
      const name = String(c.name || '').toLowerCase();
      const zone = String(c.zone || '').toLowerCase();
      const region = String(c.region || '').toLowerCase();
      const address = String(c.address || '').toLowerCase();
      const code = String(c.code || '').toLowerCase();
      const govCode = String(c.govCode || '').toLowerCase();
      const operator = String(c.operator || '').toLowerCase();
      
      const matchBasic = name.includes(q) || zone.includes(q) || region.includes(q) || 
                         address.includes(q) || code.includes(q) || (govCode && govCode.includes(q)) || 
                         operator.includes(q);
      
      if (matchBasic) return true;

      const matchFeatures = Array.isArray(c.features) && c.features.some(f => 
        typeof f === 'string' && f.toLowerCase().includes(q)
      );
      if (matchFeatures) return true;

      const matchSpots = Array.isArray(c.spots) && c.spots.some(s => {
        if (!s) return false;
        const spotId = String(s.id || '').toLowerCase();
        const spotLevel = String(s.level || '').toLowerCase();
        const spotZone = String(s.zone || '').toLowerCase();
        return spotId.includes(q) || spotLevel.includes(q) || spotZone.includes(q);
      });
      return matchSpots;
    });

    // Other locations across Singapore (to ensure user can view alternatives islandwide)
    const primaryIds = new Set(primaryMatches.map(c => c.id));
    otherLocationCarparks = allCarparks.filter(c => c && !primaryIds.has(c.id));
  } else {
    primaryMatches = filteredCarparks;
    otherLocationCarparks = [];
  }

  // Quick region filter pills across all of Singapore
  const regions = [
    { id: 'ALL', label: '🇸🇬 All Singapore' },
    { id: 'Central', label: '🏙️ Central / CBD' },
    { id: 'Orchard', label: '🛍️ Orchard / Bugis' },
    { id: 'East', label: '✈️ East (Changi / Tampines / Bedok)' },
    { id: 'West', label: '🏢 West (Jurong / Clementi / IMM)' },
    { id: 'North', label: '🚛 North (Woodlands / Yishun / AMK)' },
    { id: 'North-East', label: '🌳 North-East (Punggol / Serangoon)' },
    { id: 'South', label: '🎡 South (VivoCity / Sentosa)' }
  ];

  container.innerHTML = `
    <!-- Top Filter & Search Controls -->
    <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-6">
      
      <!-- Top Action Bar Header -->
      <div class="mb-4">
        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span>Islandwide Carpark Locator & Lot Telemetry</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold font-mono">
            ${allCarparks.length} Singapore Facilities
          </span>
        </h2>
        <p class="text-xs text-slate-500 mt-0.5">
          Search any mall, HDB/URA town, terminal, exact lot number or region across Singapore.
        </p>
      </div>

      <!-- Search Bar with explicit Search Button -->
      <form id="cp-search-form" class="flex flex-col sm:flex-row items-stretch gap-2.5">
        <div class="relative flex-1">
          <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input 
            type="text" 
            id="cp-search-input" 
            value="${appState.searchQuery || ''}"
            placeholder="Search by location, mall, HDB MSCP, town (e.g. Orchard, Jurong, Woodlands, Tampines, Suntec, B1-01)..."
            class="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
          />
          ${appState.searchQuery ? `
            <button type="button" id="btn-clear-search" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          ` : ''}
        </div>

        <!-- Explicit Search Button -->
        <button 
          type="submit" 
          id="btn-search-trigger"
          class="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span>Search Carpark</span>
        </button>

        <!-- Vehicle Type Filter -->
        <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
          ${Object.values(VEHICLE_TYPES).map(v => {
            const isSelected = appState.selectedVehicle === v.id;
            return `
              <button 
                type="button"
                data-vehicle-id="${v.id}"
                class="btn-vehicle-filter px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }"
              >
                <span>${v.icon}</span>
                <span class="hidden sm:inline">${v.name.split('/')[0].trim()}</span>
              </button>
            `;
          }).join('')}
        </div>
      </form>

      <!-- Region & Town Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar border-t border-slate-100 mt-4">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Region:</span>
        ${regions.map(r => {
          const isSelected = (appState.selectedZone === r.id) || (r.id === 'ALL' && (!appState.selectedZone || appState.selectedZone === 'ALL'));
          return `
            <button 
              type="button"
              data-zone="${r.id}"
              class="btn-zone-filter px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }"
            >
              ${r.label}
            </button>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Active Filter Feedback & Real-Time Legend -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1">
      <div class="flex items-center gap-2.5 flex-wrap">
        <div class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
        <h3 class="text-base font-bold text-slate-800 tracking-tight">
          ${hasSearch 
            ? `Search Results for "${appState.searchQuery}": <span class="text-blue-600 font-semibold">${primaryMatches.length} Direct Matches</span>`
            : `Live Parking Availability: <span class="text-blue-600 font-semibold">${currentVehicleInfo.name}</span> (${primaryMatches.length} Facilities)`
          }
        </h3>
      </div>

      <div class="flex items-center gap-4 text-xs font-medium text-slate-500">
        <div class="flex items-center gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          <span>Available</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
          <span>Expiring &le;15m</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
          <span>Occupied</span>
        </div>
      </div>
    </div>

    <!-- Section 1: Primary Matching Carparks -->
    ${primaryMatches.length > 0 ? `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        ${primaryMatches.map(cp => renderCarparkCard(cp, vType, true)).join('')}
      </div>
    ` : `
      <div class="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm mb-8">
        <div class="text-4xl mb-2">🔍</div>
        <h4 class="text-base font-bold text-slate-800 mb-1">No Direct Matches for "${appState.searchQuery}"</h4>
        <p class="text-xs text-slate-500 max-w-md mx-auto mb-4">
          We couldn't find an exact carpark with that specific name. See available carparks in other Singapore locations below, or try searching by region (e.g. Orchard, Marina, Jurong, Tampines, Woodlands).
        </p>
        <button id="btn-reset-filters-empty" class="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 cursor-pointer shadow-xs">
          Clear Search & Show All Carparks
        </button>
      </div>
    `}

    <!-- Section 2: Other Locations Across Singapore (Directly fulfilling user request) -->
    ${(hasSearch && otherLocationCarparks.length > 0) ? `
      <div class="mt-10 pt-8 border-t border-slate-200">
        <div class="flex items-center justify-between gap-4 mb-5">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">Islandwide Alternative Options</span>
              <span class="text-xs text-slate-500 font-medium">(${otherLocationCarparks.length} other facilities)</span>
            </div>
            <h3 class="text-lg font-bold text-slate-800 mt-1">
              Available Carparks in Other Locations Across Singapore
            </h3>
            <p class="text-xs text-slate-500">
              Explore available parking spots in adjacent districts and major hubs across Singapore.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          ${otherLocationCarparks.map(cp => renderCarparkCard(cp, vType, false)).join('')}
        </div>
      </div>
    ` : ''}
  `;

  // Attach search form listener
  const searchForm = container.querySelector('#cp-search-form');
  const searchInput = container.querySelector('#cp-search-input');
  
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.setSearchQuery(searchInput.value);
    });

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

  const resetBtn = container.querySelector('#btn-reset-filters-empty');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
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

  // Toggle Spot Breakdown Accordion
  container.querySelectorAll('.btn-toggle-spots').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = container.querySelector(`#${targetId}`);
      if (targetEl) {
        const isHidden = targetEl.classList.contains('hidden');
        if (isHidden) {
          targetEl.classList.remove('hidden');
          btn.innerHTML = `
            <span>Hide Specific Lot Numbers</span>
            <svg class="w-3.5 h-3.5 rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          `;
        } else {
          targetEl.classList.add('hidden');
          btn.innerHTML = `
            <span>View Levels, Zones & Lot Numbers (${btn.getAttribute('data-count')})</span>
            <svg class="w-3.5 h-3.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          `;
        }
      }
    });
  });
}

function renderCarparkCard(cp, vType, isPrimary = true) {
  if (!cp) return '';
  const vehicle = vType || 'sedan';
  const availableLots = cp.availableLots || {};
  const totalLots = cp.totalLots || {};
  const expiringLots = cp.expiringWithin15Min || {};

  const available = availableLots[vehicle] !== undefined ? availableLots[vehicle] : (availableLots.sedan || 0);
  const total = totalLots[vehicle] !== undefined ? totalLots[vehicle] : (totalLots.sedan || 100);
  const occupied = Math.max(0, total - available);
  const expiring = expiringLots[vehicle] !== undefined ? expiringLots[vehicle] : (expiringLots.sedan || 0);
  const occupancyPercent = total > 0 ? Math.min(100, Math.round(((total - available) / total) * 100)) : 0;

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

  const rates = cp.rates || {};
  const rateInfo = rates[vehicle] || rates.sedan || { weekday: '$1.20 / 30 mins', peak: '$1.50 / 30 mins' };
  const spots = Array.isArray(cp.spots) ? cp.spots : [];
  const accordionId = `spots-accordion-${cp.id || Math.random().toString(36).substr(2, 9)}`;
  const operatorText = cp.operator ? cp.operator.split('/')[0].trim() : 'Singapore Carpark';

  return `
    <div class="bg-white rounded-3xl border ${isPrimary ? 'border-slate-200' : 'border-slate-200/80 bg-slate-50/40'} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <!-- Card Top Header -->
      <div class="p-6 pb-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                ${cp.code || 'CP'}
              </span>
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                ${cp.region || 'Singapore'}
              </span>
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-100 text-slate-600">
                ${operatorText}
              </span>
              <span class="text-xs text-slate-400 font-medium">
                • ${cp.distanceKm || '1.2'} km away
              </span>
            </div>

            <h3 class="text-lg font-bold text-slate-800 mt-2 leading-snug">
              ${cp.name || 'Singapore Parking Facility'}
            </h3>
            <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span class="line-clamp-1">${cp.address || 'Singapore'}</span>
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

          <div class="flex items-center justify-between gap-2 mt-2">
            <p class="text-[11px] text-amber-800/90">
              Reserve upcoming freed spots in advance before reaching gantry.
            </p>
            <button 
              type="button"
              data-target="${accordionId}"
              data-count="${spots.length}"
              class="btn-toggle-spots shrink-0 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs"
            >
              <span>View Levels, Zones & Lot Numbers (${spots.length})</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
        </div>

        <!-- Expandable Granular Spot Details (Level, Zone, Lot Number) -->
        <div id="${accordionId}" class="hidden mt-3 pt-3 border-t border-slate-100 space-y-2">
          <div class="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Granular Bay Breakdown</span>
            <span>Real-Time Status</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            ${spots.map(s => {
              const isAvail = s.status === 'available';
              const isExp = s.status === 'expiring';
              const minLeft = s.expiresAt ? Math.max(1, Math.round((s.expiresAt - Date.now()) / 60000)) : 4;

              return `
                <div class="p-2.5 rounded-xl border ${
                  isAvail 
                    ? 'bg-emerald-50/50 border-emerald-200' 
                    : isExp 
                      ? 'bg-amber-50/50 border-amber-200' 
                      : 'bg-slate-50 border-slate-200 opacity-60'
                } flex items-center justify-between gap-2">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="font-mono font-bold text-xs ${isAvail ? 'text-emerald-900' : isExp ? 'text-amber-900' : 'text-slate-700'}">
                        ${s.id}
                      </span>
                      ${s.isEV ? `<span class="text-[9px] bg-blue-100 text-blue-800 font-bold px-1 rounded">⚡ EV</span>` : ''}
                    </div>
                    <div class="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <span class="font-semibold text-slate-700">${s.level || 'B1'}</span>
                      <span>•</span>
                      <span>${s.zone || 'Zone A'}</span>
                    </div>
                    ${s.distanceToLift ? `
                      <div class="text-[9px] text-slate-400">🚶 ${s.distanceToLift}</div>
                    ` : ''}
                  </div>

                  <div class="flex flex-col items-end gap-1">
                    ${isAvail ? `
                      <button 
                        data-carpark-id="${cp.id}"
                        data-spot-id="${s.id}"
                        class="btn-reserve-carpark px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] cursor-pointer shadow-2xs"
                      >
                        Reserve Lot
                      </button>
                    ` : isExp ? `
                      <button 
                        data-carpark-id="${cp.id}"
                        data-spot-id="${s.id}"
                        class="btn-reserve-carpark px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] cursor-pointer shadow-2xs"
                      >
                        Pre-book (~${minLeft}m)
                      </button>
                    ` : `
                      <span class="text-[10px] text-slate-400 font-medium">Occupied</span>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
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
