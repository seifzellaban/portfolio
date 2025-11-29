"use client";
import { ReactNode, useEffect } from "react";
import Dock from "@/components/dock";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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

  const Header = () => (
    <div className="mb-12">
      <Link
        href="/logs"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Logs
      </Link>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col bg-background text-foreground mt-8"
      data-mdx-page
    >
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-10">
        <Header />
        {children}
      </main>

      <Dock />
    </div>
  );
}
