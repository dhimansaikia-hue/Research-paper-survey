import { STATUS_STYLES } from '../constants';

export default function ParcelCard({ parcel, onClick }) {
  const style = STATUS_STYLES[parcel.status] || STATUS_STYLES['Under Review'];
  return (
    <article className="parcel-card" onClick={() => onClick(parcel)}>
      <span className="status" style={{ background: style.bg, color: style.color }}>{parcel.status}</span>
      <h3>{parcel.parcel_name}</h3>
      <p>📍 {parcel.location_name}</p>
      <p>🏷 {parcel.land_area_guntha} guntha</p>
      <p>₹ {parcel.price_per_sqft?.toLocaleString?.() || parcel.price_per_sqft} / sq ft</p>
    </article>
  );
}
