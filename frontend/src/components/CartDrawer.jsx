import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { scrollToHash } from "@/lib/scroll";
import { EASE } from "@/components/Reveal";

const fmt = (n) => n.toLocaleString("es-AR");

export default function CartDrawer() {
  const { open, setOpen, items, setQty, remove, clear, total, count, waUrl } =
    useCart();

  useEffect(() => {
    if (!window.__lenis) return;
    open ? window.__lenis.stop() : window.__lenis.start();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-testid="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            data-testid="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-paper"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-8 py-6">
              <h2 className="font-serif text-2xl font-light">
                Tu pedido{" "}
                <span className="font-mono text-sm text-ink/50">({count})</span>
              </h2>
              <button
                data-testid="cart-close-button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar pedido"
                className="rounded-full border border-ink/15 p-2 transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                <X size={16} />
              </button>
            </div>

            {items.length === 0 ? (
              <div
                data-testid="cart-empty-state"
                className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center"
              >
                <ShoppingBag size={40} strokeWidth={1} className="text-ink/30" />
                <p className="font-serif text-2xl font-light italic text-ink/60">
                  Tu pedido está vacío
                </p>
                <button
                  data-testid="cart-browse-button"
                  onClick={(e) => {
                    setOpen(false);
                    scrollToHash(e, "#catalogo");
                  }}
                  className="rounded-full bg-ink px-8 py-3.5 text-sm text-paper transition-colors duration-300 hover:bg-ink/85"
                >
                  Ver catálogo
                </button>
              </div>
            ) : (
              <>
                <div
                  data-lenis-prevent
                  className="flex-1 overflow-y-auto overscroll-contain px-8 py-6"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <ul className="space-y-8">
                    {items.map((i) => (
                      <li key={i.key} data-testid={`cart-item-${i.key}`} className="flex gap-5">
                        <div className="aspect-[3/4] w-20 shrink-0 overflow-hidden bg-smoke">
                          <img
                            src={i.image}
                            alt={i.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-serif text-lg font-light leading-tight">
                                {i.name}
                              </h3>
                              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                                {i.category}
                                {i.color ? ` · ${i.color}` : ""}
                              </p>
                            </div>
                            <button
                              data-testid={`remove-item-${i.key}`}
                              onClick={() => remove(i.key)}
                              aria-label={`Quitar ${i.name}`}
                              className="text-ink/40 transition-colors duration-300 hover:text-ink"
                            >
                              <X size={15} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center gap-3 rounded-full border border-ink/15 px-3 py-1.5">
                              <button
                                data-testid={`qty-decrease-${i.key}`}
                                onClick={() => setQty(i.key, i.qty - 1)}
                                aria-label="Restar unidad"
                                className="text-ink/60 transition-colors duration-200 hover:text-ink"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-4 text-center font-mono text-sm">
                                {i.qty}
                              </span>
                              <button
                                data-testid={`qty-increase-${i.key}`}
                                onClick={() => setQty(i.key, i.qty + 1)}
                                aria-label="Sumar unidad"
                                className="text-ink/60 transition-colors duration-200 hover:text-ink"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <p className="font-mono text-sm text-ink/80">
                              $ {fmt(i.price * i.qty)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-ink/10 px-8 py-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                      Total estimado
                    </span>
                    <span data-testid="cart-total" className="font-serif text-2xl font-light">
                      $ {fmt(total)}
                    </span>
                  </div>
                  <p className="mb-5 text-xs font-light text-ink/50">
                    El pedido se envía por WhatsApp y coordinamos pago y entrega
                    juntos.
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="whatsapp-checkout-button"
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 text-sm text-paper transition-colors duration-300 hover:bg-blush hover:text-ink"
                  >
                    <MessageCircle size={16} />
                    Enviar pedido por WhatsApp
                  </a>
                  <button
                    data-testid="cart-clear-button"
                    onClick={clear}
                    className="mt-4 w-full text-center text-xs text-ink/45 underline underline-offset-4 transition-colors duration-300 hover:text-ink"
                  >
                    Vaciar pedido
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}


