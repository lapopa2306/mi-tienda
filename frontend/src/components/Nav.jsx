import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { scrollToHash } from "@/lib/scroll";

const LINKS = [
  { label: "Catálogo", hash: "#catalogo", testid: "nav-link-catalogo" },
  { label: "Nosotros", hash: "#nosotros", testid: "nav-link-nosotros" },
  { label: "Envíos", hash: "#envios", testid: "nav-link-envios" },
  { label: "Contacto", hash: "#contacto", testid: "nav-link-contacto" },
];

export default function Nav() {
  const { count, setOpen } = useCart();
  const { count: favCount, showOnlyFavorites, setShowOnlyFavorites } =
    useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-ink/5 bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 sm:px-12 lg:px-24">
        <a
          href="#top"
          data-testid="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            window.__lenis
              ? window.__lenis.scrollTo(0)
              : window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="Off Course — Marroquinería"
            className="h-11 w-11 rounded-full"
          />
          <span className="hidden font-serif text-2xl tracking-tight sm:block">
            <span className="font-light">Off</span>{" "}
            <span className="italic">Course</span>
            <span className="text-blush">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.hash}
              href={l.hash}
              data-testid={l.testid}
              onClick={(e) => scrollToHash(e, l.hash)}
              className="group relative font-mono text-[11px] uppercase tracking-[0.22em] text-ink/70 transition-colors duration-300 hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-blush transition-[width] duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            data-testid="nav-favorites-button"
            onClick={(e) => {
              if (showOnlyFavorites) {
                setShowOnlyFavorites(false);
              } else {
                setShowOnlyFavorites(true);
                scrollToHash(e, "#catalogo");
              }
            }}
            aria-label={showOnlyFavorites ? "Ver todo el catálogo" : "Ver favoritos"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-ink/5"
          >
            <Heart
              size={17}
              strokeWidth={1.5}
              className={showOnlyFavorites ? "fill-blush-deep text-blush-deep" : ""}
            />
            <AnimatePresence mode="popLayout">
              {favCount > 0 && (
                <motion.span
                  key={favCount}
                  data-testid="favorites-count-badge"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-blush font-mono text-[11px] text-ink"
                >
                  {favCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            data-testid="cart-open-button"
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-colors duration-300 hover:bg-ink/85"
          >
            <ShoppingBag size={15} strokeWidth={1.5} />
            <span className="hidden sm:inline">Pedido</span>
            <AnimatePresence mode="popLayout">
              {count > 0 && (
                <motion.span
                  key={count}
                  data-testid="cart-count-badge"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-blush font-mono text-[11px] text-ink"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            data-testid="nav-mobile-menu-button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-ink/5 md:hidden"
          >
            {mobileOpen ? (
              <X size={18} strokeWidth={1.5} />
            ) : (
              <Menu size={18} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink/5 bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.hash}
                  href={l.hash}
                  data-testid={`${l.testid}-mobile`}
                  onClick={(e) => {
                    scrollToHash(e, l.hash);
                    setMobileOpen(false);
                  }}
                  className="py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-ink/70 transition-colors duration-300 hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}



