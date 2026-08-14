// Top Navigation Bar Component (Vanilla JS - Sleek Interface Theme)
import { appState } from '../services/storage.js';
import { VEHICLE_TYPES } from '../data/carparkData.js';

export function renderNavbar(container) {
  const currentTab = appState.activeTab;
  const activeSession = appState.activeSession;
  const currentVehicle = appState.selectedVehicle;

  container.innerHTML = `
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-18 sm:h-20">
          
          <!-- Logo & Brand -->
          <div class="flex items-center gap-3">
            <div id="btn-brand-logo" class="flex items-center gap-3 cursor-pointer group">
              <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:bg-blue-500 transition-all">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
              </div>
              <div>
                <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
                  ParkWise <span class="text-blue-600">Pro</span>
                </h1>
                <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">
                  Smart Carpark & Deals Hub
                </p>
              </div>
            </div>
          </div>

          <!-- Vehicle Type Quick Switcher -->
          <div class="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200/80">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Vehicle:</span>
            ${Object.values(VEHICLE_TYPES).map(v => {
              const isSel = currentVehicle === v.id;
              return `
                <button 
                  data-header-vtype="${v.id}"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSel 
                      ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                  }"
                >
                  <span>${v.icon}</span>
                  <span>${v.name.split('/')[0]}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Desktop Navigation Tabs & Location Indicator -->
          <div class="flex items-center gap-4 sm:gap-6">
            <nav class="flex items-center gap-1 sm:gap-1.5">
              <button 
                data-nav-tab="explore"
                class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  currentTab === 'explore' 
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span class="hidden md:inline">Dashboard</span>
              </button>

              <button 
                data-nav-tab="deals"
                class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer relative ${
                  currentTab === 'deals' 
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }"
              >
                <span>🎟️</span>
                <span class="hidden md:inline">Mall Deals</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${currentTab === 'deals' ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-700'} font-black">
                  ${appState.mallPromos.length}
                </span>
              </button>

              <button 
                data-nav-tab="analytics"
                class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  currentTab === 'analytics' 
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                <span class="hidden md:inline">Analytics</span>
              </button>

              <button 
                data-nav-tab="session"
                class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer relative ${
                  currentTab === 'session' 
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }"
              >
                <span>🧾</span>
                <span class="hidden md:inline">Active Session</span>
                ${activeSession ? `
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                ` : ''}
              </button>
            </nav>

            <!-- Location Meta -->
            <div class="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200">
              <div class="text-right">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Location</p>
                <p class="text-xs font-bold text-slate-700">Marina Bay Central, SG</p>
              </div>
              <div class="w-9 h-9 rounded-full bg-blue-50 border-2 border-white shadow-xs flex items-center justify-center text-blue-600 font-bold text-xs">
                SG
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  `;

  // Attach event handlers
  const logo = container.querySelector('#btn-brand-logo');
  if (logo) {
    logo.addEventListener('click', () => {
      appState.setTab('explore');
    });
  }

  container.querySelectorAll('[data-nav-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-nav-tab');
      appState.setTab(tab);
    });
  });

  container.querySelectorAll('[data-header-vtype]').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.getAttribute('data-header-vtype');
      appState.setVehicleType(v);
    });
  });
}
