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
    role: "Founder & CEO",
    photo: "/images/tanaz.webp",
    bio: "Tanaz is a mixed-methods UX researcher with deep expertise in human emotion, cognition, and behavior. She holds a Ph.D. in Clinical Neuroscience from the Karolinska Institutet and completed postdoctoral work at Caltech, studying the computational and neural foundations of social behavior. She has since applied that scientific rigor to product and brand research at Red Bull and in consulting engagements across consumer tech and education. At ResearchMind, Tanaz brings a rare ability to connect behavioral science with practical business questions, helping clients uncover the why behind what their customers say and do.",
  },
  {
    name: "Chris Berger, Ph.D.",
    role: "Co-Founder",
    photo: "/images/chris.webp",
    bio: "Chris is a mixed-methods researcher, research leader, and former neuroscientist who has spent his career helping organizations understand people and build products that serve them. He holds a Ph.D. in Neuroscience from the Karolinska Institutet and completed postdoctoral research at Caltech, where he studied human perception and developed assistive technologies. He went on to lead research and analytics teams across TikTok, Meta, and Microsoft, covering product strategy in areas from AI and monetization to privacy and user growth. At ResearchMind, Chris brings that breadth of experience to help clients ask better questions, make sense of complex data, and move with confidence.",
  },
  {
    name: "Agnes Tongur, M.S.",
    role: "Principal Researcher",
    photo: "/images/agnes.webp",
    bio: "Agnes is a versatile researcher with over 15 years of experience working at the intersection of data, policy, and public impact. She holds an M.S. from Stockholm University and has spent her career partnering with educational providers, policy makers, and international organizations to turn complex data into clear, actionable guidance. Her expertise spans mixed-methods research, program evaluation, data analysis, and public policy development. At ResearchMind, Agnes brings methodological depth and operational precision to every engagement.",
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
