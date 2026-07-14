import type { Metadata } from "next";
import { Archivo, Inter, Marcellus } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { locales, isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/site";

const archivo = Archivo({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-logo" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: "%s | STRAVION",
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: "/tr", en: "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "STRAVION",
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${archivo.variable} ${inter.variable} ${marcellus.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "STRAVION",
              url: SITE_URL,
              logo: `${SITE_URL}/icon.svg`,
              description: dict.meta.description,
              email: "hello@stravion.com",
              founder: { "@type": "Person", name: "Ümit Altunkaynak" },
              areaServed: "TR",
              knowsAbout: [
                "Strategy Consulting",
                "Operational Excellence",
                "AI Transformation",
                "Retail Operations",
                "Performance Management",
              ],
            }),
          }}
        />
        <a className="skip" href="#main">
          {locale === "tr" ? "İçeriğe geç" : "Skip to content"}
        </a>
        <Header locale={locale} nav={dict.nav} />
        {children}
        <Footer locale={locale} t={dict.footer} />
      </body>
    </html>
  );
}
