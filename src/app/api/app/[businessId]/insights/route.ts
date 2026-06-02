import { fail, ok } from "@/lib/backend/response";
import { requireBusinessScope } from "@/lib/auth/session";
import { createDefaultInsights, listInsights } from "@/lib/repositories/catalog-repository";

export async function GET(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "insights:read");
    const insights = await listInsights(businessId);
    return ok(insights.length ? insights : await createDefaultInsights(businessId));
  } catch (error) {
    return fail(error);
  }
}
