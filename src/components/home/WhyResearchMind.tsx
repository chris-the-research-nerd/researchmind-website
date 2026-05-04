import { whyResearchMind } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";

export function WhyResearchMind() {
  return (
    <Section className="bg-muted">
      <Container>
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-12">
            Why ResearchMind
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-14">
          {whyResearchMind.map((item, i) => (
            <FadeIn key={item.title} delay={i * 100}>
              <div>
                <span className="text-sm text-secondary/60 tracking-[0.15em] block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-lg font-medium mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-secondary text-base leading-[1.65]">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
