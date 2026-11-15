"use client";

import { useEffect, useState } from "react";
import { AskYourAI, type AgentReason } from "@/components/AskYourAI";
import { LinkedInMessage } from "@/components/LinkedInMessage";
import { ContactForm } from "@/components/ContactForm";

// The contact page's three ways to reach us. When a visitor arrives from a
// service (e.g. /contact?for=ai), every option starts set to that service.

export const TOPICS: Record<AgentReason, string> = {
  research: "Research & Strategy Consulting",
  ai: "AI Solutions Consulting",
  visibility: "AI Visibility (AEO)",
  general: "Not sure yet",
};

function isReason(v: string | null): v is AgentReason {
  return v === "research" || v === "ai" || v === "visibility" || v === "general";
}

export function ContactSections() {
  const [reason, setReason] = useState<AgentReason>("general");

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("for");
    if (isReason(v)) setReason(v);
  }, []);

  return (
    <>
      {reason !== "general" ? (
        <p className="mb-8 inline-flex items-center gap-2 text-sm rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5">
          <span className="text-secondary">About:</span>
          <span className="font-medium text-accent">{TOPICS[reason]}</span>
        </p>
      ) : null}

      <section>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Let your AI assistant write it</h2>
        <p className="text-secondary text-base leading-relaxed mt-1 mb-6">
          ChatGPT, Claude, Grok, and others can look up your business and ours, then draft an introduction for you
          to approve.
        </p>
        <AskYourAI key={reason} reason={reason} inline />
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Message Tanaz on LinkedIn</h2>
        <p className="text-secondary text-base leading-relaxed mt-1 mb-6">
          Prefer to talk to a person first? Send our founder a note.
        </p>
        <LinkedInMessage topic={reason === "general" ? undefined : TOPICS[reason]} />
      </section>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Or send us an email</h2>
        <p className="text-secondary text-base leading-relaxed mt-1 mb-6">
          Tell us what you&apos;re working on and we&apos;ll get back to you.
        </p>
        <ContactForm key={reason} topic={TOPICS[reason]} topics={Object.values(TOPICS)} />
      </section>
    </>
  );
}
