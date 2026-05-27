import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/domain";

const conditionLabels = {
  new: "Novo",
  used: "Usado",
  refurbished: "Recondicionado",
};

export function ProductCard({ product, storeSlug = "loja-do-joao" }: { product: Product; storeSlug?: string }) {
  const available = product.stockQuantity > 0;

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
        </div>
        <h3 className="product-title">{product.title}</h3>
        <p className="price">{formatCurrency(product.price)}</p>
        <p className="muted">{product.description}</p>
        <Link className="button primary" href={`/${storeSlug}/products/${product.slug}`}>
          <MessageCircle size={18} /> Tenho interesse
        </Link>
      </div>
    </article>
  );
}
