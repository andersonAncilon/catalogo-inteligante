"use client";

import Link from "next/link";
import * as React from "react";
import { Search, SlidersHorizontal, Star, Tag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/domain";

const statusLabels: Record<Product["status"], string> = {
  active: "Ativo",
  inactive: "Inativo",
  out_of_stock: "Sem estoque",
  draft: "Rascunho",
};

const conditionLabels: Record<Product["condition"], string> = {
  new: "Novo",
  used: "Usado",
  refurbished: "Recondicionado",
};

export function CatalogTable({ businessId, products }: { businessId: string; products: Product[] }) {
  const brands = Array.from(new Set(products.map((product) => product.brand).filter(Boolean))).sort();

  return (
    <section className="table-card">
      <CatalogTableClient businessId={businessId} products={products} brands={brands} />
    </section>
  );
}

function CatalogTableClient({
  businessId,
  products,
  brands,
}: {
  businessId: string;
  products: Product[];
  brands: string[];
}) {
  const [query, setQuery] = React.useState("");
  const [brand, setBrand] = React.useState("all");
  const [status, setStatus] = React.useState("all");

  const normalizedQuery = normalize(query);
  const filteredProducts = products.filter((product) => {
    const searchable = normalize(
      [
        product.title,
        product.brand,
        product.category,
        product.description,
        product.status,
        product.condition,
        product.searchText,
        JSON.stringify(product.attributes),
      ].join(" "),
    );

    return (
      (!normalizedQuery || searchable.includes(normalizedQuery)) &&
      (brand === "all" || product.brand === brand) &&
      (status === "all" || product.status === status)
    );
  });

  return (
    <>
      <div className="table-toolbar">
        <label className="input-icon">
          <Search size={18} aria-hidden="true" />
          <input
            className="input"
            placeholder="Buscar por nome, marca, categoria ou atributo..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="actions">
          <SlidersHorizontal size={18} aria-hidden="true" />
          <select className="select" aria-label="Marca" value={brand} onChange={(event) => setBrand(event.target.value)}>
            <option value="all">Todas as marcas</option>
            {brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select className="select" aria-label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="out_of_stock">Sem estoque</option>
            <option value="draft">Rascunho</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="table-product">
                  <strong>{product.title}</strong>
                  <span className="muted">
                    {[product.brand, product.category, conditionLabels[product.condition]].filter(Boolean).join(" · ")}
                  </span>
                  <div className="badge-row">
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
                </div>
              </td>
              <td>
                <div className="price-stack">
                  {product.compareAtPrice && product.compareAtPrice > product.price ? (
                    <span className="old-price">{formatCurrency(product.compareAtPrice)}</span>
                  ) : null}
                  <strong>{formatCurrency(product.price)}</strong>
                </div>
              </td>
              <td>{product.stockQuantity}</td>
              <td>
                <span className={product.stockQuantity > 0 && product.status === "active" ? "badge green" : "badge danger"}>
                  {statusLabels[product.status]}
                </span>
              </td>
              <td>
                <Link href={`/app/${businessId}/products/${product.id}`}>Editar</Link>
              </td>
            </tr>
          ))}
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={5}>Nenhum produto encontrado com os filtros atuais.</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
