import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw, ReceiptText, PackageOpen, CircleCheck, CircleX } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";

export const Route = createFileRoute("/resi")({
  head: () => ({
    meta: [
      { title: "Resi e rimborsi — DA MORENO" },
      { name: "description", content: "Resi facili con DA MORENO: hai 14 giorni per restituire un articolo in negozio o per corriere, con rimborso rapido." },
      { property: "og:title", content: "Resi e rimborsi — DA MORENO" },
      { property: "og:description", content: "14 giorni per cambiare idea: reso in negozio o per corriere, rimborso rapido." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResiPage,
});

const STEPS = [
  { n: 1, title: "Avvisaci", text: "Scrivici da WhatsApp, dal formulario contatti o passa in negozio con lo scontrino o la conferma d'ordine." },
  { n: 2, title: "Prepara l'articolo", text: "Prodotto integrale, non usato, con imballo originale dove possibile e accessori compresi." },
  { n: 3, title: "Restituisci", text: "Portalo in uno dei nostri 5 negozi (gratuito e immediato) oppure concordiamo il ritiro per corriere." },
  { n: 4, title: "Ricevi il rimborso", text: "Sul metodo di pagamento originale entro 5-7 giorni lavorativi, oppure buono d'acquisto immediato in negozio." },
];

const NOT_RETURNABLE = [
  "Alimenti e prodotti freschi",
  "Articoli personalizzati o incisi",
  "Prodotti igienici aperti (cosmetici, intimo casa)",
  "Gift card e buoni acquisto",
];

function ResiPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      {/* HERO */}
      <section className="border-b border-border bg-accent/30">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="text-xs uppercase tracking-widest text-brand-red font-semibold">Servizio clienti</div>
          <h1 className="mt-3 text-3xl md:text-5xl font-serif font-bold leading-tight">Resi e rimborsi</h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            Cambi idea? Nessun problema: hai <b className="text-foreground">14 giorni</b> di tempo
            per restituire un articolo. Semplice, come deve essere.
          </p>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Come funziona</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-red text-white text-sm font-bold">{s.n}</span>
              <h3 className="mt-3 font-serif font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONDIZIONI */}
      <section className="mx-auto max-w-5xl px-4 pb-14 grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 font-serif font-bold text-lg">
            <CircleCheck className="size-5 text-green-700" /> Cosa puoi restituire
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><ReceiptText className="size-4 text-brand-red flex-shrink-0 mt-0.5" /> Articoli in perfette condizioni, entro 14 giorni dalla consegna</li>
            <li className="flex gap-2"><ReceiptText className="size-4 text-brand-red flex-shrink-0 mt-0.5" /> Con scontrino, ricevuta o numero d'ordine</li>
            <li className="flex gap-2"><RotateCcw className="size-4 text-brand-red flex-shrink-0 mt-0.5" /> Anche gli acquisti online, in qualunque nostro negozio</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 font-serif font-bold text-lg">
            <CircleX className="size-5 text-brand-red" /> Cosa non è reso
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {NOT_RETURNABLE.map((r) => (
              <li key={r} className="flex gap-2"><PackageOpen className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" /> {r}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pb-14 flex flex-wrap gap-3">
        <Link to="/contatti" className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark transition-colors">
          Avvia un reso
        </Link>
        <Link to="/negozi" className="inline-flex items-center justify-center rounded-[10px] border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent transition-colors">
          Trova il negozio più vicino
        </Link>
      </div>

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}
