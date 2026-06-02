import type { BusinessMember, User } from "@prisma/client";
import { forbidden, unauthorized } from "@/lib/backend/errors";
import { prisma } from "@/lib/db/prisma";
import { hasScope } from "./scopes";

const DEV_USER_EMAIL = "dev@catalogo-inteligente.local";

export type AppUser = Pick<User, "id" | "email" | "name">;
export type BusinessScope =
  | "business:read"
  | "business:update"
  | "members:read"
  | "members:manage"
  | "products:read"
  | "products:create"
  | "products:update"
  | "products:delete"
  | "products:publish"
  | "inventory:read"
  | "inventory:update"
  | "leads:read"
  | "leads:update"
  | "sales:register"
  | "assistant:use"
  | "assistant:confirm_action"
  | "insights:read"
  | "insights:update"
  | "settings:read"
  | "settings:update"
  | "analytics:read"
  | "imports:create"
  | "imports:review"
  | "imports:publish";

type BusinessMembership = Pick<BusinessMember, "role" | "scopes">;

export async function requireAppUser(request: Request): Promise<AppUser> {
  const email = readIdentityValue(request, "x-user-email", "catalogo_user_email") ?? DEV_USER_EMAIL;
  const name = readIdentityValue(request, "x-user-name", "catalogo_user_name") ?? "Usuário Dev";

  if (!email) throw unauthorized();

  return prisma.user.upsert({
    where: { email },
    update: { name },
    create: { email, name },
    select: { id: true, email: true, name: true },
  });
}

export async function requireBusinessScope(
  request: Request,
  businessId: string,
  requiredScope: BusinessScope,
): Promise<AppUser> {
  const user = await requireAppUser(request);
  const membership = await prisma.businessMember.findUnique({
    where: { businessId_userId: { businessId, userId: user.id } },
    select: { role: true, scopes: true },
  });

  if (!membership) {
    throw forbidden("Você não faz parte deste negócio");
  }

  if (!memberHasScope(membership, requiredScope)) {
    throw forbidden("Seu perfil não permite executar esta ação");
  }

  return user;
}

function memberHasScope(membership: BusinessMembership, requiredScope: BusinessScope) {
  const role = membership.role.toLowerCase() as Parameters<typeof hasScope>[0];
  return hasScope(role, membership.scopes, requiredScope);
}

function readIdentityValue(request: Request, headerName: string, cookieName: string) {
  const headerValue = request.headers.get(headerName)?.trim();
  if (headerValue) return headerValue;

  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((entry) => {
      const [key, ...value] = entry.trim().split("=");
      return [key, decodeURIComponent(value.join("="))];
    }),
  );
  return cookies[cookieName]?.trim() || null;
}
