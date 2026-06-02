import { prisma } from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";
import type { DetectedImportItem } from "@/lib/ai/catalog-import";
import type { Business, Lead, Product } from "@/types/domain";
import {
  assistantActionStatusToPrisma,
  businessStatusToPrisma,
  businessToDomain,
  importBatchToDto,
  importSourceTypeToPrisma,
  insightToDomain,
  leadSourceToPrisma,
  leadStatusToPrisma,
  leadToDomain,
  productConditionToPrisma,
  productStatusToPrisma,
  productToDomain,
} from "./mappers";

export async function listBusinesses(userId: string): Promise<Business[]> {
  const businesses = await prisma.business.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return businesses.map(businessToDomain);
}

export async function createBusiness(input: {
  ownerUserId: string;
  name: string;
  slug: string;
  description?: string;
  whatsappNumber?: string;
  instagramHandle?: string;
}) {
  const business = await prisma.business.create({
    data: {
      ownerUserId: input.ownerUserId,
      name: input.name,
      slug: input.slug,
      description: input.description,
      whatsappNumber: input.whatsappNumber,
      instagramHandle: input.instagramHandle,
      publicUrl: `/${input.slug}`,
      status: "ACTIVE",
      members: {
        create: {
          userId: input.ownerUserId,
          role: "OWNER",
          scopes: ["*"],
        },
      },
    },
  });
  return businessToDomain(business);
}

export async function findBusinessBySlug(slug: string): Promise<Business | null> {
  const business = await prisma.business.findUnique({ where: { slug } });
  return business ? businessToDomain(business) : null;
}

export async function findBusinessById(businessId: string): Promise<Business | null> {
  const business = await prisma.business.findUnique({ where: { id: businessId } });
  return business ? businessToDomain(business) : null;
}

export async function updateBusiness(
  businessId: string,
  input: Partial<Pick<Business, "name" | "slug" | "description" | "whatsappNumber" | "instagramHandle" | "status">>,
) {
  const business = await prisma.business.update({
    where: { id: businessId },
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description,
      whatsappNumber: input.whatsappNumber,
      instagramHandle: input.instagramHandle,
      publicUrl: input.slug ? `/${input.slug}` : undefined,
      status: input.status ? businessStatusToPrisma(input.status) : undefined,
    },
  });
  return businessToDomain(business);
}

export async function listPublicProducts(businessId: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      businessId,
      status: { in: ["ACTIVE", "OUT_OF_STOCK"] },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
  return products.map(productToDomain);
}

export async function listCatalogProducts(businessId: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { businessId },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
  return products.map(productToDomain);
}

export async function listActiveProducts(businessId: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { businessId, status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
  });
  return products.map(productToDomain);
}

export async function findProductBySlug(businessId: string, slug: string): Promise<Product | null> {
  const product = await prisma.product.findFirst({
    where: { businessId, slug },
  });
  return product ? productToDomain(product) : null;
}

export async function findProductById(businessId: string, productId: string): Promise<Product | null> {
  const product = await prisma.product.findFirst({
    where: { businessId, id: productId },
  });
  return product ? productToDomain(product) : null;
}

export async function upsertProduct(
  businessId: string,
  input: Partial<Product> & Pick<Product, "title"> & { id?: string },
) {
  const slug = input.slug ?? slugify(input.title);
  const data = {
    title: input.title,
    slug,
    description: input.description,
    price: input.price,
    compareAtPrice: input.compareAtPrice,
    stockQuantity: input.stockQuantity,
    condition: productConditionToPrisma(input.condition),
    status: productStatusToPrisma(input.status),
    isFeatured: input.isFeatured ?? false,
    promotionLabel: input.promotionLabel,
    brand: input.brand,
    category: input.category,
    attributes: input.attributes ?? {},
    searchText: input.searchText ?? `${input.title} ${input.description ?? ""}`,
  };

  const product = input.id
    ? await prisma.product.update({
        where: { id: input.id },
        data,
      })
    : await prisma.product.create({
        data: {
          ...data,
          businessId,
          currency: "BRL",
        },
      });

  await recordAnalyticsEvent(businessId, input.id ? "product_edited" : "product_created", "product", product.id);
  return productToDomain(product);
}

