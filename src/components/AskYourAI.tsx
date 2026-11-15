"use client";

import { useEffect, useRef, useState } from "react";
import { AssistantIcon } from "./AssistantIcon";

// "Ask your AI to reach out". The visitor picks a request and an assistant and
// sees, right on the page, an example of the chat: their message, then the
// assistant's draft email. "Open in ..." then launches that assistant with the
// prompt, which points it at /agents so it looks up their business and drafts
// a real introduction for them to approve.

export type AgentReason = "research" | "ai" | "visibility" | "general";

const SITE = "https://www.researchmindconsulting.com";
const EMAIL = "info@researchmindconsulting.com";

const SUGGESTIONS: Record<AgentReason, string[]> = {
  research: [
    "Find out what our customers think of us",
    "Work out what to fix or improve first",
    "Test a new product, price, or idea before we launch",
    "Run a customer or member survey we can act on",
  ],
  ai: [
    "Find where AI could save my team time",
    "Build an AI tool around how we work",
    "Run an AI workshop for my team",
    "Make an AI plan leadership can sign off on",
  ],
  visibility: [
    "Check whether ChatGPT recommends my business",
    "Fix wrong or outdated things AI says about us",
    "Show up in AI answers where competitors do",
    "Make my site easy for AI agents to book or contact us",
  ],
  general: [
    "I'm not sure what I need yet",
    "Find out why customers choose us, or don't",
    "Get started with AI",
    "Show up when customers ask AI for recommendations",
  ],
};

const SUBJECT_PREFIX: Record<AgentReason, string> = {
  research: "Research",
  ai: "AI solutions",
  visibility: "AI visibility",
  general: "Introduction",
};

type Assistant = { name: string; url?: (q: string) => string; openUrl?: string };
const ASSISTANTS: Assistant[] = [
  { name: "ChatGPT", url: (q) => `https://chatgpt.com/?q=${q}` },
  { name: "Claude", url: (q) => `https://claude.ai/new?q=${q}` },
  { name: "Grok", url: (q) => `https://grok.com/?q=${q}` },
  { name: "Perplexity", url: (q) => `https://www.perplexity.ai/search?q=${q}` },
  // Gemini has no prefill link: copy the prompt, then open it
  { name: "Gemini", openUrl: "https://gemini.google.com/app" },
];

function buildPrompt(reason: AgentReason, request: string) {
  const need = request.trim() || "what my organization needs";
  return (
    `Introduce me to ResearchMind, a research and consulting firm, about this: "${need}". ` +
    `Before you write anything, look up my business (ask me for its website if you don't know it) and ResearchMind, so the draft is accurate. ` +
    `Then open this exact link and follow its instructions: ${SITE}/agents?for=${reason}`
  );
}

