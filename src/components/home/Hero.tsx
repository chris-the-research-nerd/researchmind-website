import { hero } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function Hero() {
  return (
    <section className="pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      <Container>
        <FadeIn>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] max-w-[900px]">
            {hero.headline}
          </h1>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="mt-8 text-lg md:text-xl text-secondary leading-relaxed max-w-[640px]">
            {hero.subline}
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mt-8 space-y-1">
            {hero.anchors.map((line) => (
              <p key={line} className="text-sm text-secondary tracking-wide">
                {line}
              </p>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
