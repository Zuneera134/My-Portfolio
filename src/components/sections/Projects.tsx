"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }: { project: { number: string; title: string; subtitle: string; description: string; tech: string[]; role: string; year: string; color: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="card group relative flex flex-col overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] group-hover:h-full group-hover:opacity-[0.04] transition-all duration-500"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
          Project {project.number}
        </div>
        <div className="text-[10px] font-mono tracking-[0.2em] text-fg-dim whitespace-nowrap">
          {project.year}
        </div>
      </div>

      <h3 className="mt-5 font-display text-2xl md:text-[1.75rem] leading-snug font-medium group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <div className="text-sm text-fg-muted mt-1.5 font-light">{project.subtitle}</div>

      <p className="mt-4 text-sm text-fg-muted font-light leading-relaxed">
        {project.description}
      </p>

      {/* Role / company — separated from tech stack */}
      <div className="mt-6 pt-5 border-t border-border flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
        <span className="text-[11px] font-mono tracking-[0.15em] uppercase text-fg">
          {project.role}
        </span>
      </div>

      {/* Tech stack */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full border border-border bg-bg-muted text-fg-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section section-padding">
      <div className="section-inner">
        <div className="section-eyebrow">Selected Work</div>
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">
          A selection of real systems I have designed, built and shipped during
          my CS studies and internship.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
