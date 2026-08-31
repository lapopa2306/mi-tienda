import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { EASE } from "@/components/Reveal";

const fmt = (n) => n.toLocaleString("es-AR");

export default function ProductModal({ product, onClose }) {
  const { add } = useCart();
  const [colorIdx, setColorIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    setColorIdx(0);
    setImgIdx(0);
  }, [product]);

  useEffect(() => {
    if (!window.__lenis) return;
    product ? window.__lenis.stop() : window.__lenis.start();
  }, [product]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const color = product?.colors?.[colorIdx];
  const images = color?.images || (product ? [product.image] : []);
  const mainImage = images[imgIdx] || images[0];

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            data-testid="product-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm"
          />
          <motion.div
            data-testid="product-modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-0 bottom-0 top-auto z-[85] mx-auto flex max-h-[92vh] w-full max-w-5xl flex-col overflow-y-auto bg-paper sm:inset-0 sm:m-auto sm:h-fit sm:flex-row sm:overflow-visible"
          >
            <button
              data-testid="product-modal-close"
              onClick={onClose}
              aria-label="Cerrar detalle"
              className="absolute right-4 top-4 z-10 rounded-full bg-paper/90 p-2.5 text-ink backdrop-blur-md transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <X size={16} />
            </button>

            <div className="w-full shrink-0 sm:w-1/2">
              <div className="relative aspect-[3/4] overflow-hidden bg-smoke">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mainImage}
                    data-testid="product-modal-image"
                    src={mainImage}
                    alt={`${product.name} — ${color?.name || ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 p-3">
                  {images.map((img, i) => (
                    <button
                      key={img + i}
                      data-testid={`product-modal-thumb-${i}`}
                      onClick={() => setImgIdx(i)}
                      className={`aspect-[3/4] w-16 overflow-hidden bg-smoke transition-opacity duration-300 ${
                        i === imgIdx
                          ? "ring-1 ring-ink"
                          : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col p-8 sm:w-1/2 sm:p-12">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/45">
                {product.category}
              </p>
              <h3
                data-testid="product-modal-name"
                className="font-serif text-3xl font-light leading-tight sm:text-4xl"
              >
                {product.name}
              </h3>
              <p
                data-testid="product-modal-price"
                className="mt-3 font-mono text-lg text-ink/80"
              >
                $ {fmt(product.price)}
              </p>
              <p
                data-testid="product-modal-installments"
                className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-blush-deep"
              >
                3 cuotas sin interés de $ {fmt(Math.round(product.price / 3))}
              </p>

              {product.description && (
                <p
                  data-testid="product-modal-description"
                  className="mt-6 text-base font-light leading-relaxed text-ink/70"
                >
                  {product.description}
                </p>
              )}

              {product.colors?.length > 0 && (
                <div className="mt-8">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/45">
                    Color — {color?.name}
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((c, i) => (
                      <button
                        key={c.name}
                        data-testid={`product-modal-color-${c.name.toLowerCase()}`}
                        onClick={() => {
                          setColorIdx(i);
                          setImgIdx(0);
                        }}
                        aria-label={`Color ${c.name}`}
                        title={c.name}
                        className={`h-9 w-9 rounded-full border transition-transform duration-300 ${
                          i === colorIdx
                            ? "scale-110 border-ink ring-2 ring-ink/20 ring-offset-2 ring-offset-paper"
                            : "border-ink/20 hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                data-testid="product-modal-add"
                onClick={() => add(product, color?.name)}
                className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm text-paper transition-colors duration-300 hover:bg-blush hover:text-ink"
              >
                <Plus size={15} />
                Agregar al pedido{color ? ` — ${color.name}` : ""}
              </button>
              <p className="mt-4 text-center text-xs font-light text-ink/45">
                Podés ajustar cantidades desde el pedido.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
