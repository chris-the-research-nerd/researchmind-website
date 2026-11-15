import type { Metadata } from "next";
import { practices } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { PracticeIcon } from "@/components/home/icons";
import { AskYourAI } from "@/components/AskYourAI";

export const metadata: Metadata = {
  title: "Services | ResearchMind",
  description:
    "Research and strategy consulting, AI solutions consulting, and AI visibility (AEO) from ResearchMind.",
};

export default function ServicesPage() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
            Our services
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-[640px] mb-10">
            ResearchMind is a research and consulting firm. We work in three
            areas.
          </p>
          <nav className="flex flex-wrap gap-2 mb-16" aria-label="Practices">
            {practices.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="text-sm text-secondary px-3.5 py-1.5 rounded-sm bg-muted hover:bg-foreground/5 hover:text-foreground transition-colors"
              >
                {p.titleBefore}
                {p.titleAccent}
                {p.titleAfter}
              </a>
            ))}
          </nav>
        </FadeIn>

        <div className="space-y-24">
          {practices.map((p) => (
            <FadeIn key={p.id}>
              <article id={p.id} className="border-t border-border pt-12 scroll-mt-24">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-foreground">
                    <PracticeIcon name={p.icon} size={28} />
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight">
                    {p.titleBefore}
                    <span className="text-accent">{p.titleAccent}</span>
                    {p.titleAfter}
                  </h2>
                </div>
                <p className="font-heading text-xl md:text-2xl leading-snug tracking-tight max-w-[760px] mb-4">
                  {p.hook}
                </p>
                <p className="text-secondary text-lg leading-[1.65] max-w-[760px]">
                  {p.summary}
                </p>


                <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-14 mt-10">
                  <div>
                    <h3 className="text-xs font-semibold tracking-[0.12em] text-secondary uppercase mb-4">
                      For when
                    </h3>
                    <ul className="space-y-3">
                      {p.forWhen.map((item) => (
                        <li key={item} className="text-foreground text-base leading-[1.6] flex gap-3">
                          <span className="text-accent shrink-0 mt-[0.5em] leading-none" aria-hidden="true">
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold tracking-[0.12em] text-secondary uppercase mb-4">
                      What&apos;s included
                    </h3>
                    <dl className="space-y-4">
                      {p.included.map((item) => (
                        <div key={item.name}>
                          <dt className="font-medium text-foreground">{item.name}</dt>
                          <dd className="text-secondary text-base leading-[1.6] mt-0.5">
                            {item.description}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button href={`/contact?for=${p.agentReason}`}>Talk to us</Button>
                  <AskYourAI reason={p.agentReason} />

                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
