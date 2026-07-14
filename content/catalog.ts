import type { Locale } from "@/lib/i18n";

export type ProductStatus = "pilot" | "soon" | "custom";

export type ProductContent = {
  name: string;
  desc: string;
  overview: string;
  features: string[];
  forWho: string;
};

export type Product = {
  key: string;
  status: ProductStatus;
  slug: Record<Locale, string>;
  i18n: Record<Locale, ProductContent>;
};

export const products: Product[] = [
  {
    key: "risk-radar",
    status: "pilot",
    slug: { tr: "risk-radar", en: "risk-radar" },
    i18n: {
      tr: {
        name: "Risk Radar™",
        desc: "Operasyon, mağaza ve bölge risk analiz sistemi.",
        overview: "KPI ve stok sinyallerini sürekli izler; riskleri hedef kaçmadan önce skorlar, kök nedenini analiz eder ve yönetici aksiyonu önerir.",
        features: ["Deterministik risk skorlama (0–100)", "AI destekli kök neden analizi", "Haftalık aksiyon önerileri", "KPI ve stok riski izleme"],
        forWho: "Bölge müdürleri, operasyon yönetimi ve perakende direktörleri için.",
      },
      en: {
        name: "Risk Radar™",
        desc: "Risk analysis system for operations, stores and regions.",
        overview: "Continuously monitors KPI and inventory signals; scores risks before targets are missed, analyzes root causes and recommends manager actions.",
        features: ["Deterministic risk scoring (0–100)", "AI-assisted root cause analysis", "Weekly action recommendations", "KPI and inventory risk monitoring"],
        forWho: "For regional managers, operations leadership and retail directors.",
      },
    },
  },
  {
    key: "hr-match",
    status: "pilot",
    slug: { tr: "hr-match-ai", en: "hr-match-ai" },
    i18n: {
      tr: {
        name: "HR Match AI™",
        desc: "İşletme ihtiyaçlarıyla aday yetkinliklerini eşleştiren yapay zekâ motoru.",
        overview: "Mağaza profili ile aday yetkinliklerini analiz eder; doğru adayı doğru lokasyonla eşleştirerek işe alım isabetini artırır.",
        features: ["Aday–mağaza eşleştirme skoru", "Yetkinlik profili analizi", "Aday havuzu önceliklendirme", "İK süreç entegrasyonu"],
        forWho: "İK ekipleri ve saha organizasyonu yöneten operasyon liderleri için.",
      },
      en: {
        name: "HR Match AI™",
        desc: "AI engine matching candidate competencies with business needs.",
        overview: "Analyzes store profiles against candidate competencies; matches the right candidate with the right location to raise hiring accuracy.",
        features: ["Candidate–store match scoring", "Competency profile analysis", "Candidate pool prioritization", "HR process integration"],
        forWho: "For HR teams and operations leaders running field organizations.",
      },
    },
  },
  {
    key: "performance-pulse",
    status: "soon",
    slug: { tr: "performance-pulse", en: "performance-pulse" },
    i18n: {
      tr: {
        name: "Performance Pulse™",
        desc: "Gerçek zamanlı KPI izleme ve erken uyarı sistemi.",
        overview: "KPI akışını tek ekranda toplar; eşik bazlı alarmlar ve trend analizleriyle sapmayı hedef kaçmadan önce gösterir.",
        features: ["Gerçek zamanlı KPI akışı", "Eşik bazlı alarmlar", "Trend ve sapma analizi", "Mobil yönetici görünümü"],
        forWho: "Günlük performansı yöneten satış ve operasyon ekipleri için.",
      },
      en: {
        name: "Performance Pulse™",
        desc: "Real-time KPI monitoring and early-warning system.",
        overview: "Brings the KPI stream into one screen; threshold-based alerts and trend analysis surface deviations before targets are missed.",
        features: ["Real-time KPI stream", "Threshold-based alerts", "Trend and deviation analysis", "Mobile manager view"],
        forWho: "For sales and operations teams managing daily performance.",
      },
    },
  },
  {
    key: "region-os",
    status: "soon",
    slug: { tr: "region-os", en: "region-os" },
    i18n: {
      tr: {
        name: "Region OS™",
        desc: "Bölge yöneticileri için performans, saha ve aksiyon yönetim platformu.",
        overview: "Bölge müdürünün tüm yönetim ritmini tek platformda toplar: skor kartı, ziyaret planı, aksiyon takibi ve ekip görünümü.",
        features: ["Bölge skor kartı", "Saha ziyaret planlama", "Aksiyon yönetimi", "Ekip performans görünümü"],
        forWho: "Çok mağazalı bölgeleri yöneten bölge müdürleri için.",
      },
      en: {
        name: "Region OS™",
        desc: "Performance, field and action management platform for regional managers.",
        overview: "Unites the regional manager's entire management rhythm in one platform: scorecard, visit planning, action tracking and team view.",
        features: ["Regional scorecard", "Field visit planning", "Action management", "Team performance view"],
        forWho: "For regional managers running multi-store territories.",
      },
    },
  },
  {
    key: "retail-os",
    status: "custom",
    slug: { tr: "retail-os", en: "retail-os" },
    i18n: {
      tr: {
        name: "Retail OS™",
        desc: "Uçtan uca perakende operasyon işletim sistemi.",
        overview: "SOP'lardan denetime, KPI'dan hedef yönetimine perakende operasyonunun tüm katmanlarını tek işletim sisteminde birleştirir.",
        features: ["Uçtan uca operasyon modülleri", "SOP ve denetim entegrasyonu", "KPI ve hedef yönetimi", "Kurumsal sistem entegrasyonları"],
        forWho: "Operasyonunu tek standart altında yönetmek isteyen perakende organizasyonları için.",
      },
      en: {
        name: "Retail OS™",
        desc: "End-to-end retail operations operating system.",
        overview: "From SOPs to audits, KPIs to target management — unifies every layer of retail operations in a single operating system.",
        features: ["End-to-end operations modules", "SOP and audit integration", "KPI and target management", "Enterprise system integrations"],
        forWho: "For retail organizations that want to run operations under one standard.",
      },
    },
  },
  {
    key: "strategy-os",
    status: "custom",
    slug: { tr: "strategy-os", en: "strategy-os" },
    i18n: {
      tr: {
        name: "Strategy OS™",
        desc: "Stratejik öncelik, karar ve uygulama yönetim sistemi.",
        overview: "Stratejik öncelikleri, kararları ve girişimleri tek yönetişim akışında toplar; stratejinin uygulanma disiplinini görünür kılar.",
        features: ["Stratejik öncelik yönetimi", "Karar kayıtları", "Girişim ve inisiyatif takibi", "Yönetişim ritmi desteği"],
        forWho: "Strateji ofisleri ve üst yönetim ekipleri için.",
      },
      en: {
        name: "Strategy OS™",
        desc: "Strategic priority, decision and execution management system.",
        overview: "Brings strategic priorities, decisions and initiatives into one governance flow — making execution discipline visible.",
        features: ["Strategic priority management", "Decision records", "Initiative tracking", "Governance rhythm support"],
        forWho: "For strategy offices and senior leadership teams.",
      },
    },
  },
  {
    key: "store-dna",
    status: "soon",
    slug: { tr: "store-dna", en: "store-dna" },
    i18n: {
      tr: {
        name: "Store DNA™",
        desc: "Mağazaların müşteri, lokasyon ve operasyon karakterini analiz eden model.",
        overview: "Her mağazanın karakter profilini çıkarır; segment bazlı aksiyon önerileri ve adil benchmark karşılaştırmaları üretir.",
        features: ["Mağaza karakter profili", "Lokasyon ve müşteri analizi", "Segment bazlı aksiyon önerileri", "Benchmark karşılaştırma"],
        forWho: "Mağaza portföyünü segmentlere göre yönetmek isteyen perakendeciler için.",
      },
      en: {
        name: "Store DNA™",
        desc: "A model analyzing each store's customer, location and operations character.",
        overview: "Profiles the character of every store; produces segment-based action recommendations and fair benchmark comparisons.",
        features: ["Store character profiling", "Location and customer analysis", "Segment-based action recommendations", "Benchmark comparison"],
        forWho: "For retailers that manage their store portfolio by segment.",
      },
    },
  },
  {
    key: "executive-os",
    status: "soon",
    slug: { tr: "executive-os", en: "executive-os" },
    i18n: {
      tr: {
        name: "Executive OS™",
        desc: "Üst yönetim için performans ve karar destek merkezi.",
        overview: "Konsolide performans görünümü, risk ve fırsat sinyalleri ve karar takibiyle üst yönetimin komuta merkezini oluşturur.",
        features: ["Konsolide performans görünümü", "Karar destek özetleri", "Risk ve fırsat sinyalleri", "Toplantı ve karar takibi"],
        forWho: "CEO, COO ve yönetim kurulu seviyesindeki ekipler için.",
      },
      en: {
        name: "Executive OS™",
        desc: "Performance and decision support center for senior leadership.",
        overview: "Builds leadership's command center with a consolidated performance view, risk and opportunity signals and decision tracking.",
        features: ["Consolidated performance view", "Decision support briefs", "Risk and opportunity signals", "Meeting and decision tracking"],
        forWho: "For CEO, COO and board-level teams.",
      },
    },
  },
];

