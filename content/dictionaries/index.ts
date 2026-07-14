import type { Locale } from "@/lib/i18n";
import { tr } from "./tr";
import { en } from "./en";

export type ProductStatus = "pilot" | "soon" | "custom";

export type Dictionary = {
  meta: { title: string; description: string };
  announcement: { text: string; link: string };
  nav: {
    solutions: string;
    products: string;
    cases: string;
    insights: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    line1: string;
    line2: string;
    goldLine: string;
    lede: string;
    mantra: string;
    primary: string;
    secondary: string;
  };
  brands: { label: string; note: string; names: string[] };
  problem: {
    eyebrow: string;
    title: string;
    sub: string;
    cards: { title: string; text: string }[];
  };
  approach: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: { name: string; label: string; text: string }[];
  };
  solutions: {
    eyebrow: string;
    title: string;
    sub: string;
    viewAll: string;
    more: string;
  };
  products: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
    statusLabels: Record<ProductStatus, string>;
  };
  impact: {
    eyebrow: string;
    title: string;
    note: string;
    cells: { k: string; p: string }[];
  };
  cases: {
    eyebrow: string;
    title: string;
    viewAll: string;
    tag: string;
    scopeLabel: string;
  };
  insights: {
    eyebrow: string;
    title: string;
    viewAll: string;
    items: { cat: string; read: string; title: string; desc: string; date: string }[];
  };
  founder: {
    eyebrow: string;
    title: string;
    text: string;
    name: string;
    role: string;
    cta: string;
    portrait: string;
  };
  finalCta: { title: string; text: string; cta: string; mail: string };
  pages: {
    solutionsTitle: string;
    solutionsSub: string;
    productsTitle: string;
    productsSub: string;
    casesTitle: string;
    casesSub: string;
    problemsTitle: string;
    audienceTitle: string;
    scopeTitle: string;
    outputsTitle: string;
    phasesTitle: string;
    overviewTitle: string;
    featuresTitle: string;
    forWhoTitle: string;
    contextTitle: string;
    approachTitle: string;
    deliverablesTitle: string;
    back: string;
  };
  footer: {
    desc: string;
    solutionsTitle: string;
    solutions: string[];
    companyTitle: string;
    company: string[];
    resourcesTitle: string;
    resources: string[];
    legal: string[];
    rights: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    name: string;
    email: string;
    company: string;
    phone: string;
    topic: string;
    topics: string[];
    message: string;
    kvkk: string;
    kvkkLink: string;
    submit: string;
    sending: string;
    success: string;
    successSub: string;
    errors: { generic: string; rate: string; kvkk: string; fields: string };
    optional: string;
  };
  notFound: { title: string; text: string; home: string; solutions: string };
};

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
