// Comprehensive Nationwide Singapore Carpark Dataset
// Covering Central, North, South, East, West, North-East regions, Malls, HDB MSCPs, URA & Heavy Vehicle Parks

export const VEHICLE_TYPES = {
  SEDAN: { id: 'sedan', name: 'Car / Sedan / EV', icon: '🚗', defaultRate: 1.20, unit: 'per 30 min' },
  MOTORCYCLE: { id: 'motorcycle', name: 'Motorcycle', icon: '🏍️', defaultRate: 0.65, unit: 'per session (7am-10:30pm)' },
  HEAVY: { id: 'heavy', name: 'Heavy Vehicle / Van / Lorry', icon: '🚚', defaultRate: 2.50, unit: 'per hour' },
};

export const INITIAL_CARPARKS = [
  // ==========================================
  // 1. CENTRAL / MARINA / CBD / ORCHARD / BUGIS
  // ==========================================
  {
    id: 'cp-suntec',
    name: 'Suntec City Mall & Convention Centre',
    code: 'SUN01',
    govCode: 'C10',
    operator: 'Wilson Parking / LTA Feed',
    zone: 'Marina Bay / CBD',
    region: 'Central',
    address: '3 Temasek Blvd, Singapore 038983',
    lat: 1.2934,
    lng: 103.8576,
    totalLots: { sedan: 3100, motorcycle: 280, heavy: 45 },
    availableLots: { sedan: 482, motorcycle: 94, heavy: 12 },
    expiringWithin15Min: { sedan: 38, motorcycle: 11, heavy: 3 },
    rates: {
      sedan: {
        weekday: '$2.40 for 1st hr, $0.60/subsequent 15 mins (7am-5pm); $3.00/entry (5pm-7am)',
        weekend: '$2.60 for 1st 4 hrs, $0.60/subsequent 15 mins',
        hourlyAvg: 2.40
      },
      motorcycle: {
        weekday: '$1.40 per entry',
        weekend: '$1.40 per entry',
        hourlyAvg: 0.70
      },
      heavy: {
        weekday: '$4.50/hr (Loading bay max 2.8m - 4.5m in Zone B)',
        weekend: '$4.50/hr',
        hourlyAvg: 4.50
      }
    },
    features: ['EV Fast Charging (12 bays)', 'Accessible Lots (18)', 'Grace Period: 15 mins', 'Height Limit: 2.0m (4.5m loading)'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.6,
    distanceKm: 0.4,
    occupancyHistory: {
      hourlyWeekday: [12, 10, 8, 8, 14, 28, 52, 78, 88, 85, 92, 95, 93, 89, 82, 84, 88, 91, 79, 65, 48, 35, 22, 15],
      hourlyWeekend: [18, 12, 10, 9, 12, 22, 38, 55, 68, 82, 94, 98, 97, 96, 92, 94, 96, 90, 81, 72, 59, 42, 28, 20],
      peakHours: '12:00 PM - 2:00 PM & 6:30 PM - 8:30 PM',
      bestTimeToPark: 'Before 11:30 AM or after 2:30 PM'
    },
    spots: [
      { id: 'Lot #B1-A01', type: 'sedan', level: 'Level B1', zone: 'Zone A (Green)', status: 'available', distanceToLift: '15m to Lobby A' },
      { id: 'Lot #B1-A02', type: 'sedan', level: 'Level B1', zone: 'Zone A (Green)', status: 'occupied', expiresAt: Date.now() + 1800000 },
      { id: 'Lot #B1-A03', type: 'sedan', level: 'Level B1', zone: 'Zone A (Green)', status: 'expiring', expiresAt: Date.now() + 240000, distanceToLift: '18m to Lobby A' },
      { id: 'Lot #B1-EV04', type: 'sedan', level: 'Level B1', zone: 'Zone B (Blue)', status: 'available', distanceToLift: '25m to Lobby B', isEV: true },
      { id: 'Lot #B1-B05', type: 'sedan', level: 'Level B1', zone: 'Zone B (Blue)', status: 'expiring', expiresAt: Date.now() + 540000, distanceToLift: '12m to Lift Core 3' },
      { id: 'Lot #B2-C10', type: 'sedan', level: 'Level B2', zone: 'Zone C (Yellow)', status: 'available', distanceToLift: '8m to Convention Hall' },
      { id: 'Lot #B2-C11', type: 'sedan', level: 'Level B2', zone: 'Zone C (Yellow)', status: 'available', distanceToLift: '14m' },
      { id: 'Lot #M-01', type: 'motorcycle', level: 'Level B1', zone: 'Zone M (Bike Bay)', status: 'available', distanceToLift: '5m' },
      { id: 'Lot #M-02', type: 'motorcycle', level: 'Level B1', zone: 'Zone M (Bike Bay)', status: 'expiring', expiresAt: Date.now() + 180000 },
      { id: 'Lot #HV-01', type: 'heavy', level: 'Ground Loading Dock', zone: 'Heavy Zone 1', status: 'available', distanceToLift: 'Loading Bay A' },
      { id: 'Lot #HV-02', type: 'heavy', level: 'Ground Loading Dock', zone: 'Heavy Zone 1', status: 'expiring', expiresAt: Date.now() + 420000 }
    ]
  },
  {
    id: 'cp-marina-square',
    name: 'Marina Square Shopping Mall',
    code: 'MSQ02',
    govCode: 'C12',
    operator: 'LHN Parking / Mall Partner',
    zone: 'Marina Bay',
    region: 'Central',
    address: '6 Raffles Blvd, Singapore 039594',
    lat: 1.2917,
    lng: 103.8572,
    totalLots: { sedan: 1650, motorcycle: 140, heavy: 20 },
    availableLots: { sedan: 215, motorcycle: 48, heavy: 4 },
    expiringWithin15Min: { sedan: 29, motorcycle: 8, heavy: 2 },
    rates: {
      sedan: {
        weekday: '$1.40 for 1st hr, $0.70/subsequent 30 mins; $3.50/entry (5pm-7am)',
        weekend: '$3.50 for 1st 2 hrs, $1.40/subsequent hr',
        hourlyAvg: 2.10
      },
      motorcycle: {
        weekday: '$1.50 per entry',
        weekend: '$1.50 per entry',
        hourlyAvg: 0.75
      },
      heavy: {
        weekday: '$3.80/hr loading dock access',
        weekend: '$4.00/hr',
        hourlyAvg: 3.80
      }
    },
    features: ['EV Superchargers (6)', 'Free 15 min Grace', 'F&B Direct Lift Access'],
    partnerPromotionId: 'promo-marina-rebate',
    rating: 4.5,
    distanceKm: 0.6,
    occupancyHistory: {
      hourlyWeekday: [15, 12, 10, 8, 12, 25, 45, 70, 82, 80, 89, 94, 91, 85, 78, 80, 85, 88, 76, 60, 45, 30, 20, 16],
      hourlyWeekend: [20, 15, 12, 10, 15, 25, 40, 60, 75, 88, 96, 99, 98, 97, 95, 96, 97, 92, 85, 74, 58, 38, 25, 18],
      peakHours: '12:30 PM - 2:00 PM & 7:00 PM - 9:00 PM',
      bestTimeToPark: '11:00 AM - 12:00 PM or 3:00 PM - 5:30 PM'
    },
    spots: [
      { id: 'Lot #MS-B101', type: 'sedan', level: 'Level B1', zone: 'North Lobby', status: 'available', distanceToLift: '10m to Marina Foyer' },
      { id: 'Lot #MS-B102', type: 'sedan', level: 'Level B1', zone: 'North Lobby', status: 'expiring', expiresAt: Date.now() + 320000, distanceToLift: '15m' },
      { id: 'Lot #MS-EV03', type: 'sedan', level: 'Level B1', zone: 'EV Hub Sector', status: 'available', distanceToLift: '20m', isEV: true },
      { id: 'Lot #MS-B208', type: 'sedan', level: 'Level B2', zone: 'South Promenade', status: 'available', distanceToLift: '6m to Dining Wing' },
      { id: 'Lot #MS-M01', type: 'motorcycle', level: 'Level B1', zone: 'Bike Bay 1', status: 'available', distanceToLift: '8m' }
    ]
  },
  {
    id: 'cp-mbs',
    name: 'Marina Bay Sands (MBS) & Bayfront Car Park',
    code: 'MBS01',
    govCode: 'C15',
    operator: 'Marina Bay Sands / LTA Feed',
    zone: 'Marina Bay / Downtown',
    region: 'Central',
    address: '10 Bayfront Ave, Singapore 018956',
    lat: 1.2834,
    lng: 103.8607,
    totalLots: { sedan: 2500, motorcycle: 190, heavy: 35 },
    availableLots: { sedan: 340, motorcycle: 65, heavy: 8 },
    expiringWithin15Min: { sedan: 45, motorcycle: 12, heavy: 4 },
    rates: {
      sedan: {
        weekday: '$8.50 for 1st hr, $1.50/subsequent 30 mins (7am-7pm); $8.50/entry (7pm-7am)',
        weekend: '$10.00 for 1st hr, $2.00/subsequent 30 mins',
        hourlyAvg: 4.50
      },
      motorcycle: {
        weekday: '$2.00 per entry',
        weekend: '$2.00 per entry',
        hourlyAvg: 1.00
      },
      heavy: {
        weekday: '$6.00/hr (Sands Expo Loading Dock)',
        weekend: '$6.00/hr',
        hourlyAvg: 6.00
      }
    },
    features: ['Valet Service Available', 'EV Superchargers (16)', 'Sands Expo Direct Link', 'Height Clearance 2.1m'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.8,
    distanceKm: 1.2,
    occupancyHistory: {
      hourlyWeekday: [18, 14, 10, 8, 12, 22, 45, 68, 80, 85, 90, 94, 92, 88, 82, 85, 91, 95, 90, 82, 68, 50, 35, 24],
      hourlyWeekend: [25, 18, 14, 10, 15, 28, 52, 75, 89, 97, 100, 100, 99, 98, 97, 98, 100, 98, 94, 88, 75, 55, 38, 28],
      peakHours: '6:30 PM - 10:00 PM (Casino, Theatre & Dining)',
      bestTimeToPark: 'Before 12:00 PM or 2:30 PM - 5:00 PM'
    },
    spots: [
      { id: 'Lot #MBS-B3A', type: 'sedan', level: 'Basement 3', zone: 'Zone Red (Hotel Tower 1)', status: 'available', distanceToLift: '5m to Hotel Lift' },
      { id: 'Lot #MBS-B3B', type: 'sedan', level: 'Basement 3', zone: 'Zone Red (Hotel Tower 1)', status: 'expiring', expiresAt: Date.now() + 200000, distanceToLift: '12m' },
      { id: 'Lot #MBS-B4EV', type: 'sedan', level: 'Basement 4', zone: 'Zone Blue (Shoppes Link)', status: 'available', distanceToLift: '18m', isEV: true },
      { id: 'Lot #MBS-M01', type: 'motorcycle', level: 'Basement 3', zone: 'Motorcycle Deck', status: 'available', distanceToLift: '10m' }
    ]
  },
  {
    id: 'cp-ion-orchard',
    name: 'ION Orchard & Orchard Turn Carpark',
    code: 'ION01',
    govCode: 'O01',
    operator: 'CapitaLand / Wilson Parking',
    zone: 'Orchard Road',
    region: 'Central',
    address: '2 Orchard Turn, Singapore 238801',
    lat: 1.3040,
    lng: 103.8318,
    totalLots: { sedan: 650, motorcycle: 70, heavy: 10 },
    availableLots: { sedan: 78, motorcycle: 19, heavy: 2 },
    expiringWithin15Min: { sedan: 16, motorcycle: 4, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$3.00 for 1st hr, $0.90/subsequent 30 mins (8am-5pm); $4.50/entry (5pm-8am)',
        weekend: '$4.20 for 1st hr, $1.20/subsequent 30 mins',
        hourlyAvg: 3.20
      },
      motorcycle: {
        weekday: '$1.80 per entry',
        weekend: '$1.80 per entry',
        hourlyAvg: 0.90
      },
      heavy: {
        weekday: '$5.50/hr rear delivery ramp',
        weekend: '$5.50/hr',
        hourlyAvg: 5.50
      }
    },
    features: ['Direct Orchard MRT link', 'EV Charging (6 bays)', 'Valet Desk B1', 'Car Spa Facility'],
    partnerPromotionId: 'promo-bugis-lunch',
    rating: 4.6,
    distanceKm: 2.1,
    occupancyHistory: {
      hourlyWeekday: [14, 10, 8, 8, 12, 25, 50, 72, 85, 88, 95, 98, 96, 90, 84, 86, 92, 96, 90, 78, 60, 42, 28, 18],
      hourlyWeekend: [20, 15, 12, 10, 14, 28, 55, 80, 95, 99, 100, 100, 100, 99, 98, 99, 100, 98, 92, 84, 68, 48, 30, 22],
      peakHours: '1:00 PM - 4:00 PM & 6:30 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:30 AM on weekends'
    },
    spots: [
      { id: 'Lot #ION-B501', type: 'sedan', level: 'Basement 5', zone: 'Zone A (Luxury Retail)', status: 'available', distanceToLift: '8m to VIP Lift' },
      { id: 'Lot #ION-B502', type: 'sedan', level: 'Basement 5', zone: 'Zone A (Luxury Retail)', status: 'expiring', expiresAt: Date.now() + 180000, distanceToLift: '14m' },
      { id: 'Lot #ION-B608', type: 'sedan', level: 'Basement 6', zone: 'Zone B (Food Hall)', status: 'available', distanceToLift: '20m' },
      { id: 'Lot #ION-M01', type: 'motorcycle', level: 'Basement 5', zone: 'Bike Bay', status: 'available', distanceToLift: '6m' }
    ]
  },
  {
    id: 'cp-takashimaya',
    name: 'Ngee Ann City / Takashimaya Shopping Centre',
    code: 'TAK02',
    govCode: 'O03',
    operator: 'Ngee Ann City Carpark / URA',
    zone: 'Orchard Road',
    region: 'Central',
    address: '391 Orchard Rd, Singapore 238873',
    lat: 1.3023,
    lng: 103.8358,
    totalLots: { sedan: 1200, motorcycle: 110, heavy: 18 },
    availableLots: { sedan: 164, motorcycle: 32, heavy: 4 },
    expiringWithin15Min: { sedan: 28, motorcycle: 7, heavy: 2 },
    rates: {
      sedan: {
        weekday: '$2.80 for 1st hr, $0.80/subsequent 30 mins; $4.00/entry (6pm-12am)',
        weekend: '$3.50 for 1st 2 hrs, $1.00/subsequent 30 mins',
        hourlyAvg: 2.80
      },
      motorcycle: {
        weekday: '$1.60 per entry',
        weekend: '$1.60 per entry',
        hourlyAvg: 0.80
      },
      heavy: {
        weekday: '$4.80/hr loading dock',
        weekend: '$4.80/hr',
        hourlyAvg: 4.80
      }
    },
    features: ['Generous 2.2m clearance', 'Accessible Lots (12)', 'Valet Parking', '10 min grace period'],
    partnerPromotionId: 'promo-bugis-lunch',
    rating: 4.5,
    distanceKm: 1.9,
    occupancyHistory: {
      hourlyWeekday: [10, 8, 6, 6, 10, 20, 45, 68, 80, 85, 92, 96, 94, 88, 82, 85, 90, 94, 88, 75, 55, 38, 22, 14],
      hourlyWeekend: [16, 12, 10, 8, 12, 24, 48, 72, 88, 96, 99, 100, 99, 98, 96, 98, 99, 96, 88, 78, 62, 42, 26, 18],
      peakHours: '1:30 PM - 4:30 PM (Shopping Peak)',
      bestTimeToPark: 'Before 12:00 PM'
    },
    spots: [
      { id: 'Lot #NAC-B201', type: 'sedan', level: 'Basement 2', zone: 'Tower A Lobby', status: 'available', distanceToLift: '12m' },
      { id: 'Lot #NAC-B202', type: 'sedan', level: 'Basement 2', zone: 'Tower A Lobby', status: 'expiring', expiresAt: Date.now() + 280000 },
      { id: 'Lot #NAC-B310', type: 'sedan', level: 'Basement 3', zone: 'Tower B Lobby', status: 'available', distanceToLift: '8m' },
      { id: 'Lot #NAC-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Bay', status: 'available', distanceToLift: '5m' }
    ]
  },
  {
    id: 'cp-plaza-singapura',
    name: 'Plaza Singapura & The Atrium (Dhoby Ghaut)',
    code: 'PLZ01',
    govCode: 'O06',
    operator: 'CapitaLand / Wilson Parking',
    zone: 'Orchard / Dhoby Ghaut',
    region: 'Central',
    address: '68 Orchard Rd, Singapore 238839',
    lat: 1.3006,
    lng: 103.8452,
    totalLots: { sedan: 820, motorcycle: 90, heavy: 12 },
    availableLots: { sedan: 112, motorcycle: 28, heavy: 3 },
    expiringWithin15Min: { sedan: 22, motorcycle: 5, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$1.95 for 1st hr, $0.65/subsequent 15 mins (8am-6pm); $3.25/entry (6pm-8am)',
        weekend: '$2.60 for 1st 2 hrs, $0.65/subsequent 15 mins',
        hourlyAvg: 2.40
      },
      motorcycle: {
        weekday: '$1.40 per entry',
        weekend: '$1.40 per entry',
        hourlyAvg: 0.70
      },
      heavy: {
        weekday: '$4.50/hr service bay',
        weekend: '$4.50/hr',
        hourlyAvg: 4.50
      }
    },
    features: ['Triple MRT Interchange Link (NS/NE/Circle Lines)', 'EV Charging (4)', 'Cinema Access'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.5,
    distanceKm: 1.5,
    occupancyHistory: {
      hourlyWeekday: [12, 10, 8, 6, 12, 25, 52, 75, 86, 88, 94, 97, 95, 89, 84, 86, 92, 95, 89, 76, 58, 40, 24, 16],
      hourlyWeekend: [18, 12, 10, 8, 14, 26, 50, 74, 90, 97, 100, 100, 99, 98, 96, 98, 99, 96, 88, 78, 60, 42, 26, 18],
      peakHours: '12:00 PM - 2:00 PM & 6:00 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:30 AM'
    },
    spots: [
      { id: 'Lot #PS-B201', type: 'sedan', level: 'Basement 2', zone: 'Zone Green', status: 'available', distanceToLift: '10m to MRT Link' },
      { id: 'Lot #PS-B202', type: 'sedan', level: 'Basement 2', zone: 'Zone Green', status: 'expiring', expiresAt: Date.now() + 150000 },
      { id: 'Lot #PS-B305', type: 'sedan', level: 'Basement 3', zone: 'Zone Blue', status: 'available', distanceToLift: '16m' },
      { id: 'Lot #PS-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Bay', status: 'available', distanceToLift: '6m' }
    ]
  },
  {
    id: 'cp-bugis-junction',
    name: 'Bugis Junction & Bugis+',
    code: 'BGJ03',
    govCode: 'C08',
    operator: 'CapitaLand / Wilson Parking',
    zone: 'Bugis / Bras Basah',
    region: 'Central',
    address: '200 Victoria St, Singapore 188021',
    lat: 1.3002,
    lng: 103.8552,
    totalLots: { sedan: 980, motorcycle: 110, heavy: 15 },
    availableLots: { sedan: 84, motorcycle: 22, heavy: 2 },
    expiringWithin15Min: { sedan: 21, motorcycle: 6, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$1.95 for 1st hr, $0.65/subsequent 15 mins (8am-6pm); $3.30/entry (6pm-8am)',
        weekend: '$2.60 for 1st 2 hrs, $0.65/subsequent 15 mins',
        hourlyAvg: 2.60
      },
      motorcycle: {
        weekday: '$1.40 per entry',
        weekend: '$1.40 per entry',
        hourlyAvg: 0.70
      },
      heavy: {
        weekday: '$5.00/hr (Rear loading service bay)',
        weekend: '$5.00/hr',
        hourlyAvg: 5.00
      }
    },
    features: ['Direct MRT Link', 'EV Fast Charge (4)', '10 min grace period'],
    partnerPromotionId: 'promo-bugis-lunch',
    rating: 4.4,
    distanceKm: 1.1,
    occupancyHistory: {
      hourlyWeekday: [18, 14, 12, 10, 16, 30, 58, 82, 90, 88, 96, 98, 97, 92, 86, 88, 94, 97, 92, 80, 62, 44, 28, 20],
      hourlyWeekend: [22, 16, 14, 12, 18, 30, 52, 75, 89, 96, 99, 100, 99, 98, 96, 98, 99, 96, 90, 82, 65, 45, 30, 22],
      peakHours: '12:00 PM - 2:30 PM & 6:00 PM - 9:30 PM',
      bestTimeToPark: 'Before 11:45 AM or after 8:30 PM'
    },
    spots: [
      { id: 'Lot #BJ-B201', type: 'sedan', level: 'Level B2', zone: 'Zone A (Cinema Lobby)', status: 'available', distanceToLift: '12m to Main Lift' },
      { id: 'Lot #BJ-B202', type: 'sedan', level: 'Level B2', zone: 'Zone A (Cinema Lobby)', status: 'expiring', expiresAt: Date.now() + 190000, distanceToLift: '16m' },
      { id: 'Lot #BJ-B305', type: 'sedan', level: 'Level B3', zone: 'Zone B (Shopping Arcade)', status: 'available', distanceToLift: '22m' },
      { id: 'Lot #BJ-M01', type: 'motorcycle', level: 'Level B2', zone: 'Bike Bay 1', status: 'expiring', expiresAt: Date.now() + 300000 }
    ]
  },
  {
    id: 'cp-chinatown-complex',
    name: 'Chinatown Complex & People\'s Park (HDB / URA)',
    code: 'CTC04',
    govCode: 'CTM1',
    operator: 'HDB / URA / Parking.sg Live',
    zone: 'Chinatown / Outram',
    region: 'Central',
    address: '28 Smith St, Singapore 058942',
    lat: 1.2824,
    lng: 103.8432,
    totalLots: { sedan: 620, motorcycle: 95, heavy: 30 },
    availableLots: { sedan: 142, motorcycle: 36, heavy: 9 },
    expiringWithin15Min: { sedan: 19, motorcycle: 5, heavy: 4 },
    rates: {
      sedan: {
        weekday: '$1.20 per 30 mins (Central Area Tier 1 7am-5pm); $0.60 per 30 mins (other hrs)',
        weekend: '$0.60 per 30 mins (all day), max $12.00/day',
        hourlyAvg: 1.80
      },
      motorcycle: {
        weekday: '$0.65 per session (7am-10:30pm); $0.65 (night)',
        weekend: '$0.65 per session',
        hourlyAvg: 0.35
      },
      heavy: {
        weekday: '$2.40 per hour (heavy coupon rate)',
        weekend: '$2.40 per hour',
        hourlyAvg: 2.40
      }
    },
    features: ['Parking.sg Native Supported', 'EPS Electronic Parking', 'Hawker Food Centre Directly Above', '10 min grace'],
    partnerPromotionId: 'promo-chinatown-fnb',
    rating: 4.7,
    distanceKm: 1.4,
    occupancyHistory: {
      hourlyWeekday: [10, 8, 6, 6, 18, 42, 68, 85, 91, 93, 98, 99, 96, 90, 84, 82, 88, 92, 85, 70, 50, 32, 20, 12],
      hourlyWeekend: [14, 10, 8, 8, 20, 48, 72, 90, 96, 98, 99, 100, 98, 95, 90, 92, 95, 96, 88, 75, 55, 36, 24, 15],
      peakHours: '8:00 AM - 10:00 AM (Morning Market) & 12:00 PM - 2:00 PM (Lunch)',
      bestTimeToPark: '2:30 PM - 5:00 PM'
    },
    spots: [
      { id: 'Lot #CT-L301', type: 'sedan', level: 'Level 3', zone: 'Sector A (Market Lift)', status: 'available', distanceToLift: '8m to Hawker Lift' },
      { id: 'Lot #CT-L302', type: 'sedan', level: 'Level 3', zone: 'Sector A (Market Lift)', status: 'expiring', expiresAt: Date.now() + 150000, distanceToLift: '14m' },
      { id: 'Lot #CT-L408', type: 'sedan', level: 'Level 4 (Rooftop Sheltered)', zone: 'Sector B', status: 'available', distanceToLift: '22m' },
      { id: 'Lot #CT-M01', type: 'motorcycle', level: 'Level 2', zone: 'Bike Bay Level 2', status: 'available', distanceToLift: '5m' },
      { id: 'Lot #CT-H01', type: 'heavy', level: 'Ground Bay', zone: 'Loading Dock', status: 'available', distanceToLift: '15m' }
    ]
  },
  {
    id: 'cp-novena-square',
    name: 'Velocity @ Novena Square & Medical Centre',
    code: 'NOV01',
    govCode: 'N01',
    operator: 'UOL / Secure Parking',
    zone: 'Novena / Thomson',
    region: 'Central',
    address: '238 Thomson Rd, Singapore 307683',
    lat: 1.3204,
    lng: 103.8438,
    totalLots: { sedan: 540, motorcycle: 60, heavy: 10 },
    availableLots: { sedan: 92, motorcycle: 24, heavy: 3 },
    expiringWithin15Min: { sedan: 14, motorcycle: 4, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$2.00 for 1st hr, $0.60/subsequent 15 mins (7am-6pm); $3.00/entry (6pm-7am)',
        weekend: '$2.50 for 1st 2 hrs, $0.60/subsequent 15 mins',
        hourlyAvg: 2.20
      },
      motorcycle: {
        weekday: '$1.40 per entry',
        weekend: '$1.40 per entry',
        hourlyAvg: 0.70
      },
      heavy: {
        weekday: '$4.00/hr delivery bay',
        weekend: '$4.00/hr',
        hourlyAvg: 4.00
      }
    },
    features: ['Direct Novena MRT Link', 'Hospital & Medical Centre Connector', 'EV Charging (4 bays)'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.4,
    distanceKm: 3.2,
    occupancyHistory: {
      hourlyWeekday: [10, 8, 6, 6, 12, 28, 65, 88, 95, 96, 97, 98, 95, 92, 88, 85, 88, 90, 82, 68, 48, 30, 18, 12],
      hourlyWeekend: [12, 10, 8, 6, 10, 20, 42, 65, 80, 90, 96, 98, 97, 94, 92, 94, 95, 90, 80, 68, 50, 32, 20, 14],
      peakHours: '9:00 AM - 12:00 PM (Hospital Clinics) & 1:00 PM - 2:30 PM',
      bestTimeToPark: 'After 3:00 PM'
    },
    spots: [
      { id: 'Lot #NOV-B201', type: 'sedan', level: 'Basement 2', zone: 'Medical Lobby', status: 'available', distanceToLift: '6m to Clinic Lift' },
      { id: 'Lot #NOV-B202', type: 'sedan', level: 'Basement 2', zone: 'Medical Lobby', status: 'expiring', expiresAt: Date.now() + 310000 },
      { id: 'Lot #NOV-B308', type: 'sedan', level: 'Basement 3', zone: 'Sports Mall Sector', status: 'available', distanceToLift: '15m' },
      { id: 'Lot #NOV-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Deck', status: 'available', distanceToLift: '8m' }
    ]
  },

  // ==========================================
  // 2. EAST / CHANGI / TAMPINES / BEDOK / PAYA LEBAR / PASIR RIS
  // ==========================================
  {
    id: 'cp-jewel-changi',
    name: 'Jewel Changi Airport & T1/T2/T3/T4 Car Parks',
    code: 'JWL01',
    govCode: 'AIR1',
    operator: 'Changi Airport Group / LTA Feed',
    zone: 'Changi Airport',
    region: 'East',
    address: '78 Airport Blvd, Singapore 819666',
    lat: 1.3602,
    lng: 103.9898,
    totalLots: { sedan: 4200, motorcycle: 350, heavy: 60 },
    availableLots: { sedan: 750, motorcycle: 120, heavy: 18 },
    expiringWithin15Min: { sedan: 65, motorcycle: 18, heavy: 4 },
    rates: {
      sedan: {
        weekday: '$0.04/min ($2.40/hr) for first 90 mins; $5.00/subsequent 30 mins at General T1-T4 ($0.04/min at Jewel B3-B5)',
        weekend: '$0.04/min ($2.40/hr) standard rate',
        hourlyAvg: 2.40
      },
      motorcycle: {
        weekday: '$1.30 per day session',
        weekend: '$1.30 per session',
        hourlyAvg: 0.65
      },
      heavy: {
        weekday: '$6.00/hr Cargo Logistics',
        weekend: '$6.00/hr',
        hourlyAvg: 6.00
      }
    },
    features: ['Instant Terminal Skytrain link', 'EV Fast Charging (20 bays)', 'Valet Drop-off', 'Automated Plate Recognition (EPS)'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.9,
    distanceKm: 18.5,
    occupancyHistory: {
      hourlyWeekday: [20, 18, 16, 14, 18, 25, 45, 60, 72, 78, 85, 90, 88, 86, 84, 88, 92, 95, 91, 85, 75, 60, 42, 28],
      hourlyWeekend: [24, 20, 18, 15, 18, 28, 52, 75, 90, 96, 99, 100, 99, 98, 97, 98, 100, 98, 92, 85, 74, 58, 40, 28],
      peakHours: '1:00 PM - 5:00 PM (Jewel Visitors) & 7:00 PM - 10:00 PM (Flight Arrivals)',
      bestTimeToPark: 'Morning before 11:30 AM'
    },
    spots: [
      { id: 'Lot #JWL-B3A', type: 'sedan', level: 'Basement 3', zone: 'Zone A (Rain Vortex Lift)', status: 'available', distanceToLift: '8m to Centre Vortex' },
      { id: 'Lot #JWL-B3B', type: 'sedan', level: 'Basement 3', zone: 'Zone A (Rain Vortex Lift)', status: 'expiring', expiresAt: Date.now() + 180000, distanceToLift: '14m' },
      { id: 'Lot #JWL-B4EV', type: 'sedan', level: 'Basement 4', zone: 'Zone B (EV Island)', status: 'available', distanceToLift: '18m', isEV: true },
      { id: 'Lot #JWL-B5C', type: 'sedan', level: 'Basement 5', zone: 'Zone C (T1 Departure Link)', status: 'available', distanceToLift: '12m' },
      { id: 'Lot #JWL-M01', type: 'motorcycle', level: 'Basement 3', zone: 'Motorcycle Sector', status: 'available', distanceToLift: '10m' }
    ]
  },
  {
    id: 'cp-tampines-mall',
    name: 'Tampines Mall & Century Square (Tampines Central)',
    code: 'TPM01',
    govCode: 'TM1',
    operator: 'CapitaLand / Wilson Parking',
    zone: 'Tampines Central',
    region: 'East',
    address: '4 Tampines Central 5, Singapore 529510',
    lat: 1.3532,
    lng: 103.9452,
    totalLots: { sedan: 1100, motorcycle: 140, heavy: 18 },
    availableLots: { sedan: 175, motorcycle: 48, heavy: 5 },
    expiringWithin15Min: { sedan: 26, motorcycle: 9, heavy: 2 },
    rates: {
      sedan: {
        weekday: '$1.40 for 1st hr, $0.70/subsequent 30 mins (8am-6pm); $2.80/entry (6pm-8am)',
        weekend: '$2.80 for 1st 2 hrs, $1.40/subsequent hr',
        hourlyAvg: 1.80
      },
      motorcycle: {
        weekday: '$1.30 per entry',
        weekend: '$1.30 per entry',
        hourlyAvg: 0.65
      },
      heavy: {
        weekday: '$3.50/hr delivery loading dock',
        weekend: '$3.50/hr',
        hourlyAvg: 3.50
      }
    },
    features: ['Direct Tampines MRT (DT/EW) Link', 'EV Charging (6 bays)', 'Free 15 min grace period'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.6,
    distanceKm: 14.1,
    occupancyHistory: {
      hourlyWeekday: [12, 10, 8, 6, 12, 28, 55, 78, 86, 84, 92, 96, 94, 88, 82, 85, 91, 95, 88, 76, 58, 40, 24, 16],
      hourlyWeekend: [18, 12, 10, 8, 14, 28, 52, 76, 90, 98, 100, 100, 99, 98, 96, 98, 100, 96, 89, 79, 62, 44, 28, 18],
      peakHours: '12:00 PM - 2:30 PM & 6:00 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:30 AM or 3:00 PM - 5:00 PM'
    },
    spots: [
      { id: 'Lot #TM-B101', type: 'sedan', level: 'Basement 1', zone: 'Zone A (MRT Link)', status: 'available', distanceToLift: '8m to Mall Atrium' },
      { id: 'Lot #TM-B102', type: 'sedan', level: 'Basement 1', zone: 'Zone A (MRT Link)', status: 'expiring', expiresAt: Date.now() + 240000, distanceToLift: '14m' },
      { id: 'Lot #TM-B208', type: 'sedan', level: 'Basement 2', zone: 'Zone B (Supermarket)', status: 'available', distanceToLift: '12m' },
      { id: 'Lot #TM-M01', type: 'motorcycle', level: 'Basement 1', zone: 'Bike Bay', status: 'available', distanceToLift: '5m' }
    ]
  },
  {
    id: 'cp-bedok-mall',
    name: 'Bedok Mall & Integrated Transport Hub (HDB / CapitaLand)',
    code: 'BDK01',
    govCode: 'BM1',
    operator: 'CapitaLand / HDB Feed',
    zone: 'Bedok Central',
    region: 'East',
    address: '311 New Upper Changi Rd, Singapore 467360',
    lat: 1.3240,
    lng: 103.9298,
    totalLots: { sedan: 920, motorcycle: 120, heavy: 16 },
    availableLots: { sedan: 148, motorcycle: 38, heavy: 4 },
    expiringWithin15Min: { sedan: 20, motorcycle: 7, heavy: 2 },
    rates: {
      sedan: {
        weekday: '$1.40 for 1st hr, $0.70/subsequent 30 mins (8am-6pm); $2.60/entry (6pm-8am)',
        weekend: '$2.60 for 1st 2 hrs, $1.30/subsequent hr',
        hourlyAvg: 1.70
      },
      motorcycle: {
        weekday: '$1.20 per entry',
        weekend: '$1.20 per entry',
        hourlyAvg: 0.60
      },
      heavy: {
        weekday: '$3.50/hr rear bay',
        weekend: '$3.50/hr',
        hourlyAvg: 3.50
      }
    },
    features: ['Direct Bedok MRT & Bus Interchange sheltered connection', 'EV Charging (4 bays)', '10 min grace'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.5,
    distanceKm: 11.2,
    occupancyHistory: {
      hourlyWeekday: [14, 10, 8, 6, 14, 30, 60, 82, 88, 86, 94, 97, 95, 90, 85, 87, 93, 96, 90, 78, 60, 42, 26, 18],
      hourlyWeekend: [18, 12, 10, 8, 15, 30, 55, 78, 92, 98, 100, 100, 99, 98, 97, 98, 99, 96, 88, 78, 60, 42, 28, 18],
      peakHours: '12:00 PM - 2:00 PM & 6:30 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:30 AM'
    },
    spots: [
      { id: 'Lot #BM-B201', type: 'sedan', level: 'Basement 2', zone: 'Zone A (MRT Escalator)', status: 'available', distanceToLift: '10m' },
      { id: 'Lot #BM-B202', type: 'sedan', level: 'Basement 2', zone: 'Zone A (MRT Escalator)', status: 'expiring', expiresAt: Date.now() + 290000 },
      { id: 'Lot #BM-B304', type: 'sedan', level: 'Basement 3', zone: 'Zone B (Town Square Link)', status: 'available', distanceToLift: '18m' },
      { id: 'Lot #BM-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Bay', status: 'available', distanceToLift: '6m' }
    ]
  },
  {
    id: 'cp-plq-mall',
    name: 'PLQ Mall (Paya Lebar Quarter & SingPost Centre)',
    code: 'PLQ01',
    govCode: 'PL1',
    operator: 'Lendlease / Wilson Parking',
    zone: 'Paya Lebar / Geylang',
    region: 'East',
    address: '10 Paya Lebar Rd, Singapore 409057',
    lat: 1.3178,
    lng: 103.8924,
    totalLots: { sedan: 1050, motorcycle: 110, heavy: 20 },
    availableLots: { sedan: 198, motorcycle: 42, heavy: 6 },
    expiringWithin15Min: { sedan: 28, motorcycle: 8, heavy: 2 },
    rates: {
      sedan: {
        weekday: '$1.80 for 1st hr, $0.60/subsequent 15 mins (6am-6pm); $3.00/entry (6pm-6am)',
        weekend: '$2.50 for 1st 2 hrs, $0.60/subsequent 15 mins',
        hourlyAvg: 2.20
      },
      motorcycle: {
        weekday: '$1.40 per entry',
        weekend: '$1.40 per entry',
        hourlyAvg: 0.70
      },
      heavy: {
        weekday: '$4.00/hr loading dock',
        weekend: '$4.00/hr',
        hourlyAvg: 4.00
      }
    },
    features: ['Direct Paya Lebar MRT (EW/Circle lines)', 'EV Ultra Fast 50kW (8 bays)', 'Grade-A Office Link'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.7,
    distanceKm: 6.8,
    occupancyHistory: {
      hourlyWeekday: [10, 8, 6, 6, 12, 26, 58, 85, 92, 90, 96, 98, 96, 90, 85, 87, 92, 95, 88, 75, 55, 38, 22, 14],
      hourlyWeekend: [16, 12, 10, 8, 14, 28, 50, 75, 90, 97, 99, 100, 99, 98, 96, 98, 99, 95, 88, 78, 60, 40, 25, 16],
      peakHours: '12:00 PM - 2:00 PM & 6:30 PM - 8:30 PM',
      bestTimeToPark: 'Before 11:45 AM or after 2:30 PM'
    },
    spots: [
      { id: 'Lot #PLQ-B201', type: 'sedan', level: 'Basement 2', zone: 'Zone A (Plaza Link)', status: 'available', distanceToLift: '8m' },
      { id: 'Lot #PLQ-B202', type: 'sedan', level: 'Basement 2', zone: 'Zone A (Plaza Link)', status: 'expiring', expiresAt: Date.now() + 210000 },
      { id: 'Lot #PLQ-B306', type: 'sedan', level: 'Basement 3', zone: 'Zone B (Cinema Lobby)', status: 'available', distanceToLift: '14m' },
      { id: 'Lot #PLQ-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Bay', status: 'available', distanceToLift: '5m' }
    ]
  },

  // ==========================================
  // 3. WEST / JURONG / CLEMENTI / BUKIT BATOK / BOON LAY / BUONA VISTA
  // ==========================================
  {
    id: 'cp-jurong-point',
    name: 'Jurong Point Shopping Centre & Boon Lay Interchange',
    code: 'JPT06',
    govCode: 'JP1',
    operator: 'CBM Parking / LTA Feed',
    zone: 'Jurong West / Boon Lay',
    region: 'West',
    address: '1 Jurong West Central 2, Singapore 648886',
    lat: 1.3402,
    lng: 103.7063,
    totalLots: { sedan: 1250, motorcycle: 160, heavy: 25 },
    availableLots: { sedan: 188, motorcycle: 55, heavy: 5 },
    expiringWithin15Min: { sedan: 24, motorcycle: 9, heavy: 2 },
    rates: {
      sedan: {
        weekday: '$1.30 for 1st hr, $0.65/subsequent 30 mins (7am-5pm); $2.50/entry (5pm-7am)',
        weekend: '$2.80 for 1st 2 hrs, $1.30/subsequent hr',
        hourlyAvg: 1.85
      },
      motorcycle: {
        weekday: '$1.30 per entry',
        weekend: '$1.30 per entry',
        hourlyAvg: 0.65
      },
      heavy: {
        weekday: '$3.50/hr loading dock',
        weekend: '$3.50/hr',
        hourlyAvg: 3.50
      }
    },
    features: ['Direct Boon Lay Bus Interchange & MRT', 'EV Charging (8 bays)', 'Valet Available'],
    partnerPromotionId: 'promo-jurong-spend',
    rating: 4.5,
    distanceKm: 12.8,
    occupancyHistory: {
      hourlyWeekday: [10, 8, 6, 6, 12, 28, 55, 76, 84, 82, 91, 95, 92, 86, 80, 82, 88, 93, 86, 72, 54, 38, 22, 14],
      hourlyWeekend: [15, 10, 8, 8, 14, 25, 48, 70, 85, 94, 98, 100, 99, 98, 95, 97, 99, 95, 88, 78, 60, 40, 25, 18],
      peakHours: '12:00 PM - 2:00 PM & 6:30 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:30 AM or 3:00 PM - 5:00 PM'
    },
    spots: [
      { id: 'Lot #JP-B101', type: 'sedan', level: 'Basement 1', zone: 'Zone JP1 (Boon Lay MRT)', status: 'available', distanceToLift: '14m' },
      { id: 'Lot #JP-B102', type: 'sedan', level: 'Basement 1', zone: 'Zone JP1 (Boon Lay MRT)', status: 'expiring', expiresAt: Date.now() + 210000 },
      { id: 'Lot #JP-B205', type: 'sedan', level: 'Basement 2', zone: 'Zone JP2 (Food Hall)', status: 'available', distanceToLift: '10m' },
      { id: 'Lot #JP-M01', type: 'motorcycle', level: 'Basement 1', zone: 'Bike Bay Level B1', status: 'available', distanceToLift: '6m' }
    ]
  },
  {
    id: 'cp-westgate-jem',
    name: 'Westgate & JEM Mega Carpark (Jurong Gateway)',
    code: 'JEM01',
    govCode: 'JEM',
    operator: 'CapitaLand / Lendlease / LTA Feed',
    zone: 'Jurong East Central',
    region: 'West',
    address: '3 Gateway Dr, Singapore 608532',
    lat: 1.3338,
    lng: 103.7432,
    totalLots: { sedan: 1580, motorcycle: 180, heavy: 28 },
    availableLots: { sedan: 245, motorcycle: 62, heavy: 6 },
    expiringWithin15Min: { sedan: 32, motorcycle: 10, heavy: 2 },
    rates: {
      sedan: {
        weekday: '$1.50 for 1st hr, $0.60/subsequent 15 mins (6am-6pm); $3.00/entry (6pm-6am)',
        weekend: '$2.80 for 1st 2 hrs, $0.60/subsequent 15 mins',
        hourlyAvg: 2.10
      },
      motorcycle: {
        weekday: '$1.40 per entry',
        weekend: '$1.40 per entry',
        hourlyAvg: 0.70
      },
      heavy: {
        weekday: '$4.00/hr dedicated loading dock',
        weekend: '$4.00/hr',
        hourlyAvg: 4.00
      }
    },
    features: ['Jurong East MRT Interchange direct sheltered bridge', 'EV Superchargers (10)', 'Hospital Connection to Ng Teng Fong'],
    partnerPromotionId: 'promo-jurong-spend',
    rating: 4.7,
    distanceKm: 10.5,
    occupancyHistory: {
      hourlyWeekday: [12, 10, 8, 6, 12, 28, 62, 85, 92, 90, 96, 98, 95, 90, 85, 87, 93, 96, 89, 78, 58, 40, 24, 16],
      hourlyWeekend: [18, 12, 10, 8, 15, 28, 55, 78, 92, 98, 100, 100, 99, 98, 97, 98, 100, 96, 88, 78, 60, 42, 26, 18],
      peakHours: '12:00 PM - 2:00 PM & 6:00 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:45 AM'
    },
    spots: [
      { id: 'Lot #WG-B201', type: 'sedan', level: 'Basement 2', zone: 'Westgate Lobby A', status: 'available', distanceToLift: '8m to Mall Atrium' },
      { id: 'Lot #WG-B202', type: 'sedan', level: 'Basement 2', zone: 'Westgate Lobby A', status: 'expiring', expiresAt: Date.now() + 190000 },
      { id: 'Lot #JEM-B310', type: 'sedan', level: 'Basement 3', zone: 'JEM Connection Zone', status: 'available', distanceToLift: '16m' },
      { id: 'Lot #WG-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Motorcycle Bay', status: 'available', distanceToLift: '6m' }
    ]
  },
  {
    id: 'cp-clementi-mall',
    name: 'The Clementi Mall & Town Centre (HDB MSCP)',
    code: 'CLM01',
    govCode: 'CLM',
    operator: 'HDB / SPH Carpark',
    zone: 'Clementi Central',
    region: 'West',
    address: '3155 Commonwealth Ave W, Singapore 129588',
    lat: 1.3152,
    lng: 103.7652,
    totalLots: { sedan: 650, motorcycle: 90, heavy: 15 },
    availableLots: { sedan: 98, motorcycle: 29, heavy: 4 },
    expiringWithin15Min: { sedan: 15, motorcycle: 5, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$0.60 per 30 mins (7am-10:30pm); Night max $5.00',
        weekend: '$0.60 per 30 mins',
        hourlyAvg: 1.20
      },
      motorcycle: {
        weekday: '$0.65 per session',
        weekend: '$0.65 per session',
        hourlyAvg: 0.30
      },
      heavy: {
        weekday: '$2.00 per hour',
        weekend: '$2.00 per hour',
        hourlyAvg: 2.00
      }
    },
    features: ['Lowest HDB Standard Rates ($0.60/30m)', 'Direct Clementi MRT access', 'Hawker & Polyclinic Bridge'],
    partnerPromotionId: 'promo-jurong-spend',
    rating: 4.5,
    distanceKm: 8.4,
    occupancyHistory: {
      hourlyWeekday: [18, 14, 10, 8, 16, 35, 68, 88, 95, 94, 98, 99, 96, 92, 88, 89, 94, 96, 90, 78, 60, 44, 28, 20],
      hourlyWeekend: [22, 16, 12, 10, 18, 32, 58, 80, 94, 98, 100, 100, 99, 98, 97, 98, 99, 96, 88, 78, 62, 45, 30, 22],
      peakHours: '8:30 AM - 10:30 AM & 12:00 PM - 2:00 PM',
      bestTimeToPark: 'After 2:30 PM'
    },
    spots: [
      { id: 'Lot #CL-L301', type: 'sedan', level: 'Deck 3', zone: 'Zone A (MRT Link)', status: 'available', distanceToLift: '8m' },
      { id: 'Lot #CL-L302', type: 'sedan', level: 'Deck 3', zone: 'Zone A (MRT Link)', status: 'expiring', expiresAt: Date.now() + 270000 },
      { id: 'Lot #CL-L405', type: 'sedan', level: 'Deck 4', zone: 'Zone B (Market Side)', status: 'available', distanceToLift: '15m' },
      { id: 'Lot #CL-M01', type: 'motorcycle', level: 'Deck 2', zone: 'Bike Bay', status: 'available', distanceToLift: '5m' }
    ]
  },
  {
    id: 'cp-imm-building',
    name: 'IMM Building (Outlet Mall & Heavy Delivery Bay)',
    code: 'IMM01',
    govCode: 'IMM',
    operator: 'CapitaLand / Wilson Parking',
    zone: 'Jurong East / Toh Guan',
    region: 'West',
    address: '2 Jurong East St 21, Singapore 609601',
    lat: 1.3349,
    lng: 103.7468,
    totalLots: { sedan: 1350, motorcycle: 180, heavy: 120 },
    availableLots: { sedan: 210, motorcycle: 58, heavy: 38 },
    expiringWithin15Min: { sedan: 28, motorcycle: 11, heavy: 8 },
    rates: {
      sedan: {
        weekday: '1st hour FREE on weekdays (excluding PH); $0.60/subsequent 15 mins (7am-6pm); $2.60/entry (6pm-7am)',
        weekend: '$2.60 for 1st 2 hrs, $0.60/subsequent 15 mins',
        hourlyAvg: 1.50
      },
      motorcycle: {
        weekday: '$1.20 per entry',
        weekend: '$1.20 per entry',
        hourlyAvg: 0.60
      },
      heavy: {
        weekday: '$3.00/hr (Large fleet logistic docks, high ceiling 4.5m)',
        weekend: '$3.00/hr',
        hourlyAvg: 3.00
      }
    },
    features: ['1st Hour Free Parking Weekday', 'Largest Warehouse / Outlet Mall in West', 'Heavy Logistics & Container Bays'],
    partnerPromotionId: 'promo-jurong-spend',
    rating: 4.7,
    distanceKm: 10.8,
    occupancyHistory: {
      hourlyWeekday: [10, 8, 6, 6, 15, 32, 58, 78, 85, 88, 94, 96, 93, 88, 82, 85, 90, 93, 85, 72, 52, 35, 20, 12],
      hourlyWeekend: [16, 12, 10, 8, 14, 28, 52, 76, 92, 98, 100, 100, 99, 98, 97, 98, 100, 95, 88, 78, 58, 38, 24, 16],
      peakHours: '12:00 PM - 2:30 PM & 6:00 PM - 8:30 PM',
      bestTimeToPark: 'Weekday mornings'
    },
    spots: [
      { id: 'Lot #IMM-L301', type: 'sedan', level: 'Level 3 Carpark', zone: 'Zone A (Outlet Wing)', status: 'available', distanceToLift: '10m' },
      { id: 'Lot #IMM-L302', type: 'sedan', level: 'Level 3 Carpark', zone: 'Zone A (Outlet Wing)', status: 'expiring', expiresAt: Date.now() + 160000 },
      { id: 'Lot #IMM-L408', type: 'sedan', level: 'Level 4 Carpark', zone: 'Zone B', status: 'available', distanceToLift: '20m' },
      { id: 'Lot #IMM-HV01', type: 'heavy', level: 'Ground Logistic Dock', zone: 'Heavy Zone 1', status: 'available', distanceToLift: 'Dock 4' },
      { id: 'Lot #IMM-HV02', type: 'heavy', level: 'Ground Logistic Dock', zone: 'Heavy Zone 1', status: 'expiring', expiresAt: Date.now() + 450000 }
    ]
  },

  // ==========================================
  // 4. NORTH / WOODLANDS / YISHUN / SEMBAWANG / ANG MO KIO
  // ==========================================
  {
    id: 'cp-woodlands-heavy',
    name: 'Woodlands Heavy Vehicle & Logistic Carpark',
    code: 'WLD05',
    govCode: 'WLD1',
    operator: 'URA / LTA Heavy Vehicle Parking',
    zone: 'Woodlands / Industrial North',
    region: 'North',
    address: 'Woodlands Industrial Park E5, Singapore 757731',
    lat: 1.4518,
    lng: 103.7915,
    totalLots: { sedan: 80, motorcycle: 40, heavy: 340 },
    availableLots: { sedan: 45, motorcycle: 28, heavy: 118 },
    expiringWithin15Min: { sedan: 4, motorcycle: 2, heavy: 18 },
    rates: {
      sedan: {
        weekday: '$0.60 per 30 mins (Non-central area)',
        weekend: '$0.60 per 30 mins',
        hourlyAvg: 1.20
      },
      motorcycle: {
        weekday: '$0.65 per session',
        weekend: '$0.65 per session',
        hourlyAvg: 0.30
      },
      heavy: {
        weekday: '$2.00 per hour (Season parking $120/mo supported)',
        weekend: '$2.00 per hour',
        hourlyAvg: 2.00
      }
    },
    features: ['Prime Heavy Lorry / Trailer Bays (14m length)', '24/7 Security CCTV', 'Wash Bay & Driver Rest Area', 'High Clearance > 4.5m'],
    partnerPromotionId: 'promo-industrial-fuel',
    rating: 4.8,
    distanceKm: 14.2,
    occupancyHistory: {
      hourlyWeekday: [75, 78, 80, 82, 70, 50, 42, 38, 45, 52, 58, 62, 60, 55, 50, 52, 65, 78, 85, 88, 86, 82, 78, 76],
      hourlyWeekend: [85, 86, 88, 88, 82, 75, 68, 62, 60, 60, 62, 65, 64, 62, 60, 62, 70, 80, 88, 90, 89, 88, 86, 85],
      peakHours: '7:00 PM - 7:00 AM (Overnight heavy fleet returns)',
      bestTimeToPark: '10:00 AM - 4:00 PM'
    },
    spots: [
      { id: 'Lot #WH-01', type: 'heavy', level: 'Ground Zone A', zone: 'Trailer Bay 1-10', status: 'available', distanceToLift: 'Gate 1 Office' },
      { id: 'Lot #WH-02', type: 'heavy', level: 'Ground Zone A', zone: 'Trailer Bay 1-10', status: 'expiring', expiresAt: Date.now() + 480000, distanceToLift: 'Gate 1 Office' },
      { id: 'Lot #WH-03', type: 'heavy', level: 'Ground Zone B', zone: 'Lorry Bay 11-30', status: 'available', distanceToLift: 'Gate 2 Washbay' },
      { id: 'Lot #WS-01', type: 'sedan', level: 'Staff Bay', zone: 'Security Post', status: 'available', distanceToLift: '5m' }
    ]
  },
  {
    id: 'cp-northpoint-city',
    name: 'Northpoint City (Yishun Central Integrated Hub)',
    code: 'NPC01',
    govCode: 'NPC',
    operator: 'Frasers Property / LTA Feed',
    zone: 'Yishun Central',
    region: 'North',
    address: '930 Yishun Ave 2, Singapore 769098',
    lat: 1.4294,
    lng: 103.8354,
    totalLots: { sedan: 1280, motorcycle: 150, heavy: 18 },
    availableLots: { sedan: 210, motorcycle: 52, heavy: 4 },
    expiringWithin15Min: { sedan: 30, motorcycle: 9, heavy: 2 },
    rates: {
      sedan: {
        weekday: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm); $2.60/entry (5pm-7am)',
        weekend: '$2.60 for 1st 2 hrs, $1.30/subsequent hr',
        hourlyAvg: 1.80
      },
      motorcycle: {
        weekday: '$1.20 per entry',
        weekend: '$1.20 per entry',
        hourlyAvg: 0.60
      },
      heavy: {
        weekday: '$3.50/hr delivery bay',
        weekend: '$3.50/hr',
        hourlyAvg: 3.50
      }
    },
    features: ['Direct Yishun MRT & Air-conditioned Bus Interchange', 'EV Fast Charging (8 bays)', 'North Wing & South Wing Dual Carpark'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.6,
    distanceKm: 12.8,
    occupancyHistory: {
      hourlyWeekday: [12, 10, 8, 6, 12, 28, 56, 78, 86, 85, 92, 96, 94, 88, 84, 86, 92, 95, 88, 76, 58, 40, 24, 16],
      hourlyWeekend: [18, 12, 10, 8, 15, 28, 52, 76, 90, 97, 100, 100, 99, 98, 96, 98, 100, 96, 88, 78, 60, 42, 26, 18],
      peakHours: '12:00 PM - 2:00 PM & 6:30 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:30 AM'
    },
    spots: [
      { id: 'Lot #NPC-B201', type: 'sedan', level: 'Basement 2', zone: 'North Wing (Cinema)', status: 'available', distanceToLift: '8m' },
      { id: 'Lot #NPC-B202', type: 'sedan', level: 'Basement 2', zone: 'North Wing (Cinema)', status: 'expiring', expiresAt: Date.now() + 250000 },
      { id: 'Lot #NPC-B310', type: 'sedan', level: 'Basement 3', zone: 'South Wing (Food Court)', status: 'available', distanceToLift: '14m' },
      { id: 'Lot #NPC-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Bay', status: 'available', distanceToLift: '6m' }
    ]
  },
  {
    id: 'cp-causeway-point',
    name: 'Causeway Point & Woods Square (Woodlands MRT)',
    code: 'CWP01',
    govCode: 'CWP',
    operator: 'Frasers Property / Wilson Parking',
    zone: 'Woodlands Central',
    region: 'North',
    address: '1 Woodlands Square, Singapore 738099',
    lat: 1.4362,
    lng: 103.7865,
    totalLots: { sedan: 980, motorcycle: 120, heavy: 16 },
    availableLots: { sedan: 162, motorcycle: 44, heavy: 4 },
    expiringWithin15Min: { sedan: 25, motorcycle: 8, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm); $2.60/entry (5pm-7am)',
        weekend: '$2.60 for 1st 2 hrs, $1.30/subsequent hr',
        hourlyAvg: 1.80
      },
      motorcycle: {
        weekday: '$1.30 per entry',
        weekend: '$1.30 per entry',
        hourlyAvg: 0.65
      },
      heavy: {
        weekday: '$3.80/hr loading dock',
        weekend: '$3.80/hr',
        hourlyAvg: 3.80
      }
    },
    features: ['Direct Woodlands MRT (NS/Thomson-East Coast lines)', 'Customs & Checkpoint proximity', 'EV Charging (6 bays)'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.6,
    distanceKm: 13.9,
    occupancyHistory: {
      hourlyWeekday: [14, 10, 8, 6, 14, 30, 58, 80, 88, 86, 94, 97, 95, 90, 85, 87, 93, 96, 90, 78, 60, 42, 26, 18],
      hourlyWeekend: [20, 14, 10, 8, 16, 30, 55, 78, 92, 98, 100, 100, 99, 98, 97, 98, 99, 96, 88, 78, 60, 42, 28, 18],
      peakHours: '12:00 PM - 2:00 PM & 6:00 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:30 AM'
    },
    spots: [
      { id: 'Lot #CWP-B201', type: 'sedan', level: 'Basement 2', zone: 'Zone A (MRT Link)', status: 'available', distanceToLift: '6m' },
      { id: 'Lot #CWP-B202', type: 'sedan', level: 'Basement 2', zone: 'Zone A (MRT Link)', status: 'expiring', expiresAt: Date.now() + 200000 },
      { id: 'Lot #CWP-B305', type: 'sedan', level: 'Basement 3', zone: 'Zone B (Woods Square)', status: 'available', distanceToLift: '16m' },
      { id: 'Lot #CWP-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Bay', status: 'available', distanceToLift: '5m' }
    ]
  },
  {
    id: 'cp-amk-hub',
    name: 'AMK Hub & Ang Mo Kio Central (HDB MSCP)',
    code: 'AMK01',
    govCode: 'AMK',
    operator: 'Mercatus / HDB Parking',
    zone: 'Ang Mo Kio Central',
    region: 'North',
    address: '53 Ang Mo Kio Ave 3, Singapore 569933',
    lat: 1.3694,
    lng: 103.8485,
    totalLots: { sedan: 850, motorcycle: 110, heavy: 15 },
    availableLots: { sedan: 135, motorcycle: 34, heavy: 3 },
    expiringWithin15Min: { sedan: 22, motorcycle: 6, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm); $2.60/entry (5pm-7am)',
        weekend: '$2.60 for 1st 2 hrs, $1.30/subsequent hr',
        hourlyAvg: 1.70
      },
      motorcycle: {
        weekday: '$1.20 per entry',
        weekend: '$1.20 per entry',
        hourlyAvg: 0.60
      },
      heavy: {
        weekday: '$3.50/hr',
        weekend: '$3.50/hr',
        hourlyAvg: 3.50
      }
    },
    features: ['Direct AMK MRT & Bus Interchange connection', 'EV Charging (4 bays)', 'Supermarket & Cinema link'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.5,
    distanceKm: 7.2,
    occupancyHistory: {
      hourlyWeekday: [12, 10, 8, 6, 14, 32, 62, 85, 92, 90, 96, 98, 95, 90, 85, 88, 94, 96, 89, 76, 58, 38, 24, 16],
      hourlyWeekend: [18, 12, 10, 8, 15, 30, 56, 78, 92, 98, 100, 100, 99, 98, 96, 98, 99, 95, 88, 76, 58, 40, 26, 18],
      peakHours: '11:30 AM - 2:00 PM & 6:00 PM - 8:30 PM',
      bestTimeToPark: 'Before 11:00 AM or after 2:30 PM'
    },
    spots: [
      { id: 'Lot #AMK-B201', type: 'sedan', level: 'Basement 2', zone: 'Zone A (Interchange Link)', status: 'available', distanceToLift: '8m' },
      { id: 'Lot #AMK-B202', type: 'sedan', level: 'Basement 2', zone: 'Zone A (Interchange Link)', status: 'expiring', expiresAt: Date.now() + 180000 },
      { id: 'Lot #AMK-B304', type: 'sedan', level: 'Basement 3', zone: 'Zone B', status: 'available', distanceToLift: '14m' },
      { id: 'Lot #AMK-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Bay', status: 'available', distanceToLift: '5m' }
    ]
  },

  // ==========================================
  // 5. NORTH-EAST / SENGKANG / PUNGGOL / HOUGANG / SERANGOON
  // ==========================================
  {
    id: 'cp-nex-serangoon',
    name: 'NEX Shopping Mall (Serangoon Central Interchange)',
    code: 'NEX01',
    govCode: 'NEX',
    operator: 'Frasers Property / Wilson Parking',
    zone: 'Serangoon Central',
    region: 'North-East',
    address: '23 Serangoon Central, Singapore 556083',
    lat: 1.3506,
    lng: 103.8728,
    totalLots: { sedan: 1200, motorcycle: 130, heavy: 16 },
    availableLots: { sedan: 154, motorcycle: 36, heavy: 3 },
    expiringWithin15Min: { sedan: 25, motorcycle: 7, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm); $2.60/entry (5pm-7am)',
        weekend: '$2.80 for 1st 2 hrs, $1.40/subsequent hr',
        hourlyAvg: 1.85
      },
      motorcycle: {
        weekday: '$1.30 per entry',
        weekend: '$1.30 per entry',
        hourlyAvg: 0.65
      },
      heavy: {
        weekday: '$3.80/hr loading bay',
        weekend: '$3.80/hr',
        hourlyAvg: 3.80
      }
    },
    features: ['Direct Serangoon MRT (NE/Circle lines) & Bus Interchange', 'EV Charging (6 bays)', 'Rooftop Dog Park & Cinema link'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.6,
    distanceKm: 6.2,
    occupancyHistory: {
      hourlyWeekday: [14, 10, 8, 6, 14, 30, 60, 82, 90, 88, 95, 98, 96, 90, 86, 88, 94, 97, 91, 79, 60, 42, 26, 18],
      hourlyWeekend: [20, 14, 10, 8, 16, 30, 56, 80, 94, 99, 100, 100, 99, 98, 97, 98, 100, 96, 89, 79, 62, 44, 28, 18],
      peakHours: '12:00 PM - 2:30 PM & 6:00 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:30 AM'
    },
    spots: [
      { id: 'Lot #NEX-B201', type: 'sedan', level: 'Basement 2', zone: 'Zone A (MRT Link)', status: 'available', distanceToLift: '8m' },
      { id: 'Lot #NEX-B202', type: 'sedan', level: 'Basement 2', zone: 'Zone A (MRT Link)', status: 'expiring', expiresAt: Date.now() + 230000 },
      { id: 'Lot #NEX-B306', type: 'sedan', level: 'Basement 3', zone: 'Zone B (Supermarket)', status: 'available', distanceToLift: '15m' },
      { id: 'Lot #NEX-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Bay', status: 'available', distanceToLift: '6m' }
    ]
  },
  {
    id: 'cp-waterway-point',
    name: 'Waterway Point (Punggol Central)',
    code: 'WWP01',
    govCode: 'WWP',
    operator: 'Frasers Property / Wilson Parking',
    zone: 'Punggol Central',
    region: 'North-East',
    address: '83 Punggol Central, Singapore 828761',
    lat: 1.4068,
    lng: 103.9022,
    totalLots: { sedan: 1150, motorcycle: 125, heavy: 14 },
    availableLots: { sedan: 182, motorcycle: 40, heavy: 4 },
    expiringWithin15Min: { sedan: 24, motorcycle: 8, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm); $2.60/entry (5pm-7am)',
        weekend: '$2.60 for 1st 2 hrs, $1.30/subsequent hr',
        hourlyAvg: 1.75
      },
      motorcycle: {
        weekday: '$1.20 per entry',
        weekend: '$1.20 per entry',
        hourlyAvg: 0.60
      },
      heavy: {
        weekday: '$3.50/hr delivery dock',
        weekend: '$3.50/hr',
        hourlyAvg: 3.50
      }
    },
    features: ['Direct Punggol MRT & LRT link', 'Waterway Boardwalk Promenade Access', 'EV Charging (6 bays)'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.7,
    distanceKm: 13.5,
    occupancyHistory: {
      hourlyWeekday: [12, 10, 8, 6, 12, 28, 55, 78, 86, 85, 92, 96, 94, 88, 84, 86, 92, 95, 88, 76, 58, 40, 24, 16],
      hourlyWeekend: [18, 12, 10, 8, 15, 28, 52, 76, 90, 97, 100, 100, 99, 98, 96, 98, 100, 96, 88, 78, 60, 42, 26, 18],
      peakHours: '12:00 PM - 2:00 PM & 6:30 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:30 AM'
    },
    spots: [
      { id: 'Lot #WWP-B101', type: 'sedan', level: 'Basement 1', zone: 'West Wing (MRT)', status: 'available', distanceToLift: '10m' },
      { id: 'Lot #WWP-B102', type: 'sedan', level: 'Basement 1', zone: 'West Wing (MRT)', status: 'expiring', expiresAt: Date.now() + 280000 },
      { id: 'Lot #WWP-B208', type: 'sedan', level: 'Basement 2', zone: 'East Wing (Promenade)', status: 'available', distanceToLift: '16m' },
      { id: 'Lot #WWP-M01', type: 'motorcycle', level: 'Basement 1', zone: 'Bike Bay', status: 'available', distanceToLift: '5m' }
    ]
  },
  {
    id: 'cp-compass-one',
    name: 'Compass One & Sengkang Grand Mall',
    code: 'CPO01',
    govCode: 'CPO',
    operator: 'M&G Real Estate / LTA Feed',
    zone: 'Sengkang Central',
    region: 'North-East',
    address: '1 Sengkang Square, Singapore 545078',
    lat: 1.3918,
    lng: 103.8952,
    totalLots: { sedan: 850, motorcycle: 95, heavy: 12 },
    availableLots: { sedan: 128, motorcycle: 32, heavy: 3 },
    expiringWithin15Min: { sedan: 19, motorcycle: 6, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm); $2.60/entry (5pm-7am)',
        weekend: '$2.60 for 1st 2 hrs, $1.30/subsequent hr',
        hourlyAvg: 1.70
      },
      motorcycle: {
        weekday: '$1.20 per entry',
        weekend: '$1.20 per entry',
        hourlyAvg: 0.60
      },
      heavy: {
        weekday: '$3.50/hr',
        weekend: '$3.50/hr',
        hourlyAvg: 3.50
      }
    },
    features: ['Direct Sengkang MRT & LRT interchange link', 'EV Charging (4 bays)', 'Sengkang Community Club Connection'],
    partnerPromotionId: 'promo-suntec-lunch',
    rating: 4.5,
    distanceKm: 11.8,
    occupancyHistory: {
      hourlyWeekday: [12, 10, 8, 6, 12, 28, 58, 80, 88, 86, 94, 97, 95, 89, 85, 87, 93, 96, 89, 76, 58, 38, 24, 16],
      hourlyWeekend: [18, 12, 10, 8, 15, 28, 54, 78, 92, 98, 100, 100, 99, 98, 96, 98, 99, 95, 88, 76, 58, 40, 26, 18],
      peakHours: '12:00 PM - 2:00 PM & 6:00 PM - 8:30 PM',
      bestTimeToPark: 'Before 11:30 AM'
    },
    spots: [
      { id: 'Lot #CP-B201', type: 'sedan', level: 'Basement 2', zone: 'Zone A (MRT Link)', status: 'available', distanceToLift: '8m' },
      { id: 'Lot #CP-B202', type: 'sedan', level: 'Basement 2', zone: 'Zone A (MRT Link)', status: 'expiring', expiresAt: Date.now() + 210000 },
      { id: 'Lot #CP-B304', type: 'sedan', level: 'Basement 3', zone: 'Zone B', status: 'available', distanceToLift: '14m' },
      { id: 'Lot #CP-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Bay', status: 'available', distanceToLift: '5m' }
    ]
  },

  // ==========================================
  // 6. SOUTH / HARBOURFRONT / SENTOSA / QUEENSTOWN / BUKIT MERAH
  // ==========================================
  {
    id: 'cp-vivocity',
    name: 'VivoCity & HarbourFront Centre',
    code: 'VVC07',
    govCode: 'VVC',
    operator: 'Mapletree / Wilson Parking',
    zone: 'HarbourFront / Sentosa Gateway',
    region: 'South',
    address: '1 HarbourFront Walk, Singapore 098585',
    lat: 1.2644,
    lng: 103.8222,
    totalLots: { sedan: 2180, motorcycle: 210, heavy: 30 },
    availableLots: { sedan: 360, motorcycle: 78, heavy: 8 },
    expiringWithin15Min: { sedan: 42, motorcycle: 14, heavy: 3 },
    rates: {
      sedan: {
        weekday: '$1.60 for 1st hr, $0.80/subsequent 30 mins; $3.50/entry (6pm-4am)',
        weekend: '$3.80 for 1st 2 hrs, $1.80/subsequent hr',
        hourlyAvg: 2.30
      },
      motorcycle: {
        weekday: '$1.50 per entry',
        weekend: '$1.50 per entry',
        hourlyAvg: 0.75
      },
      heavy: {
        weekday: '$4.20/hr dedicated coach/delivery bay',
        weekend: '$4.50/hr',
        hourlyAvg: 4.20
      }
    },
    features: ['Sentosa Express Link', 'EV Fast Charging (10)', 'Automated Smart Guidance Lights'],
    partnerPromotionId: 'promo-vivocity-dinner',
    rating: 4.7,
    distanceKm: 4.5,
    occupancyHistory: {
      hourlyWeekday: [12, 10, 8, 6, 10, 20, 42, 65, 78, 80, 88, 93, 90, 84, 82, 85, 90, 94, 89, 78, 60, 42, 26, 16],
      hourlyWeekend: [18, 12, 10, 8, 12, 24, 45, 68, 86, 96, 99, 100, 100, 99, 98, 99, 100, 97, 92, 84, 68, 48, 30, 20],
      peakHours: '1:00 PM - 4:00 PM & 6:30 PM - 9:00 PM (Weekends near 100%)',
      bestTimeToPark: 'Before 11:30 AM or Weekday afternoons'
    },
    spots: [
      { id: 'Lot #VC-L201', type: 'sedan', level: 'Level 2 Carpark', zone: 'Zone A (Sentosa Express Lift)', status: 'available', distanceToLift: '10m to Sentosa Boardwalk' },
      { id: 'Lot #VC-L202', type: 'sedan', level: 'Level 2 Carpark', zone: 'Zone A (Sentosa Express Lift)', status: 'expiring', expiresAt: Date.now() + 290000 },
      { id: 'Lot #VC-L2EV', type: 'sedan', level: 'Level 2 Carpark', zone: 'Zone B (EV Island)', status: 'available', distanceToLift: '18m', isEV: true },
      { id: 'Lot #VC-B105', type: 'sedan', level: 'Basement 1', zone: 'Zone C (HarbourFront Link)', status: 'available', distanceToLift: '12m' },
      { id: 'Lot #VC-M01', type: 'motorcycle', level: 'Level 1', zone: 'Bike Bay', status: 'available', distanceToLift: '8m' }
    ]
  },
  {
    id: 'cp-rws-sentosa',
    name: 'Resorts World Sentosa (B1 East / West Carpark)',
    code: 'RWS01',
    govCode: 'RWS',
    operator: 'Resorts World Sentosa / LTA Feed',
    zone: 'Sentosa Island',
    region: 'South',
    address: '8 Sentosa Gateway, Singapore 098269',
    lat: 1.2568,
    lng: 103.8202,
    totalLots: { sedan: 3500, motorcycle: 280, heavy: 50 },
    availableLots: { sedan: 540, motorcycle: 95, heavy: 14 },
    expiringWithin15Min: { sedan: 58, motorcycle: 16, heavy: 4 },
    rates: {
      sedan: {
        weekday: '$6.50 for 1st hr, $1.10/subsequent 30 mins (Mon-Thu); $9.00 max cap after 8pm',
        weekend: '$9.00 for 1st hr, $1.50/subsequent 30 mins (Fri-Sun & PH)',
        hourlyAvg: 3.50
      },
      motorcycle: {
        weekday: '$2.00 per entry',
        weekend: '$2.00 per entry',
        hourlyAvg: 1.00
      },
      heavy: {
        weekday: '$5.50/hr coach & bus bay',
        weekend: '$5.50/hr',
        hourlyAvg: 5.50
      }
    },
    features: ['Universal Studios & S.E.A. Aquarium Direct Access', 'EV Superchargers (16)', 'Valet Desk'],
    partnerPromotionId: 'promo-vivocity-dinner',
    rating: 4.8,
    distanceKm: 5.8,
    occupancyHistory: {
      hourlyWeekday: [15, 12, 10, 8, 10, 22, 45, 68, 80, 85, 90, 94, 92, 88, 85, 88, 92, 95, 90, 80, 65, 48, 30, 20],
      hourlyWeekend: [20, 15, 12, 10, 15, 28, 55, 80, 95, 99, 100, 100, 100, 99, 98, 99, 100, 98, 92, 85, 70, 50, 32, 22],
      peakHours: '10:30 AM - 4:00 PM (Theme Park Opening)',
      bestTimeToPark: 'Before 10:00 AM'
    },
    spots: [
      { id: 'Lot #RWS-B1A', type: 'sedan', level: 'Basement 1 East', zone: 'Zone Gold (Universal Studios)', status: 'available', distanceToLift: '10m to Globe Plaza' },
      { id: 'Lot #RWS-B1B', type: 'sedan', level: 'Basement 1 East', zone: 'Zone Gold (Universal Studios)', status: 'expiring', expiresAt: Date.now() + 350000 },
      { id: 'Lot #RWS-B1W', type: 'sedan', level: 'Basement 1 West', zone: 'Zone Blue (Aquarium & Casino)', status: 'available', distanceToLift: '15m' },
      { id: 'Lot #RWS-M01', type: 'motorcycle', level: 'Basement 1', zone: 'Motorcycle Bay', status: 'available', distanceToLift: '8m' }
    ]
  },

  // ==========================================
  // 7. CENTRAL / TOA PAYOH / BISHAN
  // ==========================================
  {
    id: 'cp-toa-payoh-hdb',
    name: 'HDB Hub Toa Payoh Central (Multi-Storey MSCP)',
    code: 'TPY08',
    govCode: 'TPM8',
    operator: 'HDB / Parking.sg Live',
    zone: 'Toa Payoh Central',
    region: 'Central',
    address: '480 Lor 6 Toa Payoh, Singapore 310480',
    lat: 1.3328,
    lng: 103.8479,
    totalLots: { sedan: 850, motorcycle: 120, heavy: 40 },
    availableLots: { sedan: 195, motorcycle: 44, heavy: 14 },
    expiringWithin15Min: { sedan: 27, motorcycle: 7, heavy: 3 },
    rates: {
      sedan: {
        weekday: '$0.60 per 30 mins (7am-10:30pm); Night max $5.00',
        weekend: '$0.60 per 30 mins',
        hourlyAvg: 1.20
      },
      motorcycle: {
        weekday: '$0.65 per day/night session',
        weekend: '$0.65 per session',
        hourlyAvg: 0.30
      },
      heavy: {
        weekday: '$2.00 per hour',
        weekend: '$2.00 per hour',
        hourlyAvg: 2.00
      }
    },
    features: ['Lowest HDB Rate ($0.60/30m)', 'Direct sheltered access to Toa Payoh MRT & Bus interchange', 'Parking.sg digital instant stop'],
    partnerPromotionId: 'promo-toa-payoh-deals',
    rating: 4.6,
    distanceKm: 3.8,
    occupancyHistory: {
      hourlyWeekday: [25, 20, 18, 16, 22, 45, 75, 92, 96, 94, 98, 99, 95, 91, 88, 89, 93, 95, 88, 75, 60, 45, 35, 28],
      hourlyWeekend: [30, 24, 20, 18, 25, 50, 78, 92, 97, 99, 100, 99, 98, 96, 94, 95, 96, 92, 85, 76, 62, 48, 38, 32],
      peakHours: '8:30 AM - 11:30 AM (HDB Appointments) & 12:00 PM - 2:00 PM (Lunch)',
      bestTimeToPark: 'After 2:30 PM'
    },
    spots: [
      { id: 'Lot #TP-201', type: 'sedan', level: 'Deck 2', zone: 'Zone A (MRT Link Lift)', status: 'available', distanceToLift: '6m to HDB Hub Entrance' },
      { id: 'Lot #TP-202', type: 'sedan', level: 'Deck 2', zone: 'Zone A (MRT Link Lift)', status: 'expiring', expiresAt: Date.now() + 120000, distanceToLift: '12m' },
      { id: 'Lot #TP-305', type: 'sedan', level: 'Deck 3', zone: 'Zone B', status: 'available', distanceToLift: '20m' },
      { id: 'Lot #TP-M01', type: 'motorcycle', level: 'Deck 1', zone: 'Motorcycle Bay', status: 'available', distanceToLift: '5m' },
      { id: 'Lot #TP-H01', type: 'heavy', level: 'Deck 1 Bay', zone: 'Heavy Vehicle Sector', status: 'available', distanceToLift: '15m' }
    ]
  },
  {
    id: 'cp-junction8-bishan',
    name: 'Junction 8 Shopping Centre (Bishan Central)',
    code: 'J8B01',
    govCode: 'J8',
    operator: 'CapitaLand / Wilson Parking',
    zone: 'Bishan Central',
    region: 'Central',
    address: '9 Bishan Pl, Singapore 579837',
    lat: 1.3508,
    lng: 103.8488,
    totalLots: { sedan: 720, motorcycle: 85, heavy: 12 },
    availableLots: { sedan: 105, motorcycle: 26, heavy: 3 },
    expiringWithin15Min: { sedan: 18, motorcycle: 5, heavy: 1 },
    rates: {
      sedan: {
        weekday: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm); $2.60/entry (5pm-7am)',
        weekend: '$2.60 for 1st 2 hrs, $1.30/subsequent hr',
        hourlyAvg: 1.70
      },
      motorcycle: {
        weekday: '$1.20 per entry',
        weekend: '$1.20 per entry',
        hourlyAvg: 0.60
      },
      heavy: {
        weekday: '$3.50/hr delivery bay',
        weekend: '$3.50/hr',
        hourlyAvg: 3.50
      }
    },
    features: ['Direct Bishan MRT (NS/Circle lines) interchange bridge', 'EV Charging (4 bays)', 'Bishan Library proximity'],
    partnerPromotionId: 'promo-toa-payoh-deals',
    rating: 4.6,
    distanceKm: 4.8,
    occupancyHistory: {
      hourlyWeekday: [12, 10, 8, 6, 12, 28, 60, 84, 92, 90, 96, 98, 95, 90, 85, 87, 93, 96, 89, 78, 58, 40, 24, 16],
      hourlyWeekend: [18, 12, 10, 8, 15, 28, 55, 78, 92, 98, 100, 100, 99, 98, 96, 98, 100, 95, 88, 78, 60, 42, 26, 18],
      peakHours: '12:00 PM - 2:00 PM & 6:00 PM - 9:00 PM',
      bestTimeToPark: 'Before 11:30 AM'
    },
    spots: [
      { id: 'Lot #J8-B201', type: 'sedan', level: 'Basement 2', zone: 'Zone A (MRT Link)', status: 'available', distanceToLift: '8m' },
      { id: 'Lot #J8-B202', type: 'sedan', level: 'Basement 2', zone: 'Zone A (MRT Link)', status: 'expiring', expiresAt: Date.now() + 210000 },
      { id: 'Lot #J8-B304', type: 'sedan', level: 'Basement 3', zone: 'Zone B', status: 'available', distanceToLift: '16m' },
      { id: 'Lot #J8-M01', type: 'motorcycle', level: 'Basement 2', zone: 'Bike Bay', status: 'available', distanceToLift: '5m' }
    ]
  }
];
