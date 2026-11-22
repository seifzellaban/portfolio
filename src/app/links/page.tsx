import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { personJsonLd } from "@/lib/seo";
import { LinksHub } from "./links-hub";

export const metadata: Metadata = {
  title: "Links",
  description:
    "All of Seif Zakaria's links in one place: portfolio, Masons studio, services, socials, GitHub, email, and résumé.",
  alternates: { canonical: "/links" },
};

export default function LinksPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <LinksHub />
    </>
  );
}
