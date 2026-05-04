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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {whyResearchMind.map((item, i) => (
            <FadeIn key={item.title} delay={i * 100}>
              <div>
                <h3 className="font-heading text-lg font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-secondary leading-[1.65]">
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
