import { createFileRoute, Link, notFound, useRouter, ErrorComponentProps } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, ShoppingCart, Heart, Truck, ShieldCheck, RotateCcw, Check, Minus, Plus } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";
import { ProductCard } from "./shop";
import { getProductBySlug, getRelated, type Product } from "@/lib/products";
import { useCart, formatCHF } from "@/lib/cart";

export const Route = createFileRoute("/prodotto/$slug")({
  head: ({ params }) => {
    const p = getProductBySlug(params.slug);
    if (!p) return { meta: [{ title: "Prodotto non trovato — DA MORENO" } as const] };
    const title = `${p.name} — DA MORENO`;
    const desc = p.shortDescription;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  loader: ({ params }): { product: NonNullable<ReturnType<typeof getProductBySlug>> } => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: NotFoundProduct,
  errorComponent: ProductError,
  component: ProductPage,
});

function NotFoundProduct() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Prodotto non trovato</h1>
        <p className="text-muted-foreground mt-2">Il prodotto che cerchi non è più disponibile.</p>
        <Link to="/shop" className="inline-flex mt-6 rounded-[10px] bg-brand-red text-white px-5 py-3 font-semibold hover:bg-brand-red-dark transition-colors">
          Torna allo shop
        </Link>
      </div>
      <Footer />
      <MobileTabBar />
    </div>
  );
}

function ProductError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const message = error instanceof Error ? error.message : "Si è verificato un errore inatteso.";
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Errore di caricamento</h1>
        <p className="text-muted-foreground mt-2 text-sm">{message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="inline-flex mt-6 rounded-[10px] bg-brand-red text-white px-5 py-3 font-semibold hover:bg-brand-red-dark transition-colors"
        >
          Riprova
        </button>
      </div>
      <Footer />
      <MobileTabBar />
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const related = getRelated(product.slug, 4);

  function handleAdd() {
    addItem({ slug: product.slug, name: product.name, price: product.price, image: product.image }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-5">
        <nav className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-brand-red">Home</Link>
          <ChevronRight className="size-3" />
          <Link to="/shop" className="hover:text-brand-red">Shop</Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground/80">{product.category}</span>
          <ChevronRight className="size-3" />
          <span className="text-foreground/80 font-semibold truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product detail */}
      <section className="mx-auto max-w-7xl px-4 py-6 md:py-10 grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-accent/30 brand-shadow aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-[10px] text-xs font-bold tracking-wide ${
                product.badge === "OFFERTA" ? "bg-brand-red text-white" :
                product.badge === "NOVITÀ" ? "bg-brand-yellow text-foreground" :
                "bg-foreground text-white"
              }`}>{product.badge}</span>
            )}
          </div>
          {/* Thumbs (placeholder — same image x 4) */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0,1,2,3].map((i) => (
              <button key={i} className={`rounded-[10px] overflow-hidden aspect-square border-2 ${i===0 ? "border-brand-red" : "border-transparent hover:border-brand-yellow"}`}>
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-red font-bold">{product.category}</p>
          <h1 className="text-2xl md:text-4xl font-bold mt-2">{product.name}</h1>
          <p className="text-muted-foreground mt-2">{product.shortDescription}</p>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-3xl md:text-4xl font-bold text-brand-red">{formatCHF(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through pb-1">{formatCHF(product.oldPrice)}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">IVA inclusa. Spedizione calcolata al checkout.</p>

          {/* Qty + CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-center rounded-[10px] border border-border bg-white">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid place-items-center size-12 hover:bg-accent transition-colors rounded-l-[10px]"
                aria-label="Diminuisci"
              ><Minus className="size-4" /></button>
              <span className="w-12 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="grid place-items-center size-12 hover:bg-accent transition-colors rounded-r-[10px]"
                aria-label="Aumenta"
              ><Plus className="size-4" /></button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-red text-white px-6 py-3 font-semibold hover:bg-brand-red-dark transition-colors"
            >
              {added ? (<><Check className="size-5" /> Aggiunto al carrello</>) : (<><ShoppingCart className="size-5" /> Aggiungi al carrello</>)}
            </button>
            <button
              className="grid place-items-center size-12 rounded-[10px] border border-border bg-white hover:border-brand-red hover:text-brand-red transition-colors"
              aria-label="Aggiungi ai preferiti"
            ><Heart className="size-5" /></button>
          </div>

          {/* Features */}
          <ul className="mt-6 grid grid-cols-2 gap-2">
            {product.features.map((f: string) => (
              <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                <Check className="size-4 text-brand-red shrink-0" /> {f}
              </li>
            ))}
          </ul>

          {/* Description */}
          <div className="mt-6 rounded-2xl bg-accent/40 p-5">
            <h3 className="font-semibold mb-2">Descrizione</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{product.description}</p>
          </div>

          {/* Service strip */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <ServiceIcon icon={Truck} label="Spedizione" sub="Da Fr. 4.90" />
            <ServiceIcon icon={ShieldCheck} label="Pagamenti" sub="100% sicuri" />
            <ServiceIcon icon={RotateCcw} label="Reso facile" sub="Entro 14 giorni" />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-5">Potrebbero piacerti</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}

function ServiceIcon({ icon: Icon, label, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; sub: string }) {
  return (
    <div className="rounded-xl bg-white border border-border p-3">
      <Icon className="size-5 text-brand-red mx-auto" />
      <div className="text-xs font-semibold mt-1">{label}</div>
      <div className="text-[10px] text-muted-foreground">{sub}</div>
    </div>
  );
}
