"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GenerativeGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    let time = 0;
    const animate = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const cols = 20;
      const rows = 12;
      const cellW = w / cols;
      const cellH = h / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellW;
          const y = j * cellH;
          const dist = Math.sqrt(
            Math.pow(i - cols / 2, 2) + Math.pow(j - rows / 2, 2)
          );
          const size =
            Math.sin(dist * 0.3 - time * 0.02) * 0.4 + 0.5;
          const opacity = size * 0.6;

          ctx.fillStyle = `rgba(204, 255, 0, ${opacity})`;
          ctx.beginPath();
          ctx.arc(
            x + cellW / 2,
            y + cellH / 2,
            size * Math.min(cellW, cellH) * 0.3,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      time++;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}

function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const pointsRef = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointsRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        age: 0,
      });
      if (pointsRef.current.length > 50) {
        pointsRef.current.shift();
      }
    };

    canvas.addEventListener("mousemove", handleMove);

    const animate = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const pts = pointsRef.current;
      for (let i = 0; i < pts.length; i++) {
        pts[i].age++;
        const alpha = Math.max(0, 1 - pts[i].age / 60);
        const size = alpha * 4;

        ctx.fillStyle = `rgba(204, 255, 0, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Remove dead points
      pointsRef.current = pts.filter((p) => p.age < 60);

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}

function TypographyWarp() {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    setOffset(x * 30);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const text = "EXPERIMENT";
  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="flex">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="text-4xl md:text-6xl font-light tracking-tighter text-fg transition-transform duration-200"
            style={{
              transform: `translateY(${Math.sin((i / text.length) * Math.PI * 2 + offset * 0.1) * 20}px)`,
              opacity: 0.4 + Math.abs(Math.sin((i / text.length) * Math.PI * 2 + offset * 0.1)) * 0.6,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

const experiments = [
  {
    title: "Generative Grid",
    description: "Real-time procedural pattern generation using canvas",
    component: GenerativeGrid,
  },
  {
    title: "Cursor Trail",
    description: "Interactive cursor visualization with particle physics",
    component: CursorTrail,
  },
  {
    title: "Type Warp",
    description: "Mouse-driven typographic distortion experiment",
    component: TypographyWarp,
  },
];

export default function Lab() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const experimentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    experimentRefs.current.forEach((exp) => {
      if (!exp) return;
      gsap.fromTo(
        exp,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: exp,
            start: "top 80%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="section-padding py-32 md:py-48"
    >
      <div className="mb-16 md:mb-24">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim">
          004 — Lab
        </span>
        <h2 className="text-[clamp(2rem,4vw,4.5rem)] leading-[1.1] tracking-[-0.03em] font-light mt-8">
          Things I build when
          <br />
          <span className="text-gradient-accent">nobody&apos;s paying me.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {experiments.map((exp, i) => (
          <div
            key={exp.title}
            ref={(el) => { experimentRefs.current[i] = el; }}
            className="group"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bg-muted border border-border hover:border-accent/30 transition-colors duration-500">
              <exp.component />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-light">{exp.title}</h3>
              <p className="text-sm text-fg-dim font-light mt-1">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
