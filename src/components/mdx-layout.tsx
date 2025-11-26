"use client";
import { ReactNode, useEffect } from "react";
import Dock from "@/components/dock";
import { usePathname } from "next/navigation";

export function MdxLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("mdx-page");
    return () => {
      document.body.classList.remove("mdx-page");
    };
  }, []);

  if (pathname == "/logs") {
    return <>{children}</>;
  }

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
