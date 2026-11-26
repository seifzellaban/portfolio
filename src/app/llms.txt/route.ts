import { getProjects } from "@/lib/projects";
import { getSortedPosts } from "@/lib/posts";
import { services } from "@/lib/services-data";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function GET() {
  const projects = getProjects();
  const posts = getSortedPosts().filter((post) => !post.hidden);

  const lines: string[] = [
    `# ${site.name} (@${site.handle})`,
    "",
    `> ${site.description}`,
    "",
    "## Identity & Disambiguation",
    `- Full Name: ${site.name}`,
    `- Handle: @${site.handle}`,
    `- Location: ${site.location}`,
    `- Role: Full-Stack Software Engineer & Founder of ${site.organization.name} (${site.organization.url})`,
    "- Education: B.Sc. in Computer Science & Statistics, Ain Shams University (Cairo, Egypt)",
    "- Current Operations: Lead Software Engineer at Masons; Technical Support Specialist at Concentrix (US consumer electronics queue)",
    "- Core Stack: TypeScript, Next.js, React, Go, Python, Node.js, Convex, PostgreSQL, Three.js, Linux",
    "",
    "## Official Profiles & Links",
    `- Portfolio (Canonical): ${site.url}/`,
    `- Links Hub: ${site.url}/links`,
    `- Masons Studio: ${site.organization.url}`,
    ...site.socials.map((social) => `- ${social.label}: ${social.href}`),
    `- Email: ${site.email}`,
    `- RSS Feed: ${site.url}/feed.xml`,
    "",
    "## Services",
    ...services.map(
      (service) =>
        `- [${service.title}](${site.url}/services/${service.id}): ${service.description}`
    ),
    "",
    "## Selected Projects",
    ...projects.map(
      (project) =>
        `- [${project.name}](${site.url}/projects/${project.slug}): ${project.description}`
    ),
    "",
    "## Engineering Logs & Essays",
    ...posts.map(
      (post) =>
        `- [${post.title}](${site.url}${post.url}) (${post.published}): ${post.summary}`
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
