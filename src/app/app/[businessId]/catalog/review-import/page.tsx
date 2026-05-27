import { AppShell } from "@/components/ui/AppShell";
import { PublishImportButton } from "@/components/forms/ImportForms";
import { apiGet } from "@/lib/api/server";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

type ReviewImportResponse = {
  batch: null | {
    id: string;
    items: Array<{
      id: string;
      detectedTitle: string | null;
      detectedPrice: number | null;
      detectedStockQuantity: number | null;
      confidenceScore: number | null;
      status: string;
    }>;
  };
};

export default async function ReviewImportPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const { batch } = await apiGet<ReviewImportResponse>(`/api/app/${businessId}/catalog/import`);
  const items = batch?.items ?? [];

  return (
    <AppShell businessId={businessId}>
      <div className="page-title">
        <div>
          <h1>Revisar produtos encontrados</h1>
          <p>Encontramos {items.length} produtos. Revise antes de publicar.</p>
        </div>
        {batch ? <PublishImportButton businessId={businessId} batchId={batch.id} /> : null}
      </div>
      <section className="table-card">
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Confiança</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td><input className="input" defaultValue={item.detectedTitle ?? ""} /></td>
                <td><input className="input" defaultValue={item.detectedPrice ? formatCurrency(item.detectedPrice) : ""} /></td>
                <td><input className="input" defaultValue={item.detectedStockQuantity ?? "?"} /></td>
                <td><span className={index < 2 ? "badge green" : "badge warning"}>{index < 2 ? "Alta" : "Média"}</span></td>
                <td><span className="badge warning">{item.status}</span></td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td colSpan={5}>Nenhuma importação pendente. Volte e cole uma lista de produtos.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
}
