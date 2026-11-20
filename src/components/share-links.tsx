"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { IconBrandX, IconCheck, IconLink } from "@tabler/icons-react";
import { track } from "@vercel/analytics";
import { site } from "@/lib/site";

export function ShareLinks({ title }: { title: string }) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const url = `${site.url}${pathname ?? ""}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("share_copy", { title });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can fail without permission; the X link still works.
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? <IconCheck size={13} /> : <IconLink size={13} />}
        {copied ? "Copied" : "Copy link"}
      </button>

      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("share_x", { title })}
        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <IconBrandX size={13} /> Share
      </a>
    </div>
  );
}
