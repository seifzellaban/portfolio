"use client";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
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

  if (pathname === backLink || pathname?.startsWith("/logs/tag")) {
    return <>{children}</>;
  }

  return (
    <div
      className="mt-8 flex min-h-screen flex-col bg-background text-foreground"
      data-mdx-page
    >
      <main
        id="main-content"
        className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 md:px-6"
      >
        <div className="mb-8">
          <Link
            href={backLink}
            className="mb-4 inline-flex items-center text-sm font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            <IconArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
          </Link>
          <div className="mt-2 h-[2px] w-12 bg-primary" />
        </div>
        {children}
      </main>
    </div>
  );
}
