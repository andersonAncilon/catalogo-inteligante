import { PublicHeader } from "@/components/public-store/PublicHeader";
import { ProductCard } from "@/components/public-store/ProductCard";
import { SearchHero } from "@/components/public-store/SearchHero";
import { getPublicStore } from "@/lib/services/store-service";

export default async function StoreHomePage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const { storeSlug } = await params;
  const { business, products } = await getPublicStore(storeSlug);

  return (
    <div className="page">
      <PublicHeader business={business} />
      <SearchHero storeSlug={storeSlug} />
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Produtos em destaque</h2>
              <p>{business.description}</p>
            </div>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} storeSlug={storeSlug} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
