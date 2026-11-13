// NOTES: Spinning circle shown while data loads.

export default function Spinner() {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <div className="spinner" />
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}