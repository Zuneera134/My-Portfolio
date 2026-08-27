"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const badge = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLDivElement>(null);
  const desc = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const stats = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Handle reduced-motion: disable continuous 3D spin
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    // Gentle float on satellite dots / planes (layered objects)
    const floating = gsap.utils.toArray<HTMLElement>(".hero-float");
    const floatTweens = floating.map((el) =>
      gsap.to(el, {
        y: -16,
        duration: 2.6 + Math.random() * 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      })
    );

    // Cinematic scroll-reactive parallax tilt on the whole 3D stage
    const parallax =
      stageRef.current && !prefersReduced.current
        ? gsap.to(stageRef.current, {
            rotationY: 28,
            rotationX: -10,
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          })
        : null;

    return () => {
      tl.kill();
      floatTweens.forEach((t) => t.kill());
      parallax?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const go = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Reusable satellite dot helper positions
  const satellites = [
    { top: "18%", left: "64%", delay: "0s" },
    { top: "58%", left: "84%", delay: "1.5s" },
    { top: "78%", left: "30%", delay: "3s" },
    { top: "30%", left: "18%", delay: "4.5s" },
  ];

  return (
    <section className="hero-section relative min-h-screen flex items-center overflow-hidden section-padding">
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
        className="absolute bottom-[-10%] right-[10%] w-[480px] h-[480px] rounded-full opacity-[0.07] pointer-events-none"
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

          {/* Right: cinematic 3D isometric scene */}
          <div ref={visual} className="hidden lg:flex justify-center opacity-0">
            <div className="hero-3d-scene select-none">
              {/* Soft accent glow behind everything */}
              <div className="hero-globe-glow" />

              <div ref={stageRef} className="hero-3d-stage">
                {/* Central rotating cube */}
                <div className="hero-cube-wrap">
                  <div className="hero-cube">
                    {[
                      ["front", "ZT"],
                      ["back", "ZT"],
                      ["right", "ZT"],
                      ["left", "ZT"],
                      ["top", "ZT"],
                      ["bottom", "ZT"],
                    ].map(([face, label]) => (
                      <div key={face} className={`hero-cube-face ${face}`}>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-gradient-accent">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Orbit rings */}
                <div className="hero-ring ring-x" />
                <div className="hero-ring ring-y" />
                <div className="hero-ring ring-z" />

                {/* Floating geometric planes at depth */}
                <div className="hero-float">
                  <div className="hero-plane p1" />
                </div>
                <div className="hero-float">
                  <div className="hero-plane p2" />
                </div>
                <div className="hero-float">
                  <div className="hero-plane p3" />
                </div>

                {/* Orbiting accent dots */}
                {satellites.map((s, i) => (
                  <span
                    key={i}
                    className="hero-satellite hero-float"
                    style={{ top: s.top, left: s.left, animationDelay: s.delay }}
                  />
                ))}

                {/* Subtle stack caption */}
                <div className="hero-float absolute bottom-[-8px] left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-mono tracking-[0.25em] text-fg-dim uppercase">
                    React · Node.js · SQL · MongoDB
                  </span>
                </div>
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
