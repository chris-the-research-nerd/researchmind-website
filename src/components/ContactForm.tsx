"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <p className="font-heading text-lg font-medium mb-2">Thanks for reaching out.</p>
        <p className="text-secondary text-base leading-[1.65]">We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full border border-border bg-white px-4 py-3 text-sm rounded focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground/10 transition-colors duration-200"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border border-border bg-white px-4 py-3 text-sm rounded focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground/10 transition-colors duration-200"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full border border-border bg-white px-4 py-3 text-sm rounded focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground/10 transition-colors duration-200 resize-none"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
      <button
        type="submit"
        className="bg-foreground text-white px-8 py-3.5 text-sm font-medium tracking-[0.02em] rounded hover:bg-accent transition-colors duration-200"
      >
        Send message
      </button>
    </form>
  );
}
