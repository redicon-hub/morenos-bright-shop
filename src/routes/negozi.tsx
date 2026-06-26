import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, MessageCircle, ChevronRight, Home, Tag, Sparkles, FlaskConical, Apple, Baby, Headphones } from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";
import heroNegozi from "@/assets/negozi-hero.jpg";
import storefront from "@/assets/negozio-storefront.jpg";

export const Route = createFileRoute("/negozi")({
  head: () => ({
    meta: [
      { title: "I nostri punti vendita – DA MORENO" },
      { name: "description", content: "5 negozi DA MORENO in Ticino: Gravesano, Bodio, Sementina, Muralto, Sant'Antonino. Orari, indirizzi e contatti." },
      { property: "og:title", content: "I nostri punti vendita – DA MORENO" },
      { property: "og:description", content: "5 negozi DA MORENO in Ticino: indirizzi, orari e contatti." },
    ],
  }),
  component: NegoziPage,
});

type Store = {
  id: number;
  name: string;
  address: string;
  zip: string;
  phone: string;
  pin: { top: string; left: string };
  hours: { weekdays: string; sunday: string };
};

const STORES: Store[] = [
  { id: 1, name: "GRAVESANO",     address: "Via al Fiume 1",   zip: "6929 Gravesano",     phone: "091 224 30 31", pin: { top: "70%", left: "57%" }, hours: { weekdays: "8.30 – 19.00", sunday: "9.00 – 18.00" } },
  { id: 2, name: "BODIO",         address: "Via Bellinzona 4", zip: "6743 Bodio",         phone: "091 225 78 68", pin: { top: "26%", left: "55%" }, hours: { weekdays: "8.30 – 19.00", sunday: "9.00 – 18.00" } },
  { id: 3, name: "SEMENTINA",     address: "Via Pobbia 6",     zip: "6514 Sementina",     phone: "091 857 93 04", pin: { top: "47%", left: "62%" }, hours: { weekdays: "8.30 – 19.00", sunday: "9.00 – 18.00" } },
  { id: 4, name: "MURALTO",       address: "Via Stazione 9",   zip: "6600 Muralto",       phone: "091 224 30 31", pin: { top: "50%", left: "47%" }, hours: { weekdays: "8.30 – 19.00", sunday: "9.00 – 18.00" } },
  { id: 5, name: "SANT'ANTONINO", address: "Via Industrie 3",  zip: "6592 Sant'Antonino", phone: "091 224 30 31", pin: { top: "49%", left: "60%" }, hours: { weekdays: "8.30 – 19.00", sunday: "9.00 – 18.00" } },
];

const COSA_TROVI = [
  { icon: Home,          label: "Articoli per la casa" },
  { icon: Tag,           label: "Decorazioni stagionali" },
  { icon: Sparkles,      label: "Party e celebrazioni" },
  { icon: FlaskConical,  label: "Profumazione e candele" },
  { icon: Apple,         label: "Alimentari e bevande" },
  { icon: Baby,          label: "Prodotti per bambini" },
  { icon: ChevronRight,  label: "E tanto altro ancora!" },
];

function NegoziPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      {/* HERO */}
      <section className="relative">
        <div className="grid md:grid-cols-[1fr_1.2fr]">
          <div className="px-4 md:px-10 pt-6 md:pt-10 pb-8 md:pb-12 max-w-3xl">
            <nav className="text-xs text-muted-foreground mb-3">
              <a href="/" className="hover:text-brand-red">Home</a>
              <span className="mx-2">›</span>
              <span className="text-foreground/70">I nostri negozi</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">I nostri punti vendita</h1>
            <p className="mt-3 text-muted-foreground md:text-lg">
              5 negozi in Ticino dove trovare tutto per la casa, ogni giorno.
            </p>
          </div>
          <div className="h-48 md:h-auto md:min-h-[280px] overflow-hidden">
            <img src={heroNegozi} alt="Interno negozio DA MORENO" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* MAPPA + LISTA */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-5 md:gap-6">
          {/* Mappa */}
          <div className="relative rounded-2xl overflow-hidden brand-shadow bg-white aspect-[4/3] md:aspect-auto md:min-h-[420px]">
            <img src={ticinoMap.url} alt="Mappa del Canton Ticino" className="w-full h-full object-cover" />
            {STORES.map((s) => (
              <div
                key={s.id}
                className="absolute -translate-x-1/2 -translate-y-full group"
                style={{ top: s.pin.top, left: s.pin.left }}
              >
                <div className="relative flex flex-col items-center">
                  <span className="px-2 py-0.5 mb-1 rounded-md bg-white shadow text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {s.name}
                  </span>
                  <div className="relative">
                    <MapPin className="size-8 text-brand-red drop-shadow-md fill-brand-red" strokeWidth={2} />
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white">{s.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lista numerata */}
          <div className="rounded-2xl bg-white brand-shadow overflow-hidden">
            <ul>
              {STORES.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#store-${s.id}`}
                    className={`flex items-center gap-4 px-5 py-4 hover:bg-accent/40 transition-colors ${i < STORES.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <span className="grid place-items-center size-8 rounded-full bg-brand-red text-white text-sm font-bold shrink-0">{s.id}</span>
                    <span className="flex-1 font-semibold tracking-wide">{s.name}</span>
                    <ChevronRight className="size-5 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SCOPRI I NOSTRI NEGOZI */}
      <section className="mx-auto max-w-7xl px-4 pb-10 md:pb-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-1">Scopri i nostri negozi</h2>
        <div className="h-1 w-16 bg-brand-red rounded-full mb-6" />

        <div className="grid md:grid-cols-[1fr_320px] gap-6">
          {/* Cards negozi */}
          <div className="flex flex-col gap-4">
            {STORES.map((s) => (
              <article
                key={s.id}
                id={`store-${s.id}`}
                className="rounded-2xl bg-white brand-shadow overflow-hidden grid md:grid-cols-[220px_1fr_auto] items-stretch"
              >
                <div className="h-40 md:h-auto md:min-h-[180px]">
                  <img src={storefront} alt={`Negozio DA MORENO ${s.name}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="grid place-items-center size-7 rounded-full bg-brand-red text-white text-xs font-bold">{s.id}</span>
                    <h3 className="text-lg md:text-xl font-bold">DA MORENO – {s.name}</h3>
                  </div>
                  <p className="text-sm text-foreground/80">{s.address}, {s.zip}</p>
                  <div className="mt-4 flex items-start gap-2 text-sm">
                    <Clock className="size-4 mt-0.5 text-brand-red shrink-0" />
                    <div className="leading-relaxed">
                      <div className="font-semibold text-foreground/90">Orari di apertura</div>
                      <div className="grid grid-cols-[auto_1fr] gap-x-6 text-foreground/80">
                        <span>Lunedì – Sabato</span><span>{s.hours.weekdays}</span>
                        <span>Domenica</span><span>{s.hours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 md:p-6 flex flex-col gap-2 md:min-w-[230px] bg-muted/30">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(s.address + ", " + s.zip)}`}
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 justify-center rounded-[10px] border border-border bg-white px-3 py-2.5 text-xs font-semibold hover:border-brand-red hover:text-brand-red transition-colors"
                  >
                    <MapPin className="size-4" /> APRI SU GOOGLE MAPS
                  </a>
                  <a
                    href={`tel:${s.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 justify-center rounded-[10px] border border-border bg-white px-3 py-2.5 text-xs font-semibold hover:border-brand-red hover:text-brand-red transition-colors"
                  >
                    <Phone className="size-4" /> CHIAMA IL CENTRALINO
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 justify-center rounded-[10px] bg-whatsapp text-white px-3 py-2.5 text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="size-4" /> SCRIVICI SU WHATSAPP
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl bg-brand-yellow/25 p-6">
              <h3 className="text-lg font-bold leading-tight mb-4">Cosa trovi nei<br />nostri negozi</h3>
              <ul className="space-y-3">
                {COSA_TROVI.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    <span className="grid place-items-center size-9 rounded-full bg-white text-foreground/80">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-foreground/85">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-red text-white p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="grid place-items-center size-12 rounded-full bg-white/15">
                  <Headphones className="size-6" />
                </span>
                <div className="text-left">
                  <div className="font-semibold text-sm">Centralino clienti</div>
                  <a href="tel:0912243031" className="text-2xl font-bold tracking-tight">091 224 30 31</a>
                </div>
              </div>
              <div className="text-xs text-white/85 mt-3 leading-relaxed">
                Lunedì – Sabato<br />
                8.30 – 12.00 / 14.00 – 18.30
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}
