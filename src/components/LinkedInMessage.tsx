"use client";

import { useState } from "react";

// "Message us on LinkedIn": copy a ready-made opener, open the ResearchMind
// company page, press Message, paste. LinkedIn has no reliable link that pre-fills a message.

export const RM_LINKEDIN = "https://www.linkedin.com/company/research-mind-consulting/";


export function LinkedInMessage({ topic }: { topic?: string } = {}) {
  const [copied, setCopied] = useState(false);
  const helpWith = topic ? topic.replace(" (AEO)", "").toLowerCase().replace(/\bai\b/g, "AI").replace(/aeo/g, "AEO") : "";
  const MESSAGE = `Hi Tanaz, I'd like your help with ${helpWith ? `${helpWith}: [what you're working on]` : "[what you're working on]"}. Our website is [your website].`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MESSAGE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-white p-5 md:p-6">
      <ol className="space-y-4 text-base">
        <li>
          <p className="font-medium">1. Copy this message:</p>
          <p className="mt-2 rounded-lg bg-muted px-3.5 py-2.5 text-sm leading-relaxed">
            Hi Tanaz, I&rsquo;d like your help with {helpWith ? `${helpWith}: ` : ""}
            <span className="px-1 rounded bg-accent/10 text-accent">what you&rsquo;re working on</span>. Our website
            is <span className="px-1 rounded bg-accent/10 text-accent">your website</span>.
          </p>
          <button
            type="button"
            onClick={copy}
            className="mt-2 text-sm font-medium underline underline-offset-2 hover:text-accent"
          >
            {copied ? "Copied" : "Copy message"}
          </button>
        </li>
        <li>
          <p className="font-medium">2. On the ResearchMind LinkedIn page, press Message.</p>
        </li>
        <li>
          <p className="font-medium">3. Paste the message, fill in the brackets, and send it.</p>
        </li>
      </ol>
      <a
        href={RM_LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 bg-foreground text-white px-5 py-2.5 text-sm font-medium rounded hover:bg-accent transition-colors"
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        Open LinkedIn <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
