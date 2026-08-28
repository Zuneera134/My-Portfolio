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
    const tweens: gsap.core.Tween[] = [];

    // Progressive word reveal
    wordRefs.current.forEach((word) => {
      if (!word) return;
      tweens.push(
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
        )
      );
    });

    // Description fade in
    if (descRef.current) {
      tweens.push(
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
              once: true,
            },
          }
        )
      );
    }

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  const introWords = [
    { text: "The", weight: "font-light" },
    { text: "work", weight: "font-medium" },
    { text: "I've been", weight: "font-light" },
    { text: "doing", weight: "font-medium" },
    { text: "when nobody", weight: "font-light" },
    { text: "is paying me.", weight: "font-medium" },
  ];

  return (
    <section
      ref={sectionRef}
      className="section section-padding flex flex-col justify-center"
    >
      <div className="max-w-[85vw] md:max-w-[70vw]">
        <span className="section-eyebrow">Introduction</span>

        <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.75rem)] leading-[1.12] tracking-[-0.02em] mt-6">
          {introWords.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              className={`${word.weight} inline-block mr-[0.45em]`}
            >
              {word.text}
            </span>
          ))}
        </h2>

        <div ref={descRef} className="max-w-xl">
          <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light">
            I turn ideas into working software. From a rough concept to a
            deployed product, I care about how a system behaves end-to-end:
            clean APIs, sane databases, and an interface people actually enjoy
            using.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light mt-6">
            The projects on this page are the ones where I made the decisions
            and owned the outcome. Pick any one and dig in.
          </p>
        </div>
      </div>
    </section>
  );
}
