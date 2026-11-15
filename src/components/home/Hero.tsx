import { hero } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-14 items-center">
          <div>
            <FadeIn>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[2.6rem] xl:text-[2.95rem] font-medium tracking-tight leading-[1.1]">
                {hero.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="mt-8 md:mt-10 text-lg md:text-xl text-secondary leading-relaxed max-w-[640px]">
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
          <FadeIn delay={150}>
            <HeroVisual />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
