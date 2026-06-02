import { fail, ok } from "@/lib/backend/response";
import { created } from "@/lib/backend/response";
import { requireBusinessScope } from "@/lib/auth/session";
import { getCatalog, saveProduct } from "@/lib/services/product-service";

export async function GET(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "products:read");
    return ok(await getCatalog(businessId));
  } catch (error) {
    return fail(error);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    await requireBusinessScope(request, businessId, "products:create");
    return created(await saveProduct(businessId, await request.json()));
  } catch (error) {
    return fail(error);
  }
}
