import { AppShell } from "@/components/ui/AppShell";
import { SettingsForm } from "@/components/forms/SettingsForm";
import { apiGet } from "@/lib/api/server";
import type { Business } from "@/types/domain";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ businessId: string }>;
  searchParams: Promise<{ onboarding?: string }>;
}) {
  const { businessId } = await params;
  const { onboarding } = await searchParams;
  const business = await apiGet<Business>(`/api/app/${businessId}/settings`);

  return (
    <AppShell businessId={businessId} businessName={business.name} storeSlug={business.slug}>
      <div className="page-title">
        <div>
          <h1>Configurações</h1>
          <p>Dados públicos da loja e operação do WhatsApp.</p>
        </div>
      </div>
      <SettingsForm business={business} showCatalogWalkthrough={onboarding === "1"} />
    </AppShell>
  );
}
