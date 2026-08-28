"use client";

import { useRef, useEffect } from "react";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

export default function ProjectMockup({
  number,
  color,
  className = "",
}: {
  number: string;
  color: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [r, g, b] = hexToRgb(color);
  const accent = `rgb(${r}, ${g}, ${b})`;
  const accentSoft = `rgba(${r}, ${g}, ${b}, 0.16)`;

  // vary the layout a bit per project so cards don't all look identical
  const layout = parseInt(number, 10) % 3;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let t = 0;
    const bars = el.querySelectorAll<HTMLElement>("[data-shimmer]");
    const animate = () => {
      t++;
      bars.forEach((bar, i) => {
        bar.style.opacity = String(0.35 + (Math.sin(t * 0.05 + i) * 0.5 + 0.5) * 0.4);
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [color]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-bg-muted ${className}`}
    >
      {/* ambient gradient wash in project color */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 70% 20%, ${accentSoft}, transparent 60%)`,
        }}
      />

      {/* Browser window */}
      <div className="absolute inset-3 sm:inset-4 md:inset-5 flex flex-col rounded-lg border border-border bg-bg overflow-hidden shadow-lg">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-3 py-2 bg-bg-muted border-b border-border">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
          <div className="ml-2 flex-1 h-3 rounded-sm bg-bg border border-border/70 max-w-[55%]" />
          <span className="hidden sm:block w-6 h-3 rounded-sm" style={{ background: accentSoft }} />
        </div>

        {/* App body — varies by project */}
        {layout === 0 && (
          <div className="flex flex-1 min-h-0">
            {/* Sidebar */}
            <div className="w-10 sm:w-12 md:w-14 bg-bg-muted/60 border-r border-border p-2 flex flex-col gap-2">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-2.5 rounded-sm"
                  data-shimmer
                  style={{
                    background: i === 0 ? accentSoft : "rgba(120,120,130,0.25)",
                  }}
                />
              ))}
            </div>
            {/* Content */}
            <div className="flex-1 p-3 flex flex-col gap-2 min-w-0">
              <span className="h-2.5 w-2/5 rounded-sm" data-shimmer style={{ background: accentSoft }} />
              <div className="grid grid-cols-2 gap-2 mt-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="rounded-md border border-border bg-bg-muted/50 p-2">
                    <span className="block h-2 w-3/4 rounded-sm" data-shimmer style={{ background: i % 2 ? accentSoft : "rgba(120,120,130,0.2)" }} />
                    <span className="block h-2 w-1/2 rounded-sm mt-1.5" style={{ background: "rgba(120,120,130,0.18)" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {layout === 1 && (
          <div className="flex-1 p-3 flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-1/3 rounded-sm" data-shimmer style={{ background: accentSoft }} />
              <div className="ml-auto flex gap-1.5">
                <span className="h-4 w-10 rounded-sm" style={{ background: accent }} />
                <span className="h-4 w-10 rounded-sm border border-border" />
              </div>
            </div>
            <div className="mt-1 flex-1 rounded-md border border-border bg-bg-muted/50 p-2 flex flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm" style={{ background: accentSoft }} />
                  <span className="h-2 flex-1 rounded-sm" data-shimmer style={{ background: i === 1 ? accentSoft : "rgba(120,120,130,0.2)" }} />
                  <span className="h-3 w-6 rounded-sm" style={{ background: accentSoft }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {layout === 2 && (
          <div className="flex-1 min-w-0">
            <div className="p-3 flex flex-col gap-2">
              <span className="h-2.5 w-2/5 rounded-sm" data-shimmer style={{ background: accentSoft }} />
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-8 rounded-md" style={{ background: i === 0 ? accentSoft : "rgba(120,120,130,0.18)", border: "1px solid var(--color-border)" }} />
                ))}
              </div>
            </div>
            <div className="px-3 pb-3 flex flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 rounded-md border border-border bg-bg-muted/50 px-2 py-1.5">
                  <span className="w-4 h-4 rounded-sm" style={{ background: accentSoft }} />
                  <span className="h-2 flex-1 rounded-sm" data-shimmer style={{ background: `rgba(${r}, ${g}, ${b}, 0.4)` }} />
                  <span className="h-2 w-8 rounded-sm" style={{ background: "rgba(120,120,130,0.2)" }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
