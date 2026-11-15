"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Desktop: the menu starts open; the triangle hides and shows it
  const [desktopOpen, setDesktopOpen] = useState(true);
  const toggle = () => {
    if (window.matchMedia("(min-width: 768px)").matches) setDesktopOpen((v) => !v);
    else setMobileOpen((v) => !v);
  };

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 flex items-center justify-between h-16 md:h-20 relative">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Research Mind"
            width={180}
            height={40}
            className="h-10 md:h-11 w-auto"
            priority
          />
        </Link>
        <nav
          className="hidden md:flex absolute right-14 top-1/2 items-center gap-8 bg-white pr-3 whitespace-nowrap transition-[transform,opacity] duration-300 ease-out"
          style={{
            transform: desktopOpen
              ? "translateY(-50%) translateX(0)"
              : "translateY(-50%) translateX(120%)",
            opacity: desktopOpen ? 1 : 0,
            pointerEvents: desktopOpen ? "auto" : "none",
          }}
          aria-hidden={!desktopOpen}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-secondary hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="relative z-50 p-2 -mr-2"
          onClick={toggle}
          aria-label="Show or hide menu"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className={`transition-transform duration-300 ease-out ${mobileOpen ? "rotate-90" : "rotate-0"} ${desktopOpen ? "md:rotate-0" : "md:rotate-180"}`}
            aria-hidden="true"
          >
            <polygon points="3,2 16,9 3,16" fill="currentColor" />
          </svg>
        </button>
      </div>
      <div
        className="md:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ease-out"
        style={{
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        }}
        aria-hidden={!mobileOpen}
      >
        <nav className="h-full flex flex-col items-start justify-center gap-8 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-3xl font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
