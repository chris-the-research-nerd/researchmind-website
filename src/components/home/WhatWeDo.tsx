import { whatWeDo } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";

export function WhatWeDo() {
  return (
    <Section className="border-t border-border">
      <Container narrow>
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-8">
            What we do
          </h2>
        </FadeIn>
        <div className="space-y-6">
          {whatWeDo.paragraphs.map((p, i) => (
            <FadeIn key={i} delay={i * 100}>
              <p className="text-secondary text-lg leading-[1.65]">{p}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
