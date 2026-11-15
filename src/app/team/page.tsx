import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { team, partners } from "@/content/team";

export const metadata: Metadata = {
  title: "Our Team | ResearchMind",
  description:
    "Meet the ResearchMind team. PhDs in neuroscience, decades of experience at companies like TikTok, Meta, Microsoft, and Red Bull.",
};



export default function TeamPage() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-16">
            Our team
          </h1>
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

        <section className="mt-24 border-t border-border pt-14">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-4">
              Partners
            </h2>
            <p className="text-secondary text-lg leading-relaxed max-w-[640px] mb-12">
              Good company makes good work.
            </p>
          </FadeIn>
          <div className="space-y-14 max-w-[800px]">
            {partners.map((member, i) => (
              <FadeIn key={member.name} delay={i * 100}>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                  <div className="w-32 md:w-40 shrink-0">
                    <div className="w-full aspect-square overflow-hidden rounded-full bg-muted">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    {member.photoCredit ? (
                      <p className="text-[11px] text-secondary mt-2 text-center">{member.photoCredit}</p>
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold">{member.name}</h3>
                    <p className="text-accent text-sm font-medium mt-1">
                      {member.title},{" "}
                      <a
                        href={member.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        {member.org}
                      </a>
                    </p>
                    <p className="text-secondary text-base leading-[1.65] mt-4">{member.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </Container>
    </Section>
  );
}
