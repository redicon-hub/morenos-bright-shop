import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ChevronRight, CreditCard, Truck, ShieldCheck, Lock } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";
import { useCart, formatCHF } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — DA MORENO" },
      { name: "description", content: "Completa il tuo ordine in modo sicuro." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const SHIPPING_FREE_THRESHOLD = 49.9;
const SHIPPING_COST = 4.9;

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const [payment, setPayment] = useState<"card" | "twint" | "invoice">("card");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "");
    const orderNumber = "DM-" + Math.floor(100000 + Math.random() * 900000);

    // Placeholder: simulate processing then redirect
    setTimeout(() => {
      clear();
      navigate({
        to: "/ordine-confermato",
        search: { order: orderNumber, name: firstName, total: total.toFixed(2) },
      });
    }, 900);
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
        <Header />
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Il tuo carrello è vuoto</h1>
          <p className="text-muted-foreground mt-2">Aggiungi prodotti prima di procedere al checkout.</p>
          <Link to="/shop" className="inline-flex mt-6 rounded-[10px] bg-brand-red text-white px-6 py-3 font-semibold hover:bg-brand-red-dark transition-colors">
            Vai allo shop
          </Link>
        </div>
        <Footer />
        <MobileTabBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      <section className="bg-accent/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <nav className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Link to="/" className="hover:text-brand-red">Home</Link>
            <ChevronRight className="size-3" />
            <Link to="/carrello" className="hover:text-brand-red">Carrello</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground/80 font-semibold">Checkout</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
            <Lock className="size-4" /> Pagamento sicuro · placeholder demo
          </p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-6 md:py-10 grid md:grid-cols-[1fr_380px] gap-6">
        <div className="space-y-5">
          {/* Contact */}
          <fieldset className="rounded-2xl bg-white brand-shadow p-5">
            <legend className="font-bold text-lg px-1">1. Contatto</legend>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <Input name="email" label="Email" type="email" required placeholder="mario.rossi@email.ch" />
              <Input name="phone" label="Telefono" type="tel" required placeholder="+41 79 123 45 67" />
            </div>
          </fieldset>

          {/* Shipping */}
          <fieldset className="rounded-2xl bg-white brand-shadow p-5">
            <legend className="font-bold text-lg px-1">2. Indirizzo di spedizione</legend>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <Input name="firstName" label="Nome" required />
              <Input name="lastName" label="Cognome" required />
              <Input name="address" label="Indirizzo" required className="sm:col-span-2" placeholder="Via, numero" />
              <Input name="zip" label="CAP" required placeholder="6500" />
              <Input name="city" label="Città" required placeholder="Bellinzona" />
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-foreground/70 mb-1 block">Paese</label>
                <select name="country" defaultValue="CH" className="w-full rounded-[10px] border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red">
                  <option value="CH">Svizzera</option>
                  <option value="IT">Italia</option>
                  <option value="LI">Liechtenstein</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Shipping method */}
          <fieldset className="rounded-2xl bg-white brand-shadow p-5">
            <legend className="font-bold text-lg px-1">3. Metodo di spedizione</legend>
            <div className="mt-3 space-y-2">
              <RadioRow name="shipping" value="standard" defaultChecked label="Spedizione standard" sub="2-4 giorni lavorativi" right={shipping === 0 ? "Gratis" : formatCHF(SHIPPING_COST)} />
              <RadioRow name="shipping" value="express" label="Spedizione express" sub="1-2 giorni lavorativi" right={formatCHF(9.9)} />
              <RadioRow name="shipping" value="pickup" label="Ritiro in negozio" sub="Gratis, pronto in 24h" right="Gratis" />
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset className="rounded-2xl bg-white brand-shadow p-5">
            <legend className="font-bold text-lg px-1">4. Pagamento</legend>
            <div className="mt-3 grid sm:grid-cols-3 gap-2">
              <PayTab active={payment === "card"} onClick={() => setPayment("card")} icon={CreditCard} label="Carta" />
              <PayTab active={payment === "twint"} onClick={() => setPayment("twint")} icon={ShieldCheck} label="TWINT" />
              <PayTab active={payment === "invoice"} onClick={() => setPayment("invoice")} icon={Truck} label="Fattura" />
            </div>
            {payment === "card" && (
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <Input name="cardNumber" label="Numero carta" placeholder="1234 5678 9012 3456" className="sm:col-span-2" />
                <Input name="cardName" label="Intestatario" placeholder="Mario Rossi" className="sm:col-span-2" />
                <Input name="cardExpiry" label="Scadenza" placeholder="MM/AA" />
                <Input name="cardCvv" label="CVV" placeholder="123" />
              </div>
            )}
            {payment === "twint" && (
              <p className="mt-4 text-sm text-muted-foreground">Riceverai la richiesta di pagamento sull'app TWINT. Demo placeholder.</p>
            )}
            {payment === "invoice" && (
              <p className="mt-4 text-sm text-muted-foreground">Riceverai una fattura via email da pagare entro 30 giorni. Demo placeholder.</p>
            )}
          </fieldset>

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" required className="mt-1 accent-brand-red" />
            <span>Ho letto e accetto i <a href="#" className="text-brand-red font-semibold hover:underline">termini e condizioni</a> e la <a href="#" className="text-brand-red font-semibold hover:underline">privacy policy</a>.</span>
          </label>
        </div>

        {/* Summary */}
        <aside className="md:sticky md:top-44 self-start">
          <div className="rounded-2xl bg-white brand-shadow p-5">
            <h2 className="font-bold text-lg mb-4">Il tuo ordine</h2>
            <ul className="space-y-3 mb-4 max-h-72 overflow-y-auto">
              {items.map((it) => (
                <li key={it.slug} className="flex gap-3">
                  <div className="relative size-14 rounded-lg overflow-hidden bg-accent/30 shrink-0">
                    <img src={it.image} alt="" className="w-full h-full object-cover" />
                    <span className="absolute -top-1 -right-1 grid place-items-center size-5 rounded-full bg-brand-red text-white text-[10px] font-bold">{it.qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold leading-snug line-clamp-2">{it.name}</p>
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap">{formatCHF(it.price * it.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="space-y-1.5 text-sm border-t border-border pt-3">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotale</dt><dd className="font-semibold">{formatCHF(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Spedizione</dt><dd className="font-semibold">{shipping === 0 ? "Gratis" : formatCHF(shipping)}</dd></div>
              <div className="flex justify-between text-lg pt-2 border-t border-border mt-2">
                <dt className="font-bold">Totale</dt>
                <dd className="font-bold text-brand-red">{formatCHF(total)}</dd>
              </div>
            </dl>
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-red text-white px-5 py-3 font-semibold hover:bg-brand-red-dark transition-colors disabled:opacity-60"
            >
              <Lock className="size-4" />
              {submitting ? "Elaborazione..." : `Paga ${formatCHF(total)}`}
            </button>
            <p className="mt-3 text-[11px] text-muted-foreground text-center">
              Demo mockup: nessun pagamento reale verrà effettuato.
            </p>
          </div>
        </aside>
      </form>

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}

function Input({ label, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-foreground/70 mb-1 block">{label}{props.required && " *"}</label>
      <input
        {...props}
        className="w-full rounded-[10px] border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red transition-colors"
      />
    </div>
  );
}

function RadioRow({ name, value, label, sub, right, defaultChecked }: { name: string; value: string; label: string; sub: string; right: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 rounded-[10px] border border-border p-3 cursor-pointer hover:border-brand-red transition-colors has-[:checked]:border-brand-red has-[:checked]:bg-brand-red/5">
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} className="accent-brand-red" />
      <div className="flex-1">
        <div className="font-semibold text-sm">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <span className="font-bold text-sm">{right}</span>
    </label>
  );
}

function PayTab({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-[10px] border-2 p-3 text-sm font-semibold transition-colors ${
        active ? "border-brand-red bg-brand-red/5 text-brand-red" : "border-border bg-white hover:border-brand-yellow"
      }`}
    >
      <Icon className="size-4" /> {label}
    </button>
  );
}
