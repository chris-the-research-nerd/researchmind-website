import { whatWeDo } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { NeuralMesh } from "@/components/ui/NeuralMesh";

export function WhatWeDo() {
  return (
    <Section className="border-t border-border relative overflow-hidden">
      <NeuralMesh />
      <Container narrow>
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-8">
            What we do
          </h2>
        </FadeIn>
        <div className="space-y-6">
          <FadeIn delay={100}>
            <p className="text-foreground text-xl md:text-[1.375rem] leading-[1.6]">
              {whatWeDo.paragraphs[0]}
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-secondary text-lg leading-[1.65]">
              {whatWeDo.paragraphs[1]}
            </p>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
