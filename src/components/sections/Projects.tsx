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
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden border border-border hover:border-[var(--color-accent)]/40 transition-colors duration-300 rounded-sm"
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full opacity-40"
        style={{ background: project.color }}
      />

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
              Project {project.number}
            </div>
            <h3 className="mt-2 text-2xl md:text-3xl font-light tracking-tight group-hover:text-[var(--color-accent)] transition-colors duration-300">
              {project.title}
            </h3>
            <div className="text-sm text-fg-muted mt-1 font-light">
              {project.subtitle}
            </div>
          </div>
          <div className="text-[10px] font-mono tracking-[0.2em] text-fg-dim whitespace-nowrap">
            {project.year}
          </div>
        </div>

        <p className="mt-4 text-sm text-fg-muted font-light leading-relaxed">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono tracking-wider uppercase px-2 py-1 border border-border text-fg-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
          {project.role}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section-padding py-16 md:py-24">
      <div className="mb-10 md:mb-12">
        <div className="section-eyebrow mb-4">Selected Work</div>
        <h2 className="section-title">Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.number} project={project} />
        ))}
      </div>
    </section>
  );
}
