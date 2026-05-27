import { fail, ok } from "@/lib/backend/response";
import { getDashboard } from "@/lib/services/dashboard-service";

export async function GET(_: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    return ok(await getDashboard(businessId));
  } catch (error) {
    return fail(error);
  }
}
