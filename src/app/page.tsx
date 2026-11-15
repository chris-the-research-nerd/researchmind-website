import { Hero } from "@/components/home/Hero";
import { ProofStrip } from "@/components/home/ProofStrip";
import { Practices } from "@/components/home/Practices";
import { FinalCTA } from "@/components/home/FinalCTA";

// ScrollQuestions (the scroll-driven question animation) is kept in
// components/home/ScrollQuestions.tsx; add <ScrollQuestions /> after <Hero /> to restore it.
export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Practices />
      <FinalCTA />
    </>
  );
}
