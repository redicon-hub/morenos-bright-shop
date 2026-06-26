import { useSyncExternalStore, useCallback } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

const STORAGE_KEY = "damoreno_cart_v1";
const EVT = "damoreno-cart-change";
const EMPTY: CartItem[] = [];

let cache: CartItem[] = EMPTY;
let hydrated = false;

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const loaded = loadFromStorage();
  if (loaded !== EMPTY) cache = loaded;
}

function read(): CartItem[] {
  hydrate();
  return cache;
}

function readSSR(): CartItem[] {
  return EMPTY;
}

function write(items: CartItem[]) {
  cache = items.length === 0 ? EMPTY : items;
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    /* ignore quota errors */
  }
  window.dispatchEvent(new Event(EVT));
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    // Re-load from storage in case change came from another tab
    const next = loadFromStorage();
    if (next !== cache) cache = next;
    cb();
  };
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", handler);
  };
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, read, readSSR);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    const current = [...read()];
    const idx = current.findIndex((i) => i.slug === item.slug);
    if (idx >= 0) {
      current[idx] = { ...current[idx], qty: current[idx].qty + qty };
    } else {
      current.push({ ...item, qty });
    }
    write(current);
  }, []);

  const removeItem = useCallback((slug: string) => {
    write(read().filter((i) => i.slug !== slug));
  }, []);

  const updateQty = useCallback((slug: string, qty: number) => {
    const current = read();
    const idx = current.findIndex((i) => i.slug === slug);
    if (idx < 0) return;
    if (qty <= 0) {
      write(current.filter((i) => i.slug !== slug));
    } else {
      const next = [...current];
      next[idx] = { ...next[idx], qty };
      write(next);
    }
  }, []);

  const clear = useCallback(() => write([]), []);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);

  return { items, addItem, removeItem, updateQty, clear, count, subtotal };
}

export function formatCHF(n: number) {
  return `CHF ${n.toFixed(2)}`;
}
