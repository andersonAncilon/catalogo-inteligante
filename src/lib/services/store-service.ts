import { notFound } from "@/lib/backend/errors";
import {
  findBusinessBySlug,
  findProductBySlug,
  listPublicProducts,
  recordAnalyticsEvent,
} from "@/lib/repositories/catalog-repository";

export async function getPublicStore(slug: string) {
  const business = await findBusinessBySlug(slug);
  if (!business || business.status !== "active") {
    throw notFound("Loja não encontrada");
  }

  const products = await listPublicProducts(business.id);
  await recordAnalyticsEvent(business.id, "store_viewed", "business", business.id);
  return { business, products };
}

export async function getPublicProduct(storeSlug: string, productSlug: string) {
  const { business, products } = await getPublicStore(storeSlug);
  const product = await findProductBySlug(business.id, productSlug);
  if (!product || product.status === "inactive") {
    throw notFound("Produto não encontrado");
  }

  return {
    business,
    product,
    similarProducts: products.filter((item) => item.id !== product.id).slice(0, 3),
  };
}
