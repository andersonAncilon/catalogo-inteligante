export const roleScopes = {
  owner: ["*"],
  admin: [
    "business:read",
    "business:update",
    "products:read",
    "products:create",
    "products:update",
    "products:publish",
    "inventory:read",
    "inventory:update",
    "leads:read",
    "leads:update",
    "sales:register",
    "assistant:use",
    "assistant:confirm_action",
    "insights:read",
    "insights:update",
    "settings:read",
    "settings:update",
    "analytics:read",
    "imports:create",
    "imports:review",
    "imports:publish",
  ],
  staff: [
    "business:read",
    "products:read",
    "products:update",
    "inventory:read",
    "inventory:update",
    "leads:read",
    "leads:update",
    "sales:register",
    "assistant:use",
    "insights:read",
  ],
  viewer: ["business:read", "products:read", "inventory:read", "leads:read", "insights:read", "analytics:read"],
} as const;

export function hasScope(role: keyof typeof roleScopes, customScopes: string[], requiredScope: string) {
  const defaults: readonly string[] = roleScopes[role];
  return defaults.includes("*") || defaults.includes(requiredScope) || customScopes.includes(requiredScope);
}
