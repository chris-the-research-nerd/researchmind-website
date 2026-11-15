import { clientsAndPartners, hero } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { LogoCarousel } from "@/components/ui/LogoCarousel";
import { FadeIn } from "@/components/ui/FadeIn";

export function ProofStrip() {
  return (
    <section className="py-10 md:py-12 border-y border-border">
      <Container>
        <FadeIn>
          <p className="text-xs font-semibold tracking-[0.12em] text-secondary uppercase text-center mb-2">
            {clientsAndPartners.heading}
          </p>
          <LogoCarousel logos={clientsAndPartners.logos} />
          <p className="text-secondary text-sm md:text-base text-center mt-2">{hero.proof}</p>
        </FadeIn>
      </Container>
    </section>
  );
}
