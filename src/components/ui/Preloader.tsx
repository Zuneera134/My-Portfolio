"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-bg flex items-center justify-center transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-light tracking-tighter font-[family-name:var(--font-sans)]">
          Zuneera Tariq
        </div>
        <div className="mt-4 text-[10px] font-mono tracking-[0.4em] uppercase text-fg-dim">
          Loading experience
        </div>
      </div>
    </div>
  );
}
