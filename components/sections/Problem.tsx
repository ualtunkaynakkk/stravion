import Reveal from "@/components/motion/Reveal";
import type { Dictionary } from "@/content/dictionaries";

export default function Problem({ t }: { t: Dictionary["problem"] }) {
  return (
    <section className="problem">
      <div className="container">
        <Reveal as="span" className="eyebrow">{t.eyebrow}</Reveal>
        <Reveal as="h2">{t.title}</Reveal>
        <Reveal as="p" className="section-sub">{t.sub}</Reveal>
        <div className="grid-4">
          {t.cards.map((c, i) => (
            <Reveal key={c.title} className="p-card">
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
