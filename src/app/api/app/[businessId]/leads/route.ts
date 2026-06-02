import { fail, ok } from "@/lib/backend/response";
import { requireBusinessScope } from "@/lib/auth/session";
import { listLeadsForBusiness } from "@/lib/services/lead-service";

export async function GET(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "leads:read");
    return ok(await listLeadsForBusiness(businessId));
  } catch (error) {
    return fail(error);
  }
}
