import * as XLSX from 'xlsx';

export function exportParcelsToExcel(parcels, locationLabel = 'All') {
  const rows = parcels.map((p) => ({
    'Parcel Name': p.parcel_name || '',
    'Location': p.location_name || '',
    'Village / Survey No.': p.village_survey_no || '',
    'No. of Owners': p.number_of_owners || '',
    'Owner Name(s)': (p.owner_names || []).join(', '),
    'Land Area (Guntha)': p.land_area_guntha || '',
    'Price per Guntha (₹)': p.price_per_guntha || '',
    'Price per Sq Ft (₹)': p.price_per_sqft || '',
    'Total Ask Price (₹ Cr)': p.total_ask_price_cr || '',
    'Access to Land': p.access_to_land || '',
    'Land Type': p.land_type || '',
    'DP Zone': p.dp_zone || '',
    'Distance from Station (km)': p.distance_station_km || '',
    'Distance from Highway (km)': p.distance_highway_km || '',
    'Water Availability': p.water_availability || '',
    'Broker Name': p.broker_name || '',
    'Broker Contact': p.broker_contact || '',
    'Nearby Project Name': p.nearby_project_name || '',
    'Nearby Project Type': p.nearby_project_type || '',
    'Nearby Project Cost (₹ Cr)': p.nearby_project_cost_cr || '',
    'Nearby Project Observations': p.nearby_project_observations || '',
    'Field Observations': p.field_observations || '',
    'Status': p.status || '',
    'Visit Date': p.visit_date || '',
    'Photo Count': p.photo_count || 0,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Parcels');

  const ddmmyyyy = new Date().toLocaleDateString('en-GB').replaceAll('/', '');
  const fileName = `Ananta_Parcels_${locationLabel.replace(/\s+/g, '_')}_${ddmmyyyy}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
