import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { solutions } from "@/content/solutions";
import { detailPath, sectionPath } from "@/lib/routes";
import { socialLinks } from "@/content/social-links";
import { companyLinks, resourceLinks } from "@/content/footer-links";

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
            {socialLinks.length > 0 && (
              <div className="socials">
                {socialLinks.map((s) => (
                  <a
                    key={s.key}
                    href={s.url}
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
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
            <ul>
              {companyLinks(locale).map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="foot-col">
            <h4>{t.resourcesTitle}</h4>
            <ul>
              {resourceLinks(locale).map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
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
