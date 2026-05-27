import type { InterpretedQuery, Product, SearchRecommendation } from "@/types/domain";

const priorityTerms: Record<string, string[]> = {
  camera: ["camera", "câmera", "foto", "mp"],
  battery: ["bateria", "mah"],
  performance: ["ram", "desempenho", "jogos"],
  storage: ["gb", "armazenamento", "memória"],
  price: ["barato", "custo-benefício", "acessível"],
};

export function rankProducts(products: Product[], interpreted: InterpretedQuery): SearchRecommendation[] {
  return products
    .map((product) => {
      const searchable = `${product.title} ${product.description} ${product.searchText}`.toLowerCase();
      let score = 0;
      const reasons: string[] = [];

      if (product.status === "active") score += 20;
      if (product.stockQuantity > 0) {
        score += 25;
        reasons.push("Está disponível em estoque");
      }

      if (interpreted.maxPrice) {
        if (product.price <= interpreted.maxPrice) {
          score += 30;
          reasons.push("Está dentro do orçamento informado");
        } else {
          score -= Math.min(25, Math.round((product.price - interpreted.maxPrice) / 100));
        }
      }

      if (interpreted.preferredBrands.includes(product.brand)) {
        score += 12;
        reasons.push(`Atende à preferência por ${product.brand}`);
      }

      for (const priority of interpreted.priorities) {
        const terms = priorityTerms[priority] ?? [];
        const matched = terms.some((term) => searchable.includes(term));
        if (matched) {
          score += 10;
          reasons.push(priorityReason(priority));
        }
      }

      if (reasons.length === 0) {
        reasons.push("É uma alternativa próxima para a busca feita");
      }

      return { product, rank: 0, score, matchReasons: reasons };
    })
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }));
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
