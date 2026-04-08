"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-8 text-center max-w-md">
            A critical error occurred. Try refreshing the page or go back home.
          </p>
          <div className="flex gap-4">
            <Button onClick={reset} variant="outline">
              Try again
            </Button>
            <Button asChild>
              <Link href="/">Go home</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
