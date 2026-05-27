import { z } from "zod";
import { badRequest, notFound } from "@/lib/backend/errors";
import { createBusiness, findBusinessById, listBusinesses, updateBusiness } from "@/lib/repositories/catalog-repository";

const businessSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  whatsappNumber: z.string().optional(),
  instagramHandle: z.string().optional(),
});

const updateBusinessSchema = businessSchema.partial().extend({
  status: z.enum(["active", "inactive", "draft"]).optional(),
});

export async function getBusinesses() {
  return listBusinesses();
}

export async function registerBusiness(payload: unknown) {
  const parsed = businessSchema.safeParse(payload);
  if (!parsed.success) throw badRequest(parsed.error.issues[0]?.message ?? "Dados inválidos");
  return createBusiness(parsed.data);
}

export async function getBusinessSettings(businessId: string) {
  const business = await findBusinessById(businessId);
  if (!business) throw notFound("Negócio não encontrado");
  return business;
}

export async function saveBusinessSettings(businessId: string, payload: unknown) {
  const parsed = updateBusinessSchema.safeParse(payload);
  if (!parsed.success) throw badRequest(parsed.error.issues[0]?.message ?? "Dados inválidos");
  return updateBusiness(businessId, parsed.data);
}
