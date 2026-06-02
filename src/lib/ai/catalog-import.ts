import { generateJsonWithOpenAI } from "./openai";

export type DetectedImportItem = {
  rawContent: string;
  detectedTitle: string;
  detectedDescription?: string | null;
  detectedBrand?: string | null;
  detectedPrice?: number | null;
  detectedStockQuantity?: number | null;
  detectedAttributes?: Record<string, string | number | boolean | null> | null;
  confidenceScore?: number | null;
};

export async function extractCatalogItems(rawContent: string): Promise<DetectedImportItem[] | null> {
  if (!rawContent.trim()) return null;

  const result = await generateJsonWithOpenAI<{ items: DetectedImportItem[] }>({
    schemaName: "catalog_import_items",
    schema: {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              rawContent: { type: "string" },
              detectedTitle: { type: "string" },
              detectedDescription: { type: ["string", "null"] },
              detectedBrand: { type: ["string", "null"] },
              detectedPrice: { type: ["number", "null"] },
              detectedStockQuantity: { type: ["number", "null"] },
              detectedAttributes: {
                type: "object",
                properties: {
                  brand: { type: ["string", "null"] },
                  storage_gb: { type: ["number", "null"] },
                  ram_gb: { type: ["number", "null"] },
                  battery_mah: { type: ["number", "null"] },
                  camera_mp: { type: ["number", "null"] },
                  network: { type: ["string", "null"] },
                  condition: { type: ["string", "null"] },
                },
                required: ["brand", "storage_gb", "ram_gb", "battery_mah", "camera_mp", "network", "condition"],
                additionalProperties: false,
              },
              confidenceScore: { type: ["number", "null"] },
            },
            required: [
              "rawContent",
              "detectedTitle",
              "detectedDescription",
              "detectedBrand",
              "detectedPrice",
              "detectedStockQuantity",
              "detectedAttributes",
              "confidenceScore",
            ],
            additionalProperties: false,
          },
        },
      },
      required: ["items"],
      additionalProperties: false,
    },
    prompt: [
      "Extraia produtos de um catálogo informal de loja de smartphones.",
      "Tente identificar a marca do produto. Use marcas normalizadas como Apple, Samsung, Motorola, Xiaomi, Realme, Asus, LG ou Nokia.",
      "Normalize preço em BRL como número, estoque como inteiro e atributos técnicos em snake_case.",
      "Preencha detectedBrand e também detectedAttributes.brand quando a marca for identificada.",
      "Responda apenas com JSON no schema informado.",
      rawContent,
    ].join("\n"),
  });

  return result?.items?.length ? result.items : null;
}
