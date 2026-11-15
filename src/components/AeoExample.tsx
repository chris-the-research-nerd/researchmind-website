"use client";

import { useEffect, useRef, useState } from "react";

// An illustration of AI visibility work: the same question in an AI chat,
// before and after. The businesses are made up and the caption says so.

const QUESTION = "Who’s a good family dentist in Riverton that’s open on Saturdays?";
const YOU = "Maple Street Dental";

type Point = { name: string; text: string; source: string };
type Chat = {
  label: string;
  points: Point[];
  closing: React.ReactNode;
  verdict: string;
  verdictText: string;
  good: boolean;
};

const OTHERS: Point[] = [
  { name: "Brightside Dental", text: "open Saturdays and takes most insurance.", source: "Practice website" },
  { name: "Northgate Family Dentistry", text: "good with kids, with evening hours.", source: "Maps listing" },
];

const You = () => <span className="font-semibold text-[#ff9c9c]">{YOU}</span>;

const CHATS: Chat[] = [
  {
    label: "Before",
    points: OTHERS,
    closing: (
      <>
        I also found <You />, but I couldn&rsquo;t confirm its hours or whether it&rsquo;s taking new patients.
      </>
    ),
    verdict: "Missed.",
    verdictText: `${YOU} is an afterthought, and the assistant can’t confirm its details.`,
    good: false,
  },
  {
    label: "After",
    points: [
      { name: YOU, text: "open Saturdays 9 to 2 and taking new patients.", source: "Practice website" },
      ...OTHERS,
    ],
    closing: (
      <>
        <You /> has online booking. Want me to book you a Saturday appointment?
      </>
    ),
    verdict: "Found.",
    verdictText: `${YOU} is named first, the details are right, and the assistant offers to book.`,
    good: true,
  },
];

function ChatWindow({ chat, step }: { chat: Chat; step: number }) {
  // step: 0 question, 1 searched + intro, 2.. points, then closing, then verdict
  const show = (n: number) => `transition-opacity duration-500 ${step >= n ? "opacity-100" : "opacity-0"}`;
  const closingAt = 2 + chat.points.length;
  return (
    <div className="rounded-2xl bg-[#141418] text-[#ececf1] overflow-hidden flex flex-col flex-1 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
      <div className="px-4 pt-5 pb-4 space-y-3.5 text-sm leading-relaxed flex-1">
        <div className={`flex justify-end ${show(0)}`}>
          <p className="max-w-[86%] rounded-2xl rounded-br-md bg-white text-[#141418] px-3.5 py-2.5">{QUESTION}</p>
        </div>
        <div className={show(1)}>
          <p className="font-mono text-[11px] text-[#8e8ea0] mb-2.5">Searched the web</p>
          <p>Here are family dentists in Riverton with Saturday hours.</p>
        </div>
        <ul className="space-y-3">
          {chat.points.map((pt, i) => (
            <li key={pt.name} className={`flex gap-2.5 ${show(2 + i)}`}>
              <span className="text-[#ff9c9c] leading-relaxed" aria-hidden="true">
                •
              </span>
              <div>
                <p>
                  {pt.name === YOU ? <You /> : <span className="font-semibold">{pt.name}</span>}
                  <span className="font-semibold">:</span> <span className="text-[#c5c5d2]">{pt.text}</span>
                </p>
                <span className="inline-block mt-1.5 rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[11px] text-[#c5c5d2]">
                  {pt.source}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className={show(closingAt)}>{chat.closing}</p>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] pl-4 pr-2 py-2 text-sm text-[#8e8ea0]">
          Ask a question
          <span className="grid place-items-center w-7 h-7 rounded-full bg-white/15 text-white" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" />
            </svg>
          </span>
        </div>
      </div>

      <p
        className={`px-4 py-3 text-sm leading-relaxed border-t ${
          chat.good ? "border-[#7fd1a0]/30 bg-[#7fd1a0]/[0.08]" : "border-[#ff9c9c]/30 bg-[#ff9c9c]/[0.08]"
        } ${show(closingAt + 1)}`}
      >
        <span className={`font-semibold ${chat.good ? "text-[#7fd1a0]" : "text-[#ff9c9c]"}`}>{chat.verdict}</span>{" "}
        {chat.verdictText}
      </p>
    </div>
  );
}

export function AeoExample() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(-1);
  const LAST = 7;

  // Play the conversation once, when it scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setStep(LAST);
      return;
    }
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStep(0);
        timer = setInterval(() => {
          setStep((s) => {
            if (s >= LAST) {
              clearInterval(timer);
              return s;
            }
            return s + 1;
          });
        }, 550);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <figure ref={ref}>
      <figcaption className="text-xs font-semibold tracking-[0.12em] text-secondary uppercase mb-5">
        An example
      </figcaption>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {CHATS.map((chat) => (
          <div key={chat.label} className="flex flex-col">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-secondary mb-2.5">{chat.label}</p>
            <ChatWindow chat={chat} step={step} />
          </div>
        ))}
      </div>
      <p className="text-secondary text-xs mt-5">Illustration only. The town and the dentists are made up.</p>
    </figure>
  );
}
