import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { sections, sectionFromSlug, sectionPath, type SectionKey } from "@/lib/routes";
import { getDictionary } from "@/content/dictionaries";
import { findSolution, solutions } from "@/content/solutions";
import { findProduct, findCase, products, caseStudies } from "@/content/catalog";
import Reveal from "@/components/motion/Reveal";

export function generateStaticParams({
  params,
}: {
  params: { locale: string; section: string };
}) {
  const locale: Locale = isLocale(params?.locale ?? "") ? (params.locale as Locale) : "tr";
  const key = sectionFromSlug(locale, params?.section ?? "");
  if (key === "solutions") return solutions.map((s) => ({ slug: s.slug[locale] }));
  if (key === "products") return products.map((p) => ({ slug: p.slug[locale] }));
  if (key === "cases") return caseStudies.map((c) => ({ slug: c.slug[locale] }));
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, section, slug } = await params;
  if (!isLocale(locale)) return {};
  const key = sectionFromSlug(locale, section);
  if (key === "solutions") {
    const s = findSolution(locale, slug);
    if (s) return { title: `${s.i18n[locale].title} — STRAVION`, description: s.i18n[locale].intro };
  }
  if (key === "products") {
    const p = findProduct(locale, slug);
    if (p) return { title: `${p.i18n[locale].name} — STRAVION`, description: p.i18n[locale].desc };
  }
  if (key === "cases") {
    const c = findCase(locale, slug);
    if (c) return { title: `${c.i18n[locale].title} — STRAVION`, description: c.i18n[locale].context };
  }
  return {};
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="d-block">
      <h2 className="d-block-title">{title}</h2>
      {children}
    </Reveal>
  );
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}) {
  const { locale, section, slug } = await params;
  if (!isLocale(locale)) notFound();
  const key = sectionFromSlug(locale, section);
  if (!key) notFound();
  const dict = getDictionary(locale);
  const t = dict.pages;
  const back = (
    <Link className="d-back" href={sectionPath(locale, key)}>
      {t.back}
    </Link>
  );
  const cta = (
    <Reveal className="d-cta">
      <Link className="btn btn-primary" href={sectionPath(locale, "contact")}>{dict.finalCta.cta}</Link>
    </Reveal>
  );

  /* ---------- Çözüm detayı ---------- */
  if (key === "solutions") {
    const item = findSolution(locale, slug);
    if (!item) notFound();
    const c = item.i18n[locale];
    return (
      <main id="main">
        <section className="d-hero">
          <div className="container">
            {back}
            <Reveal as="span" className="eyebrow">{dict.solutions.eyebrow}</Reveal>
            <Reveal as="h1">{c.title}</Reveal>
            <Reveal as="p" className="section-sub">{c.intro}</Reveal>
          </div>
        </section>
        <section className="d-body">
          <div className="container">
            <Block title={t.problemsTitle}>
              <ul className="d-list">{c.problems.map((p) => <li key={p}>{p}</li>)}</ul>
            </Block>
            <div className="d-two">
              <Block title={t.audienceTitle}>
                <ul className="d-list">{c.audience.map((a) => <li key={a}>{a}</li>)}</ul>
              </Block>
              <Block title={t.scopeTitle}>
                <ul className="d-list">{c.scope.map((s) => <li key={s}>{s}</li>)}</ul>
              </Block>
            </div>
            <Block title={t.outputsTitle}>
              <ul className="d-list">{c.outputs.map((o) => <li key={o}>{o}</li>)}</ul>
            </Block>
            <Block title={t.phasesTitle}>
              <div className="d-phases">
                {dict.approach.steps.map((s, i) => (
                  <div key={s.name} className="d-phase">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.name}{s.label !== s.name ? ` · ${s.label}` : ""}</span>
                  </div>
                ))}
              </div>
            </Block>
            {cta}
          </div>
        </section>
      </main>
    );
  }

  /* ---------- Ürün detayı ---------- */
  if (key === "products") {
    const item = findProduct(locale, slug);
    if (!item) notFound();
    const c = item.i18n[locale];
    return (
      <main id="main">
        <section className="d-hero">
          <div className="container">
            {back}
            <Reveal as="span" className="eyebrow">{dict.products.eyebrow}</Reveal>
            <Reveal as="h1">
              {c.name}{" "}
              <span className={`tag ${item.status} d-hero-tag`}>{dict.products.statusLabels[item.status]}</span>
            </Reveal>
            <Reveal as="p" className="section-sub">{c.desc}</Reveal>
          </div>
        </section>
        <section className="d-body">
          <div className="container">
            <Block title={t.overviewTitle}>
              <p className="d-text">{c.overview}</p>
            </Block>
            <div className="d-two">
              <Block title={t.featuresTitle}>
                <ul className="d-list">{c.features.map((f) => <li key={f}>{f}</li>)}</ul>
              </Block>
              <Block title={t.forWhoTitle}>
                <p className="d-text">{c.forWho}</p>
              </Block>
            </div>
            {cta}
          </div>
        </section>
      </main>
    );
  }

  /* ---------- Vaka detayı ---------- */
  const item = findCase(locale, slug);
  if (!item) notFound();
  const c = item.i18n[locale];
  return (
    <main id="main">
      <section className="d-hero">
        <div className="container">
          {back}
          <Reveal as="span" className="eyebrow">{dict.cases.eyebrow}</Reveal>
          <Reveal>
            <span className="tag soon">{dict.cases.tag}</span>
          </Reveal>
          <Reveal as="h1" className="d-case-title">{c.title}</Reveal>
        </div>
      </section>
      <section className="d-body">
        <div className="container">
          <Block title={t.contextTitle}>
            <p className="d-text">{c.context}</p>
          </Block>
          <Block title={t.approachTitle}>
            <ul className="d-list">{c.approach.map((a) => <li key={a}>{a}</li>)}</ul>
          </Block>
          <Block title={t.deliverablesTitle}>
            <ul className="d-list">{c.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
          </Block>
          {cta}
        </div>
      </section>
    </main>
  );
}
