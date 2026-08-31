import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductModal from "@/components/ProductModal";
import Reveal, { EASE } from "@/components/Reveal";

const fmt = (n) => n.toLocaleString("es-AR");
const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

export default function Catalog() {
  const [active, setActive] = useState("Todo");
  const [selected, setSelected] = useState(null);
  const { add, decrement, items } = useCart();
  const qtyOf = (id) =>
    items.filter((i) => i.id === id).reduce((a, i) => a + i.qty, 0);

  const filtered = useMemo(
    () =>
      active === "Todo"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === active),
    [active]
  );

  return (
    <section
      id="catalogo"
      data-testid="catalog-section"
      className="py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-12 lg:px-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
                <span className="h-2 w-2 rounded-full bg-blush" />
                01 — Catálogo
              </p>
              <h2 className="font-serif text-4xl font-light leading-none tracking-tight sm:text-6xl">
                Todos nuestros <span className="italic">productos</span>
              </h2>
            </div>
            <p
              data-testid="product-count"
              className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50"
            >
              {filtered.length} productos
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-wrap gap-3">
            {["Todo", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                data-testid={`category-filter-${slug(cat)}`}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-5 py-2 text-sm transition-colors duration-300 ${
                  active === cat
                    ? "border-ink bg-blush/60 text-ink"
                    : "border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          data-testid="product-grid"
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                data-testid={`product-card-${p.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="group"
              >
                <div
                  data-testid={`product-image-${p.id}`}
                  onClick={() => setSelected(p)}
                  className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-smoke"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {p.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-blush px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink">
                      {p.tag}
                    </span>
                  )}
                  {qtyOf(p.id) > 0 && (
                    <motion.span
                      key={qtyOf(p.id)}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      data-testid={`in-cart-badge-${p.id}`}
                      className="absolute right-4 top-4 flex h-8 min-w-8 items-center justify-center rounded-full bg-ink px-2 font-mono text-xs text-paper shadow-lg"
                    >
                      {qtyOf(p.id)}
                    </motion.span>
                  )}
                  <div
                    className="absolute bottom-4 right-4 flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {qtyOf(p.id) > 0 && (
                      <button
                        data-testid={`remove-from-cart-${p.id}`}
                        onClick={() => decrement(p.id)}
                        aria-label={`Quitar ${p.name} del pedido`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink backdrop-blur-md transition-colors duration-300 hover:bg-ink hover:text-paper"
                      >
                        <Minus size={15} />
                      </button>
                    )}
                    <button
                      data-testid={`add-to-cart-${p.id}`}
                      onClick={() => add(p)}
                      aria-label={`Agregar ${p.name} al pedido`}
                      className={`group/add flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2.5 text-sm text-ink backdrop-blur-md transition-colors duration-300 hover:bg-ink hover:text-paper ${
                        qtyOf(p.id) > 0
                          ? ""
                          : "md:opacity-0 md:group-hover:opacity-100"
                      }`}
                    >
                      <Plus size={15} />
                      {qtyOf(p.id) > 0 ? `Agregar (${qtyOf(p.id)})` : "Agregar"}
                    </button>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3
                      onClick={() => setSelected(p)}
                      className="cursor-pointer font-serif text-xl font-light leading-tight transition-colors duration-300 hover:text-ink/60 sm:text-2xl"
                    >
                      {p.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                      {p.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="whitespace-nowrap pt-1 font-mono text-sm text-ink/80">
                      $ {fmt(p.price)}
                    </p>
                    <p
                      data-testid={`installments-${p.id}`}
                      className="mt-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-blush-deep"
                    >
                      3 cuotas de $ {fmt(Math.round(p.price / 3))}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
