import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SITE } from "@/data/site";

const CartContext = createContext(null);
const fmt = (n) => n.toLocaleString("es-AR");

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("oc-cart")) || [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("oc-cart", JSON.stringify(items));
  }, [items]);

  const add = (p) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === p.id);
      return found
        ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...p, qty: 1 }];
    });
    toast.success("Agregado a tu pedido", { description: p.name });
  };

  const setQty = (id, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((a, i) => a + i.qty, 0);
  const total = items.reduce((a, i) => a + i.qty * i.price, 0);

  const waUrl = useMemo(() => {
    const lines = items.map(
      (i) => `• ${i.qty} × ${i.name} — $${fmt(i.price * i.qty)}`
    );
    const msg = [
      "Hola Off Course! Quiero hacer este pedido:",
      "",
      ...lines,
      "",
      `Total estimado: $${fmt(total)}`,
    ].join("\n");
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [items, total]);

  const value = {
    items,
    add,
    setQty,
    remove,
    clear,
    open,
    setOpen,
    count,
    total,
    waUrl,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
