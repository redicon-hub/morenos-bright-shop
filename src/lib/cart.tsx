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

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVT));
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, read, () => [] as CartItem[]);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    const current = read();
    const idx = current.findIndex((i) => i.slug === item.slug);
    if (idx >= 0) {
      current[idx].qty += qty;
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
      current[idx].qty = qty;
      write(current);
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
