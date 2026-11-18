"use client";

import Image from "next/image";

type Logo = {
  name: string;
  src?: string;
  url?: string;
};

function LogoMark({ logo }: { logo: Logo }) {
  if (!logo.src) {
    // Wordmark fallback until a logo file is added to /public/logos
    return (
      <span className="font-heading text-2xl md:text-3xl font-semibold tracking-tight whitespace-nowrap">
        {logo.name}
      </span>
    );
  }
  return (
    <Image
      src={logo.src}
      alt={logo.name}
      width={160}
      height={52}
      className="h-10 md:h-12 w-auto max-w-[150px] md:max-w-[170px] object-contain"
    />
  );
}

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

      {/* Pauses on hover so a click lands on the logo you aimed at */}
      <div
        className="flex w-max hover:[animation-play-state:paused]"
        style={{
          animation: "scroll 75s linear infinite",
        }}
      >
        {/* First set */}
        {set.map((logo, i) => (
          <div
            key={`a-${logo.name}-${i}`}
            className="flex items-center justify-center px-10 md:px-16 shrink-0 grayscale opacity-40 hover:opacity-70 transition-opacity duration-300"
          >
            {logo.url ? (
              <a href={logo.url} target="_blank" rel="noopener noreferrer" aria-label={logo.name} tabIndex={i < logos.length ? 0 : -1}>
                <LogoMark logo={logo} />
              </a>
            ) : (
              <LogoMark logo={logo} />
            )}
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {set.map((logo, i) => (
          <div
            key={`b-${logo.name}-${i}`}
            className="flex items-center justify-center px-10 md:px-16 shrink-0 grayscale opacity-40 hover:opacity-70 transition-opacity duration-300"
          >
            {logo.url ? (
              <a href={logo.url} target="_blank" rel="noopener noreferrer" aria-label={logo.name} tabIndex={-1}>
                <LogoMark logo={logo} />
              </a>
            ) : (
              <LogoMark logo={logo} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
