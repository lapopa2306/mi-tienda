import { Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function FreeShippingBar() {
  const { shipping } = useCart();

  if (!shipping?.enabled || !shipping.threshold) return null;

  return (
    <AnimatePresence>
      <motion.div
        data-testid="free-shipping-bar"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-blush-deep text-paper"
      >
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-3 text-center">
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] sm:text-sm">
            <Truck size={15} className="text-paper" />
            Envío gratis a partir de $ {Number(shipping.threshold).toLocaleString("es-AR")}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

