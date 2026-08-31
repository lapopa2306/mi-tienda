import { motion } from "framer-motion";
import { SITE } from "@/data/site";
import Reveal, { EASE } from "@/components/Reveal";

const CHAPTERS = [
  {
    n: "01",
    title: "La materia",
    text: "Trabajamos cuero genuino y materiales nobles que envejecen con dignidad. Cada textura, cada tono, se elige a mano antes de convertirse en pieza.",
  },
  {
    n: "02",
    title: "El oficio",
    text: "Cortamos, cosemos y terminamos cada billetera, mochila y bolso con la paciencia de siempre. Sin apuros: las cosas bien hechas llevan su tiempo.",
  },
  {
    n: "03",
    title: "El barrio",
    text: "Somos de Wilde, Avellaneda. Off Course nace acá, entre talleres y esquinas de siempre, y llega a todo el país con la misma calidez de barrio.",
  },
];

export default function Manifesto() {
  return (
    <section
      id="nosotros"
      data-testid="manifesto-section"
      className="border-t border-ink/10 bg-ash py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-12 lg:px-24">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
            <span className="h-2 w-2 rounded-full bg-blush" />
            02 — Nosotros
          </p>
          <h2 className="max-w-3xl font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl">
            Hecho a mano, hecho{" "}
            <span className="italic">para durar</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.08}>
                <div className="grid grid-cols-12 gap-6 border-t border-ink/10 py-12 first:border-t-0 first:pt-0">
                  <span className="col-span-2 font-mono text-sm text-ink/40 sm:col-span-1">
                    {c.n}
                  </span>
                  <h3 className="col-span-10 font-serif text-2xl font-light italic sm:col-span-4 sm:text-3xl">
                    {c.title}
                  </h3>
                  <p className="col-span-12 text-base font-light leading-relaxed text-ink/70 sm:col-span-6 sm:col-start-6 lg:text-lg">
                    {c.text}
                  </p>
                </div>
              </Reveal>
            ))}
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
