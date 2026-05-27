import { fail, ok } from "@/lib/backend/response";
import { created } from "@/lib/backend/response";
import { getCatalog, saveProduct } from "@/lib/services/product-service";

export async function GET(_: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    return ok(await getCatalog(businessId));
  } catch (error) {
    return fail(error);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  try {
    const { businessId } = await params;
    return created(await saveProduct(businessId, await request.json()));
  } catch (error) {
    return fail(error);
  }
}
