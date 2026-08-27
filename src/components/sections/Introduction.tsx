"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Progressive word reveal
    wordRefs.current.forEach((word) => {
      if (!word) return;
      gsap.fromTo(
        word,
        {
          opacity: 0.1,
          y: 20,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: word,
            start: isMobile ? "top 85%" : "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Description fade in
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 80%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const introWords = [
    { text: "Not just", weight: "font-light" },
    { text: "a student.", weight: "font-medium" },
    { text: "I design,", weight: "font-light" },
    { text: "engineer", weight: "font-semibold" },
    { text: "and obsess over", weight: "font-light" },
    { text: "digital experiences.", weight: "font-medium" },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center section-padding py-32"
    >
      <div className="max-w-[85vw] md:max-w-[70vw]">
        <div className="mb-4">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim">
            001 — Introduction
          </span>
        </div>

        <h2 className="text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.1] tracking-[-0.03em] mb-16">
          {introWords.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              className={`${word.weight} inline-block mr-[0.25em]`}
            >
              {word.text}
            </span>
          ))}
        </h2>

        <div ref={descRef} className="max-w-xl">
          <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light">
            I build digital experiences that feel intentional — combining
            solid engineering with thoughtful design. From concept to
            deployment, I care about clean architecture, secure systems,
            and the last 2% of polish.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light mt-6">
            BS Computer Science student at COMSATS University Islamabad.
            Based in Mansehra, Pakistan. Currently exploring full-stack
            development, databases, and building real-world systems
            — one project at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
