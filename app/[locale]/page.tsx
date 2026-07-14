import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import Problem from "@/components/sections/Problem";
import Approach from "@/components/sections/Approach";
import Solutions from "@/components/sections/Solutions";
import Products from "@/components/sections/Products";
import Impact from "@/components/sections/Impact";
import Cases from "@/components/sections/Cases";
import Insights from "@/components/sections/Insights";
import Founder from "@/components/sections/Founder";
import FinalCta from "@/components/sections/FinalCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <main id="main">
      <Hero t={dict.hero} />
      <Brands t={dict.brands} />
      <Problem t={dict.problem} />
      <Approach t={dict.approach} />
      <Solutions locale={locale} t={dict.solutions} />
      <Products locale={locale} t={dict.products} />
      <Impact t={dict.impact} />
      <Cases locale={locale} t={dict.cases} more={dict.solutions.more} />
      <Insights t={dict.insights} />
      <Founder t={dict.founder} />
      <FinalCta locale={locale} t={dict.finalCta} />
    </main>
  );
}
