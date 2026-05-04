import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Contact — ResearchMind",
  description: "Get in touch with ResearchMind.",
};

export default function ContactPage() {
  return (
    <Section>
      <Container narrow>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Get in touch
          </h1>
          <p className="text-secondary text-lg leading-relaxed mb-12">
            Whether you have a specific project in mind or just want to explore
            what&apos;s possible, we&apos;d love to hear from you.
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <ContactForm />
        </FadeIn>
      </Container>
    </Section>
  );
}
