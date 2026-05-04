import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Our Team | ResearchMind",
  description:
    "Meet the ResearchMind team. PhDs in neuroscience, decades of experience at companies like TikTok, Meta, Microsoft, and Red Bull.",
};

const team = [
  {
    name: "Tanaz Molapour, Ph.D.",
    role: "Founder & CEO | Principal Researcher",
    photo: "/images/tanaz.webp",
    bio: "Tanaz brings a rare combination of scientific depth and business intuition to every engagement. Trained in neuroscience at the Karolinska Institutet and Caltech, she understands how people think, feel, and make decisions. She founded ResearchMind to help organizations tap into that understanding, turning behavioral insight into strategies that drive growth, retention, and smarter products.",
  },
  {
    name: "Chris Berger, Ph.D.",
    role: "Co-Founder | Principal Researcher",
    photo: "/images/chris.webp",
    bio: "Chris pairs a background in neuroscience (Karolinska Institutet, Caltech) with years of leading research and analytics at TikTok, Meta, and Microsoft. He co-founded ResearchMind to give organizations access to the kind of rigorous, clear-headed thinking that helps them understand their customers, make sense of complex data, and move forward with confidence.",
  },
  {
    name: "Agnes Tongur, M.S.",
    role: "Principal Researcher",
    photo: "/images/agnes.webp",
    bio: "Agnes brings over 15 years of hands-on research experience to ResearchMind. With a background in the social sciences from Stockholm University, she has spent her career helping educational providers, governments, and international organizations use data to make better decisions. She brings methodological precision and a talent for turning complexity into clarity.",
  },
];

export default function TeamPage() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight mb-6">
            Our team
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-[640px] mb-16">
            A small, senior team with deep roots in behavioral science,
            neuroscience, and AI. Every project gets direct attention from the
            people doing the thinking.
          </p>
        </FadeIn>
        <div className="space-y-16 max-w-[800px]">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={i * 100}>
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="w-full md:w-48 shrink-0">
                  <div className="w-full aspect-square overflow-hidden bg-muted">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-xl font-semibold">
                    {member.name}
                  </h2>
                  <p className="text-accent text-sm font-medium mt-1">
                    {member.role}
                  </p>
                  <p className="text-secondary leading-[1.7] mt-4">
                    {member.bio}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
