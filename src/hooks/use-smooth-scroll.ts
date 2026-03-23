import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";

export const useSmoothScroll = () => {
  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el && lenis) {
      lenis.scrollTo(el, {
        offset: -8,
        duration: 1.5,
      });
    } else if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 8;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (sectionId: string) => {
    if (pathname === "/") {
      scrollToSection(sectionId);
    } else {
      router.push(`/?scrollTo=${sectionId}`);
    }
  };

  return { handleNav, scrollToSection };
};
