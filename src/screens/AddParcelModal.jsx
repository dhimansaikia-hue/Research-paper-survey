import { useMemo, useState } from 'react';
import {
  ACCESS_OPTIONS,
  LAND_TYPES,
  PROJECT_TYPES,
  STATUS_OPTIONS,
  WATER_OPTIONS,
} from '../constants';

const initial = {
  parcel_name: '',
  location_name: '',
  village_survey_no: '',
  visit_date: '',
  status: 'Under Review',
  number_of_owners: 1,
  owner_names: [''],
  land_area_guntha: '',
  price_per_guntha: '',
  price_per_sqft: '',
  total_ask_price_cr: '',
  access_to_land: 'Direct Road',
  land_type: 'Agricultural',
  dp_zone: '',
  distance_station_km: '',
  distance_highway_km: '',
  water_availability: 'Borewell',
  survey_plan_available: false,
  extract_712_available: false,
  contour_plan_available: false,
  broker_name: '',
  broker_contact: '',
  has_nearby_projects: false,
  nearby_project_name: '',
  nearby_project_type: 'Residential Township',
  nearby_project_cost_cr: '',
  nearby_project_observations: '',
  field_observations: '',
};

export default function AddParcelModal({ open, onClose, locations, onSave, error, warning }) {
  const [form, setForm] = useState(initial);
  const [photos, setPhotos] = useState([]);
  const [surveyFiles, setSurveyFiles] = useState([]);
  const [extractFiles, setExtractFiles] = useState([]);
  const [contourFiles, setContourFiles] = useState([]);

  const locationSuggestions = useMemo(() => locations.map((l) => l.name), [locations]);
  if (!open) return null;

  const update = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head"><h2>Add Parcel</h2><button onClick={onClose}>✕</button></div>
        {error && <p className="error">{error}</p>}
        {warning && <p className="warning">{warning}</p>}

        <h4 className="section-title">Location Details</h4>
        <input placeholder="Parcel / Plot Name" required value={form.parcel_name} onChange={(e) => update('parcel_name', e.target.value)} />
        <input list="locations" placeholder="Location" required value={form.location_name} onChange={(e) => update('location_name', e.target.value)} />
        <datalist id="locations">{locationSuggestions.map((l) => <option key={l} value={l} />)}</datalist>
        <input placeholder="Village / Taluka / Survey Number" value={form.village_survey_no} onChange={(e) => update('village_survey_no', e.target.value)} />
        <input type="date" value={form.visit_date} onChange={(e) => update('visit_date', e.target.value)} />
        <select value={form.status} onChange={(e) => update('status', e.target.value)}>{STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}</select>

        <h4 className="section-title">Ownership</h4>
        <input type="number" min="1" max="5" value={form.number_of_owners} onChange={(e) => {
          const n = Math.max(1, Math.min(5, Number(e.target.value)));
          update('number_of_owners', n);
          update('owner_names', Array.from({ length: n }, (_, i) => form.owner_names[i] || ''));
        }} />
        {form.owner_names.map((owner, i) => <input key={i} placeholder={`Owner ${i + 1}`} value={owner} onChange={(e) => {
          const arr = [...form.owner_names];
          arr[i] = e.target.value;
          update('owner_names', arr);
        }} />)}

        <h4 className="section-title">Land Measurements & Pricing</h4>
        <input placeholder="Land Area in Guntha" type="number" value={form.land_area_guntha} onChange={(e) => update('land_area_guntha', Number(e.target.value))} />
        <input placeholder="Price per Guntha" type="number" value={form.price_per_guntha} onChange={(e) => update('price_per_guntha', Number(e.target.value))} />
        <input placeholder="Price per Sq Ft" type="number" value={form.price_per_sqft} onChange={(e) => update('price_per_sqft', Number(e.target.value))} />
        <input placeholder="Total Ask Price (₹ Cr)" type="number" value={form.total_ask_price_cr} onChange={(e) => update('total_ask_price_cr', Number(e.target.value))} />
        <select value={form.access_to_land} onChange={(e) => update('access_to_land', e.target.value)}>{ACCESS_OPTIONS.map((s) => <option key={s}>{s}</option>)}</select>

        <h4 className="section-title">Asset Attributes</h4>
        <select value={form.land_type} onChange={(e) => update('land_type', e.target.value)}>{LAND_TYPES.map((s) => <option key={s}>{s}</option>)}</select>
        <input placeholder="Development Plan / DP Zone" value={form.dp_zone} onChange={(e) => update('dp_zone', e.target.value)} />
        <input placeholder="Distance from nearest Railway Station (km)" type="number" value={form.distance_station_km} onChange={(e) => update('distance_station_km', Number(e.target.value))} />
        <input placeholder="Distance from Highway (km)" type="number" value={form.distance_highway_km} onChange={(e) => update('distance_highway_km', Number(e.target.value))} />
        <select value={form.water_availability} onChange={(e) => update('water_availability', e.target.value)}>{WATER_OPTIONS.map((s) => <option key={s}>{s}</option>)}</select>

        <label><input type="checkbox" checked={form.survey_plan_available} onChange={(e) => update('survey_plan_available', e.target.checked)} />Survey Plan available?</label>
        <label><input type="checkbox" checked={form.extract_712_available} onChange={(e) => update('extract_712_available', e.target.checked)} />7/12 Extract available?</label>

        <h4 className="section-title">Broker Details</h4>
        <input placeholder="Broker Name" value={form.broker_name} onChange={(e) => update('broker_name', e.target.value)} />
        <input placeholder="Broker Contact Number" value={form.broker_contact} onChange={(e) => update('broker_contact', e.target.value)} />

        <h4 className="section-title">Nearby Projects</h4>
        <label><input type="checkbox" checked={form.has_nearby_projects} onChange={(e) => update('has_nearby_projects', e.target.checked)} />Any nearby projects?</label>
        {form.has_nearby_projects && <>
          <input placeholder="Nearby Project Name" value={form.nearby_project_name} onChange={(e) => update('nearby_project_name', e.target.value)} />
          <select value={form.nearby_project_type} onChange={(e) => update('nearby_project_type', e.target.value)}>{PROJECT_TYPES.map((s) => <option key={s}>{s}</option>)}</select>
          <input placeholder="Cost of Nearby Project (₹ Cr)" type="number" value={form.nearby_project_cost_cr} onChange={(e) => update('nearby_project_cost_cr', Number(e.target.value))} />
          <textarea placeholder="Features / Observations" value={form.nearby_project_observations} onChange={(e) => update('nearby_project_observations', e.target.value)} />
        </>}

        <h4 className="section-title">Observations</h4>
        <textarea placeholder="Field Observations" value={form.field_observations} onChange={(e) => update('field_observations', e.target.value)} />

        <h4 className="section-title">Site Photos & Documents</h4>
        <div className="upload-row">
          <label className="outline">📷 Take Photo<input hidden type="file" capture="environment" accept="image/*" multiple onChange={(e) => setPhotos((s) => [...s, ...Array.from(e.target.files || [])])} /></label>
          <label className="outline">🖼 Upload from Gallery<input hidden type="file" accept="image/*" multiple onChange={(e) => setPhotos((s) => [...s, ...Array.from(e.target.files || [])])} /></label>
        </div>
        <div className="thumbs">{photos.map((f, i) => <div key={i} className="thumb">{f.name}<button onClick={() => setPhotos((s) => s.filter((_, idx) => idx !== i))}>✕</button></div>)}</div>

        <label className="outline">Upload Survey Plan<input hidden type="file" onChange={(e) => setSurveyFiles(Array.from(e.target.files || []))} /></label>
        <label className="outline">Upload 7/12 Extract<input hidden type="file" onChange={(e) => setExtractFiles(Array.from(e.target.files || []))} /></label>
        <label className="outline">Upload Contour Plan<input hidden type="file" onChange={(e) => setContourFiles(Array.from(e.target.files || []))} /></label>

        <button className="primary" onClick={() => onSave(form, { photos, surveyFiles, extractFiles, contourFiles }, () => {
          setForm(initial); setPhotos([]); setSurveyFiles([]); setExtractFiles([]); setContourFiles([]);
        })}>Save Parcel</button>
      </div>
    </div>
  );
}
