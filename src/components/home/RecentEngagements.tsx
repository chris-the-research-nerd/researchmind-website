import Image from "next/image";
import { recentEngagements } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/ui/FadeIn";

export function RecentEngagements() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <p className="text-sm text-secondary uppercase tracking-widest mb-10 text-center">
            {recentEngagements.heading}
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="flex items-center justify-center gap-12 md:gap-20 mb-10">
            {recentEngagements.logos.map((logo) => (
              <div key={logo.name} className="grayscale opacity-60">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-center text-secondary text-sm italic max-w-[600px] mx-auto">
            {recentEngagements.footnote}
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
