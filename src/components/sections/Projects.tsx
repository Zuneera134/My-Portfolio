"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import ProjectVisual from "@/components/projects/ProjectVisual";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const layouts = [
    "layout-full",
    "layout-split",
    "layout-editorial",
    "layout-float",
  ];
  const layout = layouts[index % layouts.length];

  useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Image scale reveal
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 1.2, clipPath: "inset(20% 20% 20% 20%)" },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.out",
        }
      );
    }

    // Number slide
    if (numberRef.current) {
      tl.fromTo(
        numberRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.9"
      );
    }

    // Title reveal
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }

    // Meta reveal
    if (metaRef.current) {
      tl.fromTo(
        metaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    }

    // Parallax on scroll
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  if (layout === "layout-full") {
    return (
      <div
        ref={cardRef}
        className="min-h-screen flex flex-col justify-center py-16 md:py-24"
        data-cursor="VIEW"
      >
        <div className="relative">
          {/* Number */}
          <div
            ref={numberRef}
            className="absolute -top-8 md:-top-4 -left-2 md:left-0 text-[120px] md:text-[200px] font-light leading-none text-fg-dim opacity-10 select-none"
          >
            {project.number}
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm"
          >
            <ProjectVisual
              number={project.number}
              color={project.color}
              className="w-full h-full"
            />
          </div>

          {/* Title & Meta */}
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div
                ref={titleRef}
                className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight"
              >
                {project.title}
              </div>
              <div className="text-sm text-fg-muted mt-2 font-light">
                {project.subtitle}
              </div>
            </div>
            <div ref={metaRef} className="flex flex-col gap-1 text-right">
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
                {project.role}
              </div>
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
                {project.year}
              </div>
              <div className="flex gap-2 justify-end mt-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-mono tracking-wider uppercase px-2 py-1 border border-border rounded-sm text-fg-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "layout-split") {
    return (
      <div
        ref={cardRef}
        className="min-h-screen flex items-center py-16 md:py-24"
        data-cursor="VIEW"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Number + Title */}
          <div>
            <div
              ref={numberRef}
              className="text-[100px] md:text-[180px] font-light leading-none text-fg-dim opacity-15 select-none"
            >
              {project.number}
            </div>
            <div ref={titleRef}>
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mt-4">
                {project.title}
              </h3>
              <p className="text-fg-muted mt-4 text-lg font-light max-w-md">
                {project.description}
              </p>
            </div>
            <div ref={metaRef} className="mt-8 flex flex-col gap-2">
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
                {project.role} — {project.year}
              </div>
              <div className="flex gap-2 mt-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-mono tracking-wider uppercase px-2 py-1 border border-border rounded-sm text-fg-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
          >
            <ProjectVisual
              number={project.number}
              color={project.color}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    );
  }

  if (layout === "layout-editorial") {
    return (
      <div
        ref={cardRef}
        className="min-h-screen flex items-center py-16 md:py-24"
        data-cursor="VIEW"
      >
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Number — offset */}
            <div className="md:col-span-2">
              <div
                ref={numberRef}
                className="text-[80px] md:text-[140px] font-light leading-none text-fg-dim opacity-15 select-none"
              >
                {project.number}
              </div>
            </div>

            {/* Image — centered */}
            <div className="md:col-span-6">
              <div
                ref={imageRef}
                className="relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                <ProjectVisual
                  number={project.number}
                  color={project.color}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Info — right column */}
            <div className="md:col-span-4 md:pt-32">
              <div ref={titleRef}>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
                  {project.title}
                </h3>
                <p className="text-fg-muted mt-4 text-base font-light leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div ref={metaRef} className="mt-8 flex flex-col gap-2">
                <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
                  {project.role}
                </div>
                <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
                  {project.year}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono tracking-wider uppercase px-2 py-1 border border-border rounded-sm text-fg-dim"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // layout-float
  return (
    <div
      ref={cardRef}
      className="min-h-screen flex items-center py-16 md:py-24"
      data-cursor="VIEW"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 md:col-start-1">
          <div
            ref={imageRef}
            className="relative aspect-[16/10] overflow-hidden rounded-sm"
          >
            <ProjectVisual
              number={project.number}
              color={project.color}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="md:col-span-4 md:col-start-9 flex flex-col justify-center">
          <div
            ref={numberRef}
            className="text-[60px] md:text-[100px] font-light leading-none text-fg-dim opacity-15 select-none"
          >
            {project.number}
          </div>
          <div ref={titleRef}>
            <h3 className="text-3xl md:text-4xl font-light tracking-tight mt-2">
              {project.title}
            </h3>
            <p className="text-fg-muted mt-3 text-sm font-light leading-relaxed">
              {project.description}
            </p>
          </div>
          <div ref={metaRef} className="mt-6 flex flex-col gap-1">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
              {project.role} — {project.year}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-mono tracking-wider uppercase px-2 py-1 border border-border rounded-sm text-fg-dim"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section-padding py-16 md:py-24">
      <div className="mb-16 md:mb-24">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim">
          002 — Selected Work
        </span>
      </div>
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
