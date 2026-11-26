import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { linksPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { LinksHub } from "./links-hub";

export const metadata: Metadata = {
  title: "Links",
  description:
    "All of Seif Zakaria's links in one place: portfolio, Masons studio, services, socials, GitHub, email, and résumé.",
  alternates: { canonical: "/links" },
  openGraph: {
    type: "profile",
    url: `${site.url}/links`,
    siteName: site.name,
    title: `Links — ${site.name}`,
    description:
      "All of Seif Zakaria's links in one place: portfolio, Masons studio, services, socials, GitHub, email, and résumé.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Links — ${site.name}`,
    description:
      "All of Seif Zakaria's links in one place: portfolio, Masons studio, services, socials, GitHub, email, and résumé.",
  },
};

export default function LinksPage() {
  return (
    <>
      <JsonLd data={linksPageJsonLd()} />
      <LinksHub />
    </>
  );
}
