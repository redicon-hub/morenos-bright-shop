import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu, Search, Heart, User, ShoppingCart, MapPin, Truck, ShieldCheck,
  Lightbulb, Gift, Headphones, MessageCircle, Phone, ChevronDown, ChevronRight,
  Sparkles, Trees, Heart as HeartIcon, Flower2, Egg, Sun, Backpack, Leaf, Ghost,
  Home, Sofa, SprayCan, UtensilsCrossed, PartyPopper, Baby, PaintBucket, PawPrint,
  MoreHorizontal, Instagram, Facebook, Music2, Bell, ArrowRight,
} from "lucide-react";
import logo from "@/assets/logo-damoreno.png";
import heroLiving from "@/assets/hero-living-room.jpg";
import seasonalAutumn from "@/assets/seasonal-autumn.jpg";
import lineaArredamento from "@/assets/linea-arredamento.jpg";
import lineaKawaii from "@/assets/linea-kawaii.jpg";
import lineaProfumazione from "@/assets/linea-profumazione.jpg";
import lineaBagno from "@/assets/linea-bagno.jpg";
import lineePets from "@/assets/linee-pets.jpg";

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
  { label: "HOME DECOR", icon: Home, bg: "from-rose-100 to-rose-200" },
  { label: "ARREDAMENTO", icon: Sofa, bg: "from-amber-100 to-amber-200" },
  { label: "PROFUMAZIONE", icon: SprayCan, bg: "from-violet-100 to-violet-200" },
  { label: "CASALINGHI", icon: UtensilsCrossed, bg: "from-sky-100 to-sky-200" },
];

const MACRO_SMALL = [
  { label: "PARTY", icon: PartyPopper, bg: "from-pink-100 to-pink-200" },
  { label: "KIDS", icon: Baby, bg: "from-yellow-100 to-yellow-200" },
  { label: "PENSA, CREA, REGALA!", icon: PaintBucket, bg: "from-emerald-100 to-emerald-200" },
  { label: "ANIMALI", icon: PawPrint, bg: "from-orange-100 to-orange-200" },
  { label: "SCOPRI LE ALTRE", icon: MoreHorizontal, bg: "from-stone-100 to-stone-200" },
];

const LINEE = [
  { label: "Arredamento", img: lineaArredamento },
  { label: "Kawaii & Gadget", img: lineaKawaii },
  { label: "Profumazione", img: lineaProfumazione },
  { label: "Bagno e Benessere", img: lineaBagno },
];

const STORES = ["Gravesano", "Bodio", "Sementina", "Muralto", "Sant'Antonino"];

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <SeasonalBanner />
      <MacroCategories />
      <LineeSection />
      <NovitaPets />
      <SocialSection />
      <StoresSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

