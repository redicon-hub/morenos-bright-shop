import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu, Search, Heart, User, ShoppingCart, MapPin, Truck, ShieldCheck,
  Lightbulb, Gift, MessageCircle, Phone, ChevronDown, ChevronRight,
  Sparkles, Trees, Heart as HeartIcon, Flower2, Egg, Sun, Backpack, Leaf, Ghost,
  ArrowRight, Home, LayoutGrid, X, MoreHorizontal, Apple, SprayCan, Sparkle,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCart, formatCHF } from "@/lib/cart";
import logo from "@/assets/logo-damoreno.png";
import heroLiving from "@/assets/hero-living-room.jpg";
import seasonalAutumn from "@/assets/seasonal-autumn.jpg";
import lineaArredamento from "@/assets/linea-arredamento.jpg";
import lineaKawaii from "@/assets/linea-kawaii.jpg";
import lineaProfumazione from "@/assets/linea-profumazione.jpg";
import lineaBagno from "@/assets/linea-bagno.jpg";
import lineePets from "@/assets/linee-pets.jpg";
import catHomeDecor from "@/assets/cat-home-decor.jpg";
import catCasalinghi from "@/assets/cat-casalinghi.jpg";
import catParty from "@/assets/cat-party.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catCrea from "@/assets/cat-crea.jpg";
import catAnimali from "@/assets/cat-animali.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DA MORENO – Dove tutto costa meno | Casa, idee, regali in Ticino" },
      { name: "description", content: "Tutto per la tua casa, ogni giorno. Idee pratiche, dettagli belli e prezzi che ami. 5 negozi in Ticino, spedizione in tutta la Svizzera da Fr. 4.90." },
      { property: "og:title", content: "DA MORENO – Dove tutto costa meno" },
      { property: "og:description", content: "Tutto per la tua casa, ogni giorno. Idee pratiche e prezzi che ami." },
    ],
  }),
  component: HomePage,
});

const HAMBURGER_CATEGORIES = [
  "ESTIVO", "DETERSIVI", "CASA", "ALIMENTARI", "ANIMALI", "CARTOLERIA",
  "PARTY", "KIDS", "MONOUSO", "PULIZIA E ORDINE", "HOME DECOR", "IGIENE PERSONA",
];

const SEASONS = [
  { label: "NATALE", icon: Trees },
  { label: "CARNEVALE", icon: Sparkles },
  { label: "SAN VALENTINO", icon: HeartIcon },
  { label: "PRIMAVERA", icon: Flower2 },
  { label: "PASQUA", icon: Egg },
  { label: "ESTIVO", icon: Sun },
  { label: "BACK TO SCHOOL", icon: Backpack },
  { label: "AUTUNNO", icon: Leaf },
  { label: "HALLOWEEN", icon: Ghost },
];

const MACRO_LARGE = [
  { label: "HOME DECOR", img: catHomeDecor },
  { label: "ARREDAMENTO", img: lineaArredamento },
  { label: "PROFUMAZIONE", img: lineaProfumazione },
  { label: "CASALINGHI", img: catCasalinghi },
];

const MACRO_SMALL = [
  { label: "PARTY", img: catParty },
  { label: "KIDS", img: catKids },
  { label: "PENSA, CREA, REGALA!", img: catCrea },
  { label: "ANIMALI", img: catAnimali },
];

const MACRO_SERVICE = [
  { label: "ALIMENTARI", icon: Apple },
  { label: "DETERSIVI", icon: SprayCan },
  { label: "IGIENE PERSONA", icon: Sparkle },
];

const LINEE = [
  { label: "Arredamento", img: lineaArredamento },
  { label: "Kawaii & Gadget", img: lineaKawaii },
  { label: "Profumazione", img: lineaProfumazione },
  { label: "Bagno e Benessere", img: lineaBagno },
];

// Posizioni pinpoint (% relative al riquadro mappa) — 5 punti vendita in Ticino
const STORES = [
  { name: "Bodio",        top: "26%", left: "55%" }, // Valle Leventina
  { name: "Sementina",    top: "47%", left: "62%" }, // pressi Bellinzona
  { name: "Muralto",      top: "50%", left: "47%" }, // Locarno
  { name: "Gravesano",    top: "70%", left: "57%" }, // pressi Lugano
  { name: "Sant'Antonino",top: "49%", left: "60%" }, // tra Bellinzona e Locarno
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />
      <Hero />
      <SeasonalBanner />
      <MacroCategories />
      <LineeSection />
      <NovitaPets />
      <InfoStrip />
      <StoresSection />
      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}