export function findProduct(locale: Locale, slug: string) {
  return products.find((p) => p.slug[locale] === slug);
}

/* ---------------- Vaka çalışmaları ---------------- */

export type CaseContent = {
  title: string;
  context: string;
  approach: string[];
  deliverables: string[];
  scope: string[];
};

export type CaseStudy = {
  key: string;
  slug: Record<Locale, string>;
  i18n: Record<Locale, CaseContent>;
};

export const caseStudies: CaseStudy[] = [
  {
    key: "retail-operating-model",
    slug: { tr: "cok-lokasyonlu-perakende-operasyon-modeli", en: "multi-location-retail-operating-model" },
    i18n: {
      tr: {
        title: "Çok Lokasyonlu Perakende Operasyon Modeli",
        context: "Çok lokasyonlu bir perakende organizasyonunda performans, bölge ve mağaza yöneticilerinin bireysel tarzına bağlıydı. KPI tanımları birimler arasında farklılaşıyor, aksiyonlar toplantılarda kayboluyordu.",
        approach: ["KPI mimarisi tek sözlük altında standartlaştırıldı.", "Haftalık ve aylık yönetim ritimleri karar odaklı yeniden tasarlandı.", "Mağazalar karakteristiklerine göre segmentlere ayrılarak adil hedefleme kuruldu."],
        deliverables: ["Standart iş yapış rehberi", "Bölge ve mağaza skor kartı seti", "Aksiyon takip sistemi", "Yönetim ritmi takvimi"],
        scope: ["KPI standardizasyonu", "Yönetim ritimleri", "Mağaza segmentasyonu", "Aksiyon takip sistemi"],
      },
      en: {
        title: "Multi-Location Retail Operating Model",
        context: "In a multi-location retail organization, performance depended on the individual style of regional and store managers. KPI definitions varied across units, and actions got lost in meetings.",
        approach: ["KPI architecture was standardized under a single dictionary.", "Weekly and monthly management rhythms were redesigned around decisions.", "Stores were segmented by their characteristics to enable fair targeting."],
        deliverables: ["Standard ways-of-working playbook", "Regional and store scorecard set", "Action tracking system", "Management rhythm calendar"],
        scope: ["KPI standardization", "Management rhythms", "Store segmentation", "Action tracking system"],
      },
    },
  },
  {
    key: "risk-early-warning",
    slug: { tr: "ai-destekli-risk-ve-erken-uyari-sistemi", en: "ai-powered-risk-and-early-warning-system" },
    i18n: {
      tr: {
        title: "AI Destekli Risk ve Erken Uyarı Sistemi",
        context: "Satış ve stok riskleri ancak sonuçlar raporlara yansıdıktan sonra görülüyordu. Yöneticiler geriye dönük açıklama yapıyor, ileriye dönük önlem alamıyordu.",
        approach: ["KPI ve stok verileri tek risk motoruna bağlandı.", "Deterministik skorlama ile AI kök neden analizi birlikte kurgulandı.", "Haftalık aksiyon önerileri yönetici ritmine entegre edildi."],
        deliverables: ["Risk skorlama motoru (0–100)", "Erken uyarı alarm sistemi", "Yönetici aksiyon öneri akışı", "Veri kaynağı haritası"],
        scope: ["Veri kaynakları", "Risk skorlama", "Alarm sistemi", "Yönetici aksiyon önerileri"],
      },
      en: {
        title: "AI-Powered Risk & Early Warning System",
        context: "Sales and inventory risks were only visible after results hit the reports. Managers explained the past instead of preventing the future.",
        approach: ["KPI and inventory data were connected to a single risk engine.", "Deterministic scoring was combined with AI root-cause analysis.", "Weekly action recommendations were integrated into the management rhythm."],
        deliverables: ["Risk scoring engine (0–100)", "Early-warning alert system", "Manager action recommendation flow", "Data source map"],
        scope: ["Data sources", "Risk scoring", "Alert system", "Manager action recommendations"],
      },
    },
  },
  {
    key: "leadership-model",
    slug: { tr: "yonetici-gelisim-ve-performans-modeli", en: "leadership-development-and-performance-model" },
    i18n: {
      tr: {
        title: "Yönetici Gelişim ve Performans Modeli",
        context: "Yönetici değerlendirmeleri standartsızdı; gelişim planları kişisel inisiyatife kalıyor, terfi kararları objektif kriterlerden yoksun veriliyordu.",
        approach: ["Rol bazlı yetkinlik modeli tanımlandı.", "360 derece değerlendirme ve KPI karnesi tek sistemde birleştirildi.", "30-60-90 günlük gelişim planları çift imzalı standart forma bağlandı."],
        deliverables: ["Yetkinlik modeli ve değerlendirme seti", "Gelişim planı şablonları", "Yönetim standartları rehberi", "Çeyreklik trend takip yapısı"],
        scope: ["Yetkinlik modeli", "Gelişim planları", "Yönetim standartları", "Performans değerlendirmesi"],
      },
      en: {
        title: "Leadership Development & Performance Model",
        context: "Manager evaluations were unstandardized; development plans depended on personal initiative, and promotion decisions lacked objective criteria.",
        approach: ["A role-based competency model was defined.", "360-degree evaluation and KPI scorecards were unified in one system.", "30-60-90 day development plans were tied to a dual-signature standard form."],
        deliverables: ["Competency model and assessment set", "Development plan templates", "Management standards playbook", "Quarterly trend tracking structure"],
        scope: ["Competency framework", "Development plans", "Management standards", "Performance evaluation"],
      },
    },
  },
];

export function findCase(locale: Locale, slug: string) {
  return caseStudies.find((c) => c.slug[locale] === slug);
}