/* ────────────────────── HEADER ────────────────────── */

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* Top utility bar */}
      <div className="bg-brand-yellow text-foreground text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-center md:justify-between gap-x-5 gap-y-1">
          <div className="hidden md:flex items-center gap-5">
            <span className="flex items-center gap-1.5"><MapPin className="size-3.5" /> I nostri 5 punti vendita</span>
            <span className="flex items-center gap-1.5"><Truck className="size-3.5" /> Spedizioni in Svizzera Fr. 4.90 — gratis da 49.90</span>
            <span className="flex items-center gap-1.5"><Phone className="size-3.5" /> +41 76 580 75 17</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <a href="#" className="hover:underline">CONTATTI</a>
            <a href="#" className="hover:underline">Accedi / Registrati</a>
            <span className="flex items-center gap-1">Italiano <ChevronDown className="size-3" /></span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
          <a href="/" className="shrink-0">
            <img src={logo} alt="DA MORENO – dove tutto costa meno" className="h-14 md:h-16 w-auto" />
          </a>

          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca prodotti, categorie, idee..."
                className="w-full rounded-full border-2 border-brand-yellow bg-white pl-5 pr-14 py-3 text-sm outline-none focus:border-brand-red transition-colors"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 size-10 rounded-full bg-brand-red text-white grid place-items-center hover:bg-brand-red-dark transition-colors" aria-label="Cerca">
                <Search className="size-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <IconLink icon={Heart} label="Preferiti" />
            <IconLink icon={User} label="Account" />
            <button className="flex items-center gap-2 rounded-full bg-brand-red text-white px-3 md:px-4 py-2.5 hover:bg-brand-red-dark transition-colors">
              <ShoppingCart className="size-5" />
              <span className="hidden md:inline text-sm font-semibold">CHF 0.00</span>
              <span className="grid place-items-center size-5 rounded-full bg-brand-yellow text-foreground text-[10px] font-bold">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info pills */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <InfoPill icon={Truck} title="SPEDIZIONE VELOCE" sub="Gratuita sopra Fr. 49.90" />
          <InfoPill icon={ShieldCheck} title="PAGAMENTI SICURI" sub="100% protetti" />
          <InfoPill icon={Lightbulb} title="ISPIRAZIONE QUOTIDIANA" sub="Idee per ogni momento" />
          <InfoPill icon={Gift} title="RESO FACILE" sub="Semplice, senza pensieri" />
          <a href="#" className="hidden md:flex items-center gap-2 rounded-xl bg-whatsapp text-white px-3 py-2 hover:opacity-90 transition">
            <Headphones className="size-5 shrink-0" />
            <div className="leading-tight">
              <div className="text-[10px] opacity-90">ASSISTENZA CLIENTI</div>
              <div className="font-semibold">Chatta con noi</div>
            </div>
          </a>
        </div>
      </div>

      {/* Nav bar with hamburger */}
      <div className="bg-brand-red text-white">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 font-semibold hover:opacity-90"
            aria-label="Apri menu categorie"
          >
            <Menu className="size-6" />
            <span className="hidden md:inline text-sm tracking-wide">ACQUISTA PER CATEGORIA</span>
          </button>
          <a href="#" className="text-sm font-semibold tracking-wide hover:opacity-90">SHOP ONLINE</a>
          <a href="#stores" className="text-sm font-semibold tracking-wide hover:opacity-90">I NOSTRI NEGOZI</a>
        </div>
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

