export type SocialLink = {
  key: string;
  /** Ekranda görünen kısa etiket */
  label: string;
  /** Erişilebilirlik için tam platform adı */
  name: string;
  url: string;
};

/* KURAL: Buraya yalnızca GERÇEK ve YAYINDA olan profiller yazılır.
   Liste boşsa Footer sosyal bloğu hiç render edilmez — "#" giden
   ölü ikon göstermek, hiç göstermemekten kötüdür: ziyaretçi tıklar,
   hiçbir şey olmaz ve sitenin bakımsız olduğunu düşünür.

   Profil açıldıkça ilgili satırın yorumunu kaldır ve URL'yi yaz. */
export const socialLinks: SocialLink[] = [
  // { key: "linkedin", label: "in", name: "LinkedIn", url: "https://www.linkedin.com/company/xxx" },
  // { key: "youtube", label: "yt", name: "YouTube", url: "https://www.youtube.com/@xxx" },
  // { key: "instagram", label: "ig", name: "Instagram", url: "https://www.instagram.com/xxx" },
  // { key: "x", label: "x", name: "X", url: "https://x.com/xxx" },
];
