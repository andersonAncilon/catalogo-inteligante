import { fail, ok } from "@/lib/backend/response";
import { getPublicStore } from "@/lib/services/store-service";

export async function GET(_: Request, { params }: { params: Promise<{ storeSlug: string }> }) {
  try {
    const { storeSlug } = await params;
    return ok(await getPublicStore(storeSlug));
  } catch (error) {
    return fail(error);
  }
}
