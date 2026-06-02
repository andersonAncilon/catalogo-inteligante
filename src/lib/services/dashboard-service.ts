import { notFound } from "@/lib/backend/errors";
import {
  createDefaultInsights,
  findBusinessById,
  getDashboardSignals,
  listInsights,
} from "@/lib/repositories/catalog-repository";
import type { Insight } from "@/types/domain";

export async function getDashboard(businessId: string) {
  const business = await findBusinessById(businessId);
  if (!business) throw notFound("Negócio não encontrado");

  const [signals, existingInsights] = await Promise.all([
    getDashboardSignals(businessId),
    listInsights(businessId),
  ]);
  const savedInsights = existingInsights.length ? existingInsights : await createDefaultInsights(businessId);
  const insights = [...buildLiveInsights(businessId, signals), ...savedInsights];

  return {
    business,
    metrics: {
      visits: signals.visits,
      searches: signals.searches,
      whatsappClicks: signals.whatsappClicks,
      leads: signals.leads,
      soldLeads: signals.soldLeads,
      leadConversionRate: signals.leads ? Math.round((signals.soldLeads / signals.leads) * 100) : 0,
      outOfStockProducts: signals.outOfStockProducts,
    },
    topProducts: signals.topProducts.slice(0, 3),
    weakSearches: signals.weakSearches,
    insights,
  };
}

type DashboardSignals = Awaited<ReturnType<typeof getDashboardSignals>>;

function buildLiveInsights(businessId: string, signals: DashboardSignals): Insight[] {
  const now = new Date().toISOString();
  const insights: Insight[] = [];

  if (signals.weakSearches.length) {
    insights.push({
      id: `${businessId}-weak-searches`,
      businessId,
      type: "search_no_result",
      title: "Buscas recentes sem encaixe forte",
      description: `Termos como "${signals.weakSearches[0]}" tiveram baixo match com o catálogo atual.`,
      impactLevel: "high",
      suggestedAction: "Cadastre alternativas nessa faixa ou ajuste descrição e atributos dos produtos existentes.",
      status: "new",
      createdAt: now,
    });
  }

  if (signals.outOfStockProducts > 0) {
    insights.push({
      id: `${businessId}-out-of-stock`,
      businessId,
      type: "stock_alert",
      title: "Há produtos sem estoque",
      description: `${signals.outOfStockProducts} produto(s) aparecem sem estoque ou com estoque zerado.`,
      impactLevel: "medium",
      suggestedAction: "Reponha estoque ou desative produtos indisponíveis para melhorar a recomendação.",
      status: "new",
      createdAt: now,
    });
  }

  if (signals.leads > 0 && signals.soldLeads === 0) {
    insights.push({
      id: `${businessId}-conversion`,
      businessId,
      type: "conversion_alert",
      title: "Leads ainda sem venda registrada",
      description: "Já existem leads, mas nenhuma venda marcada no painel.",
      impactLevel: "medium",
      suggestedAction: "Revise os leads recentes e registre vendas para medir conversão real.",
      status: "new",
      createdAt: now,
    });
  }

  return insights;
}
