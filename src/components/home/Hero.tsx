import { hero } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    // Desktop: a tall section with a sticky stage. At the top the brain fills
    // the screen behind the headline (Noomo-style); scrolling moves it to the
    // right and fades in its labels and the "how it fits together" panel
    // (driven from HeroVisual via scroll progress). Phones: unchanged layout.
    <section data-hero-scroll className="relative h-[230svh] lg:h-[210vh]">
      <div className="overflow-hidden sticky top-[65px] h-[calc(100svh-65px)] md:top-[81px] md:h-[calc(100svh-81px)] lg:h-[calc(100vh-81px)]">
        <Container className="relative h-full">
          <div className="relative h-full flex items-center">
            <div
              data-hero-text
              className="relative z-10 w-full lg:w-[80%] pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto"
            >
              <FadeIn>
                <h1 className="font-heading text-[2.15rem] sm:text-5xl md:text-6xl lg:text-[3.6rem] xl:text-[4rem] font-medium tracking-tight leading-[1.04]">
                  {hero.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="mt-6 md:mt-10 text-base sm:text-lg md:text-xl text-secondary leading-relaxed max-w-[560px]">
                  {hero.subline}
                </p>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
                  <Button href={hero.secondaryCta.href} variant="secondary">
                    {hero.secondaryCta.label}
                  </Button>
                </div>
              </FadeIn>
            </div>
            {/* Full-width stage on desktop. No FadeIn: its transform would trap
                the phone layout's absolutely positioned brain. */}
            <div className="absolute inset-y-0 left-[calc(50%-50vw)] w-screen z-0">
              <HeroVisual />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
