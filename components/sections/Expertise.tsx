import Reveal from "@/components/motion/Reveal";
import type { Dictionary } from "@/content/dictionaries";

/* Eskiden "Güvenen Markalar" idi ve uydurma isimler (MERIDIAN, NOVARA...)
   listeliyordu. Gerçek ve izinli referans olmadan marka göstermek,
   olmayan bir sosyal kanıt iddiasıdır. Bunun yerine doğrulanabilir
   olanı gösteriyoruz: gerçekten deneyim sahibi olunan alanlar. */

export default function Expertise({ t }: { t: Dictionary["expertise"] }) {
  return (
    <div className="brands">
      <div className="container">
        <div className="label">{t.label}</div>
        <Reveal className="brand-row">
          {t.items.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
