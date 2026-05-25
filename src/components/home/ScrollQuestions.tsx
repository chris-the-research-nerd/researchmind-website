"use client";

import { useEffect, useRef, useState } from "react";
import { rollingQuestions, services, whatWeDo } from "@/content/home";

// Homepage paragraph: the 6 cross-cutting questions plus one strongest pick per service.
const ALL_QUESTIONS: string[] = [
  ...rollingQuestions,
  services[0].questions[1], // Qualitative
  services[1].questions[0], // Quantitative
  services[2].questions[1], // Advanced Analytics
  services[3].questions[2], // Market & Brand Strategy
  services[4].questions[0], // AI Workflow Enablement
];

function seededShuffle<T>(array: T[], seed: number): T[] {
  const a = array.slice();
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const REVEAL_ORDER: number[] = seededShuffle(
  Array.from({ length: ALL_QUESTIONS.length }, (_, i) => i),
  42
);

// Progress phases:
//   0 .. REVEAL_END           : sentences fade in one by one
//   REVEAL_END .. FADE_END    : paragraph fades out, WhatWeDo fades in
//   FADE_END .. 1             : hold on WhatWeDo
const REVEAL_END = 0.55;
const FADE_END = 0.75;
const SENTENCE_FADE_WINDOW = 0.05;

// Color fade: paragraph starts dark gray, drifts to lighter gray as questions accumulate.
const GRAY_START = 0.35; // start drifting toward light gray here
const DARK_GRAY = 68; // #444
const LIGHT_GRAY = 175; // #afafaf

export function ScrollQuestions() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const n = ALL_QUESTIONS.length;

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollable = sectionHeight - viewportHeight;
      if (scrollable <= 0) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Whole-paragraph opacity: 1 until REVEAL_END, then fades to 0 by FADE_END.
  const paragraphOpacity =
    progress < REVEAL_END
      ? 1
      : progress > FADE_END
        ? 0
        : 1 - (progress - REVEAL_END) / (FADE_END - REVEAL_END);

  // WhatWeDo opacity: 0 until REVEAL_END, fades to 1 by FADE_END, holds.
  const whatWeDoOpacity =
    progress < REVEAL_END
      ? 0
      : progress > FADE_END
        ? 1
        : (progress - REVEAL_END) / (FADE_END - REVEAL_END);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${n * 14 + 80}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* WhatWeDo behind */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
          style={{
            opacity: whatWeDoOpacity,
            transition: "opacity 220ms ease-out",
          }}
        >
          <div className="max-w-[720px] mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-tight">
              {whatWeDo.taglineBefore}
              <span className="text-accent">{whatWeDo.taglineAccent}</span>
            </h2>
            <p className="text-foreground text-xl md:text-[1.375rem] leading-[1.6] mb-6">
              {whatWeDo.paragraphs[0]}
            </p>
            <p className="text-secondary text-lg leading-[1.65]">
              {whatWeDo.paragraphs[1]}
            </p>
          </div>
        </div>

        {/* Paragraph in front */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p
            className="mx-auto max-w-[920px] font-heading text-lg md:text-xl lg:text-2xl font-semibold tracking-tight leading-[1.5] text-justify"
            style={{
              color: (() => {
                const t = Math.max(
                  0,
                  Math.min(1, (progress - GRAY_START) / (REVEAL_END - GRAY_START))
                );
                const v = Math.round(DARK_GRAY + (LIGHT_GRAY - DARK_GRAY) * t);
                return `rgb(${v}, ${v}, ${v})`;
              })(),
              opacity: paragraphOpacity,
              transition: "opacity 240ms ease-out, color 240ms ease-out",
              textAlignLast: "left",
              hyphens: "manual",
            }}
          >
            {ALL_QUESTIONS.map((q, i) => {
              const order = REVEAL_ORDER.indexOf(i);
              const start = (order / n) * REVEAL_END;
              const end = start + SENTENCE_FADE_WINDOW;
              let opacity = 0;
              if (progress >= end) opacity = 1;
              else if (progress > start)
                opacity = (progress - start) / SENTENCE_FADE_WINDOW;

              return (
                <span
                  key={i}
                  style={{
                    opacity,
                    transition: "opacity 220ms ease-out",
                  }}
                >
                  {q}
                  {i < ALL_QUESTIONS.length - 1 ? " " : ""}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
