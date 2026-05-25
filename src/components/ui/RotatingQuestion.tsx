"use client";

import { useEffect, useRef, useState } from "react";

const HOLD_MS = 3500;
const ANIM_MS = 550;

type RotatingQuestionProps = {
  questions: string[];
  className?: string;
};

export function RotatingQuestion({ questions, className = "" }: RotatingQuestionProps) {
  const [index, setIndex] = useState(0);
  const prevRef = useRef(-1);

  useEffect(() => {
    if (questions.length <= 1) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const timer = setTimeout(() => {
      prevRef.current = index;
      setIndex((i) => (i + 1) % questions.length);
    }, HOLD_MS);
    return () => clearTimeout(timer);
  }, [index, questions.length]);

  return (
    <div
      className={`relative border-l-2 border-accent pl-5 md:pl-6 overflow-hidden ${className}`}
    >
      <div className="grid">
        {questions.map((q, i) => {
          const isCurrent = i === index;
          const wasPrev = i === prevRef.current && !isCurrent;
          const animated = isCurrent || wasPrev;

          const transform = isCurrent
            ? "translateY(0)"
            : wasPrev
              ? "translateY(-100%)"
              : "translateY(100%)";

          return (
            <p
              key={i}
              className="col-start-1 row-start-1 font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug"
              style={{
                transition: animated
                  ? `transform ${ANIM_MS}ms ease-out, opacity ${ANIM_MS}ms ease-out`
                  : "none",
                transform,
                opacity: isCurrent ? 1 : 0,
              }}
            >
              {q}
            </p>
          );
        })}
      </div>
    </div>
  );
}
