"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "Frontend",
    items: ["React.js", "Responsive Design", "UI Development"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Authentication"],
  },
  {
    category: "Databases",
    items: ["MySQL", "MongoDB", "Database Design"],
  },
  {
    category: "Concepts",
    items: ["Data Structures", "OOP", "Problem Solving", "Git & GitHub"],
  },
];

export default function Skills() {
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    groupRefs.current.forEach((group) => {
      if (!group) return;
      gsap.fromTo(
        group,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 88%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="skills" className="section section-padding">
      <div className="section-inner">
        <div className="section-eyebrow">What I work with</div>
        <h2 className="section-title">Skills</h2>
        <p className="section-sub">
          The technologies and concepts powering the products I build.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              ref={(el) => { groupRefs.current[i] = el; }}
              className="card"
            >
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-accent">
                {group.category}
              </div>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-fg font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-70 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
