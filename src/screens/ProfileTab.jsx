import logo from '../assets/logo.svg';

export default function ProfileTab({ user, role, onLogout }) {
  return (
    <section className="tab-content profile">
      <img src={logo} alt="Ananta Realty Partners" className="login-logo" />
      <p>Parcel Tracker</p>
      <p><strong>{user?.email}</strong></p>
      <p>Role: {role}</p>
      <button className="primary" onClick={onLogout}>Sign Out</button>
    </section>
  );
}
