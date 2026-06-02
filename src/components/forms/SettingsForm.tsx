"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, PackagePlus, Upload } from "lucide-react";
import type { Business } from "@/types/domain";

export function SettingsForm({
  business,
  showCatalogWalkthrough = false,
}: {
  business: Business;
  showCatalogWalkthrough?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSaved(false);
    const form = new FormData(event.currentTarget);
    try {
      await fetch(`/api/app/${business.id}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          slug: String(form.get("slug") ?? ""),
          description: String(form.get("description") ?? ""),
          whatsappNumber: String(form.get("whatsappNumber") ?? ""),
          instagramHandle: String(form.get("instagramHandle") ?? ""),
          status: "active",
        }),
      });
      setSaved(true);
      if (showCatalogWalkthrough) {
        setWalkthroughOpen(true);
      } else {
        window.setTimeout(() => window.location.reload(), 650);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      {saved ? (
        <div className="success-banner" role="status">
          <CheckCircle2 size={20} aria-hidden="true" />
          <strong>Configurações salvas com sucesso.</strong>
        </div>
      ) : null}
      <form className="settings-grid" onSubmit={submit}>
        <div className="card stack">
          <label>
            Nome da loja
            <input name="name" className="input" defaultValue={business.name} required />
          </label>
          <label>
            Slug
            <input name="slug" className="input" defaultValue={business.slug} required />
          </label>
          <label>
            Descrição
            <textarea name="description" className="textarea" defaultValue={business.description} />
          </label>
        </div>
        <div className="card stack">
          <label>
            WhatsApp
            <input name="whatsappNumber" className="input" defaultValue={business.whatsappNumber} />
          </label>
          <label>
            Instagram
            <input name="instagramHandle" className="input" defaultValue={business.instagramHandle} />
          </label>
          <label>
            Link público
            <input className="input" value={`/${business.slug}`} readOnly />
          </label>
          <button className="button primary" disabled={loading} aria-busy={loading}>
            {loading ? <span className="button-spinner" aria-hidden="true" /> : null}
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </form>
      {walkthroughOpen ? <CatalogWalkthrough businessId={business.id} /> : null}
    </div>
  );
}

function CatalogWalkthrough({ businessId }: { businessId: string }) {
  return (
    <section className="walkthrough-panel" aria-label="Próximos passos do catálogo">
      <div>
        <span className="badge green">Próximo passo</span>
        <h2>Monte seu catálogo inicial</h2>
        <p className="muted">
          Comece com alguns produtos manuais se quiser validar a vitrine, ou cole uma lista para publicar vários itens de uma vez.
        </p>
      </div>
      <div className="walkthrough-options">
        <Link className="walkthrough-option" href={`/app/${businessId}/products/new`}>
          <PackagePlus size={22} aria-hidden="true" />
          <strong>Cadastrar produto</strong>
          <span>Bom para revisar preço, condição, estoque e destaque item a item.</span>
        </Link>
        <Link className="walkthrough-option" href={`/app/${businessId}/catalog/import`}>
          <Upload size={22} aria-hidden="true" />
          <strong>Importar catálogo</strong>
          <span>Bom para transformar uma lista colada em produtos revisáveis.</span>
        </Link>
      </div>
    </section>
  );
}
