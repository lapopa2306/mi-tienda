import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { scrollToHash } from "@/lib/scroll";

const LINKS = [
  { label: "Catálogo", hash: "#catalogo", testid: "nav-link-catalogo" },
  { label: "Nosotros", hash: "#nosotros", testid: "nav-link-nosotros" },
  { label: "Envíos", hash: "#envios", testid: "nav-link-envios" },
  { label: "Contacto", hash: "#contacto", testid: "nav-link-contacto" },
];

export default function Nav() {
  const { count, setOpen } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-paper/80 backdrop-blur-xl">
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
          className="font-serif text-2xl tracking-tight"
        >
          <span className="font-light">Off</span>{" "}
          <span className="italic">Course</span>
          <span className="text-blush">.</span>
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
      </div>
    </header>
  );
}
