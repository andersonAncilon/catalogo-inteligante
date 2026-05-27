import { created, fail, ok } from "@/lib/backend/response";
import { getBusinesses, registerBusiness } from "@/lib/services/business-service";

export async function GET() {
  try {
    return ok(await getBusinesses());
  } catch (error) {
    return fail(error);
  }
}

export async function POST(request: Request) {
  try {
    return created(await registerBusiness(await request.json()));
  } catch (error) {
    return fail(error);
  }
}
