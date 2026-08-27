"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const bgGradientRef = useRef<HTMLDivElement>(null);
  const mouseFollowerRef = useRef<HTMLDivElement>(null);

  const animateMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Parallax on text lines
      const lines = [nameRef, line1Ref, line2Ref, line3Ref, line4Ref];
      lines.forEach((lineRef, i) => {
        if (!lineRef.current) return;
        const depth = (i + 1) * 2.5;
        gsap.to(lineRef.current, {
          x: x * depth * 12,
          y: y * depth * 4,
          duration: 1,
          ease: "power2.out",
        });
      });

      // Subtle gradient follow
      if (bgGradientRef.current) {
        gsap.to(bgGradientRef.current, {
          x: x * 100,
          y: y * 100,
          duration: 1.5,
          ease: "power2.out",
        });
      }

      // Mouse follower glow
      if (mouseFollowerRef.current) {
        gsap.to(mouseFollowerRef.current, {
          left: e.clientX,
          top: e.clientY,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    },
    []
  );

  useEffect(() => {
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    if (!isMobile) {
      window.addEventListener("mousemove", animateMouseMove);
    }

    // Entry animation
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      nameRef.current,
      { y: 80, opacity: 0, skewY: 3 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.4, ease: "power4.out" }
    )
      .fromTo(
        line1Ref.current,
        { y: 100, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power4.out" },
        "-=0.8"
      )
      .fromTo(
        line2Ref.current,
        { y: 100, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power4.out" },
        "-=0.9"
      )
      .fromTo(
        line3Ref.current,
        { y: 100, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power4.out" },
        "-=0.9"
      )
      .fromTo(
        line4Ref.current,
        { y: 100, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power4.out" },
        "-=0.9"
      )
      .fromTo(
        metaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

    // Scroll indicator pulse
    gsap.to(scrollIndicatorRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    });

    return () => {
      window.removeEventListener("mousemove", animateMouseMove);
      tl.kill();
    };
  }, [animateMouseMove]);

  const handleEnterWork = () => {
    const el = document.querySelector("#work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden"
    >
      {/* Background glow */}
      <div
        ref={bgGradientRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      {/* Mouse follower */}
      <div
        ref={mouseFollowerRef}
        className="hidden md:block fixed w-64 h-64 rounded-full pointer-events-none opacity-[0.04] -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)",
        }}
      />

      {/* Hero Typography */}
      <div className="relative z-10 max-w-[95vw]">
        {/* Giant Name */}
        <div className="overflow-hidden mb-2 md:mb-4">
          <div
            ref={nameRef}
            className="text-[clamp(3.5rem,12vw,14rem)] leading-[0.85] font-medium tracking-[-0.05em]"
          >
            Zuneera
          </div>
        </div>
        <div className="overflow-hidden mb-6 md:mb-8">
          <div
            className="text-[clamp(3.5rem,12vw,14rem)] leading-[0.85] font-light tracking-[-0.05em] text-gradient-accent"
          >
            Tariq
          </div>
        </div>

        {/* Statement */}
        <div className="mt-8 md:mt-12 space-y-2">
          <div className="overflow-hidden">
            <div
              ref={line1Ref}
              className="text-[clamp(1.4rem,3.5vw,3.5rem)] leading-[1.2] font-light tracking-[-0.02em] text-fg"
            >
              Building digital
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              ref={line2Ref}
              className="text-[clamp(1.4rem,3.5vw,3.5rem)] leading-[1.2] font-light tracking-[-0.02em] text-fg"
            >
              experiences that
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              ref={line3Ref}
              className="text-[clamp(1.4rem,3.5vw,3.5rem)] leading-[1.2] font-light tracking-[-0.02em] text-fg"
            >
              shouldn&apos;t feel
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              ref={line4Ref}
              className="text-[clamp(1.4rem,3.5vw,3.5rem)] leading-[1.2] font-light tracking-[-0.02em]"
            >
              ordinary.
            </div>
          </div>
        </div>
      </div>

      {/* Meta info */}
      <div
        ref={metaRef}
        className="relative z-10 mt-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div className="flex flex-col gap-4">
          <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim">
            CS Student @ CUI &apos;28 — Mansehra, Pakistan
          </div>
          <button
            onClick={handleEnterWork}
            className="group inline-flex items-center gap-4 text-sm font-mono tracking-[0.15em] uppercase text-fg hover:text-accent transition-colors duration-300 w-fit"
            data-cursor="SCROLL"
          >
            <span className="relative">
              Enter the work
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </span>
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
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>

          <div className="flex flex-wrap gap-4 md:mt-2">
            <a
              href="https://www.linkedin.com/in/zuneera-tariq-a4b5012b5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 border border-border hover:border-accent hover:bg-accent hover:text-black transition-colors duration-300 text-sm font-light"
              data-cursor="HIRE"
            >
              Hire Me
            </a>
            <a
              href="mailto:zuratariq8@gmail.com"
              className="inline-flex items-center gap-3 px-6 py-3 border border-border hover:border-accent transition-colors duration-300 text-sm font-light"
              data-cursor="EMAIL"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <div className="text-[9px] font-mono tracking-[0.4em] uppercase text-fg-dim">
          Scroll
        </div>
        <div className="w-[1px] h-8 bg-gradient-to-b from-fg-dim to-transparent" />
      </div>
    </section>
  );
}
