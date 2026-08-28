"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Development",
    tagline: "Full-stack, production-grade builds",
    description:
      "Clean, secure, scalable full-stack web apps with React, Next.js, Node and SQL/NoSQL databases.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "UI / UX Designing",
    tagline: "Interfaces that feel intentional",
    description:
      "Responsive, accessible interfaces with thoughtful layout, typography and motion.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Backend & APIs",
    tagline: "Logic that scales safely",
    description:
      "REST APIs, database schemas and role-based access built for reliability and performance.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
];

export default function Services() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tweens = cardRefs.current
      .filter((card): card is HTMLDivElement => !!card)
      .map((card) =>
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
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
  }, []);

  return (
    <section id="services" className="section section-padding">
      <div className="section-inner">
        <div className="section-eyebrow">What I offer</div>
        <h2 className="section-title">Services</h2>
        <p className="section-sub">
          The things I can build for you — from idea to deployed, polished
          product.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="card group relative flex flex-col overflow-hidden"
            >
              <div className="text-accent mb-5">{service.icon}</div>
              <h3 className="font-display text-xl leading-tight font-medium">
                {service.title}
              </h3>
              <div className="mt-1 text-[11px] font-mono tracking-[0.15em] uppercase text-fg-dim">
                {service.tagline}
              </div>
              <p className="mt-4 text-sm text-fg-muted font-light leading-relaxed">
                {service.description}
              </p>
              <div className="mt-auto pt-6">
                <button
                  onClick={() => scrollToSection("#connect")}
                  className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.1em] uppercase text-accent hover:underline"
                  data-cursor="GO"
                >
                  Start a project →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
