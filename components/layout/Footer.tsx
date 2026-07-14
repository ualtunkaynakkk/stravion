import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { solutions } from "@/content/solutions";
import { detailPath, sectionPath } from "@/lib/routes";

export default function Footer({ locale, t }: { locale: Locale; t: Dictionary["footer"] }) {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="brand" href={`/${locale}`}>
              <span className="logo">STRAVION</span>
              <span className="tagline">AI-Powered Operational Excellence</span>
            </Link>
            <p>{t.desc}</p>
            <div className="socials">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="YouTube">yt</a>
              <a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="X">x</a>
            </div>
          </div>
          <div className="foot-col">
            <h4>{t.solutionsTitle}</h4>
            <ul>
              {solutions.slice(0, 7).map((s) => (
                <li key={s.key}>
                  <Link href={detailPath(locale, "solutions", s.slug[locale])}>{s.i18n[locale].title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="foot-col">
            <h4>{t.companyTitle}</h4>
            <ul>{t.company.map((s) => <li key={s}><a href={`/${locale}#founder`}>{s}</a></li>)}</ul>
          </div>
          <div className="foot-col">
            <h4>{t.resourcesTitle}</h4>
            <ul>
              <li><Link href={`/${locale}#insights`}>{t.resources[0]}</Link></li>
              <li><Link href={sectionPath(locale, "cases")}>{t.resources[1]}</Link></li>
              {t.resources.slice(2).map((s) => <li key={s}><a href={`/${locale}#insights`}>{s}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t.rights}</span>
          <nav aria-label="Legal">
            {t.legal.map((s) => <a key={s} href="#">{s}</a>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}
