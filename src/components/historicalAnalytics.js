// Historical Carpark Occupancy Analytics & Percentage Trends (Vanilla JS - Sleek Interface Theme)
import { appState } from '../services/storage.js';
import { VEHICLE_TYPES } from '../data/carparkData.js';
import { openReservationModal } from './spotReservationModal.js';

export function renderHistoricalAnalytics(container) {
  const defaultCp = (appState.carparks && appState.carparks[0]) || { id: 'suntec-city', name: 'Suntec City', code: 'SUNTEC', zone: 'Central' };
  let selectedCpId = appState.selectedCarparkId || defaultCp.id;
  let dayMode = 'weekday'; // 'weekday' | 'weekend'
  let selectedVehicle = appState.selectedVehicle || 'sedan';

  function update() {
    const cp = (appState.carparks && appState.carparks.find(c => c.id === selectedCpId)) || defaultCp;
    const history = (cp && cp.occupancyHistory) || {};
    const hourlyData = dayMode === 'weekday' 
      ? (history.hourlyWeekday || [20, 15, 10, 8, 15, 30, 60, 85, 90, 88, 95, 98, 95, 90, 85, 88, 92, 95, 88, 75, 55, 40, 28, 20])
      : (history.hourlyWeekend || [25, 18, 12, 10, 15, 25, 45, 68, 85, 94, 98, 100, 99, 98, 96, 98, 99, 96, 90, 82, 65, 45, 32, 24]);

    const total = (cp.totalLots && cp.totalLots[selectedVehicle]) || 100;
    const available = (cp.availableLots && cp.availableLots[selectedVehicle]) !== undefined ? cp.availableLots[selectedVehicle] : 0;
    const currentOccupancyPercent = Math.min(100, Math.round(((total - available) / total) * 100));

    // Calculate stats
    const maxOccupancy = Math.max(...hourlyData);
    const minOccupancy = Math.min(...hourlyData);
    const avgOccupancy = Math.round(hourlyData.reduce((a, b) => a + b, 0) / hourlyData.length);
    const peakHourIdx = hourlyData.indexOf(maxOccupancy);
    const peakHourStr = `${peakHourIdx % 12 || 12}:00 ${peakHourIdx >= 12 ? 'PM' : 'AM'}`;

    const currentHour = new Date().getHours();

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Header & Facility Selector -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
                Occupancy Intelligence
              </span>
              <h1 class="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Facility Load & Hourly Occupancy (%) Record
              </h1>
              <p class="text-xs text-slate-500 mt-1">
                LTA & operator sensor telemetry data aggregated over 90 rolling days.
              </p>
            </div>

            <!-- Carpark Picker Dropdown -->
            <div class="w-full md:w-80">
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Select Parking Facility:
              </label>
              <select id="select-analytics-carpark" class="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer">
                ${appState.carparks.map(c => `
                  <option value="${c.id}" ${c.id === selectedCpId ? 'selected' : ''}>
                    ${c.code} - ${c.name} (${c.zone})
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Top 4 Metrics Strip (Sleek Interface Style) -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Live Occupancy</span>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-2xl sm:text-3xl font-black text-slate-900 font-mono">${currentOccupancyPercent}%</span>
                <span class="text-xs font-bold ${currentOccupancyPercent > 85 ? 'text-rose-600' : 'text-emerald-600'}">
                  ${currentOccupancyPercent > 85 ? 'High Demand' : 'Normal'}
                </span>
              </div>
              <span class="text-[10px] text-slate-400 block mt-1">${available} of ${total} lots open</span>
            </div>

            <div class="p-4 rounded-2xl bg-rose-50 border border-rose-100">
              <span class="text-[10px] text-rose-600 font-bold uppercase tracking-wider block">Peak Demand</span>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-2xl sm:text-3xl font-black text-rose-700 font-mono">${maxOccupancy}%</span>
                <span class="text-xs font-bold text-rose-600">@ ${peakHourStr}</span>
              </div>
              <span class="text-[10px] text-rose-400 block mt-1">${history.peakHours || '12pm-2pm & 7pm-9pm'}</span>
            </div>

            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <span class="text-[10px] text-blue-600 font-bold uppercase tracking-wider block">Average Daily Load</span>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-2xl sm:text-3xl font-black text-blue-700 font-mono">${avgOccupancy}%</span>
                <span class="text-xs text-blue-600">24-hr avg</span>
              </div>
              <span class="text-[10px] text-blue-400 block mt-1">Min ~${minOccupancy}% (3 AM - 5 AM)</span>
            </div>

            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span class="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block">Smart AI Window</span>
              <div class="text-xs font-bold text-emerald-950 mt-1 leading-snug">
                Recommended arrival:
              </div>
              <p class="text-[11px] text-emerald-800 font-medium mt-0.5">
                ${history.bestTimeToPark || 'Before 11:30 AM or after 2:30 PM'}
              </p>
            </div>
          </div>
        </div>

        <!-- Interactive 24-Hour Occupancy Percentage Chart -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 class="text-base sm:text-lg font-bold text-slate-900">
                24-Hour Percentage Occupancy Profile: <span class="text-blue-600">${cp.name}</span>
              </h2>
              <p class="text-xs text-slate-500 mt-0.5">
                Hover or click over any hour bar to view projected parking lot pressure.
              </p>
            </div>

            <!-- Day toggle -->
            <div class="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
              <button 
                id="btn-day-weekday" 
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  dayMode === 'weekday' ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60' : 'text-slate-600 hover:text-slate-900'
                }"
              >
                🗓️ Weekdays
              </button>
              <button 
                id="btn-day-weekend" 
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  dayMode === 'weekend' ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60' : 'text-slate-600 hover:text-slate-900'
                }"
              >
                🏖️ Weekends & PH
              </button>
            </div>
          </div>

          <!-- SVG Visual Bar & Line Chart -->
          <div class="relative w-full overflow-x-auto pb-2">
            <div class="min-w-[640px]">
              <!-- Axis Grid & Percentage Bars -->
              <div class="relative h-64 border-b border-l border-slate-200 pt-6 px-2 flex items-end justify-between gap-1 bg-slate-50/40 rounded-t-2xl">
                
                <!-- Y-Axis percentage labels -->
                <div class="absolute left-1 inset-y-0 flex flex-col justify-between text-[10px] text-slate-400 font-mono pointer-events-none py-2">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                <!-- 85% Critical Threshold Line -->
                <div class="absolute inset-x-0 bottom-[85%] border-b border-dashed border-rose-300 pointer-events-none">
                  <span class="text-[9px] font-bold text-rose-500 bg-white px-1.5 ml-12 rounded-full border border-rose-200">85% Congestion Line</span>
                </div>

                <!-- 50% Baseline Line -->
                <div class="absolute inset-x-0 bottom-[50%] border-b border-dashed border-slate-200 pointer-events-none"></div>

                <!-- 24 Hour Bars -->
                ${hourlyData.map((val, hour) => {
                  const isCurrent = hour === currentHour;
                  const isHigh = val >= 85;
                  const isMed = val >= 60 && val < 85;
                  
                  let barColor = isHigh ? 'bg-rose-500 hover:bg-rose-600' : isMed ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600';
                  if (isCurrent) {
                    barColor = 'bg-blue-600 ring-2 ring-blue-400 shadow-sm';
                  }

                  return `
                    <div class="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer">
                      
                      <!-- Hover Tooltip -->
                      <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute -top-12 z-20 bg-slate-900 text-white text-[10px] rounded-xl px-2.5 py-1 shadow-xl pointer-events-none whitespace-nowrap">
                        <span class="font-bold">${hour}:00 - ${hour + 1}:00</span>: <span class="font-mono text-amber-300 font-bold">${val}% Occupied</span>
                        ${isCurrent ? '<span class="text-[9px] text-blue-300 block">Current Hour</span>' : ''}
                      </div>

                      <!-- The Bar -->
                      <div 
                        class="w-full max-w-[18px] rounded-t-lg transition-all duration-300 ${barColor}" 
                        style="height: ${val}%"
                      ></div>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- X-Axis Hours labels -->
              <div class="flex justify-between text-[10px] text-slate-400 font-mono pt-2 px-1">
                <span>00:00</span>
                <span>03:00</span>
                <span>06:00</span>
                <span>09:00</span>
                <span>12:00</span>
                <span>15:00</span>
                <span>18:00</span>
                <span>21:00</span>
                <span>23:59</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between flex-wrap gap-3 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500"></span> Plenty of lots (&lt;60%)</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-500"></span> Moderate (60-84%)</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-rose-500"></span> Congested (&ge;85%)</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-blue-600"></span> Current Hour (${currentHour}:00)</span>
            </div>

            <button id="btn-reserve-from-analytics" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 active:scale-95 transition-all shadow-md shadow-blue-600/20 cursor-pointer">
              Reserve Lot at ${cp.code} &rarr;
            </button>
          </div>
        </div>

        <!-- Weekly Congestion Matrix & Vehicle Comparison -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Weekly Pattern Heatmap -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 mb-1">
              🗓️ Day-of-Week Peak Pattern
            </h3>
            <p class="text-xs text-slate-500 mb-4">
              Average occupancy percentage across typical commute days.
            </p>

            <div class="space-y-3">
              ${[
                { day: 'Monday', avg: 76, peak: '12:30 PM (88%)', status: 'Moderate' },
                { day: 'Tuesday', avg: 79, peak: '1:00 PM (92%)', status: 'Busy' },
                { day: 'Wednesday', avg: 82, peak: '12:00 PM (95%)', status: 'Very Busy' },
                { day: 'Thursday', avg: 81, peak: '12:30 PM (93%)', status: 'Busy' },
                { day: 'Friday', avg: 88, peak: '7:30 PM (98%)', status: 'Peak Night' },
                { day: 'Saturday', avg: 94, peak: '2:00 PM (99%)', status: 'Full Capacity' },
                { day: 'Sunday', avg: 91, peak: '3:00 PM (97%)', status: 'Family Crowds' }
              ].map(d => `
                <div class="flex items-center justify-between gap-3 text-xs">
                  <span class="w-20 font-bold text-slate-700">${d.day}</span>
                  <div class="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div class="h-full rounded-full ${d.avg >= 85 ? 'bg-rose-500' : d.avg >= 75 ? 'bg-amber-500' : 'bg-emerald-500'}" style="width: ${d.avg}%"></div>
                  </div>
                  <span class="w-12 text-right font-mono font-bold text-slate-800">${d.avg}%</span>
                  <span class="w-28 text-right text-[11px] text-slate-500 font-medium">${d.peak}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Vehicle Type Breakdown -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 class="text-base font-bold text-slate-900 mb-1">
                🚗 Vehicle Category Capacity
              </h3>
              <p class="text-xs text-slate-500 mb-4">
                Dedicated lot allocation for Sedans, Motorbikes & Heavy Fleet.
              </p>

              <div class="space-y-3 text-xs">
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="text-lg">🚗</span>
                    <div>
                      <span class="font-bold text-slate-900 block">Sedan / Passenger Cars</span>
                      <span class="text-[11px] text-slate-500">${cp.availableLots.sedan} free / ${cp.totalLots.sedan} total</span>
                    </div>
                  </div>
                  <span class="font-mono font-bold text-blue-600 text-sm">
                    ${Math.round(((cp.totalLots.sedan - cp.availableLots.sedan) / cp.totalLots.sedan) * 100)}% load
                  </span>
                </div>

                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="text-lg">🏍️</span>
                    <div>
                      <span class="font-bold text-slate-900 block">Motorcycles / Scooters</span>
                      <span class="text-[11px] text-slate-500">${cp.availableLots.motorcycle} free / ${cp.totalLots.motorcycle} total</span>
                    </div>
                  </div>
                  <span class="font-mono font-bold text-emerald-600 text-sm">
                    ${Math.round(((cp.totalLots.motorcycle - cp.availableLots.motorcycle) / cp.totalLots.motorcycle) * 100)}% load
                  </span>
                </div>

                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="text-lg">🚚</span>
                    <div>
                      <span class="font-bold text-slate-900 block">Heavy Vehicles / Lorries</span>
                      <span class="text-[11px] text-slate-500">${cp.availableLots.heavy} free / ${cp.totalLots.heavy} total</span>
                    </div>
                  </div>
                  <span class="font-mono font-bold text-amber-600 text-sm">
                    ${Math.round(((cp.totalLots.heavy - cp.availableLots.heavy) / cp.totalLots.heavy) * 100)}% load
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-4 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900">
              <strong class="font-bold block mb-0.5">Driver Pro-Tip:</strong>
              Use our <strong>Expiring Radar</strong> on the Explore tab to catch spots 5-15 mins before a commuter departs during peak ${peakHourStr} windows!
            </div>
          </div>

        </div>

      </div>
    `;

    // Dropdown change
    const cpSelect = container.querySelector('#select-analytics-carpark');
    if (cpSelect) {
      cpSelect.addEventListener('change', (e) => {
        selectedCpId = e.target.value;
        appState.setSelectedCarpark(selectedCpId);
        update();
      });
    }

    // Day toggles
    const btnWk = container.querySelector('#btn-day-weekday');
    if (btnWk) {
      btnWk.addEventListener('click', () => {
        dayMode = 'weekday';
        update();
      });
    }

    const btnWkend = container.querySelector('#btn-day-weekend');
    if (btnWkend) {
      btnWkend.addEventListener('click', () => {
        dayMode = 'weekend';
        update();
      });
    }

    // Reserve jump
    const resBtn = container.querySelector('#btn-reserve-from-analytics');
    if (resBtn) {
      resBtn.addEventListener('click', () => {
        openReservationModal(selectedCpId);
      });
    }
  }

  update();
}

