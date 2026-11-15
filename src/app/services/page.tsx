import type { Metadata } from "next";
import { practices } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { PracticeIcon } from "@/components/home/icons";
import { AskYourAI } from "@/components/AskYourAI";
import { AeoExample } from "@/components/AeoExample";

export const metadata: Metadata = {
  title: "Services | Research Mind",
  description:
    "Research and strategy consulting, AI solutions consulting, and AI visibility (AEO) from Research Mind.",
};

export default function ServicesPage() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
            Our services
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-[640px] mb-6">
            Research Mind is a research and consulting firm. We work in three
            areas.
          </p>
        </FadeIn>
        {/* Jump links stay pinned under the header while you scroll */}
        <nav
          className="sticky top-16 md:top-20 z-30 -mx-6 sm:-mx-8 px-6 sm:px-8 py-3 mb-12 bg-white/95 backdrop-blur flex gap-2 overflow-x-auto whitespace-nowrap"
          aria-label="Services"
        >
          {practices.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="shrink-0 text-sm text-secondary px-3.5 py-1.5 rounded-sm bg-muted hover:bg-foreground/5 hover:text-foreground transition-colors"
            >
              {p.titleBefore}
              {p.titleAccent}
              {p.titleAfter}
            </a>
          ))}
        </nav>

        <div className="space-y-24">
          {practices.map((p) => (
            <FadeIn key={p.id}>
              <article id={p.id} className="border-t border-border pt-12 scroll-mt-36">
                <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">
                {/* Left: what it is, and how to reach us */}
                <div className="lg:sticky lg:top-40 lg:self-start">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-foreground">
                      <PracticeIcon name={p.icon} size={28} />
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight">
                      {p.titleBefore}
                      {p.titleAccent}
                      {p.titleAfter}
                    </h2>
                  </div>
                  <p className="font-heading text-xl md:text-2xl leading-snug tracking-tight mb-4">{p.hook}</p>
                  <p className="text-secondary text-lg leading-[1.65]">{p.summary}</p>
                  {p.alsoCalled ? (
                    <p className="text-secondary text-sm leading-[1.6] mt-3">{p.alsoCalled}</p>
                  ) : null}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button href={`/contact?for=${p.agentReason}`}>Get in touch</Button>
                    <AskYourAI reason={p.agentReason} />
                  </div>
                  <p className="text-secondary text-sm mt-3">
                    Your AI assistant can draft the intro email for you to approve.
                  </p>
                </div>

                {/* Right: the detail */}
                <div>
                  <div className="rounded-lg bg-muted p-6 md:p-7">
                    <h3 className="text-xs font-semibold tracking-[0.12em] text-secondary uppercase mb-4">
                      This is for you if
                    </h3>
                    <ul className="space-y-2.5">
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
                  <h3 className="text-xs font-semibold tracking-[0.12em] text-secondary uppercase mt-9 mb-1 px-6 md:px-7">
                    What&apos;s included
                  </h3>
                  <dl className="px-6 md:px-7">
                    {p.included.map((item) => (
                      <div key={item.name} className="py-3.5 border-b border-border last:border-b-0">
                        <dt className="font-medium text-foreground">{item.name}</dt>
                        <dd className="text-secondary text-base leading-[1.6] mt-0.5">{item.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                </div>

                {p.id === "ai-visibility" ? (
                  <div className="mt-12 border-t border-border pt-10">
                    <AeoExample />
                  </div>
                ) : null}
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
