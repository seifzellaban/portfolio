"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadResumeButtonProps {
  fileUrl: string;
  fileName?: string;
}

export function DownloadResumeButton({
  fileUrl = "/files/Seif Zakaria - Fullstack Software Engineer.pdf",
  fileName = "Seif Zakaria - Fullstack Software Engineer.pdf",
}: DownloadResumeButtonProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <Button
      variant="default"
      size="lg"
      className="mt-4 text-lg mx-auto flex"
      onClick={handleDownload}
    >
      <Download className="h-8 w-8" />
      Download Resume
    </Button>
  );
}
