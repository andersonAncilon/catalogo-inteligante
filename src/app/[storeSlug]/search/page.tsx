import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PublicHeader } from "@/components/public-store/PublicHeader";
import { ProductCard } from "@/components/public-store/ProductCard";
import { RecommendationCard } from "@/components/public-store/RecommendationCard";
import { searchStoreCatalog } from "@/lib/services/search-service";

const priorityLabels: Record<string, string> = {
  camera: "Boa câmera",
  battery: "Bateria forte",
  performance: "Desempenho",
  storage: "Armazenamento",
  price: "Custo-benefício",
};

export default async function SearchResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ storeSlug: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { storeSlug } = await params;
  const { q } = await searchParams;
  const result = await searchStoreCatalog(storeSlug, q ?? "celular até R$2000 com boa câmera");
  const [best, ...others] = result.recommendations;

  return (
    <div className="page">
      <PublicHeader business={result.business} />
      <main className="container section">
        <Link className="button ghost" href={`/${storeSlug}`}>
          <ArrowLeft size={18} /> Voltar
        </Link>
        <div className="page-title">
          <div>
            <h1>Melhor opção encontrada</h1>
            <p>Você buscou: “{result.originalQuery}”.</p>
          </div>
          <div className="badge-row">
            {result.interpretedQuery.maxPrice ? (
              <span className="badge green">Até {result.interpretedQuery.maxPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}</span>
            ) : null}
            {result.interpretedQuery.priorities.map((priority) => (
              <span className="badge green" key={priority}>{priorityLabels[priority] ?? priority}</span>
            ))}
          </div>
        </div>
        {best ? (
          <RecommendationCard
            recommendation={best}
            storeSlug={storeSlug}
            whatsappNumber={result.business.whatsappNumber}
            originalQuery={result.originalQuery}
            searchSessionId={result.searchSessionId}
          />
        ) : null}
        <section className="section">
          <div className="section-header">
            <div>
              <h2>Outras opções</h2>
              <p>Alternativas próximas caso você queira comparar.</p>
            </div>
          </div>
          <div className="product-grid">
            {others.map((item) => (
              <ProductCard product={item.product} key={item.product.id} storeSlug={storeSlug} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
