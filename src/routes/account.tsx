import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronRight, User as UserIcon, Package, MapPin, Heart, LogOut, Plus,
  Trash2, Mail, Truck, Clock, CheckCircle2, XCircle, ShoppingBag, Edit3, Save,
} from "lucide-react";
import { Header, Footer, WhatsAppButton, MobileTabBar } from "./index";
import { useAccount, type OrderStatus } from "@/lib/account";
import { formatCHF } from "@/lib/cart";
import { PRODUCTS, getProductBySlug } from "@/lib/products";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Area clienti — DA MORENO" },
      { name: "description", content: "Accedi alla tua area riservata: ordini, indirizzi, lista desideri e dati personali." },
      { property: "og:title", content: "Area clienti — DA MORENO" },
      { property: "og:description", content: "Gestisci ordini, indirizzi e lista desideri." },
    ],
  }),
  component: AccountPage,
});

type Tab = "dashboard" | "orders" | "addresses" | "wishlist" | "profile";

function AccountPage() {
  const { account, isAuthenticated, logout } = useAccount();
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Header />

      <section className="bg-accent/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <nav className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Link to="/" className="hover:text-brand-red">Home</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground/80 font-semibold">Area clienti</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold">
            {isAuthenticated ? `Ciao, ${account!.firstName}` : "Area clienti"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAuthenticated ? "Gestisci ordini, indirizzi e preferiti." : "Accedi o registrati per continuare."}
          </p>
        </div>
      </section>

      {!isAuthenticated ? (
        <AuthPanels />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-10 grid md:grid-cols-[260px_1fr] gap-6">
          <aside className="md:sticky md:top-44 self-start">
            <div className="rounded-2xl bg-white brand-shadow p-2">
              <SideItem active={tab === "dashboard"} onClick={() => setTab("dashboard")} icon={UserIcon} label="Panoramica" />
              <SideItem active={tab === "orders"} onClick={() => setTab("orders")} icon={Package} label="I miei ordini" />
              <SideItem active={tab === "addresses"} onClick={() => setTab("addresses")} icon={MapPin} label="Indirizzi" />
              <SideItem active={tab === "wishlist"} onClick={() => setTab("wishlist")} icon={Heart} label="Lista desideri" />
              <SideItem active={tab === "profile"} onClick={() => setTab("profile")} icon={Edit3} label="Dati personali" />
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-brand-red transition-colors mt-1"
              >
                <LogOut className="size-4" /> Esci
              </button>
            </div>
          </aside>

          <div>
            {tab === "dashboard" && <Dashboard onNavigate={setTab} />}
            {tab === "orders" && <OrdersView />}
            {tab === "addresses" && <AddressesView />}
            {tab === "wishlist" && <WishlistView />}
            {tab === "profile" && <ProfileView />}
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}

function SideItem({
  active, onClick, icon: Icon, label,
}: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-semibold transition-colors ${
        active ? "bg-brand-red text-white" : "text-foreground/80 hover:bg-accent hover:text-brand-red"
      }`}
    >
      <Icon className="size-4" /> {label}
    </button>
  );
}

/* ─────────────── AUTH ─────────────── */

function AuthPanels() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const { login, register } = useAccount();
  const [form, setForm] = useState({ email: "giulia.rossi@example.ch", password: "demo1234", firstName: "Giulia", lastName: "Rossi" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    if (mode === "login") {
      login(form.email, form.firstName || "Cliente", form.lastName || "Da Moreno");
    } else {
      register({
        email: form.email,
        firstName: form.firstName || "Cliente",
        lastName: form.lastName || "Da Moreno",
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-white brand-shadow p-6 md:p-8">
        <div className="flex gap-2 mb-6 p-1 rounded-[10px] bg-accent/50">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-[8px] text-sm font-semibold transition-colors ${
              mode === "login" ? "bg-white brand-shadow text-brand-red" : "text-muted-foreground"
            }`}
          >Accedi</button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-[8px] text-sm font-semibold transition-colors ${
              mode === "register" ? "bg-white brand-shadow text-brand-red" : "text-muted-foreground"
            }`}
          >Registrati</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "register" && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nome">
                <input required value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                  className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
              </Field>
              <Field label="Cognome">
                <input required value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                  className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
              </Field>
            </div>
          )}
          <Field label="Email">
            <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
          </Field>
          <Field label="Password">
            <input required type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" />
          </Field>

          {mode === "login" && (
            <div className="text-right">
              <a href="#" className="text-xs text-brand-red font-semibold hover:underline">Password dimenticata?</a>
            </div>
          )}

          <button type="submit"
            className="w-full rounded-[10px] bg-brand-red text-white px-5 py-3 font-semibold hover:bg-brand-red-dark transition-colors">
            {mode === "login" ? "Accedi" : "Crea account"}
          </button>

          <p className="text-[11px] text-muted-foreground text-center pt-2">
            Demo — nessun dato viene inviato. In produzione l'autenticazione userà WooCommerce.
          </p>
        </form>
      </div>

      <div className="rounded-2xl bg-brand-yellow/40 p-6 md:p-8 flex flex-col justify-center">
        <div className="grid place-items-center size-14 rounded-full bg-brand-red text-white mb-4">
          <UserIcon className="size-7" />
        </div>
        <h2 className="text-2xl font-bold mb-3">I vantaggi dell'area clienti</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3"><Package className="size-5 text-brand-red shrink-0 mt-0.5" /><span><b>Storico ordini</b> — Riacquista in un clic i tuoi articoli preferiti.</span></li>
          <li className="flex gap-3"><MapPin className="size-5 text-brand-red shrink-0 mt-0.5" /><span><b>Indirizzi salvati</b> — Checkout più veloce, senza riscrivere ogni volta.</span></li>
          <li className="flex gap-3"><Heart className="size-5 text-brand-red shrink-0 mt-0.5" /><span><b>Lista desideri</b> — Salva ora, compra quando vuoi.</span></li>
          <li className="flex gap-3"><Mail className="size-5 text-brand-red shrink-0 mt-0.5" /><span><b>Offerte esclusive</b> — Sconti e novità riservate ai clienti registrati.</span></li>
        </ul>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-foreground/80 mb-1">{label}</span>
      {children}
    </label>
  );
}

/* ─────────────── DASHBOARD ─────────────── */

function Dashboard({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const { account, orders } = useAccount();
  if (!account) return null;
  const lastOrder = orders[orders.length - 1];

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Package} label="Ordini" value={orders.length.toString()} onClick={() => onNavigate("orders")} />
        <StatCard icon={MapPin} label="Indirizzi" value={account.addresses.length.toString()} onClick={() => onNavigate("addresses")} />
        <StatCard icon={Heart} label="Preferiti" value={account.wishlist.length.toString()} onClick={() => onNavigate("wishlist")} />
      </div>

      <div className="rounded-2xl bg-white brand-shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Ultimo ordine</h2>
          <button onClick={() => onNavigate("orders")} className="text-sm text-brand-red font-semibold hover:underline">
            Vedi tutti →
          </button>
        </div>
        {lastOrder ? <OrderRow order={lastOrder} /> : <EmptyState label="Nessun ordine ancora." />}
      </div>

      <div className="rounded-2xl bg-brand-yellow/30 p-5 flex items-center gap-4">
        <div className="grid place-items-center size-12 rounded-full bg-brand-red text-white shrink-0">
          <ShoppingBag className="size-6" />
        </div>
        <div className="flex-1">
          <p className="font-bold">Continua lo shopping</p>
          <p className="text-sm text-muted-foreground">Scopri le novità della settimana nel nostro shop.</p>
        </div>
        <Link to="/shop" className="rounded-[10px] bg-brand-red text-white px-4 py-2.5 font-semibold text-sm hover:bg-brand-red-dark transition-colors whitespace-nowrap">
          Vai allo shop
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon, label, value, onClick,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-2xl bg-white brand-shadow p-4 text-left hover:ring-2 hover:ring-brand-red transition-all">
      <div className="flex items-center gap-3">
        <div className="grid place-items-center size-10 rounded-full bg-brand-yellow/50 text-brand-red">
          <Icon className="size-5" />
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </div>
    </button>
  );
}

/* ─────────────── ORDERS ─────────────── */

const STATUS_META: Record<OrderStatus, { label: string; icon: React.ComponentType<{ className?: string }>; className: string }> = {
  processing: { label: "In preparazione", icon: Clock, className: "bg-brand-yellow/40 text-foreground" },
  shipped: { label: "Spedito", icon: Truck, className: "bg-blue-100 text-blue-700" },
  delivered: { label: "Consegnato", icon: CheckCircle2, className: "bg-green-100 text-green-700" },
  cancelled: { label: "Annullato", icon: XCircle, className: "bg-red-100 text-red-700" },
};

function OrdersView() {
  const { orders } = useAccount();
  if (!orders.length) return <div className="rounded-2xl bg-white brand-shadow p-8"><EmptyState label="Non hai ancora effettuato ordini." /></div>;
  return (
    <div className="space-y-3">
      {orders.map(o => (
        <div key={o.id} className="rounded-2xl bg-white brand-shadow p-4 md:p-5">
          <OrderRow order={o} />
        </div>
      ))}
    </div>
  );
}

function OrderRow({ order }: { order: import("@/lib/account").Order }) {
  const meta = STATUS_META[order.status];
  const Icon = meta.icon;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
        <div>
          <div className="text-xs text-muted-foreground">Ordine #{order.id}</div>
          <div className="text-sm font-semibold">{new Date(order.date).toLocaleDateString("it-CH", { day: "2-digit", month: "long", year: "numeric" })}</div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${meta.className}`}>
            <Icon className="size-3.5" /> {meta.label}
          </span>
          <span className="font-bold text-brand-red">{formatCHF(order.total)}</span>
        </div>
      </div>
      <ul className="pt-3 space-y-1.5">
        {order.items.map(it => (
          <li key={it.slug} className="flex items-center justify-between gap-3 text-sm">
            <span className="truncate">{it.qty}× {it.name}</span>
            <span className="text-muted-foreground shrink-0">{formatCHF(it.price * it.qty)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────── ADDRESSES ─────────────── */

function AddressesView() {
  const { account, addAddress, removeAddress } = useAccount();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ label: "Casa", firstName: "", lastName: "", street: "", zip: "", city: "", country: "Svizzera", phone: "", isDefault: false });

  if (!account) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(form);
    setOpen(false);
    setForm({ label: "Casa", firstName: "", lastName: "", street: "", zip: "", city: "", country: "Svizzera", phone: "", isDefault: false });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">I tuoi indirizzi</h2>
        <button onClick={() => setOpen(v => !v)} className="inline-flex items-center gap-2 rounded-[10px] bg-brand-red text-white px-4 py-2 text-sm font-semibold hover:bg-brand-red-dark transition-colors">
          <Plus className="size-4" /> Nuovo indirizzo
        </button>
      </div>

      {open && (
        <form onSubmit={submit} className="rounded-2xl bg-white brand-shadow p-5 grid sm:grid-cols-2 gap-3">
          <Field label="Etichetta"><input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" /></Field>
          <Field label="Telefono"><input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" /></Field>
          <Field label="Nome"><input required value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" /></Field>
          <Field label="Cognome"><input required value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" /></Field>
          <div className="sm:col-span-2"><Field label="Via e numero"><input required value={form.street} onChange={e => setForm(f => ({ ...f, street: e.target.value }))} className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" /></Field></div>
          <Field label="CAP"><input required value={form.zip} onChange={e => setForm(f => ({ ...f, zip: e.target.value }))} className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" /></Field>
          <Field label="Città"><input required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" /></Field>
          <div className="sm:col-span-2 flex items-center gap-2">
            <input id="def" type="checkbox" checked={form.isDefault} onChange={e => setForm(f => ({ ...f, isDefault: e.target.checked }))} className="accent-brand-red" />
            <label htmlFor="def" className="text-sm">Imposta come predefinito</label>
          </div>
          <div className="sm:col-span-2 flex gap-2 justify-end">
            <button type="button" onClick={() => setOpen(false)} className="rounded-[10px] border border-border px-4 py-2 text-sm font-semibold hover:bg-accent">Annulla</button>
            <button type="submit" className="rounded-[10px] bg-brand-red text-white px-4 py-2 text-sm font-semibold hover:bg-brand-red-dark">Salva indirizzo</button>
          </div>
        </form>
      )}

      {account.addresses.length === 0 ? (
        <div className="rounded-2xl bg-white brand-shadow p-8"><EmptyState label="Non hai ancora salvato nessun indirizzo." /></div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {account.addresses.map(a => (
            <div key={a.id} className="rounded-2xl bg-white brand-shadow p-5 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wide text-brand-red">{a.label}</span>
                {a.isDefault && <span className="text-[10px] font-bold uppercase bg-brand-yellow/60 rounded-full px-2 py-0.5">Predefinito</span>}
              </div>
              <p className="font-semibold">{a.firstName} {a.lastName}</p>
              <p className="text-sm text-muted-foreground">{a.street}</p>
              <p className="text-sm text-muted-foreground">{a.zip} {a.city}, {a.country}</p>
              {a.phone && <p className="text-sm text-muted-foreground">Tel. {a.phone}</p>}
              <button onClick={() => removeAddress(a.id)} className="absolute top-3 right-3 grid place-items-center size-8 rounded-[10px] text-muted-foreground hover:bg-accent hover:text-brand-red transition-colors" aria-label="Rimuovi">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────── WISHLIST ─────────────── */

function WishlistView() {
  const { account, toggleWishlist } = useAccount();
  if (!account) return null;

  const items = account.wishlist
    .map(slug => getProductBySlug(slug))
    .filter((p): p is NonNullable<ReturnType<typeof getProductBySlug>> => !!p);

  const suggestions = PRODUCTS.filter(p => !account.wishlist.includes(p.slug)).slice(0, 3);

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg">La tua lista desideri</h2>
      {items.length === 0 ? (
        <div className="rounded-2xl bg-white brand-shadow p-8 text-center">
          <div className="mx-auto grid place-items-center size-16 rounded-full bg-brand-yellow/40 mb-3">
            <Heart className="size-8 text-brand-red" />
          </div>
          <p className="font-semibold">Nessun articolo salvato</p>
          <p className="text-sm text-muted-foreground mt-1">Aggiungi i prodotti che ami per ritrovarli qui.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map(p => (
            <div key={p.slug} className="rounded-2xl bg-white brand-shadow p-3 group">
              <Link to="/prodotto/$slug" params={{ slug: p.slug }} className="block rounded-xl overflow-hidden bg-accent/30 aspect-square mb-3">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </Link>
              <Link to="/prodotto/$slug" params={{ slug: p.slug }} className="font-semibold text-sm line-clamp-2 hover:text-brand-red transition-colors">{p.name}</Link>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-brand-red">{formatCHF(p.price)}</span>
                <button onClick={() => toggleWishlist(p.slug)} className="grid place-items-center size-8 rounded-[10px] text-brand-red hover:bg-accent" aria-label="Rimuovi">
                  <Heart className="size-4 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="pt-4">
          <h3 className="font-bold mb-3">Potrebbero piacerti</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {suggestions.map(p => (
              <div key={p.slug} className="rounded-2xl bg-white brand-shadow p-3">
                <Link to="/prodotto/$slug" params={{ slug: p.slug }} className="block rounded-xl overflow-hidden bg-accent/30 aspect-square mb-2">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </Link>
                <div className="text-sm font-semibold line-clamp-1">{p.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-brand-red font-bold text-sm">{formatCHF(p.price)}</span>
                  <button onClick={() => toggleWishlist(p.slug)} className="grid place-items-center size-8 rounded-[10px] text-muted-foreground hover:text-brand-red hover:bg-accent" aria-label="Aggiungi">
                    <Heart className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────── PROFILE ─────────────── */

function ProfileView() {
  const { account, updateProfile } = useAccount();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: account?.firstName ?? "", lastName: account?.lastName ?? "", email: account?.email ?? "" });

  if (!account) return null;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setEditing(false);
  };

  return (
    <div className="rounded-2xl bg-white brand-shadow p-5 md:p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-lg">Dati personali</h2>
        {!editing && (
          <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:underline">
            <Edit3 className="size-4" /> Modifica
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={save} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Nome"><input required value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" /></Field>
            <Field label="Cognome"><input required value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" /></Field>
          </div>
          <Field label="Email"><input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full rounded-[10px] border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red" /></Field>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setEditing(false)} className="rounded-[10px] border border-border px-4 py-2 text-sm font-semibold hover:bg-accent">Annulla</button>
            <button type="submit" className="inline-flex items-center gap-1.5 rounded-[10px] bg-brand-red text-white px-4 py-2 text-sm font-semibold hover:bg-brand-red-dark"><Save className="size-4" /> Salva</button>
          </div>
        </form>
      ) : (
        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
          <div><dt className="text-xs text-muted-foreground font-semibold uppercase">Nome</dt><dd className="mt-0.5 font-semibold">{account.firstName}</dd></div>
          <div><dt className="text-xs text-muted-foreground font-semibold uppercase">Cognome</dt><dd className="mt-0.5 font-semibold">{account.lastName}</dd></div>
          <div className="sm:col-span-2"><dt className="text-xs text-muted-foreground font-semibold uppercase">Email</dt><dd className="mt-0.5 font-semibold">{account.email}</dd></div>
          <div className="sm:col-span-2"><dt className="text-xs text-muted-foreground font-semibold uppercase">Membro da</dt><dd className="mt-0.5 font-semibold">{new Date(account.createdAt).toLocaleDateString("it-CH", { day: "2-digit", month: "long", year: "numeric" })}</dd></div>
        </dl>
      )}

      <div className="mt-6 pt-5 border-t border-border">
        <p className="text-xs text-muted-foreground">
          In produzione questi dati saranno sincronizzati con il tuo profilo cliente WooCommerce.
        </p>
      </div>
    </div>
  );
}

/* ─────────────── HELPERS ─────────────── */

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-6">
      <div className="mx-auto grid place-items-center size-14 rounded-full bg-accent/50 mb-3">
        <Package className="size-6 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
