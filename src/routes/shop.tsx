import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ShoppingCart, Tag, ChevronRight } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";
import { PRODUCTS, CATEGORIES, type Product } from "@/lib/products";
import { useCart, formatCHF } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop online — DA MORENO" },
      { name: "description", content: "Scopri tutti i prodotti DA MORENO: home decor, casalinghi, profumazione, kids, party e molto altro. Spedizione in tutta la Svizzera." },
      { property: "og:title", content: "Shop online — DA MORENO" },
      { property: "og:description", content: "Tutto il catalogo DA MORENO online. Idee belle, prezzi che ami." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [category, setCategory] = useState<string>("Tutti");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => category === "Tutti" || p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, query, sort]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      {/* Breadcrumb + title */}
      <section className="bg-accent/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <nav className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Link to="/" className="hover:text-brand-red">Home</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground/80 font-semibold">Shop online</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold">Shop online</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} prodotti disponibili</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 grid md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar categorie */}
        <aside className="md:sticky md:top-44 self-start">
          <div className="rounded-2xl bg-white brand-shadow p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-brand-red" /> Categorie
            </h3>
            <ul className="space-y-1">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setCategory(c)}
                    className={`w-full text-left px-3 py-2 rounded-[10px] text-sm transition-colors ${
                      category === c
                        ? "bg-brand-red text-white font-semibold"
                        : "hover:bg-accent text-foreground/80"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Catalog */}
        <div>
          {/* Filters bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca prodotti..."
                className="w-full rounded-[10px] border border-border bg-white pl-11 pr-4 py-2.5 text-sm outline-none focus:border-brand-red transition-colors"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-[10px] border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red"
            >
              <option value="featured">Ordina: in evidenza</option>
              <option value="price-asc">Prezzo crescente</option>
              <option value="price-desc">Prezzo decrescente</option>
              <option value="name">Nome A→Z</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white brand-shadow p-10 text-center">
              <p className="text-muted-foreground">Nessun prodotto trovato.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <div className="group rounded-2xl bg-white brand-shadow overflow-hidden flex flex-col">
      <Link
        to="/prodotto/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-accent/30"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2 py-1 rounded-[10px] text-[10px] font-bold tracking-wide ${
            product.badge === "OFFERTA" ? "bg-brand-red text-white" :
            product.badge === "NOVITÀ" ? "bg-brand-yellow text-foreground" :
            "bg-foreground text-white"
          }`}>
            {product.badge}
          </span>
        )}
      </Link>
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.category}</p>
        <Link
          to="/prodotto/$slug"
          params={{ slug: product.slug }}
          className="mt-1 font-semibold text-sm md:text-base leading-snug line-clamp-2 hover:text-brand-red transition-colors"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-lg font-bold text-brand-red">{formatCHF(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatCHF(product.oldPrice)}</span>
          )}
        </div>
        <button
          onClick={() =>
            addItem({ slug: product.slug, name: product.name, price: product.price, image: product.image })
          }
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-red text-white px-3 py-2 text-xs md:text-sm font-semibold hover:bg-brand-red-dark transition-colors"
        >
          <ShoppingCart className="size-4" /> Aggiungi
        </button>
      </div>
    </div>
  );
}