export async function listBusinessLeads(businessId: string): Promise<Lead[]> {
  const leads = await prisma.lead.findMany({
    where: { businessId },
    orderBy: { createdAt: "desc" },
  });
  return leads.map(leadToDomain);
}

export async function findLeadById(businessId: string, leadId: string): Promise<Lead | null> {
  const lead = await prisma.lead.findFirst({
    where: { businessId, id: leadId },
  });
  return lead ? leadToDomain(lead) : null;
}

export async function createLead(input: Omit<Lead, "id" | "createdAt" | "updatedAt">): Promise<Lead> {
  const lead = await prisma.lead.create({
    data: {
      businessId: input.businessId,
      searchSessionId: input.searchSessionId,
      productId: input.productId,
      originalQuery: input.originalQuery,
      interpretedQuery: toJson(input.interpretedQuery),
      leadSource: leadSourceToPrisma(input.leadSource),
      status: leadStatusToPrisma(input.status),
      whatsappClicked: input.whatsappClicked,
      converted: input.converted,
    },
  });
  await recordAnalyticsEvent(input.businessId, "lead_created", "lead", lead.id);
  return leadToDomain(lead);
}

export async function updateLeadStatus(businessId: string, leadId: string, status: Lead["status"]) {
  const converted = status === "sold";
  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: {
      status: leadStatusToPrisma(status),
      converted,
      convertedAt: converted ? new Date() : null,
    },
  });
  await recordAnalyticsEvent(businessId, converted ? "sale_marked" : "lead_updated", "lead", lead.id);
  return leadToDomain(lead);
}

export async function createSearchSession(input: {
  businessId: string;
  originalQuery: string;
  interpretedQuery: unknown;
  results: Array<{ productId: string; rank: number; score: number; matchReasons: string[] }>;
}) {
  const session = await prisma.searchSession.create({
    data: {
      businessId: input.businessId,
      originalQuery: input.originalQuery,
      interpretedQuery: toJson(input.interpretedQuery),
      results: {
        create: input.results.map((result) => ({
          businessId: input.businessId,
          productId: result.productId,
          rank: result.rank,
          score: result.score,
          matchReasons: result.matchReasons,
        })),
      },
    },
  });
  await recordAnalyticsEvent(input.businessId, "search_performed", "search_session", session.id, {
    query: input.originalQuery,
  });
  return session.id;
}

export async function listInsights(businessId: string) {
  const insights = await prisma.insight.findMany({
    where: { businessId },
    orderBy: [{ impactLevel: "desc" }, { createdAt: "desc" }],
  });
  return insights.map(insightToDomain);
}

export async function getDashboardSignals(businessId: string) {
  const [visits, searches, whatsappClicks, leads, soldLeads, outOfStockProducts, topSearchResults, recentSearches] =
    await Promise.all([
      prisma.analyticsEvent.count({ where: { businessId, eventName: "store_viewed" } }),
      prisma.searchSession.count({ where: { businessId } }),
      prisma.lead.count({ where: { businessId, whatsappClicked: true } }),
      prisma.lead.count({ where: { businessId } }),
      prisma.lead.count({ where: { businessId, status: "SOLD" } }),
      prisma.product.count({ where: { businessId, stockQuantity: { lte: 0 }, status: { not: "INACTIVE" } } }),
      prisma.searchResult.groupBy({
        by: ["productId"],
        where: { businessId },
        _count: { productId: true },
        orderBy: { _count: { productId: "desc" } },
        take: 5,
      }),
      prisma.searchSession.findMany({
        where: { businessId },
        orderBy: { createdAt: "desc" },
        take: 50,
        include: { results: true },
      }),
    ]);

  const topProductIds = topSearchResults.map((item) => item.productId);
  const products = topProductIds.length
    ? await prisma.product.findMany({ where: { businessId, id: { in: topProductIds } } })
    : await prisma.product.findMany({ where: { businessId, status: { not: "INACTIVE" } }, take: 3 });
  const productById = new Map(products.map((product) => [product.id, productToDomain(product)]));

  return {
    visits,
    searches,
    whatsappClicks,
    leads,
    soldLeads,
    outOfStockProducts,
    topProducts: topProductIds.length
      ? topProductIds.flatMap((productId) => {
          const product = productById.get(productId);
          return product ? [product] : [];
        })
      : products.map(productToDomain),
    weakSearches: recentSearches
      .filter((session) => {
        const bestScore = Math.max(...session.results.map((result) => Number(result.score ?? 0)), 0);
        return bestScore < 65;
      })
      .slice(0, 5)
      .map((session) => session.originalQuery),
  };
}

