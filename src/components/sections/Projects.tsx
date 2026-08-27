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
      <div className="flex items-center justify-between gap-4">
        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
          Project {project.number}
        </div>
        <div className="text-[10px] font-mono tracking-[0.2em] text-fg-dim whitespace-nowrap">
          {project.year}
        </div>
      </div>

      <h3 className="mt-4 font-display text-2xl md:text-[1.75rem] leading-snug font-medium group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <div className="text-sm text-fg-muted mt-1 font-light">{project.subtitle}</div>

      <p className="mt-4 text-sm text-fg-muted font-light leading-relaxed">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border border-border text-fg-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
        {project.role}
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
