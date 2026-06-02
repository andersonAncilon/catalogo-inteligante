import { AssistantCommandForm } from "@/components/forms/AssistantCommandForm";
import { AppShell } from "@/components/ui/AppShell";

export default async function AssistantPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;

  return (
    <AppShell businessId={businessId}>
      <div className="page-title">
        <div>
          <h1>Assistente</h1>
          <p>Execute tarefas operacionais com confirmação antes de alterar dados sensíveis.</p>
        </div>
      </div>
      <div className="assistant-layout">
        <section className="card stack">
          <AssistantCommandForm businessId={businessId} />
          <div className="quick-tags">
            <span className="tag">Registrar venda</span>
            <span className="tag">Atualizar estoque</span>
            <span className="tag">Alterar preço</span>
            <span className="tag">Ver produtos parados</span>
          </div>
          <div className="chat">
            <div className="message user">Vendi um S20 FE.</div>
            <div className="message assistant">O assistente registrará a interpretação e pedirá confirmação.</div>
          </div>
        </section>
        <aside className="card stack">
          <h2>Confirmação</h2>
          <p>
            Quando o assistente identificar uma venda ou atualização de estoque,
            a confirmação aparece logo abaixo do comando antes de alterar dados.
          </p>
          <p className="muted">
            A confirmação registra evento de inventário e atualiza métricas do dashboard.
          </p>
        </aside>
      </div>
    </AppShell>
  );
}
