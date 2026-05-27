import Link from "next/link";
import {
  BarChart3,
  Bot,
  Boxes,
  Building2,
  Lightbulb,
  MessageSquareText,
  Settings,
} from "lucide-react";

const nav = [
  { path: "dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "catalog", label: "Catálogo", icon: Boxes },
  { path: "leads", label: "Leads", icon: MessageSquareText },
  { path: "assistant", label: "Assistente", icon: Bot },
  { path: "insights", label: "Insights", icon: Lightbulb },
  { path: "settings", label: "Configurações", icon: Settings },
];

export function AppShell({
  children,
  businessId = "b1",
  businessName = "Catálogo Inteligente",
  storeSlug,
}: {
  children: React.ReactNode;
  businessId?: string;
  businessName?: string;
  storeSlug?: string;
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/app/businesses">
          <span className="brand-mark">CI</span>
          <span>Catálogo Inteligente</span>
        </Link>
        <div className="nav-list">
          <Link className="nav-item" href="/app/businesses">
            <Building2 size={18} /> Negócios
          </Link>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link className="nav-item" href={`/app/${businessId}/${item.path}`} key={item.path}>
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
        </div>
      </aside>
      <div className="app-content">
        <div className="topbar">
          <div className="header-inner container">
            <strong>{businessName}</strong>
            <div className="actions">
              <Link className="button secondary" href={storeSlug ? `/${storeSlug}` : "/app/businesses"}>
                Ver loja pública
              </Link>
            </div>
          </div>
        </div>
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
