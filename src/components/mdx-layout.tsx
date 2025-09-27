"use client";
import { ReactNode, useEffect } from "react";
import Dock from "@/components/dock";

export function MdxLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.classList.add("mdx-page");
    return () => {
      document.body.classList.remove("mdx-page");
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-background text-foreground mt-8"
      data-mdx-page
    >
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-10">
        {children}
      </main>

      <Dock />
    </div>
  );
}
