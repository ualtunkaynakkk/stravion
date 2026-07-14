import Reveal from "@/components/motion/Reveal";
import type { Dictionary } from "@/content/dictionaries";

export default function Approach({ t }: { t: Dictionary["approach"] }) {
  return (
    <section id="approach">
      <div className="container">
        <Reveal as="span" className="eyebrow">{t.eyebrow}</Reveal>
        <Reveal as="h2">{t.title}</Reveal>
        <Reveal as="p" className="section-sub">{t.sub}</Reveal>
        <Reveal className="approach-steps">
          {t.steps.map((s, i) => (
            <div className="step" key={s.name}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>
                {s.name}
                {s.label !== s.name && <span>{s.label}</span>}
              </h3>
              <p>{s.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
