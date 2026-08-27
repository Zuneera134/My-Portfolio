"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const badge = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLDivElement>(null);
  const desc = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const stats = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = [badge, name, desc, actions, stats, visual];
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

    const floating = gsap.utils.toArray<HTMLElement>(".hero-float");
    const floatTweens = floating.map((el) =>
      gsap.to(el, {
        y: -14,
        duration: 2.4 + Math.random() * 1.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random(),
      })
    );

    return () => {
      tl.kill();
      floatTweens.forEach((t) => t.kill());
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

      {/* Second glow behind visual */}
      <div
        className="absolute bottom-[-10%] right-[10%] w-[420px] h-[420px] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div className="flex flex-col">
            <div ref={badge} className="opacity-0">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border text-[11px] font-mono tracking-[0.15em] uppercase text-fg-muted">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Open to Internships &amp; Opportunities
              </span>
            </div>

            <div ref={name} className="mt-12 opacity-0">
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

            <div ref={actions} className="mt-20 flex flex-wrap gap-5 opacity-0">
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

            <div ref={stats} className="mt-20 flex flex-wrap gap-x-12 gap-y-6 opacity-0">
              {[
                { num: "7+", label: "Projects" },
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

          {/* Right: eye-catching visual */}
          <div ref={visual} className="hidden lg:flex justify-center opacity-0">
            <div className="relative w-[340px] h-[440px]">
              {/* Accent gradient ring frame */}
              <div className="absolute inset-0 rounded-[2rem] opacity-[0.12 blur-[2px]"
                style={{
                  background:
                    "linear-gradient(160deg, var(--color-accent) 0%, transparent 45%, var(--color-accent) 100%)",
                }}
              />

              {/* Profile card */}
              <div className="relative w-full h-full rounded-[2rem] border border-border bg-bg-elevated p-8 flex flex-col items-center justify-center text-center overflow-hidden">
                {/* top-left index */}
                <span className="absolute top-5 left-6 text-[10px] font-mono uppercase tracking-[0.25em] text-fg-dim">
                  zt.v1
                </span>
                {/* top-right live dot */}
                <span className="absolute top-5 right-6 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-fg-dim">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  live
                </span>

                {/* Monogram */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full opacity-30 blur-2xl"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <div className="hero-float relative w-28 h-28 rounded-full bg-bg-muted border border-border-light flex items-center justify-center">
                    <span className="font-display text-5xl font-medium text-gradient-accent">
                      ZT
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-[11px] font-mono uppercase tracking-[0.3em] text-fg-muted">
                  Full-Stack Developer
                </p>
                <p className="mt-2 text-sm font-light text-fg-dim">
                  React · Node.js · MongoDB
                </p>

                {/* Divider */}
                <div className="mt-6 w-full h-px bg-border" />

                <div className="mt-5 w-full space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-fg-dim">based in</span>
                    <span className="text-fg font-light">Mansehra, Pakistan</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-fg-dim">education</span>
                    <span className="text-fg font-light">BS CS @ COMSATS</span>
                  </div>
                </div>
              </div>

              {/* Floating terminal card */}
              <div className="hero-float absolute -top-6 -right-8 w-48 rounded-xl border border-border-light bg-bg-muted shadow-xl overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <span className="w-2 h-2 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-[9px] font-mono tracking-wider text-fg-dim">
                    ~/build.ts
                  </span>
                </div>
                <div className="px-3 py-3 font-mono text-[10px] leading-relaxed">
                  <div>
                    <span className="text-accent">$</span>{" "}
                    <span className="text-fg">next build</span>
                  </div>
                  <div className="text-fg-muted">✓ Compiled successfully</div>
                  <div className="text-fg-muted">✓ 7 projects shipped</div>
                  <div className="text-accent">✓ Ready</div>
                </div>
              </div>

              {/* Floating tech badge - React */}
              <div className="hero-float absolute -bottom-5 -left-10 px-4 py-2.5 rounded-full border border-border-light bg-bg-elevated text-xs font-mono flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--lang-js)" }} />
                <span className="text-fg">React</span>
              </div>

              {/* Floating tech badge - Node */}
              <div className="hero-float absolute top-16 -left-14 px-4 py-2.5 rounded-full border border-border-light bg-bg-elevated text-xs font-mono flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--lang-js)" }} />
                <span className="text-fg">Node.js</span>
              </div>

              {/* Floating badge - MySQL */}
              <div className="hero-float absolute bottom-16 -right-9 px-4 py-2.5 rounded-full border border-border-light bg-bg-elevated text-xs font-mono flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--lang-css)" }} />
                <span className="text-fg">MongoDB</span>
              </div>
            </div>
          </div>
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
