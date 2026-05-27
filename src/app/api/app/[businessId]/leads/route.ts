import { fail, ok } from "@/lib/backend/response";
import { listLeadsForBusiness } from "@/lib/services/lead-service";

export async function GET(_: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    return ok(await listLeadsForBusiness(businessId));
  } catch (error) {
    return fail(error);
  }
}
