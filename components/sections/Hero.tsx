"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import type { Dictionary } from "@/content/dictionaries";

export default function Hero({ t }: { t: Dictionary["hero"] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const S = 900, R = 330, CX = S / 2, CY = S / 2;
    let rot = 0, raf = 0;

    const seed = (n: number) => {
      let s = n;
      return () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    };
    const rnd = seed(42);

    type Pt = { lat: number; lon: number; s: number; tw: number };
    const pts: Pt[] = [];
    for (let i = 0; i < 190; i++) {
      pts.push({ lat: rnd() * 1.7 - 0.85, lon: rnd() * Math.PI * 2, s: 0.8 + rnd() * 1.7, tw: rnd() * Math.PI * 2 });
    }
    const arcs = Array.from({ length: 16 }, () => ({
      a: (rnd() * pts.length) | 0,
      b: (rnd() * pts.length) | 0,
      ph: rnd() * Math.PI * 2,
    }));

    function proj(p: Pt, r: number) {
      const lon = p.lon + r;
      return {
        x: CX + Math.cos(p.lat) * Math.sin(lon) * R,
        y: CY - Math.sin(p.lat) * R * 0.98,
        z: Math.cos(p.lat) * Math.cos(lon),
      };
    }

    let t = 0;
    function draw() {
      t += 0.016;
      if (!reduced) rot += 0.0016;
      ctx!.clearRect(0, 0, S, S);

      const g = ctx!.createRadialGradient(CX - R * 0.35, CY - R * 0.4, R * 0.1, CX, CY, R);
      g.addColorStop(0, "#182036");
      g.addColorStop(0.55, "#0d1322");
      g.addColorStop(1, "#070a12");
      ctx!.fillStyle = g;
      ctx!.beginPath(); ctx!.arc(CX, CY, R, 0, 7); ctx!.fill();

      ctx!.strokeStyle = "rgba(233,180,76,.18)"; ctx!.lineWidth = 1.4;
      ctx!.beginPath(); ctx!.arc(CX, CY, R + 10, 0, 7); ctx!.stroke();
      ctx!.strokeStyle = "rgba(233,180,76,.07)";
      ctx!.beginPath(); ctx!.arc(CX, CY, R + 26, 0, 7); ctx!.stroke();

      pts.forEach((p) => {
        const q = proj(p, rot);
        if (q.z <= 0.05) return;
        const a = (0.25 + 0.75 * q.z) * (0.65 + 0.35 * Math.sin(t * 1.4 + p.tw));
        ctx!.fillStyle = `rgba(233,180,76,${a})`;
        ctx!.beginPath(); ctx!.arc(q.x, q.y, p.s * q.z, 0, 7); ctx!.fill();
      });

      arcs.forEach((A) => {
        const p1 = proj(pts[A.a], rot);
        const p2 = proj(pts[A.b], rot);
        if (p1.z < 0.12 || p2.z < 0.12) return;
        const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
        const d = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const nx = CX + (mx - CX) * (1 + d / (R * 2.4));
        const ny = CY + (my - CY) * (1 + d / (R * 2.4));
        const glow = 0.5 + 0.5 * Math.sin(t * 1.2 + A.ph);
        ctx!.strokeStyle = `rgba(233,180,76,${0.1 + 0.22 * glow * Math.min(p1.z, p2.z)})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(p1.x, p1.y);
        ctx!.quadraticCurveTo(nx, ny, p2.x, p2.y);
        ctx!.stroke();
        if (!reduced) {
          const tt = (t * 0.25 + A.ph) % 1;
          const ax = (1 - tt) * (1 - tt) * p1.x + 2 * (1 - tt) * tt * nx + tt * tt * p2.x;
          const ay = (1 - tt) * (1 - tt) * p1.y + 2 * (1 - tt) * tt * ny + tt * tt * p2.y;
          ctx!.fillStyle = "rgba(242,205,136,.9)";
          ctx!.beginPath(); ctx!.arc(ax, ay, 1.7, 0, 7); ctx!.fill();
        }
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" width={900} height={900} aria-hidden="true" />
      <div className="container">
        <Reveal as="h1">
          {t.line1}
          <br />
          {t.line2}
        </Reveal>
        <Reveal className="gold-line">{t.goldLine}</Reveal>
        <Reveal as="p" className="lede">{t.lede}</Reveal>
        <Reveal as="p" className="mantra">{t.mantra}</Reveal>
        <Reveal className="hero-ctas">
          <a className="btn btn-primary" href="#solutions">
            {t.primary} <span className="arr">→</span>
          </a>
          <a className="btn btn-ghost" href="#final">
            {t.secondary} <span className="arr">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
