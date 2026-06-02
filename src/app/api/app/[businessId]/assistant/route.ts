import { fail, ok } from "@/lib/backend/response";
import { requireBusinessScope } from "@/lib/auth/session";
import { confirmAssistantAction, interpretAssistantCommand } from "@/lib/services/assistant-service";

export async function POST(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "assistant:use");
    return ok(await interpretAssistantCommand(businessId, await request.json()));
  } catch (error) {
    return fail(error);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "assistant:confirm_action");
    return ok(await confirmAssistantAction(businessId, await request.json()));
  } catch (error) {
    return fail(error);
  }
}
