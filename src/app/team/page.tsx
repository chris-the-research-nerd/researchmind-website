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
    bio: "Tanaz founded ResearchMind in 2020 with one simple goal: help businesses get clear answers to the questions that matter for their success. With training in psychology and neuroscience (Karolinska Institutet, Caltech), her methodological rigor shapes every stage of the work, from how questions are framed and data is collected, to how findings are analyzed and translated into impact. Today, she leads research, strategy, and AI-enablement engagements for dozens of organizations across the US, EU, and UK.",
  },
  {
    name: "Chris Berger, Ph.D.",
    role: "Co-Founder | Principal Researcher",
    photo: "/images/chris.webp",
    bio: "Chris leads ResearchMind\u2019s quantitative and analytics work. He spent over a decade in research and analytics leadership at TikTok, Meta, and Microsoft.",
  },
  {
    name: "Agnes Tongur, M.S.",
    role: "Principal Researcher",
    photo: "/images/agnes.webp",
    bio: "Agnes specializes in applied research for educational providers, governments, and international organizations, with 15+ years turning complex data into clear decisions.",
  },
];

export default function TeamPage() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
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
                <div className="w-40 md:w-48 shrink-0">
                  <div className="w-full aspect-square overflow-hidden rounded-full bg-muted">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
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
                  <p className="text-secondary text-base leading-[1.65] mt-4">
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
