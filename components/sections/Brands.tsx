import Reveal from "@/components/motion/Reveal";
import type { Dictionary } from "@/content/dictionaries";

export default function Brands({ t }: { t: Dictionary["brands"] }) {
  return (
    <div className="brands">
      <div className="container">
        <div className="label">{t.label}</div>
        <Reveal className="brand-row">
          {t.names.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </Reveal>
        <div className="note">{t.note}</div>
      </div>
    </div>
  );
}
