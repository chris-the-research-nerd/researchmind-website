import Link from "next/link";
import { practices } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { PracticeIcon } from "./icons";

export function Practices() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-12 text-center">
            What we do
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {practices.map((p, i) => (
            <FadeIn key={p.id} delay={i * 75} className="flex">
              <Link
                href={`/services#${p.id}`}
                className="group flex flex-col w-full rounded-lg bg-white border border-border/60 shadow-sm p-7 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-foreground/80 mb-4">
                  <PracticeIcon name={p.icon} />
                </div>
                <h3 className="font-heading text-xl font-semibold leading-snug mb-3">
                  {p.titleBefore}
                  <span className="text-accent">{p.titleAccent}</span>
                  {p.titleAfter}
                </h3>
                <p className="font-heading text-lg leading-snug text-foreground mb-3">
                  {p.hook}
                </p>
                <p className="text-secondary text-[15px] leading-[1.6] mb-6">
                  {p.summary}
                </p>
                <span className="mt-auto text-sm font-medium group-hover:text-accent transition-colors">
                  Learn more →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
