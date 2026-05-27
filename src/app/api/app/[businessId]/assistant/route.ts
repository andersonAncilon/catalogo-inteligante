import { fail, ok } from "@/lib/backend/response";
import { interpretAssistantCommand } from "@/lib/services/assistant-service";

export async function POST(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    return ok(await interpretAssistantCommand(businessId, await request.json()));
  } catch (error) {
    return fail(error);
  }
}
