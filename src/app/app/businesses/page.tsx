import Link from "next/link";
import { BusinessCreateForm } from "@/components/forms/BusinessCreateForm";
import { apiGet } from "@/lib/api/server";
import type { Business } from "@/types/domain";

export const dynamic = "force-dynamic";

export default async function BusinessesPage() {
  const businesses = await apiGet<Business[]>("/api/app/businesses");

  return (
    <main className="container section">
      <div className="page-title">
        <div>
          <h1>Seus negócios</h1>
          <p>Escolha uma loja para acompanhar catálogo, leads e insights.</p>
        </div>
      </div>
      <div className="business-grid">
        {businesses.map((business) => (
          <article className="card" key={business.name}>
            <div className="badge-row">
              <span className="badge green">{business.status === "active" ? "Ativa" : "Rascunho"}</span>
            </div>
            <h2>{business.name}</h2>
            <p className="muted">{business.description || "Loja pronta para configurar catálogo e WhatsApp."}</p>
            <Link className="button primary" href={`/app/${business.id}/dashboard`}>
              Acessar painel
            </Link>
          </article>
        ))}
        {businesses.length === 0 ? (
          <article className="card">
            <h2>Nenhum negócio cadastrado</h2>
            <p className="muted">Crie o primeiro business para começar do zero.</p>
          </article>
        ) : null}
        <BusinessCreateForm />
      </div>
    </main>
  );
}
