"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import type { Product, ProductCondition, ProductStatus } from "@/types/domain";

export function ProductForm({ businessId, product }: { businessId: string; product?: Product }) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [description, setDescription] = useState(product?.description ?? "");
  const [brand, setBrand] = useState(product?.brand ?? "");
  const [category, setCategory] = useState(product?.category ?? "smartphone");
  const [condition, setCondition] = useState<ProductCondition>(product?.condition ?? "new");
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? "draft");
  const [attributes, setAttributes] = useState<Product["attributes"]>(product?.attributes ?? {});

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    const form = new FormData(event.currentTarget);
    const body = {
      title: String(form.get("title") ?? ""),
      description,
      price: Number(form.get("price") ?? 0),
      compareAtPrice: parseOptionalNumber(form.get("compareAtPrice")),
      stockQuantity: Number(form.get("stockQuantity") ?? 0),
      brand,
      category,
      condition,
      status,
      isFeatured: form.get("isFeatured") === "on",
      promotionLabel: String(form.get("promotionLabel") ?? ""),
      attributes,
    };
    try {
      const response = await fetch(
        product ? `/api/app/${businessId}/products/${product.id}` : `/api/app/${businessId}/catalog`,
        {
          method: product ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const payload = await response.json();
      if (response.ok) {
        setSuccessMessage(product ? "Produto salvo com sucesso." : "Produto criado com sucesso.");
        if (!product) {
          window.setTimeout(() => {
            window.location.href = `/app/${businessId}/products/${payload.data.id}`;
          }, 850);
        }
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  function improveDescription() {
    const title = product?.title || String(document.querySelector<HTMLInputElement>('input[name="title"]')?.value ?? "");
    const price = String(document.querySelector<HTMLInputElement>('input[name="price"]')?.value ?? "");
    const nextDescription = [
      description || `${title} em ótimo estado para uso diário.`,
      price ? `Boa opção para quem busca custo-benefício na faixa de R$ ${price}.` : null,
      "Consulte disponibilidade e condições pelo WhatsApp da loja.",
    ]
      .filter(Boolean)
      .join(" ");
    setDescription(nextDescription);
  }

  function extractAttributes() {
    const title = String(document.querySelector<HTMLInputElement>('input[name="title"]')?.value ?? "");
    const text = `${title} ${description}`;
    const nextBrand = detectBrand(text);
    const nextCondition = detectCondition(text);
    const nextAttributes = detectSmartphoneAttributes(text);

    if (nextBrand) setBrand(nextBrand);
    if (nextCondition) setCondition(nextCondition);
    if (Object.keys(nextAttributes).length > 0) setAttributes(nextAttributes);
    if (isSmartphoneText(text)) {
      setCategory("smartphone");
    }
  }

  return (
    <div className="stack">
      {successMessage ? (
        <div className="success-banner" role="status">
          <CheckCircle2 size={20} aria-hidden="true" />
          <strong>{successMessage}</strong>
        </div>
      ) : null}
      <form className="settings-grid" onSubmit={submit}>
        <section className="form-card card stack">
          <label>
            Nome
            <input name="title" className="input" defaultValue={product?.title ?? ""} required />
          </label>
          <label>
            Descrição
            <textarea
              name="description"
              className="textarea"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <div className="actions">
            <button className="button secondary" type="button" onClick={improveDescription}>
              <Sparkles size={18} /> Melhorar descrição
            </button>
            <button className="button secondary" type="button" onClick={extractAttributes}>
              <Sparkles size={18} /> Extrair atributos
            </button>
          </div>
          {Object.keys(attributes).length > 0 ? (
            <div className="detected-attributes">
              {Object.entries(attributes).map(([key, value]) => (
                <span className="tag" key={key}>
                  {formatAttributeName(key)}: {String(value)}
                </span>
              ))}
            </div>
          ) : null}
          <div className="business-grid">
            <label>
              Preço
              <input name="price" className="input" type="number" defaultValue={product?.price ?? 0} />
            </label>
            <label>
              Preço de comparação
              <input
                name="compareAtPrice"
                className="input"
                type="number"
                defaultValue={product?.compareAtPrice ?? ""}
                placeholder="De"
              />
            </label>
          </div>
          <label>
            Estoque
            <input name="stockQuantity" className="input" type="number" defaultValue={product?.stockQuantity ?? 0} />
          </label>
        </section>
        <aside className="form-card card stack">
          <h2>Atributos</h2>
          <label>
            Marca
            <input name="brand" className="input" value={brand} onChange={(event) => setBrand(event.target.value)} />
          </label>
          <label>
            Categoria
            <input
              name="category"
              className="input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </label>
          <label>
            Condição
            <select name="condition" className="select" value={condition} onChange={(event) => setCondition(event.target.value as ProductCondition)}>
              <option value="new">Novo</option>
              <option value="used">Usado</option>
              <option value="refurbished">Recondicionado</option>
            </select>
          </label>
          <label>
            Status
            <select name="status" className="select" value={status} onChange={(event) => setStatus(event.target.value as ProductStatus)}>
              <option value="active">Ativo</option>
              <option value="draft">Rascunho</option>
              <option value="out_of_stock">Sem estoque</option>
              <option value="inactive">Inativo</option>
            </select>
          </label>
          <label>
            Etiqueta da promoção
            <input
              name="promotionLabel"
              className="input"
              defaultValue={product?.promotionLabel ?? ""}
              placeholder="Oferta da semana"
            />
          </label>
          <label className="checkbox-row">
            <input name="isFeatured" type="checkbox" defaultChecked={product?.isFeatured ?? false} />
            Produto em destaque
          </label>
          <button className="button primary" disabled={loading} aria-busy={loading}>
            {loading ? <span className="button-spinner" aria-hidden="true" /> : null}
            {loading ? "Salvando..." : "Salvar produto"}
          </button>
        </aside>
      </form>
    </div>
  );
}

function parseOptionalNumber(value: FormDataEntryValue | null) {
  if (value === null || String(value).trim() === "") return null;
  return Number(value);
}

function detectBrand(value: string) {
  const normalized = normalize(value);
  const brands: Array<[string, string[]]> = [
    ["Apple", ["apple", "iphone"]],
    ["Samsung", ["samsung", "galaxy"]],
    ["Motorola", ["motorola", "moto g", "moto e", "moto edge"]],
    ["Xiaomi", ["xiaomi", "redmi", "poco"]],
    ["Realme", ["realme"]],
    ["Asus", ["asus", "zenfone", "rog phone"]],
    ["LG", ["lg"]],
    ["Nokia", ["nokia"]],
  ];

  return brands.find(([, terms]) => terms.some((term) => normalized.includes(term)))?.[0] ?? "";
}

function detectCondition(value: string): ProductCondition | "" {
  const normalized = normalize(value);
  if (/(recondicionado|refurbished|reformado)/.test(normalized)) return "refurbished";
  if (/(usado|seminovo|semi novo|segunda mao|2a mao)/.test(normalized)) return "used";
  if (/(novo|lacrado|na caixa)/.test(normalized)) return "new";
  return "";
}

function detectSmartphoneAttributes(value: string): Product["attributes"] {
  const normalized = normalize(value);
  const attributes: Product["attributes"] = {};
  const storageMatch = normalized.match(/\b(32|64|128|256|512)\s*gb\b/);
  const ramMatch = normalized.match(/\b(2|3|4|6|8|12|16)\s*gb\s*(?:ram)?\b/);
  const batteryMatch = normalized.match(/\b([3-7]\d{3})\s*mah\b/);
  const cameraMatch = normalized.match(/\b(\d{2,3})\s*mp\b/);

  if (storageMatch) attributes.storage_gb = Number(storageMatch[1]);
  if (ramMatch && Number(ramMatch[1]) !== attributes.storage_gb) attributes.ram_gb = Number(ramMatch[1]);
  if (batteryMatch) attributes.battery_mah = Number(batteryMatch[1]);
  if (cameraMatch) attributes.camera_mp = Number(cameraMatch[1]);

  return attributes;
}

function isSmartphoneText(value: string) {
  const normalized = normalize(value);
  return /(celular|smartphone|iphone|galaxy|moto|xiaomi|redmi|poco|realme)/.test(normalized);
}

function formatAttributeName(value: string) {
  const labels: Record<string, string> = {
    storage_gb: "Armazenamento",
    ram_gb: "RAM",
    battery_mah: "Bateria",
    camera_mp: "Câmera",
  };

  return labels[value] ?? value;
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
