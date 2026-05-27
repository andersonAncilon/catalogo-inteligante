import { fail, ok } from "@/lib/backend/response";
import { getProductForBusiness, saveProduct } from "@/lib/services/product-service";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ businessId: string; productId: string }> },
) {
  try {
    const { businessId, productId } = await params;
    return ok(await getProductForBusiness(businessId, productId));
  } catch (error) {
    return fail(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ businessId: string; productId: string }> },
) {
  try {
    const { businessId, productId } = await params;
    const body = await request.json();
    return ok(await saveProduct(businessId, { ...body, id: productId }));
  } catch (error) {
    return fail(error);
  }
}
