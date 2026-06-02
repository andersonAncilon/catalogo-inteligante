import Link from "next/link";
import { MessageCircle, Star, Tag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/domain";

const conditionLabels = {
  new: "Novo",
  used: "Usado",
  refurbished: "Recondicionado",
};

export function ProductCard({ product, storeSlug = "loja-do-joao" }: { product: Product; storeSlug?: string }) {
  const available = product.stockQuantity > 0;
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const discountPercent = hasDiscount
    ? Math.round((((product.compareAtPrice ?? product.price) - product.price) / (product.compareAtPrice ?? product.price)) * 100)
    : 0;

  return (
    <article className="card product-card">
      <Link className="product-image" href={`/${storeSlug}/products/${product.slug}`}>
        <span className="phone-mock" />
      </Link>
      <div className="product-body">
        <div className="badge-row">
          <span className={available ? "badge green" : "badge danger"}>
            {available ? "Em estoque" : "Sem estoque"}
          </span>
          <span className="badge warning">{conditionLabels[product.condition]}</span>
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
        <h3 className="product-title">{product.title}</h3>
        <div className="price-stack">
          {hasDiscount ? (
            <span className="old-price">
              {formatCurrency(product.compareAtPrice ?? product.price)} · {discountPercent}% off
            </span>
          ) : null}
          <p className="price">{formatCurrency(product.price)}</p>
        </div>
        <p className="muted">{product.description}</p>
        <Link className="button primary" href={`/${storeSlug}/products/${product.slug}`}>
          <MessageCircle size={18} /> Tenho interesse
        </Link>
      </div>
    </article>
  );
}
