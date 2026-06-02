import { fail, ok } from "@/lib/backend/response";
import { requireBusinessScope } from "@/lib/auth/session";
import { getBusinessSettings, saveBusinessSettings } from "@/lib/services/business-service";

export async function GET(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "settings:read");
    return ok(await getBusinessSettings(businessId));
  } catch (error) {
    return fail(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "settings:update");
    return ok(await saveBusinessSettings(businessId, await request.json()));
  } catch (error) {
    return fail(error);
  }
}
