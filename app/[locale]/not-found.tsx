import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main">
      <section className="nf">
        <div className="container">
          <h1>Bu veri noktası sistemin dışında kaldı.</h1>
          <p>Aradığınız sayfa taşınmış, silinmiş veya hiç oluşturulmamış olabilir.</p>
          <div className="ctas">
            <Link className="btn btn-primary" href="/tr">Ana Sayfaya Dön</Link>
            <Link className="btn btn-ghost" href="/tr#solutions">Çözümleri İncele</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
