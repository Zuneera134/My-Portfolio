"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const badge = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLDivElement>(null);
  const role = useRef<HTMLDivElement>(null);
  const desc = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const stats = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = [badge, name, role, desc, actions, stats];
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
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden section-padding">
      {/* Ambient glow */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1100px] mx-auto py-24">
        <div ref={badge} className="opacity-0">
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border text-[11px] font-mono tracking-[0.15em] uppercase text-fg-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Open to Internships &amp; Opportunities
          </span>
        </div>

        <div ref={name} className="mt-8 opacity-0">
          <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] leading-[1.05] font-medium tracking-tight">
            Zuneera{" "}
            <span className="text-gradient-accent">Tariq</span>
          </h1>
        </div>

        <div ref={role} className="mt-6 opacity-0">
          <p className="text-[clamp(1.1rem,2vw,1.5rem)] font-mono text-fg-muted">
            CS Student @ COMSATS University — Full-Stack Developer in the making
          </p>
        </div>

        <div ref={desc} className="mt-6 opacity-0">
          <p className="text-base md:text-lg font-light text-fg-muted max-w-xl leading-relaxed">
            I build clean, secure, full-stack web applications with React, Node.js
            and databases. Based in Mansehra, Pakistan — turning ideas into
            polished, real-world systems one project at a time.
          </p>
        </div>

        <div ref={actions} className="mt-10 flex flex-wrap gap-3 opacity-0">
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
          <a
            href="https://www.linkedin.com/in/zuneera-tariq-a4b5012b5"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            data-cursor="GO"
          >
            Hire Me
          </a>
          <a
            href="mailto:zuratariq8@gmail.com"
            className="btn btn-secondary"
            data-cursor="GO"
          >
            Get in Touch
          </a>
        </div>

        <div ref={stats} className="mt-14 flex flex-wrap gap-x-12 gap-y-6 opacity-0">
          {[
            { num: "7+", label: "Projects" },
            { num: "3", label: "Certifications" },
            { num: "12+", label: "Technologies" },
            { num: "2028", label: "Expected Graduation" },
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
