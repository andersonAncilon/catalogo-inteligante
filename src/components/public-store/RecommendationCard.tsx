import Link from "next/link";
import { CheckCircle2, Star, Tag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { LeadWhatsAppButton } from "./LeadWhatsAppButton";
import type { SearchRecommendation } from "@/types/domain";

export function RecommendationCard({
  recommendation,
  storeSlug = "loja-do-joao",
  whatsappNumber,
  originalQuery,
  searchSessionId,
}: {
  recommendation: SearchRecommendation;
  storeSlug?: string;
  whatsappNumber: string;
  originalQuery: string;
  searchSessionId?: string;
}) {
  const { product } = recommendation;
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);

  return (
    <article className="card recommendation">
      <Link className="product-image" href={`/${storeSlug}/products/${product.slug}`}>
        <span className="phone-mock" />
      </Link>
      <div className="card-body">
        <div className="badge-row">
          <span className="badge green">{Math.max(60, Math.min(98, recommendation.score))}% de match</span>
          <span className={product.stockQuantity > 0 ? "badge green" : "badge danger"}>
            {product.stockQuantity > 0 ? "Em estoque" : "Sem estoque"}
          </span>
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
        <h3>{product.title}</h3>
        <div className="price-stack">
          {hasDiscount ? <span className="old-price">{formatCurrency(product.compareAtPrice ?? product.price)}</span> : null}
          <p className="price">{formatCurrency(product.price)}</p>
        </div>
        <p>
          Recomendamos este modelo porque atende bem ao que você pediu:{" "}
          {recommendation.matchReasons.join(", ").toLowerCase()}.
        </p>
        <div className="quick-tags">
          {recommendation.matchReasons.map((reason) => (
            <span className="tag" key={reason}>
              <CheckCircle2 size={14} /> {reason}
            </span>
          ))}
        </div>
        <LeadWhatsAppButton
          storeSlug={storeSlug}
          whatsappNumber={whatsappNumber}
          label="Tenho interesse no WhatsApp"
          productId={product.id}
          searchSessionId={searchSessionId}
          originalQuery={`Olá, tenho interesse no ${product.title}. Minha busca foi: ${originalQuery}`}
        />
      </div>
    </article>
  );
}
