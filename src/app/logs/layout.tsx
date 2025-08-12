import { MdxLayout } from "@/components/mdx-layout";
import { Contact } from "@/components/sections/contact";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MdxLayout>
      {children}
      <Contact />
    </MdxLayout>
  );
}
