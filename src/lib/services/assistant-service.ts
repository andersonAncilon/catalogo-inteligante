import { z } from "zod";
import { badRequest, notFound } from "@/lib/backend/errors";
import {
  confirmAssistantAction as confirmAssistantActionRecord,
  createAssistantAction,
  findBusinessById,
  listBusinessLeads,
  listPublicProducts,
} from "@/lib/repositories/catalog-repository";

const commandSchema = z.object({
  command: z.string().min(3),
});

const confirmationSchema = z.object({
  actionId: z.string().uuid(),
});

export async function interpretAssistantCommand(businessId: string, payload: unknown) {
  const business = await findBusinessById(businessId);
  if (!business) throw notFound("Negócio não encontrado");

  const parsed = commandSchema.safeParse(payload);
  if (!parsed.success) throw badRequest("Informe um comando para o assistente");

  const command = parsed.data.command.toLowerCase();
  const quantity = extractQuantity(command);
  const products = await listPublicProducts(businessId);
  const leads = await listBusinessLeads(businessId);
  const matchedProduct = products.find((product) =>
    command.includes(product.title.toLowerCase()) ||
    product.title.toLowerCase().split(" ").some((part) => part.length > 2 && command.includes(part)),
  );

  if (command.includes("vendi") || command.includes("venda")) {
    const interpretedAction = {
      action: "register_sale",
      productMatch: matchedProduct
        ? { productId: matchedProduct.id, title: matchedProduct.title, confidence: 0.88 }
        : null,
      quantity,
      suggestedLead: matchedProduct
        ? leads.find((lead) => lead.productId === matchedProduct.id && lead.status !== "sold") ?? null
        : null,
    };
    const action = await createAssistantAction({
      businessId,
      rawCommand: parsed.data.command,
      interpretedAction,
      status: "pending_confirmation",
      result: { message: matchedProduct
        ? `Entendi que você quer registrar uma venda de ${matchedProduct.title}.`
        : "Entendi que você quer registrar uma venda, mas preciso escolher o produto." },
    });
    const response = {
      actionId: action.id,
      status: "pending_confirmation",
      rawCommand: parsed.data.command,
      interpretedAction,
      confirmationRequired: true,
      message: matchedProduct
        ? `Entendi que você quer registrar uma venda de ${quantity} unidade(s) de ${matchedProduct.title}.`
        : "Entendi que você quer registrar uma venda, mas preciso escolher o produto.",
    };
    return response;
  }

  if (command.includes("estoque") || command.includes("chegaram")) {
    const interpretedAction = {
      action: "update_stock",
      productMatch: matchedProduct
        ? { productId: matchedProduct.id, title: matchedProduct.title, confidence: 0.82 }
        : null,
      quantityDelta: quantity,
    };
    const action = await createAssistantAction({
      businessId,
      rawCommand: parsed.data.command,
      interpretedAction,
      status: "pending_confirmation",
      result: { message: "Posso atualizar o estoque, mas preciso confirmar antes." },
    });
    const response = {
      actionId: action.id,
      status: "pending_confirmation",
      rawCommand: parsed.data.command,
      interpretedAction,
      confirmationRequired: true,
      message: matchedProduct
        ? `Posso adicionar ${quantity} unidade(s) ao estoque de ${matchedProduct.title}.`
        : "Posso atualizar o estoque, mas preciso escolher o produto.",
    };
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

export async function confirmAssistantAction(businessId: string, payload: unknown) {
  const parsed = confirmationSchema.safeParse(payload);
  if (!parsed.success) throw badRequest("Informe a ação pendente para confirmar");

  const action = await confirmAssistantActionRecord(businessId, parsed.data.actionId);
  if (!action) throw notFound("Ação pendente não encontrada");

  return action.result ?? { message: "Ação confirmada." };
}

function extractQuantity(command: string) {
  const match = command.match(/\b(\d{1,3})\b/);
  return match ? Number(match[1]) : 1;
}
