import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { caseStudies } from "@/content/catalog";
import { detailPath, sectionPath } from "@/lib/routes";

export default function Cases({
  locale,
  t,
  more,
}: {
  locale: Locale;
  t: Dictionary["cases"];
  more: string;
}) {
  return (
    <section id="cases">
      <div className="container split">
        <div className="split-head">
          <Reveal as="span" className="eyebrow">{t.eyebrow}</Reveal>
          <Reveal as="h2">{t.title}</Reveal>
          <Reveal>
            <Link className="link-more" href={sectionPath(locale, "cases")}>
              {t.viewAll} <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="grid-3">
          {caseStudies.map((cs) => {
            const c = cs.i18n[locale];
            return (
              <Reveal key={cs.key} className="c-card">
                <span className="tag soon">{t.tag}</span>
                <h3>{c.title}</h3>
                <span className="scope">{t.scopeLabel}</span>
                <ul>{c.scope.map((s) => <li key={s}>{s}</li>)}</ul>
                <Link className="more" href={detailPath(locale, "cases", cs.slug[locale])} style={{ marginTop: 18 }}>
                  {more}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
