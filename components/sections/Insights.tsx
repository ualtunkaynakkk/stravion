import Reveal from "@/components/motion/Reveal";
import type { Dictionary } from "@/content/dictionaries";

const imgClasses = ["a", "b", "c"];

export default function Insights({ t }: { t: Dictionary["insights"] }) {
  return (
    <section className="insights" id="insights">
      <div className="container split">
        <div className="split-head">
          <Reveal as="span" className="eyebrow">{t.eyebrow}</Reveal>
          <Reveal as="h2">{t.title}</Reveal>
          <Reveal>
            <a className="link-more" href="#insights">
              {t.viewAll} <span className="arr">→</span>
            </a>
          </Reveal>
        </div>
        <div className="grid-3">
          {t.items.map((a, i) => (
            <Reveal key={a.title} as="a" className="ins-card">
              <div className={`ins-img ${imgClasses[i % imgClasses.length]}`} aria-hidden="true" />
              <div className="ins-body">
                <div className="ins-cat">{a.cat}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <span className="ins-date">{a.date} · {a.read}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
