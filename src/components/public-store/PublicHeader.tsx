import Link from "next/link";
import { store } from "@/lib/mock-data";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LeadWhatsAppButton } from "./LeadWhatsAppButton";
import type { Business } from "@/types/domain";

export function PublicHeader({ business }: { business?: Business }) {
  const activeStore = business
    ? {
        name: business.name,
        slug: business.slug,
        whatsapp: business.whatsappNumber,
      }
    : store;

  return (
    <header className="public-header">
      <div className="container header-inner">
        <Link className="brand" href={`/${activeStore.slug}`}>
          <span className="brand-mark">{activeStore.name.slice(0, 2).toUpperCase()}</span>
          <span>{activeStore.name}</span>
        </Link>
        <div className="actions">
          <LeadWhatsAppButton
            storeSlug={activeStore.slug}
            whatsappNumber={activeStore.whatsapp}
            label="WhatsApp"
            originalQuery={`Olá, vim pela vitrine da ${activeStore.name}.`}
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
