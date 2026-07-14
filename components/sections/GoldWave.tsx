"use client";

import { useEffect, useRef } from "react";

export default function GoldWave() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let W = 0, H = 0;

    const rs = () => {
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
    };
    rs();
    window.addEventListener("resize", rs);

    let t = 0;
    function draw() {
      t += 0.012;
      ctx!.clearRect(0, 0, W, H);
      const rows = 7;
      const cols = Math.ceil(W / 26);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * 26 + (r % 2) * 13;
          const y = H * 0.62 + r * 14 + Math.sin(c * 0.32 + t * 2 + r * 0.7) * 14;
          const a = 0.05 + 0.28 * ((r + 1) / rows) * (0.5 + 0.5 * Math.sin(c * 0.32 + t * 2 + r * 0.7));
          ctx!.fillStyle = `rgba(233,180,76,${a})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 1.5, 0, 7);
          ctx!.fill();
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", rs);
    };
  }, []);

  return <canvas ref={ref} className="final-canvas" aria-hidden="true" />;
}
