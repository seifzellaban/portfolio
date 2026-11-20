import { services } from "@/lib/services-data";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Service";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.id === slug);

  return renderOg({
    kicker: "Service",
    title: service?.title ?? "Services",
    subtitle: service?.description ?? siteSubtitle,
  });
}

const siteSubtitle = "Design, build, and launch support for web products.";
