import { created, fail } from "@/lib/backend/response";
import { registerLead } from "@/lib/services/lead-service";

export async function POST(request: Request, { params }: { params: Promise<{ storeSlug: string }> }) {
  try {
    const { storeSlug } = await params;
    return created(await registerLead(storeSlug, await request.json()));
  } catch (error) {
    return fail(error);
  }
}
