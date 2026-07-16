import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { contactSchema, MAX_BODY_BYTES } from "@/lib/contact/schema";
import { topicLabels } from "@/lib/contact/topics";

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

  /* Gövde boyutu: parse etmeden önce sınırla.
     Content-Length güvenilmez olabilir, o yüzden okunan metni de ölçüyoruz. */
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    const raw = await req.text();
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "fields" }, { status: 400 });
  }
  const data = parsed.data;

  // honeypot doluysa bota başarı gibi görünsün — kayıt oluşturulmaz
  if (data.website) return NextResponse.json({ ok: true });

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("contact_requests").insert({
    name: data.name,
    email: data.email,
    company: data.company || null,
    phone: data.phone || null,
    topic: data.topic,
    message: data.message,
    locale: data.locale,
    kvkk_consent: data.kvkkConsent,
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
        `Ad Soyad : ${data.name}`,
        `E-posta  : ${data.email}`,
        `Şirket   : ${data.company || "—"}`,
        `Telefon  : ${data.phone || "—"}`,
        `Konu     : ${topicLabels[data.locale][data.topic]}`,
        `Dil      : ${data.locale.toUpperCase()}`,
        "",
        "Mesaj:",
        data.message,
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
          reply_to: data.email,
          subject: `Yeni görüşme talebi — ${data.name} (${topicLabels[data.locale][data.topic]})`,
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
