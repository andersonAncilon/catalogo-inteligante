import { Bot } from "lucide-react";
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
          <div className="badge-row">
            <span className="badge warning"><Bot size={14} /> Confirmação pendente</span>
          </div>
          <h2>Confirmar ação</h2>
          <p>Entendi que você quer registrar uma venda.</p>
          <p><strong>Produto:</strong> Samsung S20 FE</p>
          <p><strong>Estoque atual:</strong> 2</p>
          <p><strong>Novo estoque:</strong> 1</p>
          <p><strong>Lead relacionado:</strong> cliente buscou celular até R$2000 com boa câmera.</p>
          <div className="actions">
            <button className="button primary">Confirmar venda</button>
            <button className="button secondary">Cancelar</button>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
