"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
gsap.registerPlugin(ScrollTrigger);

function useReveal<T extends HTMLElement>(start = "top 88%") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [start]);
  return ref;
}

type CardProject = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  role: string;
  year: string;
  color: string;
  link: string;
  impact?: string[];
};

function ProjectCard({ project }: { project: CardProject }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="card group relative flex flex-col overflow-hidden hover:border-t-accent transition-colors"
    >
      <div className="flex-1 flex flex-col p-6">
        <div className="text-[11px] font-mono tracking-wider text-fg-dim">
          {project.year}
        </div>

        <h3 className="mt-3 font-display text-xl md:text-2xl leading-tight font-medium group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="mt-3 text-sm text-fg-muted font-light leading-relaxed">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-md border border-border bg-bg-muted text-fg-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.1em] uppercase text-accent hover:underline"
            data-cursor=""
          >
            View on GitHub →
          </a>
        </div>
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

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
