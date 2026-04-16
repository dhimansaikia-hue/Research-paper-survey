import { generateInvestorBrief } from '../utils/investorBrief';

function availability(flag) {
  return <span className={flag ? 'avail yes' : 'avail no'}>{flag ? '✓ Available' : '✗ Not Available'}</span>;
}

export default function ParcelDetailModal({ parcel, onClose, canDelete, onDelete }) {
  if (!parcel) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head"><button onClick={onClose}>←</button><h2>{parcel.parcel_name}</h2></div>
        <p><strong>Location:</strong> {parcel.location_name}</p>
        <p><strong>Village/Survey:</strong> {parcel.village_survey_no || '-'}</p>
        <p><strong>Owners:</strong> {(parcel.owner_names || []).join(', ')}</p>
        <p><strong>Area:</strong> {parcel.land_area_guntha} guntha</p>
        <p><strong>Pricing:</strong> ₹{parcel.price_per_sqft}/sqft | ₹{parcel.total_ask_price_cr} Cr</p>
        <p><strong>Access:</strong> {parcel.access_to_land}</p>
        <p><strong>Land Type:</strong> {parcel.land_type}</p>
        <p><strong>DP Zone:</strong> {parcel.dp_zone || '-'}</p>
        <p><strong>Broker:</strong> {parcel.broker_name || '-'} ({parcel.broker_contact || '-'})</p>
        <p><strong>Observations:</strong> {parcel.field_observations || '-'}</p>
        <p><strong>Nearby Project:</strong> {parcel.nearby_project_name || '-'}</p>
        <div className="doc-row">
          {availability(parcel.survey_plan_available)}
          {availability(parcel.extract_712_available)}
          {availability(parcel.contour_plan_available)}
        </div>
        <div className="thumbs">{(parcel.photo_paths || []).map((p) => <div className="thumb" key={p}>{p.split('/').at(-1)}</div>)}</div>

        <button className="primary" onClick={() => generateInvestorBrief(parcel)}>Generate Investor Brief</button>
        {canDelete && <button className="delete-outline" onClick={() => onDelete(parcel.id)}>Delete Parcel</button>}
      </div>
    </div>
  );
}
