"use client";

import { useState } from "react";
import type { Business } from "@/types/domain";

export function SettingsForm({ business }: { business: Business }) {
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
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
    setLoading(false);
    window.location.reload();
  }

  return (
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
        <button className="button primary" disabled={loading}>
          {loading ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}
