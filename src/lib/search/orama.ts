import { create, insertMultiple, search } from "@orama/orama";
import type { Product } from "@/types/domain";

type CatalogSearchDocument = {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  condition: string;
  status: string;
  promotionLabel: string;
  searchText: string;
  attributes: string;
  price: number;
  stockQuantity: number;
  isFeatured: boolean;
};

export async function searchProductsWithOrama(products: Product[], query: string) {
  if (!products.length || !query.trim()) return new Map<string, number>();

  const index = create({
    schema: {
      id: "string",
      title: "string",
      description: "string",
      brand: "string",
      category: "string",
      condition: "string",
      status: "string",
      promotionLabel: "string",
      searchText: "string",
      attributes: "string",
      price: "number",
      stockQuantity: "number",
      isFeatured: "boolean",
    } as const,
  });

  const documents: CatalogSearchDocument[] = products.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    brand: product.brand,
    category: product.category,
    condition: product.condition,
    status: product.status,
    promotionLabel: product.promotionLabel,
    searchText: product.searchText,
    attributes: JSON.stringify(product.attributes),
    price: product.price,
    stockQuantity: product.stockQuantity,
    isFeatured: product.isFeatured,
  }));

  await insertMultiple(index, documents);

  const results = await search(index, {
    term: query,
    limit: products.length,
    tolerance: 2,
    threshold: 0.3,
    properties: ["title", "description", "brand", "category", "promotionLabel", "searchText", "attributes"],
    boost: {
      title: 3,
      brand: 2.2,
      searchText: 1.8,
      attributes: 1.4,
      description: 1.2,
      promotionLabel: 1.1,
    },
  });

  const maxScore = Math.max(...results.hits.map((hit) => hit.score), 0);
  return new Map(
    results.hits.map((hit) => [
      hit.document.id,
      maxScore > 0 ? Math.max(0.1, hit.score / maxScore) : 0.1,
    ]),
  );
}
