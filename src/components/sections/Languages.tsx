"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const languages = [
  "JavaScript",
  "Java",
  "Python",
  "HTML",
  "CSS",
  "C",
];

export default function Languages() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
            start: "top 90%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="languages" ref={sectionRef} className="section-padding py-16 md:py-24">
      <div className="mb-8">
        <div className="section-eyebrow mb-4">What I code in</div>
        <h2 className="section-title">Languages</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {languages.map((lang, i) => (
          <div
            key={lang}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="px-6 py-4 border border-border hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300 rounded-sm text-lg md:text-xl font-light"
          >
            {lang}
          </div>
        ))}
      </div>
    </section>
  );
}
