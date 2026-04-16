import logo from '../assets/logo.svg';

export default function LogoHeader({ onOpenSettings }) {
  return (
    <header className="header">
      <button className="gear" onClick={onOpenSettings} aria-label="Open settings">⚙</button>
      <div className="logo-card">
        <img src={logo} alt="Ananta Realty Partners" className="logo" />
        <div className="tracker-label">PARCEL TRACKER</div>
      </div>
    </header>
  );
}
