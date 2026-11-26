import { site } from "@/lib/site";

export const PERSON_ID = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;
export const PROFILE_PAGE_ID = `${site.url}/#profilepage`;
export const PORTRAIT_ID = `${site.url}/#portrait`;
export const ORG_ID = `${site.url}/#masons`;

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  if (pathOrUrl === "/") return `${site.url}/`;
  return `${site.url}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    givenName: "Seif",
    familyName: "Zakaria",
    alternateName: [...site.alternateNames],
    identifier: site.handle,
    url: `${site.url}/`,
    mainEntityOfPage: { "@id": PROFILE_PAGE_ID },
    image: {
      "@type": "ImageObject",
      "@id": PORTRAIT_ID,
      url: `${site.url}${site.portrait}`,
      contentUrl: `${site.url}${site.portrait}`,
      caption: "Seif Zakaria — Full-Stack Software Engineer and Founder of Masons",
    },
    email: `mailto:${site.email}`,
    jobTitle: "Full-Stack Software Engineer & Founder",
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    homeLocation: {
      "@type": "Place",
      name: "Cairo, Egypt",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Ain Shams University",
      url: "https://www.asu.edu.eg/",
    },
    worksFor: { "@id": ORG_ID },
    affiliation: [
      { "@id": ORG_ID },
      { "@type": "Organization", name: "Concentrix" },
      {
        "@type": "Organization",
        name: "Ain Shams University",
        url: "https://www.asu.edu.eg/",
      },
    ],
    sameAs: site.socials.map((social) => social.href),
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Go",
      "Python",
      "Node.js",
      "PostgreSQL",
      "Convex",
      "AI Integration",
      "Audio DSP",
      "Three.js",
      "Technical SEO",
      "Linux",
    ],
    knowsLanguage: ["English", "Arabic"],
  };
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.organization.name,
    alternateName: site.organization.alternateName,
    url: site.organization.url,
    description: site.organization.description,
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${site.url}/`,
    name: site.name,
    alternateName: ["seifzellaban", "Seif Zakaria Portfolio"],
    description: site.description,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

function breadcrumbNode(items: Array<{ name: string; url: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url),
    })),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    ...personNode(),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    ...websiteNode(),
  };
}

export function homeGraphJsonLd(options?: { dateModified?: string }) {
  const profilePageNode = {
    "@type": "ProfilePage",
    "@id": PROFILE_PAGE_ID,
    url: `${site.url}/`,
    name: site.title,
    description: site.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
    primaryImageOfPage: { "@id": PORTRAIT_ID },
    ...(options?.dateModified ? { dateModified: options.dateModified } : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(),
      profilePageNode,
      personNode(),
      organizationNode(),
    ],
  };
}

export function linksPageJsonLd() {
  const profilePageNodeForLinks = {
    "@type": "ProfilePage",
    "@id": `${site.url}/links#profilepage`,
    url: `${site.url}/links`,
    name: `Links — ${site.name}`,
    description:
      "All of Seif Zakaria's links in one place: portfolio, Masons studio, services, socials, GitHub, email, and résumé.",
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      profilePageNodeForLinks,
      personNode(),
      breadcrumbNode([
        { name: "Home", url: "/" },
        { name: "Links", url: "/links" },
      ]),
    ],
  };
}

export function collectionPageJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: toAbsoluteUrl(url),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: toAbsoluteUrl(item.url),
      })),
    },
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
  year?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    url: toAbsoluteUrl(`/projects/${project.slug}`),
    image: toAbsoluteUrl(project.imageUrl),
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: site.name,
      url: `${site.url}/`,
    },
    creator: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    ...(project.year ? { dateCreated: project.year } : {}),
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
  tags?: string[];
  wordCount?: number;
  readingTime?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    url: toAbsoluteUrl(post.url),
    mainEntityOfPage: toAbsoluteUrl(post.url),
    ...(post.published
      ? {
          datePublished: post.published,
          dateModified: post.published,
        }
      : {}),
    inLanguage: "en",
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: post.author || site.name,
      url: `${site.url}/`,
    },
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: site.name,
      url: `${site.url}/`,
    },
    isPartOf: { "@id": WEBSITE_ID },
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
    ...(post.readingTime ? { timeRequired: `PT${post.readingTime}M` } : {}),
    ...(post.image ? { image: toAbsoluteUrl(post.image) } : {}),
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
    serviceType: service.title,
    description: service.metaDescription,
    url: toAbsoluteUrl(`/services/${service.id}`),
    provider: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: site.name,
      url: `${site.url}/`,
    },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      description: service.priceRange,
    },
  };
}

export function faqJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    ...breadcrumbNode(items),
  };
}
