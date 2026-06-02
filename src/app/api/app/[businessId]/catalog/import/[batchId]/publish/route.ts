import { fail, ok } from "@/lib/backend/response";
import { requireBusinessScope } from "@/lib/auth/session";
import { publishImport } from "@/lib/services/import-service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ businessId: string; batchId: string }> },
) {
  try {
    const { businessId, batchId } = await params;
    await requireBusinessScope(request, businessId, "imports:publish");
    return ok(await publishImport(businessId, batchId));
  } catch (error) {
    return fail(error);
  }
}
