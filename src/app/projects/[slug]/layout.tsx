import { MdxLayout } from "@/components/mdx-layout";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MdxLayout backLink="/#projects" backLabel="Back to Projects">
      {children}
    </MdxLayout>
  );
}
