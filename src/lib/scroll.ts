import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/** Register the app-wide Lenis instance so sections can scroll to it. */
export function registerLenis(lenis: Lenis | null): void {
  lenisInstance = lenis;
}

/** Offset to account for the fixed top navigation bar. */
const NAV_OFFSET = 80;

/**
 * Smoothly scroll to an element (by CSS selector/hash) using the active
 * Lenis instance, falling back to native scrolling when Lenis is unavailable.
 */
export function scrollToSection(target: string): void {
  const el =
    typeof target === "string" && target.length > 1
      ? document.querySelector(target)
      : null;

  if (el && lenisInstance) {
    const top =
      (el as HTMLElement).getBoundingClientRect().top +
      window.scrollY -
      NAV_OFFSET;
    lenisInstance.scrollTo(top, { duration: 1.2 });
    return;
  }

  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
