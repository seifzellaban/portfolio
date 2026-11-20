"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UnsubscribeForm() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    kind: "idle" | "success" | "error";
    message: string;
  }>({ kind: "idle", message: "" });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus({ kind: "idle", message: "" });

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Could not process that request.");

      setStatus({
        kind: "success",
        message: "You're off the list. No hard feelings.",
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
      <label
        htmlFor={inputId}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
      >
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id={inputId}
          type="email"
          autoComplete="email"
          placeholder="yourname@provider.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading} className="whitespace-nowrap">
          {isLoading ? "Removing..." : "Unsubscribe"}
        </Button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={`mt-4 text-sm ${
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
