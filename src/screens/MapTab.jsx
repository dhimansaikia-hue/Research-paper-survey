import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import ParcelCard from '../components/ParcelCard';

const icon = (count) =>
  L.divIcon({
    className: 'marker-wrap',
    html: `<div class="custom-pin">${count}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

export default function MapTab({ locations, parcels, selectedLocation, setSelectedLocation, onCardClick }) {
  const shown = selectedLocation ? parcels.filter((p) => p.location_name === selectedLocation) : parcels;

  return (
    <section className="tab-content map-tab">
      <MapContainer center={[19.2, 73.5]} zoom={8} style={{ height: 280, width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        {locations.map((loc) => {
          const count = parcels.filter((p) => p.location_name === loc.name).length;
          return (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={icon(count)}
              eventHandlers={{ click: () => setSelectedLocation(loc.name) }}
            >
              <Popup>{loc.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <h4 className="list-heading">{(selectedLocation || 'All Locations').toUpperCase()} · {shown.length} PARCELS</h4>
      <div className="card-list">{shown.map((p) => <ParcelCard key={p.id} parcel={p} onClick={onCardClick} />)}</div>
    </section>
  );
}
