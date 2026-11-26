import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOrderedServices, services } from "@/lib/services-data";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import ServiceDetail from "./service-detail";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "Service not found",
    };
  }

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      type: "website",
      title: `${service.title} — ${site.name}`,
      description: service.metaDescription,
      url: `${site.url}/services/${service.id}`,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — ${site.name}`,
      description: service.metaDescription,
      creator: "@seifzellaban",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ordered = getOrderedServices();
  const index = ordered.findIndex((s) => s.id === slug);

  if (index === -1) {
    notFound();
  }

  const service = ordered[index];
  const previous = index > 0 ? ordered[index - 1] : undefined;
  const next = index < ordered.length - 1 ? ordered[index + 1] : undefined;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.title, url: `/services/${service.id}` },
          ]),
        ]}
      />
      <ServiceDetail
        service={service}
        index={index}
        total={ordered.length}
        previous={
          previous ? { id: previous.id, title: previous.title } : undefined
        }
        next={next ? { id: next.id, title: next.title } : undefined}
      />
    </>
  );
}
