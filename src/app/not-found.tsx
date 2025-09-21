"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="text-muted-foreground">
          Maybe you took a wrong turn. No shame in that. Happens to the best of
          us.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/" className="flex items-center gap-2">
            Back to Home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
