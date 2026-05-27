import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { SearchRecommendation } from "@/types/domain";

export function RecommendationCard({
  recommendation,
  storeSlug = "loja-do-joao",
}: {
  recommendation: SearchRecommendation;
  storeSlug?: string;
}) {
  const { product } = recommendation;

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
        </div>
        <h3>{product.title}</h3>
        <p className="price">{formatCurrency(product.price)}</p>
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
        <Link className="button primary" href={`https://wa.me/5511999999999`}>
          <MessageCircle size={18} /> Tenho interesse no WhatsApp
        </Link>
      </div>
    </article>
  );
}
