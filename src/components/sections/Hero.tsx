"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.23v3.3c0 .32.22.7.82.57A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 3h21c.83 0 1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5h-21A1.5 1.5 0 0 1 0 19.5v-15C0 3.67.67 3 1.5 3zm10.5 9.6 9-6.05-1-.6L12 11.6 4.5 5.95l-1 .6 9 6.05zM2 5.1V19h20V5.1l-10 6.7L2 5.1z" />
    </svg>
  );
}

export default function Hero() {
  const badge = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLDivElement>(null);
  const role = useRef<HTMLDivElement>(null);
  const desc = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const connect = useRef<HTMLDivElement>(null);
  const stats = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = [badge, name, role, desc, actions, connect, stats];
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

        <div ref={name} className="mt-12 opacity-0">
          <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] leading-[1.05] font-medium tracking-tight">
            Zuneera{" "}
            <span className="text-gradient-accent">Tariq</span>
          </h1>
        </div>

        <div ref={role} className="mt-9 opacity-0">
          <p className="text-[clamp(1.1rem,2vw,1.5rem)] font-mono text-fg-muted">
            CS Student @ COMSATS University — Full-Stack Developer in the making
          </p>
        </div>

        <div ref={desc} className="mt-9 opacity-0">
          <p className="text-base md:text-lg font-light text-fg-muted max-w-xl leading-relaxed">
            I build clean, secure, full-stack web applications with React, Node.js
            and databases. Based in Mansehra, Pakistan — turning ideas into
            polished, real-world systems one project at a time.
          </p>
        </div>

        <div ref={actions} className="mt-14 flex flex-wrap gap-4 opacity-0">
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

        <div ref={connect} className="mt-16 opacity-0">
          <div className="flex items-center gap-4 border-t border-border pt-8">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-fg-dim">
              Connect
            </span>
            <span className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/zuneera-tariq-a4b5012b5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-fg-muted hover:text-black hover:bg-accent hover:border-accent transition-colors duration-300"
                data-cursor="OPEN"
              >
                <LinkedInIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://github.com/Zuneera134"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-fg-muted hover:text-black hover:bg-accent hover:border-accent transition-colors duration-300"
                data-cursor="OPEN"
              >
                <GitHubIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="mailto:zuratariq8@gmail.com"
                aria-label="Email"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-fg-muted hover:text-black hover:bg-accent hover:border-accent transition-colors duration-300"
                data-cursor="OPEN"
              >
                <MailIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>
        </div>

        <div ref={stats} className="mt-16 flex flex-wrap gap-x-12 gap-y-6 opacity-0">
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
