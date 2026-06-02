import Link from "next/link";
import { AppShell } from "@/components/ui/AppShell";
import { LeadActionButtons } from "@/components/forms/LeadActionButtons";
import { apiGet } from "@/lib/api/server";
import type { Business, Lead } from "@/types/domain";

export const dynamic = "force-dynamic";

export default async function LeadsPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const [business, leads] = await Promise.all([
    apiGet<Business>(`/api/app/${businessId}/settings`),
    apiGet<Lead[]>(`/api/app/${businessId}/leads`),
  ]);

  return (
    <AppShell businessId={businessId} businessName={business.name} storeSlug={business.slug}>
      <div className="page-title">
        <div>
          <h1>Leads</h1>
          <p>Veja buscas, produtos clicados e status de atendimento.</p>
        </div>
      </div>
      <div className="tabs">
        <span className="tag">Todos</span>
        <span className="tag">Novos</span>
        <span className="tag">Vendidos</span>
        <span className="tag">Perdidos</span>
      </div>
      <section className="stack" style={{ marginTop: 16 }}>
        {leads.map((lead) => (
          <article className="lead-card" key={lead.id}>
            <div className="section-header">
              <div>
                <h3>Cliente/sessão • {new Date(lead.createdAt).toLocaleString("pt-BR")}</h3>
                <p>Busca: {lead.originalQuery}</p>
              </div>
              <span className={lead.status === "sold" ? "badge green" : "badge warning"}>{lead.status}</span>
            </div>
            <p><strong>Produto clicado:</strong> {lead.productId ?? "Não informado"}</p>
            <div className="badge-row">
              {lead.interpretedQuery.priorities.map((item) => (
                <span className="tag" key={item}>{item}</span>
              ))}
            </div>
            <div className="actions">
              <Link className="button secondary" href={`/app/${businessId}/leads/${lead.id}`}>
                Ver detalhe
              </Link>
            </div>
            <LeadActionButtons
              businessId={businessId}
              leadId={lead.id}
              whatsappNumber={business.whatsappNumber}
              message={`Olá, vi seu interesse na busca: ${lead.originalQuery}`}
            />
          </article>
        ))}
        {leads.length === 0 ? (
          <article className="lead-card">
            <h3>Nenhum lead ainda</h3>
            <p className="muted">Os leads aparecerão quando clientes fizerem buscas ou clicarem no WhatsApp.</p>
          </article>
        ) : null}
      </section>
    </AppShell>
  );
}
