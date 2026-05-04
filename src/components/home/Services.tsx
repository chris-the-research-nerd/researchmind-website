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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 75}>
              <Card
                icon={iconMap[service.icon]}
                title={service.title}
                description={service.description}
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
