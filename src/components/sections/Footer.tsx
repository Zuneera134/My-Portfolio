"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );
    }

    if (metaRef.current) {
      gsap.fromTo(
        metaRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: metaRef.current,
            start: "top 90%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="section-padding py-32 md:py-48"
    >
      <div className="h-line mb-16" />

      <div className="mb-8">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim">
          006 — Contact
        </span>
      </div>

      <div ref={headlineRef} className="max-w-[90vw] md:max-w-[70vw] mb-16">
        <h2 className="text-[clamp(2.5rem,7vw,8rem)] leading-[0.95] tracking-[-0.04em] font-light">
          Have an idea?
          <br />
          Let&apos;s make it{" "}
          <span className="text-gradient-accent">impossible</span>
          <br />
          to ignore.
        </h2>
      </div>

      <div ref={ctaRef}>
        <a
          href="mailto:[YOUR EMAIL]"
          className="group inline-flex items-center gap-6 text-2xl md:text-4xl font-light tracking-tight hover:text-accent transition-colors duration-300"
          data-cursor="OPEN"
        >
          Get in touch
          <svg
            className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </a>
      </div>

      <div
        ref={metaRef}
        className="mt-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div className="flex flex-col gap-2">
          <div className="text-sm font-light text-fg-muted">
            Zuneera Tariq — Creative Developer
          </div>
          <div className="text-sm font-light text-fg-dim">
            [YOUR LOCATION]
          </div>
        </div>

        <div className="flex items-center gap-6">
          {[
            { label: "GitHub", href: "https://github.com/Zuneera134" },
            { label: "LinkedIn", href: "[LINKEDIN]" },
            { label: "Instagram", href: "[INSTAGRAM]" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-mono tracking-[0.2em] uppercase text-fg-dim hover:text-accent transition-colors duration-300"
              data-cursor="OPEN"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
          &copy; 2026
        </div>
      </div>
    </footer>
  );
}
