import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Our Team — ResearchMind",
  description: "Meet the ResearchMind team.",
};

const team = [
  {
    name: "Tanaz",
    role: "Co-Founder",
    bio: "Bio coming soon.",
  },
  {
    name: "Chris",
    role: "Co-Founder",
    bio: "Bio coming soon.",
  },
];

export default function TeamPage() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Our team
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-[640px] mb-16">
            A small, senior team with deep expertise in behavioral science, AI,
            and business strategy.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[720px]">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={i * 100}>
              <div>
                <div className="w-full aspect-[4/5] bg-muted mb-6" />
                <h2 className="font-heading text-xl font-semibold">
                  {member.name}
                </h2>
                <p className="text-secondary text-sm mt-1">{member.role}</p>
                <p className="text-secondary mt-4 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
