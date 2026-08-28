"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee({
  text = "DIGITAL EXPERIENCES",
  speed = 1,
  direction = "left",
  className = "",
}: {
  text?: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;

    const totalWidth = innerRef.current.scrollWidth / 2;

    gsap.set(innerRef.current, {
      x: direction === "left" ? 0 : -totalWidth,
    });

    const tween = gsap.to(innerRef.current, {
      x: direction === "left" ? -totalWidth : 0,
      duration: totalWidth / (50 * speed),
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [speed, direction]);

  const repeatedText = `${text}\u00B7 ${text}\u00B7 ${text}\u00B7 ${text}\u00B7 `;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <div ref={innerRef} className="inline-flex">
        <span className="text-[clamp(3rem,8vw,8rem)] font-light tracking-tight text-fg-dim opacity-15 pr-1">
          {repeatedText}
        </span>
        <span className="text-[clamp(3rem,8vw,8rem)] font-light tracking-tight text-fg-dim opacity-15 pr-1">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
