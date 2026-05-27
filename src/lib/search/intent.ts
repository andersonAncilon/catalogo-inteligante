import type { InterpretedQuery } from "@/types/domain";

const moneyPattern = /(?:r\$\s*)?(\d[\d.\s]*)(?:,\d{2})?/i;

export function interpretSearchQuery(query: string): InterpretedQuery {
  const normalized = query.toLowerCase();
  const priceMatch = normalized.match(/(?:até|abaixo de|menos de|no máximo|maximo|máximo)\s*(?:r\$\s*)?(\d[\d.\s]*)/);
  const fallbackMoney = normalized.match(moneyPattern);
  const maxPrice = priceMatch?.[1] ?? (normalized.includes("barato") ? fallbackMoney?.[1] : undefined);

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
  ].filter(Boolean) as string[];

  return {
    intent: normalized.includes("celular") || normalized.includes("iphone") || normalized.includes("smartphone")
      ? "buy_smartphone"
      : "browse_catalog",
    category: "smartphone",
    maxPrice: maxPrice ? Number(maxPrice.replace(/[.\s]/g, "")) : null,
    minPrice: null,
    priorities,
    preferredBrands,
    excludedBrands: [],
    useCase: normalized.includes("jogo") || normalized.includes("games") ? "gaming" : null,
  };
}
