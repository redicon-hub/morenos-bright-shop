import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, ShieldCheck, Landmark, Wallet, Lock, Truck } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";

export const Route = createFileRoute("/pagamenti")({
  head: () => ({
    meta: [
      { title: "Pagamenti — DA MORENO" },
      { name: "description", content: "Tutti i metodi di pagamento accettati da DA MORENO: carta, TWINT, PostFinance, fattura e pagamento sicuro SSL." },
      { property: "og:title", content: "Pagamenti — DA MORENO" },
      { property: "og:description", content: "Carta, TWINT, PostFinance e fattura: paga come preferisci, in sicurezza." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PagamentiPage,
});

const METHODS = [
  { icon: CreditCard, name: "Carte di credito e debito", text: "Visa, Mastercard, American Express e Maestro. Il pagamento viene autorizzato subito e addebitato alla spedizione." },
  { icon: Wallet, name: "TWINT", text: "Paga dal tuo smartphone in pochi tocchi, senza inserire dati di carta." },
  { icon: Landmark, name: "PostFinance", text: "Pagamento diretto tramite PostFinance e-finance o e-trading." },
  { icon: Truck, name: "Fattura / contrassegno", text: "Paga alla consegna o con fattura a 30 giorni per clienti aziendali (su approvazione)." },
];

function PagamentiPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      {/* HERO */}
      <section className="border-b border-border bg-accent/30">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="text-xs uppercase tracking-widest text-brand-red font-semibold">Servizio clienti</div>
          <h1 className="mt-3 text-3xl md:text-5xl font-serif font-bold leading-tight">Pagamenti</h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            Scegli il metodo che preferisci: tutti i pagamenti avvengono su
            connessione protetta, senza che i tuoi dati ti lascino mai.
          </p>
        </div>
      </section>

      {/* METODI */}
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Metodi accettati</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          {METHODS.map((m) => (
            <div key={m.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-[10px] bg-brand-yellow/40 text-foreground grid place-items-center"><m.icon className="size-5" /></div>
                <h3 className="font-serif font-bold">{m.name}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SICUREZZA */}
      <section className="mx-auto max-w-5xl px-4 pb-14">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex items-center gap-2 font-serif font-bold text-lg"><Lock className="size-5 text-brand-red" /> Pagamento sicuro</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Tutte le transazioni viaggiano su connessione criptata SSL e sono
              elaborate da fornitori certificati PCI-DSS. DA MORENO non memorizza
              i dati completi della tua carta.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-[10px] bg-accent/40 px-4 py-3"><ShieldCheck className="size-4 text-brand-red" /> SSL 256-bit</div>
            <div className="flex items-center gap-2 rounded-[10px] bg-accent/40 px-4 py-3"><Lock className="size-4 text-brand-red" /> 3-D Secure</div>
            <div className="flex items-center gap-2 rounded-[10px] bg-accent/40 px-4 py-3"><ShieldCheck className="size-4 text-brand-red" /> PCI-DSS</div>
            <div className="flex items-center gap-2 rounded-[10px] bg-accent/40 px-4 py-3"><Lock className="size-4 text-brand-red" /> 3D verificato</div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark transition-colors">
            Torna allo shop
          </Link>
          <Link to="/contatti" className="inline-flex items-center justify-center rounded-[10px] border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent transition-colors">
            Domande su un pagamento? Scrivici
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}
