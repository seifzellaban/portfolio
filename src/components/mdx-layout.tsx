"use client";
import { ReactNode } from "react";
import Dock from "@/components/dock";

export function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground mt-8">
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-10">
        {children}
      </main>

      <Dock />
    </div>
  );
}
