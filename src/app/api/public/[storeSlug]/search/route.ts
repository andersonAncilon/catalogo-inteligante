import { fail, ok } from "@/lib/backend/response";
import { searchStoreCatalog } from "@/lib/services/search-service";

export async function GET(request: Request, { params }: { params: Promise<{ storeSlug: string }> }) {
  try {
    const { storeSlug } = await params;
    const url = new URL(request.url);
    const query = url.searchParams.get("q") ?? "";
    return ok(await searchStoreCatalog(storeSlug, query));
  } catch (error) {
    return fail(error);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ storeSlug: string }> }) {
  try {
    const { storeSlug } = await params;
    const body = (await request.json()) as { query?: string };
    return ok(await searchStoreCatalog(storeSlug, body.query ?? ""));
  } catch (error) {
    return fail(error);
  }
}
