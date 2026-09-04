import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

function getRemaining(expiresAt) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

const pad = (n) => String(n).padStart(2, "0");

export default function CouponCountdownBar() {
  const { coupon } = useCart();
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    if (!coupon?.expires_at) {
      setRemaining(null);
      return;
    }
    setRemaining(getRemaining(coupon.expires_at));
    const id = setInterval(() => {
      setRemaining(getRemaining(coupon.expires_at));
    }, 1000);
    return () => clearInterval(id);
  }, [coupon?.expires_at]);

  // La barra se muestra si hay cupón activo y tiene fecha de fin y/o monto mínimo.
  if (!coupon || (!coupon.expires_at && !coupon.min_amount)) return null;
  if (coupon.expires_at && !remaining) return null;

  const scope =
    coupon.categories && coupon.categories.length
      ? `en ${coupon.categories.join(", ")}`
      : "en toda la tienda";

  return (
    <AnimatePresence>
      <motion.div
        data-testid="coupon-countdown-bar"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-ink text-paper"
      >
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-3 text-center">
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] sm:text-sm">
            <Sparkles size={15} className="text-blush" />
            {coupon.code} — {coupon.percent}% off {scope}
          </span>
          {coupon.min_amount && (
            <span className="font-mono text-[11px] tracking-[0.08em] text-paper/75 sm:text-sm">
              Válido en compras desde $ {Number(coupon.min_amount).toLocaleString("es-AR")}
            </span>
          )}
          {remaining && (
            <span className="font-mono text-[11px] tabular-nums tracking-[0.08em] text-paper/75 sm:text-sm">
              Termina en{" "}
              {remaining.days > 0 && `${remaining.days}d `}
              {pad(remaining.hours)}h {pad(remaining.minutes)}m {pad(remaining.seconds)}s
            </span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}





