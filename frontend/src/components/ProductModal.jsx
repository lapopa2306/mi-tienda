import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Copy, Plus, Share2, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { whatsappShareLink } from "@/data/site";
import { EASE } from "@/components/Reveal";

const fmt = (n) => n.toLocaleString("es-AR");

export default function ProductModal({ product, onClose }) {
  const { add } = useCart();
  const [colorIdx, setColorIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const lightboxRef = useRef(null);

  useEffect(() => {
    setColorIdx(0);
    setImgIdx(0);
    setLightbox(false);
    setZoomed(false);
  }, [product]);

  useEffect(() => {
    setZoomed(false);
  }, [imgIdx, lightbox]);

  useEffect(() => {
    if (!window.__lenis) return;
    product ? window.__lenis.stop() : window.__lenis.start();
  }, [product]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (lightbox) setLightbox(false);
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, lightbox]);

  const color = product?.colors?.[colorIdx];
  const images = color?.images || (product ? [product.image] : []);
  const mainImage = images[imgIdx] || images[0];

  const productUrl = product
    ? `${window.location.origin}${window.location.pathname}?producto=${product.id}`
    : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      toast.success("Link copiado");
    } catch {
      toast.error("No se pudo copiar el link");
    }
  };

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
            data-lenis-prevent
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
              className="absolute right-4 top-[max(1.5rem,env(safe-area-inset-top))] z-10 rounded-full bg-paper/90 p-2.5 text-ink backdrop-blur-md transition-colors duration-300 hover:bg-ink hover:text-paper sm:top-4"
            >
              <X size={16} />
            </button>

            <div className="w-full shrink-0 sm:w-1/2">
              <div className="relative aspect-square overflow-hidden bg-smoke sm:aspect-[3/4]">
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
                    onClick={() => setLightbox(true)}
                    className="h-full w-full cursor-zoom-in object-cover"
                  />
                </AnimatePresence>
                {images.length > 1 && (
                  <>
                    <button
                      data-testid="product-modal-prev"
                      onClick={() =>
                        setImgIdx((imgIdx - 1 + images.length) % images.length)
                      }
                      aria-label="Foto anterior"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/90 p-2.5 text-ink backdrop-blur-md transition-colors duration-300 hover:bg-ink hover:text-paper"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      data-testid="product-modal-next"
                      onClick={() => setImgIdx((imgIdx + 1) % images.length)}
                      aria-label="Foto siguiente"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/90 p-2.5 text-ink backdrop-blur-md transition-colors duration-300 hover:bg-ink hover:text-paper"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <span
                      data-testid="product-modal-image-counter"
                      className="absolute bottom-3 right-3 rounded-full bg-paper/90 px-3 py-1 font-mono text-[10px] text-ink backdrop-blur-md"
                    >
                      {imgIdx + 1} / {images.length}
                    </span>
                  </>
                )}
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
              <p
                data-testid="product-modal-cash-discount"
                className="mt-2 inline-block w-fit rounded-sm bg-blush/60 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-blush-deep"
              >
                10% off en efectivo o transferencia: ${" "}
                {fmt(Math.round(product.price * 0.9))}
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

              <div className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-6">
                <p className="mr-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                  <Share2 size={13} />
                  Compartir
                </p>
                <button
                  data-testid="product-modal-share-copy"
                  onClick={handleCopyLink}
                  aria-label="Copiar link del producto"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors duration-300 hover:border-ink/40 hover:text-ink"
                >
                  <Copy size={15} />
                </button>
                <a
                  data-testid="product-modal-share-whatsapp"
                  href={whatsappShareLink(
                    `Hola! Mirá este producto de Off Course: ${product.name} — $ ${fmt(
                      product.price,
                    )}\n${productUrl}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartir por WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors duration-300 hover:border-[#25D366]/50 hover:text-[#25D366]"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2zm5.8 14.15c-.24.68-1.4 1.3-1.93 1.35-.5.05-.98.24-3.28-.73-2.78-1.17-4.55-3.99-4.69-4.18-.14-.19-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.24-.27.53-.34.71-.34.18 0 .35.002.5.01.16.008.38-.06.6.46.24.57.79 1.98.86 2.12.07.14.11.31.02.5-.09.19-.13.31-.27.47-.13.16-.28.36-.4.48-.13.13-.27.27-.12.53.15.27.68 1.12 1.46 1.82 1 .89 1.85 1.17 2.11 1.3.27.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.27.13.44.2.51.31.07.11.07.63-.17 1.31z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {lightbox && (
            <motion.div
              data-testid="product-modal-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setLightbox(false)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4"
            >
              <button
                data-testid="product-modal-lightbox-close"
                onClick={() => setLightbox(false)}
                aria-label="Cerrar vista de pantalla completa"
                className="absolute right-4 top-[max(1.5rem,env(safe-area-inset-top))] z-10 rounded-full bg-paper/10 p-2.5 text-paper backdrop-blur-md transition-colors duration-300 hover:bg-paper/20"
              >
                <X size={20} />
              </button>

              <div
                ref={lightboxRef}
                className="relative flex h-full w-full items-center justify-center overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${mainImage}-${zoomed}`}
                    src={mainImage}
                    alt={`${product.name} — ${color?.name || ""}`}
                    drag={zoomed}
                    dragConstraints={lightboxRef}
                    dragElastic={0.15}
                    dragMomentum={false}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: zoomed ? 2.2 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomed((z) => !z);
                    }}
                    className={`max-h-[90vh] max-w-[90vw] object-contain ${
                      zoomed
                        ? "cursor-grab active:cursor-grabbing"
                        : "cursor-zoom-in"
                    }`}
                  />
                </AnimatePresence>
              </div>

              {images.length > 1 && !zoomed && (
                <>
                  <button
                    data-testid="product-modal-lightbox-prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImgIdx((imgIdx - 1 + images.length) % images.length);
                    }}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/10 p-3 text-paper backdrop-blur-md transition-colors duration-300 hover:bg-paper/20 sm:left-6"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    data-testid="product-modal-lightbox-next"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImgIdx((imgIdx + 1) % images.length);
                    }}
                    aria-label="Foto siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/10 p-3 text-paper backdrop-blur-md transition-colors duration-300 hover:bg-paper/20 sm:right-6"
                  >
                    <ChevronRight size={22} />
                  </button>
                  <span
                    data-testid="product-modal-lightbox-counter"
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-paper/10 px-3 py-1 font-mono text-[11px] text-paper backdrop-blur-md"
                  >
                    {imgIdx + 1} / {images.length}
                  </span>
                </>
              )}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}






