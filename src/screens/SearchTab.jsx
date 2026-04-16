import { useMemo, useState } from 'react';
import ParcelCard from '../components/ParcelCard';
import { STATUS_OPTIONS } from '../constants';

export default function SearchTab({ parcels, locations, onCardClick }) {
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('All');
  const [status, setStatus] = useState('All');

  const filtered = useMemo(() =>
    parcels.filter((p) => {
      const text = `${p.parcel_name} ${p.location_name} ${p.status}`.toLowerCase();
      const okQ = !q || text.includes(q.toLowerCase());
      const okL = location === 'All' || p.location_name === location;
      const okS = status === 'All' || p.status === status;
      return okQ && okL && okS;
    }), [parcels, q, location, status]);

  return (
    <section className="tab-content">
      <input placeholder="Search by name, location, status..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="chips">{['All', ...locations.map((l) => l.name)].map((l) => <button key={l} className={location === l ? 'chip active' : 'chip'} onClick={() => setLocation(l)}>{l}</button>)}</div>
      <div className="chips">{['All', ...STATUS_OPTIONS].map((s) => <button key={s} className={status === s ? 'chip active' : 'chip'} onClick={() => setStatus(s)}>{s}</button>)}</div>
      <div className="card-list">{filtered.length ? filtered.map((p) => <ParcelCard key={p.id} parcel={p} onClick={onCardClick} />) : <p>No parcels found.</p>}</div>
    </section>
  );
}
