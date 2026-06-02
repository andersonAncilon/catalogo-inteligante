import Link from "next/link";
import { AppShell } from "@/components/ui/AppShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { InsightCard } from "@/components/insights/InsightCard";
import { apiGet } from "@/lib/api/server";
import type { DashboardMetrics, Insight, Product } from "@/types/domain";

export const dynamic = "force-dynamic";

type DashboardResponse = {
  business: { name: string; slug: string };
  metrics: DashboardMetrics;
  topProducts: Product[];
  weakSearches: string[];
  insights: Insight[];
};

export default async function DashboardPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const dashboard = await apiGet<DashboardResponse>(`/api/app/${businessId}/dashboard`);
  const metrics = [
    { label: "Leads", value: String(dashboard.metrics.leads), detail: `${dashboard.metrics.soldLeads} vendidos` },
    { label: "Cliques WhatsApp", value: String(dashboard.metrics.whatsappClicks), detail: "registrados por lead" },
    { label: "Buscas", value: String(dashboard.metrics.searches), detail: "sessões registradas" },
    { label: "Conversão", value: `${dashboard.metrics.leadConversionRate}%`, detail: "lead para venda" },
  ];

  return (
    <AppShell businessId={businessId} businessName={dashboard.business.name} storeSlug={dashboard.business.slug}>
      <div className="page-title">
        <div>
          <h1>Dashboard</h1>
          <p>Resumo comercial da loja e próximos pontos de atenção.</p>
        </div>
        <Link className="button primary" href={`/app/${businessId}/catalog/import`}>
          Importar catálogo
        </Link>
      </div>
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="stack">
          <div className="card">
            <h2>Produtos mais procurados</h2>
            <table>
              <tbody>
                {dashboard.topProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}. {product.title}</td>
                    <td>{product.stockQuantity} em estoque</td>
                    <td>{product.status}</td>
                  </tr>
                ))}
                {dashboard.topProducts.length === 0 ? (
                  <tr>
                    <td colSpan={3}>Cadastre produtos para acompanhar procura.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <div className="card">
            <h2>Buscas sem resultado</h2>
            {dashboard.weakSearches.length ? (
              <div className="quick-tags">
                {dashboard.weakSearches.map((query) => (
                  <span className="tag" key={query}>
                    {query}
                  </span>
                ))}
              </div>
            ) : (
              <p className="muted">Ainda não há buscas com baixo encaixe registradas.</p>
            )}
          </div>
        </section>
        <aside className="stack">
          {dashboard.insights.slice(0, 2).map((insight) => (
            <InsightCard
              key={insight.title}
              title={insight.title}
              description={insight.description}
              impact={insight.impactLevel === "high" ? "Alto" : "Médio"}
              action={insight.suggestedAction}
            />
          ))}
        </aside>
      </div>
    </AppShell>
  );
}
