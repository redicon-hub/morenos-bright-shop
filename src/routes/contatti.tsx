import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti — DA MORENO" },
      { name: "description", content: "Contatta DA MORENO: centralino clienti, WhatsApp, email o scrivici direttamente. Siamo a tua disposizione dal lunedì al sabato." },
      { property: "og:title", content: "Contatti — DA MORENO" },
      { property: "og:description", content: "Centralino clienti, WhatsApp, email e formulario: tutti i modi per contattarci." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContattiPage,
});

function ContattiPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      {/* HERO */}
      <section className="border-b border-border bg-accent/30">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="text-xs uppercase tracking-widest text-brand-red font-semibold">Servizio clienti</div>
          <h1 className="mt-3 text-3xl md:text-5xl font-serif font-bold leading-tight">Contattaci</h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            Domande su un prodotto, un ordine o una consegna? Siamo qui: scegli il
            canale che preferisci, ti rispondiamo al più presto.
          </p>
        </div>
      </section>

      {/* CONTENUTO */}
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14 grid md:grid-cols-[1fr_320px] gap-8">
        {/* Form (mockup) */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Scrivici</h2>
          <p className="mt-1 text-sm text-muted-foreground">Compila il formulario: ti ricontattiamo entro 24 ore lavorative.</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nome e cognome</span>
                <input required type="text" placeholder="Giulia Rossi" className="mt-1 w-full rounded-[10px] border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-yellow" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</span>
                <input required type="email" placeholder="giulia.rossi@example.ch" className="mt-1 w-full rounded-[10px] border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-yellow" />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Telefono (opzionale)</span>
              <input type="tel" placeholder="079 123 45 67" className="mt-1 w-full rounded-[10px] border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-yellow" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Messaggio</span>
              <textarea required rows={5} placeholder="Come possiamo aiutarti?" className="mt-1 w-full rounded-[10px] border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-yellow" />
            </label>
            <div className="flex items-center gap-3 flex-wrap">
              <button type="submit" className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red px-6 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark transition-colors">
                <Send className="size-4" /> Invia messaggio
              </button>
              {sent && (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                  <CheckCircle2 className="size-4" /> Messaggio inviato (demo)
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Canali */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-[10px] bg-brand-red text-white grid place-items-center"><Phone className="size-5" /></div>
              <div>
                <div className="font-semibold text-sm">Centralino clienti</div>
                <a href="tel:0912243031" className="text-lg font-bold tracking-tight hover:text-brand-red transition-colors">091 224 30 31</a>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5"><Clock className="size-3.5" /> Lun–Ven 8.30–19.00 · Sab 8.30–17.00</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-[10px] bg-whatsapp text-white grid place-items-center"><MessageCircle className="size-5" /></div>
              <div>
                <div className="font-semibold text-sm">WhatsApp</div>
                <div className="text-sm text-muted-foreground">Risposta rapida in orario lavorativo</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-[10px] bg-brand-yellow text-foreground grid place-items-center"><Mail className="size-5" /></div>
              <div>
                <div className="font-semibold text-sm">Email</div>
                <a href="mailto:info@damoreno.ch" className="text-sm text-muted-foreground hover:text-brand-red transition-colors">info@damoreno.ch</a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-[10px] bg-foreground text-background grid place-items-center"><MapPin className="size-5" /></div>
              <div>
                <div className="font-semibold text-sm">I nostri negozi</div>
                <Link to="/negozi" className="text-sm text-muted-foreground hover:text-brand-red transition-colors">5 punti vendita in Ticino →</Link>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}
