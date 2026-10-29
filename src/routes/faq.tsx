import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Domande frequenti | DA MORENO" },
      { name: "description", content: "Le risposte alle domande più frequenti su ordini, spedizioni, resi, pagamenti e negozi DA MORENO." },
      { property: "og:title", content: "FAQ — Domande frequenti | DA MORENO" },
      { property: "og:description", content: "Ordini, spedizioni, resi e pagamenti: le risposte che cerchi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

const FAQS: { q: string; a: string }[] = [
  { q: "Posso ordinare online e ritirare in negozio?", a: "Certo! Scegli l'opzione «Ritiro in negozio» al checkout: l'ordine sarà pronto in 24 ore lavorative nel punto vendita DA MORENO che preferisci, e il ritiro è sempre gratuito." },
  { q: "Da quanto tempo arriva la mia spedizione?", a: "Nel Ticino consegniamo in 24-48 ore lavorative, nel resto della Svizzera in 2-4 giorni. Ricevi un link di tracciamento appena l'ordine parte." },
  { q: "Quando la spedizione è gratuita?", a: "Per ordini di almeno Fr. 49.90 la spedizione standard è sempre gratuita, in tutta la Svizzera. Sotto questa soglia si applica una piccola contribuzione di Fr. 6.90 (Ticino) o Fr. 9.90 (resto della Svizzera)." },
  { q: "Posso restituire un articolo?", a: "Sì: hai 14 giorni dalla consegna per restituire un prodotto integrale con lo scontrino o il numero d'ordine. Puoi portarlo in negozio o concordare il ritiro per corriere — vedi la pagina Resi." },
  { q: "Quali metodi di pagamento accettate?", a: "Carte di credito e debito, TWINT, PostFinance, fattura per aziende e pagamento alla consegna. Tutti i pagamenti online avvengono su connessione sicura SSL." },
  { q: "Gli articoli online sono gli stessi dei negozi?", a: "Quasi: lo shop online propone una selezione ampia ma non completa dell'assortimento in negozio. Se cerchi qualcosa di specifico, chiama il centralino o scrivici su WhatsApp: lo controlliamo subito." },
  { q: "Come funziona la consegna degli articoli ingombranti?", a: "Per arredamento e volumi grandi concordiamo insieme data e ora della consegna via telefono. Il costo dipende da zona e volume: ti diamo subito un preventivo trasparente." },
  { q: "Posso usare buoni e promozioni in negozio e online?", a: "I buoni DA MORENO sono validi sia in negozio sia nello shop online. Le promozioni stagionali possono variare tra i canali: i dettagli sono sempre indicati sulla promozione stessa." },
];

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      {/* HERO */}
      <section className="border-b border-border bg-accent/30">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="text-xs uppercase tracking-widest text-brand-red font-semibold">Servizio clienti</div>
          <h1 className="mt-3 text-3xl md:text-5xl font-serif font-bold leading-tight">Domande frequenti</h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            Le risposte alle domande che ci fate più spesso. Non trovi la tua?
            Scrivici: rispondiamo al più presto.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-serif font-bold text-base md:text-lg hover:no-underline hover:text-brand-red">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-2xl border border-border bg-accent/40 p-6 text-center">
          <p className="font-serif font-bold text-lg">Non hai trovato la risposta?</p>
          <p className="mt-1 text-sm text-muted-foreground">Il nostro centralino clienti è a disposizione dal lunedì al sabato.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link to="/contatti" className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark transition-colors">
              Contattaci
            </Link>
            <Link to="/negozi" className="inline-flex items-center justify-center rounded-[10px] border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent transition-colors">
              I nostri negozi
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}
