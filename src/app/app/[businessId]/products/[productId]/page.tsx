import { AppShell } from "@/components/ui/AppShell";
import { ProductForm } from "@/components/forms/ProductForm";
import { apiGet } from "@/lib/api/server";
import type { Product } from "@/types/domain";

export const dynamic = "force-dynamic";

export default async function ProductEditPage({
  params,
}: {
  params: Promise<{ businessId: string; productId: string }>;
}) {
  const { businessId, productId } = await params;
  const product =
    productId === "new" ? undefined : await apiGet<Product>(`/api/app/${businessId}/products/${productId}`);

  return (
    <AppShell businessId={businessId}>
      <div className="page-title">
        <div>
          <h1>{product ? "Editar produto" : "Novo produto"}</h1>
          <p>Ajuste informações públicas, atributos e estoque.</p>
        </div>
      </div>
      <ProductForm businessId={businessId} product={product} />
    </AppShell>
  );
}
