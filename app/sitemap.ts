import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { sections, sectionPath, detailPath, type SectionKey } from "@/lib/routes";
import { solutions } from "@/content/solutions";
import { products, caseStudies } from "@/content/catalog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    urls.push({ url: `${SITE_URL}/${locale}`, changeFrequency: "weekly", priority: 1 });
    for (const key of Object.keys(sections) as SectionKey[]) {
      urls.push({ url: `${SITE_URL}${sectionPath(locale, key)}`, changeFrequency: "monthly", priority: 0.8 });
    }
    for (const s of solutions) {
      urls.push({ url: `${SITE_URL}${detailPath(locale, "solutions", s.slug[locale])}`, changeFrequency: "monthly", priority: 0.7 });
    }
    for (const p of products) {
      urls.push({ url: `${SITE_URL}${detailPath(locale, "products", p.slug[locale])}`, changeFrequency: "monthly", priority: 0.7 });
    }
    for (const c of caseStudies) {
      urls.push({ url: `${SITE_URL}${detailPath(locale, "cases", c.slug[locale])}`, changeFrequency: "monthly", priority: 0.6 });
    }
  }
  return urls;
}
