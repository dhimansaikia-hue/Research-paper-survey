const tabs = ['Map', 'Search', 'Parcels', 'Profile'];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button key={tab} className={active === tab ? 'active' : ''} onClick={() => onChange(tab)}>
          {tab}
        </button>
      ))}
    </nav>
  );
}
