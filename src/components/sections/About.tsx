"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const personalStats = [
  { value: "01", label: "BSCS Student" },
  { value: "02", label: "Years + Coding" },
  { value: "07", label: "Projects Built" },
];

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [leftRef, rightRef].forEach((ref) => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="about" className="section section-padding">
      <div className="section-inner">
        <div className="section-eyebrow">Who I am</div>
        <h2 className="section-title">About Me</h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div ref={leftRef} className="flex flex-col justify-center">
            <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light">
              Hi, I&apos;m <span className="text-fg font-medium">Zuneera Tariq</span> — a
              Computer Science undergraduate at COMSATS University Islamabad
              (Abbottabad), passionate about building things that feel
              intentional and work reliably.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light mt-5">
              I care about clean architecture, secure systems, and the small
              details that turn good ideas into polished products. When I&apos;m
              not writing code, I&apos;m learning something new, documenting my
              journey, or enjoying a cup of coffee in Mansehra, Pakistan.
            </p>

            <a
              href="/resume.html"
              className="btn btn-secondary group mt-8 w-fit"
              data-cursor="RESUME"
            >
              Download Resume
              <svg
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                />
              </svg>
            </a>
          </div>

          <div
            ref={rightRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 content-center"
          >
            {personalStats.map((stat) => (
              <div key={stat.label} className="card flex flex-col gap-2">
                <span className="font-display text-4xl text-accent">
                  {stat.value}
                </span>
                <span className="text-sm text-fg-muted font-light">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
