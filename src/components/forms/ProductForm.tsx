"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { Product } from "@/types/domain";

export function ProductForm({ businessId, product }: { businessId: string; product?: Product }) {
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const body = {
      title: String(form.get("title") ?? ""),
      description: String(form.get("description") ?? ""),
      price: Number(form.get("price") ?? 0),
      stockQuantity: Number(form.get("stockQuantity") ?? 0),
      brand: String(form.get("brand") ?? ""),
      category: String(form.get("category") ?? "smartphone"),
      condition: String(form.get("condition") ?? "new"),
      status: String(form.get("status") ?? "draft"),
      attributes: {},
    };
    const response = await fetch(
      product ? `/api/app/${businessId}/products/${product.id}` : `/api/app/${businessId}/catalog`,
      {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    const payload = await response.json();
    setLoading(false);
    if (response.ok) {
      window.location.href = `/app/${businessId}/products/${payload.data.id}`;
    }
  }

  return (
    <form className="settings-grid" onSubmit={submit}>
      <section className="form-card card stack">
        <label>
          Nome
          <input name="title" className="input" defaultValue={product?.title ?? ""} required />
        </label>
        <label>
          Descrição
          <textarea name="description" className="textarea" defaultValue={product?.description ?? ""} />
        </label>
        <div className="actions">
          <button className="button secondary" type="button">
            <Sparkles size={18} /> Melhorar descrição
          </button>
          <button className="button secondary" type="button">
            <Sparkles size={18} /> Extrair atributos
          </button>
        </div>
        <div className="business-grid">
          <label>
            Preço
            <input name="price" className="input" type="number" defaultValue={product?.price ?? 0} />
          </label>
          <label>
            Estoque
            <input name="stockQuantity" className="input" type="number" defaultValue={product?.stockQuantity ?? 0} />
          </label>
        </div>
      </section>
      <aside className="form-card card stack">
        <h2>Atributos</h2>
        <label>
          Marca
          <input name="brand" className="input" defaultValue={product?.brand ?? ""} />
        </label>
        <label>
          Categoria
          <input name="category" className="input" defaultValue={product?.category ?? "smartphone"} />
        </label>
        <label>
          Condição
          <select name="condition" className="select" defaultValue={product?.condition ?? "new"}>
            <option value="new">Novo</option>
            <option value="used">Usado</option>
            <option value="refurbished">Recondicionado</option>
          </select>
        </label>
        <label>
          Status
          <select name="status" className="select" defaultValue={product?.status ?? "draft"}>
            <option value="active">Ativo</option>
            <option value="draft">Rascunho</option>
            <option value="out_of_stock">Sem estoque</option>
            <option value="inactive">Inativo</option>
          </select>
        </label>
        <button className="button primary" disabled={loading}>
          {loading ? "Salvando..." : "Salvar produto"}
        </button>
      </aside>
    </form>
  );
}
