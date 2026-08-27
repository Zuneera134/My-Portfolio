"use client";

import { useRef, useEffect } from "react";

export default function ProjectVisual({
  number,
  color,
  className = "",
}: {
  number: string;
  color: string;
  className?: string;
}) {
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
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const animate = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      // Subtle gradient background
      const grad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.7
      );
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.08)`);
      grad.addColorStop(1, "rgba(10, 10, 10, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Floating geometric shapes
      for (let i = 0; i < 5; i++) {
        const x = w * 0.5 + Math.cos(time * 0.005 + i * 1.2) * w * 0.25;
        const y = h * 0.5 + Math.sin(time * 0.008 + i * 0.9) * h * 0.2;
        const size = 30 + Math.sin(time * 0.01 + i) * 15;
        const opacity = 0.06 + Math.sin(time * 0.015 + i * 2) * 0.03;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (i % 3 === 0) {
          ctx.arc(x, y, size, 0, Math.PI * 2);
        } else if (i % 3 === 1) {
          ctx.rect(x - size / 2, y - size / 2, size, size);
        } else {
          ctx.moveTo(x, y - size);
          ctx.lineTo(x + size, y + size);
          ctx.lineTo(x - size, y + size);
          ctx.closePath();
        }
        ctx.stroke();
      }

      // Grid lines
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.03)`;
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        const offset = Math.sin(time * 0.003 + x * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        const offset = Math.cos(time * 0.003 + y * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(w, y + offset);
        ctx.stroke();
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
  }, [color]);

  return (
    <div className={`relative overflow-hidden bg-bg-muted ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[clamp(4rem,12vw,14rem)] font-light tracking-tighter text-fg opacity-[0.06] select-none">
          {number}
        </span>
      </div>
    </div>
  );
}
