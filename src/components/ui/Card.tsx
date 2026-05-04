import type { ReactNode } from "react";

type CardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function Card({ icon, title, description }: CardProps) {
  return (
    <div className="p-8 border border-border hover:border-secondary/50 transition-colors duration-200">
      <div className="mb-5 text-foreground">{icon}</div>
      <h3 className="font-heading text-lg font-semibold mb-3">{title}</h3>
      <p className="text-secondary leading-relaxed text-[15px]">
        {description}
      </p>
    </div>
  );
}
