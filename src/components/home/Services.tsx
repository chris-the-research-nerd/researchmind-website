import { services } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  MessageCircle,
  BarChart3,
  TrendingUp,
  Target,
  Cpu,
} from "lucide-react";

const iconMap = {
  MessageCircle: <MessageCircle size={24} strokeWidth={1.5} />,
  BarChart3: <BarChart3 size={24} strokeWidth={1.5} />,
  TrendingUp: <TrendingUp size={24} strokeWidth={1.5} />,
  Target: <Target size={24} strokeWidth={1.5} />,
  Cpu: <Cpu size={24} strokeWidth={1.5} />,
};

export function Services() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-12">
            Services
          </h2>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.titleAccent} delay={i * 75} className="flex w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <Card
                icon={iconMap[service.icon]}
                titleBefore={service.titleBefore}
                titleAccent={service.titleAccent}
                titleAfter={service.titleAfter}
                description={service.description}
                href={`/services#${service.id}`}
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
