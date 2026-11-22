"use client";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconDeviceDesktopCode,
  IconUser,
  IconSun,
  IconMoon,
  IconBrandLinkedin,
  IconLink,
  IconBriefcase,
  IconNotebook,
  IconMail,
  IconDownload,
} from "@tabler/icons-react";
import { useTheme } from "@/lib/theme-provider";
import { LogoSvg } from "@/components/logo";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useResumeModal } from "@/components/resume-modal";
import { site } from "@/lib/site";

export default function Dock() {
  const { theme, toggleTheme } = useTheme();
  const { handleNav } = useSmoothScroll();
  const { openResumeModal } = useResumeModal();
  const isDark = theme === "dark";

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    toggleTheme({ x, y });
  };

  const iconClass =
    "h-full w-full text-muted-foreground dark:text-foreground/80";

  const links = [
    {
      title: "Home",
      icon: <IconHome className={iconClass} />,
      onClick: () => handleNav("home"),
      mobile: true,
    },
    {
      title: "About",
      icon: <IconUser className={iconClass} />,
      onClick: () => handleNav("about"),
      mobile: true,
    },
    {
      title: "Services",
      icon: <IconBriefcase className={iconClass} />,
      href: "/services",
      mobile: true,
    },
    {
      title: "Projects",
      icon: <IconDeviceDesktopCode className={iconClass} />,
      onClick: () => handleNav("projects"),
      mobile: true,
    },
    {
      title: "Logs",
      icon: <IconNotebook className={iconClass} />,
      href: "/logs",
      mobile: true,
    },
    {
      title: "Contact",
      icon: <IconMail className={iconClass} />,
      onClick: () => handleNav("contact"),
      mobile: true,
    },
    {
      title: "Masons",
      icon: (
        <LogoSvg
          className={`${iconClass} scale-150 fill-current`}
        />
      ),
      href: "https://wearemasons.com",
      mobile: true,
    },
    {
      title: "Links",
      icon: <IconLink className={iconClass} />,
      href: "/links",
      mobile: true,
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className={iconClass} />,
      href: site.socials.find((s) => s.label === "LinkedIn")?.href,
      mobile: false,
    },
    {
      title: "X",
      icon: <IconBrandX className={iconClass} />,
      href: site.socials.find((s) => s.label === "X")?.href,
      mobile: false,
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className={iconClass} />,
      href: site.socials.find((s) => s.label === "GitHub")?.href,
      mobile: false,
    },
    {
      title: "Resume",
      icon: <IconDownload className={iconClass} />,
      onClick: openResumeModal,
      mobile: true,
    },
    {
      title: "Toggle theme",
      icon: (
        <div className="relative h-full w-full">
          <IconSun
            className={`${iconClass} transition-all duration-200 ${
              isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
          />
          <IconMoon
            className={`${iconClass} absolute inset-0 transition-all duration-200 ${
              isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            }`}
          />
        </div>
      ),
      onClick: handleThemeToggle,
      mobile: true,
    },
  ];

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 md:bottom-8">
      <FloatingDock items={links} />
    </div>
  );
}
