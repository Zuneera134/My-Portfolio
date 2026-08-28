"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "work", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "languages", label: "Languages" },
  { id: "skills", label: "Skills" },
  { id: "tools", label: "Tools" },
  { id: "journey", label: "Journey" },
  { id: "connect", label: "Contact" },
];

export default function StatusBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      let current = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) current = i;
        }
      }
      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
      {/* Progress bar */}
      <div className="h-[1px] bg-border w-full">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Status info */}
      <div className="section-padding flex items-center justify-between py-3">
        <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-fg-dim">
          {String(activeIndex + 1).padStart(2, "0")} · {SECTIONS[activeIndex].label} ·{" "}
          {Math.round(scrollProgress * 100)}%
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[9px] font-mono tracking-[0.3em] uppercase text-fg-dim hover:text-accent transition-colors pointer-events-auto"
          data-cursor="SCROLL"
        >
          Back to top
        </button>
      </div>
    </div>
  );
}
