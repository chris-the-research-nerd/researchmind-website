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

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 flex items-center justify-between h-16 md:h-20 relative">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="ResearchMind"
            width={180}
            height={40}
            className="h-10 md:h-11 w-auto"
            priority
          />
        </Link>
        <nav
          className="hidden md:flex absolute right-14 top-1/2 items-center gap-8 bg-white pr-3 whitespace-nowrap transition-[transform,opacity] duration-300 ease-out"
          style={{
            transform: mobileOpen
              ? "translateY(-50%) translateX(0)"
              : "translateY(-50%) translateX(120%)",
            opacity: mobileOpen ? 1 : 0,
            pointerEvents: mobileOpen ? "auto" : "none",
          }}
          aria-hidden={!mobileOpen}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-secondary hover:text-foreground transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="relative z-50 p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className="transition-transform duration-300 ease-out"
            style={{
              transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)",
            }}
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
