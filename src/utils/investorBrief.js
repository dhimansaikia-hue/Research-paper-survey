import { jsPDF } from 'jspdf';

export function generateInvestorBrief(parcel) {
  const doc = new jsPDF();
  const line = (label, value, y) => doc.text(`${label}: ${value || '-'}`, 12, y);
  doc.setFontSize(18);
  doc.text('Investor Brief', 12, 18);
  doc.setFontSize(12);
  line('Parcel', parcel.parcel_name, 32);
  line('Location', parcel.location_name, 40);
  line('Area (Guntha)', parcel.land_area_guntha, 48);
  line('Price/Guntha', parcel.price_per_guntha, 56);
  line('Price/Sq Ft', parcel.price_per_sqft, 64);
  line('Total Ask (₹ Cr)', parcel.total_ask_price_cr, 72);
  line('Access', parcel.access_to_land, 80);
  line('Land Type', parcel.land_type, 88);
  line('DP Zone', parcel.dp_zone, 96);
  line('Broker', `${parcel.broker_name || '-'} (${parcel.broker_contact || '-'})`, 104);
  line('Status', parcel.status, 112);
  doc.text('Observations:', 12, 124);
  doc.text(parcel.field_observations || '-', 12, 132, { maxWidth: 185 });
  doc.text('Nearby Projects:', 12, 154);
  doc.text(
    `${parcel.nearby_project_name || '-'} | ${parcel.nearby_project_type || '-'} | ₹${parcel.nearby_project_cost_cr || '-'}`,
    12,
    162,
    { maxWidth: 185 }
  );

  doc.save(`${parcel.parcel_name || 'parcel'}-investor-brief.pdf`);
}
