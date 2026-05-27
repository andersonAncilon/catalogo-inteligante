import { notFound } from "@/lib/backend/errors";
import {
  createDefaultInsights,
  findBusinessById,
  listBusinessLeads,
  listInsights,
  listPublicProducts,
} from "@/lib/repositories/catalog-repository";

export async function getDashboard(businessId: string) {
  const business = await findBusinessById(businessId);
  if (!business) throw notFound("Negócio não encontrado");

  const [products, leads, existingInsights] = await Promise.all([
    listPublicProducts(businessId),
    listBusinessLeads(businessId),
    listInsights(businessId),
  ]);
  const insights = existingInsights.length ? existingInsights : await createDefaultInsights(businessId);
  const soldLeads = leads.filter((lead) => lead.status === "sold").length;

  return {
    business,
    metrics: {
      visits: 0,
      searches: 0,
      whatsappClicks: leads.filter((lead) => lead.whatsappClicked).length,
      leads: leads.length,
      soldLeads,
      leadConversionRate: leads.length ? Math.round((soldLeads / leads.length) * 100) : 0,
      outOfStockProducts: products.filter((product) => product.stockQuantity <= 0).length,
    },
    topProducts: products.slice(0, 3),
    insights,
  };
}
