import { rollingQuestions } from "@/content/home";

type RollingQuestionsProps = {
  questions?: string[];
  durationSec?: number;
};

export function RollingQuestions({
  questions = rollingQuestions,
  durationSec = 60,
}: RollingQuestionsProps) {
  const set = [...questions, ...questions, ...questions];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

      <div
        className="flex w-max items-center"
        style={{ animation: `scroll ${durationSec}s linear infinite` }}
      >
        {[...set, ...set].map((q, i) => (
          <div key={`${i}-${q}`} className="flex items-center shrink-0">
            <span className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground whitespace-nowrap px-8">
              {q}
            </span>
            <span
              className="text-accent text-2xl md:text-3xl select-none"
              aria-hidden="true"
            >
              •
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
