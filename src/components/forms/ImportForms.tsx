"use client";

import { useState } from "react";

export function ImportStartForm({ businessId }: { businessId: string }) {
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      await fetch(`/api/app/${businessId}/catalog/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceType: "pasted_text",
          rawContent: String(form.get("rawContent") ?? ""),
        }),
      });
      window.location.href = `/app/${businessId}/catalog/review-import`;
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card stack" onSubmit={submit}>
      <h2>Colar lista de produtos</h2>
      <textarea
        name="rawContent"
        className="textarea"
        placeholder="Samsung S20 FE - R$1799&#10;iPhone 11 - R$2100"
      />
      <button className="button primary" disabled={loading} aria-busy={loading}>
        {loading ? <span className="button-spinner" aria-hidden="true" /> : null}
        {loading ? "Importando..." : "Gerar revisão"}
      </button>
    </form>
  );
}

export function PublishImportButton({ businessId, batchId }: { businessId: string; batchId: string }) {
  const [loading, setLoading] = useState(false);

  async function publish() {
    setLoading(true);
    try {
      await fetch(`/api/app/${businessId}/catalog/import/${batchId}/publish`, { method: "POST" });
      window.location.href = `/app/${businessId}/catalog`;
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="button primary" onClick={publish} disabled={loading} aria-busy={loading}>
      {loading ? <span className="button-spinner" aria-hidden="true" /> : null}
      {loading ? "Publicando..." : "Publicar selecionados"}
    </button>
  );
}
