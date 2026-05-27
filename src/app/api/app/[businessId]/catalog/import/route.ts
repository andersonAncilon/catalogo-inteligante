import { created, fail, ok } from "@/lib/backend/response";
import { getReviewImport, startImport } from "@/lib/services/import-service";

export async function GET(_: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    return ok(await getReviewImport(businessId));
  } catch (error) {
    return fail(error);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    return created(await startImport(businessId, await request.json()));
  } catch (error) {
    return fail(error);
  }
}
