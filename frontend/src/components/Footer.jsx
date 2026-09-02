import { ArrowUpRight, Instagram, MapPin, MessageCircle } from "lucide-react";
import { SITE, WHATSAPP_HELLO } from "@/data/site";
import Reveal from "@/components/Reveal";

export default function Footer() {
  return (
    <footer
      id="contacto"
      data-testid="footer-section"
      className="bg-ink text-paper"
    >
      <div className="mx-auto max-w-screen-2xl px-6 py-24 sm:px-12 sm:py-32 lg:px-24 lg:py-40">
        <Reveal>
          <img
            src="/logo.png"
            alt="Off Course — Marroquinería"
            data-testid="footer-logo"
            className="mb-10 h-20 w-20 rounded-full"
          />
          <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50">
            <span className="h-2 w-2 rounded-full bg-blush" />
            04 — Contacto
          </p>
          <h2 className="max-w-4xl font-serif text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl">
            ¿Armamos tu <span className="italic text-blush">pedido</span>?
          </h2>
          <a
            href={WHATSAPP_HELLO}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-whatsapp-link"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-blush px-10 py-5 text-base text-ink transition-colors duration-300 hover:bg-paper"
          >
            <MessageCircle size={18} />
            Escribinos por WhatsApp
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>

        <div className="mt-24 grid grid-cols-1 gap-12 border-t border-paper/15 pt-16 sm:grid-cols-3">
          <Reveal>
            <div>
              <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50">
                <MapPin size={13} className="text-blush" /> Local
              </p>
              <p
                data-testid="footer-address"
                className="font-serif text-2xl font-light"
              >
                {SITE.address}
              </p>
              <p className="mt-1 text-sm font-light text-paper/60">
                Avellaneda, Buenos Aires
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.address + ", Avellaneda, Buenos Aires")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-directions-link"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-blush transition-colors duration-300 hover:text-paper"
              >
                Cómo llegar <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50">
                <Instagram size={13} className="text-blush" /> Instagram
              </p>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-instagram-link"
                className="font-serif text-2xl font-light italic transition-colors duration-300 hover:text-blush"
              >
                @offcoursearg
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div>
              <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50">
                <MessageCircle size={13} className="text-blush" /> WhatsApp
              </p>
              <a
                href={WHATSAPP_HELLO}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-number-1"
                className="block font-serif text-2xl font-light transition-colors duration-300 hover:text-blush"
              >
                {SITE.whatsappDisplay}
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp2}?text=${encodeURIComponent("Hola Off Course! Quiero hacer una consulta.")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-number-2"
                className="mt-2 block font-serif text-2xl font-light transition-colors duration-300 hover:text-blush"
              >
                {SITE.whatsapp2Display}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div
            data-testid="footer-map"
            className="overflow-hidden rounded-2xl border border-paper/15"
          >
            <iframe
              title="Ubicación Off Course en el mapa"
              src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.address + ", Avellaneda, Buenos Aires")}&output=embed`}
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[20%]"
            />
          </div>
        </Reveal>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40">
            © 2026 Off Course — Marroquinería
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40">
            Wilde · Buenos Aires · Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}

