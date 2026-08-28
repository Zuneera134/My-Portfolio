"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    role: "Full Stack Developer Intern",
    company: "Hayat Dev",
    period: "4-month internship",
    description:
      "Worked on a complete College Management System, covering planning, developing, and delivering a real-world full-stack application with 8 role-based portals. Gained practical experience in React, Node.js, Express, and MySQL.",
  },
];

const education = [
  {
    school: "COMSATS University Islamabad, Abbottabad Campus",
    degree: "Bachelor of Science, Computer Science",
    period: "2024 – Present",
    grade: "Grade: A",
  },
  {
    school: "The Peace Schools and Colleges",
    degree: "Intermediate / Secondary Education",
    period: "Completed",
    grade: "Grade: A1 (1066/1100, 97%)",
    highlight: "Top 20 Board Position Holder for outstanding academic performance",
  },
];

const certifications = [
  {
    title: "Web Development Fundamentals",
    issuer: "IBM",
    year: "2026",
    description: "Foundations of web development: HTML, CSS & JavaScript.",
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

function useAnimate(refs: React.MutableRefObject<(HTMLDivElement | null)[]>) {
  useEffect(() => {
    const tweens = refs.current
      .filter((el): el is HTMLDivElement => !!el)
      .map((el) =>
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        )
      );
    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, [refs]);
}

function Experience() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useAnimate(refs);

  return (
    <div id="experience" className="scroll-mt-24">
      <div className="section-eyebrow">Where I&apos;ve worked</div>
      <h2 className="section-title">Experience</h2>
      <div className="mt-8 flex flex-col gap-6">
        <div ref={(el) => { refs.current[0] = el; }} className="card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h3 className="font-display text-xl md:text-2xl font-medium">{experience[0].role}</h3>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg-dim">
              {experience[0].period}
            </span>
          </div>
          <div className="text-accent text-sm mt-1">{experience[0].company}</div>
          <p className="text-fg-muted font-light mt-4 leading-relaxed">
            {experience[0].description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Education() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useAnimate(refs);

  return (
    <div id="education" className="scroll-mt-24">
      <div className="section-eyebrow">My academic background</div>
      <h2 className="section-title">Education</h2>
      <div className="mt-8 flex flex-col gap-6">
        {education.map((edu, i) => (
          <div
            key={edu.school}
            ref={(el) => { refs.current[i] = el; }}
            className="card"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <h3 className="font-display text-lg md:text-xl font-medium">{edu.school}</h3>
              <span className="text-fg-dim text-[10px] font-mono tracking-[0.2em] whitespace-nowrap">
                {edu.period}
              </span>
            </div>
            <div className="text-fg-muted mt-1 font-light">{edu.degree}</div>
            <div className="text-accent text-sm mt-2">{edu.grade}</div>
            {edu.highlight && (
              <div className="text-fg-muted text-sm font-light mt-3 italic">
                {edu.highlight}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Certifications() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useAnimate(refs);

  return (
    <div id="certifications" className="scroll-mt-24">
      <div className="section-eyebrow">Continuous learning</div>
      <h2 className="section-title">Certifications</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <div
            key={cert.title}
            ref={(el) => { refs.current[i] = el; }}
            className="card flex flex-col"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-base font-semibold text-accent">{cert.issuer}</span>
              <span className="text-fg-dim text-xs font-mono mt-1">{cert.year}</span>
            </div>
            <h3 className="font-display text-xl font-medium mt-3">{cert.title}</h3>
            <p className="text-fg-muted text-sm font-light mt-2">
              {cert.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <div id="journey" className="section section-padding">
      <div className="section-inner">
        <div className="flex flex-col gap-16">
          <Experience />
          <Education />
          <Certifications />
        </div>
      </div>
    </div>
  );
}
