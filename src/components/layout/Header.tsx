"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 flex items-center justify-between h-16 md:h-20">
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
        <nav className="hidden md:flex items-center gap-8">
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
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="md:hidden border-t border-border">
          <div className="px-6 sm:px-8 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-secondary hover:text-foreground transition-colors duration-200 py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
