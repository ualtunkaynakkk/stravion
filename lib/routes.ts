import type { Locale } from "@/lib/i18n";

export const sections = {
  solutions: { tr: "cozumler", en: "solutions" },
  products: { tr: "urunler", en: "products" },
  cases: { tr: "uygulama-senaryolari", en: "application-scenarios" },
  contact: { tr: "iletisim", en: "contact" },
} as const;

export type SectionKey = keyof typeof sections;

export function sectionFromSlug(locale: Locale, slug: string): SectionKey | null {
  const entry = (Object.keys(sections) as SectionKey[]).find(
    (key) => sections[key][locale] === slug
  );
  return entry ?? null;
}

export function sectionPath(locale: Locale, key: SectionKey): string {
  return `/${locale}/${sections[key][locale]}`;
}

export function detailPath(locale: Locale, key: SectionKey, slug: string): string {
  return `${sectionPath(locale, key)}/${slug}`;
}
