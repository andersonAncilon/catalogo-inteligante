import type { InterpretedQuery } from "@/types/domain";
import { generateJsonWithOpenAI } from "@/lib/ai/openai";

const moneyPattern = /(?:r\$\s*)?(\d[\d.\s]*)(?:,\d{2})?/i;

export function interpretSearchQuery(query: string): InterpretedQuery {
  const normalized = query.toLowerCase();
  const priceMatch = normalized.match(/(?:até|abaixo de|menos de|no máximo|maximo|máximo)\s*(?:r\$\s*)?(\d[\d.\s]*)/);
  const minPriceMatch = normalized.match(/(?:a partir de|acima de|mais de)\s*(?:r\$\s*)?(\d[\d.\s]*)/);
  const fallbackMoney = normalized.match(moneyPattern);
  const maxPrice = priceMatch?.[1] ?? (normalized.includes("barato") ? fallbackMoney?.[1] : undefined);
  const storageMatch = normalized.match(/\b(32|64|128|256|512)\s*gb\b/);
  const ramMatch = normalized.match(/\b(4|6|8|12|16)\s*gb\s*(?:de\s*)?(?:ram|mem[oó]ria)\b/);

  const priorities = [
    normalized.includes("câmera") || normalized.includes("camera") || normalized.includes("foto") ? "camera" : null,
    normalized.includes("bateria") ? "battery" : null,
    normalized.includes("jogo") || normalized.includes("games") ? "performance" : null,
    normalized.includes("memória") || normalized.includes("memoria") || normalized.includes("armazenamento") ? "storage" : null,
    normalized.includes("barato") || normalized.includes("custo") ? "price" : null,
  ].filter(Boolean) as string[];

  const preferredBrands = [
    normalized.includes("iphone") || normalized.includes("apple") ? "Apple" : null,
    normalized.includes("samsung") || normalized.includes("galaxy") ? "Samsung" : null,
    normalized.includes("motorola") || normalized.includes("moto") ? "Motorola" : null,
    normalized.includes("xiaomi") || normalized.includes("redmi") || normalized.includes("poco") ? "Xiaomi" : null,
  ].filter(Boolean) as string[];

  const excludedBrands = [
    normalized.includes("sem iphone") || normalized.includes("menos iphone") || normalized.includes("não quero iphone") ? "Apple" : null,
    normalized.includes("sem samsung") || normalized.includes("menos samsung") || normalized.includes("não quero samsung") ? "Samsung" : null,
    normalized.includes("sem motorola") || normalized.includes("menos motorola") || normalized.includes("não quero motorola") ? "Motorola" : null,
  ].filter(Boolean) as string[];

  return {
    intent: normalized.includes("celular") || normalized.includes("iphone") || normalized.includes("smartphone")
      ? "buy_smartphone"
      : "browse_catalog",
    category: "smartphone",
    maxPrice: maxPrice ? Number(maxPrice.replace(/[.\s]/g, "")) : null,
    minPrice: minPriceMatch?.[1] ? Number(minPriceMatch[1].replace(/[.\s]/g, "")) : null,
    priorities,
    preferredBrands,
    excludedBrands,
    useCase: normalized.includes("jogo") || normalized.includes("games") ? "gaming" : null,
    requiredAttributes: {
      ...(storageMatch?.[1] ? { storage_gb: Number(storageMatch[1]) } : {}),
      ...(ramMatch?.[1] ? { ram_gb: Number(ramMatch[1]) } : {}),
    },
    searchTerms: normalized
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((term) => term.length > 2 && !["quero", "celular", "smartphone", "para", "com"].includes(term)),
  };
}

export async function interpretSearchQueryWithAI(query: string): Promise<InterpretedQuery> {
  const fallback = interpretSearchQuery(query);
  const aiResult = await generateJsonWithOpenAI<Partial<InterpretedQuery>>({
    schemaName: "catalog_search_intent",
    schema: {
      type: "object",
      properties: {
        intent: { type: "string", enum: ["buy_smartphone", "browse_catalog"] },
        category: { type: ["string", "null"] },
        maxPrice: { type: ["number", "null"] },
        minPrice: { type: ["number", "null"] },
        priorities: { type: "array", items: { type: "string" } },
        preferredBrands: { type: "array", items: { type: "string" } },
        excludedBrands: { type: "array", items: { type: "string" } },
        useCase: { type: ["string", "null"] },
        requiredAttributes: {
          type: "object",
          properties: {
            storage_gb: { type: ["number", "null"] },
            ram_gb: { type: ["number", "null"] },
            battery_mah: { type: ["number", "null"] },
            camera_mp: { type: ["number", "null"] },
            network: { type: ["string", "null"] },
          },
          required: ["storage_gb", "ram_gb", "battery_mah", "camera_mp", "network"],
          additionalProperties: false,
        },
        searchTerms: { type: "array", items: { type: "string" } },
      },
      required: [
        "intent",
        "category",
        "maxPrice",
        "minPrice",
        "priorities",
        "preferredBrands",
        "excludedBrands",
        "useCase",
        "requiredAttributes",
        "searchTerms",
      ],
      additionalProperties: false,
    },
    prompt: [
      "Interprete a busca de cliente para uma vitrine de smartphones e pequenos eletrônicos.",
      "Responda apenas com JSON no schema informado.",
      `Busca: ${query}`,
    ].join("\n"),
  });

  const requiredAttributes = Object.fromEntries(
    Object.entries(aiResult?.requiredAttributes ?? fallback.requiredAttributes).filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    ),
  ) as InterpretedQuery["requiredAttributes"];

  return {
    ...fallback,
    ...aiResult,
    priorities: aiResult?.priorities?.length ? aiResult.priorities : fallback.priorities,
    preferredBrands: aiResult?.preferredBrands?.length ? aiResult.preferredBrands : fallback.preferredBrands,
    excludedBrands: aiResult?.excludedBrands ?? fallback.excludedBrands,
    requiredAttributes,
    searchTerms: aiResult?.searchTerms?.length ? aiResult.searchTerms : fallback.searchTerms,
  };
}
