import { motion } from "framer-motion";
import { SITE } from "@/data/site";
import Reveal, { EASE } from "@/components/Reveal";

export default function Manifesto() {
  return (
    <section
      id="nosotros"
      data-testid="manifesto-section"
      className="border-t border-ink/10 bg-ash py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
                <span className="h-2 w-2 rounded-full bg-blush" />
                02 — Nosotros
              </p>
              <h2 className="max-w-3xl font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl">
                Somos <span className="italic">Off Course</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-xl text-base font-light leading-relaxed text-ink/70 lg:text-lg">
                Marroquinería y accesorios desde Wilde, Avellaneda. Elegí tus
                favoritos, mandanos tu pedido por WhatsApp y recibilo donde
                estés: hacemos envíos a todo el país.
              </p>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: EASE }}
              className="sticky top-28 aspect-[3/4] overflow-hidden bg-smoke"
            >
              <img
                src={SITE.manifestoImage}
                alt={SITE.manifestoAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