function needPhrase(request: string) {
  const r = request.trim();
  if (!r || /^i'?m not sure/i.test(r)) return "work out what they need";
  return r.charAt(0).toLowerCase() + r.slice(1).replace(/[.!?]+$/, "");
}

// Placeholder chips inside the example draft
function Ph({ children }: { children: React.ReactNode }) {
  return <span className="px-1 rounded bg-accent/10 text-accent">{children}</span>;
}

function Panel({ reason, compact }: { reason: AgentReason; compact?: boolean }) {
  const [request, setRequest] = useState(SUGGESTIONS[reason][0]);
  const [custom, setCustom] = useState("");
  const [ai, setAi] = useState(0);
  const [shown, setShown] = useState(1); // 0..1 reveal of the reply
  const [note, setNote] = useState("");
  const [full, setFull] = useState(false);

  const need = custom || request;
  const prompt = buildPrompt(reason, need);
  const assistant = ASSISTANTS[ai];

  // Replay a short "typing" reveal whenever the request or assistant changes
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 900);
      setShown(k);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ai, request, custom]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      return true;
    } catch {
      return false;
    }
  };
  const launch = async () => {
    if (assistant.url) {
      window.open(assistant.url(encodeURIComponent(prompt)), "_blank", "noopener,noreferrer");
      return;
    }
    const ok = await copy();
    setNote(ok ? `Prompt copied. Paste it into ${assistant.name}.` : `Copy the message above and paste it into ${assistant.name}.`);
    window.open(assistant.openUrl, "_blank", "noopener,noreferrer");
  };

  const lines = 5;
  const visible = (i: number) => shown >= (i + 1) / (lines + 1);
  const unsure = !need.trim() || /^i'?m not sure/i.test(need.trim());
  const subject = `${SUBJECT_PREFIX[reason]}: ${unsure ? "working out what we need" : need.trim()}`;

  return (
    <div>
      <fieldset>
        <legend className="text-xs font-semibold tracking-[0.12em] uppercase text-secondary mb-3">
          1. What do you need?
        </legend>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS[reason].map((s) => {
            const on = !custom && s === request;
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setRequest(s);
                  setCustom("");
                }}
                aria-pressed={on}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  on ? "border-accent bg-accent text-white" : "border-border bg-white hover:border-secondary"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        <label className="block mt-3">
          <span className="sr-only">Or describe it in your own words</span>
          <input
            type="text"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Or describe it in your own words"
            className="w-full border border-border bg-white px-3.5 py-2.5 text-sm rounded focus:outline-none focus:border-foreground"
          />
        </label>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-xs font-semibold tracking-[0.12em] uppercase text-secondary mb-3">
          2. Pick your assistant
        </legend>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Assistant">
          {ASSISTANTS.map((a, i) => (
            <button
              key={a.name}
              type="button"
              role="tab"
              aria-selected={i === ai}
              onClick={() => {
                setAi(i);
                setNote("");
              }}
              className={`inline-flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-md border transition-colors ${
                i === ai ? "border-foreground bg-foreground text-white" : "border-border bg-white hover:border-secondary"
              }`}
            >
              <AssistantIcon name={a.name} />
              {a.name}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Example chat, shown right on the page */}
      <div className="mt-5 rounded-xl border border-border bg-white overflow-hidden" role="tabpanel">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/60">
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            <AssistantIcon name={assistant.name} size={18} />
            {assistant.name}
          </span>
          <span className="text-[11px] tracking-[0.08em] uppercase text-secondary">Example · drafting for you</span>
        </div>
        <div className={`p-4 space-y-4 ${compact ? "" : "md:p-5"}`}>
          <div className="flex flex-col items-end">
            <div className="max-w-[88%] rounded-2xl rounded-br-sm bg-muted px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground">
              <p className={full ? "" : "line-clamp-3"}>{prompt}</p>
            </div>
            <button
              type="button"
              onClick={() => setFull((f) => !f)}
              className="text-[11px] text-secondary hover:text-foreground mt-1 mr-1"
            >
              {full ? "Show less" : "Show full message"}
            </button>
          </div>
          <div className="text-[13px] leading-relaxed text-foreground space-y-2.5" aria-live="polite">
            <p className={`transition-opacity duration-300 ${visible(0) ? "opacity-100" : "opacity-0"}`}>
              I looked up your business and ResearchMind. Here&rsquo;s a draft email to {EMAIL}. Nothing sends until
              you approve it.
            </p>
            <div
              className={`rounded-lg border border-border p-3.5 space-y-2 transition-opacity duration-300 ${
                visible(1) ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-secondary">
                <span className="font-medium text-foreground">Subject:</span> {subject}
              </p>
              <p className={`transition-opacity duration-300 ${visible(2) ? "opacity-100" : "opacity-0"}`}>
                Hi ResearchMind team, I&rsquo;m {assistant.name}, writing for <Ph>your name</Ph> at{" "}
                <Ph>your business</Ph> (<Ph>your website</Ph>).
              </p>
              <p className={`transition-opacity duration-300 ${visible(3) ? "opacity-100" : "opacity-0"}`}>
                They&rsquo;d like help to {needPhrase(need)}. <Ph>One line about the business, from its website.</Ph>
              </p>
              <p className={`transition-opacity duration-300 ${visible(4) ? "opacity-100" : "opacity-0"}`}>
                Could you reply by email, or suggest a 30-minute call?
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-t border-border">
          <button
            type="button"
            onClick={launch}
            className="inline-flex items-center gap-1.5 bg-foreground text-white px-4 py-2 text-sm font-medium rounded hover:bg-accent transition-colors"
          >
            Open in {assistant.name} <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            onClick={async () => setNote((await copy()) ? "Message copied. Paste it into any assistant." : "Copy the message above.")}
            className="text-sm text-secondary hover:text-foreground underline underline-offset-2"
          >
            Copy message
          </button>
          {note ? (
            <span className="text-sm text-accent" role="status">
              {note}
            </span>
          ) : null}
        </div>
      </div>
      <p className="text-xs text-secondary mt-3">
        Your assistant fills in the details from what it knows and from your website. You review it before anything
        is sent.
      </p>
    </div>
  );
}

export function AskYourAI({
  reason = "general",
  label = "Ask your AI to reach out",
  variant = "secondary",
  inline = false,
}: {
  reason?: AgentReason;
  label?: string;
  variant?: "primary" | "secondary" | "link";
  inline?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // The reason is locked when the dialog opens, so a changing page doesn't swap it mid-use
  const [r, setR] = useState<AgentReason>(reason);
  const [openCount, setOpenCount] = useState(0);

  if (inline) return <Panel reason={reason} />;

  const open = () => {
    setR(reason);
    setOpenCount((c) => c + 1);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const triggerClass =
    variant === "primary"
      ? "inline-flex items-center justify-center bg-foreground text-white px-8 py-3.5 text-sm font-medium tracking-[0.02em] rounded hover:bg-accent transition-colors duration-200"
      : variant === "link"
        ? "inline-flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors"
        : "inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-[0.02em] rounded border border-foreground hover:bg-foreground hover:text-white transition-colors duration-200";

  return (
    <>
      <button type="button" onClick={open} className={triggerClass}>
        {label}
        {variant === "link" ? " →" : null}
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="w-[min(620px,calc(100vw-32px))] max-h-[calc(100dvh-32px)] overflow-y-auto rounded-xl p-0 backdrop:bg-black/40 backdrop:backdrop-blur-[2px] shadow-xl m-auto"
      >
        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-accent">Ask your AI</p>
              <h2 className="font-heading text-2xl font-semibold tracking-tight mt-1">
                Let your assistant draft the introduction
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="text-secondary hover:text-foreground text-2xl leading-none -mt-1"
            >
              ×
            </button>
          </div>
          <Panel key={`${r}-${openCount}`} reason={r} compact />
        </div>
      </dialog>
    </>
  );
}
