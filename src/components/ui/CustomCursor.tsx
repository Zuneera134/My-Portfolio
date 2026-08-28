"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

function useCursorAnimation() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const isHoveringRef = useRef(false);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    if (isMobile) return;

    function tick() {
      const lerpFactor = isHoveringRef.current ? 0.15 : 0.1;
      posRef.current.x +=
        (targetRef.current.x - posRef.current.x) * lerpFactor;
      posRef.current.y +=
        (targetRef.current.y - posRef.current.y) * lerpFactor;

      if (cursorDotRef.current) {
        gsap.set(cursorDotRef.current, {
          x: posRef.current.x,
          y: posRef.current.y,
        });
      }
      if (cursorRingRef.current) {
        gsap.set(cursorRingRef.current, {
          x: posRef.current.x,
          y: posRef.current.y,
        });
      }
      if (cursorTextRef.current) {
        gsap.set(cursorTextRef.current, {
          x: posRef.current.x,
          y: posRef.current.y,
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleMouseEnterInteractive = () => {
      isHoveringRef.current = true;
      setLabel("");
      gsap.to(cursorDotRef.current, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorRingRef.current, {
        scale: 2.5,
        borderColor: "var(--color-accent)",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(cursorTextRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeaveInteractive = () => {
      isHoveringRef.current = false;
      setLabel("");
      gsap.to(cursorDotRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorRingRef.current, {
        scale: 1,
        borderColor: "var(--color-fg-dim)",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(cursorTextRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    const setupInteractiveElements = () => {
      const interactives = document.querySelectorAll("[data-cursor]");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };

    setupInteractiveElements();

    const observer = new MutationObserver(() => {
      setupInteractiveElements();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return { cursorDotRef, cursorTextRef, cursorRingRef, label };
}

export default function CustomCursor() {
  const { cursorDotRef, cursorTextRef, cursorRingRef, label } =
    useCursorAnimation();

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-fg mix-blend-difference"
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-fg-dim mix-blend-difference flex items-center justify-center"
      />
      <div
        ref={cursorTextRef}
        className={cn(
          "fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2",
          "text-[10px] font-mono tracking-widest uppercase text-bg",
          "opacity-0 scale-90 pointer-events-none",
          "font-semibold"
        )}
      >
        {label}
      </div>
    </div>
  );
}
