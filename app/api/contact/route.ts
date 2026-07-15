import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

/* ---------- basit bellek içi rate limit (instance başına en iyi çaba) ---------- */
const WINDOW_MS = 60 * 60 * 1000; // 1 saat
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    hits.set(key, list);
    return true;
  }
  list.push(now);
  hits.set(key, list);
  return false;
}

/* ---------- doğrulama ---------- */
type Payload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  topic: string;
  message: string;
  locale: "tr" | "en";
  kvkkConsent: boolean;
  website?: string; // honeypot — insanlar doldurmaz
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate(body: unknown): { ok: true; data: Payload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "invalid_body" };
  const b = body as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(b.name);
  const email = str(b.email).toLowerCase();
  const company = str(b.company);
  const phone = str(b.phone);
  const topic = str(b.topic);
  const message = str(b.message);
  const locale = b.locale === "en" ? "en" : "tr";
  const kvkkConsent = b.kvkkConsent === true;
  const website = str(b.website);

  if (website) return { ok: false, error: "spam" }; // honeypot doluysa sessizce reddet
  if (name.length < 2 || name.length > 120) return { ok: false, error: "name" };
  if (!EMAIL_RE.test(email) || email.length > 200) return { ok: false, error: "email" };
  if (company.length > 160) return { ok: false, error: "company" };
  if (phone.length > 40) return { ok: false, error: "phone" };
  if (topic.length < 1 || topic.length > 80) return { ok: false, error: "topic" };
  if (message.length < 10 || message.length > 4000) return { ok: false, error: "message" };
  if (!kvkkConsent) return { ok: false, error: "kvkk" };

  return { ok: true, data: { name, email, company, phone, topic, message, locale, kvkkConsent } };
}

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 32);

  if (rateLimited(ipHash)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const v = validate(body);
  if (!v.ok) {
    // honeypot yakalandıysa bota başarı gibi görünsün
    if (v.error === "spam") return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: v.error }, { status: 400 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("contact_requests").insert({
    name: v.data.name,
    email: v.data.email,
    company: v.data.company || null,
    phone: v.data.phone || null,
    topic: v.data.topic,
    message: v.data.message,
    locale: v.data.locale,
    kvkk_consent: v.data.kvkkConsent,
    ip_hash: ipHash,
    user_agent: (req.headers.get("user-agent") ?? "").slice(0, 300),
  });

  if (error) {
    console.error("contact insert error:", error.message);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  /* ---------- bildirim maili (best effort) ----------
     Kayıt yukarıda veritabanına yazıldı. Mail yalnızca haberci:
     Resend çökse, key süresi dolsa veya kota bitse bile talep kaybolmaz
     ve kullanıcı hata görmez. Bu yüzden hatalar sadece loglanır.        */
  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_EMAIL;

  if (resendKey && notifyTo) {
    try {
      const satirlar = [
        `Ad Soyad : ${v.data.name}`,
        `E-posta  : ${v.data.email}`,
        `Şirket   : ${v.data.company || "—"}`,
        `Telefon  : ${v.data.phone || "—"}`,
        `Konu     : ${v.data.topic}`,
        `Dil      : ${v.data.locale.toUpperCase()}`,
        "",
        "Mesaj:",
        v.data.message,
        "",
        "—",
        "Bu bildirim stravion.com iletişim formundan otomatik gönderildi.",
        "Kaydın tamamı Supabase → contact_requests tablosunda.",
      ];

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NOTIFY_FROM ?? "STRAVION <onboarding@resend.dev>",
          to: [notifyTo],
          reply_to: v.data.email,
          subject: `Yeni görüşme talebi — ${v.data.name} (${v.data.topic})`,
          text: satirlar.join("\n"),
        }),
      });

      if (!res.ok) {
        console.error("resend error:", res.status, await res.text());
      }
    } catch (e) {
      console.error("resend exception:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
