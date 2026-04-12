import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://seifzellaban.wiki";

  const logs = [
    "tesseract",
    "the-manuscript",
    "misread-productivity",
    "msp",
    "msp/rules",
    "osc",
    "osc/x",
    "wbh",
  ].map((slug) => ({
    url: `${baseUrl}/logs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projects = ["umbra", "masons", "orbit", "repai"].map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const services = [
    "web-development",
    "ui-ux-design",
    "seo-digital-marketing",
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/logs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...logs,
    ...projects,
    ...services,
  ];
}
