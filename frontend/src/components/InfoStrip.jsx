import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";

const ITEMS = [
  {
    n: "01",
    title: "Envíos",
    text: "Hacemos envíos a todo el país por correo. También puntos de entrega en zona sur.",
  },
  {
    n: "02",
    title: "Retiro en el local",
    text: `Pasá a ver todo en persona: ${SITE.address}. Te esperamos para que elijas tranquila/o.`,
  },
  {
    n: "03",
    title: "Medios de pago",
    text: "Efectivo, transferencia y tarjetas de débito y crédito. El pedido se confirma siempre por WhatsApp.",
  },
];

export default function InfoStrip() {
  return (
    <section id="envios" data-testid="info-section" className="py-24 sm:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-12 lg:px-24">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
            <span className="h-2 w-2 rounded-full bg-blush" />
            03 — Cómo comprar
          </p>
        </Reveal>
        <div>
          {ITEMS.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.08}>
              <div className="grid grid-cols-12 items-baseline gap-6 border-t border-ink/10 py-12 last:border-b">
                <span className="col-span-2 font-mono text-sm text-ink/40 sm:col-span-1">
                  {item.n}
                </span>
                <h3 className="col-span-10 font-serif text-3xl font-light sm:col-span-4 sm:text-4xl">
                  {item.title}
                </h3>
                <p className="col-span-12 text-base font-light leading-relaxed text-ink/70 sm:col-span-6 sm:col-start-7 lg:text-lg">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
