export type BusinessStatus = "active" | "inactive" | "draft";
export type ProductStatus = "active" | "inactive" | "out_of_stock" | "draft";
export type ProductCondition = "new" | "used" | "refurbished";
export type LeadStatus = "new" | "contacted" | "in_progress" | "sold" | "lost";
export type InsightImpact = "low" | "medium" | "high";

export type Business = {
  id: string;
  ownerUserId: string;
  name: string;
  slug: string;
  description: string;
  whatsappNumber: string;
  instagramHandle: string;
  publicUrl: string;
  status: BusinessStatus;
};

export type Product = {
  id: string;
  businessId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: "BRL";
  stockQuantity: number;
  condition: ProductCondition;
  status: ProductStatus;
  brand: string;
  category: string;
  attributes: Record<string, string | number | boolean | null>;
  searchText: string;
};

export type InterpretedQuery = {
  intent: "buy_smartphone" | "browse_catalog";
  category: string | null;
  maxPrice: number | null;
  minPrice: number | null;
  priorities: string[];
  preferredBrands: string[];
  excludedBrands: string[];
  useCase: string | null;
};

export type SearchRecommendation = {
  product: Product;
  rank: number;
  score: number;
  matchReasons: string[];
};

export type Lead = {
  id: string;
  businessId: string;
  searchSessionId?: string;
  productId?: string;
  originalQuery: string;
  interpretedQuery: InterpretedQuery;
  leadSource: "store_search" | "product_page" | "whatsapp_click";
  status: LeadStatus;
  whatsappClicked: boolean;
  converted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Insight = {
  id: string;
  businessId: string;
  type: "demand_gap" | "stock_alert" | "conversion_alert" | "product_opportunity" | "search_no_result";
  title: string;
  description: string;
  impactLevel: InsightImpact;
  suggestedAction: string;
  status: "new" | "viewed" | "dismissed" | "resolved";
  createdAt: string;
};

export type DashboardMetrics = {
  visits: number;
  searches: number;
  whatsappClicks: number;
  leads: number;
  soldLeads: number;
  leadConversionRate: number;
  outOfStockProducts: number;
};
