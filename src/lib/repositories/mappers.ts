import type {
  AssistantActionStatus,
  Business as PrismaBusiness,
  BusinessStatus,
  ImportItemStatus,
  ImportSourceType,
  ImportStatus,
  Insight as PrismaInsight,
  InsightImpact,
  InsightStatus,
  InsightType,
  Lead as PrismaLead,
  LeadSource,
  LeadStatus,
  Product as PrismaProduct,
  ProductCondition,
  ProductImportBatch,
  ProductImportItem,
  ProductStatus,
} from "@prisma/client";
import type { Business, Insight, InterpretedQuery, Lead, Product } from "@/types/domain";

export function businessToDomain(business: PrismaBusiness): Business {
  return {
    id: business.id,
    ownerUserId: business.ownerUserId,
    name: business.name,
    slug: business.slug,
    description: business.description ?? "",
    whatsappNumber: business.whatsappNumber ?? "",
    instagramHandle: business.instagramHandle ?? "",
    publicUrl: business.publicUrl ?? `/${business.slug}`,
    status: businessStatusToDomain(business.status),
  };
}

export function productToDomain(product: PrismaProduct): Product {
  return {
    id: product.id,
    businessId: product.businessId,
    title: product.title,
    slug: product.slug ?? product.id,
    description: product.description ?? "",
    price: Number(product.price ?? 0),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    currency: "BRL",
    stockQuantity: product.stockQuantity,
    condition: productConditionToDomain(product.condition),
    status: productStatusToDomain(product.status),
    isFeatured: product.isFeatured,
    promotionLabel: product.promotionLabel ?? "",
    brand: product.brand ?? "",
    category: product.category ?? "",
    attributes: isRecord(product.attributes) ? product.attributes : {},
    searchText: product.searchText ?? "",
  };
}

export function leadToDomain(lead: PrismaLead): Lead {
  return {
    id: lead.id,
    businessId: lead.businessId,
    searchSessionId: lead.searchSessionId ?? undefined,
    productId: lead.productId ?? undefined,
    originalQuery: lead.originalQuery ?? "",
    interpretedQuery: isInterpretedQuery(lead.interpretedQuery)
      ? lead.interpretedQuery
      : {
          intent: "browse_catalog",
          category: null,
          maxPrice: null,
          minPrice: null,
          priorities: [],
          preferredBrands: [],
          excludedBrands: [],
          useCase: null,
          requiredAttributes: {},
          searchTerms: [],
        },
    leadSource: leadSourceToDomain(lead.leadSource),
    status: leadStatusToDomain(lead.status),
    whatsappClicked: lead.whatsappClicked,
    converted: lead.converted,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  };
}

export function insightToDomain(insight: PrismaInsight): Insight {
  return {
    id: insight.id,
    businessId: insight.businessId,
    type: insightTypeToDomain(insight.type),
    title: insight.title,
    description: insight.description,
    impactLevel: insightImpactToDomain(insight.impactLevel),
    suggestedAction: insight.suggestedAction ?? "",
    status: insightStatusToDomain(insight.status),
    createdAt: insight.createdAt.toISOString(),
  };
}

export type ImportBatchWithItems = ProductImportBatch & { items: ProductImportItem[] };

export function importBatchToDto(batch: ImportBatchWithItems) {
  return {
    id: batch.id,
    businessId: batch.businessId,
    sourceType: importSourceTypeToDomain(batch.sourceType),
    status: importStatusToDomain(batch.status),
    sourcePayload: batch.sourcePayload,
    items: batch.items.map((item) => ({
      id: item.id,
      rawContent: item.rawContent,
      detectedTitle: item.detectedTitle,
      detectedDescription: item.detectedDescription,
      detectedPrice: item.detectedPrice ? Number(item.detectedPrice) : null,
      detectedStockQuantity: item.detectedStockQuantity,
      detectedAttributes: item.detectedAttributes,
      confidenceScore: item.confidenceScore ? Number(item.confidenceScore) : null,
      status: importItemStatusToDomain(item.status),
    })),
  };
}

export function businessStatusToPrisma(status?: string): BusinessStatus {
  if (status === "active") return "ACTIVE";
  if (status === "inactive") return "INACTIVE";
  return "DRAFT";
}

export function productStatusToPrisma(status?: string): ProductStatus {
  if (status === "active") return "ACTIVE";
  if (status === "inactive") return "INACTIVE";
  if (status === "out_of_stock") return "OUT_OF_STOCK";
  return "DRAFT";
}

