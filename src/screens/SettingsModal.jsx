import { useMemo, useState } from 'react';
import { ROLES, STATUS_OPTIONS } from '../constants';

export default function SettingsModal({
  open,
  role,
  onRoleChange,
  locations,
  onUpdateCoordinates,
  parcels,
  onExport,
  onClose,
}) {
  const [location, setLocation] = useState('All');
  const [status, setStatus] = useState('All');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const filtered = useMemo(() => parcels.filter((p) => {
    if (location !== 'All' && p.location_name !== location) return false;
    if (status !== 'All' && p.status !== status) return false;
    if (from && p.visit_date && p.visit_date < from) return false;
    if (to && p.visit_date && p.visit_date > to) return false;
    return true;
  }), [parcels, location, status, from, to]);

  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head"><h2>Settings</h2><button onClick={onClose}>✕</button></div>
        <h4 className="section-title">Role</h4>
        <div className="chips">
          {[ROLES.FIELD_TEAM, ROLES.MANAGEMENT].map((r) => <button key={r} className={role === r ? 'chip active' : 'chip'} onClick={() => onRoleChange(r)}>{r}</button>)}
        </div>

        <h4 className="section-title">Export All Data to Excel</h4>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option>All</option>
          {locations.map((l) => <option key={l.id}>{l.name}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="date-row">
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <button className="primary" onClick={() => onExport(filtered, location)}>Confirm Export</button>

        <h4 className="section-title">Locations Manager</h4>
        {locations.map((l) => (
          <LocationRow key={l.id} location={l} onSave={onUpdateCoordinates} />
        ))}

        <p className="version">Ananta Realty Partners — Parcel Tracker v1.0</p>
      </div>
    </div>
  );
}

function LocationRow({ location, onSave }) {
  const [lat, setLat] = useState(location.latitude);
  const [lon, setLon] = useState(location.longitude);
  return (
    <div className="location-row">
      <strong>{location.name}</strong>
      <input type="number" step="0.0001" value={lat} onChange={(e) => setLat(Number(e.target.value))} />
      <input type="number" step="0.0001" value={lon} onChange={(e) => setLon(Number(e.target.value))} />
      <button className="outline" onClick={() => onSave(location.id, lat, lon)}>Save</button>
    </div>
  );
}
