import { z } from "zod";
import { extractCatalogItems } from "@/lib/ai/catalog-import";
import { badRequest, notFound } from "@/lib/backend/errors";
import {
  createImportBatch,
  findBusinessById,
  getLatestImportBatch,
  publishImportBatch,
} from "@/lib/repositories/catalog-repository";

const importSchema = z.object({
  sourceType: z.enum(["pasted_text", "image", "pdf", "spreadsheet", "instagram", "whatsapp_export"]).default("pasted_text"),
  rawContent: z.string().optional(),
});

export async function startImport(businessId: string, payload: unknown) {
  const business = await findBusinessById(businessId);
  if (!business) throw notFound("Negócio não encontrado");
  const parsed = importSchema.safeParse(payload);
  if (!parsed.success) throw badRequest(parsed.error.issues[0]?.message ?? "Dados inválidos");
  const detectedItems = parsed.data.rawContent ? await extractCatalogItems(parsed.data.rawContent) : null;
  return createImportBatch({ businessId, ...parsed.data, detectedItems: detectedItems ?? undefined });
}

export async function getReviewImport(businessId: string) {
  const business = await findBusinessById(businessId);
  if (!business) throw notFound("Negócio não encontrado");
  return {
    business,
    batch: await getLatestImportBatch(businessId),
  };
}

export async function publishImport(businessId: string, batchId: string) {
  const batch = await publishImportBatch(businessId, batchId);
  if (!batch) throw notFound("Importação não encontrada");
  return batch;
}
