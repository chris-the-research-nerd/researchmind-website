import type { Metadata } from "next";
import { services } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Services — ResearchMind",
  description:
    "Research, analytics, and strategy services from ResearchMind.",
};

export default function ServicesPage() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Our services
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-[640px] mb-16">
            We help organizations understand their customers, sharpen their
            strategy, and move faster with confidence.
          </p>
        </FadeIn>
        <div className="space-y-16">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 75}>
              <div className="border-t border-border pt-8 max-w-[720px]">
                <h2 className="font-heading text-2xl font-semibold mb-4">
                  {service.title}
                </h2>
                <p className="text-secondary leading-[1.65]">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
