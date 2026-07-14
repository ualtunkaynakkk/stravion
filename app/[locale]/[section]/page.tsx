import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { sections, sectionFromSlug, detailPath, type SectionKey } from "@/lib/routes";
import { getDictionary } from "@/content/dictionaries";
import { solutions } from "@/content/solutions";
import { products, caseStudies } from "@/content/catalog";
import Reveal from "@/components/motion/Reveal";
import ProductThumb from "@/components/sections/ProductThumb";
import ContactForm from "@/components/sections/ContactForm";

export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params?.locale ?? "") ? (params.locale as Locale) : "tr";
  return (Object.keys(sections) as SectionKey[]).map((key) => ({
    section: sections[key][locale],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;
  if (!isLocale(locale)) return {};
  const key = sectionFromSlug(locale, section);
  if (!key) return {};
  const dict = getDictionary(locale);
  const t = dict.pages;
  const map = {
    solutions: { title: dict.solutions.eyebrow, description: t.solutionsSub },
    products: { title: dict.products.eyebrow, description: t.productsSub },
    cases: { title: dict.cases.eyebrow, description: t.casesSub },
    contact: { title: dict.contact.eyebrow, description: dict.contact.sub },
  } as const;
  return {
    title: map[key].title,
    description: map[key].description,
    alternates: { canonical: `/${locale}/${section}` },
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;
  if (!isLocale(locale)) notFound();
  const key = sectionFromSlug(locale, section);
  if (!key) notFound();
  const dict = getDictionary(locale);
  const t = dict.pages;

  return (
    <main id="main">
      <section className="d-hero">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            {key === "solutions" ? dict.solutions.eyebrow : key === "products" ? dict.products.eyebrow : key === "cases" ? dict.cases.eyebrow : dict.contact.eyebrow}
          </Reveal>
          <Reveal as="h1">
            {key === "solutions" ? t.solutionsTitle : key === "products" ? t.productsTitle : key === "cases" ? t.casesTitle : dict.contact.title}
          </Reveal>
          <Reveal as="p" className="section-sub">
            {key === "solutions" ? t.solutionsSub : key === "products" ? t.productsSub : key === "cases" ? t.casesSub : dict.contact.sub}
          </Reveal>
        </div>
      </section>

      {key === "solutions" && (
        <section className="solutions" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="grid-sol">
              {solutions.map((s) => {
                const c = s.i18n[locale];
                return (
                  <Reveal key={s.key} className="s-card">
                    <div className="icon" aria-hidden="true">{s.icon}</div>
                    <h3>{c.title}</h3>
                    <ul>{c.cardPoints.map((p) => <li key={p}>{p}</li>)}</ul>
                    <Link className="more" href={detailPath(locale, "solutions", s.slug[locale])}>
                      {dict.solutions.more}
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {key === "products" && (
        <section style={{ paddingTop: 0 }}>
          <div className="container">
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
                          <span className={`tag ${p.status}`}>{dict.products.statusLabels[p.status]}</span>
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
      )}

      {key === "contact" && (
        <section style={{ paddingTop: 56 }}>
          <div className="container">
            <ContactForm locale={locale} t={dict.contact} />
            <p className="impact-note" style={{ marginTop: 36 }}>
              {locale === "tr" ? "Alternatif: " : "Alternative: "}
              <a href={`mailto:${dict.finalCta.mail}`} style={{ color: "var(--gold)" }}>{dict.finalCta.mail}</a>
            </p>
          </div>
        </section>
      )}

      {key === "cases" && (
        <section style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="grid-3">
              {caseStudies.map((cs) => {
                const c = cs.i18n[locale];
                return (
                  <Reveal key={cs.key} className="c-card">
                    <span className="tag soon">{dict.cases.tag}</span>
                    <h3>{c.title}</h3>
                    <span className="scope">{dict.cases.scopeLabel}</span>
                    <ul>{c.scope.map((s) => <li key={s}>{s}</li>)}</ul>
                    <Link className="more" href={detailPath(locale, "cases", cs.slug[locale])} style={{ marginTop: 18 }}>
                      {dict.solutions.more}
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
