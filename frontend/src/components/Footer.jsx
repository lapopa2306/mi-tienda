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
                className="font-serif text-2xl font-light transition-colors duration-300 hover:text-blush"
              >
                {SITE.whatsappDisplay}
              </a>
            </div>
          </Reveal>
        </div>

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
