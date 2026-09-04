import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { SITE } from "@/data/site";

const CartContext = createContext(null);
const fmt = (n) => n.toLocaleString("es-AR");
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/coupons/active`)
      .then(({ data }) => setCoupon(data || null))
      .catch(() => setCoupon(null));
  }, []);

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

  const applicableTotal = useMemo(() => {
    if (!coupon) return 0;
    if (!coupon.categories || coupon.categories.length === 0) return total;
    return items
      .filter((i) => coupon.categories.includes(i.category))
      .reduce((a, i) => a + i.qty * i.price, 0);
  }, [coupon, items, total]);

  const discount = coupon ? Math.round((applicableTotal * coupon.percent) / 100) : 0;
  const discountedTotal = total - discount;

  const waUrl = useMemo(() => {
    const origin = window.location.origin + window.location.pathname;
    const lines = items.flatMap((i) => [
      `• ${i.qty} × ${i.name}${i.color ? ` (${i.color})` : ""} — $${fmt(i.price * i.qty)}`,
      `  ${origin}?producto=${i.id}`,
    ]);
    const msg = [
      "Hola Off Course! Quiero hacer este pedido:",
      "",
      ...lines,
      "",
      `Subtotal: $${fmt(total)}`,
      ...(coupon && discount > 0
        ? [
            `Cupón ${coupon.code} (${coupon.percent}% off${
              coupon.categories && coupon.categories.length
                ? ` en ${coupon.categories.join(", ")}`
                : ""
            }): -$${fmt(discount)}`,
            `Total con descuento: $${fmt(discountedTotal)}`,
          ]
        : [`Total estimado: $${fmt(total)}`]),
    ].join("\n");
    return `https://wa.me/${SITE.whatsapp2}?text=${encodeURIComponent(msg)}`;
  }, [items, total, coupon, discount, discountedTotal]);

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
    coupon,
    discount,
    discountedTotal,
    waUrl,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}