/* ────────────────────── HEADER ────────────────────── */

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, subtotal } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* Top utility bar — desktop only */}
      <div className="hidden md:block bg-white border-b border-border text-xs font-bold text-foreground/80">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <span className="flex items-center gap-1.5"><MapPin className="size-3.5 text-brand-red" /> I nostri 5 punti vendita</span>
          <span className="flex items-center gap-1.5"><Truck className="size-3.5 text-brand-red" /> Spedizioni in Svizzera Fr. 4.90 — gratis da 49.90</span>
          <span className="flex items-center gap-1.5"><Phone className="size-3.5 text-brand-red" /> +41 76 580 75 17</span>
          <div className="flex items-center gap-4 font-medium">
            <a href="#" className="hover:text-brand-red">CONTATTI</a>
            <a href="#" className="hover:text-brand-red">Accedi / Registrati</a>
            <span className="flex items-center gap-1">Italiano <ChevronDown className="size-3" /></span>
          </div>
        </div>
      </div>

      {/* MOBILE HEADER — APP STYLE */}
      <div className="md:hidden bg-brand-yellow">
        <div className="px-4 py-2.5 flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="grid place-items-center size-10 rounded-[10px] bg-white/70 active:bg-white transition-colors"
            aria-label="Apri menu"
          >
            <Menu className="size-5 text-foreground" />
          </button>
          <Link to="/" className="flex-1 grid place-items-center">
            <img src={logo} alt="DA MORENO" className="h-10 w-auto" />
          </Link>
          <Link
            to="/carrello"
            className="relative grid place-items-center size-10 rounded-[10px] bg-brand-red text-white active:bg-brand-red-dark transition-colors"
            aria-label="Carrello"
          >
            <ShoppingCart className="size-5" />
            <span className="absolute -top-1 -right-1 grid place-items-center size-4 rounded-full bg-white text-brand-red text-[9px] font-bold border border-brand-red">{count}</span>
          </Link>
        </div>
        {/* Mobile search pill */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca prodotti, idee..."
              className="w-full rounded-full bg-white pl-11 pr-4 py-2.5 text-sm outline-none border border-white focus:border-brand-red transition-colors"
            />
          </div>
        </div>
      </div>

      {/* DESKTOP HEADER — GIALLA */}
      <div className="hidden md:block bg-brand-yellow border-b border-brand-yellow-dark/40">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
          <Link to="/" className="shrink-0">
            <img src={logo} alt="DA MORENO – dove tutto costa meno" className="h-14 md:h-16 w-auto" />
          </Link>

          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca prodotti, categorie, idee..."
                className="w-full rounded-full border-2 border-white bg-white pl-5 pr-14 py-3 text-sm outline-none focus:border-brand-red transition-colors"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 size-10 rounded-full bg-brand-red text-white grid place-items-center hover:bg-brand-red-dark transition-colors" aria-label="Cerca">
                <Search className="size-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <IconLink icon={Heart} label="Preferiti" />
            <IconLink icon={User} label="Account" />
            <Link to="/carrello" className="flex items-center gap-2 rounded-[10px] bg-brand-red text-white px-3 md:px-4 py-2.5 hover:bg-brand-red-dark transition-colors">
              <ShoppingCart className="size-5" />
              <span className="hidden md:inline text-sm font-semibold">{formatCHF(subtotal)}</span>
              <span className="grid place-items-center size-5 rounded-full bg-brand-yellow text-foreground text-[10px] font-bold">{count}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV BAR — red, hidden on mobile */}
      <div className="hidden md:block bg-brand-red text-white">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 font-semibold hover:opacity-90"
            aria-label="Apri menu categorie"
          >
            <Menu className="size-6" />
            <span className="text-sm tracking-wide">ACQUISTA PER CATEGORIA</span>
          </button>
          <Link to="/shop" className="text-sm font-semibold tracking-wide hover:opacity-90">SHOP ONLINE</Link>
          <Link to="/negozi" className="text-sm font-semibold tracking-wide hover:opacity-90">I NOSTRI NEGOZI</Link>

          <a
            href="#"
            className="ml-auto inline-flex items-center gap-2 rounded-[10px] bg-whatsapp text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            <MessageCircle className="size-4" />
            <span>Chatta con noi</span>
          </a>
        </div>
      </div>

      {/* MOBILE category chips strip (sotto search) */}
      <div className="md:hidden bg-brand-red text-white overflow-x-auto no-scrollbar">
        <ul className="flex gap-1 px-3 py-2 min-w-max">
          {["NOVITÀ", "OFFERTE", "ESTIVO", "CASA", "PARTY", "KIDS", "ANIMALI", "DETERSIVI"].map((c) => (
            <li key={c}>
              <Link to="/shop" className="block px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-white/10 active:bg-white/25">
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <CategoryDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function IconLink({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button className="hidden md:flex flex-col items-center gap-0.5 px-3 py-1 text-foreground hover:text-brand-red transition-colors">
      <Icon className="size-5" />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function CategoryDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-brand-yellow h-3" />
        <div className="bg-brand-red text-white px-5 py-5 flex items-center gap-3">
          <button onClick={onClose} aria-label="Chiudi menu" className="grid place-items-center size-9 rounded-full bg-white/15 active:bg-white/30"><X className="size-5" /></button>
          <h2 className="text-xl font-semibold">Acquista per categoria</h2>
        </div>
        <nav className="bg-white card-shadow m-3 rounded-md">
          {HAMBURGER_CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/shop"
              onClick={onClose}
              className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
            >
              <span className="text-base tracking-wide text-foreground/90">{c}</span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

/* ────────────────────── HERO ────────────────────── */

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-3 md:px-4 py-4 md:py-10">
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-3 md:gap-6 items-stretch">
        <div className="bg-white rounded-2xl brand-shadow p-5 md:p-10 flex flex-col justify-center order-2 md:order-1">
          <h1 className="text-2xl md:text-5xl font-bold leading-tight">
            Tutto per la tua casa,<br />ogni giorno.
          </h1>
          <p className="mt-2 md:mt-4 text-muted-foreground text-sm md:text-lg">
            Idee pratiche, dettagli belli e prezzi che ami.
          </p>
          <div className="mt-4 md:mt-8">
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red text-white px-5 md:px-7 py-3 md:py-3.5 text-sm md:text-base font-semibold hover:bg-brand-red-dark transition-colors">
              SCOPRI DI PIÙ <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden brand-shadow bg-muted aspect-[16/10] md:aspect-auto md:min-h-0 order-1 md:order-2">
          <img
            src={heroLiving}
            alt="Salotto accogliente con divano beige e decorazioni"
            className="w-full h-full object-cover"
            width={1280}
            height={768}
          />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── SEASONAL ────────────────────── */

function SeasonalBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-6">
      <div className="rounded-2xl overflow-hidden brand-shadow bg-brand-red text-white grid md:grid-cols-[1.1fr_1fr]">
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            La stagione che ami,<br />tutta da vivere.
          </h2>
          <p className="mt-3 text-white/90 max-w-md">
            Dalle decorazioni ai gadget, tante idee per rendere speciale ogni momento dell'anno.
          </p>
          <div className="mt-6">
            <a href="#" className="inline-flex items-center gap-2 rounded-[10px] bg-brand-yellow text-foreground px-6 py-3 font-semibold hover:bg-brand-yellow-dark transition-colors">
              SCOPRI ORA <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
        <div className="min-h-[220px]">
          <img
            src={seasonalAutumn}
            alt="Decorazioni autunnali con zucche e candele"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1280}
            height={512}
          />
        </div>
      </div>

      {/* Season icons */}
      <div className="mt-4 rounded-2xl bg-brand-red/95 text-white px-3 py-4 overflow-x-auto">
        <ul className="flex md:grid md:grid-cols-9 gap-2 md:gap-3 min-w-max md:min-w-0">
          {SEASONS.map(({ label, icon: Icon }) => (
            <li key={label} className="shrink-0">
              <a href="#" className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors">
                <Icon className="size-7" strokeWidth={1.5} />
                <span className="text-[10px] md:text-[11px] font-semibold tracking-wide whitespace-nowrap">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ────────────────────── MACRO CATEGORIES (4 + 4 con immagini) ────────────────────── */

function MacroCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-4 gap-4 md:gap-8 justify-items-center mb-8">
        {MACRO_LARGE.map(({ label, img }) => (
          <CircleCategory key={label} label={label} img={img} size="lg" />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-3 md:gap-6 justify-items-center">
        {MACRO_SMALL.map(({ label, img }) => (
          <CircleCategory key={label} label={label} img={img} size="sm" />
        ))}
        <MoreCategoriesCircle />
      </div>
    </section>
  );
}

function MoreCategoriesCircle() {
  const dim = "size-24 md:size-32";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="group flex flex-col items-center gap-2 md:gap-3 text-center">
          <div
            className={`${dim} rounded-full overflow-hidden brand-shadow ring-4 ring-white grid place-items-center bg-brand-yellow group-hover:scale-105 transition-transform`}
          >
            <MoreHorizontal className="size-10 md:size-14 text-brand-red" strokeWidth={2.5} />
          </div>
          <span className="text-[11px] md:text-sm font-semibold tracking-wide text-foreground/80 group-hover:text-brand-red transition-colors max-w-[130px]">
            SCOPRI LE ALTRE CATEGORIE
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-64 p-2 rounded-[10px]">
        <ul className="flex flex-col">
          {MACRO_SERVICE.map(({ label, icon: Icon }) => (
            <li key={label}>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent transition-colors"
              >
                <span className="grid place-items-center size-9 rounded-full bg-brand-red/10 text-brand-red">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-semibold tracking-wide text-foreground/90">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

function CircleCategory({
  label, img, size,
}: {
  label: string;
  img: string;
  size: "lg" | "sm";
}) {
  const dim = size === "lg" ? "size-28 md:size-40" : "size-24 md:size-32";
  return (
    <a href="#" className="group flex flex-col items-center gap-2 md:gap-3 text-center">
      <div className={`${dim} rounded-full overflow-hidden brand-shadow ring-4 ring-white group-hover:scale-105 transition-transform`}>
        <img src={img} alt={label} loading="lazy" className="w-full h-full object-cover" width={400} height={400} />
      </div>
      <span className="text-[11px] md:text-sm font-semibold tracking-wide text-foreground/80 group-hover:text-brand-red transition-colors max-w-[130px]">{label}</span>
    </a>
  );
}

/* ────────────────────── LE NOSTRE LINEE ────────────────────── */

function LineeSection() {
  return (
    <section id="linee" className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">Le nostre linee</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {LINEE.map((l) => (
          <a key={l.label} href="#" className="group relative aspect-square rounded-2xl overflow-hidden brand-shadow">
            <img src={l.img} alt={l.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-white text-lg md:text-xl font-semibold">{l.label}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function NovitaPets() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10">
      <a href="#" className="group block relative rounded-2xl overflow-hidden brand-shadow bg-amber-50">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-widest text-brand-red mb-2">NOVITÀ</span>
            <h3 className="text-2xl md:text-3xl font-bold">Novità Cane &amp; Gatto</h3>
            <p className="mt-3 text-muted-foreground max-w-md">
              Barattoli porta crocchette in latta decorati e tutto ciò che serve ai tuoi amici a 4 zampe.
            </p>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red text-white px-6 py-3 font-semibold group-hover:bg-brand-red-dark transition-colors">
                Scopri le novità <ArrowRight className="size-4" />
              </span>
            </div>
          </div>
          <div className="min-h-[220px]">
            <img src={lineePets} alt="Barattoli decorati per cane e gatto" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </a>
    </section>
  );
}

/* ───────── INFO STRIP (ex-pills, spostata in basso) ───────── */

function InfoStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <InfoPill icon={Truck} title="SPEDIZIONE VELOCE" sub="Gratuita sopra Fr. 49.90" />
        <InfoPill icon={ShieldCheck} title="PAGAMENTI SICURI" sub="100% protetti" />
        <InfoPill icon={Lightbulb} title="ISPIRAZIONE QUOTIDIANA" sub="Idee per ogni momento" />
        <InfoPill icon={Gift} title="RESO FACILE" sub="Semplice, senza pensieri" />
      </div>
    </section>
  );
}

function InfoPill({ icon: Icon, title, sub }: { icon: React.ComponentType<{ className?: string }>; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-accent/60 px-4 py-4">
      <Icon className="size-6 text-brand-red shrink-0" />
      <div className="leading-tight">
        <div className="font-semibold text-xs md:text-sm">{title}</div>
        <div className="text-muted-foreground text-[11px] md:text-xs">{sub}</div>
      </div>
    </div>
  );
}

/* ────────────────────── STORES with map ────────────────────── */

function StoresSection() {
  return (
    <section id="stores" className="bg-accent/50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl bg-white p-6 md:p-8 brand-shadow">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-center">
            {/* Lista negozi */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">I nostri negozi in Ticino</h2>
              <p className="text-muted-foreground mt-1 mb-5">Vieni a trovarci nei nostri 5 punti vendita.</p>
              <ul className="space-y-2 mb-6">
                {STORES.map((s) => (
                  <li key={s.name}>
                    <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-accent/40 transition-colors">
                      <span className="grid place-items-center size-8 rounded-full bg-brand-red text-white">
                        <MapPin className="size-4" />
                      </span>
                      <span className="font-semibold">{s.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="/negozi" className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red text-white px-5 py-3 font-semibold hover:bg-brand-red-dark transition-colors">
                SCOPRI TUTTI I NEGOZI <ArrowRight className="size-4" />
              </a>
            </div>

            {/* Mappa stilizzata Ticino con pinpoint */}
            <div className="relative mx-auto w-full max-w-sm aspect-[4/5]">
              <svg viewBox="0 0 200 250" className="w-full h-full" aria-hidden="true">
                <path
                  d="M95 10 C 110 18, 120 30, 118 45 C 130 55, 145 60, 150 78 C 158 95, 145 110, 152 125 C 162 140, 168 158, 158 175 C 150 192, 130 198, 120 215 C 112 230, 95 238, 80 232 C 65 226, 58 210, 52 195 C 45 178, 35 165, 38 148 C 42 130, 55 118, 50 100 C 46 82, 55 65, 68 52 C 75 38, 80 22, 95 10 Z"
                  fill="#f8d030"
                  fillOpacity="0.25"
                  stroke="#c80000"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
              </svg>
              {STORES.map((s) => (
                <div
                  key={s.name}
                  className="absolute -translate-x-1/2 -translate-y-full group"
                  style={{ top: s.top, left: s.left }}
                >
                  <div className="relative flex flex-col items-center">
                    <span className="px-2 py-0.5 mb-1 rounded-md bg-white shadow text-[10px] font-semibold whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      {s.name}
                    </span>
                    <MapPin className="size-6 text-brand-red drop-shadow-md fill-brand-red" strokeWidth={2} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── FOOTER ────────────────────── */

export function Footer() {
  return (
    <footer className="bg-foreground text-white/90">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <img src={logo} alt="DA MORENO" className="h-14 w-auto bg-white rounded-md p-1" />
          <p className="mt-4 text-sm text-white/70">
            Dove tutto costa meno. Tutto per la tua casa, ogni giorno.
          </p>
        </div>
        <FooterCol title="Acquista" links={["Shop online", "Categorie", "Stagionalità", "Bundle", "Novità"]} />
        <FooterCol title="Servizio clienti" links={["Contatti", "Spedizioni", "Resi", "Pagamenti", "FAQ"]} />
        <div>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-white/70 mb-3">Iscriviti per ricevere idee e offerte.</p>
          <form className="flex gap-2">
            <input type="email" placeholder="La tua email" className="flex-1 rounded-full px-4 py-2 text-sm text-foreground" />
            <button type="button" className="rounded-full bg-brand-red px-4 py-2 text-sm font-semibold hover:bg-brand-red-dark transition-colors">Iscriviti</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <span>© {new Date().getFullYear()} DA MORENO SA — Tutti i diritti riservati.</span>
          <span>Confezionato con cura, prezzato con amore e impacchettato in fiocchi gialli da Red Icon SA</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-white/70">
        {links.map((l) => (
          <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

/* ────────────────────── WHATSAPP FAB ────────────────────── */

export function WhatsAppButton() {
  return (
    <a
      href="#"
      aria-label="Contattaci su WhatsApp"
      className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-30 grid place-items-center size-12 md:size-14 rounded-full bg-whatsapp text-white shadow-2xl hover:scale-105 transition-transform"
    >
      <MessageCircle className="size-5 md:size-6" />
    </a>
  );
}

/* ────────────────────── MOBILE BOTTOM TAB BAR (APP-LIKE) ────────────────────── */

export function MobileTabBar() {
  const [active, setActive] = useState("home");
  const tabs = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "cat", label: "Categorie", icon: LayoutGrid, href: "#" },
    { id: "search", label: "Cerca", icon: Search, href: "#", center: true },
    { id: "fav", label: "Preferiti", icon: Heart, href: "#" },
    { id: "acc", label: "Account", icon: User, href: "#" },
  ];
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Navigazione principale"
    >
      <ul className="grid grid-cols-5">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          if (t.center) {
            return (
              <li key={t.id} className="relative">
                <button
                  onClick={() => setActive(t.id)}
                  className="w-full h-16 flex flex-col items-center justify-end pb-1.5"
                >
                  <span className="absolute -top-5 grid place-items-center size-12 rounded-full bg-brand-red text-white shadow-lg ring-4 ring-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="mt-1 text-[10px] font-semibold text-foreground/70">{t.label}</span>
                </button>
              </li>
            );
          }
          return (
            <li key={t.id}>
              <button
                onClick={() => setActive(t.id)}
                className={`w-full h-16 flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? "text-brand-red" : "text-foreground/60"
                }`}
              >
                <Icon className="size-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-semibold">{t.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
