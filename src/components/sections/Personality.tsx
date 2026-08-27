"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const thingsILike = [
  "late-night ideas",
  "beautiful interfaces",
  "clean code",
  "weird animations",
  "strong coffee",
  "ambient music",
  "building things nobody asked for",
  "pixel-perfect execution",
  "open source",
  "long walks with headphones",
  "design systems",
  "the sound of mechanical keyboards",
];

export default function Personality() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 15 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding py-32 md:py-48"
    >
      <div className="mb-16 md:mb-24">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim">
          005 — Personality
        </span>
      </div>

      <div className="max-w-[85vw] md:max-w-[60vw] mb-16">
        <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.1] tracking-[-0.03em] font-light">
          Things I like.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
        {thingsILike.map((thing, i) => (
          <div
            key={thing}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="group flex items-center gap-4 py-3 border-b border-border/50 hover:border-accent/30 transition-colors duration-300"
          >
            <span className="text-[9px] font-mono tracking-widest text-fg-dim w-8 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-lg md:text-xl font-light text-fg group-hover:text-accent transition-colors duration-300">
              {thing}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
