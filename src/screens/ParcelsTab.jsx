import ParcelCard from '../components/ParcelCard';

export default function ParcelsTab({ parcels, onCardClick }) {
  return (
    <section className="tab-content">
      <div className="card-list">
        {parcels.length ? parcels.map((p) => <ParcelCard key={p.id} parcel={p} onClick={onCardClick} />) : <p>No parcels added yet.</p>}
      </div>
    </section>
  );
}
