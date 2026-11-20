import { site } from "@/lib/site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: "Fullstack Developer & Founder",
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    sameAs: site.socials.map((social) => social.href),
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AI integration",
      "Three.js",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    author: { "@type": "Person", name: site.name },
  };
}

export function projectJsonLd(project: {
  name: string;
  description: string;
  slug: string;
  imageUrl: string;
  demoUrl?: string;
  sourceUrl?: string;
  techStack?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    url: `${site.url}/projects/${project.slug}`,
    image: project.imageUrl.startsWith("http")
      ? project.imageUrl
      : `${site.url}${project.imageUrl}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    author: { "@type": "Person", name: site.name },
    ...(project.techStack?.length
      ? { keywords: project.techStack.join(", ") }
      : {}),
    ...(project.demoUrl || project.sourceUrl
      ? { sameAs: [project.demoUrl, project.sourceUrl].filter(Boolean) }
      : {}),
  };
}

export function logJsonLd(post: {
  title: string;
  summary: string;
  url: string;
  published: string;
  image: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    url: `${site.url}${post.url}`,
    mainEntityOfPage: `${site.url}${post.url}`,
    datePublished: post.published,
    author: {
      "@type": "Person",
      name: post.author || site.name,
      url: site.url,
    },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    ...(post.image
      ? {
          image: post.image.startsWith("http")
            ? post.image
            : `${site.url}${post.image}`,
        }
      : {}),
  };
}

export function serviceJsonLd(service: {
  title: string;
  metaDescription: string;
  id: string;
  priceRange: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: `${site.url}/services/${service.id}`,
    provider: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      description: service.priceRange,
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${site.url}${item.url}`,
    })),
  };
}
