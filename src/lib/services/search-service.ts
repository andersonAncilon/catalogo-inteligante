import { badRequest } from "@/lib/backend/errors";
import { createSearchSession, findBusinessBySlug, listPublicProducts } from "@/lib/repositories/catalog-repository";
import { interpretSearchQueryWithAI } from "@/lib/search/intent";
import { searchProductsWithOrama } from "@/lib/search/orama";
import { rankProducts } from "@/lib/search/ranking";
import { notFound } from "@/lib/backend/errors";

export async function searchStoreCatalog(storeSlug: string, query: string) {
  if (!query.trim()) {
    throw badRequest("Informe uma busca para encontrar produtos");
  }

  const business = await findBusinessBySlug(storeSlug);
  if (!business) {
    throw notFound("Loja não encontrada");
  }

  const interpretedQuery = await interpretSearchQueryWithAI(query);
  const products = await listPublicProducts(business.id);
  const textScores = await searchProductsWithOrama(products, query);
  const recommendations = rankProducts(products, interpretedQuery, { textScores });
  const searchSessionId = await createSearchSession({
    businessId: business.id,
    originalQuery: query,
    interpretedQuery,
    results: recommendations.slice(0, 10).map((item) => ({
      productId: item.product.id,
      rank: item.rank,
      score: item.score,
      matchReasons: item.matchReasons,
    })),
  });
  const hasIdealMatch = recommendations.some(
    (item) => item.product.stockQuantity > 0 && item.score >= 65,
  );

  return {
    business,
    originalQuery: query,
    searchSessionId,
    interpretedQuery,
    hasIdealMatch,
    recommendations,
  };
}
