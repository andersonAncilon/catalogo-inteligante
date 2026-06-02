import { z } from "zod";
import { badRequest, notFound } from "@/lib/backend/errors";
import { createLead, findBusinessBySlug, findProductById, listBusinessLeads } from "@/lib/repositories/catalog-repository";
import { interpretSearchQueryWithAI } from "@/lib/search/intent";

export const createLeadSchema = z.object({
  productId: z.string().optional(),
  searchSessionId: z.string().optional(),
  originalQuery: z.string().min(1),
  leadSource: z.enum(["store_search", "product_page", "whatsapp_click"]).default("store_search"),
  whatsappClicked: z.boolean().default(false),
});

export async function registerLead(storeSlug: string, payload: unknown) {
  const business = await findBusinessBySlug(storeSlug);
  if (!business) throw notFound("Loja não encontrada");

  const parsed = createLeadSchema.safeParse(payload);
  if (!parsed.success) {
    throw badRequest(parsed.error.issues[0]?.message ?? "Dados inválidos para lead");
  }

  if (parsed.data.productId) {
    const product = await findProductById(business.id, parsed.data.productId);
    if (!product) throw notFound("Produto não encontrado");
  }

  return createLead({
    businessId: business.id,
    searchSessionId: parsed.data.searchSessionId,
    productId: parsed.data.productId,
    originalQuery: parsed.data.originalQuery,
    interpretedQuery: await interpretSearchQueryWithAI(parsed.data.originalQuery),
    leadSource: parsed.data.leadSource,
    status: "new",
    whatsappClicked: parsed.data.whatsappClicked,
    converted: false,
  });
}

export async function listLeadsForBusiness(businessId: string) {
  return listBusinessLeads(businessId);
}
