import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { products } from "@/content/catalog";
import { detailPath, sectionPath } from "@/lib/routes";
import ProductThumb from "./ProductThumb";

export default function Products({ locale, t }: { locale: Locale; t: Dictionary["products"] }) {
  return (
    <section id="products">
      <div className="container split">
        <div className="split-head">
          <Reveal as="span" className="eyebrow">{t.eyebrow}</Reveal>
          <Reveal as="h2">{t.title}</Reveal>
          <Reveal as="p">{t.sub}</Reveal>
          <Reveal>
            <Link className="link-more" href={sectionPath(locale, "products")}>
              {t.cta} <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="prod-grid">
          {products.map((p, i) => {
            const c = p.i18n[locale];
            return (
              <Reveal key={p.key} className="prod-card">
                <Link href={detailPath(locale, "products", p.slug[locale])}>
                  <div className="prod-shot"><ProductThumb variant={i} /></div>
                  <div className="prod-body">
                    <div className="prod-head">
                      <h3>{c.name}</h3>
                      <span className={`tag ${p.status}`}>{t.statusLabels[p.status]}</span>
                    </div>
                    <p>{c.desc}</p>
                    <span className="arr-only">→</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
