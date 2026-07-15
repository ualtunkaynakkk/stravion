import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { sectionPath } from "@/lib/routes";
import GoldWave from "./GoldWave";

export default function FinalCta({ locale, t }: { locale: Locale; t: Dictionary["finalCta"] }) {
  return (
    <section className="final" id="final">
      <GoldWave />
      <div className="container">
        <div>
          <Reveal as="h2">{t.title}</Reveal>
          <Reveal as="p">{t.text}</Reveal>
        </div>
        <Reveal>
          <Link className="btn btn-primary" href={sectionPath(locale, "contact")}>
            {t.cta} <span className="arr">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
