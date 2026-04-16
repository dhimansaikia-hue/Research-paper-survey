export default function FloatingAddButton({ onClick }) {
  return (
    <button className="fab" onClick={onClick} aria-label="Add parcel">
      +
    </button>
  );
}
