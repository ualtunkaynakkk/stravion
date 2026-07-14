import Reveal from "@/components/motion/Reveal";
import type { Dictionary } from "@/content/dictionaries";

export default function Founder({ t }: { t: Dictionary["founder"] }) {
  return (
    <section id="founder">
      <div className="container">
        <div className="founder-wrap">
          <div className="founder-txt">
            <Reveal as="span" className="eyebrow">{t.eyebrow}</Reveal>
            <Reveal as="h2">{t.title}</Reveal>
            <Reveal as="p">{t.text}</Reveal>
            <Reveal>
              <div className="founder-name">{t.name}</div>
              <p className="founder-title">{t.role}</p>
              <a className="btn btn-ghost" href="#final">{t.cta}</a>
            </Reveal>
          </div>
          <Reveal className="portrait">
            <span>{t.portrait}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
