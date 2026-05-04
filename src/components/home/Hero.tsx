import Link from "next/link";
import { hero } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function Hero() {
  return (
    <section className="pt-20 pb-14 md:pt-28 md:pb-20 lg:pt-36 lg:pb-24">
      <Container>
        <FadeIn>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.08] max-w-[900px]">
            {hero.headlineBefore}
            <span className="text-accent">{hero.headlineAccent}</span>
            {hero.headlineAfter}
          </h1>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="mt-10 md:mt-12 text-lg md:text-xl text-secondary leading-relaxed max-w-[600px]">
            {hero.subline}
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mt-10 flex flex-wrap gap-2">
            {hero.anchors.map((anchor) => (
              <Link
                key={anchor.label}
                href={anchor.href}
                className="text-sm text-secondary/80 tracking-[0.02em] px-3.5 py-1 rounded-full bg-muted hover:bg-foreground/5 hover:text-secondary transition-colors duration-200"
              >
                {anchor.label}
              </Link>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
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
