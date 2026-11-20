import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    kicker: "Portfolio",
    title: "Fullstack developer & founder.",
    subtitle: `Selected work, writing, and services from ${site.location}.`,
  });
}
