import { MessageCircle } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { LeadStatusForm } from "@/components/forms/LeadStatusForm";
import { apiGet } from "@/lib/api/server";
import type { Lead } from "@/types/domain";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ businessId: string; leadId: string }>;
}) {
  const { businessId, leadId } = await params;
  const lead = await apiGet<Lead>(`/api/app/${businessId}/leads/${leadId}`);

  return (
    <AppShell businessId={businessId}>
      <div className="page-title">
        <div>
          <h1>Lead</h1>
          <p>Contexto completo da intenção registrada.</p>
        </div>
      </div>
      <section className="settings-grid">
        <div className="card stack">
          <h2>Busca original</h2>
          <p>“{lead.originalQuery}”</p>
          <h2>Intenção identificada</h2>
          <div className="badge-row">
            {lead.interpretedQuery.priorities.map((item) => (
              <span className="badge green" key={item}>{item}</span>
            ))}
          </div>
          <h2>Produto clicado</h2>
          <p>{lead.productId ?? "Não informado"}</p>
        </div>
        <div className="card stack">
          <label>
            Status
            <LeadStatusForm businessId={businessId} leadId={lead.id} status={lead.status} />
          </label>
          <label>
            Observações
            <textarea className="textarea" placeholder="Ex: pediu parcelamento e retirada hoje." />
          </label>
          <div className="actions">
            <button className="button primary">Marcar venda</button>
            <button className="button secondary">
              <MessageCircle size={18} /> Abrir WhatsApp
            </button>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
