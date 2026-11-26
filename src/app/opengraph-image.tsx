import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    kicker: "seifzellaban.com",
    title: site.name,
    subtitle: "Full-stack software engineer & founder of Masons in Cairo, Egypt.",
  });
}
