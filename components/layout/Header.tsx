"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { sectionPath } from "@/lib/routes";

export default function Header({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: sectionPath(locale, "solutions"), label: nav.solutions },
    { href: sectionPath(locale, "products"), label: nav.products },
    { href: sectionPath(locale, "cases"), label: nav.cases },
    { href: `/${locale}#insights`, label: nav.insights },
    { href: `/${locale}#founder`, label: nav.about },
  ];

  return (
    <>
      <header className={scrolled ? "scrolled" : ""}>
        <nav className="nav" aria-label="Main navigation">
          <Link className="brand" href={`/${locale}`}>
            <span className="logo">STRAVION</span>
            <span className="tagline">AI-Powered Operational Excellence</span>
          </Link>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <span className="lang">
              <Link className={locale === "tr" ? "on" : ""} href="/tr">TR</Link>
              {" / "}
              <Link className={locale === "en" ? "on" : ""} href="/en">EN</Link>
            </span>
            <Link className="nav-contact" href={sectionPath(locale, "contact")}>{nav.contact}</Link>
            <Link className="btn btn-ghost" href={sectionPath(locale, "contact")}>{nav.cta} <span className="arr">→</span></Link>
            <button
              className="burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </header>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <Link className="btn btn-primary" href={sectionPath(locale, "contact")} onClick={() => setMenuOpen(false)}>
          {nav.cta}
        </Link>
      </div>
    </>
  );
}
