import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";
import { useCart, formatCHF } from "@/lib/cart";

export const Route = createFileRoute("/carrello")({
  head: () => ({
    meta: [
      { title: "Il tuo carrello — DA MORENO" },
      { name: "description", content: "Rivedi i prodotti nel tuo carrello e procedi al checkout." },
    ],
  }),
  component: CartPage,
});

const SHIPPING_FREE_THRESHOLD = 49.9;
const SHIPPING_COST = 4.9;

function CartPage() {
  const { items, updateQty, removeItem, subtotal, count } = useCart();
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const missingForFree = Math.max(0, SHIPPING_FREE_THRESHOLD - subtotal);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      <section className="bg-accent/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <nav className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Link to="/" className="hover:text-brand-red">Home</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground/80 font-semibold">Carrello</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold">Il tuo carrello</h1>
          <p className="text-muted-foreground mt-1">{count === 0 ? "Vuoto" : `${count} articol${count === 1 ? "o" : "i"}`}</p>
        </div>
      </section>

      {items.length === 0 ? (
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="mx-auto grid place-items-center size-20 rounded-full bg-brand-yellow/40 mb-4">
            <ShoppingBag className="size-10 text-brand-red" />
          </div>
          <h2 className="text-2xl font-bold">Il tuo carrello è vuoto</h2>
          <p className="text-muted-foreground mt-2">Esplora il nostro shop e aggiungi i tuoi prodotti preferiti.</p>
          <Link to="/shop" className="inline-flex mt-6 rounded-[10px] bg-brand-red text-white px-6 py-3 font-semibold hover:bg-brand-red-dark transition-colors">
            Vai allo shop
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-10 grid md:grid-cols-[1fr_360px] gap-6">
          {/* Items */}
          <div className="space-y-3">
            {missingForFree > 0 && (
              <div className="rounded-2xl bg-brand-yellow/30 border border-brand-yellow p-4 flex items-center gap-3">
                <Truck className="size-5 text-brand-red shrink-0" />
                <p className="text-sm">
                  Aggiungi <span className="font-bold">{formatCHF(missingForFree)}</span> per la <span className="font-bold">spedizione gratuita</span>.
                </p>
              </div>
            )}

            {items.map((item) => (
              <div key={item.slug} className="rounded-2xl bg-white brand-shadow p-3 md:p-4 flex gap-3 md:gap-4">
                <Link to="/prodotto/$slug" params={{ slug: item.slug }} className="shrink-0 size-24 md:size-28 rounded-xl overflow-hidden bg-accent/30">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <Link to="/prodotto/$slug" params={{ slug: item.slug }} className="font-semibold leading-snug line-clamp-2 hover:text-brand-red transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatCHF(item.price)} cad.</p>
                  <div className="mt-auto pt-2 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-[10px] border border-border bg-white">
                      <button
                        onClick={() => updateQty(item.slug, item.qty - 1)}
                        className="grid place-items-center size-9 hover:bg-accent transition-colors rounded-l-[10px]"
                        aria-label="Diminuisci"
                      ><Minus className="size-3.5" /></button>
                      <span className="w-9 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.slug, item.qty + 1)}
                        className="grid place-items-center size-9 hover:bg-accent transition-colors rounded-r-[10px]"
                        aria-label="Aumenta"
                      ><Plus className="size-3.5" /></button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-brand-red">{formatCHF(item.price * item.qty)}</span>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="grid place-items-center size-9 rounded-[10px] text-muted-foreground hover:bg-accent hover:text-brand-red transition-colors"
                        aria-label="Rimuovi"
                      ><Trash2 className="size-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:underline mt-2">
              ← Continua lo shopping
            </Link>
          </div>

          {/* Summary */}
          <aside className="md:sticky md:top-44 self-start">
            <div className="rounded-2xl bg-white brand-shadow p-5">
              <h2 className="font-bold text-lg mb-4">Riepilogo ordine</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotale</dt>
                  <dd className="font-semibold">{formatCHF(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Spedizione</dt>
                  <dd className="font-semibold">{shipping === 0 ? "Gratis" : formatCHF(shipping)}</dd>
                </div>
                <div className="border-t border-border pt-3 mt-3 flex justify-between text-lg">
                  <dt className="font-bold">Totale</dt>
                  <dd className="font-bold text-brand-red">{formatCHF(total)}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-red text-white px-5 py-3 font-semibold hover:bg-brand-red-dark transition-colors"
              >
                Procedi al checkout <ArrowRight className="size-4" />
              </Link>
              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <Truck className="size-3.5" /> Spedizione gratuita da {formatCHF(SHIPPING_FREE_THRESHOLD)}
              </div>
            </div>
          </aside>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}
