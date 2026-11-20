"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/lib/theme-provider";

export function Toaster() {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "border border-border/60 bg-card text-foreground font-sans text-sm",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
        },
      }}
    />
  );
}
