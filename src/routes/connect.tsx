import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, Check, Bot, MessageSquare } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Collega il tuo assistente AI – DA MORENO" },
      {
        name: "description",
        content:
          "Collega ChatGPT o Claude a DA MORENO: chiedi al tuo assistente AI di sfogliare il catalogo, cercare prodotti e trovare i nostri negozi.",
      },
      { property: "og:title", content: "Collega il tuo assistente AI – DA MORENO" },
      {
        property: "og:description",
        content: "Collega ChatGPT o Claude a DA MORENO in pochi click.",
      },
    ],
  }),
  component: ConnectPage,
});

function ConnectPage() {
  const [mcpUrl, setMcpUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMcpUrl(new URL("/mcp", window.location.origin).toString());
    }
  }, []);

  const copy = async () => {
    if (!mcpUrl) return;
    try {
      await navigator.clipboard.writeText(mcpUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      {/* HERO */}
      <section className="border-b border-border bg-accent/30">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-red font-semibold">
            <Bot className="h-4 w-4" /> Assistente AI
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-serif font-bold leading-tight">
            Collega DA MORENO al tuo assistente AI
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
            Chiedi a ChatGPT o Claude di sfogliare il nostro catalogo, cercare
            prodotti, scoprire le categorie o trovare il negozio più vicino —
            direttamente dalla tua chat.
          </p>
        </div>
      </section>

      {/* URL */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="text-xl md:text-2xl font-serif font-bold">
          1. Copia il link di connessione
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ti servirà nei prossimi passaggi. È un indirizzo unico e sicuro.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row items-stretch gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm">
          <code className="flex-1 truncate rounded-xl bg-muted px-4 py-3 text-sm font-mono text-foreground">
            {mcpUrl || "…"}
          </code>
          <button
            onClick={copy}
            disabled={!mcpUrl}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" /> Copiato
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copia link
              </>
            )}
          </button>
        </div>
      </section>

      {/* STEPS */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="text-xl md:text-2xl font-serif font-bold">
          2. Aggiungilo al tuo assistente
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Scegli il tuo assistente e segui i passaggi. Bastano meno di due minuti.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-5">
          {/* ChatGPT */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-foreground text-background flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">ChatGPT</h3>
                <p className="text-xs text-muted-foreground">Su chatgpt.com</p>
              </div>
            </div>
            <ol className="mt-5 space-y-3 text-sm">
              <Step n={1}>
                Apri{" "}
                <a
                  href="https://chatgpt.com/#settings/Connectors/Advanced"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-red font-semibold underline underline-offset-2"
                >
                  Impostazioni → Connettori → Avanzate
                </a>{" "}
                e attiva la <b>Modalità sviluppatore</b> (leggi l'avviso mostrato).
              </Step>
              <Step n={2}>
                Nella chat, apri il menu <b>“+”</b> nel campo di scrittura e
                attiva la Modalità sviluppatore.
              </Step>
              <Step n={3}>
                Tocca <b>“Aggiungi sorgenti”</b>, poi <b>“Connect more”</b>.
              </Step>
              <Step n={4}>
                Dai un nome al connettore (es. <i>DA MORENO</i>) e incolla il
                link copiato sopra.
              </Step>
              <Step n={5}>
                Chiedi a ChatGPT di usare DA MORENO — ad esempio: <i>“cerca
                un vaso in ceramica su DA MORENO”</i>.
              </Step>
            </ol>
          </div>

          {/* Claude */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-red text-white flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Claude</h3>
                <p className="text-xs text-muted-foreground">Su claude.ai</p>
              </div>
            </div>
            <ol className="mt-5 space-y-3 text-sm">
              <Step n={1}>
                Apri{" "}
                <a
                  href="https://claude.ai/customize/connectors?modal=add-custom-connector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-red font-semibold underline underline-offset-2"
                >
                  Aggiungi connettore personalizzato
                </a>
                .
              </Step>
              <Step n={2}>
                Dai un nome al connettore (es. <i>DA MORENO</i>) e incolla il
                link copiato sopra.
              </Step>
              <Step n={3}>
                Attiva il connettore dal campo di scrittura della chat e chiedi
                a Claude di usare DA MORENO.
              </Step>
            </ol>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-accent/40 p-5 text-sm text-muted-foreground">
          <b className="text-foreground">Cosa può fare?</b> Il tuo assistente
          potrà sfogliare le categorie, cercare prodotti, ottenere i dettagli
          di un articolo e trovare i nostri 5 negozi in Ticino.
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors"
          >
            Torna alla home
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center">
        {n}
      </span>
      <span className="flex-1 pt-0.5">{children}</span>
    </li>
  );
}
