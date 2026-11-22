"use client";

import { IconArrowUpRight, IconFileText } from "@tabler/icons-react";
import { useResumeModal } from "@/components/resume-modal";
import { cn } from "@/lib/utils";

type DownloadResumeButtonProps = {
  label?: string;
  className?: string;
};

export function DownloadResumeButton({
  label = "Open Résumé",
  className,
}: DownloadResumeButtonProps) {
  const { openResumeModal } = useResumeModal();

  return (
    <button
      type="button"
      onClick={openResumeModal}
      className={cn(
        "group inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto",
        className
      )}
    >
      <IconFileText size={15} />
      <span>{label}</span>
      <IconArrowUpRight
        size={14}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </button>
  );
}
