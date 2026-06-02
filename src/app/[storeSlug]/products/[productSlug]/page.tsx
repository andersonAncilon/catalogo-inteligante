import Link from "next/link";
import { ArrowLeft, Star, Tag } from "lucide-react";
import { LeadWhatsAppButton } from "@/components/public-store/LeadWhatsAppButton";
import { PublicHeader } from "@/components/public-store/PublicHeader";
import { ProductCard } from "@/components/public-store/ProductCard";
import { getPublicProduct } from "@/lib/services/store-service";
import { formatCurrency } from "@/lib/utils";

export default async function ProductPage({ params }: { params: Promise<{ storeSlug: string; productSlug: string }> }) {
  const { storeSlug, productSlug } = await params;
  const { business, product, similarProducts } = await getPublicProduct(storeSlug, productSlug);
  const attributes = Object.entries(product.attributes).map(([key, value]) => `${key}: ${value}`);
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);

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
              {product.isFeatured ? (
                <span className="badge green">
                  <Star size={13} aria-hidden="true" /> Destaque
                </span>
              ) : null}
              {product.promotionLabel ? (
                <span className="badge warning">
                  <Tag size={13} aria-hidden="true" /> {product.promotionLabel}
                </span>
              ) : null}
            </div>
            <h1>{product.title}</h1>
            <div className="price-stack">
              {hasDiscount ? <span className="old-price">{formatCurrency(product.compareAtPrice ?? product.price)}</span> : null}
              <p className="price">{formatCurrency(product.price)}</p>
            </div>
            <p className="muted">{product.description}</p>
            <h3>Especificações</h3>
            <div className="quick-tags">
              {attributes.map((attribute) => (
                <span className="tag" key={attribute}>
                  {attribute}
                </span>
              ))}
            </div>
            <LeadWhatsAppButton
              storeSlug={storeSlug}
              whatsappNumber={business.whatsappNumber}
              label="Falar com vendedor no WhatsApp"
              productId={product.id}
              leadSource="product_page"
              originalQuery={`Olá, tenho interesse no produto ${product.title}.`}
            />
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
