import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Links`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    kicker: "Links",
    title: site.name,
    subtitle: "Software engineer · Founder of Masons · Cairo, Egypt",
  });
}
