import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";

const ITEMS = [
  "3 cuotas sin interés",
  "10% Off Efectivo y transferencia",
  "Envíos a todo el país",
  "Off Course",
];

export default function MarqueeStrip() {
  return (
    <section
      data-testid="editorial-marquee"
      className="overflow-hidden border-y border-ink/10 bg-paper py-7"
    >
      <Marquee speed={22} gradient={false} pauseOnHover>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            <span className="whitespace-nowrap font-serif text-4xl font-light italic text-ink/75 sm:text-5xl">
              {item}
            </span>
            <Asterisk className="text-blush" size={30} strokeWidth={1.2} />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
