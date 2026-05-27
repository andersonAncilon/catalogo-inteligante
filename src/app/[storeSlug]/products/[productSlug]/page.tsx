import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { PublicHeader } from "@/components/public-store/PublicHeader";
import { ProductCard } from "@/components/public-store/ProductCard";
import { getPublicProduct } from "@/lib/services/store-service";
import { formatCurrency } from "@/lib/utils";

export default async function ProductPage({ params }: { params: Promise<{ storeSlug: string; productSlug: string }> }) {
  const { storeSlug, productSlug } = await params;
  const { business, product, similarProducts } = await getPublicProduct(storeSlug, productSlug);
  const attributes = Object.entries(product.attributes).map(([key, value]) => `${key}: ${value}`);

  return (
    <div className="page">
      <PublicHeader business={business} />
      <main className="container section">
        <Link className="button ghost" href={`/${storeSlug}`}>
          <ArrowLeft size={18} /> Voltar
        </Link>
        <div className="hero-grid">
          <div className="card product-image" style={{ minHeight: 420 }}>
            <span className="phone-mock" />
          </div>
          <section className="card">
            <div className="badge-row">
              <span className={product.stockQuantity > 0 ? "badge green" : "badge danger"}>
                {product.stockQuantity > 0 ? "Em estoque" : "Sem estoque"}
              </span>
              <span className="badge warning">{product.condition === "new" ? "Novo" : "Usado"}</span>
            </div>
            <h1>{product.title}</h1>
            <p className="price">{formatCurrency(product.price)}</p>
            <p className="muted">{product.description}</p>
            <h3>Especificações</h3>
            <div className="quick-tags">
              {attributes.map((attribute) => (
                <span className="tag" key={attribute}>
                  {attribute}
                </span>
              ))}
            </div>
            <a className="button primary" href={`https://wa.me/${business.whatsappNumber}`}>
              <MessageCircle size={18} /> Falar com vendedor no WhatsApp
            </a>
          </section>
        </div>
        <section className="section">
          <div className="section-header">
            <h2>Produtos parecidos</h2>
          </div>
          <div className="product-grid">
            {similarProducts.map((item) => (
              <ProductCard key={item.id} product={item} storeSlug={storeSlug} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
