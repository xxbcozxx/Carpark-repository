// Storage and State Management for ParkPulse (Vanilla JS)
import { INITIAL_CARPARKS } from '../data/carparkData.js';
import { MALL_PROMOTIONS } from '../data/mallPromos.js';

const STORAGE_KEYS = {
  CARPARKS: 'parkpulse_carparks_v1',
  ACTIVE_SESSION: 'parkpulse_active_session',
  RESERVATIONS: 'parkpulse_reservations',
  VEHICLE_TYPE: 'parkpulse_selected_vehicle',
  CLAIMED_PROMOS: 'parkpulse_claimed_promos',
  USER_WALLET: 'parkpulse_user_wallet'
};

export class AppState {
  constructor() {
    this.listeners = [];
    this.selectedVehicle = localStorage.getItem(STORAGE_KEYS.VEHICLE_TYPE) || 'sedan';
    this.searchQuery = '';
    this.selectedZone = 'ALL';
    this.activeTab = 'explore'; // 'explore' | 'deals' | 'analytics' | 'session'
    this.selectedCarparkId = null;
    this.activeSession = this.loadActiveSession();
    this.reservations = this.loadReservations();
    this.claimedPromos = this.loadClaimedPromos();
    this.carparks = this.loadCarparks();
    this.mallPromos = MALL_PROMOTIONS;
    
    // Live simulation interval
    this.startSimulation();
  }

  loadCarparks() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CARPARKS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Using initial carpark data', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_CARPARKS));
  }

  saveCarparks() {
    try {
      localStorage.setItem(STORAGE_KEYS.CARPARKS, JSON.stringify(this.carparks));
    } catch (e) {
      console.error(e);
    }
  }

  loadActiveSession() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      if (saved) {
        const session = JSON.parse(saved);
        // Check if session is still ongoing or expired within 1 hr
        if (session && session.expiresAt > Date.now() - 3600000) {
          return session;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  saveActiveSession(session) {
    this.activeSession = session;
    if (session) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    }
    this.notify();
  }

  loadReservations() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveReservation(res) {
    this.reservations.unshift(res);
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(this.reservations));
    this.notify();
  }

  loadClaimedPromos() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLAIMED_PROMOS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  claimPromo(promoId) {
    if (!this.claimedPromos.includes(promoId)) {
      this.claimedPromos.push(promoId);
      localStorage.setItem(STORAGE_KEYS.CLAIMED_PROMOS, JSON.stringify(this.claimedPromos));
      this.notify();
    }
  }

  setVehicleType(type) {
    this.selectedVehicle = type;
    localStorage.setItem(STORAGE_KEYS.VEHICLE_TYPE, type);
    this.notify();
  }

  setTab(tab) {
    this.activeTab = tab;
    this.notify();
  }

  setSearchQuery(q) {
    this.searchQuery = q;
    this.notify();
  }

  setSelectedZone(zone) {
    this.selectedZone = zone;
    this.notify();
  }

  setSelectedCarpark(cpId) {
    this.selectedCarparkId = cpId;
    this.notify();
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  notify() {
    this.listeners.forEach(fn => {
      try {
        fn(this);
      } catch (e) {
        console.error('State listener error:', e);
      }
    });
  }

  startSimulation() {
    // Every 4 seconds, adjust expiring lots countdown and fluctuate available lots slightly
    setInterval(() => {
      let changed = false;
      const now = Date.now();

      this.carparks.forEach(cp => {
        // Update spot countdowns
        if (cp.spots) {
          cp.spots.forEach(sp => {
            if (sp.status === 'expiring' && sp.expiresAt && sp.expiresAt <= now) {
              // The car left! Lot becomes available!
              sp.status = 'available';
              sp.expiresAt = null;
              const vType = sp.type || 'sedan';
              if (cp.availableLots[vType] < cp.totalLots[vType]) {
                cp.availableLots[vType]++;
              }
              if (cp.expiringWithin15Min[vType] > 0) {
                cp.expiringWithin15Min[vType]--;
              }
              changed = true;
            }
          });
        }
      });

      if (changed) {
        this.saveCarparks();
        this.notify();
      }
    }, 4000);
  }

  reserveSpot(carparkId, spotId, vehicleNumber, durationMinutes, paymentDetails) {
    const cp = this.carparks.find(c => c.id === carparkId);
    if (!cp) throw new Error('Carpark not found');

    const vType = this.selectedVehicle;
    if (cp.availableLots[vType] > 0) {
      cp.availableLots[vType]--;
    }

    if (spotId && cp.spots) {
      const spot = cp.spots.find(s => s.id === spotId);
      if (spot) {
        spot.status = 'occupied';
        spot.expiresAt = Date.now() + durationMinutes * 60 * 1000;
      }
    }

    const sessionId = 'PK-' + Math.floor(100000 + Math.random() * 900000);
    const session = {
      id: sessionId,
      carparkId: cp.id,
      carparkName: cp.name,
      carparkCode: cp.code,
      carparkAddress: cp.address,
      spotId: spotId || 'General Lot (' + vType.toUpperCase() + ')',
      vehicleType: vType,
      vehicleNumber: vehicleNumber || 'SBA 8888 A',
      startTime: Date.now(),
      durationMinutes: durationMinutes,
      expiresAt: Date.now() + durationMinutes * 60 * 1000,
      totalPaid: paymentDetails.totalAmount,
      discountApplied: paymentDetails.discountAmount || 0,
      paymentMethod: paymentDetails.method,
      status: 'active', // 'active' | 'completed' | 'extended'
      receiptNo: 'REC-' + Date.now().toString().slice(-6)
    };

    this.saveActiveSession(session);
    this.saveReservation(session);
    this.saveCarparks();
    this.activeTab = 'session';
    this.notify();
    return session;
  }

  extendSession(extraMinutes, extraAmount) {
    if (!this.activeSession) return;
    this.activeSession.durationMinutes += extraMinutes;
    this.activeSession.expiresAt += extraMinutes * 60 * 1000;
    this.activeSession.totalPaid += extraAmount;
    this.activeSession.status = 'extended';
    this.saveActiveSession(this.activeSession);
    this.notify();
  }

  endSession() {
    if (!this.activeSession) return;
    this.activeSession.status = 'completed';
    this.activeSession.endedAt = Date.now();
    this.saveReservation(this.activeSession);
    this.saveActiveSession(null);
    this.notify();
  }
}

export const appState = new AppState();
