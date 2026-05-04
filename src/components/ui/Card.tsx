import type { ReactNode } from "react";
import Link from "next/link";

type CardProps = {
  icon: ReactNode;
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  description: string;
  href?: string;
};

export function Card({
  icon,
  titleBefore,
  titleAccent,
  titleAfter,
  description,
  href,
}: CardProps) {
  const content = (
    <>
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
    </>
  );

  const className = "h-full p-8 lg:p-10 rounded-lg border border-border shadow-sm hover:shadow-md hover:border-secondary/40 hover:-translate-y-0.5 transition-all duration-300 block";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
