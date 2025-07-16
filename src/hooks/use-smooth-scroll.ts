import { usePathname, useRouter } from "next/navigation";

export const useSmoothScroll = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 8; // 8px extra space
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (sectionId: string) => {
    // Only smooth scroll if already on the root path
    // Otherwise, navigate to the root with scrollTo param
    if (pathname === "/") {
      scrollToSection(sectionId);
    } else {
      router.push(`/?scrollTo=${sectionId}`);
    }
  };

  return { handleNav, scrollToSection };
};
