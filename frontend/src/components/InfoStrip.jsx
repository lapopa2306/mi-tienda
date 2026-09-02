import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";

const ITEMS = [
  {
  n: "01",
  title: "Envíos",
  text: "Hacemos envíos a todo el país por Correo Argentino y Via Cargo.",
},
  {
    n: "02",
    title: "Retiro en el local",
    text: `Pasá a ver todo en persona: ${SITE.address}. Te esperamos para que elijas tranquila/o.`,
  },
  {
  n: "03",
  title: "Medios de pago",
  text: "Efectivo, transferencia, tarjetas de débito y 3 cuotas sin interés con cualquier tarjeta de crédito.",
},
];

const STEPS = [
  {
    n: "1",
    text: "Sumá al carrito los productos que más te gusten.",
  },
  {
    n: "2",
    text: "Hacé click en Pedido y elegí la opción enviar pedido por WhatsApp.",
  },
  {
    n: "3",
    text: "Arreglá con nosotros el medio de pago y el punto de retiro/envío.",
  },
  {
    n: "4",
    text: "Recibí y disfrutá de tu pedido.",
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
        <div className="mb-8 grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div
                data-testid={`buy-step-${s.n}`}
                className="flex h-full flex-col gap-4 border-t border-ink/10 pt-6"
              >
                <span className="font-serif text-5xl font-light italic text-blush">
                  {s.n}
                </span>
                <p className="text-base font-light leading-relaxed text-ink/70">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
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
