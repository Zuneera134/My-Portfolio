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
  const sectionRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    groupRefs.current.forEach((group) => {
      if (!group) return;
      gsap.fromTo(
        group,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
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
    <section id="skills" ref={sectionRef} className="section-padding py-16 md:py-24">
      <div className="mb-8">
        <div className="section-eyebrow mb-4">What I work with</div>
        <h2 className="section-title">Skills</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {skillGroups.map((group, i) => (
          <div key={group.category} ref={(el) => { groupRefs.current[i] = el; }}>
            <div className="text-sm font-mono tracking-[0.2em] uppercase text-fg-dim mb-5">
              {group.category}
            </div>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-lg md:text-xl font-light text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
