"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: "Web Development Fundamentals",
    issuer: "IBM",
    year: "2026",
    description: "Foundations of web development — HTML, CSS & JavaScript.",
  },
  {
    title: "Data Science & Analytics",
    issuer: "HP LIFE",
    year: "2026",
    description: "Core concepts in data science and analytics.",
  },
  {
    title: "Google Business Intelligence",
    issuer: "Google",
    year: "2023",
    description: "Business intelligence foundations from Google.",
  },
];

const experience = [
  {
    role: "Full Stack Developer Intern",
    company: "Hayat Dev",
    period: "4-month internship",
    description:
      "Worked on a complete College Management System — planning, developing, and delivering a real-world full-stack application with 8 role-based portals.",
  },
];

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const certRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    certRefs.current.forEach((cert) => {
      if (!cert) return;
      gsap.fromTo(
        cert,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cert,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="section-padding py-32 md:py-48">
      <div className="mb-16 md:mb-24">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim">
          004 — Journey
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Experience */}
        <div>
          <h2 className="text-[clamp(1.8rem,3vw,3rem)] leading-tight tracking-[-0.02em] font-light mb-10">
            Experience
          </h2>
          <div className="border-l-2 border-border pl-8 relative">
            <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-accent" />
            <div className="mb-10">
              <div className="text-fg-dim text-[10px] font-mono tracking-[0.2em] uppercase mb-2">
                {experience[0].period}
              </div>
              <h3 className="text-2xl font-light">{experience[0].role}</h3>
              <div className="text-accent text-sm mt-1">
                {experience[0].company}
              </div>
              <p className="text-fg-muted font-light mt-4 leading-relaxed">
                {experience[0].description}
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-[clamp(1.8rem,3vw,3rem)] leading-tight tracking-[-0.02em] font-light mb-10">
            Certifications
          </h2>
          <div className="flex flex-col gap-6">
            {certifications.map((cert, i) => (
              <div
                key={cert.title}
                ref={(el) => { certRefs.current[i] = el; }}
                className="group border border-border hover:border-accent/40 rounded-sm p-6 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-light">{cert.title}</h3>
                    <div className="text-accent text-sm mt-1">
                      {cert.issuer}
                    </div>
                  </div>
                  <div className="text-fg-dim text-[10px] font-mono tracking-[0.2em] whitespace-nowrap">
                    {cert.year}
                  </div>
                </div>
                <p className="text-fg-muted text-sm font-light mt-3">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
