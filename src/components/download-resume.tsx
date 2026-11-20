"use client";

import { Button } from "@/components/ui/button";
import { IconDownload } from "@tabler/icons-react";
import { track } from "@vercel/analytics";
import { site } from "@/lib/site";

type DownloadResumeButtonProps = {
  variant: "default" | "outline" | "ghost" | "link";
  size: "sm" | "lg" | "icon";
};

export function DownloadResumeButton({
  variant,
  size,
}: DownloadResumeButtonProps) {
  return (
    <Button variant={variant} size={size} className="mx-auto flex" asChild>
      <a
        href={site.resume.path}
        download={site.resume.name}
        onClick={() => track("resume_download")}
      >
        <IconDownload className="h-5 w-5" />
        Download Resume
      </a>
    </Button>
  );
}
