"use client";

import { useState, FormEvent } from "react";
import { getDictionary, Locale } from "@/lib/i18n";

export function SubscribeForm({
  source = "blog",
  locale = "en",
}: {
  source?: string;
  locale?: Locale;
}) {
  const dict = getDictionary(locale);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget as HTMLFormElement;
    const company = (form.elements.namedItem("company") as HTMLInputElement)
      ?.value;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company, locale }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? dict.subscribeErrorGeneric);
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError(dict.subscribeErrorNetwork);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-sm font-medium text-success">
        {dict.subscribeSuccess}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.subscribeEmailPlaceholder}
          className="flex-1 min-w-0 border border-border rounded-md px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rust/40 focus:border-rust"
        />
        {/* Honeypot: hidden from real users, bots tend to fill every field. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-rust hover:bg-rust-deep disabled:opacity-60 text-cream font-semibold text-sm rounded-md px-4 py-2.5 whitespace-nowrap cursor-pointer transition-colors"
        >
          {status === "loading" ? dict.subscribeButtonLoading : dict.subscribeButton}
        </button>
      </div>
      {status === "error" ? (
        <p className="text-xs text-rust-deep">{error}</p>
      ) : null}
    </form>
  );
}
