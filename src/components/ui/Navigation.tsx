"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power4.inOut",
        onStart: () => {
          if (overlayRef.current) {
            overlayRef.current.style.pointerEvents = "auto";
          }
        },
      });
    }

    menuItemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { y: 80, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          delay: 0.3 + i * 0.08,
          ease: "power3.out",
        }
      );
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "power4.inOut",
        onStart: () => {
          if (overlayRef.current) {
            overlayRef.current.style.pointerEvents = "none";
          }
        },
        onComplete: () => {
          setIsOpen(false);
          document.body.style.overflow = "";
        },
      });
    }
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isOpen, openMenu, closeMenu]);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Languages", href: "#languages" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    closeMenu();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 700);
  };

  return (
    <>
      {/* Floating Nav Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          <div
            ref={logoRef}
            className="text-sm font-mono tracking-[0.2em] uppercase text-fg"
            data-cursor="OPEN"
          >
            Zuneera Tariq
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <button
              ref={menuBtnRef}
              onClick={toggleMenu}
              className="flex items-center gap-3 text-sm font-mono tracking-[0.15em] uppercase text-fg hover:text-accent transition-colors duration-300"
              data-cursor="MENU"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span className="relative flex items-center justify-center w-8 h-8">
                <span
                  className={`absolute h-[1px] bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ${
                    isOpen
                      ? "w-6 rotate-45"
                      : "w-6 -translate-y-[5px]"
                  }`}
                />
                <span
                  className={`absolute h-[1px] bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ${
                    isOpen
                      ? "w-6 -rotate-45"
                      : "w-4 translate-y-[5px] translate-x-[2px]"
                  }`}
                />
              </span>
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[99] bg-bg flex items-center justify-center"
        style={{ clipPath: "inset(0 0 100% 0)", pointerEvents: "none" }}
      >
        <div className="text-center">
          <div className="mb-12 text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim">
            Navigation
          </div>
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                ref={(el) => { menuItemsRef.current[i] = el; }}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-fg hover:text-accent transition-colors duration-300 whitespace-nowrap"
                style={{ perspective: "600px" }}
                data-cursor="GO"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-16 flex items-center gap-8 justify-center text-[11px] font-mono tracking-[0.2em] uppercase text-fg-dim">
            <a
              href="https://github.com/Zuneera134"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              data-cursor="OPEN"
            >
              GitHub
            </a>
            <span className="w-[1px] h-3 bg-border" />
            <a
              href="https://www.linkedin.com/in/zuneera-tariq-a4b5012b5"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              data-cursor="OPEN"
            >
              LinkedIn
            </a>
            <span className="w-[1px] h-3 bg-border" />
            <a
              href="mailto:zuratariq8@gmail.com"
              className="hover:text-accent transition-colors"
              data-cursor="OPEN"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
