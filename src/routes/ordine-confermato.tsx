import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, Package, Phone, ArrowRight } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";
import { formatCHF } from "@/lib/cart";

type Search = { order?: string; name?: string; total?: string };

export const Route = createFileRoute("/ordine-confermato")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    order: typeof s.order === "string" ? s.order : undefined,
    name: typeof s.name === "string" ? s.name : undefined,
    total: typeof s.total === "string" ? s.total : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Ordine confermato — DA MORENO" },
      { name: "description", content: "Grazie per il tuo ordine!" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmedPage,
});

function ConfirmedPage() {
  const { order, name, total } = Route.useSearch();
  const orderNumber = order || "DM-000000";
  const customerName = name || "Cliente";
  const totalNum = total ? parseFloat(total) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      <section className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        {/* Hero confirmation */}
        <div className="text-center">
          <div className="mx-auto grid place-items-center size-20 md:size-24 rounded-full bg-brand-yellow/40 mb-5">
            <CheckCircle2 className="size-12 md:size-14 text-brand-red" strokeWidth={2.5} />
          </div>
          <p className="text-xs uppercase tracking-widest font-bold text-brand-red">Grazie!</p>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            {customerName}, il tuo ordine è confermato
          </h1>
          <p className="text-muted-foreground mt-3 text-base md:text-lg">
            Abbiamo ricevuto il tuo ordine e iniziamo subito a prepararlo con cura.
          </p>
        </div>

        {/* Order recap card */}
        <div className="mt-8 rounded-2xl bg-white brand-shadow p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-border">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Numero ordine</p>
              <p className="text-xl font-bold mt-0.5">{orderNumber}</p>
            </div>
            {totalNum > 0 && (
              <div className="text-left sm:text-right">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Totale pagato</p>
                <p className="text-xl font-bold text-brand-red mt-0.5">{formatCHF(totalNum)}</p>
              </div>
            )}
          </div>

          <ul className="mt-5 space-y-4">
            <Step icon={Mail} title="Email di conferma in arrivo" sub="Tra qualche minuto riceverai l'email con tutti i dettagli del tuo ordine." />
            <Step icon={Package} title="Preparazione & spedizione" sub="Il tuo pacco viene preparato entro 24 ore lavorative e affidato al corriere." />
            <Step icon={CheckCircle2} title="Consegna" sub="Riceverai un avviso quando il pacco sarà in viaggio verso di te." />
          </ul>
        </div>

        {/* Help */}
        <div className="mt-6 rounded-2xl bg-brand-yellow/30 border border-brand-yellow p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="grid place-items-center size-12 rounded-full bg-white shrink-0">
            <Phone className="size-5 text-brand-red" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Hai bisogno di aiuto?</h3>
            <p className="text-sm text-muted-foreground">Il nostro team è qui per te. Centralino: <span className="font-semibold text-foreground">+41 76 580 75 17</span></p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-[10px] bg-whatsapp text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            Chatta con noi
          </a>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-red text-white px-6 py-3 font-semibold hover:bg-brand-red-dark transition-colors">
            Continua lo shopping <ArrowRight className="size-4" />
          </Link>
          <Link to="/" className="inline-flex items-center justify-center rounded-[10px] border border-border bg-white px-6 py-3 font-semibold hover:bg-accent transition-colors">
            Torna alla home
          </Link>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Demo mockup: nessun pagamento reale è stato effettuato e nessuna email verrà inviata.
        </p>
      </section>

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}

function Step({ icon: Icon, title, sub }: { icon: React.ComponentType<{ className?: string }>; title: string; sub: string }) {
  return (
    <li className="flex gap-4">
      <div className="grid place-items-center size-10 rounded-full bg-brand-red/10 text-brand-red shrink-0">
        <Icon className="size-5" />
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{sub}</p>
      </div>
    </li>
  );
}
