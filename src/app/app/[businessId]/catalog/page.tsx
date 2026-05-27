import Link from "next/link";
import { Plus, Upload } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { apiGet } from "@/lib/api/server";
import { formatCurrency } from "@/lib/utils";
import type { Business, Product } from "@/types/domain";

export const dynamic = "force-dynamic";

export default async function CatalogPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const { business, products } = await apiGet<{ business: Business; products: Product[] }>(`/api/app/${businessId}/catalog`);

  return (
    <AppShell businessId={businessId} businessName={business.name} storeSlug={business.slug}>
      <div className="page-title">
        <div>
          <h1>Catálogo</h1>
          <p>Administre produtos, preço, estoque e publicação.</p>
        </div>
        <div className="actions">
          <Link className="button secondary" href={`/app/${businessId}/catalog/import`}>
            <Upload size={18} /> Importar
          </Link>
          <Link className="button primary" href={`/app/${businessId}/products/new`}>
            <Plus size={18} /> Produto
          </Link>
        </div>
      </div>
      <section className="table-card">
        <div className="table-toolbar">
          <input className="input" placeholder="Buscar produto..." />
          <div className="actions">
            <select className="select" aria-label="Marca">
              <option>Marca</option>
              <option>Samsung</option>
              <option>Apple</option>
              <option>Motorola</option>
            </select>
            <select className="select" aria-label="Status">
              <option>Status</option>
              <option>Ativo</option>
              <option>Sem estoque</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.stockQuantity}</td>
                <td>
                  <span className={product.stockQuantity > 0 ? "badge green" : "badge danger"}>{product.status}</span>
                </td>
                <td>
                  <Link href={`/app/${businessId}/products/${product.id}`}>Editar</Link>
                </td>
              </tr>
            ))}
            {products.length === 0 ? (
              <tr>
                <td colSpan={5}>Nenhum produto cadastrado ainda.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
}
