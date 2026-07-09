import { useSyncExternalStore, useCallback } from "react";

export type Address = {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
};

export type Account = {
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  addresses: Address[];
  wishlist: string[]; // product slugs
};

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";
export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: { slug: string; name: string; image: string; qty: number; price: number }[];
};

const STORAGE_KEY = "damoreno_account_v1";
const EVT = "damoreno-account-change";

let cache: Account | null = null;
let hydrated = false;

const DEMO_ORDERS: Order[] = [
  {
    id: "DM-2026-0142",
    date: "2026-05-14",
    status: "delivered",
    total: 62.7,
    items: [
      { slug: "vaso-decorativo-ceramica", name: "Vaso decorativo in ceramica opaca", image: "", qty: 2, price: 14.9 },
      { slug: "candela-profumata-vaniglia", name: "Candela profumata vetro — Vaniglia", image: "", qty: 4, price: 7.9 },
    ],
  },
  {
    id: "DM-2026-0198",
    date: "2026-06-02",
    status: "delivered",
    total: 128.9,
    items: [
      { slug: "set-pentole-antiaderente-5pz", name: "Set pentole antiaderenti 5 pezzi", image: "", qty: 1, price: 79.0 },
      { slug: "set-piatti-porcellana-12pz", name: "Set piatti porcellana 12 pezzi", image: "", qty: 1, price: 49.9 },
    ],
  },
  {
    id: "DM-2026-0231",
    date: "2026-06-24",
    status: "shipped",
    total: 51.8,
    items: [
      { slug: "set-asciugamani-cotone-3pz", name: "Set asciugamani in cotone 3 pezzi", image: "", qty: 1, price: 19.9 },
      { slug: "tappeto-bagno-microfibra", name: "Tappeto bagno in microfibra", image: "", qty: 1, price: 11.9 },
      { slug: "diffusore-bastoncini-fico", name: "Diffusore a bastoncini — Fico & Cedro", image: "", qty: 1, price: 12.5 },
    ],
  },
  {
    id: "DM-2026-0264",
    date: "2026-07-05",
    status: "processing",
    total: 39.9,
    items: [
      { slug: "lampada-da-tavolo-rattan", name: "Lampada da tavolo in rattan naturale", image: "", qty: 1, price: 39.9 },
    ],
  },
  {
    id: "DM-2026-0119",
    date: "2026-04-30",
    status: "cancelled",
    total: 9.9,
    items: [
      { slug: "kit-festa-compleanno-rosso", name: "Kit festa compleanno — tema rosso", image: "", qty: 1, price: 9.9 },
    ],
  },
];

const DEMO_ADDRESSES: Address[] = [
  {
    id: "a_demo_1",
    label: "Casa",
    firstName: "Giulia",
    lastName: "Rossi",
    street: "Via Nassa 22",
    zip: "6900",
    city: "Lugano",
    country: "Svizzera",
    phone: "+41 79 123 45 67",
    isDefault: true,
  },
  {
    id: "a_demo_2",
    label: "Ufficio",
    firstName: "Giulia",
    lastName: "Rossi",
    street: "Piazza della Riforma 5",
    zip: "6900",
    city: "Lugano",
    country: "Svizzera",
    phone: "+41 91 987 65 43",
  },
];

const DEMO_WISHLIST = ["lampada-da-tavolo-rattan", "cuscino-decorativo-velluto", "ghirlanda-autunno-foglie"];

function load(): Account | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Account) : null;
  } catch {
    return null;
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  cache = load();
}

function read(): Account | null {
  hydrate();
  return cache;
}

function readSSR(): Account | null {
  return null;
}

function write(next: Account | null) {
  cache = next;
  if (typeof window === "undefined") return;
  try {
    if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
  window.dispatchEvent(new Event(EVT));
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => { cache = load(); cb(); };
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", handler);
  };
}

export function useAccount() {
  const account = useSyncExternalStore(subscribe, read, readSSR);

  const login = useCallback((email: string, firstName = "Giulia", lastName = "Rossi") => {
    const existing = load();
    if (existing && existing.email === email) { write(existing); return; }
    write({
      email,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
      addresses: DEMO_ADDRESSES,
      wishlist: DEMO_WISHLIST,
    });
  }, []);

  const register = useCallback((data: { email: string; firstName: string; lastName: string }) => {
    write({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: new Date().toISOString(),
      addresses: [],
      wishlist: [],
    });
  }, []);

  const logout = useCallback(() => write(null), []);

  const updateProfile = useCallback((patch: Partial<Pick<Account, "firstName" | "lastName" | "email">>) => {
    const cur = read(); if (!cur) return;
    write({ ...cur, ...patch });
  }, []);

  const addAddress = useCallback((addr: Omit<Address, "id">) => {
    const cur = read(); if (!cur) return;
    const id = `a_${Date.now()}`;
    const addresses = [...cur.addresses, { ...addr, id }];
    if (addr.isDefault) addresses.forEach(a => { a.isDefault = a.id === id; });
    if (addresses.length === 1) addresses[0].isDefault = true;
    write({ ...cur, addresses });
  }, []);

  const removeAddress = useCallback((id: string) => {
    const cur = read(); if (!cur) return;
    const addresses = cur.addresses.filter(a => a.id !== id);
    if (addresses.length && !addresses.some(a => a.isDefault)) addresses[0].isDefault = true;
    write({ ...cur, addresses });
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    const cur = read(); if (!cur) return;
    const wishlist = cur.wishlist.includes(slug)
      ? cur.wishlist.filter(s => s !== slug)
      : [...cur.wishlist, slug];
    write({ ...cur, wishlist });
  }, []);

  return {
    account,
    isAuthenticated: !!account,
    login,
    register,
    logout,
    updateProfile,
    addAddress,
    removeAddress,
    toggleWishlist,
    orders: account ? DEMO_ORDERS : [],
  };
}
