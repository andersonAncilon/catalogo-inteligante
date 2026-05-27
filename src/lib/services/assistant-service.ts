import { z } from "zod";
import { badRequest, notFound } from "@/lib/backend/errors";
import {
  createAssistantAction,
  findBusinessById,
  listBusinessLeads,
  listPublicProducts,
} from "@/lib/repositories/catalog-repository";

const commandSchema = z.object({
  command: z.string().min(3),
});

export async function interpretAssistantCommand(businessId: string, payload: unknown) {
  const business = await findBusinessById(businessId);
  if (!business) throw notFound("Negócio não encontrado");

  const parsed = commandSchema.safeParse(payload);
  if (!parsed.success) throw badRequest("Informe um comando para o assistente");

  const command = parsed.data.command.toLowerCase();
  const products = await listPublicProducts(businessId);
  const leads = await listBusinessLeads(businessId);
  const matchedProduct = products.find((product) =>
    command.includes(product.title.toLowerCase()) ||
    product.title.toLowerCase().split(" ").some((part) => part.length > 2 && command.includes(part)),
  );

  if (command.includes("vendi") || command.includes("venda")) {
    const response = {
      status: "pending_confirmation",
      rawCommand: parsed.data.command,
      interpretedAction: {
        action: "register_sale",
        productMatch: matchedProduct
          ? { productId: matchedProduct.id, title: matchedProduct.title, confidence: 0.88 }
          : null,
        quantity: 1,
        suggestedLead: matchedProduct
          ? leads.find((lead) => lead.productId === matchedProduct.id && lead.status !== "sold") ?? null
          : null,
      },
      confirmationRequired: true,
      message: matchedProduct
        ? `Entendi que você quer registrar uma venda de ${matchedProduct.title}.`
        : "Entendi que você quer registrar uma venda, mas preciso escolher o produto.",
    };
    await createAssistantAction({
      businessId,
      rawCommand: response.rawCommand,
      interpretedAction: response.interpretedAction,
      status: "pending_confirmation",
      result: { message: response.message },
    });
    return response;
  }

  if (command.includes("estoque") || command.includes("chegaram")) {
    const response = {
      status: "pending_confirmation",
      rawCommand: parsed.data.command,
      interpretedAction: {
        action: "update_stock",
        productMatch: matchedProduct
          ? { productId: matchedProduct.id, title: matchedProduct.title, confidence: 0.82 }
          : null,
      },
      confirmationRequired: true,
      message: "Posso atualizar o estoque, mas preciso confirmar produto e quantidade antes.",
    };
    await createAssistantAction({
      businessId,
      rawCommand: response.rawCommand,
      interpretedAction: response.interpretedAction,
      status: "pending_confirmation",
      result: { message: response.message },
    });
    return response;
  }

  const response = {
    status: "answered",
    rawCommand: parsed.data.command,
    interpretedAction: { action: "unknown" },
    confirmationRequired: false,
    message: "Ainda não tenho confiança para executar essa ação. Tente registrar venda, atualizar estoque ou alterar preço.",
  };
  await createAssistantAction({
    businessId,
    rawCommand: response.rawCommand,
    interpretedAction: response.interpretedAction,
    status: "failed",
    result: { message: response.message },
  });
  return response;
}
