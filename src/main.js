// ParkPulse Singapore - Real-Time Smart Carpark Management Application (Vanilla JS)
// Strictly Vanilla JS implementation (No React, Vue, or Angular)

import './index.css';
import { appState } from './services/storage.js';
import { renderNavbar } from './components/navbar.js';
import { renderPromoBanner } from './components/banner.js';
import { renderCarparkList } from './components/carparkList.js';
import { renderMallDealsPage } from './components/mallDealsPage.js';
import { renderHistoricalAnalytics } from './components/historicalAnalytics.js';
import { renderActiveSessionView } from './components/activeSessionView.js';

function initApp() {
  const root = document.getElementById('root');
  if (!root) return;

  // Render main layout frame
  root.className = 'min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white';
  
  root.innerHTML = `
    <!-- Top Navigation -->
    <div id="navbar-mount"></div>

    <!-- Main Content Canvas -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
      <!-- Mall Deals Top Banner -->
      <div id="banner-mount"></div>

      <!-- Dynamic View Container -->
      <div id="view-mount" class="transition-opacity duration-200"></div>

    </main>

    <!-- Global App Footer -->
    <footer class="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">P</div>
          <span class="font-bold text-slate-800">ParkWise Pro Singapore</span>
          <span>• Connected to LTA DataMall, Data.gov.sg & URA Open APIs</span>
        </div>
        <div class="flex items-center gap-4 text-slate-600">
          <span>Sedan • Motorcycle • Heavy Fleet</span>
          <span>•</span>
          <span class="font-mono text-emerald-600 font-bold">100% Real-Time Bay & Sensor Telemetry</span>
        </div>
      </div>
    </footer>
  `;

  const navbarMount = root.querySelector('#navbar-mount');
  const bannerMount = root.querySelector('#banner-mount');
  const viewMount = root.querySelector('#view-mount');

  let lastRenderedTab = null;

  function renderCurrentView() {
    renderNavbar(navbarMount);

    // Show top promo banner primarily on explore view
    if (appState.activeTab === 'explore') {
      bannerMount.style.display = 'block';
      renderPromoBanner(bannerMount);
    } else {
      bannerMount.style.display = 'none';
      bannerMount.innerHTML = '';
    }

    // Switch views: only clear if switching between different tabs
    if (lastRenderedTab !== appState.activeTab) {
      viewMount.innerHTML = '';
      lastRenderedTab = appState.activeTab;
    }

    if (appState.activeTab === 'explore') {
      renderCarparkList(viewMount);
    } else if (appState.activeTab === 'deals') {
      renderMallDealsPage(viewMount);
    } else if (appState.activeTab === 'analytics') {
      renderHistoricalAnalytics(viewMount);
    } else if (appState.activeTab === 'session') {
      renderActiveSessionView(viewMount);
    }
  }

  // Initial render
  renderCurrentView();

  // Re-render when application state updates
  appState.subscribe(() => {
    renderCurrentView();
  });
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
