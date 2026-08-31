import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SITE } from "@/data/site";

const CartContext = createContext(null);
const fmt = (n) => n.toLocaleString("es-AR");

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("oc-cart")) || [];
      return saved.map((i) => (i.key ? i : { ...i, key: i.id, color: null }));
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("oc-cart", JSON.stringify(items));
  }, [items]);

  const add = (p, colorName) => {
    const color = p.colors
      ? p.colors.find((c) => c.name === colorName) || p.colors[0]
      : null;
    const key = color ? `${p.id}__${color.name}` : p.id;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      return found
        ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
        : [
            ...prev,
            {
              key,
              id: p.id,
              name: p.name,
              category: p.category,
              price: p.price,
              image: color?.images?.[0] || p.image,
              color: color?.name || null,
              qty: 1,
            },
          ];
    });
    toast.success("Agregado a tu pedido", {
      description: color ? `${p.name} — ${color.name}` : p.name,
    });
  };

  const setQty = (key, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    );

  const decrement = (productId) => {
    setItems((prev) => {
      const match = [...prev].reverse().find((i) => i.id === productId);
      if (!match) return prev;
      return match.qty <= 1
        ? prev.filter((i) => i.key !== match.key)
        : prev.map((i) =>
            i.key === match.key ? { ...i, qty: i.qty - 1 } : i
          );
    });
  };

  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
  const clear = () => setItems([]);

  const count = items.reduce((a, i) => a + i.qty, 0);
  const total = items.reduce((a, i) => a + i.qty * i.price, 0);

  const waUrl = useMemo(() => {
    const lines = items.map(
      (i) =>
        `• ${i.qty} × ${i.name}${i.color ? ` (${i.color})` : ""} — $${fmt(i.price * i.qty)}`
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
    decrement,
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
