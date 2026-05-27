import { fail, ok } from "@/lib/backend/response";
import { createDefaultInsights, listInsights } from "@/lib/repositories/catalog-repository";

export async function GET(_: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    const insights = await listInsights(businessId);
    return ok(insights.length ? insights : await createDefaultInsights(businessId));
  } catch (error) {
    return fail(error);
  }
}
