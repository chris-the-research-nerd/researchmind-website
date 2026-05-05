import { finalCta } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function FinalCTA() {
  return (
    <Section>
      <Container narrow className="text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            {finalCta.heading}
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="text-secondary text-lg leading-relaxed mb-12">
            {finalCta.body}
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <Button href={finalCta.cta.href}>{finalCta.cta.label}</Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
