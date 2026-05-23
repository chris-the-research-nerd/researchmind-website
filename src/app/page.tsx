import { Hero } from "@/components/home/Hero";
import { ScrollQuestions } from "@/components/home/ScrollQuestions";
import { Services } from "@/components/home/Services";
import { WhyResearchMind } from "@/components/home/WhyResearchMind";
import { RecentEngagements } from "@/components/home/RecentEngagements";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollQuestions />
      <Services />
      <WhyResearchMind />
      <FinalCTA />
      <RecentEngagements />
    </>
  );
}
