import { created, fail, ok } from "@/lib/backend/response";
import { requireAppUser } from "@/lib/auth/session";
import { getBusinesses, registerBusiness } from "@/lib/services/business-service";

export async function GET(request: Request) {
  try {
    const user = await requireAppUser(request);
    return ok(await getBusinesses(user.id));
  } catch (error) {
    return fail(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAppUser(request);
    return created(await registerBusiness(user.id, await request.json()));
  } catch (error) {
    return fail(error);
  }
}
