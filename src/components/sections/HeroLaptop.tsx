"use client";

import { useEffect, useState } from "react";
import type { ReactElement } from "react";

const TYPED = "currently working on Personal AI Agent";

export default function HeroLaptop() {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n < TYPED.length) {
      const t = setTimeout(() => setN((c) => c + 1), 75);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN(0), 3200);
    return () => clearTimeout(t);
  }, [n]);

  const typed = TYPED.slice(0, n);

  const keyH = 9;
  const gap = 4;
  const keyX = 84;
  const keyW = 192;

  const keyRows = [
    { y: 143, keys: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"] },
    { y: 155, keys: ["A", "S", "D", "F", "G", "H", "J", "K", "L"] },
    { y: 167, keys: ["Z", "X", "C", "V", "B", "N", "M"] },
  ];

  const renderKeys = () => {
    const els: ReactElement[] = [];
    keyRows.forEach((row, ri) => {
      const count = row.keys.length;
      const kWidth = (keyW - (count - 1) * gap) / count;
      row.keys.forEach((label, k) => {
        const x = keyX + k * (kWidth + gap);
        els.push(
          <rect
            key={`${ri}-${k}`}
            x={x}
            y={row.y}
            width={kWidth}
            height={keyH}
            rx={1.8}
            fill="#1d1d1f"
            stroke="#2c2c2f"
            strokeWidth="0.5"
          />
        );
        els.push(
          <text
            key={`t-${ri}-${k}`}
            x={x + kWidth / 2}
            y={row.y + keyH / 2 + 0.2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="5.4"
            fill="#8a8a90"
            fontFamily="monospace"
          >
            {label}
          </text>
        );
      });
    });
    // space row
    const spY = 179;
    const L = 22;
    const R = 22;
    const spaceX = keyX + L + gap;
    const spaceW = keyW - L - R - gap * 2;
    [["shift-l", keyX, L], ["space", spaceX, spaceW], ["shift-r", spaceX + spaceW + gap, R]].forEach(
      ([key, sx, sw]) => {
        els.push(
          <rect key={key} x={sx} y={spY} width={sw} height={keyH} rx={1.8} fill="#1d1d1f" stroke="#2c2c2f" strokeWidth="0.5" />
        );
      }
    );
    return els;
  };

  return (
    <div className="hidden md:flex shrink-0 items-center justify-center h-full select-none pointer-events-none w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px]">
      <div className="relative w-full max-w-[420px]" style={{ aspectRatio: "360 / 245", marginTop: "40px" }}>
        {/* ambient glow */}
        <div
          className="pointer-events-none absolute -inset-12 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.09,
          }}
        />

        {/* LAPTOP SVG */}
        <svg viewBox="0 0 360 245" className="absolute inset-0 w-full h-full" fill="none">
          <defs>
            <linearGradient id="ztScr" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0b0c0b" />
              <stop offset="0.55" stopColor="#050505" />
              <stop offset="1" stopColor="#0a0b09" />
            </linearGradient>
            <linearGradient id="ztSheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="1" stopColor="#ccff00" stopOpacity="0.07" />
            </linearGradient>
            <linearGradient id="ztBase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1f1f21" />
              <stop offset="0.2" stopColor="#161617" />
              <stop offset="1" stopColor="#0f0f10" />
            </linearGradient>
            <linearGradient id="ztDesk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-laptop-bottom)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--color-laptop-bottom)" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* desk reflection */}
          <ellipse cx="180" cy="230" rx="116" ry="9" fill="url(#ztDesk)" />

          {/* screen bezel (outer panel) */}
          <rect x="76" y="14" width="208" height="118" rx="10" fill="#0c0c0d" stroke="var(--color-border)" strokeWidth="1" />
          {/* display */}
          <rect x="84" y="21" width="192" height="104" rx="6" fill="url(#ztScr)" />
          <rect x="84" y="21" width="192" height="104" rx="6" fill="url(#ztSheen)" />
          {/* camera */}
          <circle cx="180" cy="18.5" r="2" fill="#3a3a3d" />
          <circle cx="180" cy="18.5" r="0.9" fill="#577300" />
          {/* hinge */}
          <rect x="94" y="132" width="172" height="4" rx="2" fill="#0a0a0b" />

          {/* keyboard base */}
          <rect x="76" y="136" width="208" height="90" rx="10" fill="url(#ztBase)" stroke="var(--color-border)" strokeWidth="1" />
          {/* base top lip highlight */}
          <rect x="80" y="138" width="200" height="3" rx="1.5" fill="#2a2a2d" />
          {/* keyboard keys */}
          {renderKeys()}
          {/* trackpad */}
          <rect x="138" y="194" width="84" height="18" rx="9" fill="#0c0c0d" stroke="#262629" strokeWidth="0.6" />

          {/* bottom feet */}
          <rect x="84" y="232" width="192" height="3" rx="1.5" fill="var(--color-laptop-line)" opacity="0.8" />
        </svg>

        {/* typewriter overlay on the screen display */}
        <div
          className="absolute"
          style={{
            left: "23.3%",
            top: "8.6%",
            width: "53.3%",
            height: "42.4%",
          }}
        >
          <div className="w-full h-full flex flex-col justify-center items-start font-mono" style={{ color: "#F5F5F0", fontSize: "clamp(12px, 1.15vw, 17px)", paddingLeft: "1.1em", paddingRight: "0.5em" }}>
            <span className="whitespace-pre-wrap">
              {typed.split("Personal AI Agent").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-accent font-semibold">Personal AI Agent</span>
                  )}
                </span>
              ))}
              <span
                className="inline-block ml-[3px] -mb-[2px] rounded-[1px] animate-caret"
                style={{
                  width: 9,
                  height: "1.2em",
                  background: "var(--color-accent)",
                  boxShadow: "0 0 12px var(--color-accent)",
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
