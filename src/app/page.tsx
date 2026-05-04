import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Services } from "@/components/home/Services";
import { WhyResearchMind } from "@/components/home/WhyResearchMind";
import { RecentEngagements } from "@/components/home/RecentEngagements";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Services />
      <WhyResearchMind />
      <RecentEngagements />
      <FinalCTA />
    </>
  );
}
