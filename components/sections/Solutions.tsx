import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { solutions } from "@/content/solutions";
import { detailPath, sectionPath } from "@/lib/routes";

export default function Solutions({ locale, t }: { locale: Locale; t: Dictionary["solutions"] }) {
  return (
    <section id="solutions">
      <div className="container split">
        <div className="split-head">
          <Reveal as="span" className="eyebrow">{t.eyebrow}</Reveal>
          <Reveal as="h2">{t.title}</Reveal>
          <Reveal as="p">{t.sub}</Reveal>
          <Reveal>
            <Link className="link-more" href={sectionPath(locale, "solutions")}>
              {t.viewAll} <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="grid-sol">
          {solutions.map((s) => {
            const c = s.i18n[locale];
            return (
              <Reveal key={s.key} className="s-card">
                <div className="icon" aria-hidden="true">{s.icon}</div>
                <h3>{c.title}</h3>
                <ul>{c.cardPoints.map((p) => <li key={p}>{p}</li>)}</ul>
                <Link className="more" href={detailPath(locale, "solutions", s.slug[locale])}>
                  {t.more}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
