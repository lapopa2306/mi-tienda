import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Search,
  X as XIcon,
} from "lucide-react";
import axios from "axios";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductModal from "@/components/ProductModal";
import Reveal, { EASE } from "@/components/Reveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fmt = (n) => n.toLocaleString("es-AR");
const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

function ProductCard({ p, onOpen, qtyOf }) {
  const { add, decrement } = useCart();
  const { isFavorite, toggle } = useWishlist();
  const [colorIdx, setColorIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const color = p.colors?.[colorIdx];
  const images = color?.images?.length ? color.images : [p.image];
  const image = images[photoIdx] || images[0];

  const goPhoto = (dir) => {
    setPhotoIdx((i) => (i + dir + images.length) % images.length);
  };

  return (
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
        onClick={() => onOpen(p)}
        className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-smoke"
      >
        <img
          src={image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {images.length > 1 && (
          <>
            <button
              data-testid={`product-photo-prev-${p.id}`}
              onClick={(e) => {
                e.stopPropagation();
                goPhoto(-1);
              }}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-ink opacity-0 backdrop-blur-md transition-opacity duration-300 hover:bg-paper group-hover:opacity-100"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              data-testid={`product-photo-next-${p.id}`}
              onClick={(e) => {
                e.stopPropagation();
                goPhoto(1);
              }}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-ink opacity-0 backdrop-blur-md transition-opacity duration-300 hover:bg-paper group-hover:opacity-100"
            >
              <ChevronRight size={14} />
            </button>
            <div className="pointer-events-none absolute top-3 left-1/2 flex -translate-x-1/2 items-center gap-1">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                    idx === photoIdx ? "bg-ink" : "bg-ink/25"
                  }`}
                />
              ))}
            </div>
          </>
        )}
        {p.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-blush px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink">
            {p.tag}
          </span>
        )}
        <button
          data-testid={`wishlist-toggle-${p.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggle(p.id);
          }}
          aria-label={
            isFavorite(p.id) ? "Quitar de favoritos" : "Agregar a favoritos"
          }
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-paper/85 text-ink backdrop-blur-md transition-colors duration-300 hover:bg-paper"
        >
          <Heart
            size={16}
            className={
              isFavorite(p.id) ? "fill-blush-deep text-blush-deep" : ""
            }
          />
        </button>
        {qtyOf(p.id) > 0 && (
          <motion.span
            key={qtyOf(p.id)}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            data-testid={`in-cart-badge-${p.id}`}
            className="absolute right-14 top-4 flex h-8 min-w-8 items-center justify-center rounded-full bg-ink px-2 font-mono text-xs text-paper shadow-lg"
          >
            {qtyOf(p.id)}
          </motion.span>
        )}
        {p.colors?.length > 0 && (
          <div
            className="absolute bottom-4 left-4 flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {p.colors.map((c, idx) => (
              <button
                key={c.name}
                data-testid={`product-card-color-${p.id}-${c.name.toLowerCase()}`}
                onClick={() => {
                  setColorIdx(idx);
                  setPhotoIdx(0);
                }}
                aria-label={`Color ${c.name}`}
                title={c.name}
                className={`h-6 w-6 rounded-full border shadow-sm transition-transform duration-200 ${
                  idx === colorIdx
                    ? "scale-110 border-ink ring-2 ring-ink/25 ring-offset-1 ring-offset-paper"
                    : "border-paper/80 hover:scale-105"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
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
            onClick={() => add(p, color?.name)}
            aria-label={`Agregar ${p.name} al pedido`}
            className={`group/add flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2.5 text-sm text-ink backdrop-blur-md transition-colors duration-300 hover:bg-ink hover:text-paper ${
              qtyOf(p.id) > 0 ? "" : "md:opacity-0 md:group-hover:opacity-100"
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
            onClick={() => onOpen(p)}
            className="cursor-pointer font-serif text-xl font-light leading-tight transition-colors duration-300 hover:text-ink/60 sm:text-2xl"
          >
            {p.name}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
            {p.category}
            {color?.name ? ` — ${color.name}` : ""}
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
          <p
            data-testid={`cash-discount-${p.id}`}
            className="mt-1 inline-block whitespace-nowrap rounded-sm bg-blush/60 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blush-deep"
          >
            $ {fmt(Math.round(p.price * 0.9))} efectivo / transf.
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Catalog() {
  const [active, setActive] = useState("Todo");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevancia");
  const [selected, setSelected] = useState(null);
  const { items } = useCart();
  const { favorites, showOnlyFavorites, setShowOnlyFavorites } =
    useWishlist();
  const qtyOf = (id) =>
    items.filter((i) => i.id === id).reduce((a, i) => a + i.qty, 0);
  const [dynamicProducts, setDynamicProducts] = useState([]);

  useEffect(() => {
    if (!BACKEND_URL) return;
    axios
      .get(`${BACKEND_URL}/api/products`)
      .then(({ data }) => setDynamicProducts(data))
      .catch(() => {});
  }, []);

  const allProducts = useMemo(
    () => [...dynamicProducts, ...PRODUCTS],
    [dynamicProducts],
  );

  const newArrivals = useMemo(
    () =>
      allProducts.filter(
        (p) => p.is_new && (!p.new_until || new Date(p.new_until) > new Date()),
      ),
    [allProducts],
  );

  // Si entran por un link compartido (?producto=id), abrimos ese producto
  useEffect(() => {
    if (!allProducts.length) return;
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get("producto");
    if (!sharedId) return;
    const found = allProducts.find((p) => p.id === sharedId);
    if (found) setSelected(found);
  }, [allProducts]);

  const closeModal = () => {
    setSelected(null);
    const params = new URLSearchParams(window.location.search);
    if (params.has("producto")) {
      params.delete("producto");
      const rest = params.toString();
      window.history.replaceState(
        {},
        "",
        window.location.pathname + (rest ? `?${rest}` : "") + window.location.hash,
      );
    }
  };

  useEffect(() => {
    if (showOnlyFavorites) setActive("Todo");
  }, [showOnlyFavorites]);

  const filtered = useMemo(() => {
    const byFavorites = showOnlyFavorites
      ? allProducts.filter((p) => favorites.includes(p.id))
      : allProducts;
    const byCategory =
      active === "Todo"
        ? byFavorites
        : byFavorites.filter((p) => p.category === active);
    const q = query.trim().toLowerCase();
    const bySearch = !q
      ? byCategory
      : byCategory.filter((p) => {
          const haystack = [
            p.name,
            p.category,
            p.description || "",
            ...(p.colors?.map((c) => c.name) || []),
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        });
    if (sort === "precio-asc")
      return [...bySearch].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc")
      return [...bySearch].sort((a, b) => b.price - a.price);
    return bySearch;
  }, [active, query, sort, showOnlyFavorites, favorites, allProducts]);

  return (
    <section
      id="catalogo"
      data-testid="catalog-section"
      className="py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-12 lg:px-24">
        {newArrivals.length > 0 && (
          <Reveal className="mb-20 sm:mb-28">
            <p
              data-testid="new-arrivals-section"
              className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50"
            >
              <span className="h-2 w-2 rounded-full bg-blush" />
              Recién llegado
            </p>
            <h2 className="font-serif text-4xl font-light leading-none tracking-tight sm:text-6xl">
              {newArrivals.length === 1 ? "Nuevo" : "Nuevos"}{" "}
              <span className="italic">
                ingreso{newArrivals.length === 1 ? "" : "s"}
              </span>
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} p={p} onOpen={setSelected} qtyOf={qtyOf} />
              ))}
            </div>
          </Reveal>
        )}

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

        <Reveal delay={0.05} className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full max-w-md flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos..."
                data-testid="catalog-search-input"
                className="w-full rounded-full border border-ink/15 bg-transparent py-3 pl-11 pr-11 text-sm text-ink placeholder:text-ink/40 transition-colors duration-300 focus:border-ink/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Limpiar búsqueda"
                  data-testid="catalog-search-clear"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink/40 transition-colors duration-300 hover:bg-ink/5 hover:text-ink"
                >
                  <XIcon size={15} />
                </button>
              )}
            </div>

            <div className="relative">
              <ArrowUpDown
                size={15}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                data-testid="catalog-sort-select"
                aria-label="Ordenar por precio"
                className="appearance-none rounded-full border border-ink/15 bg-transparent py-3 pl-10 pr-9 text-sm text-ink transition-colors duration-300 focus:border-ink/40 focus:outline-none"
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-wrap gap-3">
            <button
              data-testid="category-filter-favoritos"
              onClick={() => setShowOnlyFavorites((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full border px-5 py-2 text-sm transition-colors duration-300 ${
                showOnlyFavorites
                  ? "border-ink bg-blush/60 text-ink"
                  : "border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink"
              }`}
            >
              <Heart
                size={14}
                className={showOnlyFavorites ? "fill-blush-deep text-blush-deep" : ""}
              />
              Favoritos
              {favorites.length > 0 && ` (${favorites.length})`}
            </button>
            {["Todo", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                data-testid={`category-filter-${slug(cat)}`}
                onClick={() => {
                  setActive(cat);
                  setShowOnlyFavorites(false);
                }}
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

        {filtered.length === 0 ? (
          <div
            data-testid="catalog-no-results"
            className="mt-16 flex flex-col items-center gap-3 py-16 text-center"
          >
            <Heart size={28} className="text-ink/25" />
            <p className="font-serif text-xl font-light text-ink/60">
              {showOnlyFavorites
                ? "Todavía no guardaste favoritos"
                : `No encontramos productos para "${query}"`}
            </p>
            <p className="text-sm text-ink/40">
              {showOnlyFavorites
                ? "Tocá el corazón en un producto para guardarlo acá."
                : "Probá con otra palabra o revisá otra categoría."}
            </p>
          </div>
        ) : (
          <motion.div
            layout
            data-testid="product-grid"
            className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  onOpen={setSelected}
                  qtyOf={qtyOf}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      <ProductModal product={selected} onClose={closeModal} />
    </section>
  );
}


