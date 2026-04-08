import { notFound } from "next/navigation";
import { services } from "@/lib/services-data";
import ServiceDetail from "./service-detail";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
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
