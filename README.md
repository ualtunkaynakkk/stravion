# STRAVION — Kurumsal Web Sitesi

Premium, çok dilli (TR/EN) kurumsal web sitesi. Next.js App Router + TypeScript strict + Server Components.

## Teknoloji

- **Next.js 16** (App Router, Server Components öncelikli)
- **TypeScript** (strict mode)
- **CSS** — bağımlılıksız tasarım sistemi (`app/[locale]/globals.css` içinde token'lar)
- **next/font** — Manrope (başlık), Inter (gövde), IBM Plex Mono (KPI/etiket)

## Yapı

```
app/[locale]/          # /tr ve /en route'ları
  layout.tsx           # Root layout (font, header, footer)
  page.tsx             # Ana sayfa
  not-found.tsx        # Markalı 404
  globals.css          # Tasarım sistemi + tüm stiller
components/
  layout/              # Header, Footer, AnnouncementBar
  sections/            # Ana sayfa bölümleri (Hero, Problem, Approach...)
  motion/              # Reveal (scroll animasyonu)
content/dictionaries/  # TR ve EN arayüz metinleri
content/solutions.ts   # 8 çözüm — kart + detay içerikleri (tek doğruluk kaynağı)
content/catalog.ts     # 8 ürün + 3 vaka çalışması içerikleri
lib/i18n.ts            # Locale tanımları
proxy.ts               # / → /tr yönlendirmesi (Next 16'da middleware yerine)
```

## İçerik güncelleme

Tüm site metinleri `content/dictionaries/tr.ts` ve `en.ts` dosyalarındadır.
Kod dosyalarına dokunmadan metin değiştirebilirsiniz. Yapı, ileride bir headless
CMS'e (Sanity/Contentful) geçişe uygun tasarlanmıştır.

## Geliştirme

```bash
npm install
npm run dev        # http://localhost:3000 → /tr'ye yönlenir
npm run build      # Prodüksiyon build
```

## Supabase kurulumu (iletişim formu)

1. [supabase.com](https://supabase.com) üzerinde yeni bir proje oluşturun (ör. `stravion-site`, bölge: `eu-central-1`).
2. SQL Editor'a `supabase/migrations/20260713_contact_requests.sql` içeriğini yapıştırıp çalıştırın.
   - Tablo RLS ile korunur: dışarıdan yalnızca **INSERT** yapılabilir (KVKK onayı zorunlu), okuma yalnızca dashboard'dan.
3. Settings → API'den `Project URL` ve `anon (publishable) key` değerlerini alın.
4. Yerelde `.env.local`, Vercel'de Environment Variables olarak ekleyin:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
5. Kayıtları görmek için: Supabase Dashboard → Table Editor → `contact_requests`.

**Form güvenlik katmanları:** sunucu tarafı doğrulama, honeypot alanı (botlara sahte başarı döner),
IP bazlı rate limit (saatte 5 istek), KVKK onayı hem istemci hem veritabanı seviyesinde zorunlu.

## Deploy (GitHub → Vercel)

1. Yeni bir GitHub reposu oluşturun ve kodu push'layın:
   ```bash
   git init && git add -A && git commit -m "STRAVION site iskeleti"
   git remote add origin <repo-url>
   git push -u origin main
   ```
2. Vercel'de **New Project** → repoyu seçin → framework otomatik algılanır → Deploy.
3. Ortam değişkeni şu an gerekmiyor (form/backend Faz 4'te eklenecek — bkz. `.env.example`).

## Yol haritası

- [x] Faz 1 — Ana sayfa tasarım onayı (HTML önizleme)
- [x] Faz 2 — Next.js iskeleti + ana sayfa + TR/EN altyapısı
- [x] Faz 3 — İç sayfa şablonları (çözüm/ürün/vaka detayları, TR/EN slug yapısı)
- [x] Faz 3.5 — Altın (black & gold) görsel yeniden tasarım uygulandı
- [x] Faz 4 — İletişim formu + Supabase + rate limit + KVKK onayı
- [x] Faz 5 — SEO tamamlandı: sitemap.xml (48 URL), robots.txt, OpenGraph/Twitter meta, JSON-LD Organization şeması, favicon

## Yayın öncesi son kontrol listesi

1. **Supabase**: migration'ı çalıştır, env değişkenlerini Vercel'e ekle (yukarıdaki bölüm).
2. **Domain**: Vercel'e `stravion.com` bağla; `NEXT_PUBLIC_SITE_URL=https://stravion.com` env'ini ekle (sitemap/OG için).
3. **Analitik** (opsiyonel): Vercel dashboard'dan Analytics'i tek tıkla aç — kod değişikliği gerekmez.
4. **KVKK Aydınlatma Metni**: formdaki link şu an placeholder; gerçek metin hazır olunca `/tr/kvkk` sayfası eklenebilir.
5. **Marka barı ve vaka içerikleri**: gerçek referans izinleri geldikçe `content/` dosyalarından güncelle.
6. **Kurucu portresi**: fotoğraf hazır olunca `Founder` bileşenindeki placeholder'ı değiştir.
