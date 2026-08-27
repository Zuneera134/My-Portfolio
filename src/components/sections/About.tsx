"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    category: "Design",
    items: ["UI Design", "Design Systems", "Prototyping", "Motion Design"],
    philosophy: "Design is how it works, not just how it looks.",
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Vue.js"],
    philosophy: "Performance is a feature, not an afterthought.",
  },
  {
    category: "Motion",
    items: ["GSAP", "Framer Motion", "CSS Animation", "WebGL"],
    philosophy: "Motion guides attention and creates meaning.",
  },
  {
    category: "Systems",
    items: ["Architecture", "API Design", "DevOps", "Testing"],
    philosophy: "Good systems are invisible. Bad ones are everywhere.",
  },
  {
    category: "Experiments",
    items: ["Creative Coding", "Generative Art", "WebGL", "Three.js"],
    philosophy: "The best ideas come from playful exploration.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    capRefs.current.forEach((cap) => {
      if (!cap) return;

      const items = cap.querySelectorAll(".cap-item");
      const philosophy = cap.querySelector(".cap-philosophy");

      gsap.fromTo(
        cap,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cap,
            start: "top 80%",
          },
        }
      );

      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cap,
              start: "top 75%",
            },
          }
        );
      }

      if (philosophy) {
        gsap.fromTo(
          philosophy,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: philosophy,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding py-32 md:py-48"
    >
      <div className="mb-16 md:mb-24">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim">
          003 — About
        </span>
      </div>

      <div className="max-w-[85vw] md:max-w-[60vw] mb-24">
        <h2 className="text-[clamp(2rem,5vw,5rem)] leading-[1.1] tracking-[-0.03em] font-light">
          I design interfaces.
          <br />
          I build systems.
          <br />
          <span className="text-gradient-accent">I care about the last 2%.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
        {capabilities.map((cap, i) => (
          <div
            key={cap.category}
            ref={(el) => { capRefs.current[i] = el; }}
            className="group"
          >
            <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim mb-6">
              {cap.category}
            </div>
            <ul className="space-y-3 mb-6">
              {cap.items.map((item) => (
                <li
                  key={item}
                  className="cap-item text-lg md:text-xl font-light text-fg group-hover:text-fg-muted transition-colors duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="cap-philosophy text-sm text-fg-dim font-light italic">
              &ldquo;{cap.philosophy}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
