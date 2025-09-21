"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type DownloadResumeButtonProps = {
  variant: "default" | "outline" | "ghost" | "link";
  size: "sm" | "lg" | "icon";
};

export function DownloadResumeButton({
  variant,
  size,
}: DownloadResumeButtonProps) {
  const fileUrl = "/files/Seif Zakaria - Fullstack Software Engineer.pdf";
  const fileName = "Seif Zakaria - Fullstack Software Engineer.pdf";
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`mt-4 text-${size} mx-auto flex`}
      onClick={handleDownload}
    >
      <Download className="h-8 w-8" />
      Download Resume
    </Button>
  );
}
