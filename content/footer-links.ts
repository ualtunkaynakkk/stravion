import type { Locale } from "@/lib/i18n";
import { sectionPath } from "@/lib/routes";

export type FooterLink = { href: string; label: string };

/* KURAL: Buraya yalnızca GERÇEKTEN VAR OLAN bir hedefi olan link yazılır.
   İçeriği olmayan sayfa menüde görünmez. Bir sayfa hazırlandığında
   buraya eklenir — component'e dokunmak gerekmez. */

const labels = {
  tr: {
    founder: "Kurucu",
    approach: "Yaklaşımımız",
    contact: "İletişim",
    insights: "İçgörüler",
    cases: "Uygulama Senaryoları",
    solutions: "Çözümler",
    products: "Ürünler",
  },
  en: {
    founder: "Founder",
    approach: "Our Approach",
    contact: "Contact",
    insights: "Insights",
    cases: "Application Scenarios",
    solutions: "Solutions",
    products: "Products",
  },
} as const;

/* Kaldırılanlar ve sebepleri:
   - Hakkımızda      : ayrı sayfası yok, Kurucu bölümüyle aynı yere gidiyordu
   - Kariyer         : sayfa yok, açık pozisyon yok
   - İş Ortaklıkları : sayfa yok
   - Raporlar/Academy/Bülten : içerik yok                                     */

export function companyLinks(locale: Locale): FooterLink[] {
  const t = labels[locale];
  return [
    { href: `/${locale}#founder`, label: t.founder },
    { href: `/${locale}#approach`, label: t.approach },
    { href: sectionPath(locale, "contact"), label: t.contact },
  ];
}

export function resourceLinks(locale: Locale): FooterLink[] {
  const t = labels[locale];
  return [
    { href: `/${locale}#insights`, label: t.insights },
    { href: sectionPath(locale, "cases"), label: t.cases },
    { href: sectionPath(locale, "products"), label: t.products },
  ];
}
