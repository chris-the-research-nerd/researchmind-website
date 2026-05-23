import Link from "next/link";
import { hero } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function Hero() {
  return (
    <section className="relative pt-20 pb-14 md:pt-28 md:pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
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
        <FadeIn>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.08] max-w-[900px]">
            <span className="hero-anim-sink">Deeper</span> insights.{" "}
            <span className="hero-anim-pointy">Sharper</span> strategy. Real{" "}
            <span className="hero-anim-grow text-accent">results</span> for your
            organization.
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
                className="text-sm text-secondary/80 tracking-[0.02em] px-3.5 py-1.5 rounded-sm bg-muted hover:bg-foreground/5 hover:text-secondary hover:rotate-[0.5deg] hover:-translate-y-0.5 transition-all duration-200"
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
