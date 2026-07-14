import type { Locale } from "@/lib/i18n";

export type SolutionContent = {
  title: string;
  intro: string;
  cardPoints: string[];
  problems: string[];
  audience: string[];
  scope: string[];
  outputs: string[];
};

export type Solution = {
  key: string;
  icon: string;
  slug: Record<Locale, string>;
  i18n: Record<Locale, SolutionContent>;
};

export const solutions: Solution[] = [
  {
    key: "strategy",
    icon: "◈",
    slug: { tr: "strateji-ve-donusum", en: "strategy-and-transformation" },
    i18n: {
      tr: {
        title: "Strateji ve Dönüşüm",
        intro: "Stratejik yönü netleştirir; dönüşümü önceliklendirilmiş, sahiplenilmiş ve yönetilebilir bir yol haritasına dönüştürürüz.",
        cardPoints: ["Stratejik yön belirleme", "Dönüşüm yol haritası", "Yönetişim modeli"],
        problems: [
          "Strateji belirleniyor ancak sahaya ölçülebilir biçimde inmiyor.",
          "Öncelik enflasyonu kaynakları dağıtıyor; her şey önemli olunca hiçbir şey ilerlemiyor.",
          "Dönüşüm girişimleri sahipsiz kalıyor ve toplantı gündemine sıkışıyor.",
        ],
        audience: ["CEO ve genel müdürler", "Strateji ve dönüşüm liderleri", "Özel sermaye portföy şirketleri"],
        scope: ["Stratejik yön belirleme", "Dönüşüm yol haritası", "Önceliklendirme", "Yönetişim modeli", "Uygulama disiplinleri"],
        outputs: ["Strateji haritası ve hedef mimarisi", "Önceliklendirilmiş dönüşüm portföyü", "Yönetişim ve ritim takvimi"],
      },
      en: {
        title: "Strategy & Transformation",
        intro: "We clarify strategic direction and turn transformation into a prioritized, owned and manageable roadmap.",
        cardPoints: ["Strategic direction", "Transformation roadmap", "Governance model"],
        problems: [
          "Strategy is defined but never reaches the field in measurable form.",
          "Priority inflation scatters resources; when everything matters, nothing moves.",
          "Transformation initiatives lack owners and get stuck on meeting agendas.",
        ],
        audience: ["CEOs and general managers", "Strategy and transformation leaders", "Private equity portfolio companies"],
        scope: ["Strategic direction setting", "Transformation roadmap", "Prioritization", "Governance model", "Execution disciplines"],
        outputs: ["Strategy map and target architecture", "Prioritized transformation portfolio", "Governance and rhythm calendar"],
      },
    },
  },
  {
    key: "opex",
    icon: "⚙",
    slug: { tr: "operasyonel-mukemmeliyet", en: "operational-excellence" },
    i18n: {
      tr: {
        title: "Operasyonel Mükemmeliyet",
        intro: "İş yapış modelini standartlaştırır; her lokasyonun aynı işi aynı kalitede yapmasını sağlayan sistemleri kurarız.",
        cardPoints: ["İş yapış modeli", "Yönetim ritimleri", "Denetim sistemleri"],
        problems: [
          "Lokasyonlar aynı standardı farklı biçimlerde uyguluyor.",
          "Süreçler denetimsiz; kalite kişisel inisiyatife bağlı.",
          "Yönetim ritimleri raporlamaya dönüşüyor, karar üretmiyor.",
        ],
        audience: ["Operasyon direktörleri", "Perakende ve saha yöneticileri", "Franchise organizasyonları"],
        scope: ["İş yapış modeli tasarımı", "Standart operasyon prosedürleri", "Yönetim ritimleri", "Denetim sistemleri", "Süreç optimizasyonu"],
        outputs: ["Standart iş yapış rehberi", "Denetim ve kontrol paneli", "Yönetim ritmi takvimi"],
      },
      en: {
        title: "Operational Excellence",
        intro: "We standardize the operating model and build the systems that make every location do the same work at the same quality.",
        cardPoints: ["Operating model design", "Management rhythms", "Audit systems"],
        problems: [
          "Locations apply the same standard in different ways.",
          "Processes go unaudited; quality depends on personal initiative.",
          "Management rhythms turn into reporting sessions that produce no decisions.",
        ],
        audience: ["Operations directors", "Retail and field managers", "Franchise organizations"],
        scope: ["Operating model design", "Standard operating procedures", "Management rhythms", "Audit systems", "Process optimization"],
        outputs: ["Standard ways-of-working playbook", "Audit and control panel", "Management rhythm calendar"],
      },
    },
  },
  {
    key: "performance",
    icon: "▤",
    slug: { tr: "performans-yonetimi", en: "performance-management" },
    i18n: {
      tr: {
        title: "Performans Yönetimi",
        intro: "KPI mimarisini tek standart altında kurar; hedef, alarm ve aksiyonu tek yönetim döngüsünde birleştiririz.",
        cardPoints: ["KPI mimarisi", "Mağaza skor kartları", "Hedef ve alarm mekanizmaları"],
        problems: [
          "KPI'lar tanımsız veya lokasyonlar arasında karşılaştırılamıyor.",
          "Sapmalar ancak hedef kaçtıktan sonra fark ediliyor.",
          "Aksiyonlar tanımlanıyor ama takip edilmiyor ve kapanmıyor.",
        ],
        audience: ["Satış ve operasyon direktörleri", "Bölge müdürleri", "FP&A ve planlama ekipleri"],
        scope: ["KPI mimarisi", "Mağaza skor kartları", "Bölge performans sistemi", "Hedef ve alarm mekanizmaları", "Aksiyon yönetimi"],
        outputs: ["KPI sözlüğü ve skor kartı seti", "Erken uyarı eşikleri", "Aksiyon takip sistemi"],
      },
      en: {
        title: "Performance Management",
        intro: "We build the KPI architecture under one standard, uniting targets, alerts and actions in a single management loop.",
        cardPoints: ["KPI architecture", "Store scorecards", "Targets & alert mechanisms"],
        problems: [
          "KPIs are undefined or can't be compared across locations.",
          "Deviations are noticed only after the target is missed.",
          "Actions are defined but never tracked or closed.",
        ],
        audience: ["Sales and operations directors", "Regional managers", "FP&A and planning teams"],
        scope: ["KPI architecture", "Store scorecards", "Regional performance system", "Target and alert mechanisms", "Action management"],
        outputs: ["KPI dictionary and scorecard set", "Early-warning thresholds", "Action tracking system"],
      },
    },
  },
  {
    key: "ai",
    icon: "✦",
    slug: { tr: "yapay-zeka-donusumu", en: "ai-transformation" },
    i18n: {
      tr: {
        title: "Yapay Zekâ Dönüşümü",
        intro: "Yapay zekâyı pilot projelerden çıkarır; operasyonun günlük karar akışına yerleştiririz.",
        cardPoints: ["AI stratejisi", "Operasyon ajanları", "Erken uyarı modelleri"],
        problems: [
          "AI girişimleri POC aşamasında kalıyor, operasyona taşınamıyor.",
          "Yöneticiler veriye boğuluyor ama içgörüsüz kalıyor.",
          "Tekrarlayan analizler manuel eforla yürütülüyor.",
        ],
        audience: ["Dijital dönüşüm liderleri", "Bilgi teknolojileri direktörleri", "Operasyon yönetimleri"],
        scope: ["AI stratejisi", "Operasyon ajanları", "Yönetici Copilot sistemleri", "Erken uyarı modelleri", "Akıllı otomasyon"],
        outputs: ["AI kullanım senaryosu portföyü", "Çalışan ajan ve copilot prototipleri", "Ölçeklendirme planı"],
      },
      en: {
        title: "AI Transformation",
        intro: "We take AI out of pilot purgatory and embed it into the daily decision flow of operations.",
        cardPoints: ["AI strategy", "Operations agents", "Early-warning models"],
        problems: [
          "AI initiatives stall at the POC stage and never reach operations.",
          "Managers drown in data yet remain starved of insight.",
          "Recurring analyses run on manual effort.",
        ],
        audience: ["Digital transformation leaders", "IT directors", "Operations leadership"],
        scope: ["AI strategy", "Operations agents", "Manager copilot systems", "Early-warning models", "Intelligent automation"],
        outputs: ["AI use-case portfolio", "Working agent and copilot prototypes", "Scaling plan"],
      },
    },
  },
  {
    key: "data",
    icon: "◫",
    slug: { tr: "veri-ve-karar-destek", en: "data-and-decision-support" },
    i18n: {
      tr: {
        title: "Veri ve Karar Destek",
        intro: "Veriyi rapordan çıkarır; yöneticinin karar anına taşıyan dashboard ve modelleri kurarız.",
        cardPoints: ["Yönetici dashboardları", "KPI sözlükleri", "Tahmin ve risk sistemleri"],
        problems: [
          "Rapor bolluğu var, karar kıtlığı yaşanıyor.",
          "Metrikler tanımsız ve birimler arasında tutarsız.",
          "Görünürlük geç geliyor; veri geriye dönük anlatıyor, ileriye dönük uyarmıyor.",
        ],
        audience: ["Üst yönetim", "Veri ve analitik ekipleri", "Bölge ve mağaza yönetimi"],
        scope: ["Yönetici dashboardları", "KPI sözlükleri", "Veri kaynakları haritası", "Tahmin ve risk sistemleri", "Karar destek modelleri"],
        outputs: ["Yönetici dashboard seti", "KPI sözlüğü", "Tahmin ve risk modeli prototipi"],
      },
      en: {
        title: "Data & Decision Support",
        intro: "We take data out of reports and into the manager's moment of decision — through dashboards and models.",
        cardPoints: ["Executive dashboards", "KPI dictionaries", "Forecast & risk systems"],
        problems: [
          "An abundance of reports, a scarcity of decisions.",
          "Metrics are undefined and inconsistent across units.",
          "Visibility arrives late; data explains the past instead of warning about the future.",
        ],
        audience: ["Senior leadership", "Data and analytics teams", "Regional and store management"],
        scope: ["Executive dashboards", "KPI dictionaries", "Data source mapping", "Forecast and risk systems", "Decision support models"],
        outputs: ["Executive dashboard set", "KPI dictionary", "Forecast and risk model prototype"],
      },
    },
  },
  {
    key: "org",
    icon: "⬡",
    slug: { tr: "organizasyonel-donusum", en: "organizational-transformation" },
    i18n: {
      tr: {
        title: "Organizasyonel Dönüşüm",
        intro: "Operating model, rol ve yönetişim yapısını hedef stratejiyle hizalar; değişimi yönetilebilir kılarız.",
        cardPoints: ["Operating model", "Rol ve RACI tasarımı", "Değişim yönetimi"],
        problems: [
          "Roller ve sorumluluklar belirsiz; işler kişiler arasında kayboluyor.",
          "Karar hakları dağınık; kimin neye karar verdiği net değil.",
          "Değişim girişimleri dirençle karşılaşıyor ve sönümleniyor.",
        ],
        audience: ["CEO ve COO'lar", "İnsan kaynakları direktörleri", "Dönüşüm ofisleri"],
        scope: ["Operating model tasarımı", "Rol ve sorumluluk tasarımı", "RACI", "Yönetişim yapısı", "Değişim yönetimi"],
        outputs: ["Hedef operating model", "RACI matrisi", "Değişim yönetimi planı"],
      },
      en: {
        title: "Organizational Transformation",
        intro: "We align the operating model, roles and governance with the target strategy — and make change manageable.",
        cardPoints: ["Operating model", "Roles & RACI design", "Change management"],
        problems: [
          "Roles and responsibilities are unclear; work gets lost between people.",
          "Decision rights are scattered; who decides what is never clear.",
          "Change initiatives meet resistance and fade out.",
        ],
        audience: ["CEOs and COOs", "HR directors", "Transformation offices"],
        scope: ["Operating model design", "Role and responsibility design", "RACI", "Governance structure", "Change management"],
        outputs: ["Target operating model", "RACI matrix", "Change management plan"],
      },
    },
  },
  {
    key: "leadership",
    icon: "△",
    slug: { tr: "liderlik-ve-gelisim", en: "leadership-development" },
    i18n: {
      tr: {
        title: "Liderlik ve Yönetici Gelişimi",
        intro: "Bölge ve mağaza yöneticilerini sistemle çalışan liderlere dönüştüren gelişim modelleri kurarız.",
        cardPoints: ["Bölge müdürü modeli", "Yetkinlik modeli", "Yönetici akademisi"],
        problems: [
          "Yönetim kalitesi kişiye bağlı; iyi yönetici gidince performans gidiyor.",
          "Yönetici gelişimi standartsız ve tesadüfi ilerliyor.",
          "Kadrolar terfiye hazırlıksız; yedekleme planı yok.",
        ],
        audience: ["İK ve yetenek yönetimi liderleri", "Perakende operasyon yönetimi", "Bölge müdürleri"],
        scope: ["Bölge müdürü modeli", "Mağaza müdürü sistemi", "Yetkinlik modeli", "Gelişim programları", "Yönetici akademisi"],
        outputs: ["Yetkinlik modeli ve değerlendirme seti", "Gelişim programı müfredatı", "Yönetim standartları rehberi"],
      },
      en: {
        title: "Leadership Development",
        intro: "We build development models that turn regional and store managers into leaders who run on systems.",
        cardPoints: ["Regional manager model", "Competency framework", "Leadership academy"],
        problems: [
          "Management quality depends on individuals; when a good manager leaves, performance leaves too.",
          "Leadership development is unstandardized and accidental.",
          "Teams are unprepared for promotion; there is no succession plan.",
        ],
        audience: ["HR and talent leaders", "Retail operations leadership", "Regional managers"],
        scope: ["Regional manager model", "Store manager system", "Competency framework", "Development programs", "Leadership academy"],
        outputs: ["Competency model and assessment set", "Development program curriculum", "Management standards playbook"],
      },
    },
  },
  {
    key: "cx",
    icon: "◎",
    slug: { tr: "musteri-deneyimi-ve-dijital-operasyon", en: "customer-experience-and-digital-operations" },
    i18n: {
      tr: {
        title: "Müşteri Deneyimi ve Dijital Operasyon",
        intro: "Müşteri sesini operasyon kararlarına bağlar; dijital araçlarla ölçülebilir ve takip edilebilir kılarız.",
        cardPoints: ["Müşteri yolculuğu", "NPS ve memnuniyet analizi", "Dijital takip araçları"],
        problems: [
          "Müşteri geri bildirimi toplanıyor ama karara dönüşmüyor.",
          "Kanallar arasında tutarsız bir deneyim yaşanıyor.",
          "Takip süreçleri manuel ve kopuk yürüyor.",
        ],
        audience: ["Müşteri deneyimi direktörleri", "Pazarlama ve operasyon ekipleri", "Çok kanallı perakendeciler"],
        scope: ["Müşteri yolculuğu tasarımı", "Voice of Customer", "NPS ve memnuniyet analizi", "Power BI ve Power Automate", "Dijital takip araçları"],
        outputs: ["Müşteri yolculuğu haritası", "VoC ölçüm sistemi", "Dijital takip panosu"],
      },
      en: {
        title: "Customer Experience & Digital Operations",
        intro: "We connect the voice of the customer to operational decisions — measurable and trackable through digital tools.",
        cardPoints: ["Customer journey", "NPS & satisfaction analytics", "Digital tracking tools"],
        problems: [
          "Customer feedback is collected but never turns into decisions.",
          "The experience is inconsistent across channels.",
          "Follow-up processes run manually and in silos.",
        ],
        audience: ["CX directors", "Marketing and operations teams", "Omnichannel retailers"],
        scope: ["Customer journey design", "Voice of Customer", "NPS and satisfaction analytics", "Power BI and Power Automate", "Digital tracking tools"],
        outputs: ["Customer journey map", "VoC measurement system", "Digital tracking board"],
      },
    },
  },
];

export function findSolution(locale: Locale, slug: string) {
  return solutions.find((s) => s.slug[locale] === slug);
}
