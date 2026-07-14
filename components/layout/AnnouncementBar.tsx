"use client";

import { useState } from "react";

export default function AnnouncementBar({ text, link }: { text: string; link: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="announce">
      <div className="inner">
        <span>{text}</span>
        <div className="right">
          <a href="#approach">{link}</a>
          <button aria-label="Close announcement" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
