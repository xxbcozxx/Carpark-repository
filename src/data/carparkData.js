// Authentic Singapore Carpark dataset based on LTA, Wilson, LHN, CBM & Mall data

export const VEHICLE_TYPES = {
  SEDAN: { id: 'sedan', name: 'Car / Sedan', icon: '🚗', defaultRate: 1.20, unit: 'per 30 min' },
  MOTORCYCLE: { id: 'motorcycle', name: 'Motorcycle', icon: '🏍️', defaultRate: 0.65, unit: 'per session (7am-10:30pm)' },
  HEAVY: { id: 'heavy', name: 'Heavy Vehicle / Van / Lorry', icon: '🚚', defaultRate: 2.50, unit: 'per hour' },
};

export const INITIAL_CARPARKS = [
  {
    id: 'cp-suntec',
    name: 'Suntec City Mall & Convention Centre',
    code: 'SUN01',
    operator: 'Wilson Parking / LTA',
    zone: 'Marina Bay / City',
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
        weekday: '$4.50/hr (Loading bay max 2.8m height clearance in Zone B)',
        weekend: '$4.50/hr',
        hourlyAvg: 4.50
      }
    },
    features: ['EV Charging (12 bays)', 'Accessible Lots (18)', 'Grace Period: 15 mins', 'Height Limit: 2.0m (4.0m loading)'],
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
      { id: 'S-A01', type: 'sedan', level: 'B1', status: 'available', distanceToLift: '15m' },
      { id: 'S-A02', type: 'sedan', level: 'B1', status: 'occupied', expiresAt: Date.now() + 1800000 },
      { id: 'S-A03', type: 'sedan', level: 'B1', status: 'expiring', expiresAt: Date.now() + 240000 }, // 4 min
      { id: 'S-A04', type: 'sedan', level: 'B1', status: 'available', distanceToLift: '25m', isEV: true },
      { id: 'S-A05', type: 'sedan', level: 'B1', status: 'expiring', expiresAt: Date.now() + 540000 }, // 9 min
      { id: 'S-A06', type: 'sedan', level: 'B1', status: 'available', distanceToLift: '30m' },
      { id: 'S-A07', type: 'sedan', level: 'B2', status: 'available', distanceToLift: '10m' },
      { id: 'S-A08', type: 'sedan', level: 'B2', status: 'occupied', expiresAt: Date.now() + 3600000 },
      { id: 'M-01', type: 'motorcycle', level: 'B1', status: 'available', distanceToLift: '5m' },
      { id: 'M-02', type: 'motorcycle', level: 'B1', status: 'expiring', expiresAt: Date.now() + 180000 }, // 3 min
      { id: 'M-03', type: 'motorcycle', level: 'B1', status: 'available', distanceToLift: '12m' },
      { id: 'H-01', type: 'heavy', level: 'L1 Bay', status: 'available', distanceToLift: '40m' },
      { id: 'H-02', type: 'heavy', level: 'L1 Bay', status: 'expiring', expiresAt: Date.now() + 420000 }, // 7 min
    ]
  },
  {
    id: 'cp-marina-square',
    name: 'Marina Square Shopping Mall',
    code: 'MSQ02',
    operator: 'LHN Parking / Mall Partner',
    zone: 'Marina Bay',
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
      { id: 'MS-B101', type: 'sedan', level: 'B1', status: 'available', distanceToLift: '10m' },
      { id: 'MS-B102', type: 'sedan', level: 'B1', status: 'expiring', expiresAt: Date.now() + 320000 },
      { id: 'MS-B103', type: 'sedan', level: 'B1', status: 'occupied', expiresAt: Date.now() + 2700000 },
      { id: 'MS-B104', type: 'sedan', level: 'B1', status: 'available', distanceToLift: '20m', isEV: true },
      { id: 'MS-M01', type: 'motorcycle', level: 'B1', status: 'available', distanceToLift: '8m' },
      { id: 'MS-H01', type: 'heavy', level: 'G Loading', status: 'available', distanceToLift: '35m' }
    ]
  },
  {
    id: 'cp-bugis-junction',
    name: 'Bugis Junction & Bugis+',
    code: 'BGJ03',
    operator: 'CapitaLand / Wilson Parking',
    zone: 'Bugis / Bras Basah',
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
      { id: 'BJ-01', type: 'sedan', level: 'B2', status: 'expiring', expiresAt: Date.now() + 190000 },
      { id: 'BJ-02', type: 'sedan', level: 'B2', status: 'available', distanceToLift: '12m' },
      { id: 'BJ-03', type: 'sedan', level: 'B2', status: 'occupied', expiresAt: Date.now() + 4200000 },
      { id: 'BJ-M1', type: 'motorcycle', level: 'B2', status: 'expiring', expiresAt: Date.now() + 300000 }
    ]
  },
  {
    id: 'cp-chinatown-complex',
    name: 'Chinatown Complex & People\'s Park (HDB / URA)',
    code: 'CTC04',
    operator: 'HDB / URA / Parking.sg Live',
    zone: 'Chinatown / Outram',
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
      { id: 'CT-101', type: 'sedan', level: 'L3', status: 'available', distanceToLift: '8m' },
      { id: 'CT-102', type: 'sedan', level: 'L3', status: 'expiring', expiresAt: Date.now() + 150000 },
      { id: 'CT-103', type: 'sedan', level: 'L3', status: 'available', distanceToLift: '22m' },
      { id: 'CT-M01', type: 'motorcycle', level: 'L2', status: 'available', distanceToLift: '5m' },
      { id: 'CT-H01', type: 'heavy', level: 'L1', status: 'available', distanceToLift: '15m' }
    ]
  },
  {
    id: 'cp-woodlands-heavy',
    name: 'Woodlands Heavy Vehicle & Logistic Carpark',
    code: 'WLD05',
    operator: 'URA / LTA Heavy Vehicle Parking',
    zone: 'Woodlands / Industrial North',
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
      { id: 'WH-01', type: 'heavy', level: 'Zone A', status: 'available', distanceToLift: 'N/A Gate 1' },
      { id: 'WH-02', type: 'heavy', level: 'Zone A', status: 'expiring', expiresAt: Date.now() + 480000 },
      { id: 'WH-03', type: 'heavy', level: 'Zone A', status: 'available', distanceToLift: 'N/A Gate 2' },
      { id: 'WS-01', type: 'sedan', level: 'Staff Bay', status: 'available', distanceToLift: '5m' }
    ]
  },
  {
    id: 'cp-jurong-point',
    name: 'Jurong Point Shopping Centre',
    code: 'JPT06',
    operator: 'CBM Parking / LTA Feed',
    zone: 'Jurong West / Boon Lay',
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
      { id: 'JP-B101', type: 'sedan', level: 'B1', status: 'available', distanceToLift: '14m' },
      { id: 'JP-B102', type: 'sedan', level: 'B1', status: 'expiring', expiresAt: Date.now() + 210000 },
      { id: 'JP-B103', type: 'sedan', level: 'B1', status: 'occupied', expiresAt: Date.now() + 1900000 },
      { id: 'JP-M01', type: 'motorcycle', level: 'B1', status: 'available', distanceToLift: '6m' }
    ]
  },
  {
    id: 'cp-vivocity',
    name: 'VivoCity & HarbourFront Centre',
    code: 'VVC07',
    operator: 'Mapletree / Wilson Parking',
    zone: 'HarbourFront / Sentosa Gateway',
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
      { id: 'VC-A01', type: 'sedan', level: 'L2', status: 'available', distanceToLift: '10m' },
      { id: 'VC-A02', type: 'sedan', level: 'L2', status: 'expiring', expiresAt: Date.now() + 290000 },
      { id: 'VC-A03', type: 'sedan', level: 'L2', status: 'available', distanceToLift: '18m', isEV: true },
      { id: 'VC-M01', type: 'motorcycle', level: 'L1', status: 'available', distanceToLift: '8m' }
    ]
  },
  {
    id: 'cp-toa-payoh-hdb',
    name: 'HDB Hub Toa Payoh Central (Multi-Storey)',
    code: 'TPY08',
    operator: 'HDB / Parking.sg Live',
    zone: 'Toa Payoh Central',
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
      { id: 'TP-201', type: 'sedan', level: 'Deck 2', status: 'available', distanceToLift: '6m' },
      { id: 'TP-202', type: 'sedan', level: 'Deck 2', status: 'expiring', expiresAt: Date.now() + 120000 },
      { id: 'TP-203', type: 'sedan', level: 'Deck 3', status: 'available', distanceToLift: '20m' },
      { id: 'TP-M1', type: 'motorcycle', level: 'Deck 1', status: 'available', distanceToLift: '5m' },
      { id: 'TP-H1', type: 'heavy', level: 'Deck 1 Bay', status: 'available', distanceToLift: '15m' }
    ]
  }
];
