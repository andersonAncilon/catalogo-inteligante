import { prisma } from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";
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

const DEV_USER_EMAIL = "dev@catalogo-inteligente.local";

export async function ensureDevUser() {
  return prisma.user.upsert({
    where: { email: DEV_USER_EMAIL },
    update: {},
    create: {
      email: DEV_USER_EMAIL,
      name: "Usuário Dev",
    },
  });
}

export async function listBusinesses(): Promise<Business[]> {
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: "desc" },
  });
  return businesses.map(businessToDomain);
}

export async function createBusiness(input: {
  name: string;
  slug: string;
  description?: string;
  whatsappNumber?: string;
  instagramHandle?: string;
}) {
  const user = await ensureDevUser();
  const business = await prisma.business.create({
    data: {
      ownerUserId: user.id,
      name: input.name,
      slug: input.slug,
      description: input.description,
      whatsappNumber: input.whatsappNumber,
      instagramHandle: input.instagramHandle,
      publicUrl: `/${input.slug}`,
      status: "ACTIVE",
      members: {
        create: {
          userId: user.id,
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
      status: { not: "INACTIVE" },
    },
    orderBy: { createdAt: "desc" },
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
    stockQuantity: input.stockQuantity,
    condition: productConditionToPrisma(input.condition),
    status: productStatusToPrisma(input.status),
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
}) {
  const lines = (input.rawContent ?? "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const batch = await prisma.productImportBatch.create({
    data: {
      businessId: input.businessId,
      sourceType: importSourceTypeToPrisma(input.sourceType),
      sourcePayload: { rawContent: input.rawContent ?? "" },
      status: "NEEDS_REVIEW",
      items: {
        create: (lines.length ? lines : ["Samsung S20 FE - R$1799", "iPhone 11 - R$2100"]).map((line) => ({
          businessId: input.businessId,
          rawContent: line,
          detectedTitle: line.split("-")[0]?.trim() || line,
          detectedPrice: parsePrice(line),
          confidenceScore: 0.72,
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
    await upsertProduct(businessId, {
      title: item.detectedTitle,
      description: item.detectedDescription ?? item.rawContent ?? "",
      price: item.detectedPrice ? Number(item.detectedPrice) : 0,
      stockQuantity: item.detectedStockQuantity ?? 0,
      condition: "used",
      status: "active",
      category: "smartphone",
      attributes: {},
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
  const match = value.match(/(?:r\$\s*)?(\d[\d.]*)/i);
  return match ? Number(match[1].replace(/\./g, "")) : undefined;
}

function toJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}
