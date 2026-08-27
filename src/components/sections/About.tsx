"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="about" className="section section-padding">
      <div className="section-inner">
        <div className="section-eyebrow">Who I am</div>
        <h2 className="section-title">About Me</h2>

        <div ref={leftRef} className="mt-12 max-w-3xl flex flex-col">
            <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light">
              I am Zuneera Tariq, a Computer Science undergraduate at COMSATS
              University Islamabad, Abbottabad Campus. I focus on building
              reliable, secure, and thoughtfully designed software across the
              full stack.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light mt-6">
              My work spans front-end development with React, back-end systems
              with Node.js and Express, and database design with MySQL and
              MongoDB. I care about clean architecture, clear code, and the
              small details that make a product feel professional.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light mt-6">
              I am currently exploring new technologies and building real-world
              projects to grow as a developer, based in Mansehra, Pakistan.
            </p>

            <a
              href="/resume.html"
              className="btn btn-secondary group mt-10 w-fit"
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
      </div>
    </section>
  );
}
