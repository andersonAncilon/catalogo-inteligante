import { created, fail, ok } from "@/lib/backend/response";
import { requireBusinessScope } from "@/lib/auth/session";
import { getReviewImport, startImport } from "@/lib/services/import-service";

export async function GET(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "imports:review");
    return ok(await getReviewImport(businessId));
  } catch (error) {
    return fail(error);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "imports:create");
    return created(await startImport(businessId, await request.json()));
  } catch (error) {
    return fail(error);
  }
}
