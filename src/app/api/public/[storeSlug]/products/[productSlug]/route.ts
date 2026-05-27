import { fail, ok } from "@/lib/backend/response";
import { getPublicProduct } from "@/lib/services/store-service";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ storeSlug: string; productSlug: string }> },
) {
  try {
    const { storeSlug, productSlug } = await params;
    return ok(await getPublicProduct(storeSlug, productSlug));
  } catch (error) {
    return fail(error);
  }
}
