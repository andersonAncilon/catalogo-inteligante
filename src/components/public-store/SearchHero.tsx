"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchHero({ storeSlug = "loja-do-joao" }: { storeSlug?: string }) {
  const [query, setQuery] = useState("quero um celular até R$2000 com boa câmera");
  const searchHref = `/${storeSlug}/search?q=${encodeURIComponent(query)}`;

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1>Encontre o celular ideal para você</h1>
          <p>
            Conte o que procura em linguagem simples e veja sugestões com preço,
            estoque e motivo da recomendação.
          </p>
        </div>
        <div className="search-panel">
          <strong>Busca inteligente</strong>
          <div className="search-box">
            <input
              className="input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Busca inteligente"
            />
            <Link className="button primary" href={searchHref}>
              <Search size={18} /> Buscar
            </Link>
          </div>
          <div className="quick-tags">
            <Link className="tag" href={`/${storeSlug}/search?q=${encodeURIComponent("celular bom e barato")}`}>
              Bom e barato
            </Link>
            <Link className="tag" href={`/${storeSlug}/search?q=${encodeURIComponent("celular com boa câmera")}`}>
              Boa câmera
            </Link>
            <Link className="tag" href={`/${storeSlug}/search?q=${encodeURIComponent("celular com bateria forte")}`}>
              Bateria forte
            </Link>
            <Link className="tag" href={`/${storeSlug}/search?q=${encodeURIComponent("iPhone para fotos")}`}>
              iPhone para fotos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
