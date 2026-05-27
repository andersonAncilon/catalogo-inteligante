export function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="metric">
      <h3>{label}</h3>
      <div className="metric-value">{value}</div>
      <p className="muted">{detail}</p>
    </article>
  );
}
