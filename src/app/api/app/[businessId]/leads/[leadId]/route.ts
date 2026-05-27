import { fail, ok } from "@/lib/backend/response";
import { badRequest, notFound } from "@/lib/backend/errors";
import { findLeadById, updateLeadStatus } from "@/lib/repositories/catalog-repository";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ businessId: string; leadId: string }> },
) {
  try {
    const { businessId, leadId } = await params;
    const lead = await findLeadById(businessId, leadId);
    if (!lead) throw notFound("Lead não encontrado");
    return ok(lead);
  } catch (error) {
    return fail(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ businessId: string; leadId: string }> },
) {
  try {
    const { businessId, leadId } = await params;
    const body = (await request.json()) as { status?: string };
    if (!body.status || !["new", "contacted", "in_progress", "sold", "lost"].includes(body.status)) {
      throw badRequest("Status inválido");
    }
    return ok(await updateLeadStatus(businessId, leadId, body.status as never));
  } catch (error) {
    return fail(error);
  }
}
