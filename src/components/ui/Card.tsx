import type { ReactNode } from "react";
import Link from "next/link";

type CardProps = {
  icon: ReactNode;
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  description?: string;
  forWhen?: string[];
  href?: string;
};

export function Card({
  icon,
  titleBefore,
  titleAccent,
  titleAfter,
  description,
  forWhen,
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
      {forWhen ? (
        <>
          <p className="text-xs font-semibold tracking-[0.12em] text-secondary uppercase mb-3">
            For when
          </p>
          <ul className="space-y-2">
            {forWhen.map((item) => (
              <li
                key={item}
                className="text-secondary text-base leading-[1.55] flex gap-2.5"
              >
                <span
                  className="text-accent shrink-0 mt-[0.45em] leading-none"
                  aria-hidden="true"
                >
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-secondary leading-[1.65] text-base">{description}</p>
      )}
    </>
  );

  const className = "h-full p-8 lg:p-10 rounded-lg border border-border shadow-sm hover:shadow-md hover:border-secondary/40 hover:-translate-y-0.5 hover:rotate-[0.5deg] transition-all duration-300 block";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
