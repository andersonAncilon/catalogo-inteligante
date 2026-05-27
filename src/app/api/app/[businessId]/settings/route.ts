import { fail, ok } from "@/lib/backend/response";
import { getBusinessSettings, saveBusinessSettings } from "@/lib/services/business-service";

export async function GET(_: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    return ok(await getBusinessSettings(businessId));
  } catch (error) {
    return fail(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    return ok(await saveBusinessSettings(businessId, await request.json()));
  } catch (error) {
    return fail(error);
  }
}
