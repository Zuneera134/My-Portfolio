"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("001");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      // Determine section
      const sections = document.querySelectorAll("section[id]");
      let current = "001";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          const id = section.getAttribute("id");
          if (id === "work") current = "002";
          else if (id === "languages") current = "003";
          else if (id === "skills") current = "004";
          else if (id === "journey") current = "005";
        }
      });
      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
          {currentSection} — {Math.round(scrollProgress * 100)}%
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
