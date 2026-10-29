import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Package, Store, ShieldCheck, Clock, CircleCheck } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";

export const Route = createFileRoute("/spedizioni")({
  head: () => ({
    meta: [
      { title: "Spedizioni e consegne — DA MORENO" },
      { name: "description", content: "Tempi e costi di consegna DA MORENO: Ticino in 24-48h, tutta la Svizzera, spedizione gratuita sopra Fr. 49.90 e ritiro in negozio." },
      { property: "og:title", content: "Spedizioni e consegne — DA MORENO" },
      { property: "og:description", content: "Ticino in 24-48h, tutta la Svizzera, gratuita sopra Fr. 49.90 e ritiro gratuito in negozio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpedizioniPage,
});

const ZONES = [
  { zone: "Ticino", time: "24 – 48 ore lavorative", cost: "Fr. 6.90", note: "Gratuita sopra Fr. 49.90" },
  { zone: "Resto della Svizzera", time: "2 – 4 giorni lavorativi", cost: "Fr. 9.90", note: "Gratuita sopra Fr. 49.90" },
  { zone: "Ritiro in negozio", time: "Pronto in 24h", cost: "Gratuito", note: "In uno dei nostri 5 negozi" },
  { zone: "Consegna ingombranti", time: "Concordata per telefono", cost: "Su preventivo", note: "Arredamento e volumi grandi" },
];

const BENEFITS = [
  { icon: Package, title: "Imballo sicuro", text: "Ogni articolo è imballato con cura: ceramica e vetro arrivano intatti." },
  { icon: Clock, title: "Tracciamento", text: "Ricevi un link per seguire la spedizione fino alla tua porta." },
  { icon: ShieldCheck, title: "Consegna assicurata", text: "Se qualcosa va perso o rott* durante il trasporto, lo sostituiamo noi." },
  { icon: Store, title: "Ritiro in negozio", text: "Ordina online e ritira gratis nel negozio DA MORENO più comodo per te." },
];

function SpedizioniPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      {/* HERO */}
      <section className="border-b border-border bg-accent/30">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="text-xs uppercase tracking-widest text-brand-red font-semibold">Servizio clienti</div>
          <h1 className="mt-3 text-3xl md:text-5xl font-serif font-bold leading-tight">Spedizioni e consegne</h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            Spediamo in tutta la Svizzera con corriere affidabile. E nel Ticino,
            dove siamo di casa, arriviamo ancora più in fretta.
          </p>
        </div>
      </section>

      {/* TABELLA ZONE */}
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Tempi e costi</h2>
        <p className="mt-1 text-sm text-muted-foreground">Indicativi: gli ingombranti vengono confermati telefonicamente.</p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Zona</th>
                <th className="px-4 py-3 font-semibold">Tempi</th>
                <th className="px-4 py-3 font-semibold">Costo</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {ZONES.map((z) => (
                <tr key={z.zone} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-semibold">{z.zone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{z.time}</td>
                  <td className="px-4 py-3 font-semibold text-brand-red">{z.cost}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{z.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
          <Truck className="size-4 text-brand-red" /> La soglia per la spedizione gratuita è di <b className="text-foreground">Fr. 49.90</b> di acquisto.
        </p>
      </section>

      {/* VANTAGGI */}
      <section className="mx-auto max-w-5xl px-4 pb-14">
        <h2 className="text-xl md:text-2xl font-serif font-bold">Come spediamo</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="size-10 rounded-[10px] bg-brand-yellow/40 text-foreground grid place-items-center"><b.icon className="size-5" /></div>
              <h3 className="mt-3 font-serif font-bold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-accent/40 p-5 text-sm text-muted-foreground">
          <b className="text-foreground">Ordini con più articoli</b> partono insieme: la consegna avviene quando l'ultimo pezzo è disponibile, senza costi extra.
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/faq" className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark transition-colors">
            <CircleCheck className="size-4" /> Consulta le FAQ
          </Link>
          <Link to="/contatti" className="inline-flex items-center justify-center rounded-[10px] border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent transition-colors">
            Hai domande? Scrivici
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}
