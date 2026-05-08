"use client";
import { ReactNode, useEffect } from "react";
import Dock from "@/components/dock";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function MdxLayout({
  children,
  backLink = "/logs",
  backLabel = "Back to Logs",
}: {
  children: ReactNode;
  backLink?: string;
  backLabel?: string;
}) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("mdx-page");
    return () => {
      document.body.classList.remove("mdx-page");
    };
  }, []);

  if (pathname === backLink) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-background text-foreground mt-8"
      data-mdx-page
    >
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-10">
        <div className="mb-8">
          <Link
            href={backLink}
            className="inline-flex items-center text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
          </Link>
          <div className="h-[2px] w-12 bg-primary mt-2" />
        </div>
        {children}
      </main>

      <Dock />
    </div>
  );
}
