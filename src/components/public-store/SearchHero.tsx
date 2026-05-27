import Link from "next/link";
import { Search } from "lucide-react";

export function SearchHero({ storeSlug = "loja-do-joao" }: { storeSlug?: string }) {
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
              defaultValue="quero um celular até R$2000 com boa câmera"
              aria-label="Busca inteligente"
            />
            <Link className="button primary" href={`/${storeSlug}/search`}>
              <Search size={18} /> Buscar
            </Link>
          </div>
          <div className="quick-tags">
            <Link className="tag" href={`/${storeSlug}/search`}>
              Bom e barato
            </Link>
            <Link className="tag" href={`/${storeSlug}/search`}>
              Boa câmera
            </Link>
            <Link className="tag" href={`/${storeSlug}/search`}>
              Bateria forte
            </Link>
            <Link className="tag" href={`/${storeSlug}/search`}>
              iPhone para fotos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
