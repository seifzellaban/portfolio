import { notFound } from "next/navigation";
import { services } from "@/lib/services-data";
import ServiceDetail from "./service-detail";
import { Metadata } from "next";

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
      title: `${service.title} — Seif Zakaria`,
      description: service.metaDescription,
      url: `https://seifzellaban.com/services/${service.id}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
