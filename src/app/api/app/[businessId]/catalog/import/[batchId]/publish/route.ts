import { fail, ok } from "@/lib/backend/response";
import { publishImport } from "@/lib/services/import-service";

export async function POST(
  _: Request,
  { params }: { params: Promise<{ businessId: string; batchId: string }> },
) {
  try {
    const { businessId, batchId } = await params;
    return ok(await publishImport(businessId, batchId));
  } catch (error) {
    return fail(error);
  }
}
