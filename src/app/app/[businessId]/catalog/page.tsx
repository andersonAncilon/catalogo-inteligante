import Link from "next/link";
import { Plus, Upload } from "lucide-react";
import { CatalogTable } from "@/components/catalog/CatalogTable";
import { AppShell } from "@/components/ui/AppShell";
import { apiGet } from "@/lib/api/server";
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
      <CatalogTable businessId={businessId} products={products} />
    </AppShell>
  );
}
