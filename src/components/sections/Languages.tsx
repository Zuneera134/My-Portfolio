"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const languages = [
  "JavaScript",
  "Java",
  "Python",
  "C#",
  "C",
  "HTML",
  "CSS",
];

export default function Languages() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current.forEach((item) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="languages" className="section section-padding">
      <div className="section-inner">
        <div className="section-eyebrow">What I code in</div>
        <h2 className="section-title">Languages</h2>
        <p className="section-sub">
          Programming languages I use to design, build and debug software.
        </p>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {languages.map((lang, i) => (
            <div
              key={lang}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="card group flex flex-col items-center justify-center gap-3 py-8 hover:border-accent transition-colors"
            >
              <span className="w-8 h-8 rounded-full border border-border group-hover:border-accent group-hover:bg-accent/10 transition-colors" />
              <span className="text-sm font-medium text-fg">{lang}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