export async function createDefaultInsights(businessId: string) {
  const count = await prisma.insight.count({ where: { businessId } });
  if (count > 0) return listInsights(businessId);

  await prisma.insight.createMany({
    data: [
      {
        businessId,
        type: "DEMAND_GAP",
        title: "Clientes querem opções até R$1500",
        description: "Assim que as buscas forem registradas, este insight passa a refletir demanda real.",
        impactLevel: "MEDIUM",
        suggestedAction: "Cadastre produtos de entrada e acompanhe buscas sem resultado.",
      },
      {
        businessId,
        type: "STOCK_ALERT",
        title: "Estoque baixo merece atenção",
        description: "Produtos sem estoque deixam de ser priorizados como melhor recomendação.",
        impactLevel: "MEDIUM",
        suggestedAction: "Mantenha o estoque atualizado no catálogo.",
      },
    ],
  });

  return listInsights(businessId);
}

export async function createImportBatch(input: {
  businessId: string;
  sourceType: string;
  rawContent?: string;
  detectedItems?: DetectedImportItem[];
}) {
  const lines = (input.rawContent ?? "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const detectedItems: DetectedImportItem[] =
    input.detectedItems?.length
      ? input.detectedItems.map(normalizeDetectedImportItem)
      : (lines.length ? lines : ["Samsung S20 FE - R$1799", "iPhone 11 - R$2100"]).map((line) => ({
          rawContent: line,
          detectedTitle: line.split("-")[0]?.trim() || line,
          detectedPrice: parsePrice(line),
          detectedStockQuantity: parseStockQuantity(line),
          detectedBrand: detectBrand(line),
          detectedAttributes: normalizeDetectedAttributes({
            brand: detectBrand(line),
            ...detectSmartphoneAttributes(line),
          }),
          confidenceScore: 0.72,
        })).map(normalizeDetectedImportItem);

  const batch = await prisma.productImportBatch.create({
    data: {
      businessId: input.businessId,
      sourceType: importSourceTypeToPrisma(input.sourceType),
      sourcePayload: { rawContent: input.rawContent ?? "" },
      status: "NEEDS_REVIEW",
      items: {
        create: detectedItems.map((item) => ({
          businessId: input.businessId,
          rawContent: item.rawContent,
          detectedTitle: item.detectedTitle,
          detectedDescription: item.detectedDescription,
          detectedPrice: item.detectedPrice,
          detectedStockQuantity: item.detectedStockQuantity,
          detectedAttributes: normalizeDetectedAttributes({
            ...item.detectedAttributes,
            brand: item.detectedBrand ?? item.detectedAttributes?.brand ?? detectBrand(`${item.detectedTitle} ${item.rawContent ?? ""}`),
          }),
          confidenceScore: item.confidenceScore ?? 0.72,
          status: "PENDING_REVIEW",
        })),
      },
    },
    include: { items: true },
  });
  await recordAnalyticsEvent(input.businessId, "import_started", "product_import_batch", batch.id);
  return importBatchToDto(batch);
}

export async function getLatestImportBatch(businessId: string) {
  const batch = await prisma.productImportBatch.findFirst({
    where: { businessId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
  return batch ? importBatchToDto(batch) : null;
}

export async function publishImportBatch(businessId: string, batchId: string) {
  const batch = await prisma.productImportBatch.findFirst({
    where: { id: batchId, businessId },
    include: { items: true },
  });
  if (!batch) return null;

  for (const item of batch.items) {
    if (!item.detectedTitle) continue;
    const detectedAttributes = isDetectedAttributes(item.detectedAttributes) ? item.detectedAttributes : {};
    const brand = getStringAttribute(detectedAttributes, "brand") ?? detectBrand(`${item.detectedTitle} ${item.rawContent ?? ""}`);
    const attributes = stripEmptyAttributes({
      ...detectedAttributes,
      brand: undefined,
      condition: undefined,
    });

    await upsertProduct(businessId, {
      title: item.detectedTitle,
      description: item.detectedDescription ?? item.rawContent ?? "",
      price: item.detectedPrice ? Number(item.detectedPrice) : 0,
      stockQuantity: item.detectedStockQuantity ?? 0,
      condition: "used",
      status: "active",
      brand,
      category: "smartphone",
      attributes,
    });
  }

  const updated = await prisma.productImportBatch.update({
    where: { id: batchId },
    data: {
      status: "COMPLETED",
      items: { updateMany: { where: {}, data: { status: "PUBLISHED" } } },
    },
    include: { items: true },
  });
  await recordAnalyticsEvent(businessId, "import_completed", "product_import_batch", batchId);
  return importBatchToDto(updated);
}

export async function createAssistantAction(input: {
  businessId: string;
  rawCommand: string;
  interpretedAction: unknown;
  status: "pending_confirmation" | "confirmed" | "cancelled" | "failed";
  result?: unknown;
}) {
  return prisma.assistantAction.create({
    data: {
      businessId: input.businessId,
      rawCommand: input.rawCommand,
      interpretedAction: toJson(input.interpretedAction),
      status: assistantActionStatusToPrisma(input.status),
      result: input.result === undefined ? undefined : toJson(input.result),
    },
  });
}

export async function confirmAssistantAction(businessId: string, actionId: string) {
  const action = await prisma.assistantAction.findFirst({
    where: { id: actionId, businessId, status: "PENDING_CONFIRMATION" },
  });
  if (!action) return null;

  const interpretedAction = action.interpretedAction as {
    action?: string;
    productMatch?: { productId?: string; title?: string };
    quantity?: number;
    quantityDelta?: number;
    suggestedLead?: { id?: string } | null;
  } | null;

  const productId = interpretedAction?.productMatch?.productId;
  if (!productId) {
    return prisma.assistantAction.update({
      where: { id: action.id },
      data: {
        status: "FAILED",
        result: { message: "Não foi possível confirmar sem produto identificado." },
      },
    });
  }

  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findFirst({ where: { id: productId, businessId } });
    if (!product) {
      return tx.assistantAction.update({
        where: { id: action.id },
        data: {
          status: "FAILED",
          result: { message: "Produto não encontrado para executar a ação." },
        },
      });
    }

    const quantityDelta = getAssistantQuantityDelta(interpretedAction);
    const previousStock = product.stockQuantity;
    const newStock = Math.max(0, previousStock + quantityDelta);
    const leadId = interpretedAction?.suggestedLead?.id;

    await tx.product.update({
      where: { id: product.id },
      data: {
        stockQuantity: newStock,
        status: newStock > 0 ? product.status : "OUT_OF_STOCK",
      },
    });

    if (leadId && interpretedAction?.action === "register_sale") {
      await tx.lead.updateMany({
        where: { id: leadId, businessId },
        data: { status: "SOLD", converted: true, convertedAt: new Date() },
      });
    }

    await tx.inventoryEvent.create({
      data: {
        businessId,
        productId: product.id,
        leadId: leadId ?? undefined,
        eventType: interpretedAction?.action === "register_sale" ? "SALE" : "RESTOCK",
        quantityDelta,
        previousStock,
        newStock,
        source: "ASSISTANT",
        notes: action.rawCommand,
      },
    });

    await tx.analyticsEvent.create({
      data: {
        businessId,
        eventName: interpretedAction?.action === "register_sale" ? "assistant_sale_confirmed" : "assistant_stock_confirmed",
        entityType: "assistant_action",
        entityId: action.id,
      },
    });

    return tx.assistantAction.update({
      where: { id: action.id },
      data: {
        status: "CONFIRMED",
        result: {
          message:
            interpretedAction?.action === "register_sale"
              ? `Venda registrada e estoque atualizado para ${newStock}.`
              : `Estoque atualizado para ${newStock}.`,
          productId: product.id,
          previousStock,
          newStock,
        },
      },
    });
  });
}

function getAssistantQuantityDelta(action: {
  action?: string;
  quantity?: number;
  quantityDelta?: number;
} | null) {
  if (action?.quantityDelta) return action.quantityDelta;
  const quantity = Math.max(1, action?.quantity ?? 1);
  return action?.action === "register_sale" ? -quantity : quantity;
}

export async function recordAnalyticsEvent(
  businessId: string,
  eventName: string,
  entityType?: string,
  entityId?: string,
  metadata?: unknown,
) {
  return prisma.analyticsEvent.create({
    data: {
      businessId,
      eventName,
      entityType,
      entityId,
      metadata: metadata && typeof metadata === "object" ? toJson(metadata) : undefined,
    },
  });
}

export async function clearDatabase() {
  await prisma.$transaction([
    prisma.analyticsEvent.deleteMany(),
    prisma.assistantAction.deleteMany(),
    prisma.inventoryEvent.deleteMany(),
    prisma.lead.deleteMany(),
    prisma.searchResult.deleteMany(),
    prisma.searchSession.deleteMany(),
    prisma.productImportItem.deleteMany(),
    prisma.productImportBatch.deleteMany(),
    prisma.insight.deleteMany(),
    prisma.product.deleteMany(),
    prisma.businessMember.deleteMany(),
    prisma.business.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parsePrice(value: string) {
  const currencyMatch = value.match(/r\$\s*(\d[\d.]*(?:,\d{2})?)/i);
  const rawPrice = currencyMatch?.[1] ?? value.match(/\b\d{3,}(?:[.,]\d{2})?\b/g)?.at(-1);
  if (!rawPrice) return undefined;

  return Number(rawPrice.replace(/\./g, "").replace(",", "."));
}

function parseStockQuantity(value: string) {
  const match = value.match(/(?:estoque|qtd|quantidade|unidades?)\s*:?\s*(\d{1,4})/i);
  return match ? Number(match[1]) : undefined;
}

function normalizeDetectedImportItem(item: DetectedImportItem): DetectedImportItem {
  const text = `${item.detectedTitle} ${item.detectedDescription ?? ""} ${item.rawContent ?? ""}`;
  const detectedBrand = item.detectedBrand ?? getStringAttribute(item.detectedAttributes, "brand") ?? detectBrand(text);

  return {
    ...item,
    detectedBrand,
    detectedAttributes: normalizeDetectedAttributes({
      ...detectSmartphoneAttributes(text),
      ...item.detectedAttributes,
      brand: detectedBrand,
    }),
  };
}

function detectBrand(value: string) {
  const normalized = normalizeText(value);
  const brands: Array<[string, string[]]> = [
    ["Apple", ["apple", "iphone"]],
    ["Samsung", ["samsung", "galaxy"]],
    ["Motorola", ["motorola", "moto g", "moto e", "moto edge", "moto "]],
    ["Xiaomi", ["xiaomi", "redmi", "poco"]],
    ["Realme", ["realme"]],
    ["Asus", ["asus", "zenfone", "rog phone"]],
    ["LG", ["lg"]],
    ["Nokia", ["nokia"]],
  ];

  return brands.find(([, terms]) => terms.some((term) => normalized.includes(term)))?.[0] ?? undefined;
}

function detectSmartphoneAttributes(value: string) {
  const normalized = normalizeText(value);
  const storageMatch = normalized.match(/\b(32|64|128|256|512)\s*gb\b/);
  const ramMatch = normalized.match(/\b(2|3|4|6|8|12|16)\s*gb\s*(?:ram)?\b/);
  const batteryMatch = normalized.match(/\b([3-7]\d{3})\s*mah\b/);
  const cameraMatch = normalized.match(/\b(\d{2,3})\s*mp\b/);

  return stripEmptyAttributes({
    storage_gb: storageMatch ? Number(storageMatch[1]) : undefined,
    ram_gb: ramMatch && ramMatch[1] !== storageMatch?.[1] ? Number(ramMatch[1]) : undefined,
    battery_mah: batteryMatch ? Number(batteryMatch[1]) : undefined,
    camera_mp: cameraMatch ? Number(cameraMatch[1]) : undefined,
  });
}

function normalizeDetectedAttributes(value: unknown) {
  return stripEmptyAttributes(isDetectedAttributes(value) ? value : {});
}

function stripEmptyAttributes(value: Record<string, string | number | boolean | null | undefined>) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== null && item !== undefined && item !== ""),
  ) as Record<string, string | number | boolean>;
}

function isDetectedAttributes(value: unknown): value is Record<string, string | number | boolean | null | undefined> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getStringAttribute(value: unknown, key: string) {
  if (!isDetectedAttributes(value)) return undefined;
  const attribute = value[key];
  return typeof attribute === "string" && attribute.trim() ? attribute : undefined;
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function toJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}