export function productConditionToPrisma(condition?: string): ProductCondition {
  if (condition === "used") return "USED";
  if (condition === "refurbished") return "REFURBISHED";
  return "NEW";
}

export function leadSourceToPrisma(source?: string): LeadSource {
  if (source === "product_page") return "PRODUCT_PAGE";
  if (source === "whatsapp_click") return "WHATSAPP_CLICK";
  return "STORE_SEARCH";
}

export function leadStatusToPrisma(status?: string): LeadStatus {
  if (status === "contacted") return "CONTACTED";
  if (status === "in_progress") return "IN_PROGRESS";
  if (status === "sold") return "SOLD";
  if (status === "lost") return "LOST";
  return "NEW";
}

export function assistantActionStatusToPrisma(status: "pending_confirmation" | "confirmed" | "cancelled" | "failed"): AssistantActionStatus {
  if (status === "confirmed") return "CONFIRMED";
  if (status === "cancelled") return "CANCELLED";
  if (status === "failed") return "FAILED";
  return "PENDING_CONFIRMATION";
}

export function importSourceTypeToPrisma(source?: string): ImportSourceType {
  if (source === "image") return "IMAGE";
  if (source === "pdf") return "PDF";
  if (source === "spreadsheet") return "SPREADSHEET";
  if (source === "instagram") return "INSTAGRAM";
  if (source === "whatsapp_export") return "WHATSAPP_EXPORT";
  return "PASTED_TEXT";
}

function businessStatusToDomain(status: BusinessStatus) {
  if (status === "ACTIVE") return "active";
  if (status === "INACTIVE") return "inactive";
  return "draft";
}

function productStatusToDomain(status: ProductStatus) {
  if (status === "ACTIVE") return "active";
  if (status === "INACTIVE") return "inactive";
  if (status === "OUT_OF_STOCK") return "out_of_stock";
  return "draft";
}

function productConditionToDomain(condition: ProductCondition) {
  if (condition === "USED") return "used";
  if (condition === "REFURBISHED") return "refurbished";
  return "new";
}

function leadSourceToDomain(source: LeadSource) {
  if (source === "PRODUCT_PAGE") return "product_page";
  if (source === "WHATSAPP_CLICK") return "whatsapp_click";
  return "store_search";
}

function leadStatusToDomain(status: LeadStatus) {
  if (status === "CONTACTED") return "contacted";
  if (status === "IN_PROGRESS") return "in_progress";
  if (status === "SOLD") return "sold";
  if (status === "LOST") return "lost";
  return "new";
}

function insightTypeToDomain(type: InsightType) {
  if (type === "STOCK_ALERT") return "stock_alert";
  if (type === "CONVERSION_ALERT") return "conversion_alert";
  if (type === "PRODUCT_OPPORTUNITY") return "product_opportunity";
  if (type === "SEARCH_NO_RESULT") return "search_no_result";
  return "demand_gap";
}

function insightImpactToDomain(impact: InsightImpact) {
  if (impact === "HIGH") return "high";
  if (impact === "LOW") return "low";
  return "medium";
}

function insightStatusToDomain(status: InsightStatus) {
  if (status === "VIEWED") return "viewed";
  if (status === "DISMISSED") return "dismissed";
  if (status === "RESOLVED") return "resolved";
  return "new";
}

function importSourceTypeToDomain(type: ImportSourceType) {
  if (type === "IMAGE") return "image";
  if (type === "PDF") return "pdf";
  if (type === "SPREADSHEET") return "spreadsheet";
  if (type === "INSTAGRAM") return "instagram";
  if (type === "WHATSAPP_EXPORT") return "whatsapp_export";
  return "pasted_text";
}

function importStatusToDomain(status: ImportStatus) {
  if (status === "COMPLETED") return "completed";
  if (status === "FAILED") return "failed";
  if (status === "NEEDS_REVIEW") return "needs_review";
  return "processing";
}

function importItemStatusToDomain(status: ImportItemStatus) {
  if (status === "APPROVED") return "approved";
  if (status === "REJECTED") return "rejected";
  if (status === "PUBLISHED") return "published";
  return "pending_review";
}

function isRecord(value: unknown): value is Record<string, string | number | boolean | null> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isInterpretedQuery(value: unknown): value is InterpretedQuery {
  return isRecord(value) && typeof value.intent === "string";
}
