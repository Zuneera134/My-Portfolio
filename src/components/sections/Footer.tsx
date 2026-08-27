"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "zuratariq8@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/zuneera-tariq-a4b5012b5";
const GITHUB = "https://github.com/Zuneera134";

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [
      { el: headlineRef.current, y: 60 },
      { el: ctaRef.current, y: 40 },
      { el: metaRef.current, y: 0 },
    ];

    els.forEach(({ el, y }) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
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
    <footer
      id="contact"
      ref={sectionRef}
      className="section section-padding"
    >
      <div className="section-inner">
        <div className="h-line mb-10" />

        <div className="section-eyebrow">Let&apos;s work together</div>
        <h2 className="section-title">Get in Touch</h2>

        <div ref={headlineRef} className="max-w-[90vw] md:max-w-[70vw] my-8">
          <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] font-display font-medium">
            Let&apos;s build
            <br />
            something{" "}
            <span className="text-gradient-accent">great</span>
            <br />
            together.
          </h2>
        </div>

        {/* Action buttons */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-3 mb-10">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary group"
            data-cursor="CONNECT"
          >
            Get in Touch
            <svg
              className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>

          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            data-cursor="HIRE"
          >
            Hire Me
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="btn btn-secondary"
            data-cursor="EMAIL"
          >
            Email
          </a>

          <a
            href="/resume.html"
            className="btn btn-secondary group"
            data-cursor="RESUME"
          >
            Resume
            <svg
              className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
              />
            </svg>
          </a>
        </div>

        <div className="text-2xl md:text-4xl font-display font-medium tracking-tight mb-16">
          <a
            href={`mailto:${EMAIL}`}
            className="hover:text-accent transition-colors duration-300 inline-block"
            data-cursor="EMAIL"
          >
            {EMAIL}
          </a>
        </div>

        <div
          ref={metaRef}
          className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-border"
        >
          <div className="flex flex-col gap-1.5">
            <div className="text-base font-medium text-fg">
              Zuneera Tariq
            </div>
            <div className="text-sm font-light text-fg-muted">
              CS Student @ CUI &apos;28 · Mansehra, Pakistan
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[
              { label: "GitHub", href: GITHUB },
              { label: "LinkedIn", href: LINKEDIN },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium tracking-wide text-fg-muted hover:text-accent transition-colors duration-300"
                data-cursor="OPEN"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-xs font-mono tracking-[0.2em] uppercase text-fg-dim">
            &copy; 2026 Zuneera Tariq
          </div>
        </div>
      </div>
    </footer>
  );
}
