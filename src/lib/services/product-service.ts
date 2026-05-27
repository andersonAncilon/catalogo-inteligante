import { z } from "zod";
import { badRequest, notFound } from "@/lib/backend/errors";
import {
  findBusinessById,
  findProductById,
  listPublicProducts,
  upsertProduct,
} from "@/lib/repositories/catalog-repository";

const productSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(0).default(0),
  stockQuantity: z.coerce.number().int().min(0).default(0),
  condition: z.enum(["new", "used", "refurbished"]).default("new"),
  status: z.enum(["active", "inactive", "out_of_stock", "draft"]).default("draft"),
  brand: z.string().optional(),
  category: z.string().optional(),
  attributes: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).default({}),
});

export async function getCatalog(businessId: string) {
  const business = await findBusinessById(businessId);
  if (!business) throw notFound("Negócio não encontrado");
  return {
    business,
    products: await listPublicProducts(businessId),
  };
}

export async function getProductForBusiness(businessId: string, productId: string) {
  const product = await findProductById(businessId, productId);
  if (!product) throw notFound("Produto não encontrado");
  return product;
}

export async function saveProduct(businessId: string, payload: unknown) {
  const business = await findBusinessById(businessId);
  if (!business) throw notFound("Negócio não encontrado");

  const parsed = productSchema.safeParse(payload);
  if (!parsed.success) throw badRequest(parsed.error.issues[0]?.message ?? "Dados inválidos");

  return upsertProduct(businessId, {
    ...parsed.data,
    currency: "BRL",
    businessId,
    searchText: `${parsed.data.title} ${parsed.data.description ?? ""} ${parsed.data.brand ?? ""}`,
  });
}
