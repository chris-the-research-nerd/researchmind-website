import { whyResearchMind } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";

export function WhyResearchMind() {
  return (
    <Section className="bg-muted">
      <Container>
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-12 text-center">
            Why ResearchMind
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-14">
          {whyResearchMind.map((item, i) => (
            <FadeIn key={item.title} delay={i * 100}>
              <div>
                <h3 className="font-heading text-lg font-semibold mb-3 leading-snug">
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
