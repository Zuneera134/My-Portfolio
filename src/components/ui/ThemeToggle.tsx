"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("theme") as Theme) || "dark";
  }
  return "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-fg hover:text-accent transition-colors duration-300 border border-border rounded-full px-4 py-2"
      data-cursor="TOGGLE"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="relative w-4 h-4">
        <span
          className={`absolute inset-0 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
            theme === "dark" ? "bg-accent opacity-100" : "bg-accent opacity-30"
          }`}
        />
      </span>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
