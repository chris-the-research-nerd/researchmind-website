import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { team, partners } from "@/content/team";

export const metadata: Metadata = {
  title: "Our Team | Research Mind",
  description:
    "Meet the Research Mind team. PhDs in neuroscience, decades of experience at companies like TikTok, Meta, Microsoft, and Red Bull.",
};



function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  );
}

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
                  <h2 className="font-heading text-xl font-semibold flex items-center gap-2.5">
                    {member.name}
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="text-secondary hover:text-[#0A66C2] transition-colors"
                      >
                        <LinkedInIcon />
                      </a>
                    ) : null}
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
