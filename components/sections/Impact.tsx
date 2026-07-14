import Reveal from "@/components/motion/Reveal";
import type { Dictionary } from "@/content/dictionaries";

export default function Impact({ t }: { t: Dictionary["impact"] }) {
  return (
    <section className="impact">
      <div className="container">
        <Reveal as="span" className="eyebrow">{t.eyebrow}</Reveal>
        <Reveal as="h2">{t.title}</Reveal>
        <Reveal className="impact-grid">
          {t.cells.map((c) => (
            <div className="impact-cell" key={c.k}>
              <span className="k">{c.k}</span>
              <p>{c.p}</p>
            </div>
          ))}
        </Reveal>
        <Reveal as="p" className="impact-note">{t.note}</Reveal>
      </div>
    </section>
  );
}
