import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { SITE, WHATSAPP_HELLO } from "@/data/site";
import { scrollToHash } from "@/lib/scroll";
import { EASE } from "@/components/Reveal";

function MaskedLine({ children, delay }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.15, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen items-end overflow-hidden pt-24"
    >
      <div
        aria-hidden
        className="absolute -right-[12%] -top-[14%] h-[44vw] w-[44vw] rounded-full bg-blush/50 blur-3xl"
      />
      <span
        aria-hidden
        className="text-stroke pointer-events-none absolute -left-4 bottom-6 hidden select-none font-serif text-[13vw] leading-none lg:block"
      >
        cuero
      </span>

      <div className="relative mx-auto grid w-full max-w-screen-2xl grid-cols-12 gap-8 px-6 pb-20 sm:px-12 lg:px-24">
        <motion.div style={{ y: textY }} className="col-span-12 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60"
          >
            <span className="h-2 w-2 rounded-full bg-blush" />
            {SITE.tagline}
          </motion.p>

          <h1
            data-testid="hero-title"
            className="font-serif font-light leading-[0.84] tracking-tight"
          >
            <MaskedLine delay={0.25}>
              <span className="text-[20vw] sm:text-[16vw] lg:text-[10.5vw]">
                OFF
              </span>
            </MaskedLine>
            <MaskedLine delay={0.4}>
              <span className="text-[20vw] italic sm:text-[16vw] lg:text-[10.5vw]">
                Course<span className="not-italic text-blush">.</span>
              </span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            className="mt-10 max-w-md text-base font-light leading-relaxed text-ink/70 sm:text-lg"
          >
            Billeteras, mochilas, bolsos y accesorios, hechos para
acompañarte todos los días. Armá tu pedido y coordinamos por
WhatsApp.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <a
              href="#catalogo"
              data-testid="hero-cta-catalogo"
              onClick={(e) => scrollToHash(e, "#catalogo")}
              className="group flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm text-paper transition-colors duration-300 hover:bg-ink/85"
            >
              Ver catálogo
              <ArrowDown
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>
            <a
              href={WHATSAPP_HELLO}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-cta-whatsapp"
              className="group flex items-center gap-2 border-b border-ink/25 pb-1 text-sm text-ink transition-colors duration-300 hover:border-blush"
            >
              <MessageCircle size={16} className="text-blush" />
              Escribinos
            </a>
          </motion.div>
        </motion.div>

        <div className="relative col-span-12 mt-14 lg:col-span-5 lg:mt-0">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.3, delay: 0.55, ease: EASE }}
            className="relative ml-auto aspect-[3/4] w-full overflow-hidden bg-smoke sm:w-[80%]"
          >
            <motion.img
              src={SITE.heroImage}
              alt={SITE.heroAlt}
              style={{ y: imgY }}
              className="h-full w-full scale-[1.15] object-cover"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-6 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40 lg:flex"
      >
        Scroll
        <span className="h-px w-16 bg-ink/25" />
      </motion.div>
    </section>
  );
}
