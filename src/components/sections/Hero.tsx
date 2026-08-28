"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { scrollToSection } from "@/lib/scroll";
import HeroLaptop from "./HeroLaptop";

export default function Hero() {
  const badge = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLDivElement>(null);
  const desc = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const stats = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = [badge, name, desc, actions, stats];
    const tl = gsap.timeline({ delay: 0.2 });
    list.forEach((r, i) => {
      if (!r.current) return;
      tl.fromTo(
        r.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        i * 0.1
      );
    });
    return () => {
      tl.kill();
    };
  }, []);

  const go = (selector: string) => {
    scrollToSection(selector);
  };

  return (
    <section className="hero-section relative min-h-[88vh] flex items-center overflow-hidden section-padding">
      {/* Ambient glow */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto pt-12 pb-8 px-6 flex items-center gap-6 md:gap-8 lg:gap-10">
        <div className="flex-1">
        <div ref={badge} className="opacity-0 mb-2!">
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border text-[11px] font-mono tracking-[0.15em] uppercase text-fg-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Open to Internships &amp; Opportunities
          </span>
        </div>

        <div ref={name} className="mt-5! opacity-0">
          <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] leading-[1.05] font-medium tracking-tight">
            Zuneera{" "}
            <span className="text-gradient-accent">Tariq</span>
          </h1>
        </div>

        <div ref={desc} className="mt-12 opacity-0">
          <p className="text-base md:text-lg font-light text-fg-muted max-w-xl leading-relaxed">
            I build clean, secure, full-stack web applications with React, Node.js
            and databases. Based in Mansehra, Pakistan. Turning ideas into
            polished, real-world systems one project at a time.
          </p>
        </div>

        <div ref={actions} className="mt-5! flex flex-wrap gap-5 opacity-0">
          <button
            onClick={() => go("#work")}
            className="btn btn-primary group"
            data-cursor="GO"
          >
            View Projects
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            onClick={() => go("#connect")}
            className="btn btn-secondary"
            data-cursor="GO"
          >
            Hire Me
          </button>
          <button
            onClick={() => go("#connect")}
            className="btn btn-secondary"
            data-cursor="GO"
          >
            Get in Touch
          </button>
        </div>

        <div ref={stats} className="mt-5! flex flex-wrap gap-x-12 gap-y-6 opacity-0">
          {[
            { num: "5", label: "Projects" },
            { num: "3", label: "Certifications" },
            { num: "12+", label: "Technologies" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-10">
              {i > 0 && <span className="hidden sm:block w-px h-8 bg-border" />}
              <div>
                <div className="text-2xl font-display font-medium text-fg">{s.num}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-dim mt-1">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        <HeroLaptop />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-fg-dim">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-fg-dim to-transparent" />
      </div>
    </section>
  );
}
