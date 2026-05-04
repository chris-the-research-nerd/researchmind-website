import type { ReactNode } from "react";

type CardProps = {
  icon: ReactNode;
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  description: string;
};

export function Card({
  icon,
  titleBefore,
  titleAccent,
  titleAfter,
  description,
}: CardProps) {
  return (
    <div className="h-full p-8 lg:p-10 rounded-lg border border-border shadow-sm hover:shadow-md hover:border-secondary/40 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-foreground/80 shrink-0">{icon}</div>
        <h3 className="font-heading text-lg font-semibold leading-snug">
          {titleBefore}
          <span className="text-accent">{titleAccent}</span>
          {titleAfter}
        </h3>
      </div>
      <p className="text-secondary leading-[1.65] text-base">
        {description}
      </p>
    </div>
  );
}
