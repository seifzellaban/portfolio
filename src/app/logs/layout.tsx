import { MdxLayout } from "@/components/mdx-layout";
import { Contact } from "@/components/sections/contact";
import Signature from "@/components/signature";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MdxLayout>{children}</MdxLayout>
      <Contact />
      <Signature />
    </>
  );
}
