import { ClipboardList, FileSpreadsheet, Image, Instagram } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ImportStartForm } from "@/components/forms/ImportForms";

const methods = [
  { icon: ClipboardList, title: "Colar lista de produtos", text: "Cole textos vindos do WhatsApp ou Instagram." },
  { icon: Image, title: "Enviar prints ou fotos", text: "Use imagens do catálogo atual para extrair itens." },
  { icon: Instagram, title: "Informar Instagram", text: "Analise publicações como ponto de partida." },
  { icon: FileSpreadsheet, title: "Enviar planilha", text: "Importe uma lista simples com preço e estoque." },
];

export default async function ImportPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;

  return (
    <AppShell businessId={businessId}>
      <div className="page-title">
        <div>
          <h1>Importar catálogo</h1>
          <p>Comece com o material que o lojista já tem em mãos.</p>
        </div>
      </div>
      <div className="import-grid">
        <ImportStartForm businessId={businessId} />
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <article className="card" key={method.title}>
              <Icon color="#16A34A" size={28} />
              <h2>{method.title}</h2>
              <p className="muted">{method.text}</p>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}
