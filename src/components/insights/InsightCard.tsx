export function InsightCard({
  title,
  description,
  impact,
  action,
}: {
  title: string;
  description: string;
  impact: string;
  action: string;
}) {
  return (
    <article className="insight-card">
      <div className="badge-row">
        <span className={impact === "Alto" ? "badge danger" : "badge warning"}>{impact} impacto</span>
      </div>
      <h3>{title}</h3>
      <p className="muted">{description}</p>
      <strong>Ação sugerida</strong>
      <p>{action}</p>
    </article>
  );
}
