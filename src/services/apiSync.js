// Singapore Government Open Data API Sync Service (Data.gov.sg & LTA DataMall)
// Official Endpoint: https://api.data.gov.sg/v1/transport/carpark-availability

export const SG_APIS_INFO = [
  {
    id: 'datagov-carpark',
    name: 'Data.gov.sg Carpark Availability API',
    authority: 'LTA / HDB / URA Open Data',
    endpoint: 'https://api.data.gov.sg/v1/transport/carpark-availability',
    frequency: 'Updated every 1 minute',
    authType: 'Public (No API key required) or Developer Key via data.gov.sg',
    coverage: 'Over 2,100+ HDB, URA & LTA carparks across Singapore',
    description: 'Provides live count of total lots and available lots broken down by vehicle category (C: Cars, M: Motorcycles, H: Heavy vehicles).',
    fieldsProvided: ['carpark_number', 'update_datetime', 'lot_type (C/M/H)', 'total_lots', 'lots_available']
  },
  {
    id: 'lta-datamall-carpark',
    name: 'LTA DataMall CarParkAvailabilityv2',
    authority: 'Land Transport Authority (LTA)',
    endpoint: 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2',
    frequency: 'Real-time (1-minute push)',
    authType: 'AccountKey header (Free registration on datamall.lta.gov.sg)',
    coverage: 'Major commercial shopping malls, CBD office towers, Orchard belt, Changi Airport & Sentosa',
    description: 'The definitive feed for shopping malls (ION Orchard, Suntec, Marina Square, VivoCity, Jewel) and commercial hubs with exact latitude/longitude coordinates.',
    fieldsProvided: ['CarParkID', 'Area (Marina, Orchard, etc.)', 'Development (Mall Name)', 'Location (Lat/Lng)', 'AvailableLots', 'LotType']
  },
  {
    id: 'ura-carpark-rates',
    name: 'URA Carpark Rates & Parking.sg API',
    authority: 'Urban Redevelopment Authority (URA)',
    endpoint: 'https://www.ura.gov.sg/uraDataService/carparkRates',
    frequency: 'Hourly & Daily rate tables',
    authType: 'AccessKey + Token (URA API Developer portal)',
    coverage: 'All URA ticketed and coupon car parks in Central Area and outer districts',
    description: 'Gives exact hourly parking charges, grace periods, off-peak hours, weekday vs weekend rate tiers, and heavy vehicle season rates.',
    fieldsProvided: ['carpark', 'vehCat', 'startTime', 'endTime', 'weekdayRate', 'satdayRate', 'sunPHRate']
  },
  {
    id: 'hdb-carpark-info',
    name: 'HDB Carpark Information Dataset',
    authority: 'Housing & Development Board (HDB)',
    endpoint: 'https://data.gov.sg/api/action/datastore_search?resource_id=139a30e7-362c-4423-968d-0e0400f83833',
    frequency: 'Updated monthly / continuous',
    authType: 'Public Open Data',
    coverage: 'All HDB multi-storey (MSCP), surface, and basement carparks in Singapore',
    description: 'Contains structural properties: sheltered vs surface, electronic parking system (EPS), deck height clearance limits, night parking availability, and free Sunday parking.',
    fieldsProvided: ['car_park_no', 'address', 'x_coord / y_coord (SVY21)', 'car_park_type', 'type_of_parking_system', 'short_term_parking', 'free_parking', 'night_parking', 'car_park_decks', 'gantry_height']
  },
  {
    id: 'onemap-sg',
    name: 'OneMap Singapore SLA Routing & Geocoding API',
    authority: 'Singapore Land Authority (SLA)',
    endpoint: 'https://www.onemap.gov.sg/api/common/elastic/search',
    frequency: 'Real-time geospatial engine',
    authType: 'Free API Token from onemap.gov.sg',
    coverage: 'Nationwide Singapore geospatial coordinate mapping & route estimation',
    description: 'Use for exact driving distance calculation, turn-by-turn routing to carpark gantries, EV charging locations, and SVY21 to WGS84 coordinate conversion.',
    fieldsProvided: ['SEARCHVAL', 'LATITUDE', 'LONGITUDE', 'BUILDING', 'POSTAL', 'ROAD_NAME']
  },
  {
    id: 'lta-erp-rates',
    name: 'LTA Electronic Road Pricing (ERP) Rates API',
    authority: 'Land Transport Authority (LTA)',
    endpoint: 'https://datamall2.mytransport.sg/ltaodataservice/ERPRates',
    frequency: 'Real-time rate schedules',
    authType: 'AccountKey header',
    coverage: 'All ERP gantries across CTE, PIE, AYE, Marina & Orchard CBD cordons',
    description: 'Allows your app to calculate the total cost of driving to a carpark by combining ERP gantry fees with parking charges.',
    fieldsProvided: ['ZoneID', 'ERP_Gantry_Location', 'VehType', 'StartTime', 'EndTime', 'ChargeAmount']
  }
];

// Fetch live carpark availability from Data.gov.sg
export async function fetchLiveSgGovCarparks() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('https://api.data.gov.sg/v1/transport/carpark-availability', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Data.gov.sg API returned status ${response.status}`);
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      throw new Error('No items in API response');
    }

    const item = data.items[0];
    const timestamp = item.timestamp;
    const carparkData = item.carpark_data || [];

    // Map into a fast lookup table
    const lookup = {};
    carparkData.forEach(cp => {
      const code = cp.carpark_number;
      if (!lookup[code]) {
        lookup[code] = {};
      }
      if (cp.carpark_info) {
        cp.carpark_info.forEach(info => {
          const type = info.lot_type; // 'C' (Car), 'M' (Motorcycle), 'H' (Heavy)
          lookup[code][type] = {
            total: parseInt(info.total_lots, 10) || 0,
            available: parseInt(info.lots_available, 10) || 0
          };
        });
      }
    });

    return {
      success: true,
      timestamp: timestamp || new Date().toISOString(),
      totalCarparksReported: carparkData.length,
      lookup: lookup
    };
  } catch (error) {
    console.warn('Live Data.gov.sg sync notice:', error.message);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}