function InfoPill({ icon: Icon, title, sub }: { icon: React.ComponentType<{ className?: string }>; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-accent/60 px-3 py-2">
      <Icon className="size-5 text-brand-red shrink-0" />
      <div className="leading-tight">
        <div className="font-semibold text-[10px] md:text-xs">{title}</div>
        <div className="text-muted-foreground text-[10px] md:text-[11px]">{sub}</div>
      </div>
    </div>
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
          <button onClick={onClose} aria-label="Chiudi menu"><Menu className="size-6" /></button>
          <h2 className="text-xl font-semibold">Acquista per categoria</h2>
        </div>
        <nav className="bg-white card-shadow m-3 rounded-md">
          {HAMBURGER_CATEGORIES.map((c) => (
            <a
              key={c}
              href="#"
              className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
            >
              <span className="text-base tracking-wide text-foreground/90">{c}</span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}

/* ────────────────────── HERO ────────────────────── */

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 items-stretch">
        <div className="bg-white rounded-2xl brand-shadow p-8 md:p-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Tutto per la tua casa,<br />ogni giorno.
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Idee pratiche, dettagli belli e prezzi che ami.
          </p>
          <div className="mt-8">
            <a href="#linee" className="inline-flex items-center gap-2 rounded-full bg-foreground text-white px-7 py-3.5 font-semibold hover:bg-brand-red transition-colors">
              SCOPRI DI PIÙ <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden brand-shadow bg-muted min-h-[280px] md:min-h-0">
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
            <a href="#" className="inline-flex items-center gap-2 rounded-full bg-brand-yellow text-foreground px-6 py-3 font-semibold hover:bg-brand-yellow-dark transition-colors">
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

/* ────────────────────── MACRO CATEGORIES ────────────────────── */

function MacroCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-4 gap-4 md:gap-8 justify-items-center mb-8">
        {MACRO_LARGE.map(({ label, icon: Icon, bg }) => (
          <CircleCategory key={label} label={label} Icon={Icon} bg={bg} size="lg" />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-3 md:gap-6 justify-items-center">
        {MACRO_SMALL.map(({ label, icon: Icon, bg }) => (
          <CircleCategory key={label} label={label} Icon={Icon} bg={bg} size="sm" />
        ))}
      </div>
    </section>
  );
}

function CircleCategory({
  label, Icon, bg, size,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  bg: string;
  size: "lg" | "sm";
}) {
  const dim = size === "lg" ? "size-24 md:size-36" : "size-20 md:size-28";
  return (
    <a href="#" className="group flex flex-col items-center gap-2 md:gap-3 text-center">
      <div className={`${dim} rounded-full bg-gradient-to-br ${bg} grid place-items-center brand-shadow group-hover:scale-105 transition-transform`}>
        <Icon className={size === "lg" ? "size-12 md:size-16" : "size-9 md:size-12"} strokeWidth={1.4} />
      </div>
      <span className="text-[11px] md:text-sm font-semibold tracking-wide text-foreground/80 group-hover:text-brand-red transition-colors max-w-[110px]">{label}</span>
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
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-red text-white px-6 py-3 font-semibold group-hover:bg-brand-red-dark transition-colors">
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

/* ────────────────────── SOCIAL ────────────────────── */

function SocialSection() {
  const posts = [
    "from-rose-200 to-amber-200",
    "from-sky-200 to-violet-200",
    "from-emerald-200 to-yellow-200",
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">Seguici sui social e vieni a trovarci</h2>
      <p className="text-center text-muted-foreground mb-8">Le ultime ispirazioni direttamente dai nostri canali.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {posts.map((g, i) => (
          <a key={i} href="#" className={`aspect-square rounded-2xl bg-gradient-to-br ${g} grid place-items-center brand-shadow hover:scale-[1.02] transition-transform`}>
            <Instagram className="size-12 text-white/80" strokeWidth={1.4} />
          </a>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <SocialIcon icon={Instagram} />
        <SocialIcon icon={Music2} label="TikTok" />
        <SocialIcon icon={Facebook} />
      </div>
    </section>
  );
}

function SocialIcon({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label?: string }) {
  return (
    <a href="#" aria-label={label ?? "social"} className="size-12 rounded-full bg-foreground text-white grid place-items-center hover:bg-brand-red transition-colors">
      <Icon className="size-5" />
    </a>
  );
}

/* ────────────────────── STORES ────────────────────── */

function StoresSection() {
  return (
    <section id="stores" className="bg-accent/50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl bg-white p-6 md:p-8 brand-shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">I nostri negozi in Ticino</h2>
              <p className="text-muted-foreground mt-1">Vieni a trovarci nei nostri 5 punti vendita.</p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 rounded-full bg-brand-yellow text-foreground px-5 py-3 font-semibold hover:bg-brand-yellow-dark transition-colors w-fit">
              SCOPRI TUTTI I NEGOZI <ArrowRight className="size-4" />
            </a>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {STORES.map((s) => (
              <li key={s}>
                <a href="#" className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 hover:border-brand-red hover:bg-accent/40 transition-colors">
                  <MapPin className="size-4 text-brand-red" />
                  <span className="font-semibold">{s}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── FOOTER ────────────────────── */

function Footer() {
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
          <span>© {new Date().getFullYear()} DA MORENO Sagl — Tutti i diritti riservati.</span>
          <span>Privacy · Cookie · Termini</span>
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

function WhatsAppButton() {
  return (
    <a
      href="#"
      aria-label="Contattaci su WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex items-center gap-3 rounded-full bg-whatsapp text-white pl-4 pr-5 py-3 font-semibold shadow-2xl hover:scale-105 transition-transform"
    >
      <span className="grid place-items-center size-9 rounded-full bg-white/15">
        <MessageCircle className="size-5" />
      </span>
      <span className="hidden sm:inline">Chatta con noi</span>
      <Bell className="size-4 absolute -top-1 -right-1 hidden" />
    </a>
  );
}
