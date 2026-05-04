"use client";

import Image from "next/image";

type Logo = {
  name: string;
  src: string;
};

type LogoCarouselProps = {
  logos: Logo[];
};

export function LogoCarousel({ logos }: LogoCarouselProps) {
  // Create two identical sets for seamless infinite scroll.
  // Each set needs enough logos to always fill the viewport.
  const set = [
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
  ];

  return (
    <div className="relative overflow-hidden py-6">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

      <div
        className="flex w-max"
        style={{
          animation: "scroll 30s linear infinite",
        }}
      >
        {/* First set */}
        {set.map((logo, i) => (
          <div
            key={`a-${logo.name}-${i}`}
            className="flex items-center justify-center px-10 md:px-16 shrink-0 grayscale opacity-40 hover:opacity-70 transition-opacity duration-300"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={160}
              height={52}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {set.map((logo, i) => (
          <div
            key={`b-${logo.name}-${i}`}
            className="flex items-center justify-center px-10 md:px-16 shrink-0 grayscale opacity-40 hover:opacity-70 transition-opacity duration-300"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={160}
              height={52}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
