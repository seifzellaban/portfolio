"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const inputId = useId();
  const hintId = `${inputId}-hint`;
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    kind: "idle" | "success" | "error";
    message: string;
  }>({ kind: "idle", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setStatus({ kind: "idle", message: "" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      track("newsletter_subscribe");
      setStatus({
        kind: "success",
        message: "Thanks for subscribing — check your inbox.",
      });
      setEmail("");
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div
        className={
          compact
            ? "flex flex-col items-stretch gap-2"
            : "flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        }
      >
        <Input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="yourname@provider.com"
          aria-describedby={hintId}
          className="bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/20"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <Button
          type="submit"
          variant="default"
          className="w-full whitespace-nowrap sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${inputId}-website`}>Website</label>
        <input
          id={`${inputId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <p
        id={hintId}
        className="mt-3 text-xs leading-relaxed text-muted-foreground/80"
      >
        No spam, unsubscribe anytime. See the{" "}
        <Link
          href="/privacy"
          className="underline decoration-primary/40 underline-offset-2 hover:text-foreground"
        >
          privacy note
        </Link>
        .
      </p>
      <p
        role="status"
        aria-live="polite"
        className={`mt-2 text-xs ${
          status.kind === "success"
            ? "text-primary"
            : status.kind === "error"
              ? "text-destructive"
              : "sr-only"
        }`}
      >
        {status.message}
      </p>
    </form>
  );
}
