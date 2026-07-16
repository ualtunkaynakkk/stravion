import type { Locale } from "@/lib/i18n";

/* Formda görünen metin ile veritabanına yazılan kod ayrıdır.
   Sebep: etiketler dile göre değişir ve zamanla güncellenir; kod sabit kalır.
   Böylece "Strateji ve Dönüşüm" ile "Strategy & Transformation" aynı satırda
   raporlanabilir ve metin değişince eski kayıtlar anlamsızlaşmaz. */

export const TOPIC_CODES = [
  "strategy_transformation",
  "operational_excellence",
  "performance_management",
  "ai_transformation",
  "products",
  "other",
] as const;

export type TopicCode = (typeof TOPIC_CODES)[number];

export function isTopicCode(value: unknown): value is TopicCode {
  return typeof value === "string" && (TOPIC_CODES as readonly string[]).includes(value);
}

export const topicLabels: Record<Locale, Record<TopicCode, string>> = {
  tr: {
    strategy_transformation: "Strateji ve Dönüşüm",
    operational_excellence: "Operasyonel Mükemmeliyet",
    performance_management: "Performans Yönetimi",
    ai_transformation: "Yapay Zekâ Dönüşümü",
    products: "Ürünler (Risk Radar, HR Match AI...)",
    other: "Diğer",
  },
  en: {
    strategy_transformation: "Strategy & Transformation",
    operational_excellence: "Operational Excellence",
    performance_management: "Performance Management",
    ai_transformation: "AI Transformation",
    products: "Products (Risk Radar, HR Match AI...)",
    other: "Other",
  },
};

export function topicOptions(locale: Locale): { code: TopicCode; label: string }[] {
  return TOPIC_CODES.map((code) => ({ code, label: topicLabels[locale][code] }));
}
