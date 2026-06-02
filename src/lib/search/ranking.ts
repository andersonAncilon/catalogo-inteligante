import type { InterpretedQuery, Product, SearchRecommendation } from "@/types/domain";

const priorityTerms: Record<string, string[]> = {
  camera: ["camera", "câmera", "foto", "mp"],
  battery: ["bateria", "mah"],
  performance: ["ram", "desempenho", "jogos"],
  storage: ["gb", "armazenamento", "memória"],
  price: ["barato", "custo-benefício", "acessível"],
};

export function rankProducts(
  products: Product[],
  interpreted: InterpretedQuery,
  options: { textScores?: Map<string, number> } = {},
): SearchRecommendation[] {
  return products
    .map((product) => {
      const searchable = `${product.title} ${product.description} ${product.searchText} ${JSON.stringify(product.attributes)}`.toLowerCase();
      let score = 0;
      const reasons: string[] = [];

      if (interpreted.excludedBrands.includes(product.brand)) {
        score -= 80;
        reasons.push(`Não priorizamos porque você evitou ${product.brand}`);
      }

      if (product.status === "active") score += 20;
      if (product.stockQuantity > 0) {
        score += 35;
        reasons.push("Está disponível em estoque");
      } else {
        score -= 35;
      }

      if (interpreted.maxPrice) {
        if (product.price <= interpreted.maxPrice) {
          score += 35;
          reasons.push("Está dentro do orçamento informado");
        } else {
          const overBudget = product.price - interpreted.maxPrice;
          score -= Math.min(70, 25 + Math.round(overBudget / 80));
          reasons.push("Fica acima do orçamento informado");
        }
      }

      if (interpreted.minPrice && product.price >= interpreted.minPrice) {
        score += 8;
      }

      if (interpreted.preferredBrands.includes(product.brand)) {
        score += 18;
        reasons.push(`Atende à preferência por ${product.brand}`);
      }

      for (const [attribute, expected] of Object.entries(interpreted.requiredAttributes)) {
        if (attributeMatches(product.attributes[attribute], expected)) {
          score += 18;
          reasons.push(`Atende ao atributo ${attribute.replace("_", " ")}`);
        } else {
          score -= 20;
        }
      }

      for (const priority of interpreted.priorities) {
        const terms = priorityTerms[priority] ?? [];
        const matched = terms.some((term) => searchable.includes(term));
        if (matched) {
          score += 10;
          reasons.push(priorityReason(priority));
        }
      }

      const textMatches = interpreted.searchTerms.filter((term) => searchable.includes(term));
      score += Math.min(15, textMatches.length * 3);

      const textScore = options.textScores?.get(product.id);
      if (textScore) {
        score += Math.min(24, 8 + Math.round(textScore * 16));
        reasons.push("Encontrado pela busca textual do catálogo");
      }

      if (product.isFeatured) score += 4;
      if (product.promotionLabel || (product.compareAtPrice && product.compareAtPrice > product.price)) {
        score += 3;
      }

      if (reasons.length === 0) {
        reasons.push("É uma alternativa próxima para a busca feita");
      }

      return { product, rank: 0, score, matchReasons: reasons };
    })
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}

function attributeMatches(current: string | number | boolean | null | undefined, expected: string | number | boolean) {
  if (current === undefined || current === null) return false;
  if (typeof current === "number" && typeof expected === "number") return current >= expected;
  return String(current).toLowerCase() === String(expected).toLowerCase();
}

function priorityReason(priority: string) {
  const labels: Record<string, string> = {
    camera: "Atende à prioridade de boa câmera",
    battery: "Tem bateria forte para uso diário",
    performance: "Tem desempenho adequado para o uso indicado",
    storage: "Oferece bom armazenamento",
    price: "Tem bom custo-benefício",
  };

  return labels[priority] ?? "Atende a uma preferência informada";
}
