"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export function BusinessCreateForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/app/businesses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug: slug || slugify(name),
        description: "",
        whatsappNumber: "",
        instagramHandle: "",
      }),
    });
    const payload = await response.json();
    setLoading(false);
    if (response.ok) {
      window.location.href = `/app/${payload.data.id}/settings`;
    }
  }

  return (
    <form className="card stack" onSubmit={submit}>
      <h2>Criar novo negócio</h2>
      <label>
        Nome da loja
        <input className="input" value={name} onChange={(event) => setName(event.target.value)} required />
      </label>
      <label>
        Slug público
        <input
          className="input"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder={slugify(name) || "minha-loja"}
        />
      </label>
      <button className="button primary" disabled={loading || !name}>
        <Plus size={18} /> {loading ? "Criando..." : "Criar negócio"}
      </button>
    </form>
  );
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
