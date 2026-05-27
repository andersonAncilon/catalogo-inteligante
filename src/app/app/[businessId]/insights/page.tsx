import { AppShell } from "@/components/ui/AppShell";
import { InsightCard } from "@/components/insights/InsightCard";
import { apiGet } from "@/lib/api/server";
import type { Insight } from "@/types/domain";

export const dynamic = "force-dynamic";

export default async function InsightsPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const insights = await apiGet<Insight[]>(`/api/app/${businessId}/insights`);

  return (
    <AppShell businessId={businessId}>
      <div className="page-title">
        <div>
          <h1>Insights</h1>
          <p>Pontos de atenção simples, acionáveis e comerciais.</p>
        </div>
      </div>
      <section className="stack">
        {insights.map((insight) => (
          <InsightCard
            key={insight.title}
            title={insight.title}
            description={insight.description}
            impact={insight.impactLevel === "high" ? "Alto" : "Médio"}
            action={insight.suggestedAction}
          />
        ))}
      </section>
    </AppShell>
  );
}
