"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null);

  const downloadResume = async () => {
    try {
      const res = await fetch("/resume.pdf");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Zuneera_Tariq_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open("/resume.pdf", "_blank");
    }
  };

  useEffect(() => {
    const el = leftRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="about" className="section section-padding">
      <div className="section-inner">
        <div className="section-eyebrow">Who I am</div>
        <h2 className="section-title">About Me</h2>

        <div ref={leftRef} className="mt-12 max-w-3xl flex flex-col">
            <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light">
              I&apos;m Zuneera Tariq, a CS student at COMSATS University
              Islamabad (Abbottabad Campus) who builds full-stack products:
              React and Node.js on the surface, solid database and system
              design underneath.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light mt-6">
              I&apos;ve shipped real systems from planning to production,
              including a College Management System and Skill Link, a
              verified service provider hiring platform. I sweat the details
              most people skip, and I care how things work when nobody is
              watching.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-fg-muted font-light mt-6">
              Right now I&apos;m growing as a full-stack developer and looking
              for jobs where I can add real value.
            </p>

            <button
              type="button"
              onClick={downloadResume}
              className="btn btn-secondary group mt-10 w-fit mb-8!"
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
            </button>
          </div>
      </div>
    </section>
  );
}
