import { z } from "zod";
import { TOPIC_CODES } from "./topics";

/* Telefonu normalize et: görsel ayraçları at, + işaretini yalnızca başta koru.
   "0532 111 22 33", "+90 (532) 111-22-33" gibi girdiler tek biçime iner. */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const plus = trimmed.startsWith("+") ? "+" : "";
  return plus + trimmed.replace(/[^\d]/g, "");
}

const trimmed = (max: number) => z.string().trim().max(max);

export const contactSchema = z.object({
  name: trimmed(120).min(2),
  email: trimmed(200).toLowerCase().pipe(z.email()),
  company: trimmed(160).optional().default(""),
  phone: trimmed(40)
    .optional()
    .default("")
    .transform(normalizePhone)
    // normalize sonrası: ya boş, ya da 7-15 hane (E.164 üst sınırı 15)
    .refine((v) => v === "" || /^\+?\d{7,15}$/.test(v), { message: "phone" }),
  topic: z.enum(TOPIC_CODES),
  // .min(10) trim'den sonra çalışır: yalnızca boşluktan oluşan mesaj elenir
  message: trimmed(4000).min(10),
  locale: z.enum(["tr", "en"]).default("tr"),
  kvkkConsent: z.literal(true),
  website: z.string().max(200).optional().default(""), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;

/* Gövde boyutu sınırı: JSON parse edilmeden önce uygulanır.
   4000 karakterlik mesaj + diğer alanlar en kötü ihtimalle ~12 KB;
   32 KB rahat bir tavan ama bellek şişirme denemelerini keser. */
export const MAX_BODY_BYTES = 32 * 1024;
