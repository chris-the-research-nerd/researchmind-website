import { recentEngagements } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { LogoCarousel } from "@/components/ui/LogoCarousel";
import { FadeIn } from "@/components/ui/FadeIn";

export function RecentEngagements() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-12 text-center">
            {recentEngagements.heading}
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <LogoCarousel logos={recentEngagements.logos} />
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-center text-secondary/80 text-sm tracking-wide max-w-[600px] mx-auto leading-relaxed mt-10">
            {recentEngagements.footnote}
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
