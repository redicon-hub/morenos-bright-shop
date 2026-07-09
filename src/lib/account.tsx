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
    date: "2026-06-28",
    status: "delivered",
    total: 87.6,
    items: [
      { slug: "cuscino-boucle-panna", name: "Cuscino bouclé panna", image: "", qty: 2, price: 24.9 },
      { slug: "candela-vaniglia", name: "Candela profumata vaniglia", image: "", qty: 1, price: 12.9 },
    ],
  },
  {
    id: "DM-2026-0198",
    date: "2026-07-02",
    status: "shipped",
    total: 42.5,
    items: [
      { slug: "set-asciugamani-cotone", name: "Set asciugamani cotone", image: "", qty: 1, price: 39.9 },
    ],
  },
];

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

  const login = useCallback((email: string, firstName = "Cliente", lastName = "Da Moreno") => {
    const existing = load();
    if (existing && existing.email === email) { write(existing); return; }
    write({
      email,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
      addresses: [],
      wishlist: [],
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
