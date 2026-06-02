import { fail, ok } from "@/lib/backend/response";
import { requireBusinessScope } from "@/lib/auth/session";
import { getDashboard } from "@/lib/services/dashboard-service";

export async function GET(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "analytics:read");
    return ok(await getDashboard(businessId));
  } catch (error) {
    return fail(error);
  }
}
