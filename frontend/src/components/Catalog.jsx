import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Reveal, { EASE } from "@/components/Reveal";

const SPANS = [
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-7",
  "md:col-span-5",
];
const ASPECTS = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[3/4]",
];
const fmt = (n) => n.toLocaleString("es-AR");
const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

export default function Catalog() {
  const [active, setActive] = useState("Todo");
  const { add } = useCart();

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
                Todas las <span className="italic">piezas</span>
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
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12 lg:gap-x-12"
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
                className={`group ${SPANS[i % SPANS.length]}`}
              >
                <div
                  className={`relative overflow-hidden bg-smoke ${ASPECTS[i % ASPECTS.length]}`}
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
                  <button
                    data-testid={`add-to-cart-${p.id}`}
                    onClick={() => add(p)}
                    aria-label={`Agregar ${p.name} al pedido`}
                    className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2.5 text-sm text-ink opacity-100 backdrop-blur-md transition-colors duration-300 hover:bg-ink hover:text-paper md:opacity-0 md:group-hover:opacity-100"
                  >
                    <Plus size={15} />
                    Agregar
                  </button>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-light leading-tight sm:text-2xl">
                      {p.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                      {p.category}
                    </p>
                  </div>
                  <p className="whitespace-nowrap pt-1 font-mono text-sm text-ink/80">
                    $ {fmt(p.price)}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
