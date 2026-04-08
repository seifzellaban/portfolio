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
      <MdxLayout backLink="/logs" backLabel="Back to Logs">
        {children}
      </MdxLayout>
      <Contact />
      <Signature />
    </>
  );
}
