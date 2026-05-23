import type { Metadata } from "next";
import { services } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { RotatingQuestion } from "@/components/ui/RotatingQuestion";
import {
  MessageCircle,
  BarChart3,
  TrendingUp,
  Target,
  Cpu,
} from "lucide-react";

const iconMap = {
  MessageCircle: <MessageCircle size={28} strokeWidth={1.5} />,
  BarChart3: <BarChart3 size={28} strokeWidth={1.5} />,
  TrendingUp: <TrendingUp size={28} strokeWidth={1.5} />,
  Target: <Target size={28} strokeWidth={1.5} />,
  Cpu: <Cpu size={28} strokeWidth={1.5} />,
};

export const metadata: Metadata = {
  title: "Services | ResearchMind",
  description:
    "Research, analytics, and strategy services from ResearchMind.",
};

export default function ServicesPage() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
            Our services
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-[640px] mb-16">
            We help organizations understand their customers, sharpen their
            strategy, and move faster with confidence.
          </p>
        </FadeIn>

        <div className="space-y-20">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 75}>
              <article
                id={service.id}
                className="border-t border-border pt-10 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-foreground">
                    {iconMap[service.icon]}
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight">
                    {service.titleBefore}
                    <span className="text-accent">{service.titleAccent}</span>
                    {service.titleAfter}
                  </h2>
                </div>

                <div className="mb-10">
                  <RotatingQuestion questions={service.questions} />
                </div>

                <div className="grid md:grid-cols-2 gap-10 md:gap-12">
                  <div>
                    <h3 className="text-xs font-semibold tracking-[0.12em] text-secondary uppercase mb-4">
                      For when
                    </h3>
                    <ul className="space-y-3">
                      {service.forWhen.map((item) => (
                        <li
                          key={item}
                          className="text-foreground text-base leading-[1.6] flex gap-3"
                        >
                          <span
                            className="text-accent shrink-0 mt-[0.5em] leading-none"
                            aria-hidden="true"
                          >
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold tracking-[0.12em] text-secondary uppercase mb-4">
                      Activities include
                    </h3>
                    <p className="text-foreground text-base leading-[1.6]">
                      {service.activities.join(" · ")}
                    </p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
