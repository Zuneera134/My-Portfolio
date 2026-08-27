"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "zuratariq8@gmail.com";
const LINKS = [
  {
    name: "LinkedIn",
    handle: "@zuneera-tariq",
    href: "https://www.linkedin.com/in/zuneera-tariq-a4b5012b5",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    handle: "@Zuneera134",
    href: "https://github.com/Zuneera134",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.23v3.3c0 .32.22.7.82.57A12 12 0 0 0 12 .3z" />
      </svg>
    ),
  },
  {
    name: "Gmail",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 3h21c.83 0 1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5h-21A1.5 1.5 0 0 1 0 19.5v-15C0 3.67.67 3 1.5 3zm10.5 9.6 9-6.05-1-.6L12 11.6 4.5 5.95l-1 .6 9 6.05zM2 5.1V19h20V5.1l-10 6.7L2 5.1z" />
      </svg>
    ),
  },
];

export default function Connect() {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current.forEach((item) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 92%" },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="connect" className="section section-padding">
      <div className="section-inner">
        <div className="section-eyebrow">Let&apos;s connect</div>
        <h2 className="section-title">Connect with Me</h2>
        <p className="section-sub">
          Reach out on your favorite platform and I&apos;d love to hear from you.
        </p>

        <div className="mt-12 flex flex-col md:flex-row gap-4 md:gap-5">
          {LINKS.map((link, i) => (
            <a
              key={link.name}
              ref={(el) => { itemRefs.current[i] = el; }}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="card group flex-1 flex items-center gap-4 hover:border-accent hover:bg-accent/5 transition-colors"
              data-cursor="OPEN"
            >
              <span className="w-12 h-12 shrink-0 rounded-full border border-border group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center text-fg-muted group-hover:text-accent transition-colors">
                <span className="w-5 h-5">{link.icon}</span>
              </span>
              <span className="flex flex-col">
                <span className="text-base font-semibold text-fg">
                  {link.name}
                </span>
                <span className="text-sm font-light text-fg-muted break-all">
                  {link.handle}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
