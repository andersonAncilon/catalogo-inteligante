import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { store } from "@/lib/mock-data";
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
        <a className="button primary" href={`https://wa.me/${activeStore.whatsapp}`}>
          <MessageCircle size={18} /> WhatsApp
        </a>
      </div>
    </header>
  );
}
